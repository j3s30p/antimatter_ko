import { DC } from "../../constants";

export const infinityChallenges = [
  {
    id: 1,
    description: `틱스피드(C9)와 빅 크런치(C12) 도전을 제외한
      모든 일반 도전의 제약이 동시에 적용됩니다.`,
    goal: DC.E650,
    isQuickResettable: true,
    reward: {
      description: () => `완료한 무한 도전 하나당 모든 무한 차원에 ${formatX(1.3, 1, 1)} 배율 적용`,
      effect: () => Math.pow(1.3, InfinityChallenges.completed.length),
      formatEffect: value => formatX(value, 1, 1)
    },
    unlockAM: DC.E2000,
  },
  {
    id: 2,
    description: () => `8차 반물질 차원을 보유하면 ${formatInt(400)}밀리초마다
      차원 희생이 자동으로 실행됩니다.`,
    goal: DC.E10500,
    isQuickResettable: false,
    reward: {
      description: () => `차원 희생 자동 구매기를 해금하고 차원 희생 효과 강화
        ${Sacrifice.getSacrificeDescription({ "InfinityChallenge2isCompleted": false })} ➜
        ${Sacrifice.getSacrificeDescription({ "InfinityChallenge2isCompleted": true })}`,
    },
    unlockAM: DC.E11000,
  },
  {
    id: 3,
    description: () =>
      `틱스피드 업그레이드는 항상 ${formatX(1)}입니다. 대신 틱스피드 업그레이드를 구매할 때마다
      모든 반물질 차원에 고정 배율이 적용되며, 반물질 은하에 따라 배율이 증가합니다.`,
    goal: DC.E5000,
    isQuickResettable: false,
    effect: () => Decimal.pow(1.05 + (player.galaxies * 0.005), player.totalTickBought),
    formatEffect: value => formatX(value, 2, 2),
    reward: {
      description: `반물질 은하와 틱스피드 구매 횟수에 따라 반물질 차원에 배율 적용`,
      effect: () => (Laitela.continuumActive
        ? Decimal.pow(1.05 + (player.galaxies * 0.005), Tickspeed.continuumValue)
        : Decimal.pow(1.05 + (player.galaxies * 0.005), player.totalTickBought)),
      formatEffect: value => formatX(value, 2, 2),
    },
    unlockAM: DC.E12000,
  },
  {
    id: 4,
    description: () =>
      `가장 최근에 구매한 반물질 차원만 정상적으로 생산합니다. 그 외 모든 반물질 차원의
      생산량이 감소합니다(${formatPow(0.25, 2, 2)}).`,
    goal: DC.E13000,
    isQuickResettable: true,
    effect: 0.25,
    reward: {
      description: () => `모든 반물질 차원 배율에 ${formatPow(1.05, 2, 2)} 제곱 적용`,
      effect: 1.05
    },
    unlockAM: DC.E14000,
  },
  {
    id: 5,
    description:
      `1~4차 반물질 차원을 구매하면 더 저렴한 모든 반물질 차원의 비용이 증가합니다.
      5~8차 반물질 차원을 구매하면 더 비싼 모든 반물질 차원의 비용이 증가합니다.`,
    goal: DC.E16500,
    isQuickResettable: true,
    reward: {
      description: () =>
        `모든 은하의 효과가 ${formatPercents(0.1)} 증가하고 은하와
        차원 가속의 요구량이 ${formatInt(1)} 감소`,
      effect: 1.1
    },
    unlockAM: DC.E18000,
  },
  {
    id: 6,
    description: () =>
      `2차 반물질 차원을 ${formatInt(1)}개 이상 보유하면 기하급수적으로 증가하는 물질이
      모든 반물질 차원의 배율을 나눕니다.`,
    goal: DC.D2E22222,
    isQuickResettable: true,
    effect: () => Currency.matter.value.clampMin(1),
    formatEffect: value => `/${format(value, 1, 2)}`,
    reward: {
      description: "틱스피드에 따라 무한 차원에 배율 적용",
      effect: () => Tickspeed.perSecond.pow(0.0005),
      formatEffect: value => formatX(value, 2, 2)
    },
    unlockAM: DC.E22500,
  },
  {
    id: 7,
    description: () => {
      // Copied from DimBoost.power; this is the base amount before any multipliers. Post-eternity this isn't
      // necessarily 2.5x by the time the player sees this challenge; it's probably most accurate to say what it
      // currently is, and this phrasing avoids 10x ➜ 10x with the old description.
      const mult = Effects.max(
        2,
        InfinityUpgrade.dimboostMult,
        InfinityChallenge(7).reward,
        TimeStudy(81)
      );
      return `반물질 은하를 구매할 수 없습니다. 차원 가속의 기본 배율이 최대
        ${formatX(10)}까지 증가합니다. (현재 기본 배율: ${formatX(mult, 2, 1)})`;
    },
    goal: DC.E10000,
    isQuickResettable: false,
    effect: 10,
    reward: {
      description: () => `차원 가속 배율의 최솟값이 ${formatX(4)}로 증가`,
      effect: 4
    },
    unlockAM: DC.E23000,
  },
  {
    id: 8,
    description: () =>
      `반물질 차원 생산량이 시간에 따라 빠르게 계속 감소합니다. 반물질 차원이나 틱스피드
        업그레이드를 구매하면 생산량이 ${formatPercents(1)}로 돌아간 뒤 다시 감소하기 시작합니다.`,
    goal: DC.E27000,
    isQuickResettable: true,
    effect: () => DC.D0_8446303389034288.pow(
      Math.max(0, player.records.thisInfinity.time - player.records.thisInfinity.lastBuyTime)),
    reward: {
      description:
        "1차 및 8차 반물질 차원의 배율에 따라 2~7차 반물질 차원에 배율 적용",
      effect: () => AntimatterDimension(1).multiplier.times(AntimatterDimension(8).multiplier).pow(0.02),
      formatEffect: value => formatX(value, 2, 2)
    },
    unlockAM: DC.E28000,
  },
];
