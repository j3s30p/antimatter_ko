<script>
export default {
  name: "NewGame",
  data() {
    return {
      opacity: 0,
      visible: false,
      hasMoreCosmetics: false,
      selectedSetName: "",
    };
  },
  computed: {
    style() {
      return {
        opacity: this.opacity,
        visibility: this.visible ? "visible" : "hidden",
      };
    }
  },
  methods: {
    update() {
      this.visible = GameEnd.endState > END_STATE_MARKERS.SHOW_NEW_GAME && !GameEnd.removeAdditionalEnd;
      this.opacity = (GameEnd.endState - END_STATE_MARKERS.SHOW_NEW_GAME) * 2;
      this.hasMoreCosmetics = GlyphAppearanceHandler.lockedSets.length > 0;
      this.selectedSetName = GlyphAppearanceHandler.chosenFromModal?.name ?? "없음 (무작위 선택)";
    },
    startNewGame() {
      NG.startNewGame();
    },
    openSelectionModal() {
      Modal.cosmeticSetChoice.show();
    }
  }
};
</script>

<template>
  <div
    class="c-new-game-container"
    :style="style"
  >
    <h2>
      게임 전체를 초기화하지만 오토메이터 스크립트, 연구 프리셋, 비밀 테마, 비밀 도전과제, 설정,
      동반자 글리프는 유지합니다.
    </h2>
    <h3>오른쪽 위 버튼을 사용하면 현재 상태의 게임을 볼 수 있습니다.</h3>
    <div class="c-new-game-button-container">
      <button
        class="c-new-game-button"
        @click="startNewGame"
      >
        처음부터 시작할까요?
      </button>
    </div>
    <br>
    <h3 v-if="hasMoreCosmetics">
      게임을 완료한 보상으로 원하는 글리프 장식 세트를 하나 더 해금할 수 있습니다.
      현실에 다시 도달하면 자유롭게 변경할 수 있으며, 외형만 바뀌고 게임 진행 보너스는 없습니다.
      <br>
      <button
        class="c-new-game-button"
        @click="openSelectionModal"
      >
        장식 세트 선택
      </button>
      <br>
      <br>
      선택한 세트: {{ selectedSetName }}
    </h3>
    <h3 v-else>
      모든 글리프 장식 세트를 해금했습니다!
    </h3>
    <br>
    <h3>
      “speedrun”을 가져오면 스피드런 기록 기능을 추가한 상태로 게임을 다시 시작할 수도 있습니다.
    </h3>
  </div>
</template>

<style scoped>
.c-new-game-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  pointer-events: auto;
}

.t-s12 .c-new-game-container {
  color: white;
}

.c-new-game-button-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.c-new-game-button {
  font-family: Typewriter;
  background: grey;
  border: black;
  border-radius: var(--var-border-radius, 0.5rem);
  margin-top: 1rem;
  padding: 1rem;
  cursor: pointer;
}
</style>
