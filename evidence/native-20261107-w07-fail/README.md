# Native check: large project (W07) and red FAIL state (2026-11-07, Claude Code via computer use)

Class: PASS_BOUNDED_NATIVE on one Windows machine, After Effects 2026 (26.5), the installed Sentinel panel (script sha256 `83f1b134...682b`, equal to `src/WHS_Probe.jsx`). Disposable project only. Screenshots were viewed during the run and were not saved; the observed panel text is recorded here.

## Fixture
`_qa_scratch/w07/make_large.jsx` (ASCII, run in a throwaway project) created 60 compositions, each with a solid layer whose Opacity expression holds a 1,000,000-character comment. The project was saved as `_qa_scratch/w07/W07_large.aep`: **63,942,891 bytes (about 64 MB)**, against well under 1 MB for the earlier W01 to W06 projects. This is a bounded "large" case, not a performance benchmark.

## W07: large project: PASS_BOUNDED_NATIVE
1. Capture baseline (saved project, 63,942,891 bytes, modified 20:03:05, captured 20:03:43).
2. Added a new composition so the project was modified, then File > Save.
3. Verify save: **RESULT: PASS** (green), Save: PASS, "File exists, is non-empty and its modified time advanced", file now **63,997,697 bytes**, modified 2026-11-07 20:03:49. Autosave: UNKNOWN (informational), Location: LOCAL_OR_MAPPED. The panel answered within a few seconds.

## Red FAIL state: PASS_BOUNDED_NATIVE
1. Capture baseline again (63,997,697 bytes, captured 20:04:22).
2. Deleted the disposable `W07_large.aep` from disk (a copy was kept as `W07_large.aep.bak-disposable`, git-ignored).
3. Verify save: **RESULT: FAIL** and **Save: FAIL** shown in red, "Project file is missing after the save. file now: -1 bytes, modified n/a". Autosave stayed UNKNOWN.

## Not covered
Network (SMB) share W08, autosave freshness, custom autosave location, the zero-byte FAIL case, a project larger than about 64 MB, other After Effects builds. Distribution remains NOT approved.
