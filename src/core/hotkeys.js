import Mousetrap from "mousetrap";

import { ElectronRuntime } from "@/steam";

import { GameKeyboard } from "./keyboard";

// Add your hotkeys and combinations here
// GameKeyboard.bind for single press combinations
// GameKeyboard.bindRepeatable for repeatable combinations
// Hotkeys obey player.options.hotkeys option, and should be everying relating to the functionality of the game itself
// GameKeyboard.bindHotkey for single press hotkeys
// GameKeyboard.bindRepeatableHotkey for repeatable hotkeys
// GameKeyboard class uses Mousetrap under the hood, so for more details visit
// https://craig.is/killing/mice

// Note: mod is a function key helper by Mousetap for both ctrl and command,
// and should be used to provide support for both Windows and Max

// Note: DON'T add repeatables with modifier keys other than shift
// because Mousetrap is crap, and we needed to plug it up to work
// properly with shift, so you will need to plug it up additionally
// for the other modifier keys (#3093).

// Free keys:
// i, j, k, l, n, o, p, q, v, w, x


export const shortcuts = [
  {
    name: "자동 구매기 전환",
    keys: ["a"],
    type: "bindHotkey",
    function: () => keyboardToggleAutobuyers(),
    visible: true
  }, {
    name: "틱스피드 1개 구매",
    keys: ["shift", "t"],
    type: "bindRepeatableHotkey",
    function: () => buyTickSpeed(),
    visible: true
  }, {
    name: "틱스피드 최대로 구매",
    keys: ["t"],
    type: "bindRepeatableHotkey",
    function: () => buyMaxTickSpeed(),
    visible: true
  }, {
    name: "모두 최대로",
    keys: ["m"],
    type: "bindRepeatableHotkey",
    function: () => {
      maxAll();
      return shortcutBinding(shortcuts[3]) === "space" ? false : undefined;
    },
    visible: true
  }, {
    name: "차원 희생",
    keys: ["s"],
    type: "bindRepeatableHotkey",
    function: () => sacrificeBtnClick(),
    visible: true
  }, {
    name: "차원 가속",
    keys: ["d"],
    type: "bindRepeatableHotkey",
    function: () => manualRequestDimensionBoost(true),
    visible: true
  }, {
    name: "차원 가속 1회",
    keys: ["shift", "d"],
    type: "bindRepeatableHotkey",
    function: () => manualRequestDimensionBoost(false),
    visible: false
  }, {
    name: "반물질 은하",
    keys: ["g"],
    type: "bindRepeatableHotkey",
    function: () => manualRequestGalaxyReset(true),
    visible: true
  }, {
    name: "반물질 은하 1개",
    keys: ["shift", "g"],
    type: "bindRepeatableHotkey",
    function: () => manualRequestGalaxyReset(false),
    visible: false
  }, {
    name: "빅 크런치",
    keys: ["c"],
    type: "bindRepeatableHotkey",
    function: () => manualBigCrunchResetRequest(),
    visible: true
  }, {
    name: "복제자 은하",
    keys: ["r"],
    type: "bindHotkey",
    function: () => {
      replicantiGalaxyRequest();
      setHoldingR(true);
    },
    visible: () => Replicanti.areUnlocked || PlayerProgress.eternityUnlocked()
  }, {
    name: "영원",
    keys: ["e"],
    type: "bindRepeatableHotkey",
    function: () => eternityResetRequest(),
    visible: () => PlayerProgress.eternityUnlocked() || Player.canEternity
  }, {
    name: "시간 연구 재분배 전환",
    keys: ["shift", "e"],
    type: "bindHotkey",
    function: () => {
      player.respec = !player.respec;
      GameUI.notify.info(`시간 연구 재분배가 ${player.respec ? "활성화" : "비활성화"}되었습니다`);
    },
    visible: () => PlayerProgress.eternityUnlocked()
  }, {
    name: "시간 팽창 입장/나가기",
    keys: ["l"],
    type: "bindRepeatableHotkey",
    function: () => startDilatedEternityRequest(),
    visible: () => PlayerProgress.realityUnlocked() || PlayerProgress.dilationUnlocked()
  }, {
    name: "현실",
    keys: ["y"],
    type: "bindRepeatableHotkey",
    function: () => requestManualReality(),
    visible: () => PlayerProgress.realityUnlocked() || isRealityAvailable()
  }, {
    name: "글리프 장착 해제 전환",
    keys: ["shift", "y"],
    type: "bindHotkey",
    function: () => {
      player.reality.respec = !player.reality.respec;
      GameUI.notify.info(`Glyph respec is now ${player.reality.respec ? "active" : "inactive"}`);
    },
    visible: () => PlayerProgress.realityUnlocked()
  }, {
    name: "오토메이터 시작/일시정지",
    keys: ["u"],
    type: "bindHotkey",
    function: () => keyboardAutomatorToggle(),
    visible: () => Player.automatorUnlocked
  }, {
    name: "오토메이터 다시 시작",
    keys: ["shift", "u"],
    type: "bindHotkey",
    function: () => keyboardAutomatorRestart(),
    visible: () => Player.automatorUnlocked
  }, {
    name: "편집 실행 취소 (오토메이터)",
    keys: ["mod", "z"],
    type: "bind",
    function: () => AutomatorData.undoScriptEdit(),
    visible: () => Player.automatorUnlocked
  }, {
    name: "편집 다시 실행 (오토메이터)",
    keys: ["mod", "y"],
    type: "bind",
    function: () => AutomatorData.redoScriptEdit(),
    visible: () => Player.automatorUnlocked
  }, {
    name: "블랙홀 전환",
    keys: ["b"],
    type: "bindHotkey",
    function: () => BlackHoles.togglePause(),
    visible: () => PlayerProgress.realityUnlocked()
  }, {
    name: "연속체 전환",
    keys: ["alt", "a"],
    type: "bindHotkey",
    function: () => keyboardToggleContinuum(),
    visible: () => Laitela.continuumUnlocked
  }, {
    name: "아마겟돈",
    keys: ["z"],
    type: "bindRepeatableHotkey",
    function: () => armageddonRequest(),
    visible: () => Pelle.isDoomed
  }, {
    name: "글리프 장착 해제 전환 (펠레)",
    keys: ["shift", "z"],
    type: "bindHotkey",
    function: () => {
      if (!Pelle.isDoomed) return;
      player.reality.respec = !player.reality.respec;
      GameUI.notify.info(`Glyph respec is now ${player.reality.respec ? "active" : "inactive"}`);
    },
    visible: () => Pelle.isDoomed
  }, {
    name: "게임 저장",
    keys: ["mod", "s"],
    type: "bind",
    function: () => {
      GameStorage.save(false, true);
      return false;
    },
    visible: true
  }, {
    name: "게임 내보내기",
    keys: ["mod", "e"],
    type: "bind",
    function: () => {
      GameStorage.export();
      return false;
    },
    visible: true
  }, {
    name: "단축키 목록 열기",
    keys: ["?"],
    type: "bind",
    function: () => {
      keyboardPressQuestionMark();
      return false;
    },
    visible: true
  }, {
    name: "게임 방법 열기",
    keys: ["h"],
    type: "bind",
    function: () => {
      keyboardH2PToggle();
      return false;
    },
    visible: true
  }, {
    name: "표시할 탭 설정",
    keys: ["tab"],
    type: "bind",
    function: () => {
      keyboardVisibleTabsToggle();
      return false;
    },
    visible: true
  }, {
    name: "창 확인",
    keys: ["enter"],
    type: "bind",
    function: () => {
      EventHub.dispatch(GAME_EVENT.ENTER_PRESSED);
      return true;
    },
    visible: true
  }, {
    name: "창 닫기 또는 설정 열기",
    keys: ["esc"],
    type: "bind",
    function: () => {
      keyboardPressEscape();
      return false;
    },
    visible: true
  }, {
    name: "경의 표하기",
    keys: ["f"],
    type: "bindRepeatable",
    function: () => {
      GameUI.notify.info("경의를 표합니다");
      SecretAchievement(13).unlock();
    },
    visible: false
  }, {
    name: "이전 탭으로 이동",
    keys: ["up"],
    type: "bind",
    function: () => {
      EventHub.dispatch(GAME_EVENT.ARROW_KEY_PRESSED, "up");
      return false;
    },
    visible: false
  }, {
    name: "다음 탭으로 이동",
    keys: ["down"],
    type: "bind",
    function: () => {
      EventHub.dispatch(GAME_EVENT.ARROW_KEY_PRESSED, "down");
      return false;
    },
    visible: false
  }, {
    name: "이전 하위 탭으로 이동",
    keys: ["left"],
    type: "bind",
    function: () => {
      EventHub.dispatch(GAME_EVENT.ARROW_KEY_PRESSED, "left");
      return false;
    },
    visible: false
  }, {
    name: "다음 하위 탭으로 이동",
    keys: ["right"],
    type: "bind",
    function: () => {
      EventHub.dispatch(GAME_EVENT.ARROW_KEY_PRESSED, "right");
      return false;
    },
    visible: false
  }, {
    name: "존재하지 않음",
    keys: ["9"],
    type: "bind",
    function: () => SecretAchievement(41).unlock(),
    visible: false
  },
  {
    name: "자동 구매기 조정",
    keys: ["mod", "alt", "a"],
    type: "bind",
    function: () => keyboardEditAutobuyers(),
    visible: () => Autobuyers.hasAutobuyersForEditModal
  },
  {
    name: "전체 화면",
    keys: ["F10"],
    type: "bind",
    function: () => undefined,
    visible: () => false
  },
  {
    name: "확대",
    keys: ["ctrl", "="],
    type: "bind",
    function: () => ElectronRuntime.increaseZoom(),
    visible: () => false
  },
  {
    name: "확대",
    keys: ["ctrl", "+"],
    type: "bind",
    function: () => ElectronRuntime.increaseZoom(),
    visible: () => false
  },
  {
    name: "축소",
    keys: ["ctrl", "-"],
    type: "bind",
    function: () => ElectronRuntime.decreaseZoom(),
    visible: () => false
  },
  {
    name: "확대/축소 초기화",
    keys: ["ctrl", "0"],
    type: "bind",
    function: () => ElectronRuntime.resetZoom(),
    visible: () => false
  },
];

shortcuts.forEach((shortcut, index) => {
  shortcut.id = `main-${index}`;
  shortcut.category = "게임 및 메뉴";
  shortcut.editable = !["경의 표하기", "존재하지 않음", "전체 화면", "확대", "축소", "확대/축소 초기화"]
    .includes(shortcut.name);
});

function addShortcut({ id, name, key, type, action, category, visible = true }) {
  shortcuts.push({ id, name, keys: key.split("+"), type, function: action, visible, category, editable: true });
}

const autobuyerKeys = [
  ["tickspeed", "틱스피드", "t", () => Autobuyer.tickspeed],
  ["sacrifice", "차원 희생", "s", () => Autobuyer.sacrifice],
  ["dimboost", "차원 가속", "d", () => Autobuyer.dimboost],
  ["galaxy", "반물질 은하", "g", () => Autobuyer.galaxy],
  ["replicanti", "복제자 은하", "r", () => Autobuyer.replicantiGalaxy],
  ["crunch", "빅 크런치", "c", () => Autobuyer.bigCrunch],
  ["eternity", "영원", "e", () => Autobuyer.eternity],
  ["reality", "현실", "y", () => Autobuyer.reality]
];
autobuyerKeys.forEach(([id, name, key, buyer]) => {
  addShortcut({
    id: `auto-${id}`, name: `${name} 자동 구매기 전환`, key: `alt+${key}`, type: "bindHotkey",
    action: () => toggleAutobuyer(buyer()), category: "자동 구매기",
    visible: () => buyer().isUnlocked || buyer().isBought || PlayerProgress.realityUnlocked()
  });
});
addShortcut({
  id: "auto-tickspeed-mode", name: "틱스피드 자동 구매 방식", key: "shift+alt+t", type: "bindHotkey",
  action: () => toggleBuySingles(Autobuyer.tickspeed), category: "자동 구매기",
  visible: () => Autobuyer.tickspeed.isUnlocked || Autobuyer.tickspeed.isBought
});
Array.range(1, 8).forEach(tier => {
  addShortcut({
    id: `dimension-ten-${tier}`, name: `${tier}차 차원 10개 구매`, key: `${tier}`,
    type: "bindRepeatableHotkey", action: () => buyManyDimension(tier), category: "차원 구매",
    visible: () => PlayerProgress.infinityUnlocked() || AntimatterDimension(tier).isAvailableForPurchase
  });
  addShortcut({
    id: `dimension-one-${tier}`, name: `${tier}차 차원 1개 구매`, key: `shift+${tier}`,
    type: "bindRepeatableHotkey", action: () => buyOneDimension(tier), category: "차원 구매",
    visible: () => PlayerProgress.infinityUnlocked() || AntimatterDimension(tier).isAvailableForPurchase
  });
  addShortcut({
    id: `dimension-auto-${tier}`, name: `${tier}차 차원 자동 구매기`, key: `alt+${tier}`,
    type: "bindHotkey", action: () => toggleAutobuyer(Autobuyer.antimatterDimension(tier)), category: "자동 구매기",
    visible: () => Autobuyer.antimatterDimension(tier).isUnlocked || Autobuyer.antimatterDimension(tier).isBought
  });
  addShortcut({
    id: `dimension-auto-mode-${tier}`, name: `${tier}차 차원 자동 구매 방식`, key: `shift+alt+${tier}`,
    type: "bindHotkey", action: () => toggleBuySingles(Autobuyer.antimatterDimension(tier)), category: "자동 구매기",
    visible: () => Autobuyer.antimatterDimension(tier).isUnlocked || Autobuyer.antimatterDimension(tier).isBought
  });
});

const allowedMainKeys = /^(?:[a-z0-9]|space|tab|enter|esc|up|down|left|right|f(?:[1-9]|1[0-2])|\?|\/|\.|,|-|=)$/u;
const modifierOrder = ["mod", "ctrl", "alt", "shift"];

export function normalizeShortcutKey(binding) {
  if (typeof binding !== "string") return null;
  const parts = binding.toLowerCase().split("+");
  const key = parts.pop();
  if (!allowedMainKeys.test(key) || parts.some(part => !modifierOrder.includes(part)) ||
      new Set(parts).size !== parts.length || (parts.includes("mod") && parts.includes("ctrl"))) return null;
  return [...modifierOrder.filter(part => parts.includes(part)), key].join("+");
}

export function shortcutBinding(shortcut) {
  const defaults = shortcut.keys.join("+").toLowerCase();
  const custom = player?.options?.customHotkeys?.[shortcut.id];
  if (custom === null) return null;
  if (normalizeShortcutKey(custom)) return normalizeShortcutKey(custom);
  // Keep the earlier M/Space option when an rc.5 save is loaded.
  if (shortcut.id === "main-3" && player?.options?.maxAllHotkey === "space") return "space";
  return normalizeShortcutKey(defaults) || defaults;
}

export function shortcutLabel(binding) {
  if (binding === null) return "미지정";
  return binding.split("+").map(part => ({ mod: "Ctrl/⌘", space: "Space", esc: "Esc" })[part] ||
    part.toUpperCase()).join(" + ");
}

export function shortcutText(id) {
  const shortcut = shortcuts.find(item => item.id === id);
  return shortcut ? shortcutLabel(shortcutBinding(shortcut)) : "";
}

export function setShortcutBinding(shortcut, binding) {
  const normalized = normalizeShortcutKey(binding);
  if (!normalized) return "지원하지 않는 키 조합입니다.";
  if (!shortcut.editable) return "이 단축키는 변경할 수 없습니다.";
  if (shortcut.type.startsWith("bindRepeatable") && /^(?:mod|ctrl|alt)\+/u.test(normalized)) {
    return "연속 입력 단축키에는 Ctrl, Alt를 사용할 수 없습니다.";
  }
  const previous = shortcutBinding(shortcut);
  if (previous === normalized) return null;
  const conflict = shortcuts.find(other => other.id !== shortcut.id && shortcutBinding(other) === normalized);
  if (conflict && !conflict.editable) return `이 키는 '${conflict.name}'에서 사용 중입니다.`;
  if (conflict?.type.startsWith("bindRepeatable") && previous !== null &&
      /^(?:mod|ctrl|alt)\+/u.test(previous)) {
    return `'${conflict.name}'에는 기존 키 ${shortcutLabel(previous)}를 지정할 수 없습니다.`;
  }
  player.options.customHotkeys ??= {};
  if (conflict) player.options.customHotkeys[conflict.id] = previous;
  player.options.customHotkeys[shortcut.id] = normalized;
  if (shortcut.id === "main-3" || conflict?.id === "main-3") {
    player.options.maxAllHotkey = shortcutBinding(shortcuts[3]);
  }
  bindAllShortcuts();
  return null;
}

export function clearShortcutBinding(shortcut) {
  if (!shortcut.editable) return;
  player.options.customHotkeys ??= {};
  player.options.customHotkeys[shortcut.id] = null;
  if (shortcut.id === "main-3") player.options.maxAllHotkey = null;
  bindAllShortcuts();
}

export function resetShortcutBindings() {
  player.options.customHotkeys = {};
  player.options.maxAllHotkey = "m";
  bindAllShortcuts();
}

export function bindAllShortcuts() {
  GameKeyboard.disable();
  for (const shortcut of shortcuts) {
    const binding = shortcutBinding(shortcut);
    if (binding === null) continue;
    GameKeyboard[shortcut.type](binding, shortcut.function);
    // The keypad follows whichever digit is currently assigned to a dimension action.
    if (shortcut.id.startsWith("dimension-") && /[1-8]$/u.test(binding)) {
      GameKeyboard[shortcut.type](binding.replace(/([1-8])$/u, "num$1"), shortcut.function);
    }
  }

  // The held-key state belongs to the Replicanti Galaxy action even when its key changes.
  const replicantiKey = shortcutBinding(shortcuts[10]);
  if (replicantiKey !== null) GameKeyboard.bind(replicantiKey, () => setHoldingR(false), "keyup");
  ["shift", "ctrl+shift", "alt+shift"].forEach(modifier => {
    GameKeyboard.bind(modifier, () => setShiftKey(true), "keydown");
    GameKeyboard.bind(modifier, () => setShiftKey(false), "keyup");
  });
  GameKeyboard.bind(["mod+shift+c", "mod+shift+i", "mod+shift+j", "f12"],
    () => SecretAchievement(23).unlock());
}

bindAllShortcuts();
EventHub.logic.on(GAME_EVENT.GAME_LOAD, () => bindAllShortcuts());

// Toggle autobuyers
function toggleAutobuyer(buyer) {
  // Autobuyer.tickspeed.isUnlocked is false without NC9, but we still want the simpler one to be togglable via hotkey
  const isSimpleTickspeed = buyer === Autobuyer.tickspeed && buyer.isBought;
  if (buyer.disabledByContinuum) {
    GameUI.notify.info("Continuum is enabled, you cannot alter this autobuyer");
  } else if (buyer.isUnlocked || isSimpleTickspeed) {
    buyer.toggle();
    GameUI.notify.info(`${buyer.displayName} 자동 구매기가 ${(buyer.isActive) ? "켜짐" : "꺼짐"}으로 전환되었습니다`);
  }
  return false;
}

function toggleBuySingles(buyer) {
  if (buyer.disabledByContinuum) {
    GameUI.notify.info("Continuum is enabled, you cannot alter this autobuyer");
  } else if (buyer.isUnlocked && buyer.toggleMode !== null) {
    buyer.toggleMode();
    const bulkName = (buyer.name === "Tickspeed" || buyer.hasUnlimitedBulk) ? "최대" : "10";
    GameUI.notify.info(`${buyer.displayName} 자동 구매기가 ${(buyer.mode === 1) ? "하나씩" : bulkName} 구매하도록 설정되었습니다`);
  }
  return false;
}

function keyboardToggleAutobuyers() {
  if (Tab.automation.isUnlocked) {
    Autobuyers.toggle();
    GameUI.notify.info(`자동 구매기가 ${player.auto.autobuyersOn ? "재개" : "일시정지"}되었습니다`);
  }
}

function keyboardToggleContinuum() {
  if (!Laitela.continuumUnlocked) return;
  if (ImaginaryUpgrade(21).isLockingMechanics && player.auto.disableContinuum) {
    ImaginaryUpgrade(21).tryShowWarningModal();
    return;
  }
  // This is a toggle despite the lack of !, because player.auto.disableContinuum
  // is negated compared to whether continuum is on.
  Laitela.setContinuum(player.auto.disableContinuum);
  GameUI.notify.info(`연속체가 ${(player.auto.disableContinuum) ? "비활성화" : "활성화"}되었습니다`);
}

function keyboardAutomatorToggle() {
  // Automator must be unlocked
  if (Player.automatorUnlocked) {
    if (AutomatorBackend.isRunning) {
      AutomatorBackend.pause();
    } else if (AutomatorBackend.isOn) {
      AutomatorBackend.mode = AUTOMATOR_MODE.RUN;
    } else {
      // Only attempt to start the visible script instead of the existing script if it isn't already running
      const visibleIndex = player.reality.automator.state.editorScript;
      AutomatorBackend.restart();
      AutomatorBackend.start(visibleIndex);
      if (AutomatorData.currentErrors().length === 0) {
        GameUI.notify.automator(`"${AutomatorBackend.scriptName}" 스크립트를 시작합니다`);
      } else {
        GameUI.notify.error(`"${AutomatorBackend.scriptName}" 스크립트를 시작할 수 없습니다 (오류 있음)`);
      }
      return;
    }
    const action = AutomatorBackend.isRunning ? "재개" : "일시정지";
    const linenum = AutomatorBackend.currentLineNumber;
    GameUI.notify.automator(`"${AutomatorBackend.scriptName}" 스크립트를 ${linenum}번째 줄에서 ${action}합니다`);
  }
}

function keyboardAutomatorRestart() {
  if (Player.automatorUnlocked) {
    const action = AutomatorBackend.isOn ? "다시 시작" : "시작";
    GameUI.notify.automator(`"${AutomatorBackend.scriptName}" 스크립트를 ${action}합니다`);

    AutomatorBackend.restart();
    AutomatorBackend.start();
  }
}

function armageddonRequest() {
  if (!Pelle.canArmageddon) return;
  Pelle.armageddon(true);
}

function keyboardPressEscape() {
  if (Quote.isOpen || Quote.isHistoryOpen) Quote.clearAll();
  else if (Modal.isOpen) Modal.hideAll();
  else Tab.options.show(true);
}

function keyboardPressQuestionMark() {
  if (Modal.hotkeys.isOpen) {
    EventHub.dispatch(GAME_EVENT.CLOSE_MODAL);
    return;
  }
  if (Modal.isOpen) Modal.hideAll();
  Modal.hotkeys.show();
}

function keyboardH2PToggle() {
  if (Modal.h2p.isOpen) {
    EventHub.dispatch(GAME_EVENT.CLOSE_MODAL);
    return;
  }
  if (Modal.isOpen) Modal.hideAll();
  Modal.h2p.show();
}

function keyboardEditAutobuyers() {
  if (Modal.autobuyerEditModal.isOpen) {
    EventHub.dispatch(GAME_EVENT.CLOSE_MODAL);
    return;
  }
  if (!Autobuyers.hasAutobuyersForEditModal) return;
  if (Modal.isOpen) Modal.hideAll();
  Modal.autobuyerEditModal.show();
}

function keyboardVisibleTabsToggle() {
  if (Modal.hiddenTabs.isOpen) {
    EventHub.dispatch(GAME_EVENT.CLOSE_MODAL);
    return;
  }
  if (Modal.isOpen) Modal.hideAll();
  Modal.hiddenTabs.show();
}

EventHub.logic.on(GAME_EVENT.ARROW_KEY_PRESSED, direction => {
  if (Quote.isOpen || Quote.isHistoryOpen) return;
  // Current tabs. Defined here as both tab and subtab movements require knowing your current tab.
  const currentTab = Tabs.current.key;
  if (direction[0] === "up" || direction[0] === "down") {
    // Make an array of the keys of all the unlocked and visible tabs
    const tabs = Tabs.currentUIFormat.flatMap(i => (i.isAvailable ? [i.key] : []));
    // Find the index of the tab we are on
    let top = tabs.indexOf(currentTab);
    // Move in the desired direction
    if (direction[0] === "up") top--;
    else top++;
    // Loop around if needed
    top = (top + tabs.length) % tabs.length;
    // And now we go there.
    Tab[tabs[top]].show(true);
  } else if (direction[0] === "left" || direction[0] === "right") {
    // Current subtabs
    const currentSubtab = Tabs.current._currentSubtab.key;
    // Make an array of the keys of all the unlocked and visible subtabs
    const subtabs = Tabs.current.subtabs.flatMap(i => (i.isAvailable ? [i.key] : []));
    // Find the index of the subtab we are on
    let sub = subtabs.indexOf(currentSubtab);
    // Move in the desired direction
    if (direction[0] === "left") sub--;
    else sub++;
    // Loop around if needed
    sub = (sub + subtabs.length) % subtabs.length;
    // And now we go there.
    Tab[currentTab][subtabs[sub]].show(true);
  }
});

const konamiCode = ["up", "up", "down", "down", "left", "right", "left", "right", "b", "a", "enter"];
let konamiStep = 0;

function testKonami(character) {
  if (SecretAchievement(17).isUnlocked) return;
  // This conditional is structured weirdly in order to make sure more than 2 consecutive "up" inputs doesn't
  // reset the sequence state unnecessarily, and that interrupting the sequence later on with the starting
  // input will correctly set the state to one step in
  if (konamiCode[konamiStep] === character) konamiStep++;
  else if (konamiStep === 2 && character === "up") konamiStep = 2;
  else if (character === konamiCode[0]) konamiStep = 1;
  else konamiStep = 0;
  if (konamiCode.length <= konamiStep) {
    SecretAchievement(17).unlock();
    Currency.antimatter.bumpTo(30);
    Speedrun.startTimer();
  }
}

// Remember that Mousetrap handles the backend for GameKeyboard
// Without this, Mousetrap become confused when the "up" key is pressed, as it is the starting key of a sequence
// and an individual key. To allow both the up keybind and the konami code to work, we will change how Mousetrap handles
// all keys so the konami code functions entirely separately from the normal handling.
const originalHandleKey = Mousetrap.prototype.handleKey;
Mousetrap.prototype.handleKey = function(character, modifiers, e) {
  if (e.type === "keydown") testKonami(character);
  return originalHandleKey.apply(this, [character, modifiers, e]);
};
