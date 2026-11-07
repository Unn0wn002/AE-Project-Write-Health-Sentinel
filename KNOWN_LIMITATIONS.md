> **Historical status document (last updated 2026-11-01, per git history; the file has no date).** For current status see [PROJECT_STATUS.md](PROJECT_STATUS.md). Content below is kept unchanged for history; known outdated: restart and cloud-path behaviour were tested later (W06, W12, W13).

# Known limitations

- Native evidence is bounded: one machine, one After Effects 2026 build (number not recorded), local disk, tiny disposable projects. Baseline storage, modified-time checks, a simulated blocked write and the autosave folder were observed once each; nothing was tested across an After Effects restart, on cloud/network paths, or with large projects.
- Autosave folder: on AE 2026 with "Next to Project" it is `<project folder>\Auto-Save` (observed natively once); the older `Adobe After Effects Auto-Save` name is an unverified fallback. A custom autosave location is not handled. "Not found" is UNKNOWN, never FAIL.
- The autosave interval is not read, so autosave age and file name are shown but never judged stale.
- A mapped network drive letter cannot be told apart from a local disk by path.
- Cloud-synced detection is a path-name pattern only.
- Modified-time checks cannot tell "no save happened" from "save silently failed"; both show as NOT_UPDATED.
- Cloud or network file systems may delay or round modified times.
- Does not detect corruption inside a file that was written.
- Does not reproduce or prove the Adobe silent-save bugs cited in the research sheet; those sources were not re-checked.
- Japanese UI text has not been reviewed by a native speaker. The JSON report on the console stays in English.
