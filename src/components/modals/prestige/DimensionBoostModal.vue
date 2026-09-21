<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "DimensionBoostModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    bulk: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    topLabel() {
      return `차원 가속 초기화를 실행하려 합니다`;
    },
    message() {
      const keepDimensions = Perk.antimatterNoReset.canBeApplied || Achievement(111).canBeApplied ||
        PelleUpgrade.dimBoostResetsNothing.isBought
        ? `보유한 업그레이드의 효과로 반물질과 반물질 차원이 초기화되지 않습니다.
          차원 가속의 배율은 정상적으로 얻습니다.`
        : `반물질과 반물질 차원이 초기화됩니다. 정말 실행하시겠습니까?`;

      return keepDimensions;
    },
  },
  methods: {
    handleYesClick() {
      requestDimensionBoost(this.bulk);
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="dimensionBoost"
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
