<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "AntimatterGalaxyModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    bulk: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      newGalaxies: 0,
      keepAntimatter: false,
      perkANRBought: false,
      keepDimBoost: false
    };
  },
  computed: {
    topLabel() {
      if (this.bulk) return `반물질 은하 ${formatInt(this.newGalaxies)}개를 구매하려 합니다`;
      return `반물질 은하를 구매하려 합니다`;
    },
    message() {
      const resetResouces = [];
      if (Pelle.isDoomed) resetResouces.push("반물질", "반물질 차원", "틱 속도");
      if (!this.perkANRBought) resetResouces.push("반물질 차원", "틱 속도");
      if (!this.keepDimBoost) resetResouces.push("차원 가속");
      if (!this.keepAntimatter && !this.perkANRBought) resetResouces.push("반물질");
      const resetList = [...new Set(resetResouces)].join(", ");
      let tickspeedFixed = "";
      if (InfinityChallenge(3).isRunning) {
        tickspeedFixed = `무한 도전 ${InfinityChallenge(3).id}`;
      } else if (Ra.isRunning) {
        tickspeedFixed = `${Ra.displayName}의 리얼리티`;
      }
      const tickspeedInfo = (tickspeedFixed === "")
        ? "틱 속도 업그레이드에 작은 보너스를 얻습니다."
        : `${tickspeedFixed} 진행 중이므로 틱 속도 업그레이드 보너스를 얻지 못합니다.`;
      const message = (resetList === "")
        ? `초기화되는 자원은 없으며, ${tickspeedInfo}`
        : `${resetList} 항목이 초기화됩니다. 단, ${tickspeedInfo}`;

      if (this.bulk) return `반물질 은하 ${formatInt(this.newGalaxies)}개를 구매하시겠습니까? ${message}`;
      return `반물질 은하를 구매하시겠습니까? ${message}`;
    }
  },
  created() {
    this.on$(GAME_EVENT.DIMBOOST_AFTER, () =>
      (BreakInfinityUpgrade.autobuyMaxDimboosts.isBought ? undefined : this.emitClose()));
  },
  methods: {
    update() {
      if (this.bulk) {
        const req = Galaxy.requirement;
        const dim = AntimatterDimension(req.tier);
        const bulk = bulkBuyBinarySearch(dim.totalAmount, {
          costFunction: x => Galaxy.requirementAt(x).amount,
          cumulative: false,
        }, player.galaxies);
        if (bulk) {
          this.newGalaxies = Galaxy.buyableGalaxies(Math.round(dim.totalAmount.toNumber())) - player.galaxies;
        }
      }
      this.keepAntimatter = Achievement(111).isUnlocked;
      this.perkANRBought = Perk.antimatterNoReset.canBeApplied;
      this.keepDimBoost = (Achievement(143).isUnlocked && !Pelle.isDoomed) ||
        PelleUpgrade.galaxyNoResetDimboost.canBeApplied;
    },
    handleYesClick() {
      requestGalaxyReset(this.bulk);
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="antimatterGalaxy"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>

    <div class="c-modal-message__text">
      {{ message }}
    </div>
  </ModalWrapperChoice>
</template>
