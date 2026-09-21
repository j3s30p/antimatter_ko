<script>
import InfinityDimensionRow from "./ClassicInfinityDimensionRow";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ClassicInfinityDimensionsTab",
  components: {
    PrimaryButton,
    InfinityDimensionRow
  },
  data() {
    return {
      infinityPower: new Decimal(0),
      dimMultiplier: new Decimal(0),
      powerPerSecond: new Decimal(0),
      incomeType: "",
      isEC8Running: false,
      EC8PurchasesLeft: 0,
      isEC9Running: false,
      isEnslavedRunning: false,
      isAnyAutobuyerUnlocked: false,
      conversionRate: 0,
      nextDimCapIncrease: 0,
      tesseractCost: new Decimal(0),
      totalDimCap: 0,
      canBuyTesseract: false,
      enslavedCompleted: false,
      boughtTesseracts: 0,
      extraTesseracts: 0,
      creditsClosed: false,
      showLockedDimCostNote: true,
    };
  },
  computed: {
    tesseractCountString() {
      const extra = this.extraTesseracts > 0 ? ` + ${format(this.extraTesseracts, 2, 2)}` : "";
      return `${formatInt(this.boughtTesseracts)}${extra}`;
    },
  },
  methods: {
    update() {
      this.showLockedDimCostNote = !InfinityDimension(8).isUnlocked;
      this.isEC9Running = EternityChallenge(9).isRunning;
      this.infinityPower.copyFrom(Currency.infinityPower);
      this.conversionRate = InfinityDimensions.powerConversionRate;
      if (this.isEC9Running) {
        this.dimMultiplier.copyFrom(Decimal.pow(Math.max(this.infinityPower.log2(), 1), 4).max(1));
      } else {
        this.dimMultiplier.copyFrom(this.infinityPower.pow(this.conversionRate).max(1));
      }
      this.powerPerSecond.copyFrom(InfinityDimension(1).productionPerRealSecond);
      this.incomeType = EternityChallenge(7).isRunning ? "7차 차원" : "무한력";
      this.isEC8Running = EternityChallenge(8).isRunning;
      if (this.isEC8Running) {
        this.EC8PurchasesLeft = player.eterc8ids;
      }
      this.isEnslavedRunning = Enslaved.isRunning;
      this.isAnyAutobuyerUnlocked = Autobuyer.infinityDimension(1).isUnlocked;
      this.nextDimCapIncrease = Tesseracts.nextTesseractIncrease;
      this.tesseractCost.copyFrom(Tesseracts.nextCost);
      this.totalDimCap = InfinityDimensions.totalDimCap;
      this.canBuyTesseract = Tesseracts.canBuyTesseract;
      this.enslavedCompleted = Enslaved.isCompleted;
      this.boughtTesseracts = Tesseracts.bought;
      this.extraTesseracts = Tesseracts.extra;
      this.creditsClosed = GameEnd.creditsEverClosed;
    },
    maxAll() {
      InfinityDimensions.buyMax();
    },
    toggleAllAutobuyers() {
      toggleAllInfDims();
    },
    buyTesseract() {
      Tesseracts.buyTesseract();
    }
  }
};
</script>

<template>
  <div class="l-infinity-dim-tab">
    <div class="c-subtab-option-container">
      <PrimaryButton
        v-if="!isEC8Running"
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        모두 최대 구매
      </PrimaryButton>
      <PrimaryButton
        v-if="isAnyAutobuyerUnlocked && !isEC8Running"
        class="o-primary-btn--subtab-option"
        @click="toggleAllAutobuyers"
      >
        모든 자동 구매기 켜기/끄기
      </PrimaryButton>
    </div>
    <div>
      <p>
        보유 무한력:
        <span class="c-infinity-dim-description__accent">{{ format(infinityPower, 2, 1) }}</span>
        <br>
        <span v-if="!isEC9Running">
          무한력이
          <span class="c-infinity-dim-description__accent">{{ formatPow(conversionRate, 2, 3) }}</span>
          제곱되어
        </span>
        <span v-else>
          변환되어
        </span>
        모든
        <span v-if="!isEC9Running">반물질 차원에</span>
        <span v-else>영원 도전 9로 인해 시간 차원에</span>
        <span class="c-infinity-dim-description__accent">{{ formatX(dimMultiplier, 2, 1) }}</span>
        배율을 적용합니다.
      </p>
    </div>
    <div
      v-if="enslavedCompleted"
      class="l-infinity-dim-tab__enslaved-reward-container"
    >
      <button
        class="c-infinity-dim-tab__tesseract-button"
        :class="{
          'c-infinity-dim-tab__tesseract-button--disabled': !canBuyTesseract,
          'o-pelle-disabled-pointer': creditsClosed
        }"
        @click="buyTesseract"
      >
        <p>
          테서랙트 구매 ({{ tesseractCountString }})
        </p>
        <p>무한 차원 상한을 {{ format(nextDimCapIncrease, 2) }}만큼 증가</p>
        <p><b>비용: {{ format(tesseractCost) }} IP</b></p>
      </button>
    </div>
    <div v-if="isEnslavedRunning">
      모든 무한 차원은 한 번만 구매할 수 있습니다.
    </div>
    <div v-else>
      8차를 제외한 모든 무한 차원은 각각 최대 {{ format(totalDimCap, 2) }}회까지 구매할 수 있습니다.
    </div>
    <div>초당 {{ format(powerPerSecond, 2, 0) }} {{ incomeType }} 생산 중</div>
    <b
      v-if="isEC8Running"
      class="l-infinity-dim-tab__ec8-purchases"
    >
      영원 도전 8에서 구매 가능 횟수가 {{ formatInt(EC8PurchasesLeft) }}회 남았습니다.
    </b>
    <div class="l-dimensions-container">
      <InfinityDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
    </div>
    <div v-if="showLockedDimCostNote">
      Shift 키를 누르면 잠긴 무한 차원의 무한 포인트 비용을 볼 수 있습니다.
    </div>
  </div>
</template>
