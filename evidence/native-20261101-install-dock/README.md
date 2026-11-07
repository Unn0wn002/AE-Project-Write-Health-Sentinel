# Native run: install as a ScriptUI panel and dock — 2026-11-01

Host: After Effects 2026 (26.5 preferences folder), Windows 11, one machine; build number not recorded. Owner approval: "Yes, install it" (in reply to the question about installing the panel to test docking). Panel code: `src/WHS_Probe.jsx` v0.2 at commit 079d15c; the installed file is a byte-identical copy named `Write_Health_Sentinel.jsx` (SHA-256 `7757AA7D10F627E42B465256F5DFD7F7119961503748759BB935D0C6DC9CF8C1`, made in this project's `dist/`, git-ignored).

## What was done and observed
1. Before: `C:\Program Files\Adobe\Adobe After Effects 2026\Support Files\Scripts\ScriptUI Panels\` held 7 files (including the owner's earlier `CutBridge.jsx`). That folder was NOT modified.
2. File > Scripts > Install ScriptUI Panel… and picked the copy. After Effects replied: "One or more script files were successfully copied to your preferences folder. Restart After Effects to add these scripts to the Window menu." The file landed at `C:\Users\unn0w\AppData\Roaming\Adobe\After Effects\26.5\Scripts\ScriptUI Panels\Write_Health_Sentinel.jsx` (12,880 bytes); hash identical to the source copy.
3. Clicked "Restart After Effects" (the only open project was the disposable one, already saved). After Effects restarted to its home screen; I reopened the disposable project from the recent list.
4. Window menu now lists `Write_Health_Sentinel.jsx` (below CutBridge.jsx). Opened it: it appeared as a floating panel window with a tab, showing the baseline stored before the restart (captured 15:40:43), so the stored baseline **survived a full After Effects restart**.
5. Docking: dragging the tab quickly just moved the floating window. A slow drag (mouse down, several small moves, release) over the Project panel group showed After Effects' blue drop highlight, and releasing there docked it: the panel became a tab ("Project | Write_Health_Sentinel | Effect…") and re-laid itself out to the narrow width.
6. In the docked panel: Capture baseline (current file 228,057 bytes), added a composition and saved (shell: 282,359 bytes at 15:50:59), Verify save: "RESULT: PASS", save check PASS, autosave INFO "whs_test_saveas auto-save 2.aep, 10.1 min old", location LOCAL_OR_MAPPED.

## Result
- Install via the supported menu: PASS_BOUNDED_NATIVE (it goes to the per-user preferences folder, not Program Files).
- Docked panel: PASS_BOUNDED_NATIVE (docks, works in a narrow dock).
- Stored baseline persists across an After Effects restart: PASS_BOUNDED_NATIVE (one restart).

## Not established
- Whether the docked placement persists across another restart (workspace layout was not re-checked).
- The NOT_UPDATED failure path inside the docked panel (logic unchanged since the earlier lock test).
- Other After Effects builds, other machines, large projects.

## State left / how to undo
- The installed panel is a COPY. After a code change the owner must re-install (or replace the file in the preferences folder); it does not update itself.
- To uninstall: close the panel, quit After Effects, delete `C:\Users\unn0w\AppData\Roaming\Adobe\After Effects\26.5\Scripts\ScriptUI Panels\Write_Health_Sentinel.jsx`, restart. I did not do this.
- After Effects is open on the disposable project (saved) with the panel docked beside Project. The stored baseline setting remains in After Effects' settings.
