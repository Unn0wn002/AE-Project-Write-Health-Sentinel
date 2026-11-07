# Native check: Save / Autosave / Location lines (2026-11-02)

Class: PASS_BOUNDED_NATIVE for the floating panel only. After Effects 2026, one machine.

What changed (branch `ui/result-lines-20261102`, display only): three short coloured lines under the headline: Save (green PASS, red FAIL or NOT_UPDATED, amber WARN or INSUFFICIENT), Autosave, and Location (amber for network, cloud-synced and volume paths; grey otherwise). The verdict logic and the JSON written to the console are unchanged.

How it was run: the Unicode Guard fixture project was open with a baseline captured on 2026-11-01. `src\WHS_Probe.jsx` was run with File > Scripts > Run Script File, then Verify save was clicked. The panel was NOT installed, so this is a floating window.

| Check | Result | Evidence |
|---|---|---|
| English: headline NOT_UPDATED (red); Save NOT_UPDATED (red); Autosave UNKNOWN and Location LOCAL_OR_MAPPED (grey) | PASS_BOUNDED_NATIVE | `sentinel-en-verify.jpg` |
| Japanese switch redraws the same three lines | PASS_BOUNDED_NATIVE | `sentinel-ja-verify.jpg` |
| Language put back to English afterwards (it was English before) | done | n/a |
| A PASS result (green Save line) and a network or cloud path (amber Location line) | NOT_RUN natively; tone mapping covered by unit tests | `tests/core.test.js` |
| Installed and docked in a narrow dock | NOT_RUN | needs an install, which needs the owner's yes |

Not changed: the autosave file name and age are still only in the details text, shown when a newest autosave exists. Japanese wording is not reviewed by a native speaker. Unit tests: 27 pass, static checks ok.
