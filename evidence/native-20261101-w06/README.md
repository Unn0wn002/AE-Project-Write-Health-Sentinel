# Native run W06 (cloud-synced path) — 2026-11-01

Host: After Effects 2026 (Windows 11), same machine/session as the earlier 2026-11-01 runs. Build number not recorded. Script: `src/WHS_Probe.jsx` at commit 17e56ad. OneDrive client was running (process started 2026-10-31 21:15). Throwaway folder `C:\Users\unn0w\OneDrive\WHS_TEST_DELETE_ME` (a ~0.2-0.3 MB empty project) was created for this test and later sent to the Recycle Bin (not permanently deleted). OneDrive may have uploaded the file before deletion.

## Observed
| Step | Observation |
|---|---|
| Baseline captured, Save As to `...\OneDrive\WHS_TEST_DELETE_ME\whs_cloud.aep` | shell: 228,706 bytes, 13:40:20, attributes `Archive, ReparsePoint` (OneDrive placeholder flag) |
| Script, Yes | Write PASS "Project path changed (Save As); new file is newer than the baseline."; **Location: CLOUD_SYNCED** "Path looks like a cloud-synced folder."; Autosave UNKNOWN (not checked) |
| Invalid attempt | A second verification run reused the old baseline because a script alert was not dismissed (my click missed the OK button of a taller dialog), so it showed "Save As" again. **Not counted as evidence.** |
| Redo, one step at a time | new baseline for the OneDrive path (file 283,458 B, 13:40:52) → added a composition → Ctrl+S → shell: 338,210 B, 13:41:41 → script Yes: **Write PASS "File exists, is non-empty and its modified time advanced."**, Location CLOUD_SYNCED |
| Cleanup | project closed in AE (no save prompt), folder moved to Recycle Bin; `Test-Path` false afterwards |

## Result
W06 PASS_BOUNDED_NATIVE: on a OneDrive-synced local folder, Save As and a same-path Save were detected correctly and the location was classified CLOUD_SYNCED. One run each, one machine.

## Limits
- This only shows a synced folder behaving normally. Sync conflicts, offline files, Files On-Demand dehydrated files, and slow-sync mtime changes were not tested. Whether OneDrive finished uploading was not checked.
- Dropbox / Google Drive / iCloud paths were not tested; classification of them is by name pattern and covered only by unit tests.
- Autosave inside a synced folder was not tested.
