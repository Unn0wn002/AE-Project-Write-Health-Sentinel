# Native check: installed and docked result lines (2026-11-02)

Class: PASS_BOUNDED_NATIVE (one machine, After Effects 2026, panel docked beside Project, about 230 px wide).

Install: the owner allowed it. The merged `src\WHS_Probe.jsx` was copied to the per-user `ScriptUI Panels` folder (previous copy kept in the session scratchpad), After Effects was restarted, and the panel was opened from the Window menu. Fixture project: the Unicode Guard fixture, with the baseline captured on 2026-11-01.

| Check | Result | Evidence |
|---|---|---|
| Docked Verify save: headline NOT_UPDATED (red), Save NOT_UPDATED (red), Autosave UNKNOWN and Location LOCAL_OR_MAPPED (grey); nothing clipped | PASS_BOUNDED_NATIVE | `sentinel-docked-ja-en.jpg` |
| A PASS result (green Save line) and a network or cloud path (amber Location line) | NOT_RUN natively; tone mapping unit-tested | `tests/core.test.js` |

No code change in this round. The installed file equals the merged `src\WHS_Probe.jsx` (sha256 83f1b134...). The 日本語 button sits at the panel edge in the narrow dock (existing layout, not changed).
