# AE Project Write Health Sentinel — project log

Evidence classes: VERIFIED_THIS_SESSION, HISTORICAL_RECORDED, USER_STATED, UNVERIFIED, NOT_RUN, BLOCKED. Last updated: 2026-11-01. Not a release record; private GitHub repo Unn0wn002/AE-Project-Write-Health-Sentinel (pushed 2026-11-01).

## Identity
Research idea **29-A** (rank 7, sheet score 80, difficulty 3, "DOCUMENTED PATH"). A read-only After Effects script that checks AE really wrote the project file after Save / Save As, checks the autosave folder, and classifies the save location. Scope: `docs/PROJECT_SPECIFICATION.md` (copy of the approved draft). Folder: `02_Projects\AE-Project-Write-Health-Sentinel`. Branch `main`, local commits only (latest: see `git log`).

## Where the records are
`PROJECT_STATUS.md`, `TEST_MATRIX.md`, `KNOWN_LIMITATIONS.md`, `CHANGELOG.md`, `evidence/` (native-20261101-w01-w02, -f1-recheck, -w05, -w03, -w06), shared `HANDOFF_LOG_2026-10-29.md` (2026-11-01 entries). Test scratch (git-ignored): `_qa_scratch\whs_w01_20261101` inside this folder (moved here 2026-11-01; see `docs/PATH_NOTES.md` — the evidence files cite the old location).

## Timeline (all 2026-11-01, VERIFIED_THIS_SESSION unless noted)
- Scope drafted from idea 29-A and approved by the owner; hashing, desktop helper, file export, write probe and Collect check dropped from v0.
- v0 written (`src/WHS_Probe.jsx`), 16 unit tests; commit `33bbe34`.
- Native W01 (Save) PASS, W02 (Save As) PASS, W09 (baseline persists across runs) PASS — AE 2026, one machine.
- Finding F1 (overall verdict UNKNOWN when autosave absent) fixed; native recheck PASS path; 19 tests.
- Native W05: a read-only-share lock held on the disposable file (240 s). AE warned "Could not rename … to whs_test_saveas.aep"; script reported NOT_UPDATED; PASS after release and save.
- Native W03: autosave found at `<project>\Auto-Save\<name> auto-save N.aep`; the original guess (`Adobe After Effects Auto-Save`) was a false negative; fixed; 20 tests. Preferences > Project > Auto-Save interval temporarily 20→1 min, restored to 20.
- Native W06: OneDrive-synced folder; Save As and Save detected; CLOUD_SYNCED. One invalid verification run (missed click) is recorded as invalid. Test folder recycled.

## Update 2026-11-01 (later): panel v0.2
The owner said to continue; the Write Sentinel was converted to a ScriptUI panel to follow the research standard for dockable panels. Verified natively as a floating palette (capture, save, verify; autosave name and age shown; F4 closed; a %20 file-name display bug found and fixed). Docking is NOT verified because it needs the file installed into After Effects' ScriptUI Panels folder, which needs the owner's approval. Evidence: `evidence/native-20261101-panel-v02/`.

## Update 2026-11-01 (install and dock)
The owner approved installing the panel. Installed through After Effects' menu (it copies to the per-user preferences folder, not Program Files), restarted After Effects, opened it from the Window menu and docked it beside Project. Capture/save/verify PASS inside the dock; the stored baseline survived the restart. The installed file is a copy (re-install after code changes); uninstall steps are in the evidence README. Evidence: `evidence/native-20261101-install-dock/`.

## Current state
Native passes: W01, W02, W03, W05, W06, W09 (bounded: one machine, one AE 2026 build, number not recorded). NOT_RUN: W04 (Collect Files, not implemented), W07 large project, W08 SMB. 20/20 unit tests, static checks pass.

## Findings still open
- F4: the dialog doesn't show the autosave file name/age (only in console JSON). F5: autosave interval not read, so staleness can't be judged.
- **UI standard:** the Drive research packets require a host-integrated **dockable panel**. v0.2 is a ScriptUI panel: floating from Run Script File, and installed and docked (verified once).
- It cannot tell "no save attempted" from "save failed"; it did not reproduce Adobe's reported silent-save bug.
- Research note (Drive packets, HISTORICAL_RECORDED): competitors Auto Backup, QuickOpen, aw-Autosaver; native autosave is expanding in AE beta 27.0, so value is only independent verification.

## Next step
Owner decides: add a Collect Files check, check the docked layout across another restart, or keep as is.

- 2026-11-01 (later): test folder moved from `02_Projects\_qa_scratch\whs_w01_20261101` into this project's own `_qa_scratch\`; verified 3 files, same sizes; path note added in `docs/PATH_NOTES.md`.

- 2026-11-01 quality review across all six plugins: see `02_Projects\_docs\QUALITY_REVIEW_20261101.md`.
- 2026-11-01 (later): Japanese-first UI (v0.3) added on the owner's request; re-installed twice and After Effects restarted twice (allowed); docked check PASS incl. a NOT_UPDATED result shown in Japanese; intro cut-off fixed. Evidence: `evidence/native-20261101-japanese-ui/`. Japanese wording not native-reviewed.
- 2026-11-01 (later): owner said "push them and set it Private". Created PRIVATE GitHub repo https://github.com/Unn0wn002/AE-Project-Write-Health-Sentinel and pushed `main` (a828d2e); first CI run `validation` succeeded. Not released, not public.
- 2026-11-01 (later): readability pass on the owner's request ("All six"): coloured result line/badge; native check recorded in `evidence/native-20261101-readability/`. Pushed to the private repo.

- 2026-11-02 (owner: "start the Sentinel and Guard"): branch `ui/result-lines-20261102` (local commit, NOT pushed): coloured Save, Autosave and Location lines under the headline (display only). 27 tests, static checks ok. Native floating run from src: PASS_BOUNDED_NATIVE (English and Japanese); evidence `evidence/native-20261102-result-lines/`. Not installed, docked NOT_RUN. Language restored to English.

- 2026-11-02 (owner: "merge them" and allowed install): PR #1 (result lines) merged (15811d2). Installed the panel (per-user ScriptUI Panels), restarted AE twice; docked check PASS_BOUNDED_NATIVE at about 230 px, nothing clipped. Evidence `evidence/native-20261102-docked-lines/` (local commit on `docs/docked-evidence-20261102`, NOT pushed).

- 2026-11-06 — Status files reconciled (owner-approved status-file cleanup): PROJECT_STATUS.md gets a new top section "Current status — 2026-11-06 (authoritative)", with the 2026-11-01 content kept unchanged below it. A historical banner was added at the top of KNOWN_LIMITATIONS.md. The README.md status sentence was updated (v0.2 to v0.3, with a pointer to PROJECT_STATUS.md). TEST_MATRIX.md is still current and was not changed. Correction to the previous entry: the docked-lines evidence was merged to `main` as PR #2 (`bfbeaf7`, equal to `origin/main`). Evidence PR #3 was open at the 2026-11-04 audit. No evidence, source, tests, scripts or manifests were changed. No test, build or host run was made, and nothing was committed.
- 2026-11-07 — SE-01 (plan task, read-only review of PR #3): PR #3 (`docs/green-location-evidence-20261102`, `a58ad62`) is OPEN, MERGEABLE, based on current `main` `bfbeaf74`, checks green, and changes only evidence and this log (4 files, 22 insertions; nothing under `src/` or `tests/`). Installed `Write_Health_Sentinel.jsx` and `src/WHS_Probe.jsx` on `main` have the same SHA-256 `83f1b134598cd7b8...682b` (VERIFIED_THIS_SESSION). Both screenshots match the README (green PASS with Location LOCAL_OR_MAPPED; amber CLOUD_SYNCED with RESULT PASS). The evidence can be cited in the academic index as PASS_BOUNDED_NATIVE with its branch identity (`a58ad62`); it is not on `main` until merged. No merge, push, fetch or test ran; the merge is Aria's decision (ADR-005). Not in the evidence: Autosave (UNKNOWN), red FAIL state, no SHA256SUMS file. Report: `D:/Work/Projects/_docs/PLAN_20261106/AE-Project-Write-Health-Sentinel/runs/SE-01_20261107-1305.md`.
- 2026-11-07 (history replacement, Aria's explicit yes; executor Claude Code): a personal email address was found in commit metadata of this repo's history, so the GitHub repo was deleted by the owner (the repo was deleted and recreated) and `Unn0wn002/AE-Project-Write-Health-Sentinel` was recreated PRIVATE with one clean commit `11b2610` (same tree as the local task branch; author and committer are the GitHub no-reply identity). The old history and the old pull-request list are backed up locally in `_qa_scratch/backup-full-history-20261107/` (a git bundle of all refs, plus `pull-requests.json`). This working checkout's `origin` push URL is disabled so old history cannot be pushed by accident, and its git identity is now the no-reply address. Still private; making it public needs a separate yes.
- 2026-11-07 (publication, Aria's explicit yes; executor Claude Code): after a scan of a fresh clone of the remote (1 commit, no-reply author and committer, no personal email or secret in metadata or content; 7 mentions of the Windows username in 2 evidence files), the recreated repo `Unn0wn002/AE-Project-Write-Health-Sentinel` was changed from PRIVATE to PUBLIC (MIT detected). Anonymous checks: README, LICENSE and USER_GUIDE return 200; the public API shows one branch (`main`) and only the no-reply identity. Still a beta, not approved for distribution.
- 2026-11-07 (host checks via computer use, Aria's approval; executor Claude Code): W07 large project PASS_BOUNDED_NATIVE (disposable 63.9 MB project; baseline then save then Verify save = PASS, 63,997,697 bytes) and the red FAIL state observed natively (project file deleted after the baseline; Verify save = FAIL "Project file is missing after the save"). Evidence `evidence/native-20261107-w07-fail/README.md`; fixture script `_qa_scratch/w07/make_large.jsx` (git-ignored). Not covered: SMB, autosave freshness, zero-byte FAIL. No product code changed.
- 2026-11-07 (Batch C, U2; executor Claude Code via computer use): the button row stacks vertically below 300 px so the language button is not clipped in a narrow dock. Checked natively at about 245 px (one row) and about 190 px (stacked); Capture baseline and Verify save were not re-run after the change (27/27 tests, static checks). Script sha256 `8250632fb9257db49a539f1ee6a2d35dbdc4b946a92137ad6cd71ed1cfe1fd1f`; the local `dist/` copy equals it. Evidence `evidence/native-20261107-u2-narrow-buttons/README.md`.
