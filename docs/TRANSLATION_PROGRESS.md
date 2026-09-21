# Translation progress

Status values: `not started`, `in progress`, `translated`, `QA complete`.

| Area | Status | Notes |
| --- | --- | --- |
| Scope, glossary, and audit tooling | translated | Final QA remains |
| Font and licensing | QA complete | Galmuri9 Regular, SIL OFL 1.1 |
| Global navigation and progression tabs | translated | Layout QA remains for locked/unlocked states |
| Early Modern UI | in progress | Dimension screen, navigation, sidebar resources, and shared modal controls translated; installed for tester recheck |
| Early Classic UI | translated | Layout QA remains |
| Options and common modals | in progress | Gameplay, visual, saving, hotkeys, confirmation, animation, news, info display, notation, visible-tabs, backup UI, and early reset confirmations translated; unlocked late-game option dialogs remain |
| Statistics and records | translated | Main statistics, matter scale, challenge records, past prestige runs, multiplier breakdown entries, and glyph-set records translated; layout QA remains |
| Achievements | translated | Main screen chrome, all normal rows, rewards, and secret achievement data translated; layout QA remains |
| Challenges | in progress | Normal Challenge data and start/exit UI translated; Infinity and Eternity Challenge residue remains |
| Infinity systems | translated | Build and residue scan complete; full unlocked-state layout QA remains |
| Eternity systems | in progress | Core systems, Time Study interface, and compatible base-game Time Study data translated; residue remains |
| Dilation systems | in progress | Core tab, entry/exit dialogs, upgrades, and compatible base-game data imported; residue and layout QA remain |
| Reality and Glyph systems | in progress | Compatible base-game Reality/Imaginary upgrades, perks, Glyph dialogs, and filters imported; screen QA and residue remain |
| Automator UI and documentation | in progress | Most editor UI, transfer screens, templates, errors, and documentation imported; commands remain English intentionally for script compatibility |
| Celestials and story dialogue | in progress | Compatible base-game tabs, mechanics, navigation text, and quote data imported; residue and story QA remain |
| Help and catch-up documentation | translated | All compatible base-game articles plus previously skipped Reality and Nameless Ones articles translated; terminology and layout QA remain |
| News ticker | translated | All 1,410 static entries reviewed; ordinary English sentences and added explanatory tails are cleared, with only URLs, code, icons, hashtags, and deliberate symbols retained |
| Changelog | translated | All 22 entries translated; HTML, formulas, hotkeys, code names, and external proper names preserved |
| Release installer and restoration | in progress | Copy-over ZIP is now the default release format; hash-gated installer and backup restore remain available as developer tools |
| Clean-install release QA | not started | Includes update/restore test |

Update this file whenever a translation batch is committed. An area becomes `QA complete` only after build, residue scan, placeholder validation, and in-game layout review.

## Latest tester-facing batch

- Source translation: complete for the three main Options subtabs and their common dialogs.
- Initial help: shell and the articles shown at the start of a new save are translated; later progression articles remain.
- Build validation: Steam release build and changed-file whitespace checks passed; whole-repository lint still has pre-existing errors.
- In-game installation: corrected runtime path (`app.asar/AppFiles/`) installed; runtime bundle hash, localized markers, absence of the old H2P title/search text, original backup, and five responding Electron processes verified.
- Screen QA: pending tester review for Modern UI, Options, and Help layouts.

## Current tester-requested batch

- Automation tab: shared controls and all standard autobuyer panels translated, including locked and late-game variants.
- Achievements: normal/secret achievement screen chrome, normal rows 1-13, and all secret achievement data translated.
- News ticker: general messages a59-a140 translated except long-form a112/a113; safe runtime package installed and verified.
- Runtime recovery: a white-screen package was isolated and the original ASAR restored. The failure was caused by
  extracting a renamed backup without a correspondingly renamed `.unpacked` sidecar; no save data was deleted.
- Save safety: a read-only recovery copy of the Electron user-data directory was created before further runtime work.
- Early reset confirmations: Dimensional Sacrifice, Dimension Boost, and Antimatter Galaxy confirmation headers,
  consequences, multipliers, buttons, and confirmation-option labels translated and installed; runtime hash, native
  sidecar count (304), and five responding Electron processes verified.
- Base-game reference import: reused Korean wording from SameMa's Endgame Korean fork only where the Steam base item
  exists and its English AST matches the Steam source. This imported 124 wholly compatible translated files, 1,302
  news properties, 91 normal-achievement properties, and the remaining multiplier-breakdown labels without importing
  Endgame systems or content. Steam build, absence of an `Endgame Skills` marker, ASAR hash, native sidecar count (304),
  and five responding Electron processes were verified.
- Mixed base/extension files: imported a further compatible set by matching literal base-game IDs and verifying each
  English property against the Steam source. This covered Normal Challenges, Time Studies, Reality and Imaginary
  upgrades, perks, Celestial data, catch-up entries, and all remaining base-game H2P articles without copying extension
  entries. Translation-audit candidates fell from 10,344 to 9,834.
- Time localization: global `TimeSpan` output now uses Korean units (`년`, `일`, `시간`, `분`, `초`, `밀리초`) and
  save creation timestamps use `YYYY년 MM월 DD일 HH:MM:SS`. Achievement 172's formula-preserving Korean description
  was added manually because the base and reference use different constant names. The updated Steam package was built,
  checked for absence of an Endgame marker, installed, and launched with five responding Electron processes.
- Exact-hunk base import: imported 1,343 additional Korean diff hunks only when the removed English lines appeared
  exactly once in both the official Steam base and current source. Endgame-only additions had no base match and were
  excluded. This covered Celestial dialogue/UI, Glyph and Reality screens, Automator help/errors, Black Hole,
  Replicanti, Dilation, save dialogs, and assorted shared status text. Audit candidates fell from 9,834 to 8,194;
  the Steam build, ASAR hash, 304-file native sidecar, absence of an Endgame marker, and five responding processes passed.
- Late-game visible-residue pass: translated the Replicanti Galaxy and Reality confirmation modals, Reality Upgrade
  tooltips, Replicanti status and production text, Black Hole 2 timing states, game-speed/challenge headers, save-import
  timing details, Dilation controls, Reality reward details, Automator speed explanation, Pelle's post-completion New
  Game screen, and the visible Lai'tela Singularity/Annihilation/Dimension/run text. The two wholly English base-game
  H2P articles for Reality and the Nameless Ones were also translated without importing Endgame-only content. The
  focused ESLint pass and Steam release build passed; translation-audit candidates fell from 8,194 to 8,083.
- Remaining-system pass: translated visible Glyph creation/sacrifice/effect text, Reality and Imaginary Upgrade
  requirements, Dilation Upgrades, late Time Studies, Perk Shop, Alchemy resources, Celestial navigation, Lai'tela
  milestones, Automator human-readable documentation, template names, credits roles, and assorted headers/modals.
  Automator syntax tokens and internal identifiers remain English intentionally. NEWS is excluded from further parallel
  editing because the tester is translating it separately. Audit candidates fell further to 7,989 before the latest
  batch; a fresh final audit remains.
- Distribution tooling: added an elevation launcher, SHA-256-gated PowerShell installer, and independently callable
  restore tool. The installer preserves a verified original ASAR, refuses unknown game versions, leaves the native
  `app.asar.unpacked` sidecar and save data untouched, and verifies the installed payload. Isolated round-trip QA remains.
- NEWS completion: reviewed all 1,410 static NEWS entries through the AST. Ordinary English prose and translator-added
  explanatory suffixes are gone; the nine non-Korean residues are intentional URLs, code fragments, hashtags, mentions,
  icons, or visual symbols. Babel parsing, whitespace checks, and focused ESLint passed.
- Changelog localization: translated every entry from the 2026 iOS release through the full 2022 Reality Update,
  then completed every 2018 and 2017 legacy entry. HTML, formulas, version numbers, hotkeys, code names, and Automator
  command tokens were preserved; focused ESLint and whitespace checks passed.
- Release format: changed the public installation path to the usual Steam fan-patch workflow. The generated ZIP now
  contains `resources/app.asar` and can be copied directly over the game root. The Korean installation guide,
  attribution, font license, manifest, archive paths, and payload hash were verified in a layout test.
- Repository publishing: connected `https://github.com/j3s30p/antimatter_ko.git` as the `korean` remote and pushed the
  `korean-localization` default branch. The repository front page now uses a Korean `README.md` only.
- RC1 runtime package: rebuilt the latest source as `0.9.0-rc.1`, re-extracted it, and verified an exact app-bundle
  hash match, 304 Greenworks sidecar files, Galmuri9, Korean NEWS/Nameless Ones/changelog markers, and absence of the
  Endgame Skills marker. The payload was installed into the tester's Steam folder and relaunched with five responding
  Electron processes. The copy-over release ZIP contains `resources/app.asar` and matches the manifest SHA-256.
- RC2 late-game correction batch: translated the remaining current-Glyph Pelle effects, Reality Shard cost label,
  Pelle strike penalty, Lai'tela entropy description and Singularity notifications, upgrade-lock warnings, crash
  detail prompt, special-Glyph warnings, and visible autobuyer names. Player-facing `Teresa`/`Pelle` references were
  normalized to `테레사`/`펠레` across tabs, help, catch-up text, Celestial navigation, quotes, achievements, progress
  labels, multiplier breakdowns, and notifications while preserving internal keys. All player-facing Celestial names
  are now standardized as `테레사`, `에파리그`, `이름 없는 자들`, `V`, `라`, `라이텔라`, and `펠레`. Pelle's
  readable `wordShift` candidates, fixed quote fragments, rift resource cycle, and end-tab sequence were localized
  while random corruption, Zalgo, and intentional glitch effects remain unchanged. The Steam build and changed-file
  ESLint passed, the ASAR was re-extracted with an exact bundle hash match and 304 Greenworks files, localized marker
  checks passed, and `0.9.0-rc.2` was installed and relaunched with five responding Electron processes. Manual
  late-game screen and layout QA remains in progress with the tester.
- RC3 final-audit batch: localized recent-Eternity mode labels, Singularity milestone timing states, Dilation Study
  import fallback, Dilation Upgrade next-value label, and completed V-Achievement navigation labels. Corrected the
  tachyon background animation's translated-tab lookup, localized the Teresa Perk Shop cost unit, and changed all
  Celestial H2P sidebar aliases to `테레사`, `에파리그`, `이름 없는 자들`, `V`, `라`, `라이텔라`, and `펠레`.
  The three Lai'tela Dark Matter Dimension purchase buttons now use their existing vertical footprint more effectively
  with a local six-rem height and tighter line height, preventing three-line Korean costs from being clipped without
  changing the global font. Focused ESLint passed with only the pre-existing import-order warning in `src/game.js`;
  the fresh translation audit reports 7,393 candidates, most of which are internal identifiers, code tokens, external
  proper names, or intentionally preserved syntax rather than confirmed visible untranslated text. RC3 was built and
  re-extracted with an exact app-bundle hash match; the installed ASAR hash matches the payload, the live Greenworks
  sidecar remained at 304 files, and the game was launched from a confirmed zero-process state with exactly five
  responsive Electron processes. The release ZIP was re-extracted and its payload hash matches the RC3 manifest.
- RC4 Korean pluralization fix: added a Hangul guard to the shared `pluralize()` function so Korean nouns passed by
  `pluralize()`, `quantify()`, and `quantifyInt()` never receive the English fallback `s`. This fixes the entire class
  of outputs such as `현실 조각s`, `퍼크 포인트s`, `글리프s`, `타키온 은하s`, `회s`, and `개s` while preserving
  the existing English singular/plural behavior. Focused ESLint, whitespace checks, the Steam build, exact extracted
  bundle hash comparison, 304-file Greenworks sidecar check, and absence of the Endgame marker passed. RC4 was installed
  only after all five existing game processes were stopped and a zero-process state was verified; the game was then
  launched exactly once and returned to five responsive Electron processes.
- Abbreviation fidelity pass: compared all player-facing JS/Vue strings in 679 source files against the official
  `origin/master` source while requiring original abbreviations (`AM`, `AD`, `AG`, `IP`, `ID`, `IC`, `EP`, `EC`,
  `TT`, `DT`, `TP`, `RM`, `iM`, `DM`, `DE`, `RS`, and `TD`) to remain abbreviated and original full names to remain
  full Korean names. The structural audit, file-level count audit, and parser checks now report zero mismatches and
  zero failures. Automator command tokens and internal identifiers were left unchanged.
- GitHub release layout correction: public ZIP archives are now GitHub Release assets rather than files tracked at the
  default branch root. The default branch contains only the copy-over release payload and its required documentation:
  `resources/app.asar`, the Korean installation guide, manifest, attribution, Galmuri license, and repository README.
  The `v0.9.0-rc.4` prerelease asset was downloaded back from GitHub and matched the locally generated ZIP SHA-256
  exactly.

## Steam packaging note

The Electron entry point in `main.js` loads `AppFiles/index.html`. Release builds must therefore be overlaid into the
extracted ASAR's `AppFiles/` directory, not the ASAR root. Verification must inspect `AppFiles/js/app.js` and compare its
hash with the build output; searching the ASAR root can produce a false positive without changing the live game.

When extracting the original package, the ASAR filename and its sidecar directory must remain paired as
`app.asar` and `app.asar.unpacked`. Extracting a renamed file such as `app.asar.backup-ko-test` makes the ASAR tool
look for a nonexistent `app.asar.backup-ko-test.unpacked`, silently producing an incomplete package that opens to a
white screen. Always stage both under their canonical names before extraction and verify the repacked app launches.
