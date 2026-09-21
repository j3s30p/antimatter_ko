<script>
import ModalWrapper from "@/components/modals/ModalWrapper";

export default {
  name: "HotkeysModal",
  components: {
    ModalWrapper
  },
  data() {
    return {
      updateIndicies: [],
      visible: [],
      timeStudyUnlocked: false,
      glyphSacUnlocked: false,
      isElectron: false
    };
  },
  computed: {
    moreShiftKeyInfo() {
      const shiftKeyFunctions = [];
      if (this.timeStudyUnlocked) {
        shiftKeyFunctions.push("시간 연구 구매 시 해당 지점까지 모두 구매할 때");
        shiftKeyFunctions.push("시간 연구 트리를 저장할 때");
      }
      if (this.glyphSacUnlocked) {
        shiftKeyFunctions.push("글리프를 정리할 때");
      }
      const shiftKeyInfo = makeEnumeration(shiftKeyFunctions);
      return (shiftKeyInfo === "")
        ? ""
        : `Shift를 누른 채 ${shiftKeyInfo} 사용할 수 있습니다.`;
    },
    hotkeyCount() {
      return shortcuts.length;
    },
    shortcutNames() {
      return shortcuts.map(x => x.name);
    },
    shortcutKeys() {
      return shortcuts.map(x => x.keys.map(key => this.format(key)));
    }
  },
  created() {
    for (let i = 0; i < this.hotkeyCount; i++) {
      const visible = shortcuts[i].visible;
      if (typeof visible === "function") {
        this.updateIndicies.push(i);
      } else {
        this.visible[i] = visible;
      }
    }
  },
  methods: {
    update() {
      for (const index of this.updateIndicies) {
        this.$set(this.visible, index, shortcuts[index].visible());
      }
      const progress = PlayerProgress.current;
      this.timeStudyUnlocked = progress.isEternityUnlocked;
      this.glyphSacUnlocked = RealityUpgrade(19).isBought;

      // ElectronRuntime is a global which only exists on Steam (throws a ReferenceError on web)
      try {
        this.isElectron = ElectronRuntime.isActive;
      } catch {
        this.isElectron = false;
      }
    },
    format(x) {
      switch (x) {
        case "mod":
          return "CTRL/⌘";
        default:
          return x.toUpperCase();
      }
    }
  },
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      단축키 목록
    </template>
    <span class="c-modal-hotkeys l-modal-hotkeys">
      <div class="l-modal-hotkeys__column">
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">차원 1개 구매</span>
          <kbd>SHIFT</kbd><kbd>1</kbd>-<kbd>SHIFT</kbd><kbd>8</kbd>
        </div>
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">차원 10개 구매</span>
          <kbd>1</kbd>-<kbd>8</kbd>
        </div>
        <div
          v-for="index in hotkeyCount"
          :key="index"
        >
          <span
            v-if="visible[index - 1]"
            class="l-modal-hotkeys-row"
          >
            <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">{{ shortcutNames[index - 1] }}</span>
            <kbd
              v-for="(key, i) in shortcutKeys[index - 1]"
              :key="i"
            >
              {{ key }}
            </kbd>
          </span>
        </div>
      </div>
      <div class="l-modal-hotkeys__column l-modal-hotkeys__column--right">
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">보조 키</span>
          <kbd>SHIFT</kbd>
        </div>
        <span class="c-modal-hotkeys__shift-description">
          Shift는 일부 요소의 추가 정보를 표시하고 특정 버튼의 기능을 바꾸는 보조 키입니다.
          <br>
          {{ moreShiftKeyInfo }}
        </span>
        <br>
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">자동 구매기 조작</span>
          <kbd>ALT</kbd>
        </div>
        <span class="c-modal-hotkeys__shift-description">
          Alt와 자동 구매기에 대응하는 키를 함께 누르면 해당 자동 구매기를 켜거나 끕니다.
          <br>
          Alt와 Shift를 함께 누르면 반물질 차원 및 틱 속도 자동 구매기의 1개 구매/최대 구매를 전환합니다.
        </span>
        <br>
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">탭 이동</span>
          <div>
            <kbd>←</kbd><kbd>↓</kbd><kbd>↑</kbd><kbd>→</kbd>
          </div>
        </div>
        <span class="c-modal-hotkeys__shift-description">
          방향키로 게임 페이지를 순환할 수 있습니다. 위·아래 방향키는 탭을,
          왼쪽·오른쪽 방향키는 현재 탭의 하위 탭을 순환합니다.
        </span>
        <br>
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">숫자 키패드 지원</span>
        </div>
        <span class="c-modal-hotkeys__shift-description">
          기술적인 이유로 숫자 키패드는 가능하면 차원을 10개 구매하지만 <kbd>SHIFT</kbd>와 함께 눌러도 1개만
          구매하지 않습니다. 기기에 따라 페이지가 스크롤되거나 게임 탭이 바뀔 수 있습니다.
          <kbd>ALT</kbd>는 정상적으로 작동합니다.
        </span>
        <template v-if="isElectron">
          <br>
          <div class="l-modal-hotkeys-row">
            <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">창 확대/축소</span>
            <kbd>-</kbd><kbd>0</kbd><kbd>+</kbd>
          </div>
          <span class="c-modal-hotkeys__shift-description">
            <kbd>ctrl</kbd>을 누른 채 <kbd>-</kbd> 또는 <kbd>+</kbd>를 눌러 축소하거나 확대할 수 있습니다.
            <kbd>ctrl</kbd><kbd>0</kbd>은 배율을 100%로 초기화합니다.
          </span>
          <br>
          <div class="l-modal-hotkeys-row">
            <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">전체 화면</span>
            <kbd>F10</kbd>
          </div>
          <span class="c-modal-hotkeys__shift-description">
            <kbd>F10</kbd>을 눌러 전체 화면에 들어가거나 나옵니다.
          </span>
        </template>
      </div>
    </span>
  </ModalWrapper>
</template>

<style scoped>
.l-modal-hotkeys__column {
  display: flex;
  flex-direction: column;
  width: 28rem;
}

.l-modal-hotkeys__column--right {
  margin-left: 1rem;
}

.c-modal-hotkeys {
  font-size: 1.25rem;
}

.l-modal-hotkeys {
  display: flex;
  flex-direction: row;
}

.l-modal-hotkeys-row {
  display: flex;
  flex-direction: row;
  line-height: 1.6rem;
  padding-bottom: 0.3rem;
}

.c-modal-hotkeys-row__name {
  text-align: left;
}

.l-modal-hotkeys-row__name {
  flex: 1 1 auto;
}

.c-modal-hotkeys__shift-description {
  text-align: left;
  font-size: 1rem;
}
</style>
