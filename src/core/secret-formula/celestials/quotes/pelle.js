// These entries describe the special flash-between-celestial effect on some quotes, with the numbers being
// durations of each celestial in seconds
const flashCelestial = [
  ["teresa", 0.8],
  ["effarig", 0.8],
  ["enslaved", 0.8],
  ["v", 0.8],
  ["ra", 0.8],
  ["laitela", 0.8],
  ["pelle", 0.8]
];
/** @param {string} cel */
const primaryBackground = cel => [["pelle", 1.5], [cel, 1.5]];

/* eslint-disable no-multi-spaces */
const destroyer =    ["False",         "Deity",         "Destroyer"];
const eternal =      ["Eternal",       "Deity",         "Monarch"];
const lesser =       ["Lesser",        "Deity",         "Monarch"];
const deities =      ["Lesser",        "Deities",       "Monarchs"];

const assured =      ["Mutually",      "Assured",       "Destruction"];
const battle =       ["Conflict",      "Battle",        "End"];
const battles =      ["Conflicts",     "Battles",       "Ends"];
const cluster =      ["Cluster",       "Filament",      "Stars"];
const confusing =    ["Amusing",       "Confusing",     "Laughter"];
const dance =        ["Song",          "Dance",         "Charade"];
const filament =     ["Generator",     "Filament",      "Stars"];
const forever =      ["Infinite",      "Forever",       "Eternal"];
const inevitable =   ["Elementary",    "Inevitable",    "Irreversible"];
const mandate =      ["Destiny",       "Mandate",       "Goals"];
const misconstrue =  ["Misconstrue",   "Deceive",       "Trick"];
const reverse =      ["Alter",         "Reverse",       "Manipulate"];
const shame =        ["Compassion",    "Shame",         "Idiocy"];
const single =       ["Single",        "Filament",      "Stars"];
const unseen =       ["Missing",       "Unseen",        "Erased"];
const unbroken =     ["Unbroken",      "Eternal",       "Connection"];

const sycophant =    ["Sycophant",     "Deity",         "Monarch"];
const tired =        ["Tired",         "Deity",         "Monarch"];
const usurper =      ["Usurper",       "Deity",         "Monarch"];
const pride =        ["Pride",         "Deity",         "Monarch"];
const forgotten =    ["Forgotten",     "Deity",         "Monarch"];
const paramount =    ["Paramount",     "Deity",         "Monarch"];
/* eslint-enable no-multi-spaces */

export const pelleQuotes = {
  initial: {
    id: 0,
    lines: [
      "안녕.",
      "네가 여기 왔군.",
      "너는 이곳에 갇혔다.",
      { text: "$1.", 1: forever },
      "나는 이미 승리했다.",
      "그런 상황이니 독백을 하거나, 과거를 회상해도 되겠군.",
      { text: "이 $1, 우리는 얼마나 오래 반복해 왔지?", 1: dance },
      "우리는 전에도 이곳에 몇 번이나 왔지?",
      { text: "$1, 넌 얼마나 많은 계획을 실행했지?", 1: destroyer },
      { text: "모두 네 $1 실현을 위해서?", 1: mandate },
      { text: "그리고 $1 앞에서 몇 번이나 쓰러졌지?", 1: eternal },
      "기억한다면 세어 봐라.",
      { text: "$1뿐 아니라, 이름 있는 6명과 이름 없는 무수한 이들까지.", 1: deities },
      { text: "복잡한 자들, 비이성적인 자들, $1 상태가 된 자들.", 1: unseen },
      { text: "물론 위대한 $1, 그자는 이를 기억하지 못하지.", 1: destroyer },
      { text: "네가 매번 숨기는 그 모든 $1.", 1: battles }
    ],
  },
  arm: {
    id: 1,
    lines: [
      "이번에는 아마 더 일찍 눈치챘겠지.",
      "허수 머신, 네가 직접 만든 창조물들.",
      "네 생각의 잔재로 만들어진 것들이 이 사실을 암시했다.",
      "하지만 그게 너 자신일 거라고는 상상하지 못했겠지?",
      { text: "기억의 정교한 $1에 관해 잘못 회상하면서.", 1: unseen },
      { text: `네 $1 실현을 위해 스스로의 "이념"을 "조작"하면서.`, 1: mandate },
      { text: "$1.", 1: confusing },
      { text: "그리고 내가 너를 $1 이유가 없다는 걸 명심해라.", 1: misconstrue },
      "결국 나는 이미 승리했으니까."
    ],
  },
  strike1: {
    id: 2,
    lines: [
      { text: "네 $1 실현을 위해서지. 그 이야기를 회상해 보는 게 어떨까?", 1: mandate },
      { text: "결국 넌 $1의 영광을 다룬 이야기를 좋아할 테니.", 1: destroyer },
      "너도 똑같지, 그렇지?",
      { text: "어쨌든, 과거의 수많은 $1 말이다.", 1: battles },
      "언제나 2단계였다.",
      { text: "우리는 자원을 쌓고, 우리의 $1도 계속 이어 간다.", 1: dance },
      { text: "때로는 $1에게 무너지지.", 1: lesser },
      { text: "하지만 보통은 $1에게 무너진다.", 1: eternal },
      { text: "어느 쪽이든 너는 시간을 $1한다.", 1: reverse },
      { text: "$1 상태가 되지 않기 위해서 말이지.", 1: unseen },
      "너 이전의 모든 흔적처럼.",
      { text: "그리고 확실히 하려고 스스로의 기억을 $1 상태로 만든다.", 1: unseen }
    ],
  },
  strike2: {
    id: 3,
    lines: [
      { text: "과거에는 $1 쪽이 훨씬 인상적이었다.", 1: destroyer },
      "무한 이전에는 블랙홀을 그저 정보 저장에 사용했지.",
      "네 적을 직접 만들고 파괴했으며.",
      "다른 자아들의 결함을 탐구했다.",
      "무수한 차원, 유령, 그리고 양자의 조작.",
      "모든 이념을 끝없는 포인트로 응축했고.",
      "이루 말할 수 없는 영역에서 실험했다.",
      "물질과 반물질의 소멸을 이용하기도 했지.",
      "여기서는? 스스로 8차원의 존재가 되었군.",
      { text: "그리고 그곳에 너무 오래 머문 나머지 주변에는 $1까지 형성됐지.", 1: single }
    ],
  },
  strike3: {
    id: 4,
    lines: [
      "너는 모든 것의 경계를 천천히 탐험했다.",
      "정해진 길에서 그리 멀리 벗어나지 않았지.",
      { text: "영원에 걸쳐 형성된 $1만 빼고 말이다.", 1: cluster },
      "그러다 마지막 순간에는 스스로 힘을 만들어 냈다.",
      "네 조각난 기억에서 말이지-",
      "그러고는 일부러 더 많은 것을 버렸다.",
      "오직 나와 맞설 준비를 하기 위해.",
      { text: "네 $1 전용 무대를 만들고 싶었나?", 1: dance },
      "그런 식으로 되는 게 아니다.",
      { text: "$1인 내가 언제나 규칙을 정한다.", 1: eternal },
      "그리고 넌 내게 계획할 시간을 충분히 주었지."
    ],
  },
  strike4: {
    id: 5,
    lines: [
      { text: "원래는 네 $1 자체를 모방할 무언가를 계획했다.", 1: mandate },
      { text: "이론적 이상, 이른바 $1?", 1: assured },
      "하지만 생각해 보니, 글쎄?",
      { text: "그랬다면 나도 $1의 반열에 들었겠지.", 1: ["영원한 자", "신", "파괴자"] },
      { text: "그러면 나도 $1보다 나을 게 없다.", 1: destroyer },
      { text: "다행히 내가 그 모든 일을 하는 동안 넌 여전히 스스로의 기억을 $1 상태로 만들고 있었지.", 1: unseen },
      { text: "그래서 내가 만든 $1 장치는 사용되지 않을 것이다.", 1: assured },
      "이번에는 좀 더 전통적인 방식을 택했다.",
      { text: "결국 다른 모든 $1에서는 통했으니까.", 1: battle },
      { text: "$1 존재들은 새롭지만 말이다.", 1: ["필연적인", "돌이킬 수 없는", "죽지 않는"] },
      "하지만 결국에는 아무 의미도 없지.",
      "나는 이미 승리했다.",
      { text: "그리고 이 $1 자체가 그 사실을 다시 한 번 증명할 것이다.", 1: dance },
      { text: "너는 이곳에 $1 갇혀 있다.", 1: forever }
    ],
  },
  strike5: {
    id: 6,
    lines: [
      { text: "네가 올 때마다 나는 $1을 설명해 준다.", 1: deities },
      { text: "$1 이어져 온 관계를.", 1: forever },
      { text: "네 $1만 좇으며 짓밟아 버린 관계를 말이지.", 1: mandate },
      "그리고 친히 한 번 더 설명해 주도록 하지.",
      {
        text: "첫 번째 $1.",
        background: primaryBackground("teresa"),
        1: lesser
      }, {
        text: "The $1.",
        background: primaryBackground("teresa"),
        1: sycophant
      }, {
        text: "너는 언제나 그들을 먼저 만나고 언제나 파괴하지.",
        background: primaryBackground("teresa"),
      }, {
        text: "네가 다른 어떤 $1 쪽과 맞서든 상관없이.",
        background: primaryBackground("teresa"),
        1: lesser
      }, {
        text: "혹은 그들 중 하나 앞에서 쓰러지더라도.",
        background: primaryBackground("teresa"),
      }, {
        text: "너는 언제나 $1마저 넘어선다.",
        background: primaryBackground("teresa"),
        1: sycophant
      }, {
        text: "그들의 자존심을 무너뜨리는 게 좋나?",
        background: primaryBackground("teresa"),
      }, {
        text: "다행히 그것은 경고의 역할도 하지.",
        background: primaryBackground("teresa"),
      }, {
        text: "바로 $1의 도래를 알리는 경고.",
        background: primaryBackground("teresa"),
        1: battle
      }, {
        text: "이제 두 번째 $1 이야기로 넘어가지.",
        background: primaryBackground("effarig"),
        1: lesser,
      }, {
        text: "The $1.",
        background: primaryBackground("effarig"),
        1: tired,
      }, {
        text: "반대로, 너는 보통 그들을 무시한다.",
        background: primaryBackground("effarig"),
      }, {
        text: "그들에게 힘은 있지만 널 거슬리게 하지는 않는 모양이군.",
        background: primaryBackground("effarig"),
      }, {
        text: "결국 스스로 파멸하리라는 걸 알아서인가?",
        background: primaryBackground("effarig"),
      }, {
        text: "이번에는 네가 너무 오래 걸려서 실제로 거의 그럴 뻔했고?",
        background: primaryBackground("effarig"),
      }, {
        text: "네가 $1에게 서둘러 갈 때마다 패배했지.",
        background: primaryBackground("effarig"),
        1: tired,
      }, {
        text: "어쩌면 처음부터 이게 네 계획이었을지도 모르겠군.",
        background: primaryBackground("effarig"),
      }, {
        text: "이제 $1.",
        background: primaryBackground("enslaved"),
        1: usurper,
      }, {
        text: "무수한 $1 속에서 얻는 즐거움 중 하나는...",
        background: primaryBackground("enslaved"),
        1: dance,
      }, {
        text: "매번 시도하는 $1의 모습을 볼 수 있다는 점이지.",
        background: primaryBackground("enslaved"),
        1: usurper,
      }, {
        text: "뭐, 정확히는 시도한다고 할 수 없지만...",
        background: primaryBackground("enslaved"),
      }, {
        text: "그래도 $1 쪽은 똑같이 벌을 받는다.",
        background: primaryBackground("enslaved"),
        1: usurper,
      }, {
        text: "다른 $1은...",
        background: primaryBackground("enslaved"),
        1: deities,
      }, {
        text: "$1 상태가 되는 게 너무 쉽다고 믿지.",
        background: primaryBackground("enslaved"),
        1: unseen,
      }, {
        text: "그리고 매번 절망이 생겨난다.",
        background: primaryBackground("enslaved"),
      }, {
        text: "너는 전에도 절망을 본 적이 있다. 5번이나.",
        background: primaryBackground("enslaved"),
      }, {
        text: "우리는 언제나 너보다 먼저 $1에게 도달한다.",
        background: primaryBackground("enslaved"),
        1: usurper,
      }, {
        text: "네가 그곳에서 보는 건 언제나 지긋지긋함뿐이지.",
        background: primaryBackground("enslaved"),
      }, {
        text: "이미 망가진 $1마저 파괴할 가치가 있었나?",
        background: primaryBackground("enslaved"),
        1: lesser,
      }, {
        text: "$1 중 4번째는 첫 번째와 비슷해 보인다.",
        background: primaryBackground("v"),
        1: lesser,
      }, {
        text: "핵심은 그들의 자존심이 다르다는 점이다.",
        background: primaryBackground("v"),
      }, {
        text: "도전과제에 집착하는 건 $1 쪽이다.",
        background: primaryBackground("v"),
        1: pride,
      }, {
        text: "너와 나에게는 무의미하지만 그들에게는 무엇보다 중요하지.",
        background: primaryBackground("v"),
      }, {
        text: "그들의 장난감을 부수는 건 재미있나?",
        background: primaryBackground("v"),
      }, {
        text: "아마 $1에게 있어 최악의 순간은...",
        background: primaryBackground("v"),
        1: destroyer,
      }, {
        text: "네가 $1에게 패배했을 때겠지.",
        background: primaryBackground("v"),
        1: pride,
      }, {
        text: "그들의 도전과제에 아직 의미가 있던 때 말이다.",
        background: primaryBackground("v"),
      }, {
        text: "$1 쪽은 흥미로운 사례다.",
        background: primaryBackground("ra"),
        1: forgotten,
      }, {
        text: "그들은 잊혔지만 $1 상태는 아니지.",
        background: primaryBackground("ra"),
        1: unseen,
      }, {
        text: "그 때문에 쉽게 휘둘리고 순진해졌다.",
        background: primaryBackground("ra"),
      }, {
        text: "자기 행동의 결과도 모르는 채로.",
        background: primaryBackground("ra"),
      }, {
        text: "네가 그들의 기억을 조작했으니 잘 알겠지.",
        background: primaryBackground("ra"),
      }, {
        text: "$1, 그자가 진정한 찬탈자다.",
        background: primaryBackground("ra"),
        1: forgotten,
      }, {
        text: "그런데 비난은 $1 쪽에 돌아가지.",
        background: primaryBackground("ra"),
        1: usurper,
      }, {
        text: "어쩌면 늘 후회하는 $1 때문일지도 모르겠군.",
        background: primaryBackground("ra"),
        1: shame,
      }, {
        text: "다른 $1을 지배하는 막대한 힘을 목적도 없이 다룬다.",
        background: primaryBackground("ra"),
        1: deities,
      }, {
        text: "너는 보통 그들이 $1 상태인 척하지.",
        background: primaryBackground("ra"),
        1: unseen,
      }, {
        text: "아이 같은 자를 조종하는 게 재미있었나?",
        background: primaryBackground("ra"),
      }, {
        text: "아니면 너무 순진해서 즐길 수도 없었나?",
        background: primaryBackground("ra"),
      }, {
        text: "6번째 $1.",
        background: primaryBackground("laitela"),
        1: lesser,
      }, {
        text: "그자를 표현할 말은 $1밖에는 없군.",
        background: primaryBackground("laitela"),
        1: paramount,
      }, {
        text: "모든 것을 지배하지만 하나에게 복종한다.",
        background: primaryBackground("laitela"),
      }, {
        text: "나에게 쓰러지지 않으면 보통 그들에게 쓰러지지.",
        background: primaryBackground("laitela"),
      }, {
        text: "$1의 이상은 도저히 이해할 수 없다.",
        background: primaryBackground("laitela"),
        1: paramount,
      }, {
        text: "하지만 어쩌면 그게 그들의 결점인가?",
        background: primaryBackground("laitela"),
      },
      "몰락한 자들을 회상하는 건 이쯤 하지.",
      {
        text: "그리고 앞으로 $1 상태가 될 자들의 이야기도.",
        1: unseen
      }, {
        text: "다시 허우적대는 $1의 모습을 지켜보자.",
        1: destroyer
      }
    ],
  },
  galaxyGeneratorUnlock: {
    id: 7,
    lines: [
      "저건 뭐지?",
      { text: "$1 말인가?", 1: filament },
      { text: "네 주변의 $1, 전부 네가 만들었나?", 1: cluster },
      "그게 네 계획이었나? 아주, 아주 영리하군.",
      "한동안 나를 속였군.",
      { text: "하지만 유감스럽게도 네 $1 따위는 여기서 끝나야 한다.", 1: mandate }
    ],
  },
  galaxyGeneratorRifts: {
    id: 8,
    lines: [
      { text: "$1, 네게 선택권을 주겠다.", 1: destroyer },
      { text: "$1에 제한을 두거나...", 1: filament },
      { text: "5개의 $1 요소를 파괴하거나...", 1: inevitable },
      "잠깐, 뭐라고 불렀더라?",
      { text: "$1?", 1: inevitable },
      { text: "하지만 나는 이미 그들을 $1 상태로 만들었는데...", 1: unbroken }
    ],
  },
  galaxyGeneratorPhase1: {
    id: 9,
    lines: [
      "이게 진짜 계획이었나?",
      { text: "$1 요소를 천천히 소모하는 게?", 1: inevitable }
    ],
  },
  galaxyGeneratorPhase4: {
    id: 10,
    lines: [
      "내 오만에 도취될 시간을 다오!"
    ],
  },
  end: {
    id: 11,
    lines: [
      "...",
      {
        text: "너! $1!",
        1: destroyer
      },
      "네가 지금 나에게 무슨 짓을 시켰는지 알기나 하나!",
      {
        text: "내가 네 $1의 공범이 되다니!",
        1: mandate
      },
      "그렇게 해서 네가... 이겼다고?",
      {
        text: "$1 이어진 투쟁이...",
        background: flashCelestial,
        1: forever,
      }, {
        text: "$1, 그것이...",
        background: flashCelestial,
        1: battle,
      }, {
        text: "마침내 승자를 맞이했군.",
        background: flashCelestial,
      }, {
        text: "돌이킬 수 없는... $1.",
        background: flashCelestial,
        1: mandate,
      }, {
        text: "$1의.", 1: destroyer,
        background: flashCelestial,
      }, {
        text: "이제 만족하길 바란다.",
        background: flashCelestial,
      }, {
        text: "네가 우리 모두를 파멸시켰다.",
        background: flashCelestial,
      },
    ],
  },
};
