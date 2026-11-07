# Project status — AE Project Write Health Sentinel

## Current status — 2026-11-06 (authoritative)

Reconciled on 2026-11-06 from the files cited on each line. Nothing was tested, built or run in a host today. Newest native evidence: 2026-11-02.

**Version / candidate**
- v0.3 ScriptUI panel, Japanese-first with an English toggle (`src/WHS_Probe.jsx` header line 4). `main` at `bfbeaf7` (merge of PR #2, 2026-11-02). Local `main` equals `origin/main` (read-only `git rev-parse`, 2026-11-06). Exact-head CI "validation" succeeded for `bfbeaf7` (`D:/Work/Projects/_docs/AUDIT_20261104/AE-Project-Write-Health-Sentinel-github.json`, checked 2026-11-04).
- Open PR #3 (`docs/green-location-evidence-20261102`, `a58ad62`) adds evidence only. It was open at the 2026-11-04 audit; its state today is UNVERIFIED.

**Release state and approvals**
- Not released; distribution NOT approved. Private GitHub repo `Unn0wn002/AE-Project-Write-Health-Sentinel` (`PROJECT_LOG.md`, 2026-11-01 push entry). The only package is the git-ignored `dist/Write_Health_Sentinel.jsx`, byte-identical to the source per the audit. There is no packaging verifier (`AGENTS.md`). Merge, push, install and AE restart each need explicit owner approval.

**Completed gates (PASS_BOUNDED_NATIVE: one machine, AE 2026, build number not recorded)**
- W01, W02, W09 (`evidence/native-20261101-w01-w02/`, `evidence/native-20261101-f1-recheck/`); W03 (`evidence/native-20261101-w03/`); W05 (`evidence/native-20261101-w05/`); W06 OneDrive (`evidence/native-20261101-w06/`).
- W10–W16 panel, install/dock, restart persistence, Japanese UI and readability (`TEST_MATRIX.md`; `evidence/native-20261101-panel-v02/`, `-install-dock/`, `-dock-persistence/`, `-japanese-ui/`, `-readability/`).
- 2026-11-02 result lines, floating (`evidence/native-20261102-result-lines/`) and installed/docked at about 230 px (`evidence/native-20261102-docked-lines/README.md`).
- Green PASS and amber CLOUD_SYNCED Location: PASS_BOUNDED_NATIVE, but recorded only on the unmerged PR #3 branch (`evidence/native-20261102-green-and-location/README.md` on `origin/docs/green-location-evidence-20261102`; not on `main`).

**Remaining gates (NOT_RUN / BLOCKED)**
- W04 Collect Files: NOT_RUN (not implemented). W07 large project (about 64 MB): PASS_BOUNDED_NATIVE 2026-11-07 (`evidence/native-20261107-w07-fail/README.md`). W08 SMB: NOT_RUN, likely BLOCKED (no share known) (`TEST_MATRIX.md`).
- Partial cases NOT_RUN: autosave freshness/WARN and custom location (W03), read-only attribute and disk full (W05), sync conflicts and offline files (W06), the zero-byte FAIL case (`TEST_MATRIX.md`); the red FAIL state itself (project file missing after the save) is PASS_BOUNDED_NATIVE 2026-11-07. The Japanese UI has not had a native-speaker review (`KNOWN_LIMITATIONS.md`).

**Open defects and exclusions**
- F5: the autosave interval is not read, so staleness is never judged. A custom autosave location is not handled. Hashing/corruption detection, Collect Files and file export are excluded or not implemented (`TEST_MATRIX.md`, `KNOWN_LIMITATIONS.md`, `D:/Work/Projects/_docs/AUDIT_20261104/README.md`).
- The 2026-11-04 audit records no code defect for this project. The P2 status-drift finding applies (PROJECT_STATUS said no remote/no push; README said v0.2); this section and the 2026-11-06 README fix address it.

**Latest automated test result** (from the 2026-11-04 audit run; not re-run today; test doubles, not native evidence)
- 27/27 Node tests and static checks PASS; all 30 tracked-file hashes unchanged (`D:/Work/Projects/_docs/AUDIT_20261104/README.md`, `D:/Work/Projects/_docs/AUDIT_20261104/AE-Project-Write-Health-Sentinel/results.jsonl`).

**Where evidence lives**
- Native: `evidence/native-YYYYMMDD-*/` (newest on `main`: `evidence/native-20261102-docked-lines/`). Older evidence cites the old scratch path; see `docs/PATH_NOTES.md`. Audit logs: `D:/Work/Projects/_docs/AUDIT_20261104/AE-Project-Write-Health-Sentinel/`.

**Status documents**
- This section of `PROJECT_STATUS.md` is CURRENT and authoritative. The sections below it (2026-11-01) are HISTORICAL.
- `TEST_MATRIX.md`: CURRENT live matrix. The 2026-11-02 result-line checks are recorded in their evidence READMEs and `PROJECT_LOG.md`, not as rows.
- `KNOWN_LIMITATIONS.md`: HISTORICAL/stale. It says nothing was tested across a restart or on cloud paths, but W06, W12 and W13 tested both. Bannered.
- `CHANGELOG.md`: CURRENT for release notes. `PROJECT_LOG.md`: dated log (history). Its "NOT pushed" note on the docked evidence is outdated (merged as PR #2); its 2026-11-06 entry corrects this.

**Next recommended step**
- The owner decides whether to merge evidence PR #3 (explicit approval needed). Then choose the next scope: W07 large project, W08 SMB (needs a share), or the Collect Files check.

## Earlier status entries (historical — superseded by the section above, kept unchanged)

Last updated: 2026-11-01. Source idea: 29-A in `anime_jp_tool_ideas.xlsx` (research-stage scores, not tested).

## State
- **v0.3 (2026-11-01): Japanese-first UI with an English toggle** (text in `i18n/messages.json`, generated into the script as escapes; script stays ASCII). Verified natively docked: `evidence/native-20261101-japanese-ui/`. 25 unit tests incl. translation coverage.
- **v0.2 (2026-11-01): the UI is now a ScriptUI panel** (floating palette via Run Script File, or a dockable panel once installed). Verified natively as a floating palette (`evidence/native-20261101-panel-v02/`) and installed + docked (`evidence/native-20261101-install-dock/`).
- v0 probe written: `src/WHS_Probe.jsx` (baseline capture + verify after save + autosave-folder freshness + location classification).
- Pure logic tests: 20/20 pass under Node with test doubles (VERIFIED_THIS_SESSION, 2026-11-01). These are NOT host evidence.
- Static checks pass (no save/open/close/write calls; ES3-only syntax; core is host-independent).
- Native After Effects (2026-11-01, one machine, disposable project): W01, W02, W03, W05, W06, W09 PASS_BOUNDED_NATIVE (W05: simulated blocked write, script reported NOT_UPDATED then PASS). W04 (Collect Files, not implemented), W07, W08 NOT_RUN. W03 found the autosave folder guess was wrong (`Auto-Save`, not `Adobe After Effects Auto-Save`); fixed and re-checked. F4 (autosave age not shown) is CLOSED in v0.2. Open: F5 (interval not read). Docked placement survived one restart (observed). Finding F1 (overall showed UNKNOWN when autosave was absent) FIXED 2026-11-01 and re-checked natively (PASS path, one run): `evidence/native-20261101-f1-recheck/`. Original runs: `evidence/native-20261101-w01-w02/` (recorded against the pre-fix code).
- Not released. Distribution NOT APPROVED. Local git repo only; no GitHub remote, no push.

## Deliberately narrowed from the scope draft
- Hashing: dropped (size + modified time only; hashing large AEPs in ExtendScript is unverified).
- Desktop helper / file watcher: dropped.
- Writeability temp-file probe and JSON/HTML file export: NOT in v0 (the script writes no files). Results go to an alert and the ExtendScript console.
- Collect Files check: NOT in v0.
- Autosave interval is not read (unknown whether scripts can read it); the check reports age only.

## Next
1. Native W01/W02 on a disposable project (needs the owner's go-ahead to drive After Effects).
2. Decide on file export and the write probe after W01–W05.
