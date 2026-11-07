# Native re-check after the F1 fix — 2026-11-01

Change under test: overall verdict now follows the write check; autosave only escalates on WARN/FAIL (`whsOverall` in `src/WHS_Probe.jsx`). Unit tests 19/19 pass (test doubles, not host evidence).

Host: After Effects 2026 (Windows 11), same machine and session as `native-20261101-w01-w02`. Build number not recorded. Disposable project `_qa_scratch\whs_w01_20261101\saveas_target\whs_test_saveas.aep`.

## Observed
1. Script run, chose No -> new baseline captured.
2. Added "Comp 2", Ctrl+S. Shell check: `whs_test_saveas.aep` 119,003 bytes, modified 13:26:37.
3. Script run, chose Yes. Dialog: "Write Health Sentinel: **PASS**"; "Write: PASS - File exists, is non-empty and its modified time advanced."; "Autosave: UNKNOWN (not checked / informational; does not affect the overall result)"; "Location: LOCAL_OR_MAPPED".

## Result
F1 fixed: PASS_BOUNDED_NATIVE for the corrected summary on the PASS path (one run). Still untested natively: any WARN/FAIL/NOT_UPDATED path (W05), autosave found (W03).
