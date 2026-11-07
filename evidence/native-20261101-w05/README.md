# Native run W05 (blocked write) — 2026-11-01

Host: After Effects 2026 (Windows 11), same machine/session as the earlier 2026-11-01 runs. Build number not recorded. Script: `src/WHS_Probe.jsx` at commit fe9cc83 (F1 fix). Disposable file only: `_qa_scratch\whs_w01_20261101\saveas_target\whs_test_saveas.aep`.
Method (same idea as Premiere D05): a separate hidden PowerShell process held the file open with read-only access and read-only sharing for 240 s (started 13:28:30), which denies writers/rename-over. Released automatically at 13:32:32 (measured from the shell). Nothing else was locked, and no other file was touched.

## Observed
| Time | Step | Observation |
|---|---|---|
| ~13:27 | Script, chose No | new baseline; then added "Comp 3" (unsaved, title showed *) |
| 13:28:33 | Lock check from shell | a write-open of the file was denied ("being used by another process") → lock engaged. File: 119,003 bytes, 13:26:37 |
| 13:28:4x | Ctrl+S in AE | AE raised its own warning: "Could not rename the file '...\saveas_target\whs_test_saveas.24996.40508.aep' to 'whs_test_saveas.aep'" (AE writes a temp file, then renames it over the project) |
| 13:28:47 | Shell | folder held only `whs_test_saveas.aep`, still 119,003 bytes / 13:26:37 (no leftover temp file seen) |
| after | Script, Yes (lock still held) | "Write Health Sentinel: **NOT_UPDATED** — Modified time did not advance since the baseline. Either no save happened or the write did not reach disk." |
| 13:32:32 | Lock released | confirmed from the shell with a write-open |
| 13:32:53 | Ctrl+S again | file 173,755 bytes, 13:32:53 (first attempt at this was swallowed by a still-open script dialog; the save above is the effective one) |
| after | Script, Yes (same baseline) | "Write Health Sentinel: **PASS** — File exists, is non-empty and its modified time advanced." |

## Result
- W05 PASS_BOUNDED_NATIVE for a simulated write rejection: the script reported NOT_UPDATED while the real file was unchanged, and PASS after the successful save. One run, one machine, one failure mode (rename-over blocked by an open handle).
- The project title kept its unsaved asterisk after the failed save (seen in a screenshot, not otherwise recorded).

## Limits
- This is a simulated failure, not the Adobe silent-save bug reported in the research sheet. In this run AE did show its own warning, so the script's value here was the independent post-check, not discovering something AE hid.
- NOT_UPDATED cannot distinguish "no save was attempted" from "save failed" (a documented limitation).
- Other failure modes (read-only attribute, full disk, cloud/network paths, silent no-error failure) were not tested.
