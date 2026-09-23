<script>
import wordShift from "@/core/word-shift";

import ModalWrapper from "@/components/modals/ModalWrapper";

function garbledTemplate(name) {
  return Array.from(name).map((character, index) => {
    if (character === " ") return " ";
    const code = character.charCodeAt(0);
    return String.fromCharCode(33 + ((code * code + index * index) % 93));
  }).join("");
}

function garbleName(template) {
  const shifted = wordShift.randomCrossWords(template, 1.4);
  return Array.from(template).map((character, index) => {
    if (character === " ") return " ";
    return shifted[index];
  }).join("");
}

function pressedKey(event) {
  const code = event.code.toLowerCase();
  if (/^key[a-z]$/u.test(code)) return code.slice(3);
  if (/^(digit|numpad)[0-9]$/u.test(code)) return code.slice(-1);
  const codes = {
    space: "space", tab: "tab", enter: "enter", numpadenter: "enter", escape: "esc",
    arrowup: "up", arrowdown: "down", arrowleft: "left", arrowright: "right",
    slash: "/", period: ".", comma: ",", minus: "-", equal: "="
  };
  if (codes[code]) return codes[code];
  if (/^f(?:[1-9]|1[0-2])$/u.test(code)) return code;
  return null;
}

export default {
  name: "HotkeysModal",
  components: { ModalWrapper },
  data() {
    return {
      search: "",
      editingId: null,
      error: "",
      bindings: {},
      glitchTick: -1,
      garbledNames: {},
      garbledTemplates: {}
    };
  },
  computed: {
    entries() {
      return shortcuts.filter(shortcut => shortcut.editable &&
        (shortcut.name.includes(this.search.trim()) || shortcut.category.includes(this.search.trim())));
    }
  },
  created() {
    this.refreshBindings();
    this.garbledTemplates = Object.fromEntries(shortcuts.map(shortcut =>
      [shortcut.id, garbledTemplate(shortcut.name)]));
    this.update();
  },
  mounted() {
    window.addEventListener("keydown", this.captureKey, true);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.captureKey, true);
  },
  methods: {
    update() {
      const tick = Math.floor(Date.now() / 500);
      if (tick === this.glitchTick) return;
      this.glitchTick = tick;
      this.garbledNames = Object.fromEntries(shortcuts.filter(shortcut => shortcut.editable && this.isLocked(shortcut))
        .map(shortcut => [shortcut.id, garbleName(this.garbledTemplates[shortcut.id])]));
    },
    isLocked(shortcut) {
      return typeof shortcut.visible === "function" && !shortcut.visible();
    },
    displayName(shortcut) {
      if (!this.isLocked(shortcut)) return shortcut.name;
      return this.garbledNames[shortcut.id] || this.garbledTemplates[shortcut.id];
    },
    displayKey(shortcut) {
      return shortcutLabel(this.bindings[shortcut.id] || shortcutBinding(shortcut));
    },
    refreshBindings() {
      this.bindings = Object.fromEntries(shortcuts.map(shortcut => [shortcut.id, shortcutBinding(shortcut)]));
    },
    edit(shortcut) {
      this.editingId = shortcut.id;
      this.error = "";
      GameKeyboard.stopSpins();
    },
    cancelEdit() {
      this.editingId = null;
      this.error = "";
    },
    captureKey(event) {
      if (!this.editingId) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.repeat) return;
      const key = pressedKey(event);
      if (!key) {
        this.error = "이 키는 단축키로 지정할 수 없습니다.";
        return;
      }
      const modifiers = [];
      if (event.ctrlKey || event.metaKey) modifiers.push("mod");
      if (event.altKey) modifiers.push("alt");
      if (event.shiftKey) modifiers.push("shift");
      const shortcut = shortcuts.find(item => item.id === this.editingId);
      const error = setShortcutBinding(shortcut, [...modifiers, key].join("+"));
      if (error) {
        this.error = error;
        return;
      }
      this.refreshBindings();
      this.cancelEdit();
    },
    resetAll() {
      resetShortcutBindings();
      this.refreshBindings();
      this.cancelEdit();
    },
    clear(shortcut) {
      clearShortcutBinding(shortcut);
      this.refreshBindings();
      this.cancelEdit();
    }
  }
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      단축키 설정
    </template>
    <div class="c-hotkey-editor">
      <p class="c-hotkey-editor__intro">
        변경할 항목을 누르고 키 조합을 입력하거나 해제할 수 있습니다. 이미 사용 중인 키라면 두 기능의 단축키가 맞바뀝니다.
        미해금 기능의 이름은 글리치로 표시되지만 단축키 배정 상태는 확인할 수 있습니다.
      </p>
      <div class="c-hotkey-editor__toolbar">
        <input
          v-model="search"
          class="c-hotkey-editor__search"
          type="text"
          placeholder="기능이나 분류 검색"
          aria-label="단축키 검색"
        >
        <button
          class="o-primary-btn c-hotkey-editor__reset"
          @click="resetAll"
        >
          기본값으로 되돌리기
        </button>
      </div>
      <p
        v-if="error"
        class="c-hotkey-editor__error"
        role="alert"
      >
        {{ error }}
      </p>
      <div class="c-hotkey-editor__list">
        <div
          v-for="shortcut in entries"
          :key="shortcut.id"
          class="c-hotkey-editor__row"
        >
          <span class="c-hotkey-editor__name">
            <small>{{ shortcut.category }}</small>
            <span :class="{ 'c-hotkey-editor__name--locked': isLocked(shortcut) }">
              {{ displayName(shortcut) }}
            </span>
          </span>
          <button
            class="o-primary-btn c-hotkey-editor__key"
            :class="{ 'c-hotkey-editor__key--editing': editingId === shortcut.id }"
            :aria-label="isLocked(shortcut) ? '미해금 기능 단축키 변경' : `${shortcut.name} 단축키 변경`"
            @click="edit(shortcut)"
          >
            {{ editingId === shortcut.id ? "키를 누르세요…" : displayKey(shortcut) }}
          </button>
          <button
            class="o-primary-btn c-hotkey-editor__cancel"
            :disabled="bindings[shortcut.id] === null"
            :aria-label="isLocked(shortcut) ? '미해금 기능 단축키 해제' : `${shortcut.name} 단축키 해제`"
            @click="clear(shortcut)"
          >
            해제
          </button>
          <button
            v-if="editingId === shortcut.id"
            class="o-primary-btn c-hotkey-editor__cancel"
            @click="cancelEdit"
          >
            취소
          </button>
        </div>
        <p
          v-if="entries.length === 0"
          class="c-hotkey-editor__empty"
        >
          검색 결과가 없습니다.
        </p>
      </div>
      <p class="c-hotkey-editor__note">
        숫자 키패드는 기본 차원 구매 키와 함께 작동합니다. Shift와 Alt는 게임의 보조 조작에도 사용됩니다.
        Steam의 전체 화면(F10)과 창 확대/축소는 시스템 단축키입니다.
      </p>
    </div>
  </ModalWrapper>
</template>

<style scoped>
.c-hotkey-editor {
  width: min(68rem, 85vw);
  font-size: 1.2rem;
  text-align: left;
}

.c-hotkey-editor__intro,
.c-hotkey-editor__note {
  line-height: 1.5;
  margin: 0.5rem 0 1rem;
}

.c-hotkey-editor__note {
  color: #aaa;
  font-size: 1rem;
  margin-top: 1rem;
}

.c-hotkey-editor__toolbar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.c-hotkey-editor__search {
  flex: 1;
  min-width: 0;
  padding: 0.5rem;
}

.c-hotkey-editor__reset,
.c-hotkey-editor__key,
.c-hotkey-editor__cancel {
  padding: 0.5rem 0.8rem;
}

.c-hotkey-editor__list {
  max-height: 48vh;
  overflow-y: auto;
}

.c-hotkey-editor__row {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #555;
  padding: 0.5rem 0;
}

.c-hotkey-editor__name {
  flex: 1;
}

.c-hotkey-editor__name small {
  display: block;
  color: #aaa;
  font-size: 0.9rem;
}

.c-hotkey-editor__name--locked {
  color: #d8c5db;
  animation: hotkey-glitch 1.1s steps(1, end) infinite;
}

@keyframes hotkey-glitch {
  0%, 68%, 100% { text-shadow: 0.08rem 0 #ff5379, -0.08rem 0 #49c8d5; }
  70% { text-shadow: -0.18rem 0 #ff5379, 0.18rem 0 #49c8d5; }
  73% { text-shadow: 0.22rem 0 #ff5379, -0.12rem 0 #49c8d5; }
  76% { text-shadow: -0.08rem 0 #ff5379, 0.08rem 0 #49c8d5; }
}

@media (prefers-reduced-motion: reduce) {
  .c-hotkey-editor__name--locked { animation: none; }
}

.c-hotkey-editor__key {
  min-width: 12rem;
}

.c-hotkey-editor__key--editing {
  border-color: #ffd54f;
  color: #ffd54f;
}

.c-hotkey-editor__error {
  color: #ff7373;
}

.c-hotkey-editor__empty {
  text-align: center;
}
</style>
