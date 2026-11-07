# AE Project Write Health Sentinel

A read-only After Effects ScriptUI panel that checks whether After Effects really wrote your project file after a Save / Save As.

**Status: v0.3 panel (Japanese-first UI with an English toggle), bounded beta. Verified natively on one machine (After Effects 2026): as a floating palette, and installed and docked as a panel. Not released, not approved for distribution.** See PROJECT_STATUS.md for current status. Supporting records: `TEST_MATRIX.md`, `KNOWN_LIMITATIONS.md` (historical), `evidence/`.

## Language
The panel starts in Japanese. The 「English」 / 「日本語」 button switches language and is remembered in After Effects' settings. Edit text in `i18n/messages.json`, then run `python -I -X utf8 scripts/gen_i18n.py`.

## How to use
1. File > Scripts > Run Script File… and pick `src/WHS_Probe.jsx`. A "Write Health Sentinel" panel opens.
2. Click **Capture baseline** (records the project's path, size and modified time in After Effects' own settings).
3. Save in After Effects (File > Save / Save As).
4. Click **Verify save**. The panel reports RESULT (PASS / WARN / FAIL / NOT_UPDATED / INSUFFICIENT), the save check, the newest autosave file and its age, and the location type.

The panel never saves, opens, closes or edits your project, and writes no files.

## Install and docking
Run from "Run Script File" it is a floating palette. To use it as a dockable panel: File > Scripts > Install ScriptUI Panel… and pick the file, then restart After Effects, then Window > Write_Health_Sentinel.jsx. Drag its tab slowly onto a panel group until the blue drop highlight appears, then release. The installed file is a copy (After Effects puts it in your per-user preferences `Scripts\ScriptUI Panels` folder); re-install after code changes. To uninstall, delete that file with After Effects closed. See `evidence/native-20261101-install-dock/`.

## What it is not
Not a backup or autosave tool. It cannot prove why a write failed, and it cannot detect corruption inside a file that was written.

## Tests
```
node --test tests/core.test.js
python -I -X utf8 tests/static_checks.py
```
These use test doubles for the pure logic; they are not After Effects host evidence.

## User guide

See [USER_GUIDE.md](USER_GUIDE.md) for what it does, install, use, reading the result and removal.

## License

MIT. See [LICENSE](LICENSE). This beta is not approved for distribution; the license covers the source only.
