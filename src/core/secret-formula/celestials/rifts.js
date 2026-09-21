import { DC } from "../../constants";
import wordShift from "../../word-shift";

export const pelleRifts = {
  vacuum: {
    id: 1,
    key: "vacuum",
    name: ["진공", "공허", "무"],
    drainResource: "IP",
    baseEffect: x => `IP 획득량 ${formatX(x, 2, 2)}`,
    additionalEffects: () => [PelleRifts.vacuum.milestones[2]],
    strike: () => PelleStrikes.infinity,
    percentage: totalFill => Math.log10(totalFill.plus(1).log10() * 10 + 1) ** 2.5 / 100,
    percentageToFill: percentage => Decimal.pow(10,
      Decimal.pow(10, (percentage * 100) ** (1 / 2.5)).div(10).minus(0.1)
    ).minus(1),
    effect: totalFill => {
      if (player.challenge.eternity.current !== 0) {
        const chall = EternityChallenge.current;
        const goal = chall.goalAtCompletions(chall.gainedCompletionStatus.totalCompletions);
        return totalFill.plus(1).pow(0.1).min(goal.pow(0.15));
      }
      return totalFill.plus(1).pow(0.33);
    },
    currency: () => Currency.infinityPoints,
    galaxyGeneratorThreshold: 1000,
    milestones: [
      {
        resource: "vacuum",
        requirement: 0.04,
        description: "레벨과 희귀도가 낮아진 기본 글리프 하나를 장착할 수 있습니다"
      },
      {
        resource: "vacuum",
        requirement: 0.06,
        description: () => `복제자의 상한을 없애고 해금과 업그레이드 비용을 ${formatX(1e130)}만큼 낮춥니다`,
        effect: () => 1e130
      },
      {
        resource: "vacuum",
        requirement: 0.4,
        description: () => `${wordShift.wordCycle(PelleRifts.vacuum.name)} 균열이 EP 획득량에도 적용됩니다`,
        effect: () => Decimal.pow(4, PelleRifts.vacuum.totalFill.log10() / 2 / 308 + 3),
        formatEffect: x => `EP 획득량 ${formatX(x, 2, 2)}`
      },
    ],
    galaxyGeneratorText: "더 만들 공간이 부족합니다. $value 균열을 채워야 합니다"
  },
  decay: {
    id: 2,
    key: "decay",
    name: ["쇠퇴", "붕괴", "혼란"],
    drainResource: "복제자",
    spendable: true,
    baseEffect: x => `복제자 속도 ${formatX(x, 2, 2)}`,
    additionalEffects: () => [PelleRifts.decay.milestones[0], PelleRifts.decay.milestones[2]],
    strike: () => PelleStrikes.powerGalaxies,
    // 0 - 1
    percentage: totalFill => totalFill.plus(1).log10() * 0.05 / 100,
    // 0 - 1
    percentageToFill: percentage => Decimal.pow(10, 20 * percentage * 100).minus(1),
    effect: totalFill => (PelleRifts.chaos.milestones[0].canBeApplied
      ? Decimal.sqrt(2000 + 1) : Decimal.sqrt(totalFill.plus(1).log10() + 1)),
    currency: () => Currency.replicanti,
    galaxyGeneratorThreshold: 1e7,
    milestones: [
      {
        resource: "decay",
        requirement: 0.2,
        description: "첫 번째 반복 구매 펠레 업그레이드가 첫 번째 무한 차원에도 적용됩니다",
        effect: () => {
          const x = player.celestials.pelle.rebuyables.antimatterDimensionMult;
          return Decimal.pow(1e50, x - 9);
        },
        formatEffect: x => `첫 번째 무한 차원 ${formatX(x, 2, 2)}`
      },
      {
        resource: "decay",
        requirement: 0.6,
        description: () => `복제자가 ${format(DC.E1300)}을 넘으면
          모든 은하의 효과가 ${formatPercents(0.1)}만큼 증가합니다`,
        effect: () => (Replicanti.amount.gt(DC.E1300) ? 1.1 : 1)
      },
      {
        resource: "decay",
        requirement: 1,
        description: "달성한 균열 마일스톤 수에 따라 복제자 은하의 최대치를 증가시킵니다",
        effect: () => {
          const x = PelleRifts.totalMilestones();
          return x ** 2 - 2 * x;
        },
        formatEffect: x => `복제자 은하 최대치 +${formatInt(x)}`
      },
    ],
    galaxyGeneratorText: "새 은하를 만들 반물질이 부족합니다. $value 균열을 되돌려야 합니다"
  },
  chaos: {
    id: 3,
    key: "chaos",
    name: ["혼돈", "무질서", "불순"],
    drainResource: ["쇠퇴", "붕괴", "무질서"],
    baseEffect: x => `시간 차원 ${formatX(x, 2, 2)}`,
    strike: () => PelleStrikes.eternity,
    percentage: totalFill => totalFill / 10,
    percentageToFill: percentage => 10 * percentage,
    effect: totalFill => {
      const fill = totalFill > 6.5
        ? (totalFill - 6.5) / 7 + 6.5
        : totalFill;
      return Decimal.pow(6, Decimal.pow(6, Decimal.pow(6, fill / 10 + 0.1)).minus(6))
        .div(1e5)
        .plus(Decimal.pow(10, fill / 10 + 0.1));
    },
    currency: () => ({
      get value() {
        return PelleRifts.decay.percentage;
      },
      set value(val) {
        const spent = PelleRifts.decay.percentage - val;
        player.celestials.pelle.rifts.decay.percentageSpent += spent;
      }
    }),
    galaxyGeneratorThreshold: 1e9,
    milestones: [
      {
        resource: "chaos",
        requirement: 0.09,
        description: () => `${wordShift.wordCycle(PelleRifts.decay.name)} \
        효과가 항상 최대가 되고 마일스톤이 항상 활성화됩니다`
      },
      {
        resource: "chaos",
        requirement: 0.15,
        description: "글리프에 펠레 전용 효과가 새로 생깁니다",
      },
      {
        resource: "chaos",
        requirement: 1,
        description: () => `영원 시 획득하는 EP의 ${formatPercents(0.01)}를 초당 획득합니다`,
      },
    ],
    galaxyGeneratorText: "은하가 너무 많이 파편화되었습니다. $value 균열을 안정시켜야 합니다"
  },
  recursion: {
    id: 4,
    key: "recursion",
    name: ["재귀", "분산", "파괴"],
    drainResource: "EP",
    baseEffect: x => `EP 공식: log(x)/${formatInt(308)} ➜ log(x)/${formatFloat(308 - x.toNumber(), 2)}`,
    additionalEffects: () => [PelleRifts.recursion.milestones[0], PelleRifts.recursion.milestones[1]],
    strike: () => PelleStrikes.ECs,
    percentage: totalFill => totalFill.plus(1).log10() ** 0.4 / 4000 ** 0.4,
    percentageToFill: percentage => Decimal.pow(10, percentage ** 2.5 * 4000).minus(1),
    effect: totalFill => new Decimal(58 * totalFill.plus(1).log10() ** 0.2 / 4000 ** 0.2),
    currency: () => Currency.eternityPoints,
    galaxyGeneratorThreshold: 1e10,
    milestones: [
      {
        resource: "recursion",
        requirement: 0.10,
        description: "EC 완료 횟수에 따라 차원 가속이 더 강해집니다",
        effect: () => Math.max(100 * EternityChallenges.completions ** 2, 1) *
          Math.max(1e4 ** (EternityChallenges.completions - 40), 1),
        formatEffect: x => `차원 가속 배율 ${formatX(x, 2, 2)}`
      },
      {
        resource: "recursion",
        requirement: 0.15,
        description: "EC 완료 횟수에 따라 무한 차원이 더 강해집니다",
        effect: () => Decimal.pow("1e1500", ((EternityChallenges.completions - 25) / 20) ** 1.7).max(1),
        formatEffect: x => `무한 차원 ${formatX(x)}`
      },
      {
        resource: "recursion",
        requirement: 1,
        description: "은하 생성기를 영구적으로 해금합니다",
      },
    ],
    galaxyGeneratorText: "은하를 더 만드는 것은 지속할 수 없습니다. 더 만들려면 $value 균열에 집중해야 합니다"
  },
  paradox: {
    id: 5,
    key: "paradox",
    name: ["역설", "모순", "오류"],
    drainResource: "팽창한 시간",
    baseEffect: x => `모든 차원 ${formatPow(x, 2, 3)}`,
    additionalEffects: () => [PelleRifts.paradox.milestones[2]],
    strike: () => PelleStrikes.dilation,
    percentage: totalFill => totalFill.plus(1).log10() / 100,
    percentageToFill: percentage => Decimal.pow10(percentage * 100).minus(1),
    effect: totalFill => new Decimal(1 + totalFill.plus(1).log10() * 0.004),
    currency: () => Currency.dilatedTime,
    galaxyGeneratorThreshold: 1e5,
    milestones: [
      {
        resource: "paradox",
        requirement: 0.15,
        description: "시간 차원 5-8이 훨씬 저렴해지고 시간 팽창 업그레이드를 더 해금합니다",
        // FIXME: Not a great solution
        onStateChange: () => {
          updateTimeDimensionCosts();
        }
      },
      {
        resource: "paradox",
        requirement: 0.25,
        description: () => `팽창 시간 획득량이 타키온 입자 ${formatPow(1.4, 1, 1)}이 됩니다`,
        effect: 1.4
      },
      {
        resource: "paradox",
        requirement: 0.5,
        description: "반복 구매 시간 팽창 업그레이드의 구매 횟수가 무한력 변환율을 향상시킵니다",
        effect: () => Math.min(
          1.1075 ** (Object.values(player.dilation.rebuyables).sum() - 60),
          712
        ),
        formatEffect: x => `무한력 변환율 ${formatX(x, 2, 2)}`
      },
    ],
    galaxyGeneratorText: "더 만들 수 있어야 하지만 펠레가 제한했습니다. $value 균열을 무시하세요"
  }
};
