<script>
import ResetModal from "@/components/modals/prestige/ResetModal";

export default {
  name: "EternityModal",
  components: {
    ResetModal
  },
  data() {
    return {
      exitingEC: false,
      startingIP: new Decimal(),
      gainedEternityPoints: new Decimal(),
      gainedEternities: new Decimal()
    };
  },
  computed: {
    message() {
      return PlayerProgress.eternityUnlocked()
        ? `영원에 진입하면 도전과제, 도전 기록, 통계 탭의 일반 항목을 제외한 모든 것이 초기화됩니다.`
        : `영원에 진입하면 도전과제, 도전 기록, 통계 탭의 일반 항목을 제외한 모든 것이 초기화됩니다.
          또한 영원 포인트를 하나 얻고 여러 업그레이드를 해금합니다.`;
    },
    gainedEPOnEternity() {
      return `영원 횟수 ${format(this.gainedEternities, 2)}회와
      영원 포인트 ${format(this.gainedEternityPoints, 2)}를 획득합니다.`;
    },
    startWithIP() {
      return this.startingIP.gt(0)
        ? `다음 영원은 무한 포인트 ${format(this.startingIP, 2)}를 보유한 상태로 시작합니다.`
        : ``;
    },
    eternityChallenge() {
      const ec = EternityChallenge.current;
      if (ec.isFullyCompleted) {
        return `영원 도전 ${ec.id}: 이미 완전히 완료했습니다.`;
      }
      if (!Perk.studyECBulk.isBought) {
        return `영원 도전 ${ec.id}의 완료 횟수가 1회 증가합니다.`;
      }
      const gainedCompletions = ec.gainedCompletionStatus.gainedCompletions;
      return `영원 도전 ${ec.id}의 완료 횟수가 ${formatInt(gainedCompletions)}회 증가합니다.`;
    }
  },
  methods: {
    update() {
      this.exitingEC = EternityChallenge.isRunning;
      this.startingIP = Currency.infinityPoints.startingValue;
      this.gainedEternityPoints = gainedEternityPoints();
      this.gainedEternities = gainedEternities();
    },
    handleYesClick() {
      animateAndEternity();
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ResetModal
    :header="exitingEC ? '영원 도전 완료' : '영원에 진입하려 합니다'"
    :message="message"
    :gained-resources="gainedEPOnEternity"
    :starting-resources="startWithIP"
    :confirm-fn="handleYesClick"
    :alternate-condition="exitingEC"
    :alternate-text="exitingEC ? eternityChallenge : undefined"
    confirm-option="eternity"
  />
</template>
