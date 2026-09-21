import { DC } from "../../constants";

function rebuyableCost(initialCost, increment, id) {
  return Decimal.multiply(initialCost, Decimal.pow(increment, player.dilation.rebuyables[id]));
}
function rebuyable(config) {
  return {
    id: config.id,
    cost: () => rebuyableCost(config.initialCost, config.increment, config.id),
    initialCost: config.initialCost,
    increment: config.increment,
    description: config.description,
    effect: () => config.effect(player.dilation.rebuyables[config.id]),
    formatEffect: config.formatEffect,
    formatCost: config.formatCost,
    purchaseCap: config.purchaseCap,
    reachedCap: () => player.dilation.rebuyables[config.id] >= config.purchaseCap,
    pelleOnly: Boolean(config.pelleOnly),
    rebuyable: true
  };
}

export const dilationUpgrades = {
  dtGain: rebuyable({
    id: 1,
    initialCost: 1e4,
    increment: 10,
    description: () =>
      ((SingularityMilestone.dilatedTimeFromSingularities.canBeApplied || Achievement(187).canBeApplied)
        ? `${formatX(2 * Effects.product(
          SingularityMilestone.dilatedTimeFromSingularities,
          Achievement(187)
        ), 2, 2)} 팽창된 시간 획득량`
        : "팽창된 시간 획득량 두 배"),
    effect: bought => {
      const base = 2 * Effects.product(
        SingularityMilestone.dilatedTimeFromSingularities,
        Achievement(187)
      );
      return Decimal.pow(base, bought);
    },
    formatEffect: value => {
      const nonInteger = SingularityMilestone.dilatedTimeFromSingularities.canBeApplied ||
        Achievement(187).canBeApplied;
      return formatX(value, 2, nonInteger ? 2 : 0);
    },
    formatCost: value => format(value, 2),
    purchaseCap: Number.MAX_VALUE
  }),
  galaxyThreshold: rebuyable({
    id: 2,
    initialCost: 1e6,
    increment: 100,
    description: () =>
      (Perk.bypassTGReset.isBought && !Pelle.isDoomed
        ? "타키온 은하를 초기화하지만 요구 기준을 낮춥니다"
        : "팽창된 시간과 타키온 은하를 초기화하지만 요구 기준을 낮춥니다"),
    // The 38th purchase is at 1e80, and is the last purchase.
    effect: bought => (bought < 38 ? Math.pow(0.8, bought) : 0),
    formatEffect: effect => {
      if (effect === 0) return `${formatX(getTachyonGalaxyMult(effect), 4, 4)}`;
      const nextEffect = effect === Math.pow(0.8, 37) ? 0 : 0.8 * effect;
      return `${formatX(getTachyonGalaxyMult(effect), 4, 4)} ➜
        다음: ${formatX(getTachyonGalaxyMult(nextEffect), 4, 4)}`;
    },
    formatCost: value => format(value, 2),
    purchaseCap: 38
  }),
  tachyonGain: rebuyable({
    id: 3,
    initialCost: 1e7,
    increment: 20,
    description: () => {
      if (Pelle.isDoomed) return `타키온 입자 획득량에 ${formatInt(1)}배 적용`;
      if (Enslaved.isRunning) return `타키온 입자 획득량에
      ${Math.pow(3, Enslaved.tachyonNerf).toFixed(2)}배 적용`;
      return "타키온 입자 획득량 세 배";
    },
    effect: bought => {
      if (Pelle.isDoomed) return DC.D1.pow(bought);
      return DC.D3.pow(bought);
    },
    formatEffect: value => formatX(value, 2),
    formatCost: value => format(value, 2),
    purchaseCap: Number.MAX_VALUE
  }),
  doubleGalaxies: {
    id: 4,
    cost: 5e6,
    description: () => `기본 타키온 은하 ${formatInt(500)}개까지 두 배로 획득`,
    effect: 2
  },
  tdMultReplicanti: {
    id: 5,
    cost: 1e9,
    description: () => {
      const rep10 = replicantiMult().pLog10();
      let multiplier = "0.1";
      if (rep10 > 9000) {
        const ratio = DilationUpgrade.tdMultReplicanti.effectValue.pLog10() / rep10;
        if (ratio < 0.095) {
          multiplier = ratio.toFixed(2);
        }
      }
      return `시간 차원이 ${formatPow(multiplier, 1, 3)}만큼 거듭제곱된 복제자 배율의 영향을 받으며,
        ${formatX(DC.E9000)} 이상에서는 효과가 감소합니다`;
    },
    effect: () => {
      let rep10 = replicantiMult().pLog10() * 0.1;
      rep10 = rep10 > 9000 ? 9000 + 0.5 * (rep10 - 9000) : rep10;
      return Decimal.pow10(rep10);
    },
    formatEffect: value => formatX(value, 2, 1)
  },
  ndMultDT: {
    id: 6,
    cost: 5e7,
    description: "팽창된 시간에 따라 반물질 차원에 배율을 적용하며, 시간 팽창의 영향을 받지 않습니다",
    effect: () => Currency.dilatedTime.value.pow(308).clampMin(1),
    formatEffect: value => formatX(value, 2, 1)
  },
  ipMultDT: {
    id: 7,
    cost: 2e12,
    description: "팽창된 시간에 따라 무한 포인트에 배율을 적용합니다",
    effect: () => Currency.dilatedTime.value.pow(1000).clampMin(1),
    formatEffect: value => formatX(value, 2, 1),
    cap: () => Effarig.eternityCap
  },
  timeStudySplit: {
    id: 8,
    cost: 1e10,
    description: "차원 분기에서 세 시간 연구 경로를 모두 구매할 수 있습니다"
  },
  dilationPenalty: {
    id: 9,
    cost: 1e11,
    description: () => `시간 팽창 페널티를 완화합니다 (완화 후 ${formatPow(1.05, 2, 2)})`,
    effect: 1.05,
  },
  ttGenerator: {
    id: 10,
    cost: 1e15,
    description: "타키온 입자에 따라 시간 정리를 생성합니다",
    effect: () => Currency.tachyonParticles.value.div(20000),
    formatEffect: value => `${format(value, 2, 1)}/초`
  },
  dtGainPelle: rebuyable({
    id: 11,
    initialCost: 1e14,
    increment: 100,
    pelleOnly: true,
    description: () => `팽창된 시간 획득량 ${formatX(5)}`,
    effect: bought => Decimal.pow(5, bought),
    formatEffect: value => formatX(value, 2),
    formatCost: value => format(value, 2),
    purchaseCap: Number.MAX_VALUE
  }),
  galaxyMultiplier: rebuyable({
    id: 12,
    initialCost: 1e15,
    increment: 1000,
    pelleOnly: true,
    description: "타키온 은하 획득량에 배율을 적용하며, 타키온 은하 두 배 업그레이드 이후 적용됩니다",
    effect: bought => bought + 1,
    formatEffect: value => `${formatX(value, 2)} ➜ ${formatX(value + 1, 2)}`,
    formatCost: value => format(value, 2),
    purchaseCap: Number.MAX_VALUE
  }),
  tickspeedPower: rebuyable({
    id: 13,
    initialCost: 1e16,
    increment: 1e4,
    pelleOnly: true,
    description: "틱스피드를 거듭제곱합니다",
    effect: bought => 1 + bought * 0.03,
    formatEffect: value => `${formatPow(value, 2, 2)} ➜ ${formatPow(value + 0.03, 2, 2)}`,
    formatCost: value => format(value, 2),
    purchaseCap: Number.MAX_VALUE
  }),
  galaxyThresholdPelle: {
    id: 14,
    cost: 1e45,
    pelleOnly: true,
    description: "타키온 은하 요구 기준에 세제곱근을 적용합니다",
    effect: 1 / 3
  },
  flatDilationMult: {
    id: 15,
    cost: 1e55,
    pelleOnly: true,
    description: () => `현재 EP에 따라 팽창된 시간을 더 얻습니다`,
    effect: () => 1e9 ** Math.min((Math.max(player.eternityPoints.log10() - 1500, 0) / 2500) ** 1.2, 1),
    formatEffect: value => formatX(value, 2, 2)
  },
};
