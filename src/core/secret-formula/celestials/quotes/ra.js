export const raQuotes = {
  unlock: {
    id: 0,
    lines: [
      "방... 문객?",
      "나 여기 있어! 네가 찾던 사람이야... 아마도...",
      "그런데 내가 뭐였더라?",
      "아 맞다, 기억의 셀레스티얼.",
    ]
  },
  realityEnter: {
    id: 1,
    lines: [
      "다른 이들을 본 지 너무 오래됐어...",
      "그들을 기억할 수 있게 도와줄래?",
      "그 대가로 네게 힘을 줄 수 있어.",
    ]
  },
  teresaStart: {
    id: 2,
    requirement: () => Ra.pets.teresa.level >= 2,
    lines: [
      "테... 레... 사...",
      "기억이 나는 것 같아.",
    ]
  },
  teresaLate: {
    id: 3,
    requirement: () => Ra.pets.teresa.level >= 15,
    lines: [
      "Teresa는 머신을 다뤘던 것 같아.",
      "Teresa의 상점에 몇 번 갔던 기억이 나.",
      "잠깐, 다른 누군가에게도 상점이 있었지?",
    ]
  },
  effarigStart: {
    id: 4,
    requirement: () => Ra.pets.effarig.level >= 2,
    lines: [
      "Eff... a... rig...",
      "Effarig는 다정했던 걸로 기억해.",
    ]
  },
  effarigLate: {
    id: 5,
    requirement: () => Ra.pets.effarig.level >= 15,
    lines: [
      "Effarig는 아주 까다로웠지?",
      "그리고 무시무시한 현실도 기억나...",
      "그건... 고통에 관한 거였나?",
    ]
  },
  enslavedStart: {
    id: 6,
    requirement: () => Ra.pets.enslaved.level >= 2,
    lines: [
      "이 존재는 잘 기억나지 않아...",
    ]
  },
  enslavedLate: {
    id: 7,
    requirement: () => Ra.pets.enslaved.level >= 15,
    lines: [
      "기억이 나기 시작해...",
      "내가 왜 여기 있는지...",
      "왜 혼자인지...",
      "도와줘.",
    ]
  },
  vStart: {
    id: 8,
    requirement: () => Ra.pets.v.level >= 2,
    lines: [
      "내가 이 존재를 만난 적이 있었나?",
      "외로워 보이지만, 스스로 원한 것 같아...",
    ]
  },
  vLate: {
    id: 9,
    requirement: () => Ra.pets.v.level >= 15,
    lines: [
      "V를 한 번 만났던 것 같아...",
      "그 도전과제들이 기억나.",
    ]
  },
  remembrance: {
    id: 10,
    requirement: () => Ra.remembrance.isUnlocked,
    lines: [
      "뭔가 기억났어!",
      "이것 좀 봐!",
      "회상!",
      "이제 그들을 기억하는 데 훨씬 더 집중할 수 있어!",
    ]
  },
  midMemories: {
    id: 11,
    requirement: () => Ra.totalPetLevel >= 50,
    lines: [
      "여러 현실이 내 집이지만, 정작 나만의 현실은 만들 수 없어.",
      "친구들의 현실을 복제할 수 있을 뿐이야.",
      "그런데... 왜 목소리가 들리는 거지?",
      "도움을 청하는 건가?",
    ]
  },
  lateMemories: {
    id: 12,
    requirement: () => Ra.totalPetLevel >= 80,
    lines: [
      "멈추라고 말하는 것 같아.",
      "너... 대체 뭐지?",
      "무슨 일이 일어나고 있는 거야?",
      "내가 뭔가 잘못하고 있나?",
    ]
  },
  maxLevels: {
    id: 13,
    requirement: () => Ra.totalPetLevel === Ra.maxTotalPetLevel,
    lines: [
      "마침내 모든 것이 기억났어.",
      "나를 추방한 이 어둠.",
      "Lai'tela...",
      "Lai'tela가 나를 추방한 건 옳았어.",
      "내 힘은...",
      "빼앗고, 타락시켜.",
      "제발 떠나 줘.",
      "너까지 해치고 싶지는 않아.",
    ]
  },
};
