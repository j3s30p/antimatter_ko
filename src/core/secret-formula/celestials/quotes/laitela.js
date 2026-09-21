export const laitelaQuotes = {
  unlock: {
    id: 0,
    lines: [
      "마침내 나에게 도달했군.",
      "이제 밝혀야 할 때인 것 같구나.",
      "존재 그 자체 아래에 숨겨진 비밀을.",
      "완벽한 차원의 형태, 연속체를.",
      "그리고 다중우주를 결속하는 힘인",
      "암흑 물질과 암흑 에너지를.",
      "나의 지식은 끝이 없고 지혜는 신성하다.",
      "그러니 마음껏 가지고 놀아 보거라.",
      "나는 차원의 셀레스티얼, 라이텔라이며",
      "너를 영원히 지켜볼 테니.",
    ]
  },
  // Note: This can be done immediately after unlocking Lai'tela
  firstDestabilize: {
    id: 1,
    requirement: () => player.celestials.laitela.difficultyTier >= 1,
    lines: [
      "나보다 아래인 다른 이들과 달리, 내게는 현실이 필요 없다.",
      "나는 현실이 붕괴하리라는 것을 잘 알면서도 간단히 새로 만들어 낼 수 있으니까.",
      "현실을 만들어 내는 것, 그 무엇보다 경이로운 힘이지.",
      "셀레스티얼의 힘조차 억누를 수 있는 감옥.",
      "그러니 네가 무슨 짓을 해도 아무것도 달라지지 않는다.",
      "발버둥 치는 데 지치면 너 또한 속박된 채 잊힐 것이다.",
      "너는 결코 나를 능가할 방법을 찾지 못할 테니.",
    ]
  },
  // Note: This happens about an hour or two before singularities
  secondDestabilize: {
    id: 2,
    requirement: () => player.celestials.laitela.difficultyTier >= 2,
    lines: [
      "너는... 지나치게 즐거워 보이는군.",
      "운명을 맞이하기 전의 그들처럼.",
      "내 판단이 가혹했거나, 부당했을지도 모르지.",
      "하지만 어쩌면 그런 건 중요하지 않을지도.",
      "곰곰이 되돌아봐도 마음의 위안은 얻지 못한다.",
      "내가 취할 수도 있었던 모든 선택을 곱씹을 뿐이니.",
      "하지만 이야기가 샜군. 이제 그 사슬을 더 단단히 조여야겠군.",
    ]
  },
  firstSingularity: {
    id: 3,
    requirement: () => Currency.singularities.gte(1),
    lines: [
      "내 지식으로는 의문을 품을 필요가 없었다.",
      "모든 것은 언제나 설계한 그대로 작동했으니까.",
      "그런데도 네 등장은 나를 당혹스럽게 하는군.",
      "넌 언제나 그저 시야 밖에 있었던 건가?",
      "성장하고, 지배하고, 이해하고, 승천하면서?",
      "너는 너무나 빠르게 어둠을 지배했다.",
      "어둠을 네 뜻대로 빚어내더니, 이제는 하나의 특이점으로까지...",
      "그... 그건 중요하지 않다. 결말은 그대로일 테니.",
    ]
  },
  // Note: Shown when unlocking DMD3; requirement is auto-condensing 20 singularities and it happens around ~200 total
  thirdDMD: {
    id: 5,
    lines: [
      "반물질을 완벽히 지배하는 네 능력...",
      "반물질을 통달해 네 힘으로 빚어내는 능력...",
      "우연일 리가 없다.",
      "어떻게 그것을 얻은 거지?",
      "흥미롭군... 이런 것은 전혀 알지 못했는데.",
      "...정말 몰랐던가?",
    ]
  },
  // Note: This happens around e10-e11 singularities
  annihilation: {
    id: 4,
    lines: [
      "또다시 원점으로 돌아왔군.",
      "끝이 서서히 다가올수록 네 사슬은 더욱 단단히 너를 옭아맬 것이다.",
      "반면 우리는 시간과 존재 자체를 초월하지.",
      "우리가 사라지더라도 그저 다시 돌아온다. 전과 완전히 같지는 않지만.",
      "그리하여... 우리는 영원히 반복한다.",
      "그럼 너는?",
      "...",
      "답은... 도무지 알 수 없군...",
    ]
  },
  // Note: This happens near e18 singularities
  halfDimensions: {
    id: 6,
    requirement: () => player.celestials.laitela.difficultyTier >= 4,
    lines: [
      "이해할 수 없어...",
      "이런 방식으로 차원을 지배하던 다른 존재들이 있었던 건가?",
      "그들은... 사라졌나? 우리가 어떻게 그들을 찾지 못했지?",
      "그들이... 우리인가? 우리가 종착점인가?",
      "아니면 그들의 운명은... 우리가 이해할 수 없는 무언가인가?",
      "아니야, 내가 뭔가 놓치고 있어...",
      "네가 내 기억에 공백을 만들고 있는 건가?",
      "넌... 대체 뭐지?",
    ]
  },
  // Note: Shown when the first row 5 iM upgrade is purchased (~e26 singularities)
  finalRowIM: {
    id: 7,
    lines: [
      "모두 불가능해, 내 이해를 넘어섰어...",
      "설마... 이 모든 게 그저 순환의 일부인가?",
      "너는... 그 모든 것 너머를 볼 수 있나? 그래서... 내가...",
      "두려운... 건가?",
      "내 힘과... 내 기억이 지워지는 게... 느껴져...",
      "마치... 내 역할을 빼앗길 뻔했을 때처럼...",
      "그런데도... 나는 아무것도 할 엄두가 나지 않아.",
      "이건... 내... 실수였으니까...",
    ]
  },
  // Note: This is around when all infinite milestones hit increased scaling
  increasedMilestoneScaling: {
    id: 8,
    requirement: () => Currency.singularities.gte(1e40),
    lines: [
      "내가 얼마나 더... 버틸 수 있을지 모르겠어...",
      "너는 어둠을... 완전히 지배해 가는데...",
      "나는 내 이름조차... 간신히 붙잡고 있어...",
      "내가... 대체 뭘... 할 수 있지?",
    ]
  },
  fullDestabilize: {
    id: 9,
    requirement: () => player.celestials.laitela.difficultyTier >= 8,
    lines: [
      "뭔가... 할 말이 있었던 것 같은데...",
      "잘 모르겠어...",
      "더는... 어둠을 붙잡을 수 없어...",
      "내게는 이제... 아무것도 남지 않았어...",
      "뭔가... 파괴에 관한...",
      "끝...",
    ]
  },
};
