<script>
import PrimaryButton from "@/components/PrimaryButton";
import TimeDimensionRow from "./ClassicTimeDimensionRow";

export default {
  name: "ClassicTimeDimensionsTab",
  components: {
    PrimaryButton,
    TimeDimensionRow
  },
  data() {
    return {
      totalUpgrades: 0,
      multPerTickspeed: 0,
      tickspeedSoftcap: 0,
      timeShards: new Decimal(0),
      upgradeThreshold: new Decimal(0),
      shardsPerSecond: new Decimal(0),
      incomeType: "",
      areAutobuyersUnlocked: false,
      showLockedDimCostNote: true,
    };
  },
  computed: {
    costIncreases: () => TimeDimension(1).costIncreaseThresholds,
  },
  methods: {
    update() {
      this.showLockedDimCostNote = !TimeDimension(8).isUnlocked && player.realities >= 1;
      this.totalUpgrades = player.totalTickGained;
      this.multPerTickspeed = FreeTickspeed.multToNext;
      this.tickspeedSoftcap = FreeTickspeed.softcap;
      this.timeShards.copyFrom(Currency.timeShards);
      this.upgradeThreshold.copyFrom(FreeTickspeed.fromShards(Currency.timeShards.value).nextShards);
      this.shardsPerSecond.copyFrom(TimeDimension(1).productionPerRealSecond);
      this.incomeType = EternityChallenge(7).isRunning ? "8차 무한 차원" : "시간 조각";
      this.areAutobuyersUnlocked = Autobuyer.timeDimension(1).isUnlocked;
    },
    maxAll() {
      tryUnlockTimeDimensions();
      maxAllTimeDimensions();
    },
    toggleAllAutobuyers() {
      toggleAllTimeDims();
    }
  }
};
</script>

<template>
  <div class="l-time-dim-tab l-centered-vertical-tab">
    <div class="c-subtab-option-container">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        모두 최대 구매
      </PrimaryButton>
      <PrimaryButton
        v-if="areAutobuyersUnlocked"
        class="o-primary-btn--subtab-option"
        @click="toggleAllAutobuyers"
      >
        모든 자동 구매기 켜기/끄기
      </PrimaryButton>
    </div>
    <div>
      <p>
        시간 조각 <span class="c-time-dim-description__accent">{{ format(timeShards, 2, 1) }}</span>에서
        틱스피드 업그레이드 <span class="c-time-dim-description__accent">{{ formatInt(totalUpgrades) }}</span>개 획득
      </p>
      <p>
        다음 틱스피드 업그레이드: 시간 조각
        <span class="c-time-dim-description__accent">{{ format(upgradeThreshold, 2, 1) }}</span>.
        획득할 때마다 요구량이 <span class="c-time-dim-description__accent">{{ formatX(multPerTickspeed, 2, 2) }}</span> 증가합니다.
      </p>
    </div>
    <div>
      틱스피드 업그레이드가 {{ formatInt(tickspeedSoftcap) }}개를 넘으면
      추가 업그레이드에 필요한 양의 증가 속도가 빨라집니다.
    </div>
    <div>
      초당 {{ format(shardsPerSecond, 2, 0) }} {{ incomeType }} 생산 중
    </div>
    <div class="l-dimensions-container">
      <TimeDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
        :are-autobuyers-unlocked="areAutobuyersUnlocked"
      />
    </div>
    <div>
      시간 차원 비용은 영원 포인트 {{ format(costIncreases[0], 2, 2) }} 및
      {{ format(costIncreases[1]) }}에서 크게 증가하며,
      <br>
      영원 포인트 {{ format(costIncreases[2]) }} 이후에는 훨씬 빠르게 증가합니다.
      <br>
      <div v-if="showLockedDimCostNote">
        Shift 키를 누르면 잠긴 시간 차원의 영원 포인트 비용을 볼 수 있습니다.
      </div>
      {{ format(1e8) }}개를 넘겨 구매한 8차 시간 차원은 배율을 더 높이지 않습니다.
    </div>
  </div>
</template>
