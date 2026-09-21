<script>
import AntimatterDimensionProgressBar from "./AntimatterDimensionProgressBar";
import AntimatterDimensionRow from "./ClassicAntimatterDimensionRow";
import AntimatterDimensionsTabHeader from "./ClassicAntimatterDimensionsTabHeader";
import AntimatterGalaxyRow from "./ClassicAntimatterGalaxyRow";
import DimensionBoostRow from "./ClassicDimensionBoostRow";
import PrimaryButton from "@/components/PrimaryButton";
import TickspeedRow from "./TickspeedRow";

export default {
  name: "ClassicAntimatterDimensionsTab",
  components: {
    PrimaryButton,
    AntimatterDimensionRow,
    AntimatterDimensionsTabHeader,
    AntimatterGalaxyRow,
    DimensionBoostRow,
    AntimatterDimensionProgressBar,
    TickspeedRow,
  },
  data() {
    return {
      hasDimensionBoosts: false,
      isQuickResetAvailable: false,
      isSacrificeUnlocked: false,
      buy10Mult: new Decimal(0),
      currentSacrifice: new Decimal(0),
      hasRealityButton: false,
      multiplierText: ""
    };
  },
  methods: {
    update() {
      this.hasDimensionBoosts = player.dimensionBoosts > 0;
      this.isQuickResetAvailable = Player.isInAntimatterChallenge && Player.antimatterChallenge.isQuickResettable;
      this.isSacrificeUnlocked = Sacrifice.isVisible;
      this.buy10Mult.copyFrom(AntimatterDimensions.buyTenMultiplier);
      this.currentSacrifice.copyFrom(Sacrifice.totalBoost);
      this.hasRealityButton = PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought;
      const sacText = this.isSacrificeUnlocked
        ? ` | 차원 희생 배율: ${formatX(this.currentSacrifice, 2, 2)}`
        : "";
      this.multiplierText = `차원 10개 구매 배율: ${formatX(this.buy10Mult, 2, 2)}${sacText}`;
    },
    quickReset() {
      softReset(-1, true, true);
    }
  }
};
</script>

<template>
  <div class="l-old-ui-antimatter-dim-tab">
    <AntimatterDimensionsTabHeader />
    {{ multiplierText }}
    <TickspeedRow />
    <div class="l-dimensions-container">
      <AntimatterDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
      <DimensionBoostRow />
      <AntimatterGalaxyRow />
    </div>
    <PrimaryButton
      v-if="isQuickResetAvailable"
      class="o-primary-btn--quick-reset"
      @click="quickReset"
    >
      차원 가속 초기화 실행
      <span v-if="hasDimensionBoosts"> (차원 가속 1회 감소)</span>
      <span v-else> (획득 효과 없음)</span>
    </PrimaryButton>
    <div class="l-flex" />
    <AntimatterDimensionProgressBar class="l-antimatter-dim-tab__progress_bar" />
  </div>
</template>

<style scoped>
.l-flex {
  flex: 1 0;
}
</style>
