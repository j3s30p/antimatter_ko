<script>
import AnnihilationButton from "./AnnihilationButton";
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import DarkMatterDimensionGroup from "./DarkMatterDimensionGroup";
import LaitelaAutobuyerPane from "./LaitelaAutobuyerPane";
import LaitelaRunButton from "./LaitelaRunButton";
import PrimaryButton from "@/components/PrimaryButton";
import SingularityMilestonePane from "./SingularityMilestonePane";
import SingularityPane from "./SingularityPane";

export default {
  name: "LaitelaTab",
  components: {
    LaitelaRunButton,
    SingularityPane,
    SingularityMilestonePane,
    DarkMatterDimensionGroup,
    AnnihilationButton,
    LaitelaAutobuyerPane,
    CelestialQuoteHistory,
    PrimaryButton
  },
  data() {
    return {
      isDoomed: false,
      darkMatter: new Decimal(0),
      darkMatterGain: new Decimal(0),
      isDMCapped: false,
      maxDarkMatter: new Decimal(0),
      darkEnergy: 0,
      matterExtraPurchasePercentage: 0,
      autobuyersUnlocked: false,
      singularityPanelVisible: false,
      singularitiesUnlocked: false,
      singularityCap: 0,
      singularityWaitTime: 0,
      showAnnihilation: false
    };
  },
  computed: {
    styleObject() {
      return {
        color: this.isDMCapped ? "var(--color-bad)" : "",
      };
    },
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.darkMatter.copyFrom(Currency.darkMatter);
      this.isDMCapped = this.darkMatter.eq(Number.MAX_VALUE);
      this.maxDarkMatter.copyFrom(Currency.darkMatter.max);
      this.darkEnergy = player.celestials.laitela.darkEnergy;
      this.matterExtraPurchasePercentage = Laitela.matterExtraPurchaseFactor - 1;
      this.autobuyersUnlocked = SingularityMilestone.darkDimensionAutobuyers.canBeApplied ||
        SingularityMilestone.darkDimensionAutobuyers.canBeApplied ||
        SingularityMilestone.autoCondense.canBeApplied ||
        Laitela.darkMatterMult > 1;
      this.singularityPanelVisible = Currency.singularities.gt(0);
      this.singularitiesUnlocked = Singularity.capIsReached || this.singularityPanelVisible;
      this.singularityCap = Singularity.cap;
      this.singularityWaitTime = TimeSpan.fromSeconds((this.singularityCap - this.darkEnergy) /
        Currency.darkEnergy.productionPerSecond).toStringShort();
      this.showAnnihilation = Laitela.annihilationUnlocked;

      const d1 = DarkMatterDimension(1);
      this.darkMatterGain = d1.amount.times(d1.powerDM).divide(d1.interval).times(1000);
    },
    maxAll() {
      Laitela.maxAllDMDimensions(4);
    },
    showLaitelaHowTo() {
      ui.view.h2pForcedTab = GameDatabase.h2p.tabs.filter(tab => tab.tab === "celestials/laitela")[0];
      Modal.h2p.show();
    },
  }
};
</script>

<template>
  <div class="l-laitela-celestial-tab">
    <CelestialQuoteHistory celestial="laitela" />
    <div class="c-subtab-option-container">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="showLaitelaHowTo()"
      >
        라이텔라 정보 보기
      </PrimaryButton>
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        모든 암흑 물질 차원 최대 구매
      </PrimaryButton>
    </div>
    <div class="o-laitela-matter-amount">
      암흑 물질을
      <span :style="styleObject">{{ format(darkMatter, 2) }}</span>
      보유하고 있습니다<span v-if="isDMCapped"> (상한 도달)</span>.
      <span v-if="!isDMCapped">(평균: {{ format(darkMatterGain, 2, 2) }}/초)</span>
    </div>
    <div class="o-laitela-matter-amount">
      역대 암흑 물질 최대치는
      <span :style="styleObject">{{ format(maxDarkMatter, 2) }}</span><span v-if="!isDoomed">,
        연속체 구매량이 {{ formatPercents(matterExtraPurchasePercentage, 2) }} 증가합니다</span>.
    </div>
    <div class="o-laitela-matter-amount">
      암흑 물질 차원은 실제 시간 저장의 영향을 받지 않습니다.
    </div>
    <h2
      v-if="!singularitiesUnlocked"
      class="c-laitela-singularity-container"
    >
      {{ singularityWaitTime }} 후 특이점을 해금합니다.
      (암흑 에너지 {{ format(darkEnergy, 2, 2) }}/{{ format(singularityCap, 2) }})
    </h2>
    <SingularityPane v-if="singularitiesUnlocked" />
    <LaitelaAutobuyerPane v-if="autobuyersUnlocked" />
    <div class="l-laitela-mechanics-container">
      <LaitelaRunButton />
      <div>
        <DarkMatterDimensionGroup />
        <AnnihilationButton v-if="showAnnihilation" />
      </div>
      <SingularityMilestonePane v-if="singularityPanelVisible" />
    </div>
  </div>
</template>
