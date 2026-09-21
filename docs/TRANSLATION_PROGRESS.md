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
| Help and catch-up documentation | translated | All compatible base-game H2P articles and catch-up entries imported; terminology and layout QA remain |
| News ticker | in progress | 1,302 previously untouched base-game message properties imported from the reference translation; mixed-language wordplay and a smaller incompatible residue remain |
| Changelog | not started | Final content batch |
| Release installer and restoration | not started | Must validate Steam version/hash |
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

## Steam packaging note

The Electron entry point in `main.js` loads `AppFiles/index.html`. Release builds must therefore be overlaid into the
extracted ASAR's `AppFiles/` directory, not the ASAR root. Verification must inspect `AppFiles/js/app.js` and compare its
hash with the build output; searching the ASAR root can produce a false positive without changing the live game.

When extracting the original package, the ASAR filename and its sidecar directory must remain paired as
`app.asar` and `app.asar.unpacked`. Extracting a renamed file such as `app.asar.backup-ko-test` makes the ASAR tool
look for a nonexistent `app.asar.backup-ko-test.unpacked`, silently producing an incomplete package that opens to a
white screen. Always stage both under their canonical names before extraction and verify the repacked app launches.
