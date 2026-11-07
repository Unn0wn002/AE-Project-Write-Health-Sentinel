# Native run: Japanese-first UI (v0.3) — 2026-11-01

Host: After Effects 2026 (26.5 preferences folder), Windows 11, one machine; build number not recorded. Owner request: "Yes, add Japanese UI" (after the quality review). Code: commits ebc5cfd (Japanese UI, message codes, i18n tests) and 1c7cd67 (taller intro text). Installed copy refreshed twice through File > Scripts > Install ScriptUI Panel ("File Exists… overwrite?" → Overwrite) and After Effects restarted twice (allowed by the owner). Installed file hash = source hash after each install (last: `0FAC544E7AE7013C…`).

## How the text is stored
`i18n/messages.json` holds Japanese and English side by side (51 keys each). `scripts/gen_i18n.py` writes them into the script as `\u` escapes, so `src/WHS_Probe.jsx` stays pure ASCII (a static check enforces this) and After Effects reads it correctly whatever encoding it assumes. The core now returns a message code next to every English reason; the English reasons stay in the JSON output unchanged.

## Observed
1. After the first install + restart, the docked Sentinel tab showed Japanese: buttons 「基準を記録」「保存を確認」「English」, stored baseline in Japanese (「基準：… サイズ 228057 バイト、更新 …、記録 …」).
2. With a different project open (the Unicode Guard fixture project) 「保存を確認」 showed a NON-PASS result in Japanese: 「結果：NOT_UPDATED（未更新）」, 「保存チェック：NOT_UPDATED（未更新）」 with the reason 「プロジェクトのパスが変わりましたが、新しいファイルは基準の記録より古いです。」, current file 37,775 bytes, autosave UNKNOWN (informational), location in Japanese. This also covers the earlier gap "failure display not re-run in the panel".
3. 「English」 switched every label and the existing result to English without re-checking; 「日本語」 switched back.
4. Finding: in the narrow dock the last line of the Japanese description was cut off. Fixed by making the intro taller (1c7cd67), re-installed, restarted: the full description is visible.

## Result
- W14 Japanese UI with English toggle, docked: PASS_BOUNDED_NATIVE.
- W15 NOT_UPDATED (failure) display in the panel: PASS_BOUNDED_NATIVE (via the Save-As-older path, one run).
- Unit tests 25/25 (includes translation coverage: every code and UI key has Japanese and English text; generated table matches messages.json); static checks pass.

## Not established
- Japanese wording has not been reviewed by a native speaker.
- Whether the language choice persists across a restart was not isolated (the panel was set back to Japanese, which is also the default).
