# Observation: docked panel placement persists across a restart — 2026-11-01

Host: After Effects 2026, one machine. Recorded while testing the Unicode Guard conversion (see that project's `evidence/native-20261101-panel-v02`); no separate Sentinel run was made.

## Observed
- The Sentinel panel was docked as a tab in the Project panel group (see `evidence/native-20261101-install-dock`).
- After Effects was then restarted once (to install the Guard panel). When the project reopened, the Sentinel tab (`Write_Health_Sentinel`) was still docked in the Project group.
- The Sentinel's stored baseline had already survived an earlier restart (W12).

## Result
W13 (docked placement persists across a restart): PASS_BOUNDED_NATIVE, one restart, observed by screenshot only; the panel was not used after this restart.

## Limits
One restart; workspace layout resets, other machines and other After Effects builds not tested.
