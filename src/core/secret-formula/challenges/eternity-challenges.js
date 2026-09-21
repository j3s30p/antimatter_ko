import { DC } from "../../constants";

const specialInfinityGlyphDisabledEffectText = () => (PelleRifts.chaos.milestones[1].canBeApplied
  ? "무한 글리프의 펠레 전용 효과도 비활성화됩니다."
  : "");

export const eternityChallenges = [
  {
    id: 1,
    description: "시간 차원이 비활성화됩니다.",
    goal: DC.E1800,
    goalIncrease: DC.E200,
    reward: {
      description: "이번 영원에서 보낸 시간에 따라 시간 차원에 배율 적용",
      effect: completions =>
        Decimal.pow(Math.max(player.records.thisEternity.time / 10, 0.9), 0.3 + (completions * 0.05)),
      formatEffect: value => formatX(value, 2, 1)
    },
    // These will get notation-formatted and scrambled between for the final goal
    scrambleText: ["1e2600", "1e201600"],
  },
  {
    id: 2,
    description: "무한 차원이 비활성화됩니다.",
    goal: DC.E975,
    pelleGoal: DC.E1750,
    goalIncrease: DC.E175,
    reward: {
      description: "무한력에 따라 1차 무한 차원에 배율 적용",
      effect: completions => Currency.infinityPower.value.pow(1.5 / (700 - completions * 100)).clampMin(1),
      cap: DC.E100,
      formatEffect: value => formatX(value, 2, 1)
    }
  },
  {
    id: 3,
    description: "5~8차 반물질 차원이 아무것도 생산하지 않으며 차원 희생이 비활성화됩니다.",
    goal: DC.E600,
    pelleGoal: DC.E925,
    goalIncrease: DC.E75,
    reward: {
      description: () => `반물질 차원 ${formatInt(10)}개 구매 배율 증가`,
      effect: completions => completions * 0.72,
      formatEffect: value => `+${format(value, 2, 2)}`
    }
  },
  {
    id: 4,
    description: `모든 무한 배율과 생산기가 비활성화됩니다. 정해진 무한 횟수 안에
      목표에 도달하지 못하면 도전에 실패합니다.`,
    goal: DC.E2750,
    goalIncrease: DC.E550,
    restriction: completions => Math.max(16 - 4 * completions, 0),
    checkRestriction: restriction => Currency.infinities.lte(restriction),
    formatRestriction: restriction => (restriction === 0
      ? "무한을 한 번도 실행하지 않고"
      : `무한 ${formatInt(restriction)}회 이하로`),
    failedRestriction: "(무한 횟수가 너무 많아 추가 완료 불가)",
    reward: {
      description: "사용하지 않은 IP에 따라 무한 차원에 배율 적용",
      effect: completions => Currency.infinityPoints.value.pow(0.003 + completions * 0.002),
      cap: DC.E200,
      formatEffect: value => formatX(value, 2, 1)
    }
  },
  {
    id: 5,
    description: () => `반물질 은하 비용 증가 스케일링이 즉시 시작됩니다(일반적으로 은하 ${formatInt(100)}개부터).
      차원 가속 비용 스케일링이 크게 증가합니다.`,
    goal: DC.E750,
    pelleGoal: DC.E1400,
    goalIncrease: DC.E400,
    reward: {
      description: "먼 은하 비용 스케일링이 더 늦게 시작",
      effect: completions => completions * 5,
      formatEffect: value => `반물질 은하 ${formatInt(value)}개만큼 지연`
    }
  },
  {
    id: 6,
    // The asterisk, if present, will get replaced with strings generated from the scramble text
    description: () => {
      if (Enslaved.isRunning) return "당신은 *. 복제자 은하 최대치 업그레이드 비용이 크게 감소합니다.";
      return "반물질 은하를 일반적인 방법으로 얻을 수 없습니다. 복제자 은하 최대치" +
              " 업그레이드 비용이 크게 감소합니다.";
    },
    goal: DC.E850,
    pelleGoal: DC.E1500,
    goalIncrease: DC.E250,
    reward: {
      description: "반물질 차원 비용 배율 증가량 추가 감소",
      effect: completions => completions * 0.2,
      formatEffect: value => {
        const total = Math.round(Player.dimensionMultDecrease + Effects.sum(EternityChallenge(6).reward)) - value;
        return `-${format(value, 2, 1)} (총 ${formatX(total, 2, 1)})`;
      }
    },
    scrambleText: ["반물질 은하를 일반적인 방법으로 얻을 수 없습니다", "c㏰'퐚 gai鸭 Anti꟢at랜erﻪﶓa⁍axie㮾 䂇orma㦂l"],
  },
  {
    id: 7,
    description:
      "1차 시간 차원이 8차 무한 차원을 생산하고, 1차 무한 차원이 7차 반물질 차원을 생산합니다. " +
      "틱스피드가 무한 차원과 시간 차원에도 직접 적용됩니다.",
    goal: DC.E2000,
    pelleGoal: DC.E2700,
    goalIncrease: DC.E530,
    effect: () => TimeDimension(1).productionPerSecond,
    reward: {
      description: "1차 시간 차원이 8차 무한 차원 생산",
      effect: completions => TimeDimension(1).productionPerSecond.pow(completions * 0.2).minus(1).clampMin(0),
      formatEffect: value => `초당 ${format(value, 2, 1)}`
    }
  },
  {
    id: 8,
    description: () => `무한 차원은 ${formatInt(50)}회, 복제자 업그레이드는 ${formatInt(40)}회만 구매할 수 있습니다.
      무한 차원 및 복제자 업그레이드 자동 구매기가 비활성화됩니다.`,
    goal: DC.E1300,
    pelleGoal: DC.E2800,
    goalIncrease: DC.E900,
    reward: {
      description: "무한력이 복제자 은하를 강화",
      effect: completions => {
        const infinityPower = Math.log10(Currency.infinityPower.value.pLog10() + 1);
        return Math.max(0, Math.pow(infinityPower, 0.03 * completions) - 1);
      },
      formatEffect: value => formatPercents(value, 2)
    }
  },
  {
    id: 9,
    description: () => `틱스피드 업그레이드를 구매할 수 없습니다. 대신 무한력이 크게 감소된 효과로
      시간 차원에 배율을 적용합니다. ${specialInfinityGlyphDisabledEffectText()}`,
    goal: DC.E1750,
    pelleGoal: DC.E2900,
    goalIncrease: DC.E250,
    reward: {
      description: "시간 조각에 따라 무한 차원에 배율 적용",
      effect: completions => Currency.timeShards.value.pow(completions * 0.1).clampMin(1),
      cap: DC.E400,
      formatEffect: value => formatX(value, 2, 1)
    }
  },
  {
    id: 10,
    description: () => {
      let description = `시간 차원과 무한 차원이 비활성화됩니다. 무한 횟수가 반물질 차원에
        막대한 배율을 적용합니다(무한 횟수${formatPow(950)}). ${specialInfinityGlyphDisabledEffectText()}`;
      EternityChallenge(10).applyEffect(v => description += ` 현재: ${formatX(v, 2, 1)}`);
      return description;
    },
    goal: DC.E3000,
    pelleGoal: DC.E3200,
    goalIncrease: DC.E300,
    effect: () => Decimal.pow(Currency.infinitiesTotal.value, 950).clampMin(1).pow(TimeStudy(31).effectOrDefault(1)),
    reward: {
      description: "무한 횟수에 따라 시간 차원에 배율 적용",
      effect: completions => {
        const mult = Currency.infinitiesTotal.value.times(2.783e-6).pow(0.4 + 0.1 * completions).clampMin(1);
        return mult.powEffectOf(TimeStudy(31));
      },
      formatEffect: value => {
        // Since TS31 is already accounted for in the effect prop, we need to "undo" it to display the base value here
        const mult = formatX(value, 2, 1);
        return TimeStudy(31).canBeApplied
          ? `${formatX(value.pow(1 / TimeStudy(31).effectValue), 2, 1)} (시간 연구 31 적용 후: ${mult})`
          : mult;
      }
    }
  },
  {
    id: 11,
    description: () => `무한력과 차원 가속이 반물질 차원에 적용하는 배율을 제외한
      모든 차원 배율과 제곱 효과가 비활성화됩니다. ${specialInfinityGlyphDisabledEffectText()}`,
    goal: DC.E450,
    pelleGoal: DC.E11200,
    goalIncrease: DC.E200,
    pelleGoalIncrease: DC.E1400,
    reward: {
      description: "틱스피드 비용 배율 증가량 추가 감소",
      effect: completions => completions * 0.07,
      formatEffect: value => {
        const total = Math.round(Player.tickSpeedMultDecrease + Effects.sum(EternityChallenge(11).reward)) - value;
        return `-${format(value, 2, 2)} (총 ${formatX(total, 2, 2)})`;
      }
    }
  },
  {
    id: 12,
    description: () => (PlayerProgress.realityUnlocked()
      ? `게임이 ${formatInt(1000)}배 느려지고 다른 모든 게임 속도 효과가 비활성화됩니다. 정해진 시간 안에
        목표에 도달하지 못하면 도전에 실패합니다. ${specialInfinityGlyphDisabledEffectText()}`
      : `게임이 ${formatInt(1000)}배 느려집니다. 정해진 시간 안에
        목표에 도달하지 못하면 도전에 실패합니다.`),
    goal: DC.E110000,
    pelleGoal: DC.E208000,
    goalIncrease: DC.E12000,
    restriction: completions => Math.max(10 - 2 * completions, 1) / 10,
    checkRestriction: restriction => Time.thisEternity.totalSeconds < restriction,
    formatRestriction: restriction => `게임 시간 ${format(restriction, 0, 1)}초 이하로`,
    failedRestriction: "(너무 느려 추가 완료 불가)",
    reward: {
      description: "무한 차원 비용 배율 감소",
      effect: completions => 1 - completions * 0.008,
      formatEffect: value => `x${formatPow(value, 3, 3)}`
    }
  }
];
