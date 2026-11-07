# Native run W01 / W02 / W09 — 2026-11-01

Host: After Effects 2026 (Windows 11), one machine. Window title "Adobe After Effects 2026". Exact build number NOT recorded this run (UNVERIFIED).
Script: `src/WHS_Probe.jsx` at the commit made on 2026-11-01 (33bbe34). Disposable project only, created in `_qa_scratch\whs_w01_20261101\`. Driven through the UI by Claude with the owner's go-ahead. No installs, no pushes.

## What happened (observed)
| Step | Observation |
|---|---|
| Project created | New project saved via Save As: `whs_test.aep`, 8,341 bytes, 13:23:41 (checked from the shell, independent of the script) |
| Script run 1 | Dialog "Baseline captured for: ...\whs_test.aep" |
| Change + Ctrl+S | Added "Comp 1"; file now 63,147 bytes, 13:24:12 (shell check) |
| Script run 2 | Dialog "A baseline exists..." appeared → baseline survived between runs (**W09 observed**). Chose Yes. Result: **Write: PASS** "File exists, is non-empty and its modified time advanced." Autosave: UNKNOWN (no autosave files at the guessed location). Location: LOCAL_OR_MAPPED. Overall: UNKNOWN |
| W02 | Script run 3, chose No → new baseline. Save As to `saveas_target\whs_test_saveas.aep`: 64,251 bytes, 13:25:01 (shell check). Script run 4, Yes: **Write: PASS** "Project path changed (Save As); new file is newer than the baseline." Autosave UNKNOWN. Overall UNKNOWN |

## Result
- W01 PASS_BOUNDED_NATIVE (normal Save, local path, one run).
- W02 PASS_BOUNDED_NATIVE (Save As to a new folder, one run).
- W09 PASS_BOUNDED_NATIVE (baseline persisted across script runs via app.settings; one session, not tested across an AE restart).

## Findings
- **F1 (design) — FIXED later the same day, see ../native-20261101-f1-recheck/:** overall verdict was UNKNOWN even though the write check passed, because "no autosave files found" counts as UNKNOWN and outranks PASS. Autosave was never enabled/run this session. The summary line is misleading. Proposed fix: overall follows the write verdict; autosave UNKNOWN is shown separately as "not checked".
- **F2 (not tested):** whether the autosave folder guess (`Adobe After Effects Auto-Save` beside the project) is correct is still UNKNOWN (W03 NOT_RUN).
- **F3:** the script cannot show a failure case yet; these runs only show the PASS path. A real silent failure was not reproduced (W05 NOT_RUN).

## Limits
One machine, one AE build, local disk, tiny project. Not extended to network/cloud paths, large projects or other builds. The JSON line the script writes to the console was not captured. No screenshots retained except the final dialog image, which is not stored in the repo.
