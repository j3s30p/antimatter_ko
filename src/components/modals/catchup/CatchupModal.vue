<script>
import { GameProgress, ProgressChecker } from "@/core/storage/progress-checker";

import CatchupGroup from "@/components/modals/catchup/CatchupGroup";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "CatchupModal",
  components: {
    CatchupGroup,
    PrimaryButton,
  },
  props: {
    diff: {
      type: Number,
      required: true
    }
  },
  computed: {
    progressStage: () => ProgressChecker.getProgressStage(player).id,
    suggestedResource() {
      return GameProgress(this.progressStage).suggestedResource;
    },
    timeString() {
      // If diff is zero, that means we opened it up via the button and don't need the text for last opening
      if (!this.diff) return null;
      return `마지막으로 게임을 불러온 뒤 ${TimeSpan.fromMilliseconds(this.diff).toString()}이 지났습니다.`;
    },
    titleText() {
      return this.diff ? "콘텐츠 따라잡기" : "콘텐츠 요약";
    }
  },
  methods: {
    stageName(stage) {
      return GameProgress(stage).name;
    }
  }
};
</script>

<template>
  <div class="c-modal-away-progress">
    <div class="c-modal-away-progress__header">
      {{ titleText }}
    </div>
    <div>
      {{ timeString }}
      다시 내용을 확인하고 싶다면 게임 시작부터 지금까지 해금한 콘텐츠를 진행 단계별로 간단히 살펴보세요.
      여기에는 짧은 설명만 표시됩니다. 콘텐츠 제목이나 <i class="fas fa-question-circle" /> 아이콘을 누르면
      관련 게임 방법 문서에서 자세한 정보를 볼 수 있습니다.
    </div>
    <div
      class="l-catchup-group-container"
      :style="{ 'height' : `${Math.clamp(3 * progressStage + 5, 15, 35)}rem` }"
    >
      <CatchupGroup
        v-for="group of progressStage"
        :key="group"
        :group="group"
        :name="stageName(group)"
      />
    </div>
    <span class="c-suggestion-text">
      현재 진행 상황에서는 {{ suggestedResource }}을(를) 늘리는 것이 좋습니다.
    </span>
    <div class="l-confirm-padding">
      <PrimaryButton
        @click="emitClose"
      >
        확인
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped>
.l-catchup-group-container {
  overflow-y: scroll;
  width: 100%;
  text-align: left;
  border: 0.1rem solid var(--color-text);
  border-radius: var(--var-border-radius, 0.4rem);
  margin: 1rem 0;
  padding: 1.5rem;
}

.l-confirm-padding {
  margin: 1rem;
}

.c-suggestion-text {
  font-size: 1.6rem;
  font-weight: bold;
}
</style>
