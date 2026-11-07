# Native run W03 (autosave) — 2026-11-01

Host: After Effects 2026 (Windows 11), same machine/session as the earlier 2026-11-01 runs. Build number not recorded. Disposable project `_qa_scratch\whs_w01_20261101\saveas_target\whs_test_saveas.aep`.

## Preference change (reversible) and restore
Original (read from Preferences > Project > Auto-Save before changing): Save every **20 minutes** (on), Save when starting render queue (on), Max versions **5**, Location **Next to Project**.
Temporarily set the interval to **1 minute** to get an autosave quickly; restored to **20** afterwards (screenshot-verified in the dialog; the other settings were left untouched).

## Observed
1. Added "Comp 4" and left the project unsaved (title *). At 13:36:17 the folder held only the two project files.
2. Autosave appeared at **13:37:14**: `saveas_target\Auto-Save\whs_test_saveas auto-save 1.aep`, 228,706 bytes (shell check).
3. Pre-fix script (commit 508363b): Write PASS, **"Autosave: UNKNOWN — No autosave files found at the checked location"**. This is a **false negative**: the script looked in `Adobe After Effects Auto-Save`, but AE 2026 wrote to `Auto-Save`.
4. Fix: `whsAutosaveFolderNames()` now checks `Auto-Save` first and the older name as an UNVERIFIED fallback. 20/20 unit tests pass (test doubles).
5. Post-fix script: Write PASS; **"Autosave: INFO — interval unknown; reporting age only"** (file found).

## Result
- W03 PASS_BOUNDED_NATIVE: with "Next to Project", AE 2026 writes autosaves to `<project folder>\Auto-Save\<project name> auto-save N.aep`; the fixed script finds them. One run, one machine, one build.
- Finding F2 resolved: the original folder guess was wrong.

## New findings
- **F4:** the alert text shows no autosave age or file name (they are in the JSON on the console only), so the user can't see how fresh the autosave is. Not fixed.
- **F5:** autosave interval is still not read, so staleness (WARN) can never trigger from the dialog path; only the 0-byte FAIL can. The configured interval is visible in Preferences but whether a script can read it is UNVERIFIED.
- Custom autosave location is not handled (only "Next to Project").
- Render-queue autosave and the "Maximum Project Versions" rotation were not tested.
