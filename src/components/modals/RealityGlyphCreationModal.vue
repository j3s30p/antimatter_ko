<script>
import ModalWrapper from "@/components/modals/ModalWrapper";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "RealityGlyphCreationModal",
  components: {
    ModalWrapper,
    PrimaryButton
  },
  data() {
    return {
      isDoomed: false,
      realityGlyphLevel: 0,
      // This contains an array where each entry is an array looking like [4000, "realitygalaxies"]
      possibleEffects: [],
    };
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.realityGlyphLevel = AlchemyResource.reality.effectValue;
      const realityEffectConfigs = GlyphEffects.all
        .filter(eff => eff.glyphTypes.includes("reality"))
        .sort((a, b) => a.bitmaskIndex - b.bitmaskIndex);
      const minRealityEffectIndex = realityEffectConfigs.map(cfg => cfg.bitmaskIndex).min();
      this.possibleEffects = realityEffectConfigs
        .map(cfg => [realityGlyphEffectLevelThresholds[cfg.bitmaskIndex - minRealityEffectIndex], cfg.id]);
    },
    createRealityGlyph() {
      if (GameCache.glyphInventorySpace.value === 0) {
        Modal.message.show("보관함에 빈칸이 없습니다. 글리프를 희생하여 공간을 확보하세요.",
          { closeEvent: GAME_EVENT.GLYPHS_CHANGED });
        return;
      }
      Glyphs.addToInventory(GlyphGenerator.realityGlyph(this.realityGlyphLevel));
      AlchemyResource.reality.amount = 0;
      player.reality.glyphs.createdRealityGlyph = true;
      this.emitClose();
    },
    formatGlyphEffect(effect) {
      if (this.realityGlyphLevel < effect[0]) return `(글리프 레벨 ${formatInt(effect[0])} 필요)`;
      const config = GlyphEffects[effect[1]];
      const value = config.effect(this.realityGlyphLevel, rarityToStrength(100));
      const effectTemplate = config.singleDesc;
      return effectTemplate.replace("{value}", config.formatEffect(value));
    }
  },
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      현실 글리프 생성
    </template>
    <div class="c-reality-glyph-creation">
      <div>
        레벨 {{ formatInt(realityGlyphLevel) }} 현실 글리프를 생성합니다.
        희귀도는 항상 {{ formatPercents(1) }}이며, 레벨은 현재 보유한 현실 연금술 자원의 양에 따라 정해지고
        이 자원은 모두 소모됩니다. 다른 연금술 자원에는 영향이 없습니다. 현실 글리프에는 고유한 효과가 있으며,
        일부 효과는 글리프 레벨이 더 높아야 사용할 수 있습니다. 현실 글리프를 희생하면 모든 기억 조각 획득량이
        증가합니다. 에파리그 글리프와 마찬가지로 한 번에 하나만 장착할 수 있습니다.
      </div>
      <div class="o-available-effects-container">
        <div class="o-available-effects">
          사용 가능한 효과:
        </div>
        <div
          v-for="(effect, index) in possibleEffects"
          :key="index"
        >
          {{ formatGlyphEffect(effect) }}
        </div>
      </div>
      <PrimaryButton
        v-if="isDoomed"
        :enabled="false"
      >
        파멸 상태에서는 현실 글리프를 생성할 수 없습니다
      </PrimaryButton>
      <PrimaryButton
        v-else-if="realityGlyphLevel !== 0"
        @click="createRealityGlyph"
      >
        현실 글리프 생성!
      </PrimaryButton>
      <PrimaryButton
        v-else
        :enabled="false"
      >
        현실 글리프 레벨이 {{ formatInt(0) }}보다 높아야 합니다
      </PrimaryButton>
    </div>
  </ModalWrapper>
</template>

<style scoped>
.o-available-effects-container {
  margin: 1.5rem 0 2rem;
}

.o-available-effects {
  font-weight: bold;
}
</style>
