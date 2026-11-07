# AE Project Write Health Sentinel — scope and test plan (DRAFT, 2026-11-01)

Status: DRAFT for owner approval. No repo, code or native run exists yet.
Source: idea **29-A** in `anime_jp_tool_ideas.xlsx` (Drive id 1eObhrLbaubnyfSrXgcsir8OYRT57X-vR). Rank 7, difficulty 3, feasibility "DOCUMENTED PATH", price idea ¥1,000–¥2,500. These are the sheet's own research-stage scores, not tested results.

## 1. What it is (one sentence)
A read-only verifier that checks After Effects really wrote the project or recovery file it was asked to (Save, Save As, Auto Save, Collect Files), and warns if the file is missing, stale, or unchanged. It is NOT another autosave engine (the sheet rejects that as occupied).

## 2. Pain it targets (from the sheet; source posts NOT re-checked by me)
- Adobe Community (JP), Dec 2025: AEP Save/Save As reaches 100% then the file is missing; Auto Save writes nothing; Collect Files makes no folder; AEPX still saves.
- Adobe bug report, Feb 2026: AE 26.0.0 Save, Save As, Save a Copy and autosave all failing on a 2 GB project.
- Competitors named in the sheet: Auto Backup, QuickOpen, aw-Autosaver. Adobe Beta 27.0 is expanding native autosave, so the surviving value is independent verification only.

## 3. Proposed MVP (bounded beta, same standard as AE Glyph)
In scope:
1. **Pre-save snapshot:** path, exists, size, modified time of the project file and its folder.
2. **Post-save check:** after a Save the user triggers (or the script triggers on a disposable project), confirm file exists, modified time moved forward, size plausible; report PASS / WARN / FAIL.
3. **Recovery-point freshness:** locate the autosave folder and report newest file age vs the configured interval.
4. **Destination risk:** classify local vs network (UNC) vs cloud-synced folder (Dropbox, OneDrive) by path pattern; writeability probe with a temp file in the same folder.
5. **Collect Files check:** confirm the collected folder and the project copy exist.
6. Panel + exported JSON/HTML report, like the Glyph probe.

Out of scope: creating backups, replacing autosave, relinking, repairing files, any write to the user's real project except a user-triggered Save in a disposable one.

## 4. Open design questions (UNVERIFIED — need checking before coding)
- Exact ExtendScript calls for reading preferences (autosave interval/location) and whether a script can read them at all. Check Glyph's `docs/API_CAPABILITY_MAP.md` first.
- Whether hashing is feasible in ExtendScript for large AEPs (likely too slow; size + mtime may be the practical MVP; the sheet's "hash" wording may need narrowing).
- Whether a script-triggered Save behaves the same as a menu Save under the failure conditions.
- The "desktop helper / file watcher" in the sheet is optional; I recommend dropping it from the MVP.

## 5. Test plan (single Windows machine, disposable AE project only)
| ID | Case | How | Status |
|---|---|---|---|
| W01 | Normal Save, local path | save disposable project, run check | NOT_RUN |
| W02 | Save As to a new folder | as above | NOT_RUN |
| W03 | Autosave freshness | set short interval, wait, check newest recovery file | NOT_RUN |
| W04 | Collect Files | collect to empty folder, verify | NOT_RUN |
| W05 | Write blocked (read-only file or locked handle) | mirror the Premiere D05 method: temp write-denying handle on a disposable file | NOT_RUN |
| W06 | Cloud-synced path (e.g. a Dropbox/OneDrive folder, if installed) | classify + write probe | NOT_RUN |
| W07 | Large project | generate a big disposable AEP if feasible | NOT_RUN |
| W08 | Network path (SMB) | only if a share exists | NOT_RUN (likely) |

Native results will be limited to the recorded AE build and machine, and never claimed from mock tests. The real silent-failure bug may not reproduce here; W05 simulates a failure, it does not prove the Adobe bug is detected.

## 6. Reuse from AE Glyph
Same layout (`src/*.jsx`, `tests/`, `docs/` with PROJECT_STATUS, TEST_MATRIX, KNOWN_LIMITATIONS), same CI sequence, same evidence classes (VERIFIED_THIS_SESSION, HISTORICAL_RECORDED, UNVERIFIED, NOT_RUN, BLOCKED), same report format.

## 7. Time estimate (my estimate, not measured)
About one week: 1–2 days scaffold + scanner, 1–2 days tests, 1–2 days native runs, 1 day docs.

## 8. Decisions needed from owner
1. Approve this scope (drop hashing and the desktop helper from the MVP?).
2. Create a new repo `AE-Project-Write-Health-Sentinel` next to the others?
3. Is a Dropbox/OneDrive folder or any SMB share available for W06/W08?
