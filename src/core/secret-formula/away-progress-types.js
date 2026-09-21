export const awayProgressTypes = [
  {
    name: "antimatter",
    displayName: "반물질",
    isUnlocked: () => true,
  }, {
    name: "dimensionBoosts",
    displayName: "차원 가속",
    isUnlocked: () => true,
  }, {
    name: "antimatterGalaxies",
    displayName: "반물질 은하",
    reference: ["galaxies"],
    isUnlocked: () => true,
  }, {
    name: "infinities",
    displayName: "무한 횟수",
    isUnlocked: () => PlayerProgress.infinityUnlocked(),
  }, {
    name: "infinityPoints",
    displayName: "무한 포인트",
    isUnlocked: () => PlayerProgress.infinityUnlocked(),
  }, {
    name: "replicanti",
    displayName: "복제자",
    reference: ["replicanti", "amount"],
    isUnlocked: () => PlayerProgress.replicantiUnlocked() || PlayerProgress.eternityUnlocked(),
  }, {
    name: "replicantiGalaxies",
    displayName: "복제자 은하",
    reference: ["replicanti", "galaxies"],
    isUnlocked: () => PlayerProgress.replicantiUnlocked() || PlayerProgress.eternityUnlocked(),
  }, {
    name: "eternities",
    displayName: "영원 횟수",
    isUnlocked: () => PlayerProgress.eternityUnlocked(),
  }, {
    name: "eternityPoints",
    displayName: "영원 포인트",
    isUnlocked: () => PlayerProgress.eternityUnlocked(),
  }, {
    name: "tachyonParticles",
    displayName: "타키온 입자",
    reference: ["dilation", "tachyonParticles"],
    isUnlocked: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
  }, {
    name: "dilatedTime",
    displayName: "팽창된 시간",
    reference: ["dilation", "dilatedTime"],
    isUnlocked: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
  }, {
    name: "timeTheorems",
    displayName: "시간 정리",
    reference: ["timestudy", "theorem"],
    isUnlocked: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
  }, {
    name: "tachyonGalaxies",
    displayName: "타키온 은하",
    reference: ["dilation", "totalTachyonGalaxies"],
    isUnlocked: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
  }, {
    name: "achievementAmount",
    displayName: "도전과제 수",
    reference: ["achievementBits"],
    applyFn: x => x.map(b => countValuesFromBitmask(b)).sum(),
    isUnlocked: () => PlayerProgress.realityUnlocked(),
  }, {
    name: "realities",
    displayName: "현실 횟수",
    isUnlocked: () => PlayerProgress.realityUnlocked(),
  }, {
    name: "realityMachines",
    displayName: "리얼리티 머신",
    reference: ["reality", "realityMachines"],
    isUnlocked: () => PlayerProgress.realityUnlocked(),
  }, {
    name: "blackHole",
    displayName: "블랙홀",
    isUnlocked: () => BlackHole(1).isUnlocked,
    // Functions as the visible option for both first & second BHs, never appears due to having no reference.
    appearsInAwayModal: false,
  }, {
    name: "firstBlackHole",
    displayName: "첫 번째 블랙홀",
    awayOption: "blackHole",
    reference: ["blackHole", "0", "activations"],
    isUnlocked: () => BlackHole(1).isUnlocked,
    classObjectReference: "black-hole",
    showOption: false,
  }, {
    name: "secondBlackHole",
    displayName: "두 번째 블랙홀",
    awayOption: "blackHole",
    reference: ["blackHole", "1", "activations"],
    isUnlocked: () => BlackHole(2).isUnlocked,
    classObjectReference: "black-hole",
    showOption: false,
  }, {
    name: "relicShards",
    displayName: "유물 파편",
    reference: ["celestials", "effarig", "relicShards"],
    isUnlocked: () => TeresaUnlocks.effarig.canBeApplied,
  }, {
    name: "celestialMemories",
    displayName: "셀레스티얼 기억",
    isUnlocked: () => VUnlocks.raUnlock.isUnlocked,
    // Functions as the visible option for all Memories, never appears due to having no reference.
    appearsInAwayModal: false,
  }, {
    name: "teresaMemories",
    displayName: "테레사의 기억",
    awayOption: "celestialMemories",
    reference: ["celestials", "ra", "pets", "teresa", "memories"],
    isUnlocked: () => Ra.pets.teresa.isUnlocked && !Ra.pets.teresa.isCapped,
    showOption: false,
  }, {
    name: "effarigMemories",
    displayName: "에파리그의 기억",
    awayOption: "celestialMemories",
    reference: ["celestials", "ra", "pets", "effarig", "memories"],
    isUnlocked: () => Ra.pets.effarig.isUnlocked && !Ra.pets.effarig.isCapped,
    showOption: false,
  }, {
    name: "enslavedMemories",
    forcedName: "이름 없는 자들의 기억",
    awayOption: "celestialMemories",
    reference: ["celestials", "ra", "pets", "enslaved", "memories"],
    isUnlocked: () => Ra.pets.enslaved.isUnlocked && !Ra.pets.enslaved.isCapped,
    showOption: false,
  }, {
    name: "vMemories",
    displayName: "V의 기억",
    awayOption: "celestialMemories",
    reference: ["celestials", "ra", "pets", "v", "memories"],
    isUnlocked: () => Ra.pets.v.isUnlocked && !Ra.pets.v.isCapped,
    showOption: false,
  }, {
    name: "imaginaryMachines",
    displayName: "허수 머신",
    reference: ["reality", "imaginaryMachines"],
    isUnlocked: () => MachineHandler.isIMUnlocked,
  }, {
    name: "darkMatter",
    displayName: "암흑 물질",
    reference: ["celestials", "laitela", "darkMatter"],
    isUnlocked: () => Laitela.isUnlocked,
  }, {
    name: "darkEnergy",
    displayName: "암흑 에너지",
    reference: ["celestials", "laitela", "darkEnergy"],
    isUnlocked: () => Laitela.isUnlocked,
  }, {
    name: "singularities",
    displayName: "특이점",
    reference: ["celestials", "laitela", "singularities"],
    isUnlocked: () => Laitela.isUnlocked,
  }, {
    name: "realityShards",
    displayName: "현실 파편",
    reference: ["celestials", "pelle", "realityShards"],
    isUnlocked: () => Pelle.isDoomed,
  },
];
