<script>
import ResetModal from "@/components/modals/prestige/ResetModal";

export default {
  name: "BigCrunchModal",
  components: {
    ResetModal
  },
  data() {
    return {
      gainedInfinities: new Decimal(),
      gainedInfinityPoints: new Decimal(),
      startingBoosts: 0,
      startingAM: 10,
      willStartWithGalaxy: false
    };
  },
  computed: {
    isFirstInfinity() {
      return !PlayerProgress.infinityUnlocked();
    },
    message() {
      const info = this.isFirstInfinity ? this.firstInfinityInfo : ``;
      return `무한에 진입하면 모든 차원, 차원 가속, 반물질 은하가 초기화됩니다. ${info}`;
    },
    firstInfinityInfo() {
      return `대신 무한 포인트(IP)를 하나 얻습니다. 이 포인트로 무한 탭의 여러 업그레이드를 구매할 수 있습니다.
        또한 통계 탭에 표시되는 무한 횟수가 하나 증가합니다.`;
    },
    ipGainInfo() {
      return `무한 횟수 ${format(this.gainedInfinities, 2, 0)}회와
        무한 포인트 ${format(this.gainedInfinityPoints, 2, 0)}를 획득합니다.`;
    },
    startingResources() {
      const gainedResources = [];
      if (this.startingAM.gte(10)) gainedResources.push(`반물질 ${format(this.startingAM, 2, 1)}`);
      if (this.startingBoosts > 0) gainedResources.push(`차원 가속 ${formatInt(this.startingBoosts)}회`);
      if (this.willStartWithGalaxy) gainedResources.push("반물질 은하 1개");

      return `다음 무한은 ${gainedResources.join(", ")}를 보유한 상태로 시작합니다.`;
    }
  },
  methods: {
    update() {
      this.gainedInfinities = gainedInfinities().round();
      this.gainedInfinityPoints = gainedInfinityPoints().round();
      this.startingBoosts = DimBoost.startingDimensionBoosts;
      this.startingAM = Currency.antimatter.startingValue;
      this.willStartWithGalaxy = InfinityUpgrade.skipResetGalaxy.isBought;
    },
    handleYesClick() {
      bigCrunchResetRequest();
      EventHub.ui.offAll(this);
      if (this.isFirstInfinity) {
        setTimeout(() => Modal.message.show(`이 애니메이션은 무한을 수동으로 실행할 때마다 나타납니다.
          끄려면 옵션 탭에서 설정을 변경하세요. 게임의 모든 시각 효과는 처음 본 뒤 같은 방식으로
          끌 수 있습니다.`, {}, 3), 2000);
      }
    }
  },
};
</script>

<template>
  <ResetModal
    header="무한에 진입하려 합니다"
    :message="message"
    :gained-resources="ipGainInfo"
    :starting-resources="startingResources"
    :confirm-fn="handleYesClick"
    :alternate-condition="isFirstInfinity"
    :alternate-text="message"
    :confirm-option="isFirstInfinity ? undefined : 'bigCrunch'"
  />
</template>
