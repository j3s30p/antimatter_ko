export const secretAchievements = [
  {
    id: 11,
    name: "첫 번째는 언제나 공짜",
    description: "이 도전 과제를 클릭하세요."
  },
  {
    id: 12,
    name: "혹시 모르니까",
    get description() { return `새로고침하지 않고 ${formatInt(100)}번 저장하세요.`; }
  },
  {
    id: 13,
    name: "경의를 표하면 보답받는다",
    description: "경의를 표하세요."
  },
  {
    id: 14,
    name: "나도 그래",
    description: "나쁜 말을 해 보세요."
  },
  {
    id: 15,
    name: "배럴 롤을 해!",
    description: "배럴 롤을 하세요.",
  },
  {
    id: 16,
    name: "고통을 즐기시나요?",
    get description() {
      return `영원을 달성한 뒤 "고통스러운" 표기법을 현실 시간으로
      ${formatInt(10)}분 동안 사용하세요.`;
    },
    checkRequirement: () => AchievementTimers.pain
      .check(PlayerProgress.eternityUnlocked() && Notations.current.isPainful, 600),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 17,
    name: "목숨 30개",
    description: "코나미 코드를 입력하세요."
  },
  {
    id: 18,
    name: "운이 좋다고 느끼나? 그래, 애송이?",
    get description() {
      return `매초 ${formatInt(1)}/${formatInt(1e5)} 확률로 이 도전 과제를 달성합니다.`;
    }
  },
  {
    id: 21,
    name: "차라리 현실에서 공부해",
    description: "비밀 시간 연구를 구매하세요."
  },
  {
    id: 22,
    name: "바삭하게 튀김",
    get description() { return `이모지 표기법을 사용하는 동안 반물질 은하를 총 ${formatInt(1e5)}개 구매하세요.`; },
    checkRequirement: () => player.requirementChecks.permanent.emojiGalaxies >= 1e5,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER
  },
  {
    id: 23,
    name: "거기 서라, 이 범죄자 녀석!",
    description: "콘솔을 여세요."
  },
  {
    id: 24,
    name: "진짜 뉴스",
    description: "클릭하면 무언가 일어나는 뉴스 티커 문구를 클릭하세요."
  },
  {
    id: 25,
    name: "쉿… 비밀이야",
    description: "비밀 테마를 발견하세요."
  },
  {
    id: 26,
    name: "실패자군",
    get description() {
      return `새로고침하지 않고 영원 도전에 ${formatInt(10)}번 실패하세요.
      인생을 대체 어떻게 보내는 거야…`;
    },
    checkRequirement: (function() {
      let count = 0;
      return () => ++count >= 10;
    }()),
    checkEvent: GAME_EVENT.CHALLENGE_FAILED
  },
  {
    id: 27,
    name: "물질 차원이라고 부르는 건 아니잖아?",
    description: "물질을 무한히 획득하세요.",
    checkRequirement: () => Currency.matter.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 28,
    name: "좋군.",
    description: "무슨 짓을 했는지 모르는 척하지 마세요."
  },
  {
    id: 31,
    name: "RAM을 좀 더 다운로드해야겠어",
    get description() { return `업데이트 간격을 ${formatInt(200)}ms로 설정하세요.`; }
  },
  {
    id: 32,
    name: "0.001 이하",
    get description() {
      return `무한 또는 영원 최고 기록을 ${format(0.001, 3, 3)}초 이하로 만드세요.`;
    },
    checkRequirement: () =>
      Time.bestInfinity.totalMilliseconds <= 1 ||
      Time.bestEternity.totalMilliseconds <= 1,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.ETERNITY_RESET_AFTER]
  },
  {
    id: 33,
    name: "건전한 재정 결정",
    description: "STD 코인 구매 버튼을 클릭하세요."
  },
  {
    id: 34,
    name: "이게 어떻게 작동하는지는 알지?",
    description: "빈 시간 연구 트리에서 재설정하세요."
  },
  {
    id: 35,
    name: "최대 구매를 알려줘야 하나…",
    get description() { return `틱 속도 강화를 하나씩 ${formatInt(1e5)}번 구매하세요.`; },
    checkRequirement: () => player.requirementChecks.permanent.singleTickspeed >= 1e5,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 36,
    name: "자리를 비운 동안… 아무 일도 없었습니다.",
    description: "자리를 비운 동안 아무 일도 일어나지 않는 것을 확인하세요."
  },
  {
    id: 37,
    name: "지시를 잘 따랐군",
    description: "지시를 따르세요."
  },
  {
    id: 38,
    name: "칼날 위",
    description: "확인 문구를 입력한 뒤 완전 초기화 창을 닫으세요."
  },
  {
    id: 41,
    name: "그 차원은 존재하지 않아",
    description: "제9 차원을 구매해 보세요."
  },
  {
    id: 42,
    name: "부끄러운 줄 알아야지",
    description: "영원 도전 12로 시간을 가속해 보세요."
  },
  {
    id: 43,
    name: "불협화음의 합창",
    description: "장착한 모든 글리프를 음악 글리프로 만드세요.",
    checkRequirement: () => Glyphs.active.length && Glyphs.active.every(x => Glyphs.isMusicGlyph(x)),
    checkEvent: GAME_EVENT.GLYPHS_EQUIPPED_CHANGED
  },
  {
    id: 44,
    name: "이제 통계에 만족하나?",
    get description() { return `통계 탭을 현실 시간으로 ${formatInt(15)}분 동안 뚫어져라 바라보세요.`; },
    checkRequirement: () => AchievementTimers.stats.check(Tab.statistics.isOpen, 900),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 45,
    name: "이 끌기는 너무 질질 끌려",
    description: "특전을 1분 동안 끌고 다니세요.",
    checkRequirement: () => player.requirementChecks.permanent.perkTreeDragging++ / 100 >= 60
  },
  {
    id: 46,
    name: "만일을 대비해서",
    description: "현실 시간 하루를 저장하세요."
  },
  {
    id: 47,
    name: "ALT+",
    description: "숨길 수 있는 모든 탭을 숨기세요."
  },
  {
    id: 48,
    name: "스택 오버플로",
    description: "오토메이터 오류 수를 코드 줄 수보다 많게 만드세요."
  },
];
