<script>
export default {
  name: "ChallengeRecordsList",
  props: {
    name: {
      type: String,
      required: true
    },
    start: {
      type: Number,
      required: true
    },
    times: {
      type: Array,
      required: true
    }
  },
  computed: {
    timeSum() {
      return this.times.sum();
    },
    completedAllChallenges() {
      return this.timeSum < Number.MAX_VALUE;
    }
  },
  methods: {
    timeDisplayShort,
    completionString(time) {
      return time < Number.MAX_VALUE
        ? `최고 기록: ${timeDisplayShort(time)}`
        : "아직 완료하지 않음";
    }
  }
};
</script>

<template>
  <div>
    <br>
    <div
      v-for="(time, i) in times"
      :key="i"
    >
      <span>{{ name }} {{ start + i }} {{ completionString(time) }}</span>
    </div>
    <br>
    <div v-if="completedAllChallenges">
      {{ name }} 최고 기록 합계: {{ timeDisplayShort(timeSum) }}
    </div>
    <div v-else>
      아직 모든 {{ name }}을 완료하지 않았습니다.
    </div>
  </div>
</template>
