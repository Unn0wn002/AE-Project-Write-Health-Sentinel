# AE Project Write Health Sentinel: user guide

Host: Adobe After Effects 2026. Status: beta, not released.

## What it does
Checks whether After Effects really wrote your project file after a Save or Save As, by comparing the file's size and modified time with a baseline. It also reports the newest autosave file it finds and the kind of location (local, mapped, cloud-synced). It is read-only and writes no files.

## What it does not do
It is not a backup or autosave tool, cannot prove why a write failed, and cannot detect corruption inside a written file. A missing autosave is reported as UNKNOWN, not as a failure.

## Install
1. In After Effects choose File > Scripts > Install ScriptUI Panel... and pick `src/WHS_Probe.jsx`. (Make a copy named `Write_Health_Sentinel.jsx` first for a nicer menu name.)
2. Restart After Effects, then open Window > Write_Health_Sentinel.jsx.
3. Drag its tab onto a panel group until the blue drop highlight appears to dock it.
4. To try it without installing: File > Scripts > Run Script File... and pick `src/WHS_Probe.jsx` (floating panel).

## Use
1. Open and save your project once so it has a path.
2. Press **Capture baseline**.
3. Save in After Effects (File > Save or Save As).
4. Press **Verify save**. The result is PASS, WARN, FAIL, NOT_UPDATED or INSUFFICIENT, with the save check, autosave and location.
5. The language button switches Japanese and English.

## Reading the result
PASS means the file's modified time advanced after the baseline. NOT_UPDATED means it did not advance, so either no save happened or the write did not reach the disk. INSUFFICIENT means there was not enough information.

## Remove
File > Scripts > Install ScriptUI Panel copies the script into your per-user `Scripts\ScriptUI Panels` folder. Delete the copy there and restart After Effects. (Removal has not been tested natively.)

## Limits
- Not tested natively: large projects, network (SMB) shares, autosave freshness and the red FAIL state.
- Collect Files is not implemented.
- Beta, not released and not approved for distribution. Verified on one Windows machine only; no macOS, other-build or clean-profile claim is made (see `PROJECT_STATUS.md`).
- The Japanese wording has not had a native-speaker review.
- A scan describes what was checked. It never certifies the final output of your project.

Full status and evidence: `PROJECT_STATUS.md`. Licence: MIT (see `LICENSE`).
