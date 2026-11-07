# Changelog

## Unreleased
- 2026-11-01: v0 probe (baseline + verify + autosave freshness + location class), 16 core tests, static checks, docs. Not tested in After Effects.
- 2026-11-01: native W01/W02/W09 recorded (PASS, bounded). Finding F1 open.
- 2026-11-01: F1 fixed (overall verdict follows the write check; autosave only escalates on WARN/FAIL). 19 tests. Native PASS-path re-check recorded.
- 2026-11-01: native W05 recorded (blocked write detected as NOT_UPDATED; recovery PASS). Bounded.
- 2026-11-01: W03 native: autosave folder is `Auto-Save` on AE 2026 (previous guess was a false negative); script now checks both names. 20 tests.
- 2026-11-01: native W06 recorded (OneDrive-synced folder: Save As + Save detected, location CLOUD_SYNCED). Bounded.
- 2026-11-01 (later): v0.2 ScriptUI panel replaces the alert dialogs; autosave name/age shown (F4 closed); decodeURI fix for file names; native floating-palette check PASS; docking unverified.
- 2026-11-01 (later): installed the v0.2 panel via File > Scripts > Install ScriptUI Panel (per-user preferences folder), restarted After Effects, docked it; capture/save/verify PASS in the dock; baseline survived a restart. Installed copy must be re-installed after code changes.
- 2026-11-01 (later): observed the docked Sentinel tab persisting across an After Effects restart (W13).
- 2026-11-01 (later): v0.3 Japanese-first UI with English toggle; message codes beside English reasons; i18n generator and coverage tests (25); intro height fix; native check docked PASS (incl. NOT_UPDATED display).
- 2026-11-01 (later): readability: large coloured result line/badge (green/amber/red); tone mapping unit-tested; native check recorded; 26 tests.
- 2026-11-02: result lines: coloured Save, Autosave and Location lines under the headline; location tone unit-tested; native floating check recorded (docked NOT_RUN); 27 tests.
