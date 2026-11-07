# Test matrix

Evidence classes: VERIFIED_THIS_SESSION, HISTORICAL_RECORDED, UNVERIFIED, NOT_RUN, BLOCKED. Native results are never claimed from mock tests or CI.

## Automated (test doubles, not host evidence)
| Area | Result |
|---|---|
| classifyLocation (UNC, cloud, volume, drive letter, empty) | PASS 2026-11-01 |
| evaluateWrite (pass, no baseline, missing, unchanged, zero byte, size drop, future mtime, Save As) | PASS 2026-11-01 |
| evaluateAutosave (none, fresh, stale, empty, unknown interval, newest of many) | PASS 2026-11-01 |
| worst-verdict ordering, JSON serialiser | PASS 2026-11-01 |
| static checks (read-only, ES3, host-independent core) | PASS 2026-11-01 |

## Native After Effects (disposable project only)
| ID | Case | Status |
|---|---|---|
| W01 | Normal Save, local path | PASS_BOUNDED_NATIVE 2026-11-01 (see evidence/native-20261101-w01-w02) |
| W02 | Save As to a new folder | PASS_BOUNDED_NATIVE 2026-11-01 |
| W03 | Autosave found (folder guess corrected: `Auto-Save`) | PASS_BOUNDED_NATIVE 2026-11-01 (see evidence/native-20261101-w03). Freshness/WARN and custom location NOT_RUN |
| W04 | Collect Files | NOT_RUN (not implemented in v0) |
| W05 | Write blocked (locked disposable file; rename-over denied) | PASS_BOUNDED_NATIVE 2026-11-01 (NOT_UPDATED then PASS after release; see evidence/native-20261101-w05). Read-only attribute / disk full NOT_RUN |
| W06 | Cloud-synced path (OneDrive) | PASS_BOUNDED_NATIVE 2026-11-01 (see evidence/native-20261101-w06). Sync conflicts / offline files NOT_RUN |
| W07 | Large project | NOT_RUN |
| W08 | Network path (SMB) | NOT_RUN (likely BLOCKED: no share known) |
| W10 | v0.2 ScriptUI panel as a floating palette (Run Script File): capture, save, verify; autosave name and age shown | PASS_BOUNDED_NATIVE 2026-11-01 (evidence/native-20261101-panel-v02) |
| W11 | Panel installed via File > Scripts > Install ScriptUI Panel, shown in the Window menu after restart, and docked; capture/save/verify PASS inside the dock | PASS_BOUNDED_NATIVE 2026-11-01 (evidence/native-20261101-install-dock) |
| W12 | Stored baseline persists across an After Effects restart | PASS_BOUNDED_NATIVE 2026-11-01 (one restart) |
| W13 | Docked placement persists across another restart | PASS_BOUNDED_NATIVE 2026-11-01 (one restart; observed, panel not used afterwards; evidence/native-20261101-dock-persistence) |
| W14 | Japanese-first UI with English toggle, docked (v0.3) | PASS_BOUNDED_NATIVE 2026-11-01 (evidence/native-20261101-japanese-ui) |
| W15 | NOT_UPDATED / failure display in the panel | PASS_BOUNDED_NATIVE 2026-11-01 (Save-As-older path, one run) |
| W16 | Bold coloured result line (red NOT_UPDATED path) | PASS_BOUNDED_NATIVE 2026-11-01 (evidence/native-20261101-readability); green/amber unit-tested only |
| W09 | app.settings baseline persists across script runs | PASS_BOUNDED_NATIVE 2026-11-01 (same AE session; restart not tested) |
