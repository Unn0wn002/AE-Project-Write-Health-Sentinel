# Native check: narrow-dock buttons (U2, 2026-11-07, Claude Code via computer use)

Class: PASS_BOUNDED_NATIVE (layout only), one Windows machine, After Effects 2026 (26.5). Installed copy of `src/WHS_Probe.jsx`, sha256 `8250632fb9257db49a539f1ee6a2d35dbdc4b946a92137ad6cd71ed1cfe1fd1f`. Screenshots were viewed and not saved.

## What changed
The button row (Capture baseline, Verify save, language) now stacks vertically when the panel is narrower than 300 px, so the language button is never clipped. Wider panels keep one row. No scan logic changed.

## Observed
- Docked frame about 245 px wide: the three buttons in one row, all fully visible.
- Docked frame narrowed to about 190 px: the buttons stacked (Capture baseline, Verify save, 日本語), nothing clipped, intro text wrapped, details visible.
- The frame was restored afterwards.

## Not covered
The Capture baseline and Verify save functions were not re-run after the layout change in this check (unit tests 27/27 and static checks pass, test doubles only); other widths and Japanese labels were not photographed. Gate unchanged: not approved for distribution.
