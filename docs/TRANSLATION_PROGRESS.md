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
| Statistics and records | in progress | Main statistics, matter scale, challenge records, past prestige runs, multiplier shell, and glyph-set records translated; multiplier entry database remains |
| Achievements | in progress | Main screen chrome, rows 1-13, and all secret achievement data translated; rows 14-18 remain |
| Challenges | not started | |
| Infinity systems | translated | Build and residue scan complete; full unlocked-state layout QA remains |
| Eternity systems | in progress | Core systems and Time Study interface translated; individual Time Study data remains |
| Dilation systems | not started | |
| Reality and Glyph systems | not started | |
| Automator UI and documentation | not started | Commands remain English |
| Celestials and story dialogue | not started | |
| Help and catch-up documentation | in progress | All initially unlocked H2P articles and initial catch-up content translated; later progression articles and catch-up entries remain |
| News ticker | in progress | General messages a1-a140 translated except long-form a112/a113; a378 translated; later and conditional news remain |
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

## Steam packaging note

The Electron entry point in `main.js` loads `AppFiles/index.html`. Release builds must therefore be overlaid into the
extracted ASAR's `AppFiles/` directory, not the ASAR root. Verification must inspect `AppFiles/js/app.js` and compare its
hash with the build output; searching the ASAR root can produce a false positive without changing the live game.

When extracting the original package, the ASAR filename and its sidecar directory must remain paired as
`app.asar` and `app.asar.unpacked`. Extracting a renamed file such as `app.asar.backup-ko-test` makes the ASAR tool
look for a nonexistent `app.asar.backup-ko-test.unpacked`, silently producing an incomplete package that opens to a
white screen. Always stage both under their canonical names before extraction and verify the repacked app launches.
