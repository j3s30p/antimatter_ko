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
      if (this.realityGlyphLevel < effect[0]) return `(Requires Glyph level ${formatInt(effect[0])})`;
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
        Create a level {{ formatInt(realityGlyphLevel) }} Reality Glyph.
        Rarity will always be {{ formatPercents(1) }} and
        level scales on your current Reality Resource amount (which is all consumed). All other Alchemy Resources will
        be unaffected. Reality Glyphs have unique effects, some of which are only available with higher level Glyphs.
        Reality Glyphs can also be sacrificed to increase all Memory Chunk gain. Like Effarig Glyphs,
        you cannot equip more than one at the same time.
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
