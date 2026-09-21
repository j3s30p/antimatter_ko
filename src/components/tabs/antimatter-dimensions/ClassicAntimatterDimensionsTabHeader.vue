<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ClassicAntimatterDimensionsTabHeader",
  components: {
    PrimaryButton
  },
  data() {
    return {
      isSacrificeUnlocked: false,
      isSacrificeAffordable: false,
      currentSacrifice: new Decimal(0),
      sacrificeBoost: new Decimal(0),
      disabledCondition: "",
    };
  },
  computed: {
    sacrificeTooltip() {
      return `8차 반물질 차원에 ${formatX(this.sacrificeBoost, 2, 2)} 배율 적용`;
    },
  },
  methods: {
    update() {
      const isSacrificeUnlocked = Sacrifice.isVisible;
      this.isSacrificeUnlocked = isSacrificeUnlocked;
      if (!isSacrificeUnlocked) return;
      this.isSacrificeAffordable = Sacrifice.canSacrifice;
      this.currentSacrifice.copyFrom(Sacrifice.totalBoost);
      this.sacrificeBoost.copyFrom(Sacrifice.nextBoost);
      this.disabledCondition = Sacrifice.disabledCondition;
    },
    sacrifice() {
      sacrificeBtnClick();
    },
    maxAll() {
      maxAll();
    }
  }
};
</script>

<template>
  <div class="l-antimatter-dim-tab__header">
    <PrimaryButton
      v-show="isSacrificeUnlocked"
      v-tooltip="sacrificeTooltip"
      :enabled="isSacrificeAffordable"
      class="o-primary-btn--sacrifice"
      @click="sacrifice"
    >
      <span v-if="isSacrificeAffordable">
        차원 희생 ({{ formatX(sacrificeBoost, 2, 2) }})
      </span>
      <span v-else>
        차원 희생 비활성화 ({{ disabledCondition }})
      </span>
    </PrimaryButton>
    <PrimaryButton
      class="o-primary-btn--buy-max"
      @click="maxAll"
    >
      모두 최대 구매 (M)
    </PrimaryButton>
  </div>
</template>
