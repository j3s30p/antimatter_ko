import { DC } from "../../constants";

function dimInfinityMult() {
  return Currency.infinitiesTotal.value.times(0.2).plus(1);
}
function chargedDimInfinityMult() {
  return 1 + Math.log10(Math.max(1, Currency.infinitiesTotal.value.pLog10())) * Math.sqrt(Ra.pets.teresa.level) / 150;
}

export const infinityUpgrades = {
  totalTimeMult: {
    id: "timeMult",
    cost: 1,
    description: "플레이 시간에 따라 반물질 차원에 배율 적용",
    effect: () => Math.pow(Time.totalTimePlayed.totalMinutes / 2, 0.15),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: "플레이 시간과 테레사 레벨에 따라 반물질 차원에 제곱 효과 적용",
      effect: () => 1 +
        Math.log10(Math.log10(Time.totalTimePlayed.totalMilliseconds)) *
        Math.pow(Ra.pets.teresa.level, 0.5) / 150,
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim18mult: {
    id: "18Mult",
    cost: 1,
    checkRequirement: () => InfinityUpgrade.totalTimeMult.isBought,
    description: "무한 횟수에 따라 1차 및 8차 반물질 차원에 배율 적용",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "무한 횟수와 테레사 레벨에 따라 1차 및 8차 반물질 차원에 제곱 효과 적용",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim27mult: {
    id: "27Mult",
    cost: 1,
    checkRequirement: () => InfinityUpgrade.buy10Mult.isBought,
    description: "무한 횟수에 따라 2차 및 7차 반물질 차원에 배율 적용",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "무한 횟수와 테레사 레벨에 따라 2차 및 7차 반물질 차원에 제곱 효과 적용",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim36mult: {
    id: "36Mult",
    cost: 1,
    checkRequirement: () => InfinityUpgrade.dim18mult.isBought,
    description: "무한 횟수에 따라 3차 및 6차 반물질 차원에 배율 적용",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "무한 횟수와 테레사 레벨에 따라 3차 및 6차 반물질 차원에 제곱 효과 적용",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim45mult: {
    id: "45Mult",
    cost: 1,
    checkRequirement: () => InfinityUpgrade.dim27mult.isBought,
    description: "무한 횟수에 따라 4차 및 5차 반물질 차원에 배율 적용",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "무한 횟수와 테레사 레벨에 따라 4차 및 5차 반물질 차원에 제곱 효과 적용",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  resetBoost: {
    id: "resetBoost",
    cost: 1,
    checkRequirement: () => InfinityUpgrade.dim36mult.isBought,
    description: () =>
      `차원 가속과 반물질 은하에 필요한 차원 수가 ${formatInt(9)} 감소`,
    effect: 9,
    charged: {
      description: () => "테레사 레벨에 따라 차원 가속 요구량 감소",
      effect: () => 1 / (1 + Math.sqrt(Ra.pets.teresa.level) / 10),
      formatEffect: value => `${formatX(value, 4, 4)}`
    }
  },
  buy10Mult: {
    id: "dimMult",
    cost: 1,
    description: () => `반물질 차원 ${formatInt(10)}개 구매 배율 증가`,
    effect: () => 1.1,
    formatEffect: () => `${formatX(2, 0, 1)} ➜ ${formatX(2.2, 0, 1)}`,
    charged: {
      description: () => `반물질 차원 ${formatInt(10)}개 구매 배율에 ` +
        "테레사 레벨에 따른 제곱 효과 적용",
      effect: () => 1 + Ra.pets.teresa.level / 200,
      formatEffect: value => formatPow(value, 3, 3)
    }
  },
  galaxyBoost: {
    id: "galaxyBoost",
    cost: 2,
    checkRequirement: () => InfinityUpgrade.dim45mult.isBought,
    description: "모든 은하의 효과가 두 배로 증가",
    effect: 2,
    charged: {
      description: "테레사 레벨에 따라 모든 은하의 효과 증가",
      effect: () => 2 + Math.sqrt(Ra.pets.teresa.level) / 100,
      formatEffect: value => `+${formatPercents(value - 1)}`
    }
  },
  thisInfinityTimeMult: {
    id: "timeMult2",
    cost: 3,
    description: "현재 무한에서 보낸 시간에 따라 반물질 차원에 배율 적용",
    effect: () => Decimal.max(Math.pow(Time.thisInfinity.totalMinutes / 4, 0.25), 1),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description:
        "현재 무한에서 보낸 시간과 테레사 레벨에 따라 반물질 차원에 제곱 효과 적용",
      effect: () => 1 +
        Math.log10(Math.log10(Time.thisInfinity.totalMilliseconds + 100)) *
        Math.sqrt(Ra.pets.teresa.level) / 150,
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  unspentIPMult: {
    id: "unspentBonus",
    cost: 5,
    checkRequirement: () => InfinityUpgrade.thisInfinityTimeMult.isBought,
    description: "사용하지 않은 무한 포인트에 따라 1차 반물질 차원에 배율 적용",
    effect: () => Currency.infinityPoints.value.dividedBy(2).pow(1.5).plus(1),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: "사용하지 않은 무한 포인트와 테레사 레벨에 따라 1차 반물질 차원에 배율 적용",
      effect: () => Currency.infinityPoints.value.dividedBy(2).pow(Math.sqrt(Ra.pets.teresa.level) * 1.5).plus(1),
      formatEffect: value => formatX(value, 2, 2)
    }
  },
  dimboostMult: {
    id: "resetMult",
    cost: 7,
    checkRequirement: () => InfinityUpgrade.unspentIPMult.isBought,
    description: "차원 가속 배율 증가",
    effect: () => 2.5,
    formatEffect: () => `${formatX(2, 0, 1)} ➜ ${formatX(2.5, 0, 1)}`,
    charged: {
      description: "차원 가속 배율에 테레사 레벨에 따른 제곱 효과 적용",
      effect: () => 1 + Ra.pets.teresa.level / 200,
      formatEffect: value => formatPow(value, 3, 3)
    }
  },
  ipGen: {
    id: "passiveGen",
    cost: 10,
    checkRequirement: () => InfinityUpgrade.dimboostMult.isBought,
    description: () => `가장 빠른 무한보다 ${formatInt(10)}배 느린 속도로 무한 포인트 자동 생산`,
    // Cutting corners: this is not actual effect, but it is totalIPMult that is displyed on upgrade
    effect: () => (Teresa.isRunning || V.isRunning || Pelle.isDoomed ? DC.D0 : GameCache.totalIPMult.value),
    formatEffect: value => {
      if (Teresa.isRunning || V.isRunning) return "이 현실에서 비활성화됨";
      if (Pelle.isDoomed) return "비활성화됨";
      if (player.records.bestInfinity.time >= 999999999999) return "생산하기에는 너무 느림";
      return `${Time.bestInfinity.times(10).toStringShort()}마다 ${format(value, 2)}`;
    },
    charged: {
      description: () =>
        `현실에서 얻은 양에 비례해 현실 시간으로 매초 리얼리티 머신을 획득하며,
        테레사 레벨에 따라 증가`,
      effect: () => Math.pow(Ra.pets.teresa.level, 2) *
        Ra.unlocks.continuousTTBoost.effects.autoPrestige.effectOrDefault(1),
      formatEffect: value => formatX(value, 2, 1)
    }
  },
  skipReset1: {
    id: "skipReset1",
    cost: 20,
    description: () =>
      `모든 초기화 후 차원 가속 ${formatInt(1)}회와 5차 반물질 차원이 해금된 상태로 시작`,
  },
  skipReset2: {
    id: "skipReset2",
    cost: 40,
    checkRequirement: () => InfinityUpgrade.skipReset1.isBought,
    description: () =>
      `모든 초기화 후 차원 가속 ${formatInt(2)}회와 6차 반물질 차원이 해금된 상태로 시작`,
  },
  skipReset3: {
    id: "skipReset3",
    cost: 80,
    checkRequirement: () => InfinityUpgrade.skipReset2.isBought,
    description: () =>
      `모든 초기화 후 차원 가속 ${formatInt(3)}회와 7차 반물질 차원이 해금된 상태로 시작`,
  },
  skipResetGalaxy: {
    id: "skipResetGalaxy",
    cost: 300,
    checkRequirement: () => InfinityUpgrade.skipReset3.isBought,
    description: () =>
      `모든 초기화 후 차원 가속 ${formatInt(4)}회, 해금된 8차 반물질 차원,
      반물질 은하 1개를 보유한 상태로 시작`,
  },
  ipOffline: {
    id: "ipOffline",
    cost: 1000,
    checkRequirement: () => Achievement(41).isUnlocked,
    description: () => (player.options.offlineProgress
      ? `오프라인일 때만 모두 최대 구매를 사용하지 않은 최고 IP/분의 ${formatPercents(0.5)} 획득`
      : "오프라인 무한 포인트 생산 업그레이드이지만 현재 오프라인 진행이 비활성화되어 있음"),
    effect: () => (player.options.offlineProgress
      ? player.records.thisEternity.bestIPMsWithoutMaxAll.times(TimeSpan.fromMinutes(1).totalMilliseconds / 2)
      : DC.D0),
    isDisabled: () => !player.options.offlineProgress,
    formatEffect: value => `${format(value, 2, 2)} IP/분`,
  },
  ipMult: {
    id: "ipMult",
    cost: () => InfinityUpgrade.ipMult.cost,
    checkRequirement: () => Achievement(41).isUnlocked,
    costCap: DC.E6E6,
    costIncreaseThreshold: DC.E3E6,
    description: () => `모든 출처의 무한 포인트 획득량 ${formatX(2)}`,
    // Normally the multiplier caps at e993k or so with 3300000 purchases, but if the cost is capped then we just give
    // an extra e7k to make the multiplier look nice
    effect: () => (player.IPMultPurchases >= 3300000 ? DC.E1E6 : DC.D2.pow(player.IPMultPurchases)),
    cap: () => Effarig.eternityCap ?? DC.E1E6,
    formatEffect: value => formatX(value, 2, 2),
  }
};
