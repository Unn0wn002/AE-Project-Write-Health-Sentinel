# Native run: coloured result line — 2026-11-01

Owner request: make the plugins' UI easier to see ("All six"). Code: commit dfb545a (a bold coloured result line above the details; tone mapping `whsTone` in the core, unit-tested). Installed copy refreshed through File > Scripts > Install ScriptUI Panel (Overwrite) and After Effects restarted (allowed); installed hash = source hash (`4E7F4C19C159F71C…`).

## Observed (After Effects 2026, one machine, docked panel, Japanese UI)
- With the Unicode Guard's fixture project open and a stored baseline for that project, 「保存を確認」 showed the headline 「結果：NOT_UPDATED（未更新）」 in bold red above the details (NOT_UPDATED is treated like a failure).
- The font-size increase is not clearly visible in the dock; bold and colour are.
- A green PASS headline was not shown natively this run (tone mapping PASS → green is unit-tested only).

## Incident
The panel showed a baseline captured at 17:16:43 for the Guard's fixture project that I did not deliberately capture; most likely one of my clicks or Enter presses activated 「基準を記録」. Harmless (it only stores a baseline in After Effects' settings) but recorded as unexplained.

## Result
W16 coloured result line (red path): PASS_BOUNDED_NATIVE. Unit tests 26/26.
