<script>
import AutobuyerInput from "./AutobuyerInput";
import AutobuyerIntervalLabel from "./AutobuyerIntervalLabel";
import AutobuyerSingleToggleLabel from "./AutobuyerSingleToggleLabel";

// This component contains a single "special" autobuyer toggle (eg. sacrifice, annihilation, 2xIP etc.)
export default {
  name: "SingleAutobuyerBox",
  components: {
    AutobuyerSingleToggleLabel,
    AutobuyerIntervalLabel,
    AutobuyerInput
  },
  props: {
    autobuyer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false,
      // Used to hide the input box if the game is auto-sacrificing every tick without resource resets
      isHiddenSacrifice: false,
    };
  },
  computed: {
    name() {
      return this.autobuyer.name;
    },
    displayName() {
      return {
        "Dimensional Sacrifice": "차원 희생",
        "Replicanti Galaxy": "복제자 은하",
        "Time Theorem": "시간 정리",
        "2x Infinity Points": "무한 포인트 2배",
        "2x Eternity Points": "영원 포인트 2배",
        "Dark Matter Dimensions": "암흑 물질 차원",
        "Dark Matter Dimension Ascension": "암흑 물질 차원 승천",
        "Singularity": "특이점",
        "Annihilation": "소멸"
      }[this.name] ?? this.name;
    },
    isSacrifice() {
      return this.name === "Dimensional Sacrifice";
    }
  },
  methods: {
    update() {
      this.isUnlocked = this.autobuyer.isUnlocked;
      this.isHiddenSacrifice = this.isSacrifice && Achievement(118).canBeApplied;
    },
  }
};
</script>

<template>
  <span
    v-if="isUnlocked"
    class="c-autobuyer-box-row"
  >
    <AutobuyerSingleToggleLabel :autobuyer="autobuyer" />
    <div>
      {{ displayName }}
      <AutobuyerIntervalLabel :autobuyer="autobuyer" />

      <b
        v-if="isHiddenSacrifice"
        class="c-autobuyer-box__small-text"
      >
        자동 작동 (도전 과제 118)
      </b>
      <span
        v-else-if="autobuyer.hasInput"
        class="c-autobuyer-box__small-text"
      >
        배율:
        <AutobuyerInput
          class="c-small-autobuyer-input"
          :autobuyer="autobuyer"
          :type="autobuyer.inputType"
          :property="autobuyer.inputEntry"
        />
      </span>
    </div>
  </span>
</template>

<style scoped>

</style>
