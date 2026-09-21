<script>
import { MatterScale } from "./matter-scale";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "StatisticsTab",
  components: {
    PrimaryButton
  },
  data() {
    return {
      isDoomed: false,
      realTimeDoomed: TimeSpan.zero,
      totalAntimatter: new Decimal(0),
      realTimePlayed: TimeSpan.zero,
      timeSinceCreation: 0,
      uniqueNews: 0,
      totalNews: 0,
      secretAchievementCount: 0,
      infinity: {
        isUnlocked: false,
        count: new Decimal(0),
        banked: new Decimal(0),
        projectedBanked: new Decimal(0),
        bankRate: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestRate: new Decimal(0),
      },
      eternity: {
        isUnlocked: false,
        count: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestRate: new Decimal(0),
      },
      reality: {
        isUnlocked: false,
        count: 0,
        best: TimeSpan.zero,
        bestReal: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        totalTimePlayed: TimeSpan.zero,
        bestRate: new Decimal(0),
        bestRarity: 0,
      },
      matterScale: [],
      lastMatterTime: 0,
      paperclips: 0,
      fullTimePlayed: 0,
    };
  },
  computed: {
    // These are here to avoid extra spaces in-game pre-reality and to get around codefactor 120-char limits in the
    // HTML template due to the fact that adding a linebreak also adds a space
    infinityCountString() {
      const num = this.infinity.count;
      return num.gt(0)
        ? `무한 ${this.formatDecimalAmount(num)}회`
        : "무한 0회";
    },
    eternityCountString() {
      const num = this.eternity.count;
      return num.gt(0)
        ? `영원 ${this.formatDecimalAmount(num)}회`
        : "영원 0회";
    },
    fullGameCompletions() {
      return player.records.fullGameCompletions;
    },
    startDate() {
      return Time.toDateTimeString(player.records.gameCreatedTime);
    },
    saveAge() {
      return TimeSpan.fromMilliseconds(this.timeSinceCreation);
    },
  },
  methods: {
    update() {
      const records = player.records;
      this.totalAntimatter.copyFrom(records.totalAntimatter);
      this.realTimePlayed.setFrom(records.realTimePlayed);
      this.fullTimePlayed = TimeSpan.fromMilliseconds(records.previousRunRealTime + records.realTimePlayed);
      this.uniqueNews = NewsHandler.uniqueTickersSeen;
      this.totalNews = player.news.totalSeen;
      this.secretAchievementCount = SecretAchievements.all.filter(a => a.isUnlocked).length;
      this.timeSinceCreation = Date.now() - player.records.gameCreatedTime;

      const progress = PlayerProgress.current;
      const isInfinityUnlocked = progress.isInfinityUnlocked;
      const infinity = this.infinity;
      const bestInfinity = records.bestInfinity;
      infinity.isUnlocked = isInfinityUnlocked;
      if (isInfinityUnlocked) {
        infinity.count.copyFrom(Currency.infinities);
        infinity.banked.copyFrom(Currency.infinitiesBanked);
        infinity.projectedBanked = new Decimal(0).plusEffectsOf(
          Achievement(131).effects.bankedInfinitiesGain,
          TimeStudy(191)
        );
        infinity.bankRate = infinity.projectedBanked.div(Math.clampMin(33, records.thisEternity.time)).times(60000);
        infinity.hasBest = bestInfinity.time < 999999999999;
        infinity.best.setFrom(bestInfinity.time);
        infinity.this.setFrom(records.thisInfinity.time);
        infinity.bestRate.copyFrom(bestInfinity.bestIPminEternity);
      }

      const isEternityUnlocked = progress.isEternityUnlocked;
      const eternity = this.eternity;
      const bestEternity = records.bestEternity;
      eternity.isUnlocked = isEternityUnlocked;
      if (isEternityUnlocked) {
        eternity.count.copyFrom(Currency.eternities);
        eternity.hasBest = bestEternity.time < 999999999999;
        eternity.best.setFrom(bestEternity.time);
        eternity.this.setFrom(records.thisEternity.time);
        eternity.bestRate.copyFrom(bestEternity.bestEPminReality);
      }

      const isRealityUnlocked = progress.isRealityUnlocked;
      const reality = this.reality;
      const bestReality = records.bestReality;
      reality.isUnlocked = isRealityUnlocked;

      if (isRealityUnlocked) {
        reality.count = Math.floor(Currency.realities.value);
        reality.best.setFrom(bestReality.time);
        reality.bestReal.setFrom(bestReality.realTime);
        reality.this.setFrom(records.thisReality.time);
        reality.totalTimePlayed.setFrom(records.totalTimePlayed);
        // Real time tracking is only a thing once reality is unlocked:
        infinity.thisReal.setFrom(records.thisInfinity.realTime);
        infinity.bankRate = infinity.projectedBanked.div(Math.clampMin(33, records.thisEternity.realTime)).times(60000);
        eternity.thisReal.setFrom(records.thisEternity.realTime);
        reality.thisReal.setFrom(records.thisReality.realTime);
        reality.bestRate.copyFrom(bestReality.RMmin);
        reality.bestRarity = Math.max(strengthToRarity(bestReality.glyphStrength), 0);
      }
      this.updateMatterScale();

      this.isDoomed = Pelle.isDoomed;
      this.realTimeDoomed.setFrom(player.records.realTimeDoomed);
      this.paperclips = player.news.specialTickerData.paperclips;
    },
    formatDecimalAmount(value) {
      return value.gt(1e9) ? format(value, 3) : formatInt(Math.floor(value.toNumber()));
    },
    // Only updates once per second to reduce jitter
    updateMatterScale() {
      if (Date.now() - this.lastMatterTime > 1000) {
        this.matterScale = MatterScale.estimate(Currency.antimatter.value);
        this.lastMatterTime = Date.now();
      }
    },
    realityClassObject() {
      return {
        "c-stats-tab-title": true,
        "c-stats-tab-reality": !this.isDoomed,
        "c-stats-tab-doomed": this.isDoomed,
      };
    }
  },
};
</script>

<template>
  <div class="c-stats-tab">
    <div>
      <PrimaryButton onclick="Modal.catchup.show(0)">
        콘텐츠 요약 보기
      </PrimaryButton>
      <div class="c-stats-tab-title c-stats-tab-general">
        일반
      </div>
      <div class="c-stats-tab-general">
        <div>지금까지 반물질을 총 {{ format(totalAntimatter, 2, 1) }}개 생산했습니다.</div>
        <div>플레이 시간: {{ realTimePlayed }} (현실 시간)</div>
        <div v-if="reality.isUnlocked">
          존재한 시간: {{ reality.totalTimePlayed }} (게임 시간)
        </div>
        <div>
          저장 생성 시각: {{ startDate }} ({{ saveAge }} 전)
        </div>
        <br>
        <div>
          뉴스 메시지를 총 {{ formatInt(totalNews) }}회 봤습니다.
        </div>
        <div>
          서로 다른 뉴스 메시지를 {{ formatInt(uniqueNews) }}개 봤습니다.
        </div>
        <div>
          비밀 도전과제를 {{ formatInt(secretAchievementCount) }}개 해금했습니다.
        </div>
        <div v-if="paperclips">
          쓸모없는 종이 클립을 {{ formatInt(paperclips) }}개 보유하고 있습니다.
        </div>
        <div v-if="fullGameCompletions">
          <br>
          <b>
            게임 전체를 {{ formatInt(fullGameCompletions) }}회 완료했습니다.
            <br>
            모든 회차의 총 플레이 시간은 {{ fullTimePlayed }}입니다.
          </b>
        </div>
      </div>
      <div>
        <br>
        <div class="c-matter-scale-container c-stats-tab-general">
          <div
            v-for="(line, i) in matterScale"
            :key="i"
          >
            {{ line }}
          </div>
          <br v-if="matterScale.length < 2">
          <br v-if="matterScale.length < 3">
        </div>
      </div>
      <br>
    </div>
    <div
      v-if="infinity.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div class="c-stats-tab-title c-stats-tab-infinity">
        무한
      </div>
      <div>
        <span v-if="eternity.isUnlocked">이번 영원에서 </span>{{ infinityCountString }}을 달성했습니다.
      </div>
      <div v-if="infinity.banked.gt(0)">
        저축된 무한을 {{ formatDecimalAmount(infinity.banked.floor()) }}회 보유하고 있습니다.
      </div>
      <div v-if="infinity.hasBest">
        가장 빠른 무한 기록은 {{ infinity.best.toStringShort() }}입니다.
      </div>
      <div v-else>
        <span v-if="eternity.isUnlocked">이번 영원에 </span>무한 최고 기록이 없습니다.
      </div>
      <div>
        이번 무한에서 {{ infinity.this.toStringShort() }}을 보냈습니다.
        <span v-if="reality.isUnlocked">
          (현실 시간 {{ infinity.thisReal.toStringShort() }})
        </span>
      </div>
      <div>
        <span v-if="eternity.count.gt(0)">이번 영원의 </span>분당 최고 무한 포인트는
        {{ format(infinity.bestRate, 2, 2) }}입니다.
      </div>
      <br>
    </div>
    <div
      v-if="eternity.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div class="c-stats-tab-title c-stats-tab-eternity">
        영원
      </div>
      <div>
        <span v-if="reality.isUnlocked">이번 현실에서 </span>{{ eternityCountString }}을 달성했습니다.
      </div>
      <div v-if="infinity.projectedBanked.gt(0)">
        영원 시 저축된 무한을 {{ formatDecimalAmount(infinity.projectedBanked.floor()) }}회 획득합니다
        (분당 {{ formatDecimalAmount(infinity.bankRate) }}회).
      </div>
      <div v-else-if="infinity.banked.gt(0)">
        영원 시 저축된 무한을 획득하지 않습니다.
      </div>
      <div v-if="eternity.hasBest">
        가장 빠른 영원 기록은 {{ eternity.best.toStringShort() }}입니다.
      </div>
      <div v-else>
        <span v-if="reality.isUnlocked">이번 현실에 </span>영원 최고 기록이 없습니다.
      </div>
      <div>
        이번 영원에서 {{ eternity.this.toStringShort() }}을 보냈습니다.
        <span v-if="reality.isUnlocked">
          (현실 시간 {{ eternity.thisReal.toStringShort() }})
        </span>
      </div>
      <div>
        <span v-if="reality.isUnlocked">이번 현실의 </span>분당 최고 영원 포인트는
        {{ format(eternity.bestRate, 2, 2) }}입니다.
      </div>
      <br>
    </div>
    <div
      v-if="reality.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div :class="realityClassObject()">
        {{ isDoomed ? "파멸한 현실" : "현실" }}
      </div>
      <div>현실을 {{ formatInt(reality.count) }}회 달성했습니다.</div>
      <div>게임 시간 기준 가장 빠른 현실은 {{ reality.best.toStringShort() }}입니다.</div>
      <div>현실 시간 기준 가장 빠른 현실은 {{ reality.bestReal.toStringShort() }}입니다.</div>
      <div :class="{ 'c-stats-tab-doomed' : isDoomed }">
        이번 {{ isDoomed ? "아마겟돈" : "현실" }}에서 {{ reality.this.toStringShort() }}을 보냈습니다.
        (현실 시간 {{ reality.thisReal.toStringShort() }})
      </div>
      <div
        v-if="isDoomed"
        class="c-stats-tab-doomed"
      >
        현실 시간으로 {{ realTimeDoomed.toStringShort() }} 동안 파멸 상태였습니다.
      </div>
      <div>
        분당 최고 리얼리티 머신은 {{ format(reality.bestRate, 2, 2) }}입니다.
      </div>
      <div>최고 글리프 희귀도는 {{ formatRarity(reality.bestRarity) }}입니다.</div>
      <br>
    </div>
  </div>
</template>

<style scoped>
.c-matter-scale-container {
  height: 5rem;
}

.c-stats-tab-general {
  color: var(--color-text);
}

.c-stats-tab-title {
  font-size: 2rem;
  font-weight: bold;
}

.c-stats-tab-subheader {
  height: 15rem;
}

.c-stats-tab-infinity {
  color: var(--color-infinity);
}

.c-stats-tab-eternity {
  color: var(--color-eternity);
}

.c-stats-tab-reality {
  color: var(--color-reality);
}

.c-stats-tab-doomed {
  color: var(--color-pelle--base);
}
</style>
