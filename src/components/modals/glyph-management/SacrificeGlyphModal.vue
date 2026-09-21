<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "SacrificeGlyphModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    idx: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentGlyphSacrifice: 0,
      gain: 0,
      confirmedSacrifice: false
    };
  },
  computed: {
    glyph() {
      return Glyphs.findByInventoryIndex(this.idx);
    },
    message() {
      return `Do you really want to sacrifice this Glyph? Your total power of sacrificed ${this.glyph.type}
      Glyphs will increase from ${format(this.currentGlyphSacrifice, 2, 2)} to
      ${format(this.currentGlyphSacrifice + this.gain, 2, 2)}.`;
    }
  },
  methods: {
    update() {
      this.currentGlyphSacrifice = player.reality.glyphs.sac[this.glyph.type];
      this.gain = GlyphSacrificeHandler.glyphSacrificeGain(this.glyph);

      const newGlyph = Glyphs.findByInventoryIndex(this.idx);
      if (this.glyph !== newGlyph && !this.confirmedSacrifice) {

        // ConfirmedSacrifice is here because when you sac a glyph with confirmation it
        // Displays this modal message even though the glyph was sacced successfully.
        // I have no idea how the eventHub thing works or if moving the UI update before
        // the sac will break things so this is the best I could do. - Scar

        this.emitClose();
        Modal.message.show("선택한 글리프의 위치나 상태가 변경되었습니다!");
      }
    },
    handleYesClick() {
      this.confirmedSacrifice = true;
      GlyphSacrificeHandler.sacrificeGlyph(this.glyph, true);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="glyphSacrifice"
    @confirm="handleYesClick"
  >
    <template #header>
      글리프를 희생하려고 합니다
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
  </ModalWrapperChoice>
</template>
