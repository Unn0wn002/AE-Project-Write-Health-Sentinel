# Native run: ScriptUI panel v0.2 (floating) — 2026-11-01

Host: After Effects 2026 (Windows 11), one machine; build number not recorded. Script: `src/WHS_Probe.jsx` v0.2 (ScriptUI panel replacing the alert dialogs). Disposable project: `_qa_scratch\whs_w01_20261101\saveas_target\whs_test_saveas.aep` inside this project folder (git-ignored). Run through File > Scripts > Run Script File (NO install into the Scripts/ScriptUI Panels folder was made). Driven through the UI by Claude with the owner's go-ahead ("continue the project").

## Observed
1. Run Script File opened a floating palette "Write Health Sentinel" with two buttons (Capture baseline, Verify save) and a read-only text area. The text area immediately showed the baseline left from an earlier test (OneDrive file, captured 13:41:22): the stored baseline survived closing that project, opening another one and a gap of about two hours.
2. Capture baseline: the panel reported the project path, 173,755 bytes, modified 13:32:53, captured 15:40:43.
3. Added a composition and saved (Ctrl+S). Shell: project 228,057 bytes at 15:41:00; a new autosave file `Auto-Save\whs_test_saveas auto-save 2.aep` (228,706 bytes) appeared at 15:40:58 (cause not investigated).
4. Verify save: RESULT: PASS. Save check PASS ("File exists, is non-empty and its modified time advanced", file now 228,057 bytes). Autosave: INFO (informational), newest file and age shown (this closes finding F4). Location LOCAL_OR_MAPPED. Baseline line repeated.
5. Cosmetic bug seen: the autosave file name displayed as `whs_test_saveas%20auto-save%202.aep` (ExtendScript returns URL-encoded names). Fixed with `decodeURI`; the palette was closed and re-run: name now reads `whs_test_saveas auto-save 2.aep, 0.6 min old`.

## Result
PASS_BOUNDED_NATIVE for the panel as a floating palette: capture, save, verify on the PASS path, with the autosave file name and age visible. The unit tests (20) and static checks (now also requiring `instanceof Panel`, a floating-palette fallback, and no modal dialogs) pass.

## Not established
- Docking: the file was not installed into After Effects' ScriptUI Panels folder, so whether it docks as a panel is UNVERIFIED. Installing needs the owner's explicit approval.
- The NOT_UPDATED / failure display in the new panel was not re-run (the logic is unchanged and was verified in the earlier W05 run through the old dialogs).
- Closing and reopening the palette repeatedly, other After Effects builds, large projects.
