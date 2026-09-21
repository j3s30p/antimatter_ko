<script>
import GlyphSetPreview from "@/components/GlyphSetPreview";

export default {
  name: "GlyphSetRecordsTab",
  components: {
    GlyphSetPreview
  },
  data() {
    return {
      recordGlyphInfo: [],
    };
  },
  methods: {
    update() {
      const bestReality = player.records.bestReality;
      const laitelaDim = 8 - Laitela.difficultyTier;
      this.recordGlyphInfo = [
        [true, Glyphs.copyForRecords(bestReality.RMSet), "최고 리얼리티 머신 획득량",
          `${format(bestReality.RM, 2, 2)} RM`],
        [true, Glyphs.copyForRecords(bestReality.RMminSet), "분당 최고 리얼리티 머신",
          `${format(bestReality.RMmin, 2, 2)} RM/min`],
        [true, Glyphs.copyForRecords(bestReality.glyphLevelSet), "최고 글리프 레벨",
          `레벨 ${formatInt(bestReality.glyphLevel)}`],
        [true, Glyphs.copyForRecords(bestReality.bestEPSet), "최고 영원 포인트",
          `${format(bestReality.bestEP, 2, 2)} EP`],
        [true, Glyphs.copyForRecords(bestReality.speedSet), "가장 빠른 리얼리티 (현실 시간)",
          `${TimeSpan.fromMilliseconds(bestReality.realTime).toStringShort()}`],
        [player.celestials.teresa.bestRunAM.gt(1), Glyphs.copyForRecords(player.celestials.teresa.bestAMSet),
          `${Teresa.displayName} 리얼리티의 최고 반물질`,
          `반물질 ${format(player.celestials.teresa.bestRunAM, 2, 2)}`],
        [Currency.imaginaryMachines.gt(0), Glyphs.copyForRecords(bestReality.iMCapSet),
          "최고 상상 머신 상한",
          `${format(MachineHandler.currentIMCap, 2, 2)} iM`],
        [Laitela.isUnlocked, Glyphs.copyForRecords(bestReality.laitelaSet),
          `최고 ${Laitela.displayName} 불안정화`,
          `${TimeSpan.fromSeconds(player.celestials.laitela.fastestCompletion).toStringShort()},
          차원 ${laitelaDim}개 (${formatX(Laitela.realityReward, 2, 2)} DM)`],
      ];
    },
  }
};
</script>

<template>
  <div class="l-glyph-set-tab">
    <div
      v-for="(set, idx) in recordGlyphInfo"
      :key="idx"
    >
      <div
        v-if="set[0]"
        class="l-glyph-set-entry"
      >
        {{ set[2] }}:
        <GlyphSetPreview
          v-if="set[0]"
          :key="idx"
          :glyphs="set[1]"
          :text="set[2]"
          :text-hidden="true"
        />
        {{ set[3] }}
        <br>
      </div>
    </div>
  </div>
</template>
