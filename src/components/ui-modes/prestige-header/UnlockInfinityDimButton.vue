<script>
export default {
  name: "UnlockInfinityDimButton",
  data() {
    return {
      isVisible: false,
      canUnlock: false,
      hasIPUnlock: true,
      amRequirement: new Decimal(0),
      ipRequirement: 0,
    };
  },
  computed: {
    text() {
      const dimensionText = this.hasIPUnlock ? "새로운 종류의 차원" : "무한 차원";
      if (this.canUnlock) {
        return `${dimensionText} 해금`;
      }
      const amDisplay = format(this.amRequirement);
      const ipDisplay = format(this.ipRequirement);
      if (this.hasIPUnlock) {
        return `무한 포인트 ${ipDisplay} 및 반물질 ${amDisplay}에 도달하여 ${dimensionText} 해금`;
      }
      return `반물질 ${amDisplay}에 도달하여 ${dimensionText} 해금`;
    },
    buttonClassObject() {
      return {
        "o-prestige-button": true,
        "o-infinity-button": true,
        "o-infinity-button--unavailable": !this.canUnlock
      };
    },
  },
  methods: {
    update() {
      this.isVisible = player.break && !InfinityDimension(8).isUnlocked && !Player.canEternity &&
        !EternityMilestone.autoUnlockID.isReached;
      if (!this.isVisible) return;
      const nextDimension = InfinityDimensions.next();
      this.canUnlock = nextDimension.canUnlock;
      this.hasIPUnlock = nextDimension.hasIPUnlock;
      this.amRequirement = nextDimension.amRequirement;
      this.ipRequirement = nextDimension.ipRequirement;
    },
    tryUnlockNextInfinityDimension() {
      InfinityDimensions.unlockNext();
    }
  },
};
</script>

<template>
  <button
    v-if="isVisible"
    :class="buttonClassObject"
    @click="tryUnlockNextInfinityDimension"
  >
    {{ text }}
  </button>
</template>

<style scoped>

</style>
