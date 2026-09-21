<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "SacrificeModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      currentMultiplier: new Decimal(),
      nextMultiplier: new Decimal(),
    };
  },
  computed: {
    message() {
      if (Achievement(118).isUnlocked && !Pelle.isDoomed) {
        return `차원 희생을 하면 희생 시점에 보유한 1차 반물질 차원의 수에 따라
          8차 반물질 차원에 보너스를 얻습니다.`;
      }
      return `차원 희생을 하면 1차부터 7차까지의 반물질 차원을 모두 잃습니다
        (가격과 배율은 유지됩니다). 대신 지금까지 희생한 1차 반물질 차원의 총량에 따라
        8차 반물질 차원에 보너스를 얻습니다. 생산량을 회복하려면 시간이 필요합니다.`;
    },
    multiplierText() {
      return `현재 배율은 ${formatX(this.currentMultiplier, 2, 2)}이며, 차원 희생 후
        ${formatX(this.nextMultiplier, 2, 2)}로 증가합니다.`;
    },
  },
  methods: {
    update() {
      this.currentMultiplier.copyFrom(Sacrifice.totalBoost);
      this.nextMultiplier.copyFrom(Sacrifice.nextBoost.times(Sacrifice.totalBoost));
    },
    handleYesClick() {
      sacrificeReset();
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="sacrifice"
    @confirm="handleYesClick"
  >
    <template #header>
      차원 희생
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
    <br>
    <div class="c-modal-message__text">
      {{ multiplierText }}
      <br>
    </div>
  </ModalWrapperChoice>
</template>
