"use strict";
// Tests the pure core of src/WHS_Probe.jsx with test doubles. These are NOT host evidence.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const src = fs.readFileSync(path.join(__dirname, "..", "src", "WHS_Probe.jsx"), "utf8");
const m = src.match(/\/\/ <WHS_CORE>([\s\S]*?)\/\/ <\/WHS_CORE>/);
assert.ok(m, "core markers missing");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(m[1], ctx);

const NOW = 1_800_000_000_000;
const base = { path: "C:\\p\\a.aep", exists: true, length: 1000, modifiedMs: NOW - 600000, capturedMs: NOW - 500000 };
const cur = (o) => Object.assign({}, base, { modifiedMs: NOW - 1000 }, o);

test("classifyLocation", () => {
  assert.strictEqual(ctx.whsClassifyLocation("\\\\nas\\share\\a.aep").kind, "NETWORK");
  assert.strictEqual(ctx.whsClassifyLocation("C:\\Users\\x\\Dropbox\\proj\\a.aep").kind, "CLOUD_SYNCED");
  assert.strictEqual(ctx.whsClassifyLocation("C:\\Users\\x\\OneDrive - Co\\a.aep").kind, "CLOUD_SYNCED");
  assert.strictEqual(ctx.whsClassifyLocation("/Volumes/Work/a.aep").kind, "VOLUME");
  assert.strictEqual(ctx.whsClassifyLocation("D:\\a.aep").kind, "LOCAL_OR_MAPPED");
  assert.strictEqual(ctx.whsClassifyLocation("").kind, "UNKNOWN");
  assert.strictEqual(ctx.whsClassifyLocation(null).kind, "UNKNOWN");
});

test("write: pass when mtime advances", () => {
  assert.strictEqual(ctx.whsEvaluateWrite(base, cur(), NOW).verdict, "PASS");
});
test("write: no baseline is INSUFFICIENT", () => {
  assert.strictEqual(ctx.whsEvaluateWrite(null, cur(), NOW).verdict, "INSUFFICIENT");
});
test("write: missing file fails", () => {
  assert.strictEqual(ctx.whsEvaluateWrite(base, cur({ exists: false }), NOW).verdict, "FAIL");
});
test("write: unchanged mtime is NOT_UPDATED", () => {
  assert.strictEqual(ctx.whsEvaluateWrite(base, cur({ modifiedMs: base.modifiedMs }), NOW).verdict, "NOT_UPDATED");
});
test("write: zero byte fails even if mtime advanced", () => {
  assert.strictEqual(ctx.whsEvaluateWrite(base, cur({ length: 0 }), NOW).verdict, "FAIL");
});
test("write: size halved warns", () => {
  assert.strictEqual(ctx.whsEvaluateWrite(base, cur({ length: 400 }), NOW).verdict, "WARN");
});
test("write: future mtime warns", () => {
  assert.strictEqual(ctx.whsEvaluateWrite(base, cur({ modifiedMs: NOW + 10 * 60000 }), NOW).verdict, "WARN");
});
test("write: Save As to a new newer file passes", () => {
  const r = ctx.whsEvaluateWrite(base, cur({ path: "C:\\p\\b.aep", modifiedMs: NOW - 1000 }), NOW);
  assert.strictEqual(r.verdict, "PASS");
});
test("write: Save As target older than baseline is NOT_UPDATED", () => {
  const r = ctx.whsEvaluateWrite(base, cur({ path: "C:\\p\\b.aep", modifiedMs: base.capturedMs - 5000 }), NOW);
  assert.strictEqual(r.verdict, "NOT_UPDATED");
});

test("autosave: none found is UNKNOWN, not FAIL", () => {
  assert.strictEqual(ctx.whsEvaluateAutosave([], 5, NOW).verdict, "UNKNOWN");
});
test("autosave: fresh within interval passes; stale warns; empty fails", () => {
  const fresh = [{ name: "a", modifiedMs: NOW - 4 * 60000, length: 10 }];
  const stale = [{ name: "a", modifiedMs: NOW - 30 * 60000, length: 10 }];
  const empty = [{ name: "a", modifiedMs: NOW - 1000, length: 0 }];
  assert.strictEqual(ctx.whsEvaluateAutosave(fresh, 5, NOW).verdict, "PASS");
  assert.strictEqual(ctx.whsEvaluateAutosave(stale, 5, NOW).verdict, "WARN");
  assert.strictEqual(ctx.whsEvaluateAutosave(empty, 5, NOW).verdict, "FAIL");
});
test("autosave: unknown interval reports INFO", () => {
  const r = ctx.whsEvaluateAutosave([{ name: "a", modifiedMs: NOW - 60000, length: 10 }], null, NOW);
  assert.strictEqual(r.verdict, "INFO");
  assert.strictEqual(r.newestAgeMin, 1);
});
test("autosave: picks the newest of several", () => {
  const r = ctx.whsEvaluateAutosave([
    { name: "old", modifiedMs: NOW - 90 * 60000, length: 1 },
    { name: "new", modifiedMs: NOW - 60000, length: 1 }], 5, NOW);
  assert.strictEqual(r.newestName, "new");
});

test("worst verdict ordering", () => {
  assert.strictEqual(ctx.whsWorst(["PASS", "WARN", "FAIL"]), "FAIL");
  assert.strictEqual(ctx.whsWorst(["PASS", "INFO"]), "INFO");
  assert.strictEqual(ctx.whsWorst(["PASS", "UNKNOWN"]), "UNKNOWN");
  assert.strictEqual(ctx.whsWorst([]), "PASS");
});

test("overall: autosave UNKNOWN/INFO does not mask a passing write (F1)", () => {
  assert.strictEqual(ctx.whsOverall("PASS", "UNKNOWN"), "PASS");
  assert.strictEqual(ctx.whsOverall("PASS", "INFO"), "PASS");
  assert.strictEqual(ctx.whsOverall("PASS", "PASS"), "PASS");
});
test("overall: autosave WARN/FAIL still escalates", () => {
  assert.strictEqual(ctx.whsOverall("PASS", "WARN"), "WARN");
  assert.strictEqual(ctx.whsOverall("PASS", "FAIL"), "FAIL");
  assert.strictEqual(ctx.whsOverall("WARN", "FAIL"), "FAIL");
});
test("overall: a bad write is never hidden by autosave", () => {
  assert.strictEqual(ctx.whsOverall("FAIL", "PASS"), "FAIL");
  assert.strictEqual(ctx.whsOverall("NOT_UPDATED", "UNKNOWN"), "NOT_UPDATED");
  assert.strictEqual(ctx.whsOverall("INSUFFICIENT", "INFO"), "INSUFFICIENT");
});

test("autosave folder names include the natively observed one first", () => {
  const names = ctx.whsAutosaveFolderNames();
  assert.strictEqual(names[0], "Auto-Save");
  assert.ok(names.indexOf("Adobe After Effects Auto-Save") !== -1);
});

test("toJson round-trips through JSON.parse incl. Japanese and escapes", () => {
  const obj = { a: "日本語\"x\"\\\n", n: 3, b: true, z: null, list: [1, "two", { k: "v" }] };
  assert.deepStrictEqual(JSON.parse(ctx.whsToJson(obj)), obj);
});

// --- i18n (UI text) ---
const messages = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "i18n", "messages.json"), "utf8"));

test("i18n: generated table in the script matches i18n/messages.json", () => {
  // JSON round-trip: objects created inside the vm context have a different prototype.
  assert.deepStrictEqual(JSON.parse(JSON.stringify(ctx.WHS_TEXT.ja)), messages.ja);
  assert.deepStrictEqual(JSON.parse(JSON.stringify(ctx.WHS_TEXT.en)), messages.en);
});

test("i18n: ja and en have the same keys", () => {
  assert.deepStrictEqual(Object.keys(messages.ja).sort(), Object.keys(messages.en).sort());
});

test("i18n: every code and UI key used in the script exists in both languages", () => {
  const used = new Set();
  for (const m of src.matchAll(/"([WAL]_[A-Z_]+)"/g)) used.add(m[1]);
  for (const m of src.matchAll(/\bT\("([a-z_]+)"/g)) used.add(m[1]);
  for (const v of Object.keys(ctx.WHS_RANK)) used.add("V_" + v);
  for (const k of ["NETWORK", "CLOUD_SYNCED", "VOLUME", "LOCAL_OR_MAPPED", "UNKNOWN"]) used.add("K_" + k);
  used.add("btn_lang"); used.add("title");
  const missing = [...used].filter((k) => !(k in messages.ja) || !(k in messages.en));
  assert.deepStrictEqual(missing, []);
  assert.ok(used.size > 40, "expected the scan to find the codes");
});

test("i18n: every code the core can return has text", () => {
  const NOW = 1_800_000_000_000;
  const base = { path: "C:/p/a.aep", exists: true, length: 1000, modifiedMs: NOW - 600000, capturedMs: NOW - 500000 };
  const cases = [
    ctx.whsEvaluateWrite(null, base, NOW),
    ctx.whsEvaluateWrite(base, { exists: false }, NOW),
    ctx.whsEvaluateWrite(base, Object.assign({}, base, { length: 0, modifiedMs: NOW }), NOW),
    ctx.whsEvaluateWrite(base, Object.assign({}, base, { modifiedMs: NOW + 600000 }), NOW),
    ctx.whsEvaluateWrite(base, base, NOW),
    ctx.whsEvaluateWrite(base, Object.assign({}, base, { length: 10, modifiedMs: NOW }), NOW),
    ctx.whsEvaluateWrite(base, Object.assign({}, base, { path: "C:/b.aep", modifiedMs: NOW }), NOW),
    ctx.whsEvaluateWrite(base, Object.assign({}, base, { path: "C:/b.aep", modifiedMs: NOW - 900000 }), NOW),
    ctx.whsEvaluateWrite(base, Object.assign({}, base, { modifiedMs: NOW }), NOW),
    ctx.whsEvaluateAutosave([], null, NOW),
    ctx.whsEvaluateAutosave([{ name: "a", modifiedMs: NOW, length: 0 }], 5, NOW),
    ctx.whsEvaluateAutosave([{ name: "a", modifiedMs: NOW - 3600000, length: 1 }], 5, NOW),
    ctx.whsEvaluateAutosave([{ name: "a", modifiedMs: NOW, length: 1 }], 5, NOW),
    ctx.whsEvaluateAutosave([{ name: "a", modifiedMs: NOW, length: 1 }], null, NOW)
  ];
  const codes = new Set();
  for (const c of cases) { assert.strictEqual(c.codes.length, c.reasons.length); c.codes.forEach((x) => codes.add(x)); }
  for (const p of ["", "//nas/a", "C:/Users/x/OneDrive/a", "/Volumes/a", "D:/a", "relative"]) codes.add(ctx.whsClassifyLocation(p).code);
  assert.ok(codes.size >= 20);
  for (const c of codes) { assert.ok(c in messages.ja && c in messages.en, "missing text for " + c); }
});

test("i18n: whsT substitutes placeholders and falls back to English, then the key", () => {
  assert.strictEqual(ctx.whsT("en", "newest", { name: "x.aep", age: 2 }), "newest: x.aep, 2 min old");
  assert.ok(ctx.whsT("ja", "newest", { name: "x.aep", age: 2 }).indexOf("x.aep") !== -1);
  assert.strictEqual(ctx.whsT("fr", "btn_base"), "Capture baseline");
  assert.strictEqual(ctx.whsT("ja", "no_such_key"), "no_such_key");
  assert.notStrictEqual(ctx.whsT("ja", "btn_base"), ctx.whsT("en", "btn_base"));
});

test("tone: every verdict maps to a colour tone; failures are red", () => {
  for (const v of Object.keys(ctx.WHS_RANK)) assert.ok(["OK", "WARN", "BAD", "INFO"].includes(ctx.whsTone(v)), v);
  assert.strictEqual(ctx.whsTone("PASS"), "OK");
  assert.strictEqual(ctx.whsTone("FAIL"), "BAD");
  assert.strictEqual(ctx.whsTone("NOT_UPDATED"), "BAD");
  assert.strictEqual(ctx.whsTone("WARN"), "WARN");
  assert.strictEqual(ctx.whsTone("INSUFFICIENT"), "WARN");
  assert.strictEqual(ctx.whsTone("UNKNOWN"), "INFO");
  for (const k of ["OK", "WARN", "BAD", "INFO"]) assert.strictEqual(ctx.WHS_TONE_RGB[k].length, 3);
});

test("whsLocTone flags network, cloud and volume paths only", () => {
  for (const k of ["NETWORK", "CLOUD_SYNCED", "VOLUME"]) assert.strictEqual(ctx.whsLocTone(k), "WARN");
  for (const k of ["LOCAL_OR_MAPPED", "UNKNOWN", "other"]) assert.strictEqual(ctx.whsLocTone(k), "INFO");
});
