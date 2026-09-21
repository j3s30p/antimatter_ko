import { DC } from "../../constants";

export const normalAchievements = [
  {
    id: 11,
    name: "어디서든 시작은 해야지",
    description: "제1 반물질 차원을 구매하세요.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 12,
    name: "반물질 100개는 많아",
    description: "제2 반물질 차원을 구매하세요.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 13,
    name: "하프라이프 3 확정",
    description: "제3 반물질 차원을 구매하세요.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 14,
    name: "L4D: 남겨진 4개의 차원",
    description: "제4 반물질 차원을 구매하세요.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 15,
    name: "5차원 반물질 펀치",
    description: "제5 반물질 차원을 구매하세요.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 16,
    name: "9까지 살 여유는 없었어",
    get description() {
      return Enslaved.isRunning
        ? "제6 반물질 차원을 구매하세요. (아무리 모아도 소용없지만요.)"
        : "제6 반물질 차원을 구매하세요.";
    },
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 17,
    name: "운과는 무관한 도전 과제",
    description: "제7 반물질 차원을 구매하세요.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 18,
    name: "무한을 향해 90도",
    get description() {
      return Enslaved.isRunning
        ? "제8 반물질 차원을 구매하세요. (익숙해지진 마세요.)"
        : "제8 반물질 차원을 구매하세요.";
    },
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 21,
    name: "무한을 향하여!",
    description: "무한에 도달하세요.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `반물질 ${formatInt(100)}개를 가지고 시작합니다.`; },
    effect: 100
  },
  {
    id: 22,
    name: "가짜 뉴스!",
    get description() { return `서로 다른 뉴스 메시지 ${formatInt(50)}개를 확인하세요.`; },
    checkRequirement: () => NewsHandler.uniqueTickersSeen >= 50,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER
  },
  {
    id: 23,
    name: "제9 차원은 거짓말",
    get description() { return `제8 반물질 차원을 정확히 ${formatInt(99)}개 보유하세요.`; },
    checkRequirement: () => AntimatterDimension(8).amount.eq(99),
    get reward() { return `제8 반물질 차원이 ${formatPercents(0.1)} 더 강해집니다.`; },
    effect: 1.1
  },
  {
    id: 24,
    name: "반물질 아포칼립스",
    get description() { return `반물질을 ${format(DC.E80)}개 넘게 얻으세요.`; },
    checkRequirement: () => Currency.antimatter.exponent >= 80,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 25,
    name: "부스트를 최대로",
    get description() { return `차원 부스트를 ${formatInt(10)}회 구매하세요.`; },
    checkRequirement: () => DimBoost.purchasedBoosts >= 10,
    checkEvent: GAME_EVENT.DIMBOOST_AFTER
  },
  {
    id: 26,
    name: "거대한 벽을 넘어서",
    description: "반물질 은하를 구매하세요.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.GALAXY_RESET_BEFORE
  },
  {
    id: 27,
    name: "이중 은하",
    get description() { return `반물질 은하를 ${formatInt(2)}개 구매하세요.`; },
    checkRequirement: () => player.galaxies >= 2,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER
  },
  {
    id: 28,
    name: "그럴 필요는 없는데…",
    get description() {
      return `제1 반물질 차원을 ${format(DC.E150)}개 넘게 보유한 상태에서 하나만 구매하세요.`;
    },
    checkRequirement: () => AntimatterDimension(1).amount.exponent >= 150,
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `제1 반물질 차원이 ${formatPercents(0.1)} 더 강해집니다.`; },
    effect: 1.1
  },
  {
    id: 31,
    name: "너프하는 걸 깜빡했네",
    get description() { return `아무 반물질 차원의 배율이나 ${formatX(DC.E31)}를 넘기세요.`; },
    checkRequirement: () => AntimatterDimensions.all.some(x => x.multiplier.exponent >= 31),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `제1 반물질 차원이 ${formatPercents(0.05)} 더 강해집니다.`; },
    effect: 1.05
  },
  {
    id: 32,
    name: "신들이 기뻐하신다",
    get description() { return `도전 8 밖에서 차원 희생으로 ${formatX(600)}를 넘는 배율을 얻으세요.`; },
    checkRequirement: () => !NormalChallenge(8).isOnlyActiveChallenge && Sacrifice.totalBoost.gte(600),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_AFTER,
    get reward() {
      return `차원 희생이 더 강해집니다.
      ${Sacrifice.getSacrificeDescription({ "Achievement32": false, "Achievement57": false, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": false, "Achievement88": false })}`;
    },
    effect: 0.1,
  },
  {
    id: 33,
    name: "무한이 정말 많군",
    get description() { return `무한에 ${formatInt(10)}회 도달하세요.`; },
    checkRequirement: () => Currency.infinities.gte(10),
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER
  },
  {
    id: 34,
    name: "어차피 필요 없었어",
    description: "제8 반물질 차원을 하나도 보유하지 않고 무한에 도달하세요.",
    checkRequirement: () => AntimatterDimension(8).totalAmount.eq(0),
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `제1~제7 차원이 ${formatPercents(0.02)} 더 강해집니다.`; },
    effect: 1.02
  },
  {
    id: 35,
    name: "감히 잠들지 마",
    get description() {
      return PlayerProgress.realityUnlocked()
        ? `${formatInt(6)}시간 넘게 오프라인 상태를 유지하세요. (현실 시간)`
        : `${formatInt(6)}시간 넘게 오프라인 상태를 유지하세요.`;
    },
    checkRequirement: () => Date.now() - player.lastUpdate >= 21600000,
    checkEvent: GAME_EVENT.GAME_TICK_BEFORE
  },
  {
    id: 36,
    name: "폐소공포증",
    get description() {
      return `반물질 은하를 ${formatInt(1)}개만 보유한 채 무한에 도달하세요. (무한 도달 시 반물질 은하는 초기화됩니다.)`;
    },
    checkRequirement: () => player.galaxies === 1,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `시작 틱 속도에 ${format(1.02, 2, 2)}를 곱합니다.`; },
    effect: 1 / 1.02
  },
  {
    id: 37,
    name: "정말 빠른데!",
    get description() { return `${formatInt(2)}시간 안에 무한에 도달하세요.`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalHours <= 2,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `반물질 ${formatInt(5000)}개를 가지고 시작합니다.`; },
    effect: 5000
  },
  {
    id: 38,
    name: "나는 신을 믿지 않아",
    get description() {
      return `차원 희생을 하지 않고 반물질 은하를 구매하세요.
        (무한 도달 시 반물질 은하는 초기화됩니다.)`;
    },
    checkRequirement: () => player.requirementChecks.infinity.noSacrifice,
    checkEvent: GAME_EVENT.GALAXY_RESET_BEFORE
  },
  {
    id: 41,
    name: "DLC 필요 없음",
    get description() { return `무한 업그레이드 ${formatInt(16)}개를 구매하세요.`; },
    checkRequirement: () => player.infinityUpgrades.size >= 16,
    checkEvent: [
      GAME_EVENT.INFINITY_UPGRADE_BOUGHT,
      GAME_EVENT.REALITY_RESET_AFTER,
      GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT
    ],
    get reward() {
      return `새 무한 업그레이드 2개를 해금합니다: 무한 포인트 ${formatX(2)} 배율과 오프라인 무한 포인트 생성.`;
    },
  },
  {
    id: 42,
    name: "슈퍼 사닉",
    get description() {
      return `반물질이 ${format(DC.E63)}개를 넘은 상태에서 초당 반물질 생산량이 현재 반물질보다 많아지게 하세요.`;
    },
    checkRequirement: () =>
      Currency.antimatter.exponent >= 63 &&
      Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 43,
    name: "반물질 판세가 뒤집혔군…",
    description:
      "제8 반물질 차원 배율이 가장 높고, 제7 반물질 차원 배율이 두 번째로 높도록 하는 식으로 " +
      "배율 순서를 뒤집으세요.",
    checkRequirement: () => {
      const multipliers = Array.range(1, 8).map(tier => AntimatterDimension(tier).multiplier);
      for (let i = 0; i < multipliers.length - 1; i++) {
        if (multipliers[i].gte(multipliers[i + 1])) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `각 반물질 차원이 단계에 비례한 보너스를 얻습니다.
      (제8 차원은 ${formatPercents(0.08)}, 제7 차원은 ${formatPercents(0.07)} 등)`;
    }
  },
  {
    id: 44,
    name: "30초면 끝",
    get description() {
      return `초당 반물질 생산량이 현재 반물질보다 많은 상태를
      ${formatInt(30)}초 연속 유지하세요.`;
    },
    checkRequirement: () => AchievementTimers.marathon1
      .check(Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value), 30),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
  },
  {
    id: 45,
    name: "감자보다 빠르게",
    get description() { return `초당 틱 수를 ${format(DC.E29)}보다 높이세요.`; },
    checkRequirement: () => Tickspeed.current.exponent <= -26,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `시작 틱 속도에 ${formatX(1.02, 0, 2)}를 곱합니다.`; },
    effect: 0.98
  },
  {
    id: 46,
    name: "다차원",
    get description() { return `제8 차원을 제외한 모든 반물질 차원을 ${format(DC.E12)}개까지 모으세요.`; },
    checkRequirement: () => AntimatterDimension(7).amount.exponent >= 12,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 47,
    name: "겁 없는 도전자",
    get description() { return `일반 도전 ${formatInt(3)}개를 완료하세요.`; },
    checkRequirement: () => NormalChallenges.all.countWhere(c => c.isCompleted) >= 3,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
  },
  {
    id: 48,
    name: "반도전 완료",
    get description() { return `일반 도전 ${formatInt(12)}개를 모두 완료하세요.`; },
    checkRequirement: () => NormalChallenges.all.countWhere(c => !c.isCompleted) === 0,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
    get reward() { return `모든 차원이 ${formatPercents(0.1)} 더 강해집니다.`; },
    effect: 1.1
  },
  {
    id: 51,
    name: "한계 돌파",
    description: "무한을 돌파하세요.",
    checkRequirement: () => player.break,
    checkEvent: [GAME_EVENT.BREAK_INFINITY, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
  },
  {
    id: 52,
    name: "자동화의 시대",
    description: "반물질 차원 및 틱 속도 업그레이드 자동 구매기의 간격을 최대로 강화하세요.",
    checkRequirement: () => Autobuyer.antimatterDimension.zeroIndexed.concat(Autobuyer.tickspeed)
      .every(a => a.isUnlocked && a.hasMaxedInterval),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT]
  },
  {
    id: 53,
    name: "분명 그럴 가치는 없어",
    description: "모든 일반 자동 구매기의 간격을 최대로 강화하세요.",
    // The upgradeable autobuyers are dimensions, tickspeed, dimension boost,
    // galaxy, and big crunch (the ones you get from normal challenges).
    // We don't count autobuyers which can be upgraded via e.g. perks as upgradeable.
    checkRequirement: () => Autobuyers.upgradeable
      .every(a => a.isUnlocked && a.hasMaxedInterval),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT]
  },
  {
    id: 54,
    name: "이건 더 빠르잖아!",
    get description() { return `${formatInt(10)}분 안에 무한에 도달하세요.`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMinutes <= 10,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `반물질 ${format(5e5)}개를 가지고 시작합니다.`; },
    effect: 5e5
  },
  {
    id: 55,
    name: "영원도 그리 길진 않아",
    get description() { return `${formatInt(1)}분 안에 무한에 도달하세요.`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMinutes <= 1,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `반물질 ${format(5e10)}개를 가지고 시작합니다.`; },
    effect: 5e10
  },
  {
    id: 56,
    name: "수많은 죽음",
    get description() {
      return `제2 반물질 차원 자동 구매기 도전을 ${formatInt(3)}분 안에 완료하세요.`;
    },
    checkRequirement: () => NormalChallenge(2).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `각 무한의 첫 ${formatInt(3)}분 동안 모든 반물질 차원이 더 강해집니다.`;
    },
    effect: () => Math.max(6 / (Time.thisInfinity.totalMinutes + 3), 1),
    effectCondition: () => Time.thisInfinity.totalMinutes < 3,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 57,
    name: "신들의 선물",
    get description() {
      return `제8 반물질 차원 자동 구매기 도전을 ${formatInt(3)}분 안에 완료하세요.`;
    },
    checkRequirement: () => NormalChallenge(8).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `차원 희생이 더 강해집니다.
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": false, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": false })}`;
    },
    effect: 0.1
  },
  {
    id: 58,
    name: "괜찮아.",
    get description() { return `틱 속도 자동 구매기 도전을 ${formatInt(3)}분 안에 완료하세요.`; },
    checkRequirement: () => NormalChallenge(9).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `반물질 차원 ${formatInt(10)}개 구매 배율을 +${formatPercents(0.01)}만큼 높입니다.`;
    },
    effect: 1.01
  },
  {
    id: 61,
    name: "일괄 구매 강화 완료",
    get description() {
      return `모든 반물질 차원 자동 구매기의 일괄 구매량을
        ${formatInt(Autobuyer.antimatterDimension.bulkCap)}까지 올리세요.`;
    },
    checkRequirement: () => Autobuyer.antimatterDimension.zeroIndexed.every(x => x.hasMaxedBulk),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT,
      GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION],
    reward: "차원 자동 구매기의 일괄 구매량 제한이 사라집니다."
  },
  {
    id: 62,
    name: "어, 아직도 여기 있었어?",
    get description() { return `분당 무한 포인트 ${format(DC.E8)}에 도달하세요.`; },
    checkRequirement: () => Player.bestRunIPPM.exponent >= 8,
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER
  },
  {
    id: 63,
    name: "새로운 시작",
    description: "무한 동력을 생산하기 시작하세요.",
    checkRequirement: () => Currency.infinityPower.gt(1),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 64,
    name: "사망자 0명",
    description: "일반 도전에서 차원 부스트나 반물질 은하 없이 무한에 도달하세요.",
    checkRequirement: () => player.galaxies === 0 && DimBoost.purchasedBoosts === 0 && NormalChallenge.isRunning,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `제1~4 반물질 차원이 ${formatPercents(0.25)} 강해집니다.`; },
    effect: 1.25
  },
  {
    id: 65,
    name: "별로 어렵지 않은 도전",
    get description() { return `모든 일반 도전의 기록 합계를 ${formatInt(3)}분 미만으로 만드세요.`; },
    checkRequirement: () => Time.challengeSum.totalMinutes < 3,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    get reward() {
      return `도전 중에는 각 무한의 첫 ${formatInt(3)}분 동안 모든 반물질 차원이 강해집니다.`;
    },
    effect: () => (Player.isInAnyChallenge ? Math.max(4 / (Time.thisInfinity.totalMinutes + 1), 1) : 1),
    effectCondition: () => Player.isInAnyChallenge && Time.thisInfinity.totalMinutes < 3,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 66,
    name: "감자의 제곱보다 빠르게",
    get description() { return `초당 틱 수를 ${format(DC.E58)}보다 높이세요.`; },
    checkRequirement: () => Tickspeed.current.exponent <= -55,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `시작 틱 속도에 ${formatX(1.02, 0, 2)}를 곱합니다.`; },
    effect: 0.98
  },
  {
    id: 67,
    name: "무한히 어려운 도전",
    description: "무한 도전을 하나 완료하세요.",
    checkRequirement: () => InfinityChallenges.completed.length > 0,
    checkEvent: [GAME_EVENT.INFINITY_CHALLENGE_COMPLETED, GAME_EVENT.REALITY_RESET_AFTER]
  },
  {
    id: 68,
    name: "도전 과제 때문에 또 한 거지?",
    get description() {
      return `제3 반물질 차원 자동 구매기 도전을 ${formatInt(10)}초 이내에 완료하세요.`;
    },
    checkRequirement: () => NormalChallenge(3).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalSeconds <= 10,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `제1 반물질 차원이 ${formatPercents(0.5)} 강해집니다.`; },
    effect: 1.5
  },
  {
    id: 71,
    name: "오류 909: 차원을 찾을 수 없음",
    description:
      `제2 반물질 차원 자동 구매기 도전에서 차원 부스트나 반물질 은하 없이
      제1 반물질 차원 하나만 보유한 채 무한에 도달하세요.`,
    checkRequirement: () =>
      NormalChallenge(2).isOnlyActiveChallenge &&
      AntimatterDimension(1).amount.eq(1) &&
      DimBoost.purchasedBoosts === 0 &&
      player.galaxies === 0,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `제1 반물질 차원이 ${formatInt(3)}배 강해집니다.`; },
    effect: 3
  },
  {
    id: 72,
    name: "이 많은 무한을 다 담을 수 없어",
    get description() {
      return `모든 반물질 차원 배율을 ${formatX(Decimal.NUMBER_MAX_VALUE, 1)}보다 높이세요.`;
    },
    checkRequirement: () => AntimatterDimensions.all.every(x => x.multiplier.gte(Decimal.NUMBER_MAX_VALUE)),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `모든 반물질 차원이 ${formatPercents(0.1)} 강해집니다.`; },
    effect: 1.1
  },
  {
    id: 73,
    name: "이 도전 과제는 존재하지 않습니다",
    get description() { return `반물질 ${formatPostBreak(DC.D9_9999E9999, 4)}개를 획득하세요.`; },
    checkRequirement: () => Currency.antimatter.gte(DC.D9_9999E9999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "현재 반물질에 따라 반물질 차원에 배율을 적용합니다.",
    effect: () => Currency.antimatter.value.pow(0.00002).plus(1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 74,
    name: "단 1초도 낭비하지 않아",
    get description() { return `모든 일반 도전 최고 기록의 합계를 ${formatInt(5)}초 미만으로 만드세요.`; },
    checkRequirement: () => Time.challengeSum.totalSeconds < 5,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    get reward() { return `도전 중 모든 반물질 차원이 ${formatPercents(0.4)} 강해집니다.`; },
    effect: 1.4,
    effectCondition: () => Player.isInAnyChallenge
  },
  {
    id: 75,
    name: "새로운 차원???",
    description: "제4 무한 차원을 해금하세요.",
    checkRequirement: () => InfinityDimension(4).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "도전 과제 보너스가 무한 차원에도 적용됩니다.",
    effect: () => Achievements.power
  },
  {
    id: 76,
    name: "차원마다 하나씩",
    get description() { return `${formatInt(8)}일 동안 플레이하세요.`; },
    checkRequirement: () => Time.totalTimePlayed.totalDays >= 8,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "플레이 시간에 따라 반물질 차원에 아주 작은 배율을 적용합니다.",
    effect: () => Math.max(Math.pow(Time.totalTimePlayed.totalDays / 2, 0.05), 1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 77,
    name: "100만은 큰 수야",
    get description() { return `무한 동력 ${format(1e6)}에 도달하세요.`; },
    checkRequirement: () => Currency.infinityPower.exponent >= 6,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 78,
    name: "눈 깜짝할 사이",
    get description() { return `${formatInt(250)}ms 이내에 무한에 도달하세요.`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMilliseconds <= 250,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `반물질 ${format(5e25)}개를 보유한 채 시작합니다.`;
    },
    effect: 5e25
  },
  {
    id: 81,
    name: "게임 디자인은 내 열정",
    get description() { return `무한 도전 5를 ${formatInt(15)}초 이내에 완료하세요.`; },
    checkRequirement: () => InfinityChallenge(5).isRunning && Time.thisInfinityRealTime.totalSeconds <= 15,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE
  },
  {
    id: 82,
    name: "반(反)반물질 도전 완료",
    get description() { return `무한 도전 ${formatInt(8)}개를 모두 완료하세요.`; },
    checkRequirement: () => InfinityChallenges.completed.length === 8,
    checkEvent: [GAME_EVENT.INFINITY_CHALLENGE_COMPLETED, GAME_EVENT.REALITY_RESET_AFTER],
  },
  {
    id: 83,
    name: "은하를 50개나 얻을 수 있다고?!?!",
    get description() { return `반물질 은하 ${formatInt(50)}개를 획득하세요.`; },
    checkRequirement: () => player.galaxies >= 50,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    get reward() { return `반물질 은하 하나마다 틱 속도가 ${formatPercents(0.05)}보다 조금 더 빨라집니다.`; },
    effect: () => DC.D0_95.pow(player.galaxies),
    formatEffect: value => `${formatX(value.recip(), 2, 2)}`
  },
  {
    id: 84,
    name: "조금 남아돌아",
    get description() { return `반물질 ${formatPostBreak("1e35000")}개에 도달하세요.`; },
    checkRequirement: () => Currency.antimatter.exponent >= 35000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "사용하지 않은 반물질이 많을수록 반물질 차원이 강해집니다.",
    effect: () => Currency.antimatter.value.pow(0.00002).plus(1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 85,
    name: "너희 IP는 모두 우리의 것이다",
    get description() { return `빅 크런치 한 번으로 무한 포인트 ${format(DC.E150)}를 획득하세요.`; },
    checkRequirement: () => gainedInfinityPoints().exponent >= 150,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `무한 포인트에 추가로 ${formatX(4)} 배율을 적용합니다.`; },
    effect: 4
  },
  {
    id: 86,
    name: "시간을 휘기나 하는 거야?",
    get description() { return `틱 속도 강화 하나당 속도 증가량 ${formatX(1000)}에 도달하세요.`; },
    checkRequirement: () => Tickspeed.multiplier.recip().gte(1000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `모든 은하가 ${formatPercents(0.01)} 강해집니다.`; },
    effect: 1.01
  },
  {
    id: 87,
    name: "무한 200만 번",
    get description() { return `무한을 ${format(DC.D2E6)}번 달성하세요.`; },
    checkRequirement: () => Currency.infinities.gt(DC.D2E6),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `${formatInt(5)}초보다 오래 걸린 무한에서
      무한 횟수를 ${formatX(250)} 더 얻습니다.`;
    },
    effect: 250,
    effectCondition: () => Time.thisInfinity.totalSeconds > 5
  },
  {
    id: 88,
    name: "또 하나의 무한 레퍼런스",
    get description() {
      return `차원 희생 한 번으로 ${formatX(Decimal.NUMBER_MAX_VALUE, 1, 0)} 배율을 획득하세요.`;
    },
    checkRequirement: () => Sacrifice.nextBoost.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_BEFORE,
    get reward() {
      return `차원 희생이 강해집니다.
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": true })}`;
    },
    effect: 0.1
  },
  {
    id: 91,
    name: "터무니없는 속도",
    get description() {
      return `${formatInt(2)}초 이내에 빅 크런치 한 번으로 무한 포인트 ${format(DC.E200)}를 획득하세요.`;
    },
    checkRequirement: () => gainedInfinityPoints().exponent >= 200 && Time.thisInfinityRealTime.totalSeconds <= 2,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `각 무한의 첫 ${formatInt(5)}초 동안 모든 반물질 차원이 크게 강해집니다.`;
    },
    effect: () => Math.max((5 - Time.thisInfinity.totalSeconds) * 60, 1),
    effectCondition: () => Time.thisInfinity.totalSeconds < 5,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 92,
    name: "난 누구 앞에서도 멈추지 않아!",
    get description() {
      return `${formatInt(20)}초 이내에 빅 크런치 한 번으로 무한 포인트 ${format(DC.E250)}를 획득하세요.`;
    },
    checkRequirement: () => gainedInfinityPoints().exponent >= 250 && Time.thisInfinityRealTime.totalSeconds <= 20,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `각 무한의 첫 ${formatInt(60)}초 동안 모든 반물질 차원이 크게 강해집니다.`;
    },
    effect: () => Math.max((1 - Time.thisInfinity.totalMinutes) * 100, 1),
    effectCondition: () => Time.thisInfinity.totalMinutes < 1,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 93,
    name: "최대 출력",
    get description() { return `빅 크런치 한 번으로 무한 포인트 ${format(DC.E300)}를 획득하세요.`; },
    checkRequirement: () => gainedInfinityPoints().exponent >= 300,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `무한 포인트에 추가로 ${formatX(4)} 배율을 적용합니다.`; },
    effect: 4
  },
  {
    id: 94,
    name: "무한의 4.3333분",
    get description() { return `무한 동력 ${format(DC.E260)}에 도달하세요.`; },
    checkRequirement: () => Currency.infinityPower.exponent >= 260,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "무한 동력 획득량이 두 배가 됩니다.",
    effect: 2
  },
  {
    id: 95,
    name: "이거 안전한 거 맞아?",
    get description() { return `${formatInt(1)}시간 안에 복제자 ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)}개를 획득하세요.`; },
    get reward() { return `무한 후에도 복제자와 복제자 은하 ${formatInt(1)}개를 유지합니다.`; },
    checkRequirement: () =>
      (Replicanti.amount.eq(Decimal.NUMBER_MAX_VALUE) || player.replicanti.galaxies > 0) &&
      Time.thisInfinityRealTime.totalHours <= 1,
    checkEvent: GAME_EVENT.REPLICANTI_TICK_AFTER
  },
  {
    id: 96,
    name: "시간은 상대적이다",
    description: "영원에 도달하세요.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 97,
    name: "레고를 밟은 것처럼",
    get description() { return `모든 무한 도전 기록의 합계를 ${format(6.66, 2, 2)}초 미만으로 만드세요.`; },
    checkRequirement: () => Time.infinityChallengeSum.totalSeconds < 6.66,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
  },
  {
    id: 98,
    name: "무한에서 0도",
    description: "제8 무한 차원을 해금하세요.",
    checkRequirement: () => InfinityDimension(8).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 101,
    name: "1~7차원을 살 시간 따윈 없어",
    description: "제1~7 반물질 차원을 구매하지 않고 영원에 도달하세요.",
    checkRequirement: () => player.requirementChecks.eternity.onlyAD8,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 102,
    name: "이 이정표엔 영원이 걸렸어",
    description: "모든 영원 이정표를 획득하세요.",
    checkRequirement: () => EternityMilestone.all.every(m => m.isReached),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 103,
    name: "이 도전 과제는 존재하지 않습니다 II",
    get description() { return `무한 포인트 ${formatPostBreak(DC.D9_99999E999, 5, 0)}에 도달하세요.`; },
    checkRequirement: () => Currency.infinityPoints.exponent >= 1000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `무한 포인트 공식을 개선합니다. log(x)/${formatInt(308)} ➜ log(x)/${formatFloat(307.8, 1)}`;
    },
    effect: 307.8
  },
  {
    id: 104,
    name: "그건 영원이라 하기엔 짧았어",
    get description() { return `${formatInt(30)}초 이내에 영원에 도달하세요.`; },
    checkRequirement: () => Time.thisEternity.totalSeconds <= 30,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() { return `영원을 무한 포인트 ${format(5e25)}와 함께 시작합니다.`; },
    effect: 5e25
  },
  {
    id: 105,
    name: "무한한 시간",
    get description() { return `시간 차원으로 틱 속도 강화 ${formatInt(308)}개를 획득하세요.`; },
    checkRequirement: () => player.totalTickGained >= 308,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "틱 속도에 따라 시간 차원에 배율을 적용합니다.",
    effect: () => Tickspeed.perSecond.pow(0.000005),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 106,
    name: "군집",
    get description() { return `${formatInt(15)}초 안에 복제자 은하 ${formatInt(10)}개를 획득하세요.`; },
    checkRequirement: () => Replicanti.galaxies.total >= 10 && Time.thisInfinity.totalSeconds <= 15,
    checkEvent: GAME_EVENT.REPLICANTI_TICK_AFTER
  },
  {
    id: 107,
    name: "정말 공략이 필요한 거야?",
    get description() { return `무한 횟수 ${formatInt(10)}회 미만으로 영원에 도달하세요.`; },
    checkRequirement: () => Currency.infinities.lt(10),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 108,
    name: "9개쯤은 살 수 있었는데",
    get description() { return `복제자를 정확히 ${formatInt(9)}개 보유한 채 영원에 도달하세요.`; },
    checkRequirement: () => Replicanti.amount.round().eq(9),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 111,
    name: "이봐, 무한을 좋아한다고 들었는데…",
    get description() {
      return `최근 무한 ${formatInt(10)}회에서 매번 직전보다 최소
      ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)}배 많은 무한 포인트를 획득하세요.`;
    },
    checkRequirement: () => {
      if (player.records.recentInfinities.some(i => i[0] === Number.MAX_VALUE)) return false;
      const infinities = player.records.recentInfinities.map(run => run[2]);
      for (let i = 0; i < infinities.length - 1; i++) {
        if (infinities[i].lt(infinities[i + 1].times(Decimal.NUMBER_MAX_VALUE))) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
    reward: "차원 부스트나 반물질 은하를 구매해도 반물질이 초기화되지 않습니다."
  },
  {
    id: 112,
    name: "다시는 안 해",
    get description() { return `모든 무한 도전 기록의 합계를 ${formatInt(750)}ms 미만으로 만드세요.`; },
    checkRequirement: () => Time.infinityChallengeSum.totalMilliseconds < 750,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER]
  },
  {
    id: 113,
    name: "이제 영원이 새로운 무한",
    get description() { return `${formatInt(250)}ms 이내에 영원에 도달하세요.`; },
    checkRequirement: () => Time.thisEternity.totalMilliseconds <= 250,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() { return `영원 횟수를 ${formatX(2)} 더 얻습니다.`; },
    effect: 2,
  },
  {
    id: 114,
    name: "넌 실수야",
    description: "영원 도전에 실패하세요.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.CHALLENGE_FAILED,
    reward: "희미해지는 성취감.",
    effect: () => "성취감 (희미해지는 중)"
  },
  {
    id: 115,
    name: "영원을 7번 했더라면",
    description: "영원 도전 안에서 무한 도전을 시작하세요.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 116,
    name: "정말 무한을 해야 하나",
    get description() { return `무한을 단 ${formatInt(1)}번만 달성하고 영원에 도달하세요.`; },
    checkRequirement: () => Currency.infinities.lte(1),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    reward: "무한 횟수에 따라 무한 포인트에 배율을 적용합니다.",
    effect: () => Decimal.pow(Currency.infinitiesTotal.value.clampMin(1), LOG10_2 / 4).powEffectOf(TimeStudy(31)),
    cap: () => Effarig.eternityCap,
    formatEffect: value => {
      // Since TS31 is already accounted for in the effect prop, we need to "undo" it to display the base value here
      const mult = formatX(value, 2, 2);
      return TimeStudy(31).canBeApplied
        ? `${formatX(value.pow(1 / TimeStudy(31).effectValue), 2, 1)} (시간 연구 31 적용 후: ${mult})`
        : mult;
    }
  },
  {
    id: 117,
    name: "이젠 코스트코에서 차원 부스트도 팔아!",
    get description() { return `차원 부스트 ${formatInt(750)}개를 한 번에 구매하세요.`; },
    checkRequirement: ([bulk]) => bulk >= 750,
    checkEvent: GAME_EVENT.DIMBOOST_AFTER,
    get reward() {
      return `차원 부스트가 반물질 차원에 주는 배율이 ${formatPercents(0.01)} 높아집니다.`;
    },
    effect: 1.01
  },
  {
    id: 118,
    name: "9000을 넘었어",
    get description() { return `총 차원 희생 배율 ${formatPostBreak(DC.E9000)}에 도달하세요.`; },
    checkRequirement: () => Sacrifice.totalBoost.exponent >= 9000,
    checkEvent: GAME_EVENT.SACRIFICE_RESET_AFTER,
    reward: `차원 희생 시 반물질 차원이 초기화되지 않으며,
      희생 자동 구매기를 켜면 매 틱 작동합니다.`,
  },
  {
    id: 121,
    name: "무한한 IP를 얻을 수 있을까?",
    get description() { return `무한 포인트 ${formatPostBreak("1e30008")}에 도달하세요.`; },
    checkRequirement: () => Currency.infinityPoints.exponent >= 30008,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 122,
    name: "넌 이미 죽어 있다.",
    description: "제2~8 반물질 차원을 구매하지 않고 영원에 도달하세요.",
    checkRequirement: () => player.requirementChecks.eternity.onlyAD1,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 123,
    name: "업데이트까지 영원 5번 더",
    get description() { return `서로 다른 영원 도전 단계 ${formatInt(50)}개를 완료하세요.`; },
    checkRequirement: () => EternityChallenges.completions >= 50,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER
  },
  {
    id: 124,
    name: "오래가는 관계",
    get description() {
      return `한 번의 무한에서 초당 무한 동력이 현재 무한 동력보다 높은 상태를
      ${formatInt(60)}초 연속 유지하세요.`;
    },
    checkRequirement: () => AchievementTimers.marathon2
      .check(
        !EternityChallenge(7).isRunning &&
        InfinityDimension(1).productionPerSecond.gt(Currency.infinityPower.value),
        60
      ),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 125,
    name: "뒷고기를 실컷 먹은 것처럼",
    get description() {
      return `이번 영원에서 무한 횟수와 제1 반물질 차원이 하나도 없는 상태로
      무한 포인트 ${format(DC.E90)}에 도달하세요.`;
    },
    checkRequirement: () => Currency.infinityPoints.exponent >= 90 &&
      player.requirementChecks.eternity.noAD1 && Currency.infinities.eq(0),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "이번 무한에서 보낸 시간에 따라 무한 포인트에 배율을 적용합니다.",
    effect() {
      const thisInfinity = Time.thisInfinity.totalSeconds * 10 + 1;
      return DC.D2.pow(Math.log(thisInfinity) * Math.min(Math.pow(thisInfinity, 0.11), 500));
    },
    cap: () => Effarig.eternityCap,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 126,
    name: "대중음악",
    get description() { return `복제자 은하를 반물질 은하보다 ${formatInt(180)}배 많이 보유하세요.`; },
    checkRequirement: () => Replicanti.galaxies.total >= 180 * player.galaxies && player.galaxies > 0,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `복제자 은하를 구매할 때 복제자가 ${formatInt(1)}개로 초기화되는 대신
      ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)}로 나뉩니다.`;
    },
  },
  {
    id: 127,
    name: "난 또 다른 프레스티지 단계를 원했는데…",
    get description() { return `영원 포인트 ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)}에 도달하세요.`; },
    checkRequirement: () => Currency.eternityPoints.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 128,
    name: "널 없애려면 뭘 해야 하는 거야",
    get description() { return `시간 연구 없이 무한 포인트 ${formatPostBreak("1e22000")}에 도달하세요.`; },
    checkRequirement: () => Currency.infinityPoints.exponent >= 22000 && player.timestudy.studies.length === 0,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "보유한 시간 연구 수만큼 시간 차원에 배율을 적용합니다.",
    effect: () => Math.max(player.timestudy.studies.length, 1),
    formatEffect: value => `${formatX(value)}`
  },
  {
    id: 131,
    name: "윤리적인 소비란 없다",
    get description() { return `저축된 무한 ${format(DC.D2E9)}회를 획득하세요.`; },
    checkRequirement: () => Currency.infinitiesBanked.gt(DC.D2E9),
    checkEvent: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION],
    get reward() {
      return `무한 횟수를 ${formatX(2)} 더 얻고, 영원 후 무한 횟수의
      ${formatPercents(0.05)}를 저축된 무한으로 영구 보존합니다.`;
    },
    effects: {
      infinitiesGain: 2,
      bankedInfinitiesGain: () => Currency.infinities.value.times(0.05).floor()
    }

  },
  {
    id: 132,
    name: "특별한 눈송이들",
    get description() {
      return `이번 영원에서 복제자 은하를 하나도 얻지 않고
        반물질 은하 ${formatInt(569)}개를 보유하세요.`;
    },
    checkRequirement: () => player.galaxies >= 569 && player.requirementChecks.eternity.noRG,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    reward: "반물질 은하에 따라 타키온 입자와 팽창한 시간 획득량에 배율을 적용합니다.",
    effect: () => 1.22 * Math.max(Math.pow(player.galaxies, 0.04), 1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 133,
    name: "어차피 이 무한이란 건 마음에 안 들었어",
    get description() {
      return `무한 차원이나 무한 포인트 ${formatX(2)} 강화를 구매하지 않고
      무한 포인트 ${formatPostBreak(DC.E200000)}에 도달하세요.`;
    },
    checkRequirement: () =>
      Array.dimensionTiers.map(InfinityDimension).every(dim => dim.baseAmount === 0) &&
      player.IPMultPurchases === 0 &&
      Currency.infinityPoints.exponent >= 200000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "모든 무한 도전이 해금 및 완료된 상태로 영원을 시작합니다."
  },
  {
    id: 134,
    name: "언제쯤이면 충분할까?",
    get description() { return `복제자 ${formatPostBreak(DC.E18000)}개에 도달하세요.`; },
    checkRequirement: () => Replicanti.amount.exponent >= 18000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `복제자가 ${format(replicantiCap(), 1)}개 미만일 때 ${formatInt(2)}배 빠르게 증가합니다.`;
    }
  },
  {
    id: 135,
    name: "감자^286078보다 빠르게",
    get description() { return `초당 틱 수를 ${formatPostBreak("1e8296262")}보다 높이세요.`; },
    checkRequirement: () => Tickspeed.current.exponent <= -8296262,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 136,
    name: "말했잖아, 시간은 상대적이라고",
    description: "시간을 팽창시키세요.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 137,
    name: "이제 팽창으로 생각하는군!",
    get description() {
      return `시간이 팽창한 상태에서 ${formatInt(1)}분 이내에
      반물질 ${formatPostBreak("1e260000")}개를 획득하세요.`;
    },
    checkRequirement: () =>
      Currency.antimatter.exponent >= 260000 &&
      Time.thisEternity.totalMinutes <= 1 &&
      player.dilation.active,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `시간 팽창 중 팽창한 시간과 시간 정리를 ${formatX(2)} 더 얻습니다.`; },
    effect: () => (player.dilation.active ? 2 : 1),
  },
  {
    id: 138,
    name: "널 없애려면 이걸 해야 하는군.",
    get description() {
      return `시간이 팽창한 상태에서 시간 연구 없이 무한 포인트 ${formatPostBreak("1e26000")}에 도달하세요.`;
    },
    checkRequirement: () =>
      player.timestudy.studies.length === 0 &&
      player.dilation.active &&
      Currency.infinityPoints.exponent >= 26000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "활성 및 방치 시간 연구 경로의 시간 연구 131과 133에서 불리한 효과를 제거합니다."
  },
  {
    id: 141,
    name: "Snap back to reality",
    description: "Make a new Reality.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() {
      return `${formatX(4)} Infinity Point gain, and increase the multiplier for buying ${formatInt(10)}
      Antimatter Dimensions by +${format(0.1, 0, 1)}.`;
    },
    effects: {
      ipGain: 4,
      buyTenMult: 0.1
    }
  },
  {
    id: 142,
    name: "How does this work?",
    description: "Unlock the automator.",
    checkRequirement: () => Player.automatorUnlocked,
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_BOUGHT, GAME_EVENT.PERK_BOUGHT,
      GAME_EVENT.BLACK_HOLE_UNLOCKED],
    get reward() { return `Dimension Boosts are ${formatPercents(0.5)} stronger.`; },
    effect: 1.5,
  },
  {
    id: 143,
    name: "Yo dawg, I heard you liked reskins...",
    get description() {
      return `Have all your Eternities in your past ${formatInt(10)} Eternities be at least
      ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} times higher Eternity Points than the previous one.`;
    },
    checkRequirement: () => {
      if (player.records.recentEternities.some(i => i[0] === Number.MAX_VALUE)) return false;
      const eternities = player.records.recentEternities.map(run => run[2]);
      for (let i = 0; i < eternities.length - 1; i++) {
        if (eternities[i].lt(eternities[i + 1].times(Decimal.NUMBER_MAX_VALUE))) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    reward: "Galaxies no longer reset Dimension Boosts."
  },
  {
    id: 144,
    name: "Is this an Interstellar reference?",
    description: "Unlock the Black Hole.",
    checkRequirement: () => BlackHole(1).isUnlocked,
    checkEvent: GAME_EVENT.BLACK_HOLE_UNLOCKED,
  },
  {
    id: 145,
    name: "Are you sure these are the right way around?",
    description: "Have either Black Hole interval smaller than its duration.",
    checkRequirement: () => BlackHoles.list.some(bh => bh.interval < bh.duration),
    checkEvent: GAME_EVENT.BLACK_HOLE_UPGRADE_BOUGHT,
    get reward() { return `Black Hole intervals are ${formatPercents(0.1)} shorter.`; },
    effect: 0.9
  },
  {
    id: 146,
    name: "Perks of living",
    description: "Have all Perks bought.",
    checkRequirement: () => player.reality.perks.size === Perks.all.length,
    checkEvent: GAME_EVENT.PERK_BOUGHT,
    get reward() { return `+${formatPercents(0.01)} Glyph rarity.`; },
    effect: 1
  },
  {
    id: 147,
    name: "Master of Reality",
    description: "Have all Reality upgrades bought.",
    checkRequirement: () => RealityUpgrades.allBought,
    checkEvent: GAME_EVENT.REALITY_UPGRADE_BOUGHT,
    reward: "Unlock Teresa, the Celestial of Reality."
  },
  {
    id: 148,
    name: "Royal flush",
    description: "Reality with one of each basic Glyph type.",
    checkRequirement: () => BASIC_GLYPH_TYPES
      .every(type => Glyphs.activeList.some(g => g.type === type)),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    reward: "Gained Glyph level is increased by number of distinct Glyph types equipped.",
    effect: () => (new Set(Glyphs.activeWithoutCompanion.map(g => g.type))).size,
    formatEffect: value => `+${formatInt(value)}`
  },
  {
    id: 151,
    name: "You really didn't need it anyway",
    get description() {
      return `Get ${formatInt(800)} Antimatter Galaxies without
      buying 8th Antimatter Dimensions in your current Infinity.`;
    },
    checkRequirement: () => player.galaxies >= 800 && player.requirementChecks.infinity.noAD8,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    reward: "Unlock V, the Celestial of Achievements."
  },
  {
    id: 152,
    name: "Y'all got any more of them Glyphs?",
    get description() { return `Have ${formatInt(100)} Glyphs in your inventory.`; },
    checkRequirement: () => Glyphs.inventoryList.length >= 100,
    checkEvent: GAME_EVENT.GLYPHS_CHANGED
  },
  {
    id: 153,
    name: "More like \"reallydoesn'tmatter\"",
    description: "Reality without producing antimatter.",
    checkRequirement: () => player.requirementChecks.reality.noAM,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
  },
  {
    id: 154,
    name: "I am speed",
    get description() { return `Reality in under ${formatInt(5)} seconds (game time).`; },
    checkRequirement: () => Time.thisReality.totalSeconds <= 5,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return `${formatPercents(0.1)} chance each Reality of ${formatX(2)} Realities and Perk Points.`; },
    effect: 0.1
  },
  {
    id: 155,
    name: "Achievement #15983",
    get description() { return `Play for ${formatFloat(13.7, 1)} billion years.`; },
    checkRequirement: () => Time.totalTimePlayed.totalYears > 13.7e9,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `Black Hole durations are ${formatPercents(0.1)} longer.`; },
    effect: 1.1
  },
  {
    id: 156,
    name: "College Dropout",
    description: "Reality without buying Time Theorems.",
    checkRequirement: () => player.requirementChecks.reality.noPurchasedTT,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return `Gain ${formatX(2.5, 0, 1)} generated Time Theorems, and a free coupon to McDonalds™️.`; },
    effect: 2.5
  },
  {
    id: 157,
    name: "It's super effective!",
    get description() { return `Get a Glyph with ${formatInt(4)} effects.`; },
    checkRequirement: () => Glyphs.activeList.concat(Glyphs.inventoryList).map(
      glyph => getGlyphEffectsFromBitmask(glyph.effects, 0, 0)
        .filter(effect => effect.isGenerated).length
    ).max() >= 4,
    checkEvent: GAME_EVENT.GLYPHS_CHANGED
  },
  {
    id: 158,
    name: "Bruh, are you like, inside the hole?",
    description: "Make both Black Holes permanent.",
    checkRequirement: () => BlackHole(1).isPermanent && BlackHole(2).isPermanent,
    checkEvent: GAME_EVENT.BLACK_HOLE_UPGRADE_BOUGHT,
    get reward() { return `Black Hole power increased by ${formatPercents(0.1)}.`; },
    effect: 1.1
  },
  {
    id: 161,
    name: "that's where you're wrong kiddo",
    get description() { return `Get ${formatPostBreak(DC.E1E8)} antimatter while Dilated.`; },
    checkRequirement: () => Currency.antimatter.exponent >= 100000000 && player.dilation.active,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 162,
    name: "Reinstalled the game and rejoined the server",
    description: "Have every Time Study at once.",
    checkRequirement: () => player.timestudy.studies.length >= 58,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 163,
    name: "Actually, super easy! Barely an inconvenience!",
    get description() {
      return `Complete all the Eternity Challenges ${formatInt(5)} times with less than ${formatInt(1)}
      second (game time) in your current Reality.`;
    },
    checkRequirement: () => EternityChallenges.all.map(ec => ec.completions).min() >= 5 &&
      Time.thisReality.totalSeconds <= 1,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 164,
    name: "Infinity times two",
    get description() { return `Get ${format(Decimal.NUMBER_MAX_VALUE, 1)} Infinities.`; },
    checkRequirement: () => Currency.infinitiesTotal.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `Gain ×${formatInt(1024)} more Infinities.`; },
    effect: 1024
  },
  {
    id: 165,
    name: "Perfectly balanced",
    get description() { return `Get a level ${formatInt(5000)} Glyph with all Glyph level factors equally weighted.`; },
    checkRequirement: () => gainedGlyphLevel().actualLevel >= 5000 &&
      ["repl", "dt", "eternities"].every(
        i => player.celestials.effarig.glyphWeights[i] === player.celestials.effarig.glyphWeights.ep),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    reward: "Unlock optimal automatic Glyph level factor adjustment."
  },
  {
    id: 166,
    name: "Nicenice.",
    get description() { return `Get a Glyph with level exactly ${formatInt(6969)}.`; },
    checkRequirement: () => gainedGlyphLevel().actualLevel === 6969,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return `+${formatInt(69)} to Glyph level.`; },
    effect: 69
  },
  {
    id: 167,
    name: "Mr. Layer? Sorry, you're not on the list",
    get description() { return `Reach ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} Reality Machines.`; },
    checkRequirement: () => Currency.realityMachines.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "Gain more Reality Machines based on your current Reality Machines.",
    effect: () => Math.clampMin(1, Currency.realityMachines.value.log2()),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 168,
    name: "Woah, we're halfway there",
    get description() { return `Get ${formatInt(50)} total Ra Celestial Memory levels.`; },
    checkRequirement: () => Ra.totalPetLevel >= 50,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `Get ${formatPercents(0.1)} more memories.`; },
    effect: 1.1
  },
  {
    id: 171,
    name: "The god is delighted",
    description: "Sacrifice every sacrificable Glyph type at least once.",
    checkRequirement: () => Object.values(player.reality.glyphs.sac).every(s => s > 0),
    checkEvent: GAME_EVENT.GLYPHS_CHANGED,
    get reward() { return `Glyph sacrifice is ${formatX(2)} stronger.`; },
    effect: 2,
  },
  {
    id: 172,
    name: "Hitchhiker's Guide to Reality",
    get description() {
      return `Reality for ${format(Decimal.NUMBER_MAX_VALUE, 1)} Reality Machines without having
      any Charged Infinity Upgrades, having any equipped Glyphs, or buying any Triad Studies.`;
    },
    checkRequirement: () => MachineHandler.gainedRealityMachines.gte(Decimal.NUMBER_MAX_VALUE) &&
      player.celestials.ra.charged.size === 0 && Glyphs.activeWithoutCompanion.length === 0 &&
      player.requirementChecks.reality.noTriads,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
  },
  {
    id: 173,
    name: "Cet accomplissement n'existe pas III",
    get description() { return `Reach ${formatPostBreak(DC.D9_99999E999, 5, 0)} Reality Machines.`; },
    checkRequirement: () => player.reality.realityMachines.gte(DC.D9_99999E999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 174,
    name: "Don't you already have two of these?",
    description: "Get a Singularity.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.SINGULARITY_RESET_BEFORE
  },
  {
    id: 175,
    name: "The First Antihistorian",
    get description() { return `Get ${formatInt(Ra.alchemyResourceCap)} of all Alchemy Resources.`; },
    checkRequirement: () => AlchemyResources.all.every(x => x.amount >= Ra.alchemyResourceCap),
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    get reward() {
      return `Synergism can go above ${formatPercents(1)} and Momentum increases ${formatX(10)} faster.`;
    },
    effect: 10,
  },
  {
    id: 176,
    name: "Mom counted to 3",
    description: "Annihilate your Dark Matter Dimensions.",
  },
  {
    id: 177,
    name: "This mile took a celestial",
    description: "Complete all Singularity Milestones at least once.",
    checkRequirement: () => SingularityMilestones.all.every(x => x.completions > 0),
    checkEvent: GAME_EVENT.SINGULARITY_RESET_AFTER,
  },
  {
    id: 178,
    name: "Destroyer of Worlds",
    get description() { return `Get ${formatInt(100000)} Antimatter Galaxies.`; },
    checkRequirement: () => player.galaxies >= 100000,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    get reward() { return `All Galaxies are ${formatPercents(0.01)} stronger.`; },
    effect: 1.01
  },
  {
    id: 181,
    displayId: 666,
    name: "Antimatter Dimensions Eternal",
    description: "Doom your Reality.",
    checkRequirement: () => Pelle.isDoomed,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
  },
  {
    id: 182,
    name: "One more time",
    description: "Permanently gain back all Antimatter Dimension autobuyers.",
    checkRequirement: () => PelleUpgrade.antimatterDimAutobuyers1.canBeApplied &&
      PelleUpgrade.antimatterDimAutobuyers2.canBeApplied,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 183,
    name: "Déjà vOoM",
    description: "Complete Infinity Challenge 5 while Doomed.",
    checkRequirement: () => Pelle.isDoomed && InfinityChallenge(5).isCompleted,
    checkEvent: GAME_EVENT.INFINITY_CHALLENGE_COMPLETED,
    // Weirdly specific reward? Yes, its V's ST bonus because we forgot to disable it
    // when balancing Pelle and only realised too late.
    get reward() { return `All Antimatter Dimensions are raised to ${formatPow(1.0812403840463596, 0, 3)}`; },
    effect: 1.0812403840463596
  },
  {
    id: 184,
    name: "You're out!",
    description: "Encounter the third Pelle Strike.",
    checkRequirement: () => PelleStrikes.eternity.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED
  },
  {
    id: 185,
    name: "Four score and seven years ago",
    description: "Encounter the fourth Pelle Strike.",
    checkRequirement: () => PelleStrikes.ECs.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED
  },
  {
    id: 186,
    displayId: 181,
    name: "An unhealthy obsession",
    description: `Purchase Time Study 181 while Doomed.`,
  },
  {
    id: 187,
    name: "The One with Dilated Time",
    description: "Unlock Dilation while Doomed.",
    checkRequirement: () => PelleStrikes.dilation.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED,
    // We forgot to disable a singularity milestone while balancing Pelle; now it's disabled
    // and this upgrade has the same effect as it used to.
    get reward() {
      return `Increase the multiplier per repeatable Dilated Time
      multiplier upgrade by ${formatX(1.35, 0, 2)}.`;
    },
    effect: 1.35
  },
  {
    id: 188,
    name: "The End",
    description: "Beat the game.",
    checkRequirement: () => GameEnd.endState > END_STATE_MARKERS.GAME_END && !GameEnd.removeAdditionalEnd,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
];
