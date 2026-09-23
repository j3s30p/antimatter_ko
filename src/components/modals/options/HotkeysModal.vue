<script>
import ModalWrapper from "@/components/modals/ModalWrapper";

const FIXED_GAME_KEYS = new Set(["경의 표하기", "존재하지 않음", "전체 화면", "확대", "축소", "확대/축소 초기화"]);

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
      bindings: {}
    };
  },
  computed: {
    entries() {
      return shortcuts.filter(shortcut => !FIXED_GAME_KEYS.has(shortcut.name) &&
        (shortcut.name.includes(this.search.trim()) || shortcut.category.includes(this.search.trim())));
    }
  },
  created() {
    this.refreshBindings();
  },
  mounted() {
    window.addEventListener("keydown", this.captureKey, true);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.captureKey, true);
  },
  methods: {
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
        변경할 항목을 누르고 원하는 키 조합을 입력하세요. 이미 사용 중인 조합은 지정할 수 없습니다.
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
            {{ shortcut.name }}
          </span>
          <button
            class="o-primary-btn c-hotkey-editor__key"
            :class="{ 'c-hotkey-editor__key--editing': editingId === shortcut.id }"
            :aria-label="`${shortcut.name} 단축키 변경`"
            @click="edit(shortcut)"
          >
            {{ editingId === shortcut.id ? "키를 누르세요…" : displayKey(shortcut) }}
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
