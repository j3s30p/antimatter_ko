import { DC } from "../constants";

import { credits } from "@/core/secret-formula/credits";

export const h2p = {
  /**
   * @template
   * {
   *  @property {String} name   Internal name for the tab entry
   *  @property {String} alias  Display name for the tab; if not present, will use the internal name
   *  @property {Number} id     Unique ID for each entry (generated in-game, not explicitly stated)
   *  @property {function: @return String} info         Text body of information for the entry
   *  @property {function: @return Boolean} isUnlocked  Condition for when the entry is visible and searchable
   *  @property {Array: String} tags  List of keywords which are linked to this tab in the search function
   *  @property {String} tab    Key of a tab+subtab combination which will default the h2p to this entry if opened
   * }
   */
  tabs: [
    {
      name: "이 도움말 창",
      info: () => `
게임 방법 도움말에 오신 것을 환영합니다!
<br>
<br>
이 창에는 게임을 진행하며 만나게 될 요소의 자세한 설명과 추가 정보가 담겨 있습니다. 새로운 기능과
시스템을 해금하면 이곳의 문서도 함께 늘어납니다. 길을 잃었거나 어떤 기능의 작동 방식이 헷갈릴 때는
관련 항목에서 유용한 설명을 찾아보세요.
<br>
<br>
지금은 게임 방법을 열 때 항상 이 페이지가 먼저 표시됩니다. 첫 차원 가속을 얻은 뒤부터는 현재 보고 있는
탭과 하위 탭에 해당하는 문서가 있다면 그 문서를 자동으로 엽니다.
`,
      isUnlocked: () => true,
      tags: ["h2p", "how", "to", "play", "modal"],
      tab: ""
    },
    {
      name: "저장 파일",
      info: () => `
웹 브라우저에서 플레이하면 저장 데이터는 브라우저 데이터에, Steam에서 플레이하면 Steam 설치 폴더에
보관됩니다. 따라서 브라우저 캐시나 쿠키를 지우거나 Steam에서 게임을 완전히 제거하면 저장 파일도
삭제될 수 있습니다. 비공개 또는 시크릿 창에서 플레이한 저장은 다음에 브라우저를 열었을 때 남아 있지
않습니다. 저장은 브라우저별로 분리되므로 Chrome의 저장을 Firefox에서 볼 수 없으며, 웹 버전과 Steam
버전의 저장 역시 서로 독립적입니다.
<br>
<br>
내보내기 기능을 사용하면 무작위 문자처럼 보이는 <i>매우</i> 긴 문자열이 클립보드에 복사됩니다. 이 문자열에
저장 데이터가 들어 있으며, 가져오기 창의 입력란에 붙여 넣으면 다시 불러올 수 있습니다. 일부라도 빠지면
올바른 저장으로 인식되지 않을 수 있습니다. 메신저로 다른 기기에 전송할 때 일부 앱이 긴 문자열을
잘라낼 수 있으니 주의하세요.
<br>
<br>
리얼리티 업데이트 이후의 정상적인 저장 문자열은 <b>${GameSaveSerializer.startingString.savefile}</b>로 시작해
<b>${GameSaveSerializer.endingString.savefile}</b>로 끝납니다. 현실 이전 버전의 저장은 <b>eyJ</b>로 시작하고
<b>In19</b>, <b>fX0=</b>, <b>fQ==</b> 중 하나로 끝납니다. 어느 형식에도 맞지 않으면 저장 일부가 누락되어
가져오기에 실패합니다. 클립보드뿐 아니라 텍스트 파일로도 저장을 가져오거나 내보낼 수 있습니다.
<br>
"저장 선택" 버튼으로 세 개의 저장 슬롯 중 하나를 고를 수 있습니다. 각 슬롯은 서로 독립적이며 가져오기와
내보내기는 현재 슬롯에만 영향을 줍니다. <b>단, 브라우저나 Steam 데이터를 지우면 세 슬롯이 모두 초기화됩니다.</b>
<br>
<br>
게임은 기본적으로 ${formatInt(30)}초마다 자동 저장합니다. 게임을 닫기 직전의 행동은 자동 저장을 기다리거나
직접 저장하지 않으면 기록되지 않을 수 있습니다. 자동 저장 간격은 조정할 수 있으며, 화면 왼쪽 아래에서
타이머를 확인할 수 있습니다.
<br>
<br>
온라인 또는 오프라인에서 일정 시간이 지나면 백업도 생성됩니다. "자동 저장 백업 메뉴 열기"에서 언제든
백업을 확인하고 불러올 수 있습니다. 몇 분 전이나 장시간 자리를 비우기 전 상태로 되돌리고 싶을 때 유용합니다.
<br>
<br>
Google 계정을 연결하면 진행 상황을 온라인에 저장하고 같은 계정으로 로그인한 다른 기기에서 이어서
플레이할 수 있습니다. 클라우드 저장은 웹과 Steam 버전끼리만 호환되며 Android 앱의 저장은 자동으로
연결되지 않습니다. 클라우드 저장과 불러오기는 보통 반대쪽 저장을 덮어쓰지만, 저장 시점이나 진행도가
크게 다르면 어느 저장을 유지할지 묻는 창이 표시됩니다.
<br>
<br>
원한다면 언제든 초기화 버튼으로 현재 저장을 완전히 지울 수 있습니다. 실수를 막기 위해 확인 문구를 직접
입력해야 하며 다른 저장 슬롯에는 영향을 주지 않습니다. <b>이 초기화는 되돌릴 수 없고 영구 보상이나 숨겨진
혜택도 전혀 제공하지 않습니다.</b>
`,
      isUnlocked: () => true,
      tags: ["choose", "cloud", "google", "save", "import", "export", "reset"],
      tab: "options/saving"
    },
    {
      name: "화면 꾸미기",
      info: () => `
게임에는 두 가지 UI 배치가 있습니다. 클래식 UI는 리얼리티 업데이트 이전의 Antimatter Dimensions 스타일을
유지하고, 모던 UI는 현대적인 어두운 테마를 바탕으로 새롭게 디자인되었습니다. 게임 전체의 모습을 바꾸는
다양한 테마도 있으며, 특정 문구를 가져오면 열리는 비밀 테마도 있습니다. 모든 테마는 두 UI에서 사용할 수 있습니다.
<br>
<br>
숫자 표기법은 기본적으로 혼합 과학적 표기법을 사용하지만 드롭다운 메뉴에서 여러 방식으로 바꿀 수 있습니다.
일부 표기법은 농담을 목적으로 만들어져 글자가 다른 영역을 침범할 수 있으며, 이는 버그가 아닙니다.
"지수 표기 옵션"에서는 매우 큰 숫자의 표시 방식도 조정할 수 있지만 일부 문구가 어색하게 보일 수 있습니다.
<br>
<br>
게임의 여러 이벤트는 전체 화면 애니메이션이나 계속 진행할지 묻는 팝업을 표시합니다. 대부분은 옵션에서
개별적으로 끌 수 있지만, 해당 애니메이션이나 확인 창을 한 번 이상 본 뒤에야 설정 항목이 나타납니다.
`,
      isUnlocked: () => true,
      tags: ["UI", "update", "news", "theme", "notation", "comma", "exponent", "animation", "retry", "confirmation",
        "offline", "hotkey", "classic", "modern"],
      tab: "options/visual"
    },
    {
      name: "오프라인 진행",
      info: () => `
Antimatter Dimensions에는 게임을 오래 닫아 둔 동안의 동작을 모의 계산하는 따라잡기 기능이 있습니다.
게임의 수학적 구조가 복잡해 합리적인 시간 안에 완전히 정확하게 계산할 수는 없습니다. 모의 계산이 끝나면
자리를 비운 동안 관련 자원이 얼마나 변했는지 요약해서 보여 줍니다.
<br>
<br>
게임을 켜 둔 채 창의 초점이 사라지거나 오랫동안 중단되면 돌아왔을 때 놓친 시간을 오프라인 진행으로
적용합니다. 기기마다 중단 상태를 처리하는 방식이 달라 정확하지 않을 수 있습니다. 문제가 생기면 옵션에서
이 기능을 끌 수 있으며, 그 경우 놓친 시간을 한 틱에 적용하려고 시도합니다.
<br>
<br>
게임의 모든 요소는 틱마다 한 번 갱신됩니다. 모든 차원과 자원이 한 단위 생산하고, 자동 구매기가 한 번
작동하며, 배율과 수치 및 화면 표시가 갱신됩니다. 기본값은 초당 ${formatInt(20)}틱이며 옵션의 "업데이트 주기"로
바꿀 수 있습니다. 현재 설정에서는 평균 초당 ${format(1000 / player.options.updateRate, 2, 1)}틱으로 실행됩니다.
지연이나 JavaScript 내부 동작 때문에 개별 틱에는 몇 퍼센트 정도 차이가 생길 수 있습니다.
<br>
<br>
오프라인 모의 계산에서는 자리를 비운 시간을 채우도록 틱 길이를 조정합니다. 예를 들어 오프라인 틱을
${formatInt(1000)}으로 설정하고 한 시간 동안 게임을 닫았다면 각 틱은 ${format(3.6, 1, 1)}초가 됩니다. 대부분의
요소는 결과 자원량이 비슷하지만 자동 구매기는 실질적으로 ${format(3.6, 1, 1)}초마다 한 번만 작동하므로
진행 구간에 따라 큰 영향을 받을 수 있습니다.
<br>
<br>
${player.blackHole[0].unlocked
    ? `<b>오프라인 블랙홀 동작:</b> 블랙홀을 해금하면 각 틱에 비슷한 양의 <i>게임 시간</i>이 담기도록 오프라인
      진행을 계산합니다. 모의 계산 중에는 블랙홀이 평소보다 훨씬 오래 활성화된 것처럼 보일 수 있습니다.
      실제로는 활성 구간을 더 천천히 실행하고, 현실 시간당 생산량이 훨씬 적은 비활성 구간을 "건너뛰는"
      방식입니다. 일정한 현실 시간으로 틱을 계산하는 것보다 대체로 플레이어에게 유리합니다.
      <br>
      <br>`
    : ""
}
오프라인 틱 수는 ${formatInt(500)}에서 ${formatInt(DC.E6)} 사이로 조정할 수 있습니다. 틱 수가 적으면 빠르지만
덜 정확하고, 많으면 더 정확하지만 오래 걸립니다. 한 게임 틱에는 최대 하루만 담을 수 있으므로 1년 넘게
게임을 하지 않은 경우처럼 드문 상황에서는 자리를 비운 시간이 전부 적용되지 않을 수 있습니다.
<br>
<br>
진단이나 시간 측정, 또는 "온라인 전용" 플레이를 위해 오프라인 진행을 완전히 끌 수도 있습니다. 기본값은
게임 시작부터 켜짐입니다. 오프라인 진행을 끄면 게임을 닫은 동안 총 플레이 시간 통계도 멈춥니다.
`,
      isUnlocked: () => true,
      tags: ["offline", "away", "progress"],
      tab: "options/gameplay"
    }, {
      name: "효과 중첩",
      info: () => `
Antimatter Dimensions의 효과와 업그레이드는 대부분 다음 세 범주로 나뉩니다.
<br>
- <b>덧셈:</b> 보통 + 기호(또는 "증가")와 숫자로 표시되며 기본값에 해당 수치를 더합니다. 여러 덧셈 효과는
서로 합산됩니다. 자원 비용을 줄이는 뺄셈 효과로 나타나기도 합니다.
<br>
- <b>곱셈:</b> 보통 × 기호(또는 "곱하기")와 숫자로 표시되며, 드물게 ➜로 구분한 두 숫자로 표시됩니다.
서로 다른 곱셈 효과는 항상 곱해서 결합하고 더하지 않습니다. 부정적 효과나 비용 감소가 나눗셈으로
적용되는 경우도 있습니다.
<br>
- <b>거듭제곱:</b> 훨씬 드물며 ^ 기호와 숫자로 표시됩니다. 여러 거듭제곱 효과는 차례로 적용됩니다.
이는 효과값끼리 곱한 뒤 최종 값을 한 번의 거듭제곱으로 적용하는 것과 같습니다. 드물게 ${formatInt(1)}보다
작은 지수로 부정적 효과가 적용되기도 합니다.
<br>
<br>
업그레이드나 보상이 기존 값을 <i>대체</i>한다고 명시하지 않는 한 모든 효과는 서로 중첩됩니다. 값을
대체하는 경우에는 위 효과를 적용하기 전에 새 값으로 바뀝니다. 최종 값은 각 범주의 효과를 먼저 합친 뒤
덧셈, 곱셈, 거듭제곱 순서로 적용해 계산합니다.
<br>
<br>
${PlayerProgress.realityUnlocked() || PlayerProgress.dilationUnlocked()
    ? "시간 팽창과 유사 효과는 다른 모든 효과가 중첩된 <i>뒤에</i> 적용됩니다."
    : ""}
<br>
<br>
${PlayerProgress.realityUnlocked()
    ? `글리프 효과에는 글리프끼리 중첩되는 방식과 다른 게임 효과에 중첩되는 방식이 따로 있습니다.
      두 방식은 서로 다를 수 있습니다. 예를 들어 "반물질 차원 거듭제곱" 효과는 <i>서로 덧셈으로 중첩</i>되지만,
      합계에 기본값 ${formatInt(1)}을 더한 뒤 반물질 차원에 <i>거듭제곱 효과</i>로 적용됩니다.`
    : ""}
`,
      isUnlocked: () => true,
      tags: ["effect", "stack", "combine", "add", "reduce", "multiply", "divide", "power", "dilation", "glyph"],
      tab: "options/gameplay"
    }, {
      name: "자주 쓰는 약어",
      info: () => `
게임에서는 공간을 절약하기 위해 여러 자원의 이름을 약어로 표시합니다. 새로운 자원을 처음 만나면
이 문서에도 해당 약어가 자동으로 추가됩니다.
<br>
- <b>AM</b>: 반물질 (Antimatter)<br>
- <b>AD</b>: 반물질 차원 (Antimatter Dimension)<br>
- <b>AG</b>: 반물질 은하 (Antimatter Galaxy)<br>
${PlayerProgress.infinityUnlocked() ? "- <b>IP</b>: 무한 포인트 (Infinity Point)<br>" : ""}
${PlayerProgress.infinityUnlocked() ? "- <b>NC</b>: 일반 도전 (Normal Challenge)<br>" : ""}
${PlayerProgress.infinityUnlocked() ? "- <b>IC</b>: 무한 도전 (Infinity Challenge)<br>" : ""}
${InfinityDimension(1).isUnlocked || PlayerProgress.eternityUnlocked()
    ? "- <b>ID</b>: 무한 차원 (Infinity Dimension)<br>"
    : ""}
${PlayerProgress.replicantiUnlocked() ? "- <b>RG</b>: 복제자 은하 (Replicanti Galaxy)<br>" : ""}
${PlayerProgress.eternityUnlocked() ? "- <b>EP</b>: 영원 포인트 (Eternity Point)<br>" : ""}
${PlayerProgress.eternityUnlocked() ? "- <b>TT</b>: 시간 정리 (Time Theorem)<br>" : ""}
${PlayerProgress.eternityUnlocked() ? "- <b>TD</b>: 시간 차원 (Time Dimension)<br>" : ""}
${PlayerProgress.eternityUnlocked() ? "- <b>EC</b>: 영원 도전 (Eternity Challenge)<br>" : ""}
${PlayerProgress.dilationUnlocked() ? "- <b>TP</b>: 타키온 입자 (Tachyon Particle)<br>" : ""}
${PlayerProgress.dilationUnlocked() ? "- <b>DT</b>: 팽창된 시간 (Dilated Time)<br>" : ""}
${PlayerProgress.dilationUnlocked() ? "- <b>TG</b>: 타키온 은하 (Tachyon Galaxy)<br>" : ""}
${PlayerProgress.realityUnlocked() ? "- <b>RM</b>: 리얼리티 머신 (Reality Machine)<br>" : ""}
${PlayerProgress.realityUnlocked() ? "- <b>AP</b>: 오토메이터 포인트 (Automator Point)<br>" : ""}
${PlayerProgress.realityUnlocked() ? "- <b>BH</b>: 블랙홀 (Black Hole)<br>" : ""}
${MachineHandler.isIMUnlocked ? "- <b>iM</b>: 허수 머신 (Imaginary Machine)<br>" : ""}
${Laitela.isUnlocked ? "- <b>DM</b>: 암흑 물질 (Dark Matter)<br>" : ""}
${Laitela.isUnlocked ? "- <b>DE</b>: 암흑 에너지 (Dark Energy)<br>" : ""}
`,
      isUnlocked: () => true,
      tags: ["abbreviation", "shorten", "am", "ad", "ag", "ip", "nc", "ic", "id", "rg", "ep", "tt", "td", "ec", "tp",
        "dt", "tg", "rm", "ap", "bh", "im", "dm", "de"],
      tab: ""
    }, {
      name: "반물질 차원",
      info: () => `
반물질은 게임 전체에서 여러 요소를 구매하는 데 쓰이는 자원입니다. 게임을 처음 시작하면 반물질
${formatInt(10)}개를 가지고 있으며, 이를 사용해 제1 반물질 차원을 구매하면서 게임을 시작할 수 있습니다.
<br>
<br>
반물질 차원은 게임의 생산 단위입니다. 제1 반물질 차원은 반물질을 생산하며, 각 상위 차원은 바로 아래
차원을 생산해 지속적인 성장을 만듭니다. 반물질 차원은 모두 8개입니다.
<br>
<br>
<b>차원 배율:</b> 차원 옆에는 배율이 표시됩니다(예: 제1 차원 ${formatX(1, 1, 1)}). 각 차원의 기본 생산량에
이 수치가 곱해집니다. 해당 차원을 ${formatInt(10)}개 구매할 때마다 배율이 ${formatX(2)}가 되며 가격도 상승합니다.
<br>
<br>
<b>보유한 차원:</b> 다음 열에는 현재 보유한 차원의 총량이 표시됩니다. 반물질로 직접 구매한 수량과 상위 차원이
생산한 수량을 합친 값입니다.
<br>
<br>
<b>구매한 차원:</b> 총 보유량 옆 괄호에는 다음 배율 상승을 향해 직접 구매한 수량이 표시됩니다. 예를 들어
(${formatInt(4)})라면 배율을 올리기 위해 그 차원을 ${formatInt(6)}개 더 구매해야 합니다.
<br>
<br>
<b>차원 성장률:</b> 각 차원이 초당 얼마나 증가하는지 나타냅니다. ${formatPercents(1)}는 해당 차원이 매초
두 배가 된다는 뜻이며, 전체 성장 속도를 판단하는 데 유용합니다.
<br>
<br>
<b>비용 및 ${formatInt(10)}개까지:</b> 비용 버튼이 활성화되면 반물질로 차원을 1개 구매할 수 있습니다.
"${formatInt(10)}개까지" 버튼이 활성화되면 다음 차원 배율에 도달하는 데 필요한 수량만큼 구매할 수 있습니다.
<br>
<br>
<b>모두 최대로:</b> 제1 반물질 차원을 더 살 수 없을 때까지 ${formatInt(10)}개 단위로 구매한 뒤 제2 차원부터
제8 차원까지 차례로 구매하고, 마지막으로 틱스피드 업그레이드를 최대한 구매합니다.
<br>
<br>
<b>차원 기본 가격:</b> ${Array.range(1, 8)
    .map(tier => format(AntimatterDimension(tier)._baseCost, 2, 2))
    .join(", ")}
<br>
<b>차원을 ${formatInt(10)}개 구매할 때의 기본 가격 상승 배율:</b> ${Array.range(1, 8)
  .map(tier => format(AntimatterDimension(tier)._baseCostMultiplier, 2, 2))
  .join(", ")}
<br>
<br>
<b>단축키: 1~8</b>은 해당 차원을 ${formatInt(10)}개 단위로 구매합니다. Shift를 누른 채 차원을 구매하면
${formatInt(10)}개 대신 ${formatInt(1)}개만 구매하며,
<b>${player.options.maxAllHotkey === "space" ? "Space" : "M"}</b>는 모두 최대로 구매합니다.
`,
      isUnlocked: () => true,
      tags: ["dims", "normal", "antimatter", "ad"],
      tab: "dimensions/antimatter"
    }, {
      name: "틱스피드",
      info: () => `
게임의 생산은 "틱"마다 일어나며 처음에는 1초에 한 번 발생합니다. 틱스피드 업그레이드를 구매하면 1초에
여러 틱이 발생하는 것처럼 반물질 차원의 생산 속도를 높일 수 있습니다.
<br>
<br>
<b>틱스피드:</b> 초당 발생하는 게임 틱 수입니다. 소수 부분도 계산되어 틱의 일부가 지난 만큼 생산량이
증가합니다. 실제 틱스피드 시간은 모의 계산되며 게임 계산 자체는 옵션에서 선택한 업데이트 주기로 실행됩니다.
<br>
<br>
<b>비용:</b> 초당 틱 수에 표시된 배율을 곱하는 데 필요한 반물질입니다.
(은하가 없으면 구매할 때마다 ${formatX(1.1245, 0, 3)})
<br>
<br>
<b>최대로 구매:</b> 현재 반물질로 살 수 있는 틱스피드 업그레이드를 최대한 구매합니다.
<br>
<br>
<b>단축키: T</b>는 틱스피드 업그레이드를 최대한 구매하고, <b>Shift+T</b>는 하나만 구매합니다.
<b>${player.options.maxAllHotkey === "space" ? "Space" : "M"}</b>는 모두 최대로 구매합니다.
`,
      isUnlocked: () => Tickspeed.isUnlocked,
      tags: ["dimension", "earlygame", "time"],
      tab: "dimensions/antimatter"
    }, {
      name: "차원 가속",
      info: () => `
<b>차원 가속:</b> 반물질과 모든 반물질 차원을 초기화하는 대신 구매할 수 있는 다음 반물질 차원을 해금하고
차원 배율을 높입니다. 첫 차원 가속에는 제4 차원 ${formatInt(20)}개, 두 번째에는 제5 차원 ${formatInt(20)}개가
필요합니다. ${formatInt(8)}개 차원을 모두 해금한 뒤에는 추가 부스트마다 이전보다 제8 차원이 ${formatInt(15)}개씩
더 필요합니다. 더 이상 차원을 해금하지는 않지만 차원 배율은 계속 증가합니다.
<br>
<br>
차원 가속 하나마다 제1 차원에 ${formatX(2)} 배율이 적용됩니다. 상위 차원으로 갈수록 적용 횟수가 한 번씩
줄어 최소 ${formatInt(0)}회가 됩니다. 예를 들어 부스트가 ${formatInt(3)}회라면 제1 차원은 ${formatX(8)}, 제2 차원은
${formatX(4)}, 제3 차원은 ${formatX(2)}를 얻고 나머지 차원은 영향을 받지 않습니다.
<br>
<br>
<b>단축키: D</b>는 차원 가속 구매를 시도합니다.
`,
      isUnlocked: () => true,
      tags: ["dimboost", "reset", "earlygame"],
      tab: "dimensions/antimatter"
    }, {
      name: "반물질 은하",
      info: () => `
반물질 은하를 구매하면 차원 ${formatInt(4)}개만 사용할 수 있는 상태로 게임이 초기화되지만, 처음 두 은하는
틱스피드 업그레이드의 효과를 각각 +${format(0.02, 0, 2)}만큼 높입니다. 은하가 늘어날수록 이 배율은 계속 강해집니다.
<br>
<br>
처음 몇 번의 틱스피드 구매에는 영향이 작지만 곱연산으로 적용되므로 곧 눈에 띄는 차이를 만듭니다.
<br>
<br>
첫 반물질 은하에는 제8 차원 ${formatInt(80)}개가 필요하며, 이후 은하마다 필요량이 ${formatInt(60)}개씩 증가합니다.
<br>
<b>먼 은하 스케일링:</b> 반물질 은하 ${formatInt(100)}개부터 은하 사이의 비용 증가량이 은하마다 ${formatInt(2)}씩
늘어 다음 은하는 ${formatInt(62)}개, 그다음은 ${formatInt(64)}개가 추가로 필요합니다.
<br>
<b>아주 먼 은하 스케일링:</b> 반물질 은하 ${formatInt(Galaxy.remoteStart)}개부터 먼 은하 스케일링에 더해
<i>총</i> 비용이 은하마다 ${formatPercents(0.002, 1)}씩 추가로 증가합니다.
<br>
<br>
<b>단축키: G</b>는 반물질 은하 구매를 시도합니다.
`,
      isUnlocked: () => true,
      tags: ["8th", "reset", "galaxy", "earlygame"],
      tab: "dimensions/antimatter"
    }, {
      name: "차원 희생",
      info: () => `
<b>다섯 번째 차원 가속 이후 차원 희생이 해금됩니다.</b>
<br>
<br>
희생하면 제8 차원을 제외한 모든 차원의 보유량이 즉시 0으로 초기화되지만 배율과 현재 비용은 줄어들지
않습니다. 그 대신 제8 차원 배율에 표시된 값을 곱합니다. 이전 생산량을 회복하는 데 시간이 걸리지만
결과적으로는 생산량이 증가합니다.
<br>
<br>
차원 희생 배율은 희생할 때 보유한 제1 차원 수에 따라 증가하며, 특정 도전과제와 도전을 완료하면 증가
공식을 강화할 수 있습니다. 배율은 희생 사이에 유지됩니다. 따라서 ${formatX(10)}에서 한 번, ${formatX(4)}에서
한 번 희생하는 것은 ${formatX(8)}과 ${formatX(5)}에서 희생하는 것과 같으며, 두 경우 모두 최종 희생 배율은
${formatX(40)}가 됩니다.
<br>
<br>
<b>단축키: S</b>는 차원 희생을 시도합니다.
`,
      isUnlocked: () => Sacrifice.isVisible,
      tags: ["8th", "reset", "earlygame", "gods", "earlygame"],
      tab: "dimensions/antimatter"
    }, {
      name: "도전과제",
      info: () => `
각 도전과제에는 해금 조건이 있으며, 일부 도전과제는 해금 시 보상을 제공합니다. 조건의 난이도와
보상이 주는 이점은 크게 다릅니다.
<br>
<br>
개별 도전과제의 고유 보상과 별도로, 도전과제 하나마다 모든 반물질 차원에 ${formatX(1.03, 2, 2)} 배율을
얻습니다. 한 줄을 모두 완료할 때마다 추가로 ${formatX(1.25, 2, 2)} 배율을 얻습니다. 모든 도전과제에서
얻는 총 배율은 도전과제 이미지 위에 표시됩니다.
<br>
<br>
비밀 도전과제는 게임 진행에 아무 이점도 주지 않으며 재미를 위한 요소입니다. 비밀 도전과제 위에
마우스를 올리면 달성 방법에 대한 힌트를 볼 수 있습니다.
`,
      isUnlocked: () => true,
      tags: ["earlygame", "awards", "earlygame"],
      tab: "achievements"
    }, {
      name: "무한",
      info: () => `
세계가 감당하기에는 너무 많은 반물질(${formatInt(2)}<sup>${formatInt(1024)}</sup>, 또는 약
${formatPostBreak(Number.MAX_VALUE, 6)}이며 "무한"이라고도 부릅니다)을 보유하면 강제로 “빅 크런치”를
수행합니다. 빅 크런치를 하면 반물질, 반물질 차원, 차원 가속, 반물질 은하가 초기화됩니다. 빅 크런치를
수행하는 것을 "무한하기"라고 부르기도 합니다.
<br>
<br>
나중에는 ${formatPostBreak(Number.MAX_VALUE, 6)}보다 큰 값에 도달할 수 있지만, 그전까지 이를 넘는 숫자는
${format(Infinity)}로 표시됩니다.
<br>
<br>
무한을 완료할 때마다 무한 포인트를 얻으며, 새로 생긴 무한 탭에서 업그레이드를 구매하는 데 사용할 수 있습니다.
이 업그레이드는 위에서 아래 순서로 구매해야 합니다. 또한 빅 크런치를 수행한 횟수를 나타내는 "무한"을
하나 얻습니다.
<br>
<br>
"모든 무한 포인트 획득량에 ${formatInt(2)}를 곱합니다" 업그레이드는 여러 번 구매할 수 있지만, 구매할
때마다 이전보다 ${formatInt(10)}배 많은 IP가 필요합니다. 이 업그레이드를 처음 구매하려면
"DLC 필요 없음" 도전과제를 완료해야 합니다.
<br>
<br>
<b>단축키: C</b>를 누르면 빅 크런치를 시도합니다.
`,
      isUnlocked: () => PlayerProgress.infinityUnlocked(),
      tags: ["crunch", "big", "upgrades", "ip", "reset", "prestige", "earlygame"],
      tab: "infinity/upgrades"
    }, {
      name: "일반 도전",
      info: () => `
첫 무한 이후 일반 도전이 잠금 해제됩니다. 일반 도전은 게임 메커니즘을 여러 방식으로 바꾸어 무한에 도달하기
더 어려운 환경을 만듭니다. 도전을 완료하려면 다시 ${formatPostBreak(Number.MAX_VALUE, 2)} 반물질에
도달해야 합니다.
<br>
<br>
일반 도전을 완료할 때마다 자동 구매기 또는 기존 자동 구매기를 업그레이드할 능력을 보상으로 얻습니다. 도전은
여러 번 진행할 수 있지만 보상은 처음에만 받을 수 있으며, “도전 나가기” 버튼으로 언제든 나갈 수 있습니다.
<br>
<br>
첫 무한은 첫 번째 일반 도전으로 간주되므로, 도전이 잠금 해제될 때 이미 완료된 상태입니다.
<br>
<br>
무한 업그레이드의 가장 오른쪽 열은 도전 안에서 작동하지 않습니다.
`,
      isUnlocked: () => PlayerProgress.infinityUnlocked(),
      tags: ["infinity", "autobuyer", "earlygame"],
      tab: "challenges/normal"
    }, {
      name: "자동 구매기",
      info: () => `
자동 구매기는 차원, 업그레이드 또는 프레스티지를 자동으로 구매합니다. 게임 후반에 해금되는 추가 자동
구매기를 포함한 모든 자동 구매기 설정은 "자동화" 탭의 "자동 구매기" 하위 탭에 있습니다.
<br>
<br>
반물질 차원 및 틱스피드 업그레이드 자동 구매기는 총 반물질량에 따라 해금되지만, 대부분의 다른 자동
구매기는 업그레이드를 구매하거나 도전을 완료해야 해금됩니다.
<br>
<br>
대부분의 자동 구매기에는 다음과 같은 공통 설정이 있습니다.
<br>
<br>
<b>자동 구매기 간격:</b> 자동 구매기가 다음 구매를 시도하기까지 기다리는 시간입니다. 반물질 차원 및
틱스피드 업그레이드 자동 구매기는 각각에 해당하는 도전을 완료해야 간격을 업그레이드할 수 있습니다.
<br>
<br>
<b>반물질 차원 자동 구매기 일괄 구매:</b> 자동 구매기 간격이 최솟값(${formatInt(100)}밀리초)에 도달한 뒤부터는
업그레이드할 때마다 한 틱에 구매할 수 있는 최대 수량이 두 배가 됩니다. 이 기능은 끌 수 있습니다.
<br>
<br>
<b>반물질 차원 자동 구매 수량:</b> 차원 자동 구매기는 차원 1개 또는 ${formatInt(10)}개 단위로 구매하도록 설정할
수 있습니다. 1개 구매로 설정하면 일괄 구매가 비활성화됩니다.
<br>
<br>
<b>틱스피드 자동 구매 수량:</b> 틱스피드 자동 구매기는 작동할 때마다 업그레이드 하나를 구매하도록 설정할 수
있으며, 틱스피드 도전(C9)을 완료한 뒤에는 가능한 만큼 최대로 구매하도록 설정할 수 있습니다.
<br>
<br>
<b>차원 가속 자동 구매 설정:</b> 구매를 시도할 최대 가속 횟수, 차원 가속을 항상 자동 구매하기 시작할
최소 반물질 은하 수, 그리고 해금 시 정확한 횟수의 차원 가속을 일괄 구매하도록 설정할 수 있습니다.
지정한 은하 기준에 도달하면 자동 구매기는 최대 가속 제한을 무시합니다.
<br>
<br>
<b>최대 은하:</b> 은하 자동 구매기가 구매할 최대 은하 수입니다.
<br>
<br>
<b>크런치 시 IP:</b> 무한 돌파 후 빅 크런치를 실행하기 전에 기다릴 IP를 설정할 수 있습니다.
<br>
<br>
<b>희생 자동 구매기:</b> 처음부터 간격이 최대로 강화되어 있어 매 틱 작동할 수 있습니다.
<br>
<br>
<b>동적 수량:</b> 업그레이드된 프레스티지 자동 구매기는 지정한 기준을 넘으면 프레스티지를 실행하는 모드를
가집니다. "동적 수량"을 켜면 해당 값에 배율을 적용하는 특정 업그레이드나 도전과제를 해금할 때 기준값도
자동으로 증가합니다.
<br>
<br>
<b>자동 구매기 일시정지/재개:</b> 켜져 있는 자동 구매기를 일시정지하거나 다시 작동시킵니다. 개별 자동
구매기 설정은 바꾸지 않으며 전체 전원 스위치처럼 작동합니다.
<br>
<br>
<b>모든 자동 구매기 켜기/끄기:</b> 모든 자동 구매기의 개별 설정을 한꺼번에 켜거나 끕니다.
<br>
<br>
<b>단축키: A</b>는 자동 구매기를 일시정지하거나 재개합니다. 또한 <b>Alt</b>를 누른 채 업그레이드, 차원 또는
프레스티지에 해당하는 단축키를 누르면 관련 자동 구매기를 켜거나 끕니다.
`,
      isUnlocked: () => true,
      tags: ["infinity", "automation", "challenges", "rewards", "interval", "earlygame"],
      tab: "automation/autobuyers"
    }, {
      name: "무한 돌파",
      info: () => `
무한을 돌파하면 더 이상 반물질이 ${formatPostBreak(Number.MAX_VALUE, 2)}로 제한되지 않으며, 빅 크런치를
할 때 보유한 반물질에 따라 크런치 한 번에 ${formatInt(1)}보다 많은 IP를 얻을 수 있습니다.
<br>
<br>
이제 ${formatPostBreak(Number.MAX_VALUE, 2)} 반물질에서 빅 크런치를 하면 약 ${format(1.78, 2, 2)} IP를
얻습니다. 보유 반물질이 ${formatPostBreak(Number.MAX_VALUE, 2)}배씩 늘어날 때마다 크런치로 얻는
IP에 ${formatInt(10)}을 곱하며, 이 효과는 연속적으로 적용됩니다. 모든 배율을 적용한 <i>뒤에</i>
가장 가까운 정수로 내림합니다.
<br>
<br>
모든 차원의 반물질 비용은 ${formatPostBreak(Number.MAX_VALUE, 2)}를 넘으면 더 빠르게 증가하기 시작합니다.
${formatPostBreak(Number.MAX_VALUE, 2)} 이후에는 <i>업그레이드마다</i> 업그레이드 <i>사이</i>의 비용 증가량이
${formatX(10)}씩 늘어나며, 틱스피드 업그레이드 비용에도 비슷한 스케일링이 적용됩니다.
`,
      isUnlocked: () => Autobuyer.bigCrunch.hasMaxedInterval || PlayerProgress.eternityUnlocked(),
      tags: ["limit", "crunch", "upgrades", "midgame"],
      tab: "infinity/break"
    }, {
      name: "무한 차원",
      info: () => `
<b>무한 차원 잠금 해제:</b> 일정량의 반물질에 도달하면 무한 차원이 잠금 해제됩니다.
<br>
<br>
<b>무한 차원 구매:</b> 무한 차원은 ${formatInt(10)}개 단위로만 구매할 수 있으며 무한 포인트가 필요합니다.
다른 차원과 비슷하게 구매할 때마다 영구 배율을 얻습니다. 실제로 적용되는 배율은 구매하는 무한 차원에 따라
다릅니다. <!-- Sorry Garnet :/ -->
<br>
<br>
<b>무한 차원 생산:</b> 반물질 차원과 마찬가지로 각 무한 차원은 바로 아래 단계의 무한 차원을 생산합니다.
<br>
<br>
빅 크런치를 할 때마다 생산된 무한 차원은 구매한 수량으로 초기화됩니다. 생산된 무한 차원은 크런치 사이에
유지되지 않지만, 구매로 얻은 모든 배율은 유지됩니다.
<br>
<br>
<b>무한 차원 잠금 해제 기준(반물질):</b> ${Array.range(1, 8)
    .map(tier => formatPostBreak(InfinityDimension(tier)._unlockRequirement))
    .join(", ")}
<br>
<b>무한 차원 구매 배율:</b> ${Array.range(1, 8)
    .map(tier => format(InfinityDimension(tier)._powerMultiplier))
    .join(", ")}
<br>
<b>무한 차원 기본 가격(IP):</b> ${Array.range(1, 8)
    .map(tier => format(InfinityDimension(tier)._baseCost))
    .join(", ")}
<br>
<b>무한 차원 가격 증가량:</b> ${Array.range(1, 8)
    .map(tier => format(InfinityDimension(tier)._costMultiplier))
    .join(", ")}
<br>
<br>
1번째 무한 차원은 반물질 대신 무한력을 생산합니다. 무한력은 모든 반물질 차원에
(무한력<sup>${formatInt(7)}</sup>)만큼의 배율을 제공합니다. 무한 차원은 틱스피드 업그레이드의 영향을
받지 않습니다.
`,
      isUnlocked: () => Autobuyer.bigCrunch.hasMaxedInterval || PlayerProgress.eternityUnlocked(),
      tags: ["id", "power", "new", "dims", "unlock", "break", "midgame"],
      tab: "dimensions/infinity"
    }, {
      name: "무한 도전",
      // This one could use some work!
      info: () => `
무한 도전은 일반 도전과 비슷하지만 최종 목표가 더 높고 대체로 더 어렵습니다. 자동 구매기만 잠금 해제하는
대신, 여러 생산 요소를 독특한 방식으로 강화합니다. 일반 도전과 마찬가지로 무한 도전에서는 무한 업그레이드의
가장 오른쪽 열이 비활성화됩니다.
<br>
<br>
한꺼번에 모두 잠금 해제되는 일반 도전과 달리, 각 무한 도전은 일정량의 반물질에 도달해야 시도할 수 있습니다.
<br>
<br>
<b>무한 도전 잠금 해제 기준:</b> ${GameDatabase.challenges.infinity
    .map(ic => formatPostBreak(ic.unlockAM)).join(", ")}
`,
      isUnlocked: () => Autobuyer.bigCrunch.hasMaxedInterval || PlayerProgress.eternityUnlocked(),
      tags: ["rewards", "break", "ic", "midgame"],
      tab: "challenges/infinity"
    }, {
      name: "복제자",
      info: () => `
복제자는 ${format(DC.E140)} IP에서 잠금 해제되는 또 다른 자원입니다. 다른 무언가를 생산하는 대신
복제자는 최대 ${formatPostBreak(Number.MAX_VALUE, 2)}까지 <i>자기 자신</i>을 생산합니다. 복제자는
틱스피드 업그레이드의 영향을 받지 않고 고유한 속도로 생산됩니다. 각 복제자는 복제자 틱마다 처음에는
${formatPercents(0.01)}의 확률로 새로운 복제자를 생산합니다. 복제자 틱은 처음에는 매초 발생하며, 확률과
간격 모두 IP를 사용해 업그레이드할 수 있습니다.
<br>
<br>
복제자 은하 업그레이드를 구매했다면 복제자 수를 ${formatInt(1)}로 초기화하는 대신 "무료" 복제자 은하를
얻을 수 있습니다. 이 은하는 반물질 은하처럼 작동하면서도 다음 반물질 은하의 비용을 높이지 않는다는 점에서
무료입니다. 다만 반물질 은하와 같은 요소들을 초기화합니다.
<br>
<br>
<b>단축키: R</b>을 누르면 복제자 은하 구매를 시도합니다.
<br>
복제자는 모든 무한 차원에 배율을 제공하며, 복제자가 ${formatPostBreak(Number.MAX_VALUE, 2)}일 때 최대
${formatX(Math.pow(2, 20), 2, 2)}에 도달합니다.
<br>
<br>
<b>확률 업그레이드 비용:</b> 기본 ${format(DC.E150)} IP, 비용 증가 ${formatX(DC.E15)} IP
<br>
<b>간격 업그레이드 비용:</b> 기본 ${format(DC.E140)} IP, 비용 증가 ${formatX(DC.E10)} IP
<br>
<b>은하 업그레이드 비용:</b> 기본 ${format(DC.E170)} IP이며, 비용은 ${formatX(DC.E25)} IP와
업그레이드당 추가 ${formatX(1e5)} IP만큼 증가합니다. 먼 반물질 은하와 비슷하게
스케일링됩니다. 복제자 은하가 ${formatInt(100)}개를 넘으면 업그레이드당 ${formatX(1e5)}가
${formatX(DC.E55)}로 바뀝니다. ${formatInt(1000)}개를 넘으면 스케일링이 제곱에서 세제곱으로 바뀌고,
${formatX(DC.E55)} 배율 자체도 업그레이드당 ${formatX(DC.E5)}씩 증가합니다.
`,
      isUnlocked: () => Replicanti.areUnlocked || PlayerProgress.eternityUnlocked(),
      tags: ["interval", "chance", "infinity", "galaxy", "galaxies", "midgame"],
      tab: "infinity/replicanti"
    }, {
      name: "영원",
      info: () => `
${formatPostBreak(Number.MAX_VALUE, 2)} IP에 도달하면 영원을 수행할 수 있습니다. 영원은 도전 시간,
도전과제, 통계 탭의 일반 영역에 있는 항목을 제외하고 지금까지의 모든 것을 초기화합니다. 첫 영원 이후 더 많은
콘텐츠를 이용할 수 있습니다.
<br>
<br>
처음 ${formatPostBreak(Number.MAX_VALUE, 2)} 반물질에 도달했을 때와 달리,
${formatPostBreak(Number.MAX_VALUE, 2)} IP를 넘어도 강제로 아무 행동도 하지 않습니다. 영원을
수행하기 전에 보유한 무한 포인트가 많을수록 더 많은 영원 포인트를 받습니다. 영원을 완료하면 "영원"도 하나
얻습니다.
<br>
<br>
EP 획득량은 무한 포인트 획득량과 비슷하게 증가하지만, 반물질 대신 무한 포인트를 기준으로 합니다.
${formatPostBreak(Number.MAX_VALUE, 2)} IP에서 얻는 기본 EP는 약 ${format(1.62, 2, 2)}이며, IP가
${formatPostBreak(Number.MAX_VALUE, 2)}배씩 늘어날 때마다 ${formatInt(5)}를 곱합니다. 항상 내림하므로
${formatPostBreak(Number.MAX_VALUE, 2)} IP에서는 EP ${formatInt(1)}개를 얻지만,
${formatPostBreak(DC.E349)} 전까지는 ${formatInt(2)} EP를 얻지 못합니다.
<br>
<br>
<b>단축키: E</b>를 누르면 영원 초기화를 시도합니다.
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ["eternal", "ep", "reset", "prestige", "midgame"],
      tab: "eternity/upgrades"
    }, {
      name: "영원 이정표",
      info: () => `
영원을 더 빠르고 편리하게 만들기 위해 "영원"을 더 많이 얻을수록 다양한 강화 효과가 잠금 해제됩니다.
대체로 영원 후 잃게 되는 특정 업그레이드를 보유한 채 시작하게 하거나, 자동화를 개선하는 새 자동 구매기를
제공하거나, 오프라인에서 감소된 속도로 자원을 자동 획득하게 합니다.
<br>
<br>
업그레이드를 제공하는 이정표는 영원을 처음 시작할 때 해당 업그레이드를 자동으로 구매하고 최대까지
업그레이드하므로, 실질적으로 영구 보유하게 됩니다.
<br>
<br>
새 자동 구매기는 자동 구매기 탭의 항목뿐 아니라 각각의 수동 버튼 옆에도 켜기/끄기 버튼이 생깁니다. 예를 들어
무한 차원 자동 구매기는 무한 차원 탭에서 찾을 수 있습니다. 차원 가속, 반물질 은하, 빅 크런치 자동 구매기의
개선 효과는 자동 구매기 탭에 이미 존재하는 항목을 갱신합니다.
<br>
<br>
자동 생산 이정표는 의도적으로 오프라인에서만 작동하며, 이정표 페이지에 안내된 대로 제대로 작동하려면
특정 자동 구매기 설정이 필요할 수 있습니다.
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ["eternities", "rewards", "automation", "midgame"],
      tab: "eternity/milestones"
    }, {
      name: "시간 차원",
      info: () => `
첫 영원 이후 시간 차원이 잠금 해제됩니다. 시간 차원은 영원 포인트로 구매하며, 틱스피드 업그레이드를 제공하는
시간 조각을 생산합니다. 이 틱스피드 업그레이드는 일반 틱스피드 업그레이드처럼 작동하지만 비용은 증가하지
않습니다. 시간 차원, 시간 조각, 여기서 제공하는 틱스피드 업그레이드는 무한 시 유지되지만 영원마다 초기화됩니다.
<br>
<br>
다른 차원과 마찬가지로 두 번째 시간 차원은 1번째 시간 차원을 생산하는 식으로 이어집니다. 무한 차원과
마찬가지로 영원할 때마다 생산된 수량은 구매한 수량으로 초기화되지만, 구매한 배율 업그레이드는 유지됩니다.
<br>
<br>
구매할 때마다 해당 시간 차원의 배율이 ${formatX(4)}만큼 증가합니다. 업그레이드 사이의 비용 배율에는 기본값이
있지만, ${format(TimeDimension(1)._costIncreaseThresholds[0], 2)} EP에서 ${formatX(1.5, 1, 1)},
${format(TimeDimension(1)._costIncreaseThresholds[1])} EP에서 기본값의 ${formatX(2.2, 1, 1)}만큼
증가합니다. 이 증가는 소급 적용되어 기준에 도달하는 순간 비용이 크게 뛰며, 처음 네 차원에만 적용됩니다.
${format(TimeDimension(1)._costIncreaseThresholds[2])} EP 이후에는 비용 증가 계산에서 차원 구매
한 번을 네 번의 구매로 취급하므로 가격이 훨씬 가파르게 상승합니다.
<br>
<b>시간 차원 기본 가격(EP):</b> ${Array.range(1, 8)
    .map(tier => format(TimeDimension(tier)._baseCost))
    .join(", ")}
<br>
<b>시간 차원 기본 가격 증가량:</b> ${Array.range(1, 8)
    .map(tier => format(TimeDimension(tier)._costMultiplier))
    .join(", ")}
<br>
<br>
다음 틱스피드 업그레이드를 얻기 위한 기준에는 이전보다 ${formatPercents(0.33)} 많은 시간 조각이 필요하며,
관련 시간 연구를 보유하면 이전보다 ${formatPercents(0.25)} 많은 시간 조각이 필요합니다. 업그레이드가
${formatInt(FreeTickspeed.softcap)}회를 넘으면 연속된 무료 틱스피드 업그레이드 사이의 배율이 업그레이드
${formatInt(50000)}회당 약 ${formatX(1.35, 0, 2)}의 속도로 서서히 증가합니다(업그레이드당
${formatX(1.000006, 0, 6)}).
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ["dims", "td", "shards", "eternity", "midgame"],
      tab: "dimensions/time"
    }, {
      name: "시간 연구",
      info: () => `
시간 연구는 영원 이후의 강력한 업그레이드로, 시간 정리라는 새 자원이 필요합니다. 시간 연구는 지금까지
게임에서 본 모든 요소의 생산량을 강화하거나 일부 공식의 작동 방식을 바꾸기도 합니다.
<br>
<br>
시간 정리는 구매할 때마다 비용이 증가하는 제한된 자원입니다. 반물질, 무한 포인트, 영원 포인트로 구매할 수
있으며 구매마다 비용에 일정한 배율이 적용됩니다. 시간 정리는 영원할 때 초기화되지 않습니다.
<br>
<br>
연구는 나무 형태로 배치되어 있으며 계속 진행하려면 선행 연구를 구매해야 합니다. 처음에는 맨 위의 연구만
구매할 수 있고, 이후 그 바로 아래에서 비용을 지불할 수 있는 연구를 구매할 수 있습니다. 다만 다음 세 가지
예외가 있습니다.
<br>
연구 사이의 선에 색이 있는 곳에서는 세 경로 중 하나만 선택할 수 있습니다.
<br>
영원 도전 연구가 경로를 막고 있다면, 해당 연구를 지나가기 위해 연결된 모든 도전을 적어도 한 번씩 완료해야
합니다. 경로를 이용할 때 도전 연구를 구매한 상태일 필요는 없습니다.
<br>
아래쪽에서 모든 경로가 다시 합쳐지는 곳에서는 각 연구 쌍 중 하나만 선택할 수 있습니다.
<br>
<br>
Shift를 누른 채 시간 연구를 클릭하면 해당 지점까지의 모든 연구를 구매할 수 있습니다. 함께 구매할 수 없는
둘 이상의 선택지 중 하나를 골라야 하는 위치의 연구를 Shift+클릭하거나, 해당 지점까지 필요한 연구를 전부
살 수 없다면 원하는 연구가 구매되지 않을 수 있습니다. Shift+클릭은 아래쪽으로 이동하기 전에 각 줄에서
가능한 한 많은 연구를 우선 구매합니다.
<br>
<br>
<b>프리셋:</b> 처음에 1부터 6까지 표시된 버튼을 사용하면 현재 연구 구성을 슬롯에 저장하여 나중에 한 번의
클릭으로 빠르게 다시 구매할 수 있습니다. 버튼에 마우스를 올리고 툴팁에서 슬롯을 불러오거나 저장할 수 있으며,
클릭하면 불러오고 Shift+클릭하면 저장합니다. 프리셋의 이름은 바꿀 수 있지만 여러 프리셋에 같은 이름을 붙일
수는 없습니다.
<br>
<br>
<b>연구 트리 불러오기/프리셋 편집:</b> 프리셋을 편집하거나 시간 연구 트리를 불러올 때, 모달에는 불러오면
구매될 시간 연구와 발생한 오류가 함께 표시됩니다. 분기 경로는 연구 묶음의 이름을 줄임말로 사용할 수 있습니다.
예를 들어 반물질 분기를 모두 구매하는 "71, 81, 91, 101"을 "antimatter"로 대체할 수 있습니다. 또한 시간
연구 문자열에 유효한 영원 도전이 있다면 문자열 끝에 "!"를 붙여 사용할 때 해당 영원 도전을 즉시 잠금
해제하고 진입하도록 시도할 수 있습니다.
<br>
<br>
<b>선호 설정:</b> 톱니바퀴 아이콘을 누르면 세 갈래 분기에서 선택할 "기본" 경로를 지정하는 창이 열립니다.
기본 경로를 선택하면 앞서 설명한 Shift+클릭 동작이 바뀌어, 트리 분기에서 완전히 멈추는 대신 선호 경로를
구매하고 계속 진행하려고 합니다. 관련 시간 연구를 구매했다면 이 창에서 차원 분기의 경로를 두 개 선택할 수
있습니다.
<br>
<br>
<b>재분배:</b> 트리에서 구매한 업그레이드를 초기화하고 사용한 시간 정리를 모두 돌려받습니다. 비용 없이 할
수 있지만 영원을 완료할 때만 적용되며, 영원 진행 중에는 시간 연구를 재분배할 수 없습니다.
<br>
<br>
<b>시간 정리 비용:</b>
<br>
<b>반물질:</b> 처음에는 ${format(DC.E20000)}, 정리당 ${formatX(DC.E20000)}
<br>
<b>무한 포인트:</b> 처음에는 ${formatInt(1)}, 정리당 ${formatX(DC.E100)}
<br>
<b>영원 포인트:</b> 처음에는 ${formatInt(1)}, 정리당 ${formatX(2)}
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ["eternity", "ts", "theorems", "tree", "study", "midgame"],
      tab: "eternity/studies"
    }, {
      name: "영원 도전",
      info: () => `
영원 도전은 시간 연구 트리에서 잠금 해제하는 또 다른 도전 묶음입니다. 일정량의 시간 정리와 도전을 잠금
해제할 때 달성해야 하는 보조 조건이 필요합니다.
<br>
<br>
영원 도전에 진입하면 일정한 목표 IP에 도달하는 것이 목표가 됩니다. 도전을 완료한 뒤에는 영원 도전
연구를 잠금 해제한 상태가 아니어도 보상이 적용됩니다. 보상은 시간 연구와 비슷하지만 효과를 유지하는 데 시간
정리를 사용할 필요가 없어 영구적이며, 대개 더 강력합니다.
<br>
<br>
한 번에 하나의 영원 도전만 잠금 해제할 수 있습니다.
<br>
<br>
각 영원 도전은 최대 다섯 번 완료할 수 있습니다. 완료할 때마다 보상이 강해지지만 다음 완료 목표도 증가합니다.
도전을 다시 잠금 해제하기 위한 보조 조건도 증가하지만 시간 정리 비용은 증가하지 않습니다.
<br>
<br>
영원 도전의 보조 조건을 달성하면 해당 영원 도전을 완료할 때까지 연구 조건에서 보조 조건이 제거됩니다. 즉,
보조 조건은 <i>한 번만</i> 달성하면 됩니다. 따라서 한 연구 구성으로 영원 도전을 잠금 해제한 뒤 다른 연구
구성으로 재분배하여 도전을 완료할 수 있습니다. EC11과 EC12는 예외로, 시간 연구를 재분배해도 차원 경로
제한이 유지됩니다.
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ["ec", "study", "time", "rewards", "completions", "midgame"],
      tab: "challenges/eternity"
    }, {
      name: "시간 팽창",
      info: () => `
EC11과 EC12 연구 아래에 있는 시간 팽창 잠금 해제 시간 연구를 구매하면 시간 팽창이 잠금 해제됩니다.
이 시간 연구를 구매하려면 연구에 도달할 수 있는 트리와 사용하지 않은 TT ${formatInt(5000)}개,
<i>총</i> TT ${formatInt(TimeStudy.dilation.totalTimeTheoremRequirement)}개가 필요하며, EC11과 EC12를
각각 다섯 번 완료해야 합니다.
<br>
<br>
시간을 팽창시키면 시간 팽창이라는 변형된 영원을 시작합니다. 이 안에서는 모든 반물질/무한/시간 차원 배율의
<i>지수</i>와 틱스피드 배율의 <i>지수</i>를 ${formatPow(0.75, 2, 2)}하여 크게 감소시킵니다. 이 팽창된
영원에서 ${formatPostBreak(Number.MAX_VALUE, 2)} IP에 도달해 완료하면 타키온 입자라는 새 자원을
보상으로 얻습니다.
<br>
<br>
원하는 만큼 팽창할 수 있지만 타키온 입자는 다른 자원처럼 "파밍"할 수 없습니다. 타키온 입자는 절대 줄어들지
않고 증가만 하며, TP 배율과 현재 팽창에서 얻은 반물질에 따른 상한까지만 증가합니다. 따라서 일반적으로
TP 배율을 얻거나 팽창 안에서 반물질을 크게 늘릴 수 있게 되기 전에는 TP를 늘릴 수 없습니다.
<br>
<br>
타키온 입자는 팽창된 시간이라는 또 다른 화폐를 생성합니다. 시간 차원에서 얻는 틱스피드 업그레이드와 비슷하게
일정 기준의 팽창된 시간에 도달하면 타키온 은하를 얻습니다. 타키온 은하는 반물질 은하처럼 틱스피드에 영향을
주지만 다음 반물질 은하의 비용을 높이지 않는다는 점에서 복제자 은하와 비슷합니다.
<br>
<br>
시간 팽창을 잠금 해제하면 팽창된 시간으로 구매하는 업그레이드도 잠금 해제됩니다. 팽창 업그레이드 첫 번째
줄의 첫 번째와 세 번째 업그레이드는 비용을 감당할 수 있는 만큼 반복 구매할 수 있습니다. 두 번째 업그레이드도
반복 구매할 수 있지만 결국 상한에 도달합니다.
`,
      isUnlocked: () => DilationTimeStudyState.studies[1].isBought || PlayerProgress.realityUnlocked(),
      tags: ["dial", "dt", "dilated", "tachyon", "particle", "study", "free", "galaxy", "galaxies", "midgame"],
      tab: "eternity/dilation"
    }, {
      name: "현실",
      info: () => `
${formatPostBreak(DC.E4000)} EP에 도달하고 도전과제의 첫 ${formatInt(13)}줄을 완료하면 현실을
해금하는 시간 연구를 구매할 수 있습니다. 해금하면 새 탭이 열리고 그곳에서 새 현실을 시작하는 버튼을
찾을 수 있습니다. 새 현실을 시작하면 지금까지 게임의 거의 모든 것이 초기화되지만, 그 대가로
리얼리티 머신이라는 새 화폐와 글리프, 특전 포인트를 얻습니다.
<br>
<br>
지금까지의 다른 초기화와 달리 도전과제의 첫 ${formatInt(13)}줄, 즉 현실 이전의 모든 도전과제와 관련
보상도 잃습니다. 다만 통계 탭의 일반 항목에 있는 모든 값과 각 도전의 최고 기록은 유지됩니다.
<br>
<br>
첫 현실을 완료하면 글리프 탭에 예정된 글리프 선택지를 바꾸지 않고 현재 현실을 다시 시작하는 버튼이
생깁니다. <b>이 방식으로 다시 시작하면 정상적으로 현실을 완료할 수 있는 상태여도 아무런 보상을 받지
못한다는 점에 유의하세요.</b>
<br>
<br>
각 도전과제의 보상을 다시 받으려면 조건을 다시 달성해야 합니다. 하지만 조건을 달성하지 않았더라도
${timeDisplayNoDecimals(30 * 60000)}마다 완료하지 않은 다음 도전과제가 자동으로 해금됩니다. 자동 완료 기능은
비활성화할 수 있습니다. 이 경우 타이머가 0까지 내려간 뒤 멈추며, 기능을 다시 활성화하면 즉시 다음
도전과제를 완료합니다. 오프라인에서도 타이머는 같은 속도로 진행됩니다.
<br>
<br>
리얼리티 머신은 현실 탭의 여러 업그레이드에 사용할 수 있으며, 이 시점부터 주요 화폐가 됩니다. 글리프는
장착해야 강화 효과를 사용할 수 있는 장비입니다. 특전 포인트는 특전 하위 탭의 여러 특전에 사용하는 또 다른
화폐입니다.
<br>
<br>
리얼리티 머신은 오직 EP에 따라 증가하며, 현실 버튼에는 다음 리얼리티 머신을 얻는 데 필요한
EP가 표시됩니다. 처음 ${formatInt(10)} RM은 ${formatPostBreak(DC.E4000)} EP와
${formatPostBreak(DC.C10P16000D3)} EP 사이에서 지수에 따라 선형으로 증가합니다. 그 이후에는
RM = ${formatInt(1000)}<sup>log<sub>${formatInt(10)}</sub>(EP)/${formatInt(4000)}-${formatInt(1)}</sup>입니다.
${formatPostBreak(DC.C10P16000D3)} EP 이후에는 이 공식으로 선형 증가보다 많은 RM을 얻습니다.
<br>
<br>
글리프 레벨은 영원 포인트, 복제자, 팽창된 시간을 조합한 값에 따라 증가하며 최소 레벨은 ${formatInt(1)}입니다.
글리프의 종류, 효과, 희귀도는 무작위로 정해집니다.
<br>
<br>
현실마다 정확히 ${formatInt(1)} 특전 포인트를 얻습니다.
<br>
<br>
<b>단축키: Y</b>를 누르면 현실 초기화를 시도합니다.
`,
      isUnlocked: () => PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought,
      tags: ["rm", "machines", "glyph", "perk", "reset", "prestige", "endgame", "lategame"],
      tab: "reality/upgrades"
    }, {
      name: "글리프",
      info: () => `
글리프는 장착할 수 있는 물체로 다음 네 가지 속성을 가집니다.
<br>
<b>종류</b> - 주로 강화하는 게임 요소에 따라 글리프에 붙는 이름입니다(예: "X 글리프"). 글리프가 가질 수
있는 효과가 이 속성으로 결정됩니다.
<br>
<b>레벨</b> - 글리프의 강도에 영향을 주며, 글리프를 얻은 현실에서 여러 자원을 얼마나 획득했는지에 따라
증가합니다.
<br>
<b>희귀도</b> - ${formatPercents(0)}에서 ${formatPercents(1)} 사이의 비율로, 글리프의 강도에도 영향을
줍니다. 무작위로 정해지지만 여러 업그레이드의 영향을 받을 수 있습니다. 이 비율은 실질적으로 품질을 나타내며
높을수록 좋습니다. 희귀도의 각 범위에는 일반, 고급 같은 이름이 붙습니다.
<br>
<b>효과</b> - 글리프를 장착했을 때 얻는 강화 효과이며, 최대 네 개까지 가질 수 있습니다. 레벨이나 희귀도가
높은 글리프는 일반적으로 약한 글리프보다 더 많은 효과를 가집니다.
<br>
<b>참고: 첫 글리프의 효과와 희귀도는 고정되어 있지만, 레벨은 현실 콘텐츠 이전의 진행도에 따라 증가합니다.
글리프를 받은 뒤에는 속성을 바꿀 수 없습니다.</b>
<br>
<br>
글리프를 장착하려면 보관함의 아이콘을 더블 클릭하거나 화면 가운데의 활성 원 중 하나로 드래그하세요. 장착한
글리프 아이콘은 원형으로 바뀌며 오른쪽 목록에 효과가 추가됩니다.
<br>
<br>
같은 효과를 가진 글리프를 여러 개 장착하면 효과가 결합됩니다. "+"가 붙은 효과는 일반적으로 값을 서로 더하고,
"×"가 붙은 효과는 일반적으로 값을 서로 곱합니다.
<br>
<br>
현실 도중 언제든 <i>빈</i> 활성 슬롯에 글리프를 장착할 수 있으며, 새 글리프의 효과가 즉시 적용됩니다.
이미 차 있는 슬롯으로 글리프를 드래그해 장착한 글리프를 바꿀 수도 있지만, 현재 현실이 다시 시작됩니다.
<br>
<br>
보관함의 첫 줄에 있는 슬롯은 "보호" 슬롯입니다. 보관함에 자리가 더 없어도 새 글리프가 이곳에 배치되지
않으며, 정렬 및 자동 정리 버튼의 영향도 받지 않습니다. 보관함에 새 글리프를 넣을 공간이 없으면 받을 글리프가
자동으로 삭제됩니다(잠금 해제했다면 희생됩니다).
<br>
<br>
보관함의 글리프를 Shift+클릭하면 정말 삭제할지 묻는 확인 창이 나타나고 글리프를 삭제할 수 있습니다.
Shift와 Ctrl을 함께 누른 채 클릭하면 확인 창을 건너뜁니다. <b>하지만 현실 업그레이드에서 글리프 희생을
잠금 해제하기 전에 글리프를 삭제하면 보관함 공간을 비우는 것 외에는 아무런 이득이 없습니다!</b>
<br>
<br>
글리프 희생을 잠금 해제하면 글리프 선택 모달이 나타나지 않도록 설정할 수 있습니다. 원한다면 현실 버튼을
Shift+클릭해 이 설정을 무시하고 현재 현실에서 모달을 강제로 다시 표시할 수 있습니다. 선택 모달을 끈 채
현실을 완료하면 선택지 중 무작위 글리프를 고릅니다.
<br>
<br>
모달 창 밖에서 원형 글리프 묶음을 클릭하면 해당 글리프와 여러 속성의 자세한 요약을 보여 주는 모달이 열립니다.
요약은 모든 글리프의 정보를 조금 더 짧은 설명과 함께 한꺼번에 보여 주어 다른 사람과 공유하기에 적합합니다.
통계 페이지의 글리프 기록, 장착 중인 글리프, 이번 현실에 예정된 글리프 선택에서 사용할 수 있습니다.
`,
      isUnlocked: () => PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought,
      tags: ["reality", "sacrifice", "level", "endgame", "lategame"],
      tab: "reality/glyphs"
    }, {
      name: "특전",
      info: () => `
특전은 현실 이후 잠금 해제되는 업그레이드의 한 종류입니다. 특전마다 효과는 다르지만 대부분 편의성을
개선하며, 원하는 경로를 직접 선택할 수 있습니다. 모든 특전은 구매하는 데 특전 포인트
${formatInt(1)}개만 필요합니다.
<br>
<br>
현실마다 특전 포인트 ${formatInt(1)}개를 얻어 트리의 업그레이드에 사용할 수 있으며, 처음에는
"이제 현실에서 글리프 ${formatInt(Perk.firstPerk.config.effect)}개 중 하나를 선택할 수 있습니다"에서
시작합니다. 이미 보유한 특전에 바로 인접한 특전만 잠금 해제할 수 있지만, 트리에는 어느 방향으로든 진행할 수
있는 순환 경로도 있습니다.
<br>
<br>
특전 노드는 원형과 마름모형 두 가지 모양이 있습니다. 둘의 유일한 차이는 마름모형 특전이 일반 효과와 함께
오토메이터 포인트도 제공한다는 것입니다. 노드마다 색도 다르며, 주로 게임의 어느 부분에 영향을 주는지 대략
나타냅니다.
`,
      isUnlocked: () => PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought,
      tags: ["pp", "reality", "tree", "endgame", "lategame"],
      tab: "reality/perks"
    }, {
      name: "오토메이터 개요",
      info: () => `
오토메이터 포인트를 총 ${formatInt(AutomatorPoints.pointsForAutomator)}개 모으면 오토메이터가 잠금 해제됩니다.
오토메이터 포인트는 여러 특전나 현실 업그레이드를 잠금 해제하거나, 블랙홀을 잠금 해제하거나, 단순히
현실을 더 많이 완료하면 얻을 수 있습니다.
<br>
<br>
오토메이터는 게임의 거의 모든 것을 자동화할 수 있는 스크립트 언어를 사용합니다. 화면은 두 영역으로 나뉩니다.
왼쪽 스크립트 영역에는 게임을 자동화할 명령을 입력하고, 오른쪽에는 오토메이터 소개 페이지에서 설명하는 여러
기능의 패널이 있습니다.
<br>
<br>
더 넓은 작업 공간이 필요하다면 오토메이터 문서 영역 오른쪽 위의 버튼을 눌러 전체 화면으로 확장할 수 있습니다.
영역 사이의 경계를 가로로 드래그해 크기를 조절하여 스크립트를 쓰거나 문서를 읽을 공간을 더 확보할 수도 있습니다.
<br>
<br>
스크립트 영역 오른쪽 위의 버튼을 누르면 오토메이터의 블록 편집기와 텍스트 편집기 모드를 전환할 수 있습니다.
프로그래밍에 익숙하지 않다면 블록 모드가 더 쉽게 느껴질 수 있습니다. 블록 모드에서 명령을 입력하려면 오른쪽의
명령 블록 영역을 선택한 뒤 해당 명령 상자를 스크립트 영역의 원하는 위치로 드래그해 놓으세요. 필요하면 블록을
드래그해 명령 순서를 자유롭게 바꿀 수 있습니다. 블록과 텍스트 모드를 전환하면 스크립트도 자동 변환을 시도하지만,
오류가 있다면 변환된 스크립트 일부가 사라질 수 있습니다.
<br>
<br>
전체 저장 파일과 마찬가지로 개별 오토메이터 스크립트도 게임에서 불러오거나 내보낼 수 있습니다. 올바른 형식의
스크립트 문자열 표식은 시작 <b>${GameSaveSerializer.startingString["automator script"]}</b>, 끝
<b>${GameSaveSerializer.endingString["automator script"]}</b>입니다. 이 형식이 아니라면 복사하고 붙여
넣는 과정에서 스크립트 일부가 빠진 것입니다. 불러온 스크립트는 새 슬롯에 저장되며 현재 스크립트는 사라지거나
덮어쓰이지 않습니다.
<br>
<br>
<b>단축키: U</b>를 누르면 오토메이터를 일시 정지하거나 재개합니다.
`,
      isUnlocked: () => Player.automatorUnlocked,
      tags: ["automation", "reality", "code", "script", "endgame", "lategame"],
      tab: "automation/automator"
    }, {
      name: "오토메이터 기술 정보",
      info: () => `
<b>기술적 제한</b>
<br>
<br>
지연을 줄이고 저장 파일이 지나치게 커지는 것을 막기 위해 스크립트에는 다음과 같은 제한이 있습니다.
<br>
- 개별 스크립트는 각각 최대 ${formatInt(AutomatorData.MAX_ALLOWED_SCRIPT_CHARACTERS)}자까지 작성할 수 있으며,
모든 스크립트를 합친 길이는 총 ${formatInt(AutomatorData.MAX_ALLOWED_TOTAL_CHARACTERS)}자를 넘을 수 없습니다.
<br>
- 스크립트 이름은 ${formatInt(AutomatorData.MAX_ALLOWED_SCRIPT_NAME_LENGTH)}자를 넘을 수 없습니다.
<br>
- 정의한 상수의 이름은 ${formatInt(AutomatorData.MAX_ALLOWED_CONSTANT_NAME_LENGTH)}자, 값은
${formatInt(AutomatorData.MAX_ALLOWED_CONSTANT_VALUE_LENGTH)}자를 넘을 수 없습니다.
<br>
- 스크립트는 총 ${formatInt(AutomatorData.MAX_ALLOWED_SCRIPT_COUNT)}개, 정의된 상수는
${formatInt(AutomatorData.MAX_ALLOWED_CONSTANT_COUNT)}개를 넘게 보유할 수 없습니다.
<br>
<br>
<b>스크립트 저장</b>
<br>
<br>
스크립트는 편집하는 동안 자동으로 저장되지만, 전체 자동 저장 타이머(즉 "마지막 저장 이후 시간")가 게임
전체를 저장하기 전까지는 게임 저장 파일에 반영되지 않습니다. 게임을 닫기 직전에 스크립트를 수정했다면 변경
사항을 잃지 않도록 그 이후 게임이 저장될 때까지 기다려야 합니다. 길이 제한을 넘긴 상태에서 한 편집 내용은
스크립트를 다시 제한 아래로 줄일 때까지 저장되지 않습니다.
<br>
<br>
<b>오토메이터 틱</b>
<br>
<br>
오토메이터의 "실행 타이머"는 현실 시간을 기준으로 하므로 블랙홀, 시간 글리프 효과, EC12의 부정적 효과에
영향받지 않습니다. 하지만 실행 타이머는 게임의 주 생산 반복과 완전히 독립적으로 작동하므로, 속도가 빠를 때는
한 생산 틱에 오토메이터 명령 여러 개를 실행할 수 있습니다.
<br>
<br>
일부 명령은 게임 내부 코드의 처리량이 많아 느린 컴퓨터에서는 오토메이터 틱 하나보다 처리 시간이 길 수
있습니다. 이 경우 오토메이터는 해당 명령을 실행한 뒤, 일정한 실행 속도라면 실행했어야 할 명령 수를 채울
때까지 다음 명령을 최대한 빠르게 실행하여 "따라잡기"를 시도합니다.
<br>
<br>
<b>오프라인 진행과의 상호작용</b>
<br>
<br>
오프라인 진행 시뮬레이션에서 생산 틱이 길어진다는 것은 모든 자원을 연속적으로 받는 대신 실질적으로 큰 덩어리로
받는다는 뜻입니다. 스크립트가 올바르게 작동하기 위해 게임 상태에 얼마나 의존하는지에 따라 오프라인에서의
동작에 좋지 않은 영향을 줄 수 있습니다. 또한 PAUSE 명령도 현실 시간을 기준으로 하므로 이상하게 작동할 수
있습니다.
`,
      isUnlocked: () => Player.automatorUnlocked,
      tags: ["automation", "reality", "code", "script", "endgame", "lategame"],
      tab: "automation/automator"
    }, {
      name: "블랙홀",
      info: () => `
블랙홀은 주기적으로 게임 진행 속도를 높이는 기능입니다. 게임이 일정 시간 정상 속도로 진행된 뒤 짧은 시간 동안
극도로 빠르게 진행되고, 다시 정상 속도로 돌아가 이 주기를 반복합니다.
<br>
<br>
블랙홀의 게임 속도 증가는 틱스피드보다 훨씬 강력합니다. 틱스피드와 달리 일부만 영향받는 요소(예: 무한/시간
차원), 일반적으로 전혀 영향받지 않는 요소(예: DT/TT 생성), 순수하게 경과 시간으로 강화되는
효과(예: 방치 경로의 IP/EP 배율)를 포함해 <i>모든 것에 똑같이</i> 영향을 주기 때문입니다.
<br>
<br>
게임의 대부분 기능은 증가한 게임 속도로 강화되지만 영향을 받지 않는 요소도 있습니다. 이런 경우 해당 시간이
<i>게임 시간</i>이 아니라 <i>현실 시간</i>이라고 명확히 표시됩니다. 시간이 지나면 영원 도전을 자동 완료하는
특전 묶음이 한 예입니다. 별도 표시가 없다면 이제부터 언급되는 모든 시간은 <i>게임 시간</i>이라고 보면 됩니다.
현실 업그레이드 "복제의 신속함"처럼 경과 시간이 <i>짧기를</i> 원하는 상황도 여기에 포함됩니다.
<br>
<br>
리얼리티 머신으로 블랙홀 업그레이드를 구매할 수 있습니다. 블랙홀에는 세 가지 업그레이드가 있습니다.
<br>
<b>간격</b> - 폭발적인 가속 사이에 블랙홀이 비활성화되는 시간으로, 업그레이드마다
${formatPercents(0.2)}씩 감소합니다.
<br>
<b>배율</b> - 일시적인 가속 중 게임이 얼마나 빠르게 진행되는지 나타내며, 업그레이드마다
${formatPercents(0.35)}씩 증가합니다.
<br>
<b>지속 시간</b> - 정상 속도로 돌아가기 전까지 가속이 지속되는 시간으로, 업그레이드마다
${formatPercents(0.3)}씩 증가합니다.
<br>
<br>
블랙홀을 잠금 해제한 뒤 <i>게임 시간</i>으로 ${formatInt(100)}일이 지나면 두 번째 블랙홀을 보유하게 하는
현실 업그레이드를 구매할 수 있습니다. 두 번째 블랙홀의 타이머는 첫 번째 블랙홀이 활성화된 동안에만
진행됩니다. 예를 들어 첫 번째 블랙홀의 지속 시간이 ${formatInt(4)}분이고 두 번째 블랙홀의 간격이
${formatInt(8)}분이라면, 첫 번째 블랙홀의 간격이 아무리 짧아도 두 번째 블랙홀은 첫 번째 블랙홀의 두 주기마다
한 번만 활성화됩니다. 게임 머리글의 타이머는 이를 반영해 두 번째 블랙홀이 활성화될 때까지의 실제 시간을
보여 줍니다. 블랙홀 탭에서는 두 번째 블랙홀이 활성화되는 데 필요한 첫 번째 블랙홀의 활성 시간을 볼 수 있습니다.
<br>
<br>
블랙홀이 전체 시간 중 적어도 ${formatPercents(0.9999, 2)} 동안 활성화되면 영구적으로 활성화됩니다.
두 블랙홀은 이 값을 따로 계산합니다.
<br>
<br>
오프라인에서도 블랙홀 주기는 정상적으로 진행되며, 게임을 켜 둔 것처럼 활성 속도 배율이 온전히 적용됩니다.
오프라인 시간은 활성 구간의 적은 틱 수가 주는 부정적 영향을 줄이기 위해 블랙홀의 비활성 및 활성 구간을 서로
다른 틱 길이로 시뮬레이션합니다. 자세한 기술 정보는 "오프라인 진행" 항목에서 볼 수 있습니다.
<br>
<br>
블랙홀을 일시 정지하면 간격/지속 시간 주기가 완전히 멈춥니다. 하지만 다시 시작하면 비활성 상태에서 최대
가속 속도에 도달하기까지 현실 시간으로 ${BlackHoles.ACCELERATION_TIME}초가 걸립니다. 가속 중에도 최대 속도로
작동하는 것처럼 주기는 계속 진행되므로, 일시 정지로 제어력을 조금 더 얻는 대신 일부 가속 시간을 잃게 됩니다.
<br>
<br>
일시 정지와 재개는 두 블랙홀에 모두 영향을 주며 따로 제어할 수 없습니다. 블랙홀 탭에서 관련 설정을 켜면
활성화되기 현실 시간 ${BlackHoles.ACCELERATION_TIME}초 전에 자동으로 일시 정지할 수 있습니다.
<br>
<br>
<b>업그레이드 비용 정보:</b>
<br>
<b>간격</b> - 기본 비용은 ${formatInt(15)} RM이며 업그레이드마다 ${formatX(3.5, 0, 1)}씩 증가합니다.
<br>
<b>배율</b> - 기본 비용은 ${formatInt(20)} RM이며 업그레이드마다 ${formatX(2)}씩 증가합니다.
<br>
<b>지속 시간</b> - 기본 비용은 ${formatInt(10)} RM이며 업그레이드마다 ${formatX(4)}씩 증가합니다.
<br>
<b>비용 스케일링 증가:</b> ${format(1e30)} RM 이후에는 구매 사이의 비용 배율이 업그레이드마다 덧셈으로
+${format(0.2, 0, 1)}씩 증가합니다. ${format(Number.MAX_VALUE, 1)} RM 이후에는 이전 동작을 모두 무시하는
새 스케일링이 적용됩니다. 이 시점부터 모든 업그레이드는 초기 비용이 ${format(DC.E310)}인 것처럼 작동하며,
이후 비용은 ${format(1e6)}, ${format(1e7)} 등으로 증가합니다(업그레이드 사이 ${formatX(10)}).
<br>
<b>블랙홀 2:</b> 모든 업그레이드의 초기 비용은 첫 번째 블랙홀보다 ${formatX(1000)} 높지만 비용 배율은 같습니다.
<br>
<br>
<b>단축키: B</b>를 누르면 블랙홀을 일시 정지하거나 재개합니다.
`,
      isUnlocked: () => player.blackHole[0].unlocked,
      tags: ["reality", "time", "speed", "duration", "interval", "rm", "endgame", "lategame"],
      tab: "reality/hole"
    }, {
      name: "셀레스티얼",
      info: () => `
현실 업그레이드를 모두 얻으면 첫 번째 셀레스티얼이 잠금 해제됩니다. 현실 탭 옆에 새 셀레스티얼 탭이
열립니다. 셀레스티얼 탭의 첫 하위 탭에는 게임 진행에 따라 갱신되는 "셀레스티얼 항해" 지도가 표시됩니다.
처음 잠금 해제했을 때는 지도 일부만 보이지만 새로운 콘텐츠에 가까워질수록 점차 드러나며, 일반적으로 다음
단계까지의 진행도가 시각적으로 표시됩니다.
<br>
<br>
각 셀레스티얼은 고유한 메커니즘과 업그레이드를 가지며, 게임을 완료하려면 일곱 셀레스티얼을 모두 쓰러뜨려야
합니다. 셀레스티얼을 잠금 해제하거나 쓰러뜨리는 조건은 각자의 메커니즘에 따라 다릅니다.
<br>
<br>
모든 셀레스티얼은 자신만의 셀레스티얼 현실을 가지지만, 이 현실이 해당 셀레스티얼과 게임의 나머지
부분에 어떤 관계를 가지는지는 셀레스티얼마다 다릅니다.
<br>
<br>
셀레스티얼은 시간을 초월한 존재입니다. 별도 설명이 없다면 셀레스티얼이 도입하는 새 메커니즘은 게임 속도
배율의 영향을 받지 않으며 게임 시간이 아닌 현실 시간을 기준으로 합니다.
`,
      isUnlocked: () => Teresa.isUnlocked,
      tags: ["reality", "challenges", "endgame", "lategame"],
      tab: "celestials/celestial-navigation"
    }, {
      name: "테레사, 현실의 셀레스티얼",
      alias: "테레사",
      info: () => `
테레사는 첫 번째 셀레스티얼입니다. 모든 현실 업그레이드를 얻어야 하는 도전과제 147을 달성하면 잠금
해제됩니다.
<br>
<br>
메인 화면에는 위에 "RM 붓기" 버튼이 있는 막대가 있습니다. RM을 용기에 넣어 리얼리티 머신 배율을 얻을 수
있습니다. 용기에 부은 RM은 되찾을 수 없습니다. 용기에 ${format(TeresaUnlocks.run.price)} RM이
모이면 테레사의 현실이 잠금 해제됩니다.
<br>
<br>
테레사의 현실을 완료하면
${Teresa.runCompleted
    ? "도전 중 얻은 반물질에 따라 글리프 희생에 배율이 적용됩니다"
    : "<div style='color: var(--color-bad);'>(보상을 보려면 테레사의 현실을 완료하세요)</div>"}.
테레사의 현실 완료는 이야기의 일부일 뿐이며, 진행하려면 계속 RM을 부어야 합니다. 용기에
${format(TeresaUnlocks.effarig.price)} RM을 채우면 다음 셀레스티얼이 잠금 해제됩니다.
<br>
<br>
${Teresa.runCompleted
    ? "테레사의 현실은 완료한 뒤에도 다시 진입할 수 있으며, 반복 도전에서 더 많은 반물질에 도달하면 " +
      "보상이 강해집니다."
    : "(추가 정보가 있습니다 - 테레사의 현실을 완료하세요)"}
`,
      isUnlocked: () => Teresa.isUnlocked,
      tags: ["rm", "endgame", "lategame", "perks", "sacrifice", "boo", "ghost", "celestial"],
      tab: "celestials/teresa"
    }, {
      name: "에파리그, 고대 유물의 셀레스티얼",
      alias: "에파리그",
      info: () => `
에파리그는 두 번째로 만나는 셀레스티얼입니다. 테레사의 용기에 적어도
${format(TeresaUnlocks.effarig.price)} RM을 부으면 잠금 해제됩니다.
<br>
<br>
에파리그는 현실에서 서로 다른 종류의 글리프 효과를 사용해 얻는 유물 파편이라는 화폐를 도입합니다.
현실 중 활성화된 고유 효과의 수가 유물 파편 획득량에 매우 큰 영향을 주며, EP도 훨씬 약하게
영향을 줍니다. 유물 파편은 에파리그 잠금 해제에 쓰이는 화폐이며, 이제부터 모든 현실에서 얻습니다.
<br>
<br>
유물 파편으로 글리프를 개선하고 완전 자동 현실에서 효과와 희귀도에 따라 글리프를 거르는 여러 업그레이드를
구매할 수 있습니다("고급 글리프 메커니즘" 참고).
<br>
<br>
에파리그의 마지막 잠금 해제 요소는 유물 파편 ${format(GameDatabase.celestials.effarig.unlocks.run.cost)}개에서
열리는 에파리그의 현실입니다.
${EffarigUnlock.run.isUnlocked
    ? "에파리그의 현실은 무한, 영원, 현실의 세 단계로 나뉩니다. 각 단계를 완료해야 다음 단계에 " +
      "진입할 수 있습니다. 에파리그의 영원을 완료하면 다음 셀레스티얼이 잠금 해제됩니다."
    : "<div style='color: var(--color-effarig--base);'>(자세한 내용을 보려면 에파리그의 현실을 잠금 해제하세요)</div>"
}
<br>
<br>
에파리그의 현실을 완료하면
${EffarigUnlock.reality.isUnlocked
    ? `새 글리프 종류인 <span style='color: var(--color-effarig--base);'>에파리그</span> 글리프가 잠금
      해제됩니다. 에파리그 글리프는 ${formatInt(7)}가지 효과를 가질 수 있으며 글리프 필터 설정에서 확인할 수
      있습니다. 한 번에 에파리그 글리프 하나만 장착할 수 있습니다.
${Ra.unlocks.glyphEffectCount.canBeApplied
    ? `라 안에서 에파리그가 레벨 10에 도달했으므로 에파리그 글리프에 나타나는 효과 제한이 사라집니다.
      이제 에파리그 글리프 하나에 ${formatInt(7)}가지 효과가 모두 동시에 나타날 수 있습니다.`
    : `에파리그 글리프는 최대 ${formatInt(4)}개의 효과만 가질 수 있으며, RM 배율과 글리프 불안정 효과는
      같은 글리프에 함께 나타날 수 없습니다.`}`
    : "<span style='color: var(--color-effarig--base);'>(보상 정보를 보려면 에파리그의 현실을 완료하세요)</span>"}
<br>
<br>
`,
      isUnlocked: () => TeresaUnlocks.effarig.canBeApplied,
      tags: ["glyph", "sacrifice", "shards", "reality", "spectralflame", "lategame", "endgame", "celestial"],
      tab: "celestials/effarig"
    }, {
      name: "고급 글리프 메커니즘",
      info: () => `
글리프 레벨 조정은 유물 파편 ${format(GameDatabase.celestials.effarig.unlocks.adjuster.cost)}개로 구매할 수
있습니다. EP, DT, 복제자, 영원이 현실에서 얻는 글리프의 레벨에 미치는 가중치를 각각
설정할 수 있습니다.
<br>
<br>
자동 글리프 필터는 유물 파편 ${format(GameDatabase.celestials.effarig.unlocks.glyphFilter.cost)}개로 구매할 수
있습니다. 여러 방식 중 하나를 사용해 글리프 선택지에 점수를 매긴 뒤 점수가 가장 높은 선택지를 고릅니다.
글리프를 고른 다음 점수를 기준값과 비교하여 기준보다 높으면 보관하고, 그렇지 않으면 희생합니다. 기본 모드는
세 가지입니다.
<br>
<b>가장 낮은 총 희생량:</b> 해당 글리프 종류의 희생 수치에 따라 점수를 매깁니다. 희생 수치가 가장 낮은
종류의 글리프가 가장 높은 점수를 받습니다. 이 모드에는 기준값이 없으며 글리프를 항상 희생합니다.
<br>
<b>효과 수:</b> 글리프가 가진 효과 수만큼 점수를 매기며, 여러 글리프의 효과 수가 같다면 희귀도가 높은
글리프를 고릅니다. 비교할 기준값은 텍스트 상자에 입력한 값으로 정합니다.
<br>
<b>희귀도 기준 모드:</b> 글리프의 희귀도 비율만큼 점수를 매깁니다. 비교 기준은 글리프 종류마다 따로 설정할
수 있습니다.
<br>
<br>
이와 함께 더 유연하게 설정할 수 있는 고급 모드가 두 가지 더 있습니다. 처음에는 필요하지 않을 수 있지만
나중에 유용할 수 있습니다.
<br>
<b>지정 효과 모드:</b> 글리프의 희귀도만큼 점수를 매겨 지정한 희귀도 기준과 비교하지만, 효과 입력값에 따라
점수가 변합니다. 글리프가 최소 효과 수와 선택한 효과를 모두 가졌는지 확인하고, 빠진 효과마다 점수를
${formatInt(200)}씩 낮춥니다. 따라서 원하는 효과가 없는 글리프는 반드시 기준보다 낮아집니다. 달성 불가능한
조건을 설정해 특정 글리프 <i>종류</i>를 금지할 수도 있습니다. 예를 들어 힘 글리프에 효과를 적어도
${formatInt(6)}개 요구하면 힘 글리프가 선택되지 않습니다.
<br>
<b>효과 점수 모드:</b> 글리프의 희귀도와 가진 효과 각각의 점수를 더해 점수를 계산하며, 기준과 각 효과의
값을 따로 설정할 수 있습니다. 활용 예시는 다음과 같습니다.
<br>
- 약한 효과에 ${formatInt(5)}의 값을 주면 그 효과가 없는 글리프도 더 높은 희귀도로 약함을 보완하는 한
보관할 수 있습니다.
<br>
- 원하지 <i>않는</i> 특정 효과에 큰 음수 점수를 주면 해당 효과를 가진 글리프가 선택되지 않습니다. 효과를
시험하거나 그 밖의 제한적인 상황에 유용합니다.
<br>
- 달성 불가능한 조건(예: 기준 점수 ${formatInt(999)}, 모든 효과의 값 ${formatInt(0)})을 설정하면 지정 효과
모드처럼 종류 전체를 금지할 수 있습니다.
<br>
<br>
글리프 필터 모드는 모든 글리프 종류에 한꺼번에 적용되는 전체 설정입니다. 예를 들어 힘 글리프에는 "희귀도
기준", 시간 글리프에는 "지정 효과"를 따로 적용할 수 없습니다. 모드를 하나 선택하면 올바르게 필터링하도록
설정 안에서 모든 글리프 종류를 구성해야 합니다. 각 필터 모드에는 고유한 설정이 있으며 다른 모드로 전환해도
유지됩니다.
<br>
<br>
글리프 필터를 잠금 해제하면 예정된 선택지 중 가장 높은 글리프 점수를 오토메이터에서 비교 가능한 화폐로 사용할
수 있습니다. 또한 현실 자동 구매기가 켜져 있고 예정된 선택지 중 필터가 보관할 글리프가 없다면, 가능한
즉시 현실을 강제로 수행하도록 필터를 설정할 수 있습니다.
<br>
<br>
글리프 프리셋은 유물 파편 ${format(GameDatabase.celestials.effarig.unlocks.setSaves.cost)}개로 구매할 수
있습니다. 현재 장착한 글리프를 묶음으로 저장하는 슬롯 ${formatInt(7)}개가 잠금 해제됩니다. 묶음을 덮어쓸
수는 없으므로 먼저 삭제해야 합니다. 묶음을 불러오면 안의 각 글리프를 찾아 장착합니다. 일부 글리프를 찾지
못하면 경고를 표시하지만 나머지는 모두 장착합니다. 묶음을 불러올 때 레벨 및/또는 희귀도를 구분하도록 설정할
수 있으며, 가능한 글리프 중 가장 좋은 글리프가 항상 장착됩니다. 다른 원형 글리프 묶음과 마찬가지로 하나를
클릭하면 전체 글리프 묶음을 요약하는 모달이 열립니다.
`,
      isUnlocked: () => EffarigUnlock.adjuster.isUnlocked,
      tags: ["glyph", "weight", "adjustment", "sacrifice", "filter", "threshold", "set", "save", "reality", "lategame",
        "endgame"],
      tab: "celestials/glyphfilter"
    }, {
      name: "이름 없는 자들, 시간의 셀레스티얼",
      alias: "이름 없는 자들",
      info: () => `
이름 없는 자들은 세 번째 셀레스티얼이며, 에파리그의 영원을 완료하면 해금됩니다.
<br>
<br>
이름 없는 자들을 해금하면 시간과 관련된 두 가지 새 메커니즘을 즉시 이용할 수 있습니다. 블랙홀을 충전해
“게임 시간”을 저장하고, 생산을 의도적으로 멈춰 “현실 시간”을 저장할 수 있습니다. 저장된 게임 시간은
이름 없는 자들의 해금 요소를 구매하는 화폐로도 사용됩니다.
<br>
<br>
블랙홀을 충전하면 게임 속도가 ${formatInt(1)}로 고정되는 대신 게임 시간을 저장합니다. 실질적으로 증가한
게임 속도를 사용해 게임 시간 자체를 저장하는 것입니다. 주된 용도는 블랙홀을 방출해 저장된 게임 시간만큼
시간을 건너뛰는 것입니다. 방출은 사용할 때 게임 속도 변경 효과의 영향을 받지 않고 저장할 때만 영향을
받는다는 점에서 일반적인 게임 속도 배율과 다릅니다.
<br>
<br>
현실 시간을 저장하면 모든 생산이 완전히 멈춰 게임이 사실상 일시 정지됩니다. 현실 시간으로 매초가 지날
때마다 효율 배율이 적용된 현실 시간을 저장합니다. 저장된 현실 시간은 글리프 탭에서 현실을 증폭하는 데
사용할 수 있습니다. 현실을 완료하면 저장된 현실 시간을 한꺼번에 사용해 똑같은 현실을 반복하며, 반복할 때
정상적으로 얻을 보상을 모두 받습니다. 예를 들어 ${formatInt(50)}분을 저장한 상태에서 ${formatInt(10)}분 동안
진행되어 ${format(DC.E30)} RM과 유물 파편 ${format(DC.E12)}개를 주는 현실을 증폭하면,
${format(5e30)} RM, 유물 파편 ${format(5e12)}개, 글리프 ${formatInt(5)}개(필터 설정 적용), 특전 포인트
${formatInt(5)}개를 얻습니다.
<br>
<br>
다만 현실의 지속 시간이 ${formatInt(1)}초보다 짧으면 증폭 배율은 저장한 초 단위 시간으로 제한됩니다.
예를 들어 ${formatInt(1000)}초를 저장한 상태에서 ${format(0.2, 2, 2)}초 동안 진행된 현실을 증폭하면,
${formatInt(200)}초를 사용해 현실 ${formatInt(1000)}회를 시뮬레이션합니다.
<br>
<br>
오프라인 시간을 저장된 현실 시간으로 자동 저장하는 설정을 켤 수 있습니다.
<br>
<br>
첫 해금에는 저장된 게임 시간
${format(TimeSpan.fromMilliseconds(ENSLAVED_UNLOCKS.FREE_TICKSPEED_SOFTCAP.price).totalYears)}년이 필요합니다.
시간 차원에서 얻는 틱스피드 업그레이드의 소프트캡(비용이 더 빠르게 증가하기 시작하는 지점)을
틱스피드 업그레이드 ${format(1e5)}회만큼 높입니다.
<br>
<br>
저장된 게임 시간이 ${format(TimeSpan.fromMilliseconds(ENSLAVED_UNLOCKS.RUN.price).totalYears)}년에 도달하면
이름 없는 자들의 현실을 해금할 수 있습니다. 현실 완료 보상은
${Enslaved.isCompleted
    ? "별도의 게임 방법 항목이 있는 테서랙트 해금입니다."
    : "<span style='color: var(--color-bad);'>(보상 정보를 보려면 이름 없는 자들의 현실을 완료하세요)</span>"}
<br>
<br>
이름 없는 자들은 다음 셀레스티얼을 직접 해금하지 않습니다.
`,
      isUnlocked: () => EffarigUnlock.eternity.isUnlocked,
      tags: ["reality", "time", "blackhole", "lategame", "endgame", "testers", "celestial",
        ...credits.people.map(p => p.name)
      ],
      tab: "celestials/enslaved"
    }, {
      name: "테서랙트",
      info: () => `
테서랙트는 이름 없는 자들의 현실을 완료하면 잠금 해제되는 새 자원입니다.
<br>
<br>
무한 차원은 일반적으로 총 구매 횟수가 ${format(InfinityDimensions.HARDCAP_PURCHASES)}회로 제한됩니다.
결국 더 이상 업그레이드할 수 없게 되어 배율의 성장에도 한계가 생깁니다. 테서랙트는 무한 포인트를 사용해
이 상한을 높입니다.
<br>
<br>
테서랙트 비용은 초지수적으로 증가하지만 이를 보완하도록 다음 테서랙트는 이전보다 훨씬 강력합니다. 테서랙트
수는 절대 초기화되지 않으므로 한 번 구매하면 이후 현실에서 높아진 상한을 이용하기 위해 해당 IP
비용에 다시 도달할 필요가 없습니다.
<br>
<br>
무한 차원 탭에서 현재 테서랙트 수와 다음 테서랙트 비용에 관한 추가 정보를 볼 수 있습니다. 이제 현재 무한
포인트에는 다음 테서랙트까지의 비율도 표시됩니다. 구매할 수 있다면 무한 버튼의 모습이 바뀌며, 클릭하면 무한
차원 탭으로 이동합니다.
`,
      isUnlocked: () => Enslaved.isCompleted,
      tags: ["reality", "lategame", "endgame", "tesseract", "id", "celestial"],
      tab: "celestials/tesseract"
    }, {
      name: "V, 도전과제의 셀레스티얼",
      alias: "V",
      info: () => `
V는 다른 셀레스티얼을 통해 잠금 해제되지 않는 특별한 셀레스티얼입니다. 대신 현재 무한에서 8번째 반물질
차원을 구매하지 않고 반물질 은하 ${formatInt(800)}개를 얻어야 하는 도전과제 ID 151(${formatInt(15)}번째 줄,
${formatInt(1)}번째 칸, "어차피 필요 없었잖아")을 완료하면 잠금 해제됩니다.
<br>
<br>
도전과제로 하위 탭을 잠금 해제하면 V를 완전히 잠금 해제하기 위한 또 다른 조건들이 나타납니다. 현실을
${formatInt(GameDatabase.celestials.v.mainUnlock.realities.requirement)}회 완료하고 사용하지 않은
${format(GameDatabase.celestials.v.mainUnlock.realityMachines.requirement)} RM을 보유해야 합니다. 또한 같은
현실에서 영원 ${format(GameDatabase.celestials.v.mainUnlock.eternities.requirement)}, 무한
${format(GameDatabase.celestials.v.mainUnlock.infinities.requirement)}, 팽창된 시간
${format(GameDatabase.celestials.v.mainUnlock.dilatedTime.requirement)}, 복제자
${format(GameDatabase.celestials.v.mainUnlock.replicanti.requirement)}에 도달해야 합니다.
<br>
<br>
모든 조건을 달성하면 V의 현실에 진입할 수 있습니다.
${VUnlocks.vAchievementUnlock.isUnlocked
    ? `하지만 현실 자체를 완료하는 것은 시작일 뿐입니다. V에게는 여섯 가지 조건이 있으며, 각각 V의
      현실 안에서 일정 수준까지 진행해야 합니다. 조건을 완료하면 V 도전과제를 보상으로 얻습니다.
      V 도전과제는 영구적이고 V의 현실을 나가도 유지되며, 모두 동시에 달성할 필요는 없습니다.
      <br>
      <br>
      조건을 완료하면 V 도전과제의 기준이 증가하며, 새 목표에 도달하면 다시 완료할 수 있습니다. 각 V
      도전과제 항목은 최대 여섯 번 완료할 수 있습니다. 완료한 V 도전과제에는 두 가지 효과가 있습니다.
      <br>
      - V 도전과제 총합이 일정 수에 도달하면 자원을 사용하지 않고 V 탭의 업그레이드가 자동으로 잠금
      해제됩니다.
      <br>
      - V 도전과제마다 공간 정리 하나를 얻습니다.
      <br>
      <br>
      V 도전과제 ${formatInt(2)}개로 잠금 해제되는 목표 감소 기능은 특전 포인트를 사용해 일부 V 도전과제의
      조건을 가장 쉬운 단계의 조건까지 낮출 수 있게 합니다. 목표 감소 비용은 사용할 때 증가하지 않으며 이후
      단계의 목표도 함께 감소시킵니다.
      <br>
      <br>
      공간 정리를 사용하면 개선된 IP 공식 이후 속도 분기의 여러 경로나 아래쪽 어둠/빛 쌍의 두 시간
      연구처럼 원래 함께 살 수 없는 시간 연구를 구매할 수 있습니다. 시간 정리와 마찬가지로 연구를 재분배할
      때마다 자유롭게 돌려받습니다. 공간 정리가 충분하면 결국 모든 시간 연구를 한꺼번에 구매할 수 있습니다!
      <br>
      <br>
      V 도전과제 ${formatInt(36)}개에 도달해 V의 도전과제를 모두 완료하면 다음 셀레스티얼이 잠금 해제됩니다.`
    : "<span style='color: var(--color-bad);'>(자세한 내용을 보려면 V의 현실을 잠금 해제하세요)</span>"}
`,
      isUnlocked: () => Achievement(151).isUnlocked,
      tags: ["reality", "lategame", "endgame", "girlfriend", "challenges", "achievement", "space", "theorems",
        "study", "triad", "celestial"],
      tab: "celestials/v"
    }, {
      name: "라, 잊힌 자들의 셀레스티얼",
      alias: "라",
      info: () => `
라는 다섯 번째 셀레스티얼이며, V의 도전과제를 모두 완료하면 잠금 해제됩니다. 라는 기억을 사용해 이전
셀레스티얼의 긍정적인 효과를 더 강한 모습으로 되돌립니다. 진행하면서 라 <i>안에서</i> 이전 네 셀레스티얼을
잠금 해제하며, 각 셀레스티얼은 원래 주제와 관련된 추가 업그레이드를 제공합니다.
<br>
<br>
라 안의 이전 셀레스티얼은 기억을 사용해 레벨을 올립니다. 기억은 시간이 지나면 기억 조각에서 자동으로
생성됩니다. 기억 조각은 라의 현실에 진입해야만 얻을 수 있으며, 현실 안에서는 특정 자원 총량에 따라
자동으로 생성됩니다. 현실 시간을 저장하는 동안에는 라의 현실 안에서 기억 조각을 얻지 못하지만 기억은
정상적으로 생성됩니다. 모든 셀레스티얼의 총레벨이 ${formatInt(Ra.remembrance.requiredLevels)}에 도달하면
회상이 잠금 해제되어, 라의 현실 안에서 더 많은 조각을 얻을 셀레스티얼 하나를 선택할 수 있습니다.
<br>
<br>
기억은 기억 조각 획득량 증가, 기억 획득량 증가, 셀레스티얼 레벨 상승의 세 가지 용도로 사용합니다. 라를
시작할 때는 테레사만 잠금 해제되어 있으며, 이전 셀레스티얼이 레벨 ${formatInt(8)}에 도달할 때마다 다음
셀레스티얼이 잠금 해제됩니다. 레벨 상한은 ${formatInt(25)}입니다.
<br>
<br>
테레사는 무한 업그레이드를 충전해 훨씬 강하게 만드는 능력을 잠금 해제합니다. 또한 글리프 희생 수치가 특정
기준에 도달하면 글리프 효과를 개선합니다.
<br>
<br>
레벨 ${formatInt(2)}에서 에파리그는
${Ra.unlocks.effarigUnlock.canBeApplied
    ? "글리프 연금술이라는 새 메커니즘을 잠금 해제합니다. 이후 에파리그 글리프를 강화하고 글리프 생성의 " +
      "무작위 요소를 거의 모두 서서히 제거합니다. 글리프 연금술에는 별도의 게임 방법 항목도 있습니다."
    : "<span style='color: var(--color-bad);'>(잠금 해제 정보를 보려면 라 안에서 에파리그를 잠금 해제하세요)</span>"}
<br>
<br>
이름 없는 자들은
${Ra.unlocks.enslavedUnlock.canBeApplied
    ? "블랙홀 충전과 관련된 추가 메커니즘을 잠금 해제하고 블랙홀을 크게 강화합니다."
    : "<span style='color: var(--color-bad);'>(잠금 해제 정보를 보려면 라 안에서 이름 없는 자들을 잠금 해제하세요)</span>"}
<br>
<br>
V는
${Ra.unlocks.vUnlock.canBeApplied
    ? "트리 아래쪽에서 공간 정리로 구매하는 새 연구인 삼원 연구를 잠금 해제합니다. 각 삼원 연구를 구매하려면 " +
      "주변의 세 연구도 보유해야 합니다. 또한 더 어려운 소규모 V 도전과제를 잠금 해제하여 추가 공간 정리를 " +
      "얻을 수 있게 합니다."
    : "<span style='color: var(--color-bad);'>(잠금 해제 정보를 보려면 라 안에서 V를 잠금 해제하세요)</span>"}
<br>
<br>
라는 다음 셀레스티얼을 직접 잠금 해제하지 않습니다.`,
      isUnlocked: () => VUnlocks.raUnlock.isUnlocked,
      tags: ["reality", "memories", "razenpok", "levels", "glyphs", "lategame", "endgame",
        "effarig", "teresa", "nameless", "v", "celestial"],
      tab: "celestials/ra"
    }, {
      name: "글리프 연금술 자원",
      info: () => `
글리프 연금술은 라 안에서 에파리그가 레벨 ${formatInt(2)}에 도달하면 잠금 해제되는 메커니즘입니다. 글리프를
종류와 연관된 연금술 자원으로 정제해 소모할 수 있게 합니다. 글리프 탭에서 희생 방식을 "항상 희생"이 아닌
것으로 설정한 뒤 일반적인 희생 절차를 수행하면 글리프를 정제할 수 있습니다. 각 연금술 자원에는 고유한 효과가
있으며 연금술 탭에서 확인할 수 있습니다.
<br>
<br>
이제 글리프에는 다른 모든 속성과 함께 관련 연금술 자원을 얼마나 얻는지 결정하는 <i>정제 수치</i>가 있습니다.
이 값은 글리프 레벨의 세제곱을 바탕으로 하며, 레벨 ${formatInt(10000)} 글리프가 연금술 자원
${formatInt(10000)}개에 해당하도록 조정됩니다. 다만 글리프 하나를 정제할 때는 이 값의
${formatPercents(GlyphSacrificeHandler.glyphRefinementEfficiency)}만 얻습니다. 이는 희귀도
${formatPercents(1)} 글리프를 기준으로 한 값입니다. 희귀도가 낮은 글리프도 상한은 같지만 그에 비례해 적은
자원을 줍니다. 예를 들어 희귀도 ${formatPercents(0.5)} 글리프는 절반만 줍니다.
<br>
<br>
연금술 자원은 무한히 얻을 수 없습니다. 자원마다 해당 종류에서 지금까지 정제한 글리프 중 가장 높은 정제 수치를
기준으로 하는 상한이 있습니다. 예를 들어 지금까지 정제한 시간 글리프의 최고 레벨이 ${formatInt(8000)}이고
정제 수치가 ${formatInt(GlyphSacrificeHandler.levelRefinementValue(8000))}이라면, 시간 글리프를 아무리 많이
정제해도 정제 수치가 더 높은 시간 글리프를 정제하기 전까지 시간 자원을
${formatInt(GlyphSacrificeHandler.levelRefinementValue(8000))}보다 많이 보유할 수 없습니다.
`,
      isUnlocked: () => Ra.unlocks.unlockGlyphAlchemy.canBeApplied,
      // Oh god I'm so sorry this is so many words
      tags: ["reality", "lategame", "endgame", "ra", "effarig", "alchemy", "power", "infinity", "time", "replication",
        "dilation", "cardinality", "eternity", "dimensionality", "inflation", "alternation", "synergism", "momentum",
        "decoherence", "force", "exponential", "uncountability", "boundless", "unpredictability", "multiversal",
        "reaction"],
      tab: "reality/alchemy"
    }, {
      name: "글리프 연금술 반응",
      info: () => `
연금술 자원을 특정 조합으로 결합해 새로운 복합 자원을 만들 수 있으며, 복합 자원은 에파리그의 특정 레벨에서
잠금 해제됩니다. 자원은 현실마다 한 번 결합되며 현실 시간 증폭의 영향을 받지 않습니다. 시약이 많을수록
반응의 수율이 높아져 더 빠르게 진행됩니다. 복합 자원의 상한은 모든 시약의 상한 중 가장 낮은 값과 같습니다.
반응이 일어나려면 모든 시약의 현재량이 생산할 자원의 현재량보다 많아야 합니다.
<br>
<br>
반응 속도는 반응에 사용할 수 있는 시약의 양에 비례하지만, 생산물의 양을 넘는 시약만 사용할 수 있습니다.
예를 들어 모든 시약을 ${formatInt(10000)}개, 생산물을 ${formatInt(7500)}개 보유했다면 시약
${formatInt(2500)}개만 반응 속도 계산에 사용됩니다. 생산물이 ${formatInt(0)}개라면 시약 <i>전체</i>를
반응에 사용할 수 있어 ${formatX(4)} 빠르게 생산합니다. 마지막으로 생산물이 ${formatInt(10000)}개라면
시약을 하나도 사용할 수 없어 반응이 전혀 진행되지 않습니다.
<br>
<br>
반응을 활성화하거나 비활성화하려면 반응의 생산물에 해당하는 원을 클릭하세요. 반응을 적용할 수 있으면 모든
시약에서 생산물로 이어지는 움직이는 선이 표시됩니다. 연결선이 실선이라면 해당 시약의 상한이 부족하여 생산물을
더 얻을 수 없으므로 반응을 진행할 수 없다는 뜻입니다.
`,
      isUnlocked: () => Ra.unlocks.unlockGlyphAlchemy.canBeApplied,
      tags: ["reality", "lategame", "endgame", "ra", "effarig", "alchemy", "power", "infinity", "time", "replication",
        "dilation", "cardinality", "eternity", "dimensionality", "inflation", "alternation", "synergism", "momentum",
        "decoherence", "force", "exponential", "uncountability", "boundless", "unpredictability", "multiversal",
        "reaction"],
      tab: "reality/alchemy"
    }, {
      name: "허수 머신",
      info: () => `
한 현실에서 리얼리티 머신을 적어도 ${format(MachineHandler.baseRMCap)}개 얻을 수 있게 되면 허수 머신이라는
새 자원을 얻는 능력이 잠금 해제됩니다. 리얼리티 머신에도 ${format(MachineHandler.baseRMCap)}의 하드캡이
생겨 이 제한을 넘어 더 얻을 수 없습니다.
<br>
<br>
현실 업그레이드와 비슷한 업그레이드 묶음이 있는 허수 업그레이드 탭도 잠금 해제됩니다. 각 업그레이드는
잠금 해제하기 위해 달성해야 하는 조건과 실제 구매에 필요한 허수 머신 비용이 있습니다. 처음 두 줄의
업그레이드는 반복 구매할 수 있고 나머지 세 줄은 한 번만 구매할 수 있습니다.
<br>
<br>
iM 보유량은 두 가지 요소의 영향을 받습니다.
<br>
<b>iM 상한</b> - 보유할 수 있는 iM의 최대량으로, RM 상한이 없었다면 얻을 수 있었던 최고 RM을 기준으로
합니다. 지속적으로 갱신되므로 상한이 없을 때의 기존 최고 RM을 넘는
즉시 증가합니다.
<br>
<b>현재 iM</b> - 시간이 지나면 현재 iM이 iM 상한을 향해 자동으로 증가하며, 상한에 가까워질수록
지수적으로 느려집니다. 기본적으로 iM은 <i>부족한</i> 양, 즉 상한에서 현재량을 뺀 값이 매분 절반으로 줄어드는
속도로 느려집니다. 이 성장 속도는 게임 속도 변경 효과의 영향을 받지 않습니다.
<br>
<br>
허수 머신 업그레이드는 마지막 두 셀레스티얼을 잠금 해제합니다.
`,
      isUnlocked: () => MachineHandler.isIMUnlocked,
      tags: ["imaginary", "machines", "reality", "lategame", "endgame"],
      tab: "reality/imag_upgrades"
    }, {
      name: "라이텔라, 차원의 셀레스티얼",
      alias: "라이텔라",
      info: () => `
라이텔라는 여섯 번째 셀레스티얼이며, iM ${format(ImaginaryUpgrade(15).cost)}개로 해당 허수 업그레이드를
구매하면 잠금 해제됩니다.
<br>
<br>
라이텔라는 암흑 물질이라는 새 화폐를 제공합니다. 지금까지 보유한 암흑 물질 최고량에 따라 연속체 효과에 배율을
제공합니다. 암흑 물질은 게임의 다른 차원 종류처럼 연쇄적인 방식으로 암흑 물질 차원이 생산합니다. 다른 차원과
달리 암흑 물질 차원은 여덟 개가 아니라 네 개뿐입니다. 처음부터 첫 번째 차원이 잠금 해제되어 있으며 상위 차원은
허수 업그레이드로 잠금 해제됩니다. 차원을 잠금 해제하면 해당 차원을 ${formatInt(1)}개 받으며, 바로 위 단계의
차원이 생산하기 전에는 더 얻을 수 없습니다.
<br>
<br>
각 암흑 물질 차원은 일정한 시간 간격마다 암흑 물질 또는 바로 아래 암흑 물질 차원과, 암흑 에너지라는 또 다른
자원까지 두 가지를 생성합니다. 간격당 암흑 물질과 암흑 물질 차원의 생산량은 암흑 물질 배율과 보유 차원 수를
곱한 값이며, 암흑 에너지 생산량은 차원 수와 무관합니다. 암흑 에너지는 별도의 게임 방법 항목이 있는 특이점을
생성하는 데 사용합니다.
<br>
<br>
암흑 물질 차원의 간격은 최소 ${formatInt(10)}ms까지 업그레이드할 수 있으며, 이 지점에서는 더 줄일 수
없습니다. 여기에 도달한 암흑 물질 차원을 승천시킬 수 있습니다. 처음에는 암흑 물질 획득량에
${formatInt(POWER_DM_PER_ASCENSION)}, 암흑 에너지 획득량에 ${formatInt(POWER_DE_PER_ASCENSION)}를 곱합니다.
간격에는 ${formatInt(1200)}을 곱하지만 다시 업그레이드할 수 있습니다. 다시 ${formatInt(10)}ms에 도달하면
원할 때 다시 승천할 수 있습니다.
<br>
<br>
허수 업그레이드로 소멸이라는 프레스티지를 잠금 해제할 수 있습니다. 소멸은 암흑 물질과 암흑 물질 차원을
초기화하지만, 모든 암흑 물질 차원에 적용되는 영구 암흑 물질 배율을 더합니다. 여러 번 소멸할 수 있으며 배율
증가량은 덧셈으로 중첩되므로 매번 더 큰 증가량에서 소멸할 필요는 없습니다. 소멸하려면 암흑 물질을 적어도
${format(Laitela.annihilationDMRequirement)}개 보유해야 합니다.
<br>
<br>
라이텔라에게는 현실에서 거둔 성과에 따라 암흑 물질 차원의 암흑 물질 생산력에 배율을 제공하는 현실이
있습니다. 현실을 ${formatInt(30)}초 안에 완료할 때마다 이후 현실 시도에서 사용할 수 있는 가장 높은
차원이 영구적으로 비활성화됩니다. ${formatInt(30)}초 안에 현실을 여덟 번 완료해 모든 차원을 비활성화하면
암흑 에너지 획득량에 ${formatX(8)} 배율도 얻습니다.
<br>
<br>
라이텔라는 다음 셀레스티얼을 직접 잠금 해제하지 않습니다.
`,
      isUnlocked: () => Laitela.isUnlocked,
      tags: ["omsi", "reality", "dark", "matter", "dimensions", "lategame", "endgame", "ascend", "celestial"],
      tab: "celestials/laitela"
    }, {
      name: "연속체",
      info: () => `
라이텔라를 잠금 해제하면 반물질 차원과 틱스피드 업그레이드가 연속체라는 새 생산 모드로 전환됩니다. 이전과
같은 효과를 제공하지만 차원이나 틱스피드 업그레이드의 일부만 구매할 수 있습니다. 이 소수 단위 구매는 반물질을
사용하지 않고 무료로 주어지며 그에 맞는 배율 일부를 제공합니다.
<br>
<br>
반물질 차원과 틱스피드 업그레이드의 구매 버튼은 연속체가 비활성화되었을 때 구매할 수 있는 업그레이드 수를
표시하도록 바뀌며, 구매 횟수는 반물질에 따라 부드럽게 증가합니다. 예를 들어 반물질 ${format(2e7)}을
보유하면 틱스피드의 연속체 값은 ${format(5.3, 0, 1)}가 됩니다. 틱스피드는 초기 비용이 ${format(1e3)}이고
${formatX(10)}씩 증가하여 ${formatInt(5)}번 구매할 수 있으며 다음 구매까지 약 ${formatPercents(0.3)}만큼
진행했기 때문입니다. 이 경우 틱스피드 연속체는 (업그레이드 배율)<sup>${format(5.3, 0, 1)}</sup>만큼 생산량을
강화합니다.
<br>
<br>
일부 업그레이드는 연속체 값에 직접 배율을 적용하여 비용 스케일링에 영향을 주지 않고 생산량을 강화합니다.
하지만 자동 구매기 페이지에서 연속체를 비활성화하면 이 업그레이드가 작동하지 않아 생산량이 감소할 수 있습니다.
연속체가 반물질 차원과 틱스피드 자동 구매기를 쓸모없게 만들므로, 연속체가 활성화된 동안에는 해당 자동 구매기의
관련 설정이 모두 그 탭에서 숨겨집니다.
`,
      // Apparently continuumUnlocked is really important in a lot of places and if we keep it unlocked
      // Things break, so we check for the iMU instead.
      isUnlocked: () => ImaginaryUpgrade(15).isBought,
      tags: ["continuum", "purchase", "reality", "lategame", "endgame"],
      tab: ""
    }, {
      name: "특이점",
      info: () => `
특이점은 라이텔라의 기능을 이용해 얻는 새 자원입니다.
<br>
<br>
특이점을 얻으려면 암흑 에너지 ${format(200)}에 도달해야 합니다. 도달하면 모든 암흑 에너지를 특이점 하나로
응축하고 영으로 초기화하는 선택지가 생깁니다. 이 값을 넘는 추가 암흑 에너지는 이월되지 않고 사라집니다.
특이점을 응축할 때는 암흑 에너지만 초기화되고 암흑 물질과 암흑 물질 차원의 상태는 그대로 유지됩니다.
<br>
<br>
특이점 ${formatInt(10)}개에 도달하면 특이점 응축에 필요한 암흑 에너지를 ${formatInt(10)}배 단위로 자유롭게
높이거나 낮출 수 있습니다(최소 ${format(200)}). 이에 따라 상한에서 초기화할 때 얻는 특이점 수가
${formatInt(10)}배보다 <i>더 크게</i> 증가하거나 감소하므로, 기다릴 수 있다면 높은 상한이 더 효율적입니다.
<br>
<br>
특이점의 목적은 영원 이정표와 비슷하게 작동하는 특이점 이정표를 잠금 해제하는 것입니다. 이정표를 잠금
해제하려면 지정된 총 특이점 수에 도달하기만 하면 되며 특이점은 소모되지 않습니다. 이정표는 한 번만 해금되는
것, 제한된 횟수만큼 반복할 수 있는 것, 무한히 반복할 수 있는 것의 세 종류입니다.
<br>
<br>
종류와 별개로 각 이정표에는 일반적으로 어떤 업그레이드를 제공하는지 나타내는 아이콘도 있습니다.
<br>
<b>ᛝ</b> 라이텔라 전용 메커니즘을 돕는 이정표
<br>
<i class="fas fa-arrows-alt"></i> 라이텔라의 자원이 게임의 나머지 부분에 영향을 주게 하는 이정표
<br>
<i class="fas fa-compress-arrows-alt"></i> 라이텔라 외부의 요소를 바탕으로 라이텔라를 개선하는 이정표
`,
      isUnlocked: () => Laitela.isUnlocked,
      tags: ["reality", "lategame", "endgame", "laitela", "dark"],
      tab: ""
    }, {
      name: "펠레, 반물질의 셀레스티얼",
      alias: "펠레",
      info: () => `
마지막 허수 업그레이드를 구매해 펠레를 잠금 해제하면 펠레 탭이 열리며, "현실을 파멸시키세요" 버튼을 찾을
수 있습니다. 현실을 파멸시키려면 이 시점에 이용할 수 있는 도전과제 ${formatInt(17)}줄을 모두 완료하고 각
연금술 자원을 ${formatInt(25000)}개씩 보유해야 합니다.
<br>
<br>
${Pelle.isDoomed
    ? `현실을 파멸시키면 새로운 <b>파멸한 현실</b>을 시작하며, 현실까지 게임의 거의 모든 것이
      초기화되고 현재 현실의 진행도에서는 아무런 보상도 받지 못합니다.
      <br>
      <br>
      파멸한 현실에 진입하면 통계 탭의 일반 및 현실 제목 아래에 있는 모든 값과 각 도전의 최고 기록이
      유지됩니다. 파멸한 현실 안에서는 여러 업그레이드, 시간 연구, 도전 및 셀레스티얼 보상, 특전과 그 밖의
      게임 메커니즘이 비활성화되거나 보상을 제공하지 않습니다. 자세한 내용은 펠레 탭의 "파멸한 현실의 효과
      보기"에서 확인할 수 있습니다.
      <br>
      <br>
      잔재는 아마겟돈 초기화에서 얻는 새 화폐입니다. 잔재 획득량은 모든 파멸한 현실에서 기록한 역대 최고
      반물질, 무한 포인트, 영원 포인트를 기준으로 합니다. 잔재는 펠레 업그레이드에 사용할 수 있는 현실 파편을
      생산합니다.
      <br>
      <br>
      펠레 업그레이드는 두 범주로 나뉩니다. 첫 줄의 다섯 업그레이드는 반복 구매할 수 있지만 결국 상한에
      도달합니다. 게임의 여러 요소를 강화하여 파멸한 현실 안의 진행을 더 쉽게 만듭니다.
      <br>
      <br>
      아래쪽 줄의 나머지 업그레이드는 자동화와 편의성 개선을 제공합니다. 이 업그레이드에서 잠금 해제하는
      모든 요소는 게임의 일반적인 방법으로 잠금 해제할 수 없습니다. 예를 들어 자동 구매기는 펠레 업그레이드
      뒤에 잠겨 있으므로 일반 도전을 완료해도 자동 구매기가 잠금 해제되지 않습니다. 업그레이드 위의 버튼으로
      구매한 업그레이드를 숨기거나 <i class="fas fa-compress-arrows-alt"></i> 아이콘을 눌러 패널 전체를
      접고 숨길 수 있습니다.
      <br>
      <br>
      <b>단축키: Z</b>를 누르면 아마겟돈 초기화를 시도합니다.`
    : "<span style='color: var(--color-bad);'><b>이 항목의 나머지를 읽으려면 현실을 파멸시켜야 합니다.</b></span>"
}
`,
      isUnlocked: () => Pelle.isUnlocked,
      tags: ["reality", "antimatter", "lategame", "endgame", "final", "hevipelle", "celestial", "doom"],
      tab: "celestials/pelle"
    }, {
      name: "펠레 타격",
      info: () => `
펠레 타격은 파멸한 현실의 여러 사건에서 발생합니다. 파멸한 현실 안에서 처음으로 무한에 도달해 첫 번째 펠레
타격을 만났습니다. 더 진행하면 추가 타격이 발생합니다. 각 펠레 타격은 게임의 특정 요소를 약화하며, 타격
이름을 클릭해 확인할 수 있습니다. 각 펠레 타격은 균열 막대도 잠금 해제합니다.
<br>
<br>
균열 막대를 클릭하면 "대기"와 "채우는 중" 상태를 전환해 채울 수 있지만, 동시에 "채우는 중"일 수 있는
균열은 두 개뿐입니다. 활성화된 균열은 매초 해당 균열의 자원 ${formatInt(3)}%를 소모합니다. 각 균열은 지금까지
채운 총량을 바탕으로 고유한 효과를 제공합니다.
${PelleStrikes.eternity.hasStrike
    ? `쇠퇴/붕괴/혼란은 예외로, 복제자를 총 ${formatPostBreak(DC.E2000)}만큼 소모하면 효과가 상한에
    도달합니다.`
    : ""}
또한 각 균열을 일정 비율까지 채우면 세 가지 이정표 보상을 얻습니다.
`,
      isUnlocked: () => PelleStrikes.infinity.hasStrike,
      tags: ["reality", "antimatter", "lategame", "endgame", "final", "pelle", "strike", "rift", "celestial"],
      tab: "celestials/pelle"
    }, {
      name: "은하 생성기",
      info: () => `
재귀/분산/파괴가 ${formatInt(100)}%에 도달하면 은하를 자동으로 생성하는 <b>은하 생성기</b>를 잠금
해제합니다. 생성된 은하는 반물질 은하처럼 틱스피드에 영향을 주면서도 다음 반물질 은하의 비용을 높이지 않는다는
점에서 복제자 은하 및 타키온 은하와 비슷합니다. 새 업그레이드 다섯 개도 잠금 해제됩니다. 첫 업그레이드는
생성되는 은하의 기본량을 늘리고 나머지 네 업그레이드는 이 기본량에 배율을 제공합니다. 처음 두 업그레이드는
반물질과 생성된 은하를 사용해 구매할 수 있습니다. 복제자 은하나 타키온 은하는 이 업그레이드 구매에 사용할
수 없습니다.
<br>
<br>
<b>은하 생성기</b>에는 생성할 수 있는 은하의 최대 수가 있으며, 현재 상한에 도달한 뒤 균열을 소모해야만
높일 수 있습니다.`,
      isUnlocked: () => Pelle.hasGalaxyGenerator,
      tags: ["reality", "antimatter", "lategame", "endgame", "final", "pelle", "galaxy",
        "galaxies", "generator", "celestial"],
      tab: "celestials/pelle"
    }
  ]
};

(function() {
  for (let i = 0; i < h2p.tabs.length; i++) {
    const tab = h2p.tabs[i];
    tab.id = i;
    if (tab.alias === undefined) tab.alias = tab.name;

    tab.searchTermsRelevance = {};
  }

  const searchIndex = {};

  const addTerm = (term, tab) => {
    let entry = searchIndex[term];
    if (entry === undefined) {
      entry = [];
      searchIndex[term] = entry;
    }
    if (entry.includes(tab)) return;
    entry.push(tab);
  };

  const addWord = (word, tab) => {
    const lowerCase = word.toLowerCase();
    for (let i = 0; i < lowerCase.length; i++) {
      const term = lowerCase.slice(0, i + 1);
      addTerm(term, tab);
      if (tab.searchTermsRelevance[term] === undefined) {
        tab.searchTermsRelevance[term] = ((i + 1) / lowerCase.length) ** 0.65;
      } else {
        tab.searchTermsRelevance[term] = Math.max(tab.searchTermsRelevance[term], ((i + 1) / lowerCase.length) ** 0.65);
      }
    }
  };

  const addPhrase = (phrase, tab) => {
    addWord(phrase, tab);
    for (const part of phrase.split(" ")) {
      addWord(part, tab);
    }
  };

  for (const tab of h2p.tabs) {
    addPhrase(tab.name, tab);
  }
  for (const tab of h2p.tabs) {
    for (const tag of tab.tags) {
      addPhrase(tag, tab);
    }
  }
  for (const tab of h2p.tabs) {
    addPhrase(tab.alias, tab);
  }

  const map2dToObject = function(arr, keyFun, valueFun) {
    const out = {};
    for (let idx1 = 0; idx1 < arr.length; idx1++) {
      for (let idx2 = 0; idx2 < arr[idx1].length; idx2++) {
        out[keyFun(arr[idx1][idx2], idx1, idx2)] = valueFun(arr[idx1][idx2], idx1, idx2);
      }
    }
    return out;
  };

  // Very suboptimal code coming up. If anybody has a better solution, PLEASE, implement it.
  const keyboardify = keybrd => map2dToObject(keybrd.split(",").map(str => str.split("")),
    key => key, (_key, x, y) => ({ x, y }));

  const qwerty = keyboardify(`1234567890,qwertyuiop,asdfghjkl,zxcvbnm`);
  const qwertz = keyboardify(`1234567890,qwertzuiop,asdfghjkl,yxcvbnm`);
  const azerty = keyboardify(`1234567890,azertyuiop,qsdfghjklm,wxcvbn`);
  const dvorak = keyboardify(`1234567890,'<>pyfgcrl,aoeuidhtns,;qjkxbmwvz`);
  const colemak = keyboardify(`1234567890,qwfpgjluy,arstdhneio,zxcvbkm`);
  const workman = keyboardify(`1234567890,qdrwbjfup,ashtgyneoi,zxmcvkl`);
  const qwprf = keyboardify(`1234567890,qwprfyukl,asdtghnioe,zxcvbjm`);

  const keyboards = [qwerty, qwertz, azerty, dvorak, colemak, workman, qwprf];

  const keyboardDist = function(a, b, keyboard) {
    const aPos = keyboard[a], bPos = keyboard[b];
    if (!aPos || !bPos) return 100;
    return Math.max(Math.abs(aPos.x - bPos.x), Math.abs(aPos.y - bPos.y));
  };

  // I copied this code based on OSA distance off wikipedia, with a few added changes.
  // The cost for "substitution" (third item of the first Math.min) is replaced from a static value
  // to a function which roughly estimates how likely the user is to mispress the key based on its
  // minimum distance from several common keyboard layouts.
  // I have no idea how the actual "distance" calculation works but as long as it does don't touch it.
  const howBadlyTypoedWithKeyboard = function(a, b, keyboard) {
    // If they're the same, skip all calculations
    if (a === b) return 0;
    const aLen = a.length;
    const bLen = b.length;
    // If they're way too different, don't bother
    if (Math.abs(aLen - bLen) > 3) return 100;
    // 2d Array with dimensions aLen + 1 x bLen + 1
    const d = new Array(aLen + 1).fill(0).map(() => new Array(bLen + 1).fill(0));

    for (let i = 0; i <= aLen; i++) {
      d[i][0] = i;
    }
    for (let i = 0; i <= bLen; i++) {
      d[0][i] = i;
    }

    for (let i = 1; i <= aLen; i++) {
      for (let j = 1; j <= bLen; j++) {
        const distance = keyboardDist(a[i - 1], b[j - 1], keyboard);
        const cost = distance === 0 ? 0 : 0.3 + distance * distance * 0.25;
        d[i][j] = Math.min(
          d[i - 1][j] + 0.55,
          d[i][j - 1] + 0.7,
          d[i - 1][j - 1] + cost
        );
      }
    }
    return d[aLen][bLen];
  };

  const howBadlyTypoed = function(a, b) {
    // Arbitrarily large number
    let minTypoed = 1e10;
    for (const keyboard of keyboards) {
      minTypoed = Math.min(minTypoed, howBadlyTypoedWithKeyboard(a, b, keyboard));
    }
    return minTypoed;
  };

  const specialChars = ["'", "\"", ",", "-", ".", "_"];

  const replaceSpecialChars = function(str) {
    let result = str;
    for (const i of specialChars) {
      result = result.replaceAll(i, "");
    }
    return result;
  };

  // There are a LOT of magic numbers in this code, mostly from arbitrary choices for "What number is large enough to
  // act as a placeholder for 'basically not found'?"
  // This will need some cleanup if possible.
  h2p.search = query => {
    const truncatedQuery = replaceSpecialChars(query);
    if (truncatedQuery === "") return h2p.tabs.map(x => ({ tab: x, relevance: 1.5 }));
    const searchTerms = truncatedQuery.toLowerCase().split(" ").filter(str => str !== "");

    // A higher "Relevance" value actually means it's further away from the search, important to keep in mind
    const relevances = Array.repeat(1e4, h2p.tabs.length);
    for (const searchWord of searchTerms) {
      const minimumRequirement = Math.min(searchWord.length - 0.9, 3) * 0.5;
      for (const searchIndexStr in searchIndex) {
        const typoThreshold = howBadlyTypoed(replaceSpecialChars(searchIndexStr), searchWord);
        if (typoThreshold < minimumRequirement) {
          for (const tab of searchIndex[searchIndexStr]) {
            const maxRelevance = tab.searchTermsRelevance[searchIndexStr];
            const decrease = Math.max(maxRelevance * 1.6 - 0.9, 0);
            relevances[tab.id] = Math.min(relevances[tab.id], Math.max(typoThreshold, 1 - maxRelevance) - decrease);
          }
        }
      }
    }
    const results = h2p.tabs.filter(x => relevances[x.id] < 0.9)
      .map(x => ({ tab: x, relevance: relevances[x.id] }));
    // Provide both the relevance and the tab itself

    // Sort by id first, then push more relevant results to top.
    results.sort((a, b) => a.tab.id - b.tab.id).sort((a, b) => a.relevance - b.relevance);
    // Provide both the relevance and the tab itself
    return results;
  };
}());
