export const eternityMilestones = {
  autobuyerIPMult: {
    eternities: 1,
    reward: "무한 포인트 배율 자동 구매기 해금",
    pelleUseless: true
  },
  keepAutobuyers: {
    eternities: 2,
    reward: "모든 일반 도전 완료, 모든 일반 자동 구매기 및 무한 돌파 상태로 영원 시작"
  },
  autobuyerReplicantiGalaxy: {
    eternities: 3,
    reward: "복제자 은하 자동 구매기 해금"
  },
  keepInfinityUpgrades: {
    eternities: 4,
    reward: "모든 무한 업그레이드를 보유한 상태로 영원 시작",
    givenByPelle: () => PelleUpgrade.keepInfinityUpgrades.isBought,
    pelleUseless: true
  },
  bigCrunchModes: {
    eternities: 5,
    reward: "빅 크런치 자동 구매기 옵션 추가 해금"
  },
  autoEP: {
    eternities: 6,
    reward: () => {
      const EPmin = getOfflineEPGain(TimeSpan.fromMinutes(1).totalMilliseconds);
      const em200 = getEternitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        EternityMilestone.autoEternities.isReached).gt(0);
      const em1000 = getInfinitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        EternityMilestone.autoInfinities.isReached).gt(0);
      if (!player.options.offlineProgress) return `오프라인 EP 생산 이정표가지만
        현재 오프라인 진행이 비활성화되어 있습니다`;
      const effectText = (em200 || em1000) ? "비활성" : `현재 ${format(EPmin, 2, 2)} EP/분`;
      return `오프라인일 때 이전 영원의 최고 영원 포인트/분 중
        ${formatPercents(0.25)} 획득 (${effectText})`;
    },
    activeCondition: () => (player.options.offlineProgress
      ? `다른 오프라인 이정표(${formatInt(200)}회 또는 ${formatInt(1000)}회)이
        모두 비활성 상태일 때 활성화`
      : ""),
  },
  autoIC: {
    eternities: 7,
    reward: `무한 도전을 해금하는 즉시 완료하며
      차원 희생 자동 구매기 유지`,
    pelleUseless: true
  },
  keepBreakUpgrades: {
    eternities: 8,
    reward: "모든 무한 돌파 업그레이드를 보유한 상태로 영원 시작",
    givenByPelle: () => PelleUpgrade.keepBreakInfinityUpgrades.isBought,
    pelleUseless: true
  },
  autobuyMaxGalaxies: {
    eternities: 9,
    reward: "반물질 은하 자동 구매기의 최대 구매 모드 해금"
  },
  unlockReplicanti: {
    eternities: 10,
    reward: "복제자가 해금된 상태로 시작",
    givenByPelle: () => PelleUpgrade.replicantiStayUnlocked.isBought,
    pelleUseless: true
  },
  autobuyerID1: {
    eternities: 11,
    reward: "1차 무한 차원 자동 구매기 해금",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID2: {
    eternities: 12,
    reward: "2차 무한 차원 자동 구매기 해금",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID3: {
    eternities: 13,
    reward: "3차 무한 차원 자동 구매기 해금",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID4: {
    eternities: 14,
    reward: "4차 무한 차원 자동 구매기 해금",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID5: {
    eternities: 15,
    reward: "5차 무한 차원 자동 구매기 해금",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID6: {
    eternities: 16,
    reward: "6차 무한 차원 자동 구매기 해금",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID7: {
    eternities: 17,
    reward: "7차 무한 차원 자동 구매기 해금",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID8: {
    eternities: 18,
    reward: "8차 무한 차원 자동 구매기 해금",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autoUnlockID: {
    eternities: 25,
    reward: "조건에 도달하면 무한 차원 자동 해금"
  },
  unlockAllND: {
    eternities: 30,
    reward: "모든 반물질 차원을 구매 가능한 상태로 시작"
  },
  replicantiNoReset: {
    eternities: 40,
    reward: `복제자 은하가 반물질, 반물질 차원, 틱스피드,
      차원 희생 및 차원 가속을 더 이상 초기화하지 않음`,
    pelleUseless: true
  },
  autobuyerReplicantiChance: {
    eternities: 50,
    reward: "복제자 확률 업그레이드 자동 구매기 해금",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerReplicantiInterval: {
    eternities: 60,
    reward: "복제자 간격 업그레이드 자동 구매기 해금",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerReplicantiMaxGalaxies: {
    eternities: 80,
    reward: "복제자 은하 최대치 업그레이드 자동 구매기 해금",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerEternity: {
    eternities: 100,
    reward: "영원 자동 구매기 해금"
  },
  autoEternities: {
    eternities: 200,
    reward: () => {
      if (!player.options.offlineProgress) return `오프라인에서 영원 횟수를 생산하는 이정표가지만
        현재 오프라인 진행이 비활성화되어 있습니다`;
      const eternities = getEternitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        player.eternities.gte(200));
      // As far as I can tell, using templates here as Codefactor wants would lead to nested templates,
      // which seems messy to say the least.
      const realTime = PlayerProgress.seenAlteredSpeed() ? " 현실 시간 기준" : "";
      // eslint-disable-next-line prefer-template
      return `오프라인일 때 가장 빠른${realTime} 영원 속도의 ${formatPercents(0.5)}만큼 영원 횟수 획득 ` +
        (eternities.gt(0) ? `(현재 ${format(eternities, 2, 2)}회/시간)` : "(비활성)");
    },
    activeCondition: () => (player.options.offlineProgress
      ? `모든 도전과 시간 팽창 밖에 있어야 하며, 영원 자동 구매기를 EP 0에서 영원 실행으로 설정해야 합니다.
        이 이정표의 효과는 ${formatInt(33)}ms가 상한입니다.`
      : ""),
    pelleUseless: true
  },
  autoInfinities: {
    eternities: 1000,
    reward: () => {
      if (!player.options.offlineProgress) return `오프라인에서 무한 횟수를 생산하는 이정표가지만
        현재 오프라인 진행이 비활성화되어 있습니다`;
      const infinities = getInfinitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        player.eternities.gte(1000));
      // eslint-disable-next-line prefer-template
      return `오프라인일 때 이번 영원의 최고 무한/시간 중 ${formatPercents(0.5)}만큼 무한 횟수 획득 ` +
        (infinities.gt(0) ? `(현재 ${format(infinities, 2, 2)}회/시간)` : "(비활성)");
    },
    activeCondition: () => (player.options.offlineProgress
      ? `일반/무한 도전 및 EC4·EC12 밖에 있어야 하고,
        빅 크런치 자동 구매기를 켜서 ${formatInt(5)}초 이하의 시간 모드로 설정해야 하며,
        영원 자동 구매기는 꺼져 있어야 합니다.`
      : ""),
    pelleUseless: true
  }
};
