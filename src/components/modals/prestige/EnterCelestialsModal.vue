<script>
import EnterCelestialsRaPet from "@/components/modals/prestige/EnterCelestialsRaPet";
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "EnterCelestialsModal",
  components: {
    ModalWrapperChoice,
    EnterCelestialsRaPet,
  },
  props: {
    number: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      laitelaFastest: 3600,
      teresaBestAM: new Decimal(),
      teresaRunMult: 0,
      effarigDone: false,
      effarigLayer: "",
      enslavedDone: false,
      laitelaTime: "",
    };
  },
  computed: {
    effects() {
      return GameDatabase.celestials.descriptions[this.number].effects().split("\n");
    },
    description() {
      const description = GameDatabase.celestials.descriptions[this.number].description;
      return description ? description() : "";
    },
    topLabel() {
      return `${this.name}의 현실`;
    },
    message() {
      return `현실을 초기화하고 ${this.name}의 현실에 진입합니다. 이곳에서는:`;
    },
    extraLine() {
      switch (this.number) {
        case 0:
          return this.teresaBestAM.eq(1)
            ? `아직 Teresa의 현실 보상을 해금하지 못했습니다. 보상을 해금하려면
              현실 연구를 구매하고 현실을 처음으로 완료해야 합니다.`
            : `Teresa의 현실 최고 기록은 반물질 ${format(this.teresaBestAM, 2, 2)}이며,
              이에 따라 글리프 희생 효과에 ${formatX(this.teresaRunMult, 2)} 배율이 적용됩니다.`;
        case 1: return this.effarigDone
          ? "Effarig를 완료했습니다!"
          : `현재 ${this.effarigLayer} 단계입니다.`;
        case 2: return this.enslavedDone
          ? "우리가... 아직... 충분히 돕지 못했나..."
          : "우리는... 도울 수 있어... 우리가... 돕게 해줘...";
        case 3: return "";
        case 4: return `Ra의 현실 안에서는 일부 자원이 보유량에 따라
          셀레스티얼 기억을 위한 기억 조각을 생성합니다:`;
        case 5: return this.laitelaFastest >= 300
          ? "이 단계의 Lai'tela를 완료하지 못했습니다."
          : `이 단계의 최단 완료 시간은 ${this.laitelaTime}입니다.`;
        case 6: return "";
        default: throw new Error(`Attempted to start an Unknown Celestial in Celestial Modal Confirmation.`);
      }
    }
  },
  methods: {
    update() {
      this.teresaBestAM.copyFrom(player.celestials.teresa.bestRunAM);
      this.teresaRunMult = Teresa.runRewardMultiplier;
      const effarigStage = Effarig.currentStage;
      this.effarigDone = effarigStage === EFFARIG_STAGES.COMPLETED;
      this.effarigLayer = [null, "Infinity", "Eternity", "Reality"][effarigStage];
      this.enslavedDone = Enslaved.isCompleted;
      this.laitelaFastest = player.celestials.laitela.fastestCompletion;
      this.laitelaTime = TimeSpan.fromSeconds(this.laitelaFastest).toStringShort();
    },
    handleYesClick() {
      beginProcessReality(getRealityProps(true));
      switch (this.number) {
        case 0: return Teresa.initializeRun();
        case 1: return Effarig.initializeRun();
        case 2: return Enslaved.initializeRun();
        case 3: return V.initializeRun();
        case 4: return Ra.initializeRun();
        case 5: return Laitela.initializeRun();
        case 6: throw new Error(`Attempted to start Pelle through EnterCelestialsModal instead of ArmageddonModal`);
        default: throw new Error(`Attempted to start an Unknown Celestial in Celestial Modal Confirmation.`);
      }
    },
  },
};
</script>

<template>
  <ModalWrapperChoice @confirm="handleYesClick">
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
      <br>
      <br>
      <div class="c-modal-celestial__run-effects">
        <div
          v-for="(effect, i) in effects"
          :key="i"
          class="c-modal-celestial__run-effects__line"
        >
          <b v-if="effect.trim()">&bull;</b>
          <b>&nbsp;</b>
          {{ effect }}
        </div>
      </div>
      <div
        v-if="description"
        class="reality-description"
      >
        <br><br>
        {{ description }}
      </div>
      <br><br>
      <div>
        {{ extraLine }}
      </div>
      <span v-if="number === 4">
        <EnterCelestialsRaPet
          v-for="id in 4"
          :key="id"
          :pet-id="id - 1"
        />
      </span>
    </div>
    <template #confirm-text>
      시작
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.c-modal-celestial__run-effects {
  display: inline-block;
  max-width: 45rem;
  text-align: left;
}
.c-modal-celestial__run-effects__line {
  display: flex;
  margin-bottom: 0.5rem;
}

.reality-description {
  padding: 0 2rem;
}
</style>