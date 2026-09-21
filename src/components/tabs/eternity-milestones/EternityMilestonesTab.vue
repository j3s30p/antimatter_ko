<script>
import EternityMilestoneButton from "./EternityMilestoneButton";

export default {
  name: "EternityMilestonesTab",
  components: {
    EternityMilestoneButton
  },
  data() {
    return {
      eternityCount: new Decimal(),
    };
  },
  computed: {
    milestones() {
      return Object.values(GameDatabase.eternity.milestones)
        .sort((a, b) => a.eternities - b.eternities)
        .map(config => new EternityMilestoneState(config));
    },
    rows() {
      return Math.ceil(this.milestones.length / 3);
    }
  },
  methods: {
    update() {
      this.eternityCount.copyFrom(Currency.eternities.value.floor());
    },
    getMilestone(row, column) {
      return () => this.milestones[(row - 1) * 3 + column - 1];
    }
  }
};
</script>

<template>
  <div class="l-eternity-milestone-grid">
    <div>영원 횟수: {{ format(eternityCount, 3) }}회</div>
    <div>
      오프라인 생산 마일스톤은 특정 조건에서만 활성화됩니다. 마우스를 올리면 조건을 볼 수 있습니다.
    </div>
    <div
      v-for="row in rows"
      :key="row"
      class="l-eternity-milestone-grid__row"
    >
      <EternityMilestoneButton
        v-for="column in 3"
        :key="row * 3 + column"
        :get-milestone="getMilestone(row, column)"
        class="l-eternity-milestone-grid__cell"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
