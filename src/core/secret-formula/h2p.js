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
지금은 게임 방법을 열 때 항상 이 페이지가 먼저 표시됩니다. 첫 차원 부스트를 얻은 뒤부터는 현재 보고 있는
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
<b>${GameSaveSerializer.endingString.savefile}</b>로 끝납니다. 리얼리티 이전 버전의 저장은 <b>eyJ</b>로 시작하고
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
- <b>AM</b>: 반물질<br>
- <b>AD</b>: 반물질 차원<br>
- <b>AG</b>: 반물질 은하<br>
${PlayerProgress.infinityUnlocked() ? "- <b>IP</b>: 무한 포인트<br>" : ""}
${PlayerProgress.infinityUnlocked() ? "- <b>NC</b>: 일반 도전<br>" : ""}
${PlayerProgress.infinityUnlocked() ? "- <b>IC</b>: 무한 도전<br>" : ""}
${InfinityDimension(1).isUnlocked || PlayerProgress.eternityUnlocked() ? "- <b>ID</b>: 무한 차원<br>" : ""}
${PlayerProgress.replicantiUnlocked() ? "- <b>RG</b>: 복제자 은하<br>" : ""}
${PlayerProgress.eternityUnlocked() ? "- <b>EP</b>: 이터니티 포인트<br>" : ""}
${PlayerProgress.eternityUnlocked() ? "- <b>TT</b>: 시간 정리<br>" : ""}
${PlayerProgress.eternityUnlocked() ? "- <b>TD</b>: 시간 차원<br>" : ""}
${PlayerProgress.eternityUnlocked() ? "- <b>EC</b>: 이터니티 도전<br>" : ""}
${PlayerProgress.dilationUnlocked() ? "- <b>TP</b>: 타키온 입자<br>" : ""}
${PlayerProgress.dilationUnlocked() ? "- <b>DT</b>: 팽창된 시간<br>" : ""}
${PlayerProgress.dilationUnlocked() ? "- <b>TG</b>: 타키온 은하<br>" : ""}
${PlayerProgress.realityUnlocked() ? "- <b>RM</b>: 리얼리티 기계<br>" : ""}
${PlayerProgress.realityUnlocked() ? "- <b>AP</b>: 오토메이터 포인트<br>" : ""}
${PlayerProgress.realityUnlocked() ? "- <b>BH</b>: 블랙홀<br>" : ""}
${MachineHandler.isIMUnlocked ? "- <b>iM</b>: 허상 기계<br>" : ""}
${Laitela.isUnlocked ? "- <b>DM</b>: 암흑 물질<br>" : ""}
${Laitela.isUnlocked ? "- <b>DE</b>: 암흑 에너지<br>" : ""}
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
<b>누적 차원 수량:</b> 다음 열에는 현재 보유한 차원 수량이 표시됩니다. 반물질로 구매한 수량과 상위 차원이
생산한 수량을 합친 값입니다.
<br>
<br>
<b>구매한 차원 수량:</b> 누적 수량 옆 괄호에는 다음 배율 상승까지 구매한 수량이 표시됩니다. 예를 들어
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
제8 차원까지 차례로 구매하고, 마지막으로 틱 속도 업그레이드를 최대한 구매합니다.
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
${formatInt(10)}개 대신 ${formatInt(1)}개만 구매하며, <b>M</b>은 모두 최대로 구매합니다.
`,
      isUnlocked: () => true,
      tags: ["dims", "normal", "antimatter", "ad"],
      tab: "dimensions/antimatter"
    }, {
      name: "틱 속도",
      info: () => `
게임의 생산은 "틱"마다 일어나며 처음에는 1초에 한 번 발생합니다. 틱 속도 업그레이드를 구매하면 1초에
여러 틱이 발생하는 것처럼 반물질 차원의 생산 속도를 높일 수 있습니다.
<br>
<br>
<b>틱 속도:</b> 초당 발생하는 게임 틱 수입니다. 소수 부분도 계산되어 틱의 일부가 지난 만큼 생산량이
증가합니다. 실제 틱 속도 시간은 모의 계산되며 게임 계산 자체는 옵션에서 선택한 업데이트 주기로 실행됩니다.
<br>
<br>
<b>비용:</b> 초당 틱 수에 표시된 배율을 곱하는 데 필요한 반물질입니다.
(은하가 없으면 구매할 때마다 ${formatX(1.1245, 0, 3)})
<br>
<br>
<b>최대로 구매:</b> 현재 반물질로 살 수 있는 틱 속도 업그레이드를 최대한 구매합니다.
<br>
<br>
<b>단축키: T</b>는 틱 속도 업그레이드를 최대한 구매하고, <b>Shift+T</b>는 하나만 구매합니다.
<b>M</b>은 모두 최대로 구매합니다.
`,
      isUnlocked: () => Tickspeed.isUnlocked,
      tags: ["dimension", "earlygame", "time"],
      tab: "dimensions/antimatter"
    }, {
      name: "차원 부스트",
      info: () => `
<b>차원 부스트:</b> 반물질과 모든 반물질 차원을 초기화하는 대신 구매할 수 있는 다음 반물질 차원을 해금하고
차원 배율을 높입니다. 첫 차원 부스트에는 제4 차원 ${formatInt(20)}개, 두 번째에는 제5 차원 ${formatInt(20)}개가
필요합니다. ${formatInt(8)}개 차원을 모두 해금한 뒤에는 추가 부스트마다 이전보다 제8 차원이 ${formatInt(15)}개씩
더 필요합니다. 더 이상 차원을 해금하지는 않지만 차원 배율은 계속 증가합니다.
<br>
<br>
차원 부스트 하나마다 제1 차원에 ${formatX(2)} 배율이 적용됩니다. 상위 차원으로 갈수록 적용 횟수가 한 번씩
줄어 최소 ${formatInt(0)}회가 됩니다. 예를 들어 부스트가 ${formatInt(3)}회라면 제1 차원은 ${formatX(8)}, 제2 차원은
${formatX(4)}, 제3 차원은 ${formatX(2)}를 얻고 나머지 차원은 영향을 받지 않습니다.
<br>
<br>
<b>단축키: D</b>는 차원 부스트 구매를 시도합니다.
`,
      isUnlocked: () => true,
      tags: ["dimboost", "reset", "earlygame"],
      tab: "dimensions/antimatter"
    }, {
      name: "반물질 은하",
      info: () => `
반물질 은하를 구매하면 차원 ${formatInt(4)}개만 사용할 수 있는 상태로 게임이 초기화되지만, 처음 두 은하는
틱 속도 업그레이드의 효과를 각각 +${format(0.02, 0, 2)}만큼 높입니다. 은하가 늘어날수록 이 배율은 계속 강해집니다.
<br>
<br>
처음 몇 번의 틱 속도 구매에는 영향이 작지만 곱연산으로 적용되므로 곧 눈에 띄는 차이를 만듭니다.
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
<b>다섯 번째 차원 부스트 이후 차원 희생이 해금됩니다.</b>
<br>
<br>
희생하면 제8 차원을 제외한 모든 차원의 보유량이 즉시 0으로 초기화되지만 배율과 현재 비용은 줄어들지
않습니다. 그 대신 제8 차원 배율에 표시된 값을 곱합니다. 이전 생산량을 회복하는 데 시간이 걸리지만
결과적으로는 생산량이 증가합니다.
<br>
<br>
차원 희생 배율은 희생할 때 보유한 제1 차원 수에 따라 증가하며, 특정 도전 과제와 도전을 완료하면 증가
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
      name: "도전 과제",
      info: () => `
각 도전 과제에는 해금 조건이 있으며, 일부 도전 과제는 해금 시 보상을 제공합니다. 조건의 난이도와
보상이 주는 이점은 크게 다릅니다.
<br>
<br>
개별 도전 과제의 고유 보상과 별도로, 도전 과제 하나마다 모든 반물질 차원에 ${formatX(1.03, 2, 2)} 배율을
얻습니다. 한 줄을 모두 완료할 때마다 추가로 ${formatX(1.25, 2, 2)} 배율을 얻습니다. 모든 도전 과제에서
얻는 총 배율은 도전 과제 이미지 위에 표시됩니다.
<br>
<br>
비밀 도전 과제는 게임 진행에 아무 이점도 주지 않으며 재미를 위한 요소입니다. 비밀 도전 과제 위에
마우스를 올리면 달성 방법에 대한 힌트를 볼 수 있습니다.
`,
      isUnlocked: () => true,
      tags: ["earlygame", "awards", "earlygame"],
      tab: "achievements"
    }, {
      name: "Infinity",
      info: () => `
Once you have too much antimatter for the world to handle (${formatInt(2)}<sup>${formatInt(1024)}</sup>
or about ${formatPostBreak(Number.MAX_VALUE, 6)},
sometimes called "Infinity"), you will be forced to do a “Big Crunch”. This will reset your antimatter, Antimatter
Dimensions, Dimension Boosts, and your Antimatter Galaxies. Doing a Big Crunch is also sometimes referred to as
"Infinitying".
<br>
<br>
You will eventually be able to pass ${formatPostBreak(Number.MAX_VALUE, 6)}, but until then any larger numbers will
display as ${format(Infinity)}.
<br>
<br>
Each Infinity completed will give an Infinity Point, which can be spent on upgrades in the new Infinity tab.
You must purchase these upgrades from top to bottom. You will also gain one "Infinity", which is effectively
the number of times you have crunched.
<br>
<br>
The "Multiply Infinity Points from all sources by ${formatInt(2)}" upgrade can be bought multiple times,
but each purchase requires ${formatInt(10)} times as much IP.
You must complete the Achievement "No DLC required" to start purchasing this particular upgrade.
<br>
<br>
<b>Hotkey: C</b> will try to perform a Big Crunch.
`,
      isUnlocked: () => PlayerProgress.infinityUnlocked(),
      tags: ["crunch", "big", "upgrades", "ip", "reset", "prestige", "earlygame"],
      tab: "infinity/upgrades"
    }, {
      name: "Normal Challenges",
      info: () => `
Normal Challenges are unlocked after your first Infinity; they change in-game mechanics in different ways to create more
difficult Infinity circumstances. To complete a challenge, you must reach ${formatPostBreak(Number.MAX_VALUE, 2)}
antimatter again.
<br>
<br>
Each completed Normal Challenge will award an autobuyer or the ability to upgrade an existing autobuyer.
You can run them multiple times (though only the first time grants a reward),
and they can be exited at any time via the “Exit Challenge” button.
<br>
<br>
Your first Infinity is considered to be the first Normal Challenge, and is thus already completed when
you unlock challenges.
<br>
<br>
The rightmost column of Infinity Upgrades does not work in challenges.
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
반물질 차원 및 틱 속도 업그레이드 자동 구매기는 총 반물질량에 따라 해금되지만, 대부분의 다른 자동
구매기는 업그레이드를 구매하거나 도전을 완료해야 해금됩니다.
<br>
<br>
대부분의 자동 구매기에는 다음과 같은 공통 설정이 있습니다.
<br>
<br>
<b>자동 구매기 간격:</b> 자동 구매기가 다음 구매를 시도하기까지 기다리는 시간입니다. 반물질 차원 및
틱 속도 업그레이드 자동 구매기는 각각에 해당하는 도전을 완료해야 간격을 강화할 수 있습니다.
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
<b>틱 속도 자동 구매 수량:</b> 틱 속도 자동 구매기는 작동할 때마다 업그레이드 하나를 구매하도록 설정할 수
있으며, 틱 속도 도전(C9)을 완료한 뒤에는 가능한 만큼 최대로 구매하도록 설정할 수 있습니다.
<br>
<br>
<b>차원 부스트 자동 구매 설정:</b> 구매를 시도할 최대 부스트 수, 차원 부스트를 항상 자동 구매하기 시작할
최소 반물질 은하 수, 그리고 해금 시 정확한 수의 차원 부스트를 일괄 구매하도록 설정할 수 있습니다.
지정한 은하 기준에 도달하면 자동 구매기는 최대 부스트 제한을 무시합니다.
<br>
<br>
<b>최대 은하:</b> 은하 자동 구매기가 구매할 최대 은하 수입니다.
<br>
<br>
<b>크런치 시 무한 포인트:</b> 무한 돌파 후 빅 크런치를 실행하기 전에 기다릴 무한 포인트량을 설정할 수 있습니다.
<br>
<br>
<b>희생 자동 구매기:</b> 처음부터 간격이 최대로 강화되어 있어 매 틱 작동할 수 있습니다.
<br>
<br>
<b>동적 수량:</b> 강화된 프레스티지 자동 구매기는 지정한 기준을 넘으면 프레스티지를 실행하는 모드를
가집니다. "동적 수량"을 켜면 해당 값에 배율을 적용하는 특정 업그레이드나 도전 과제를 해금할 때 기준값도
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
      name: "Break Infinity",
      info: () => `
Once you Break Infinity, you are no longer limited to ${formatPostBreak(Number.MAX_VALUE, 2)} antimatter and can start
gaining more than ${formatInt(1)} IP per crunch depending on how much more antimatter you have when you crunch.
<br>
<br>
You now gain ~${format(1.78, 2, 2)} IP for crunching at ${formatPostBreak(Number.MAX_VALUE, 2)} antimatter. The IP you
gain for crunching is multiplied by ${formatInt(10)} for every additional factor of
${formatPostBreak(Number.MAX_VALUE, 2)} antimatter you gain (in a continuous manner). This is rounded down to the
nearest integer <i>after</i> all multipliers are applied.
<br>
<br>
The antimatter costs of all Dimensions begin to increase faster after they pass
${formatPostBreak(Number.MAX_VALUE, 2)}. The cost <i>between</i> upgrades will increase by ${formatX(10)}
<i>per upgrade</i> above ${formatPostBreak(Number.MAX_VALUE, 2)}, and a similar scaling happens to
Tickspeed Upgrade costs as well.
`,
      isUnlocked: () => Autobuyer.bigCrunch.hasMaxedInterval || PlayerProgress.eternityUnlocked(),
      tags: ["limit", "crunch", "upgrades", "midgame"],
      tab: "infinity/break"
    }, {
      name: "Infinity Dimensions",
      info: () => `
<b>Unlocking Infinity Dimensions:</b> Infinity Dimensions are unlocked by reaching a certain amount of antimatter.
<br>
<br>
<b>Infinity Dimension Purchasing:</b> Infinity Dimensions are only purchasable in sets of ${formatInt(10)}, and cost
Infinity Points. They give a permanent multiplier per purchase, similar to the other dimensions. The actual multiplier
applied depends on which Infinity Dimension you purchase. <!-- Sorry Garnet :/ -->
<br>
<br>
<b>Infinity Dimension Production:</b> Just like Antimatter Dimensions, each Infinity Dimension produces the
next lower Infinity Dimension.
<br>
<br>
Every crunch, your produced Infinity Dimensions are reset to the amount you purchased. While the production
of Infinity Dimensions does not carry between crunches, all the multipliers you got from purchasing them do.
<br>
<br>
<b>Infinity Dimension unlock thresholds (antimatter):</b> ${Array.range(1, 8)
    .map(tier => formatPostBreak(InfinityDimension(tier)._unlockRequirement))
    .join(", ")}
<br>
<b>Infinity Dimension purchase multipliers:</b> ${Array.range(1, 8)
    .map(tier => format(InfinityDimension(tier)._powerMultiplier))
    .join(", ")}
<br>
<b>Infinity Dimension base prices (IP):</b> ${Array.range(1, 8)
    .map(tier => format(InfinityDimension(tier)._baseCost))
    .join(", ")}
<br>
<b>Infinity Dimension price increases:</b> ${Array.range(1, 8)
    .map(tier => format(InfinityDimension(tier)._costMultiplier))
    .join(", ")}
<br>
<br>
Instead of antimatter, the 1st Infinity Dimension produces Infinity Power, which gives a multiplier applied
to all Antimatter Dimensions equal to (power<sup>${formatInt(7)}</sup>). Infinity Dimensions are not
affected by Tickspeed Upgrades.
`,
      isUnlocked: () => Autobuyer.bigCrunch.hasMaxedInterval || PlayerProgress.eternityUnlocked(),
      tags: ["id", "power", "new", "dims", "unlock", "break", "midgame"],
      tab: "dimensions/infinity"
    }, {
      name: "Infinity Challenges",
      // This one could use some work!
      info: () => `
Infinity Challenges are like Normal Challenges, but they have higher end goals and are generally harder. Instead of
only unlocking autobuyers, they give you boosts to your various forms of production in more unique ways. Similarly to
Normal Challenges, the rightmost column of Infinity Upgrades are disabled within Infinity Challenges.
<br>
<br>
Unlike the Normal Challenges, which are all unlocked at once, Infinity Challenges require you to reach a certain
amount of antimatter before you can attempt them.
<br>
<br>
<b>Infinity Challenge unlock thresholds:</b> ${GameDatabase.challenges.infinity
    .map(ic => formatPostBreak(ic.unlockAM)).join(", ")}
`,
      isUnlocked: () => Autobuyer.bigCrunch.hasMaxedInterval || PlayerProgress.eternityUnlocked(),
      tags: ["rewards", "break", "ic", "midgame"],
      tab: "challenges/infinity"
    }, {
      name: "Replicanti",
      info: () => `
Replicanti are another resource you unlock at ${format(DC.E140)} IP. Rather
than producing something else, Replicanti actually produces <i>itself</i> up to a maximum of
${formatPostBreak(Number.MAX_VALUE, 2)}. Replicanti are produced at their own pace, unaffected by Tickspeed Upgrades.
Each individual Replicanti has a certain chance (initially ${formatPercents(0.01)}) of producing another Replicanti
every Replicanti tick (initially every second), and both of these can be upgraded by spending IP.
<br>
<br>
If you have purchased a Replicanti Galaxy upgrade, then you can get a "free" Replicanti Galaxy in exchange for
resetting your Replicanti count back to ${formatInt(1)}. This Galaxy is free in that it will act as if it was an
Antimatter Galaxy, but it will not make your next Antimatter Galaxy more expensive. However, it will still reset the
same things as an Antimatter Galaxy does.
<br>
<br>
<b>Hotkey: R</b> will try to purchase a Replicanti Galaxy.
<br>
Replicanti give a multiplier to all Infinity Dimensions, which will reach a maximum of
${formatX(Math.pow(2, 20), 2, 2)} at ${formatPostBreak(Number.MAX_VALUE, 2)} Replicanti.
<br>
<br>
<b>Chance upgrade cost:</b> Base ${format(DC.E150)} IP, cost increment ${formatX(DC.E15)} IP
<br>
<b>Interval upgrade cost:</b> Base ${format(DC.E140)} IP, cost increment ${formatX(DC.E10)} IP
<br>
<b>Galaxy upgrade cost:</b> Base ${format(DC.E170)} IP, cost increment ${formatX(DC.E25)} IP and an additional
${formatX(1e5)} IP per upgrade, scaling similarly to distant Antimatter Galaxies. Above ${formatInt(100)} Replicanti
Galaxies, this ${formatX(1e5)} per upgrade changes to ${formatX(DC.E55)}. Above ${formatInt(1000)}, the scaling switches
from quadratic to cubic, with the ${formatX(DC.E55)} multiplier itself increasing by ${formatX(DC.E5)} per upgrade.
`,
      isUnlocked: () => Replicanti.areUnlocked || PlayerProgress.eternityUnlocked(),
      tags: ["interval", "chance", "infinity", "galaxy", "galaxies", "midgame"],
      tab: "infinity/replicanti"
    }, {
      name: "Eternity",
      info: () => `
Upon reaching ${formatPostBreak(Number.MAX_VALUE, 2)} IP, you can Eternity. Eternities will reset everything before this
point except challenge times, Achievements, and anything under the General section of the Statistics tab. You will be
able to access more content after your first Eternity.
<br>
<br>
You can pass ${formatPostBreak(Number.MAX_VALUE, 2)} IP without anything being forced upon you, unlike the first time
you reached ${formatPostBreak(Number.MAX_VALUE, 2)} antimatter. You will receive more Eternity Points the more
Infinity Points you had before going Eternal. You will also gain one "Eternity" for completing an Eternity.
<br>
<br>
Eternity Point gain scales similarly to Infinity Point gain, but scaling off of Infinity Points instead of antimatter.
The base amount of EP gained at ${formatPostBreak(Number.MAX_VALUE, 2)} IP is ~${format(1.62, 2, 2)} EP, multiplied by
${formatInt(5)} for every factor of ${formatPostBreak(Number.MAX_VALUE, 2)} more IP you have. This is always rounded
down, which means that you will get ${formatInt(1)} EP at ${formatPostBreak(Number.MAX_VALUE, 2)} IP but will not reach
${formatInt(2)} EP until ${formatPostBreak(DC.E349)}.
<br>
<br>
<b>Hotkey: E</b> will try to perform an Eternity reset.
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ["eternal", "ep", "reset", "prestige", "midgame"],
      tab: "eternity/upgrades"
    }, {
      name: "Eternity Milestones",
      info: () => `
To make Eternities faster and more convenient, you will unlock various buffs as you get more "Eternity". These
buffs will generally let you start with certain upgrades you would otherwise lose after Eternity, give you new
autobuyers for better automation, or give you a way to passively gain resources offline at a reduced rate.
<br>
<br>
Milestones which give you upgrades will automatically purchase and upgrade them to their maximum when first starting
the Eternity, effectively letting you have them permanently.
<br>
<br>
All of the new autobuyers will have toggles next to their respective manual buttons (for example, Infinity Dimension
autobuyers can be found on the Infinity Dimension tab) in addition to their entries on the autobuyers tab.
The improvements to the Dimension Boost, Antimatter Galaxy, and Big Crunch autobuyers update their
already existing entries on the autobuyer tab.
<br>
<br>
The passive generation milestones only work offline by design and may need certain autobuyer settings to work
properly, as noted on the milestone page itself.
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ["eternities", "rewards", "automation", "midgame"],
      tab: "eternity/milestones"
    }, {
      name: "Time Dimensions",
      info: () => `
After your first Eternity, you unlock Time Dimensions. You buy them with Eternity Points and they produce Time Shards,
which provide Tickspeed Upgrades. These Tickspeed Upgrades function like normal Tickspeed Upgrades but do not increase
their cost. Time Dimensions, Time Shards, and the Tickspeed Upgrades they provide are kept on Infinity,
but reset every Eternity.
<br>
<br>
Similarly to the other dimensions, Second Time Dimensions produce 1st Time Dimensions and so on. Similarly to Infinity
Dimensions, your production will be reset to the amount you purchased after every Eternity, but you will keep any
upgrades to your multipliers you purchased.
<br>
<br>
Each purchase increases the multiplier of that specific Time Dimension by ${formatX(4)}. The cost multiplier between
upgrades has a base value, but is increased by ${formatX(1.5, 1, 1)} at
${format(TimeDimension(1)._costIncreaseThresholds[0], 2)} EP and ${formatX(2.2, 1, 1)} (of the base value) at
${format(TimeDimension(1)._costIncreaseThresholds[1])} EP. These increases apply retroactively, causing the cost to
jump when they reach those thresholds, and only apply to the first four dimensions. Beyond
${format(TimeDimension(1)._costIncreaseThresholds[2])} EP each dimension purchase counts as four purchases for the
purpose of cost increases, causing the price to rise much more steeply.
<br>
<b>Time Dimension base prices (EP):</b> ${Array.range(1, 8)
    .map(tier => format(TimeDimension(tier)._baseCost))
    .join(", ")}
<br>
<b>Time Dimension base price increases:</b> ${Array.range(1, 8)
    .map(tier => format(TimeDimension(tier)._costMultiplier))
    .join(", ")}
<br>
<br>
Each threshold to gain another Tickspeed Upgrade is ${formatPercents(0.33)} more Time Shards than the previous,
or ${formatPercents(0.25)} with the relevant Time Study. After ${formatInt(FreeTickspeed.softcap)} upgrades, the
multiplier between each successive free Tickspeed Upgrade will gradually increase at a rate of ~${formatX(1.35, 0, 2)}
per ${formatInt(50000)} upgrades (${formatX(1.000006, 0, 6)} per upgrade).
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ["dims", "td", "shards", "eternity", "midgame"],
      tab: "dimensions/time"
    }, {
      name: "Time Studies",
      info: () => `
A Time Study is a powerful post-Eternity upgrade, which costs a new resource called Time Theorems. Time Studies can
boost the production of anything you have seen so far in the game, or even change the way some formulas work.
<br>
<br>
Time Theorems are a limited resource which costs more for each one you buy. They can be bought with antimatter,
Infinity Points, or Eternity Points. Their cost increases by a set factor per purchase. Time Theorems do not
reset on Eternity.
<br>
<br>
Studies are laid out in a tree-like fashion, where you must buy prerequisites before continuing. The only study you
can buy at first is the very top one, and then from there you can purchase any study directly below it which you can
afford. However, there are three exceptions:
<br>
Where the lines between studies have a color, you can only choose one of the three paths at a time.
<br>
When a study for an Eternity Challenge is in the way, you need to complete all challenges connected to it at least
once in order to access the study. You do not need to have the challenge study purchased in order to access it.
<br>
Near the bottom, where all the edges join together again, you can only pick one study out of each pair.
<br>
<br>
You are able to hold down shift and then click on a Time Study to buy all studies until that point. This might not buy
the studies you want if you shift-click a study in a position where you would have to choose between two or more
different options which you cannot get together (see above), or you cannot afford all the studies needed to reach that
point. Shift-click will buy studies greedily, getting as many as possible per row before moving farther downward.
<br>
<br>
<b>Presets:</b> The buttons initially labeled 1 through 6 allow you to save your current set of studies into the slot,
letting you quickly buy that particular set of studies again with a single click. You can hover over the button and
use the tooltip to load/save a slot, or click to load and shift-click to save. These presets can be renamed, but you
are not allowed to give multiple presets the same name.
<br>
<br>
<b>Import Tree/Edit Preset:</b> When editing a preset or importing a Time Study Tree, the modal will display what
Time Studies will be bought when it is loaded, along with any errors.
For the split paths, you can use the name as a shorthand for the collection of studies.
For instance, you can replace "71, 81, 91, 101" to represent fully purchasing the antimatter split with
just "antimatter". Additionally, if a Time Study string has a valid Eternity Challenge, adding a "!" to the end of
the string will make the game to try to immediately unlock and enter the Eternity Challenge when used.
<br>
<br>
<b>Preferences:</b> Clicking the gear icon will open up a dialog which lets you select "default" paths to pick in the
three-way branches. Choosing a default will change the shift-click behavior mentioned above so that it will attempt
to buy your preferred path and continue on instead of stopping completely at the tree splits. You can choose two paths
for the Dimension split in this dialog if you have purchased the relevant Time Study.
<br>
<br>
<b>Respecs:</b> A respec allows you to reset the upgrades you have in the tree to retrieve all of the Time Theorems
spent on them. It can be done for free, but only triggers on finishing an Eternity; you cannot respec Time Studies in
the middle of an Eternity.
<br>
<br>
<b>Costs for Time Theorems:</b>
<br>
<b>Antimatter:</b> Initially ${format(DC.E20000)}, ${formatX(DC.E20000)} per Theorem
<br>
<b>Infinity Points:</b> Initially ${formatInt(1)}, ${formatX(DC.E100)} per Theorem
<br>
<b>Eternity Points:</b> Initially ${formatInt(1)}, ${formatX(2)} per Theorem
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ["eternity", "ts", "theorems", "tree", "study", "midgame"],
      tab: "eternity/studies"
    }, {
      name: "Eternity Challenges",
      info: () => `
Eternity Challenges are another set of challenges which are unlocked by the Time Study Tree. They require a certain
amount of Time Theorems and a secondary requirement which you must meet when you unlock the challenge.
<br>
<br>
When you enter an Eternity Challenge, your goal becomes reaching a certain target IP. After completing the challenge,
you do not need to have the Eternity Challenge's study unlocked for the reward to take effect. The rewards for these
challenges are similar to Time Studies, but often even stronger and permanent since they do not require you to spend
Time Theorems to have their effects.
<br>
<br>
You can only have one Eternity Challenge unlocked at a time.
<br>
<br>
You can complete each Eternity Challenge up to five times. After each completion, the rewards grow stronger but the
goal to the next completion also increases. Additionally, the secondary requirement to unlock the challenge again will
also increase. The Time Theorem cost does not increase.
<br>
<br>
Completing an Eternity Challenge's secondary requirements will remove them from the study requirement until you complete
that particular Eternity Challenge, meaning you only need to complete the secondary requirement <i>once</i>.
As a result, you can unlock an Eternity Challenge with one set of studies, and then respec into a different set of
studies to beat the challenge. EC11 and EC12 are exceptions to this rule - the Dimension path restrictions remain even
if you respec your time studies.
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ["ec", "study", "time", "rewards", "completions", "midgame"],
      tab: "challenges/eternity"
    }, {
      name: "Time Dilation",
      info: () => `
Time Dilation is unlocked when you purchase the Time Study to unlock it below the EC11 and EC12 studies.
In order to purchase this Time Study, you need ${formatInt(5000)} unspent TT with a tree that can reach
the study, a <i>total</i> of ${formatInt(TimeStudy.dilation.totalTimeTheoremRequirement)} TT, and must have
completed both EC11 and EC12 five times each.
<br>
<br>
Dilating time will start a modified Eternity, called Time Dilation, in which all of your Antimatter/Infinity/Time
Dimension multipliers’ <i>exponents</i> and the tickspeed multipliers’ <i>exponent</i> will be raised to
${formatPow(0.75, 2, 2)}, significantly reducing them. If you can reach ${formatPostBreak(Number.MAX_VALUE, 2)} IP
to complete this Dilated Eternity, you will be rewarded with a new resource called Tachyon Particles.
<br>
<br>
You can Dilate as many times as you want, but Tachyon Particles cannot be "farmed" like other resources. Tachyon
Particles are never reduced, only increased, and they are increased up to a cap based on your TP multipliers and
antimatter earned in the current Dilation. As a result, you generally cannot increase your TP unless
you have gained a TP multiplier or are able to significantly increase your antimatter in Dilation.
<br>
<br>
Tachyon Particles generate another currency called Dilated Time. Dilated Time is translated into Tachyon Galaxies by
reaching thresholds similarly to the Tickspeed Upgrades gained from Time Dimensions. These Tachyon Galaxies are like
Replicanti Galaxies in that they affect tickspeed as if they were Antimatter Galaxies but they do not increase the cost
of your next Antimatter Galaxy.
<br>
<br>
Unlocking Time Dilation also unlocks upgrades you can purchase using Dilated Time. The first and third upgrades in the
first row of Dilation Upgrades can be repeatedly purchased as many times as you can afford them. The second upgrade can
also be repeatedly bought, but eventually reaches a cap.
`,
      isUnlocked: () => DilationTimeStudyState.studies[1].isBought || PlayerProgress.realityUnlocked(),
      tags: ["dial", "dt", "dilated", "tachyon", "particle", "study", "free", "galaxy", "galaxies", "midgame"],
      tab: "eternity/dilation"
    }, {
      name: "Reality",
      info: () => `
When you reach ${formatPostBreak(DC.E4000)} EP and have completed the first
${formatInt(13)} rows of Achievements, you will be able to purchase the Time Study that unlocks Reality.
Unlocking it opens a new tab, where you can find the button to make a new Reality. Starting a new Reality
will reset almost the entire game up to this point, but in exchange gives
you a new currency known as Reality Machines, a Glyph, and a Perk Point.
<br>
<br>
Unlike the other resets so far, you also lose the first ${formatInt(13)} rows of Achievements - that is, all of the
pre-Reality Achievements and all of their associated rewards. However, you will still keep all values under the General
header in the Statistics tab and all of your best Challenge times.
<br>
<br>
After completing your first Reality, the Glyphs tab contain a button which lets you restart your current Reality again,
without changing what your upcoming Glyph choices are. <b>Note that this will not give you any rewards, even if you
would otherwise be able to complete the Reality normally.</b>
<br>
<br>
You need to redo the requirements for each Achievement in order to get their rewards again, but you will also passively
unlock the next incomplete Achievement every ${timeDisplayNoDecimals(30 * 60000)} without any effort even if you
otherwise do not have the requirements to do so. This automatic completion can be disabled, in which case the timer will
count down to zero and pause, immediately completing another Achievement when unpaused. The timer still progresses
at the same rate while offline.
<br>
<br>
Reality Machines can be spent on different upgrades throughout the Reality tab and are your primary currency from this
point onwards. Glyphs are equippable objects which you must equip in order to use their boosts. Perk Points are another
currency that can be spent in the Perks subtab on different Perks.
<br>
<br>
Reality Machines scale purely off of EP, and the Reality button will tell you how much EP you need in order to gain
the next one. The first ${formatInt(10)} RM scale linearly in the exponent between
${formatPostBreak(DC.E4000)} EP and ${formatPostBreak(DC.C10P16000D3)} EP, and then past that
RM = ${formatInt(1000)}<sup>log<sub>${formatInt(10)}</sub>(EP)/${formatInt(4000)}-${formatInt(1)}</sup>. This formula
is higher RM gain than linear above ${formatPostBreak(DC.C10P16000D3)} EP.
<br>
<br>
Glyph level scales off of a combination of Eternity Points, Replicanti, and Dilated Time, with a minimum level of
${formatInt(1)}. The type, effects, and rarity of Glyphs are randomized.
<br>
<br>
You get exactly ${formatInt(1)} Perk Point per Reality.
<br>
<br>
<b>Hotkey: Y</b> will try to perform a Reality reset.
`,
      isUnlocked: () => PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought,
      tags: ["rm", "machines", "glyph", "perk", "reset", "prestige", "endgame", "lategame"],
      tab: "reality/upgrades"
    }, {
      name: "Glyphs",
      info: () => `
A Glyph is an equippable object that has four attributes:
<br>
<b>Type</b> - This is a name given to the Glyph based on what part of the game it will tend to boost
(eg. "Glyph of X"). This determines the possible effects it may have.
<br>
<b>Level</b> - This contributes to how strong your Glyph is, and it scales based how much of various
resources you obtained in the Reality you gained it from.
<br>
<b>Rarity</b> - This is a percentage, between ${formatPercents(0)} and ${formatPercents(1)}, which also
affects the strength of your Glyph. This is random, but can be influenced by various upgrades.
The percentage is effectively a quality
rating, higher values are better. Specific ranges of rarities are given names, such as Common or Uncommon.
<br>
<b>Effects</b> - These are the boosts that equipping the Glyph will give you, and can contain up to four effects.
Glyphs with higher level or rarity will generally have more effects than weaker Glyphs.
<br>
<b>Note: Your first Glyph will have a fixed effect and rarity, but its level will scale based on your progress before
any Reality content. Once you receive a Glyph, its attributes cannot be changed.</b>
<br>
<br>
To equip a Glyph, double-click or drag the icon from your inventory into one of the active circles in the middle
of the screen. When equipped, Glyph icons become circular and add their effects to the list on the right.
<br>
<br>
Equipping multiple Glyphs with the same effect will combine their effects; effects with "+" will generally add
their values together and effects with "×" will generally multiply their values together.
<br>
<br>
You can equip Glyphs into <i>empty</i> active slots at any time during a Reality, which will immediately apply the
effects of the new Glyph. You can also drag Glyphs into already-occupied slots to switch which ones you have equipped,
but this will restart your current Reality.
<br>
<br>
The slots in the first rows of your inventory are "protected" slots. New Glyphs will never be placed into them (even if
there is no more room in your inventory), and they are unaffected by the Sort and Auto clean buttons. If you run out of
space for new Glyphs in your inventory, any Glyphs you would receive will be automatically deleted (or sacrificed
if unlocked).
<br>
<br>
You can delete Glyphs from your inventory by shift-clicking them, which will prompt you with a confirmation dialog
asking if you are sure you want to delete the Glyph. Holding shift and ctrl together while clicking will bypass this
dialog. <b>However, deleting Glyphs will give you no benefit beyond clearing up inventory space if you do so before
unlocking Glyph Sacrifice from a Reality Upgrade!</b>
<br>
<br>
Once you unlock Glyph Sacrifice, you will be able to disable the Glyph Selection modal from appearing. If desired, you
can force the modal to appear again for this Reality (ignoring this setting) by shift-clicking the Reality button.
Completing a Reality with the selection modal disabled will choose a random Glyph from your options.
<br>
<br>
Clicking a group of circular Glyphs outside of a modal window will open up a modal which displays a detailed summary
of all those Glyphs and their various attributes. The summary will show the information for all Glyphs at once with
slightly shorter descriptions, making it more suitable for sharing with others. This can be done for Glyph records
in the Statistics page, your equipped Glyphs, and the Upcoming Glyph Selection this Reality.
`,
      isUnlocked: () => PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought,
      tags: ["reality", "sacrifice", "level", "endgame", "lategame"],
      tab: "reality/glyphs"
    }, {
      name: "Perks",
      info: () => `
Perks are a type of upgrade unlocked upon Reality. Each Perk effect varies, but most are QoL (quality of life)
improvements which you can choose your own path through. All Perks only require ${formatInt(1)} Perk Point to buy.
<br>
<br>
Each Reality you gain ${formatInt(1)} Perk Point which can be spent on an upgrade on the tree, starting with
"You can now choose from ${formatInt(Perk.firstPerk.config.effect)} Glyphs on Reality". You can only unlock Perks
which are directly adjacent
to Perks you already have, although there are loops in the tree which you can go through in either direction.
<br>
<br>
The Perk nodes can have two different shapes - circular or diamond. The only difference between the two is that
diamond-shaped Perks give Automator Points in addition to their normal effect. Different nodes also have
different colors, roughly indicating which part of the game they affect the most.
`,
      isUnlocked: () => PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought,
      tags: ["pp", "reality", "tree", "endgame", "lategame"],
      tab: "reality/perks"
    }, {
      name: "Automator Overview",
      info: () => `
The Automator is unlocked upon reaching a total of ${formatInt(AutomatorPoints.pointsForAutomator)} Automator Points.
Automator Points are given when unlocking various Perks or Reality Upgrades, by unlocking the Black Hole, or by
simply completing more Realities.
<br>
<br>
The Automator uses a scripting language that allows you to automate nearly the entire game.
The interface has two panes, a script pane on the left where you enter the commands to automate the game and a pane
on the right which has multiple panels which do many different things as explained on the Automator Introduction page.
<br>
<br>
If you want a larger workspace, you can press the button in the top right corner of the documentation pane of the
Automator to expand it to fullscreen. You can also drag the boundary between the panes horizontally to resize the
panes if you want more room to write your script or read documentation.
<br>
<br>
By pressing the top-right button on the script pane, you can switch between the Automator's block and text editor
modes; the block mode may be more approachable if you are unfamiliar with programming. To enter commands in block mode,
select the command block pane on the right and drag the box for the relevant command into the script pane and drop it
where you want the command to go. Commands can be freely rearranged by dragging the blocks around if needed. Switching
between block and text mode will attempt to automatically translate your script as well, although you may lose part of
your converted script if it contains errors.
<br>
<br>
Just like your entire savefile, individual Automator scripts can be imported and exported from the game.
Properly-formatted script strings will begin with <b>${GameSaveSerializer.startingString["automator script"]}</b> and
end with <b>${GameSaveSerializer.endingString["automator script"]}</b>. If this is not the case then part of your script
was lost in the process of copy-pasting. The import function will load the script into a new slot; your current script
will not be lost or overwritten.
<br>
<br>
<b>Hotkey: U</b> will pause/unpause the Automator.
`,
      isUnlocked: () => Player.automatorUnlocked,
      tags: ["automation", "reality", "code", "script", "endgame", "lategame"],
      tab: "automation/automator"
    }, {
      name: "Automator Technical Details",
      info: () => `
<b>Technical Limits</b>
<br>
<br>
There are a few limitations to scripts in order to reduce lag and prevent save file size from getting too large.
These limits are as follows:
<br>
- Individual scripts are limited to a maximum of ${formatInt(AutomatorData.MAX_ALLOWED_SCRIPT_CHARACTERS)}
characters each and all scripts combined together cannot exceed ${formatInt(AutomatorData.MAX_ALLOWED_TOTAL_CHARACTERS)}
characters total.
<br>
- Script names cannot exceed ${formatInt(AutomatorData.MAX_ALLOWED_SCRIPT_NAME_LENGTH)} characters.
<br>
- Defined constants cannot have names longer than ${formatInt(AutomatorData.MAX_ALLOWED_CONSTANT_NAME_LENGTH)}
characters, or values longer than ${formatInt(AutomatorData.MAX_ALLOWED_CONSTANT_VALUE_LENGTH)} characters.
<br>
- You cannot have more than a total of ${formatInt(AutomatorData.MAX_ALLOWED_SCRIPT_COUNT)} scripts or
${formatInt(AutomatorData.MAX_ALLOWED_CONSTANT_COUNT)} defined constants.
<br>
<br>
<b>Script Saving</b>
<br>
<br>
Scripts are automatically saved as you edit them, but are not saved to your game save until the global autosave timer
(ie. "Time since last save") triggers a full game save. If you make changes to scripts right before closing the game,
you should wait until the game saves afterwards in order to not lose your changes. Any edits made to your scripts
while above the length limits will not be saved until you shorten your scripts to be below them again.
<br>
<br>
<b>Automator Ticks</b>
<br>
<br>
The Automator's "execution timer" is based on real time, and is therefore unaffected by things such as the Black Hole,
Time Glyph effects, and EC12's negative effect. However this execution timer runs entirely independently from the main
game's production loop, meaning that at faster speeds the Automator can run multiple commands per production tick.
<br>
<br>
Some commands are more intensive on the game's internal code and may take longer than a single Automator tick in order
to process on slower computers. In that case, the Automator will execute those commands and then attempt to "catch up"
by executing the following commands as quickly as possible until it has run as many commands as it should have at a
constant execution speed.
<br>
<br>
<b>Interactions with Offline Progress</b>
<br>
<br>
Longer production ticks during Offline Progress simulation means that all of your resources are effectively given
in large chunks instead of more continuously. This may have potentially adverse effects on your script's
behavior while offline, depending on how exactly your script depends on the game state to work properly.
Additionally, the PAUSE command may behave oddly due to it also being based on real time.
`,
      isUnlocked: () => Player.automatorUnlocked,
      tags: ["automation", "reality", "code", "script", "endgame", "lategame"],
      tab: "automation/automator"
    }, {
      name: "Black Hole",
      info: () => `
The Black Hole is a feature which speeds up how fast the game runs, on a periodic cycle.
The game will run at normal speed for some amount of time, then have a burst of running extremely fast for a short
period of time before going back to normal speed and repeating the cycle.
<br>
<br>
Increased game speed from Black Holes is much stronger than tickspeed because unlike tickspeed, it affects
<i>everything equally</i>, including things which are only partially affected by tickspeed
(eg. Infinity/Time Dimensions), things which are normally completely unaffected (eg. DT/TT generation),
and effects which are boosted purely on time spent (eg. idle path IP/EP multipliers).
<br>
<br>
While most features in the game are boosted by this increased game speed, there are some which remain unaffected.
In these cases, it will be specifically mentioned that a given time is stated as <i>real time</i> as opposed to
<i>game time</i>. One such example is the set of Perks which automatically completes Eternity Challenges over time.
Otherwise, it should be assumed from this point onward that all references to time are for <i>game time</i>.
Note that this also includes situations where you may want to have a <i>lower</i> amount of time spent, like
the Reality Upgrade "Replicative Rapidity" for example.
<br>
<br>
You can buy upgrades for the Black Hole by using Reality Machines. There are three upgrades for the Black Hole:
<br>
<b>Interval</b> - How long the Black Hole is inactive between bursts,
reduced by ${formatPercents(0.2)} per upgrade.
<br>
<b>Power</b> - How much faster the game runs during the temporary speed bursts,
increased by ${formatPercents(0.35)} per upgrade.
<br>
<b>Duration</b> - How long each speed burst lasts before going back to normal speed,
increased by ${formatPercents(0.3)} per upgrade.
<br>
<br>
${formatInt(100)} days of <i>game time</i> after unlocking the Black Hole, you unlock the ability to purchase
a Reality Upgrade that allows you to have a second Black Hole.
The timer on the second Black Hole only advances when the first Black Hole is active. So, for example, if the first
Black Hole has a duration of ${formatInt(4)} minutes and the second has an interval of ${formatInt(8)} minutes, the
second Black Hole will only activate once every two cycles of the first Black Hole regardless of how short the
first Black Hole's interval is. Note that the timer shown in the in-game header takes account of this and shows
the actual time until the second Black Hole activates; in the Black Hole tab, you can see the amount of time with
the first Black Hole active needed for the second Black Hole to activate.
<br>
<br>
When a Black Hole is active at least ${formatPercents(0.9999, 2)} of the time, it becomes permanently active.
This is tracked separately for the two Black Holes.
<br>
<br>
While offline, Black Hole cycles will still advance normally and their active speed boosts will apply fully as if the
game were still open. Offline time simulates segments of inactive and active Black Holes with different tick lengths
in order to reduce the negative effects of small tick count during active periods; the entry for "Offline Progress"
has been updated with more technical details.
<br>
<br>
The Black Holes can be paused, completely halting their interval/duration cycle. However, when unpausing them, it will
take ${BlackHoles.ACCELERATION_TIME} real-time seconds for them to go from inactive to their maximum boosted speed.
This acceleration time will still advance the cycle as if it were running at full speed; so
while pausing gives some more control, it also ultimately results in some boosted time being lost.
<br>
<br>
Pausing and unpausing affects both Black Holes; they cannot be paused or unpaused independently. They can be paused
automatically ${BlackHoles.ACCELERATION_TIME} real-time seconds before activation by toggling the relevant setting on
the Black Hole tab.
<br>
<br>
<b>Upgrade Cost Information:</b>
<br>
<b>Interval</b> - Base cost of ${formatInt(15)} RM and increase of ${formatX(3.5, 0, 1)} per upgrade.
<br>
<b>Power</b> - Base cost of ${formatInt(20)} RM and increase of ${formatX(2)} per upgrade.
<br>
<b>Duration</b> - Base cost of ${formatInt(10)} RM and increase of ${formatX(4)} per upgrade.
<br>
<b>Increased cost scaling:</b> Above ${format(1e30)} RM, the cost multiplier between purchases increases by an additive
+${format(0.2, 0, 1)} per upgrade. Above ${format(Number.MAX_VALUE, 1)} RM, a new scaling occurs which ignores all the
previous behavior. From this point, all upgrades instead behave as if they had an initial cost of ${format(DC.E310)}
and further upgrade costs increase by ${format(1e6)}, ${format(1e7)}, and so on (${formatX(10)} between upgrades).
<br>
<b>Black Hole 2:</b> All upgrades have an initial cost ${formatX(1000)} higher than the first Black Hole,
but the same cost multipliers.
<br>
<br>
<b>Hotkey: B</b> will pause/unpause the Black Holes.
`,
      isUnlocked: () => player.blackHole[0].unlocked,
      tags: ["reality", "time", "speed", "duration", "interval", "rm", "endgame", "lategame"],
      tab: "reality/hole"
    }, {
      name: "Celestials",
      info: () => `
Once you get all of the Reality Upgrades, the first Celestial is unlocked. This opens up a new tab for Celestials, next
to the Reality tab. The first subtab under the Celestials tab shows a map called "Celestial Navigation" which updates as
you progress through the game. Only part of the map will be visible when first unlocked, but new content will gradually
be revealed as you approach it, generally with a visual indication of your progress towards the next step.
<br>
<br>
Each Celestial has unique mechanics and upgrades, and you need to defeat all seven to beat the game.
Unlocking or defeating a Celestial has different conditions depending on the Celestial's mechanics.
<br>
<br>
All Celestials have their own Celestial Reality, but how the Reality is relevant to each Celestial and the rest of
the game will depend on the Celestial.
<br>
<br>
Celestials are timeless entities. Unless otherwise stated, any new mechanics introduced by Celestials are not affected
by game speed multipliers and instead refer specifically to real time instead of game time.
`,
      isUnlocked: () => Teresa.isUnlocked,
      tags: ["reality", "challenges", "endgame", "lategame"],
      tab: "celestials/celestial-navigation"
    }, {
      name: "Teresa, Celestial of Reality",
      alias: "Teresa",
      info: () => `
Teresa is the first Celestial. They are unlocked by Achievement 147, which requires obtaining all Reality Upgrades.
<br>
<br>
On the main screen, there is a bar with a button above it that says "Pour RM". This allows you to put your RM into the
container for a Reality Machine multiplier. RM which has been poured into the container cannot be retrieved.
When you reach ${format(TeresaUnlocks.run.price)} RM inside of the container, you unlock Teresa's Reality.
<br>
<br>
When you complete Teresa's Reality,
${Teresa.runCompleted
    ? "your Glyph Sacrifice is multiplied based on the amount of antimatter gained during the run"
    : "<div style='color: var(--color-bad);'>(complete Teresa's Reality to see the reward)</div>"}.
Completing Teresa's Reality is only part of the story; you need to keep pouring RM in order to progress. Once
you are at ${format(TeresaUnlocks.effarig.price)} RM in the container, you will unlock the next Celestial.
<br>
<br>
${Teresa.runCompleted
    ? "Teresa's Reality can be entered again after completing it, and its reward will become stronger if you " +
      "reach a higher amount of antimatter on this repeat run."
    : "(More information available - complete Teresa's Reality)"}
`,
      isUnlocked: () => Teresa.isUnlocked,
      tags: ["rm", "endgame", "lategame", "perks", "sacrifice", "boo", "ghost", "celestial"],
      tab: "celestials/teresa"
    }, {
      name: "Effarig, Celestial of Ancient Relics",
      alias: "Effarig",
      info: () => `
Effarig is the second Celestial you encounter.
They are unlocked by pouring at least ${format(TeresaUnlocks.effarig.price)} RM into Teresa's container.
<br>
<br>
Effarig introduces a currency called Relic Shards, which are obtained by using different kinds of Glyph effects during
a Reality. The number of distinct effects active during the Reality very strongly affects Relic Shard gain, and EP
affects it to a much lesser degree. Relic Shards are the currency for Effarig unlocks, and will be gained from every
Reality from now on.
<br>
<br>
Using Relic Shards, you can purchase multiple upgrades (see "Advanced Glyph Mechanics") which improve your Glyphs and
allow you to filter them based on their effects and rarity when you are doing fully automated Realities.
<br>
<br>
Effarig's final unlock is their own Reality at ${format(GameDatabase.celestials.effarig.unlocks.run.cost)} Relic
Shards.
${EffarigUnlock.run.isUnlocked
    ? "Their Reality is divided into three layers: Infinity, Eternity, and Reality. You must complete each layer " +
      "before getting access to the next one. Completing Effarig's Eternity unlocks the next Celestial."
    : "<div style='color: var(--color-effarig--base);'>(unlock Effarig's Reality to see details about it)</div>"
}
<br>
<br>
Completing Effarig's Reality unlocks
${EffarigUnlock.reality.isUnlocked
    ? `a new Glyph type, <span style='color: var(--color-effarig--base);'>Effarig</span> Glyphs. Effarig Glyphs have
      ${formatInt(7)} different possible effects, which you can view in the Glyph filter settings. You can only
      have one Effarig Glyph equipped at a time.
${Ra.unlocks.glyphEffectCount.canBeApplied
    ? `Due to having Effarig at level 10 within Ra, there are no longer any restrictions on effects that appear on
      Effarig Glyphs. Any given Effarig Glyph can now have up to all ${formatInt(7)} effects at the same time.`
    : `Effarig Glyphs can only have at most ${formatInt(4)} effects, and the RM multiplier and Glyph instability
      effects cannot appear together on the same Glyph.`}`
    : "<span style='color: var(--color-effarig--base);'>(complete Effarig's Reality to see reward details)</span>"}
<br>
<br>
`,
      isUnlocked: () => TeresaUnlocks.effarig.canBeApplied,
      tags: ["glyph", "sacrifice", "shards", "reality", "spectralflame", "lategame", "endgame", "celestial"],
      tab: "celestials/effarig"
    }, {
      name: "Advanced Glyph Mechanics",
      info: () => `
Glyph level Adjustment is purchasable for ${format(GameDatabase.celestials.effarig.unlocks.adjuster.cost)} Relic
Shards. This allows you to set weights for each resource (EP, DT, Replicanti, Eternities), in how much they affect the
level of Glyphs gained on Reality.
<br>
<br>
Automatic Glyph Filtering is purchasable for ${format(GameDatabase.celestials.effarig.unlocks.glyphFilter.cost)}
Relic Shards. This system uses one of many methods to assign a score to your Glyph choices, and then picks the choice
with the highest score. After picking this Glyph, it checks the score against a threshold and either keeps it if the
score is above the threshold, or sacrifices it instead. There are three basic modes:
<br>
<b>Lowest total sacrifice:</b> Glyphs are given a score based on how much sacrifice value you have of that
particular Glyph's type. Glyphs of the type you have the least sacrifice value in will have the highest score.
This mode does not have a threshold and always sacrifices your Glyphs.
<br>
<b>Number of effects:</b> Glyphs are given a score equal to the number of effects they have, and when multiple
Glyphs have the same effect count, Glyphs with higher rarity will be picked. The threshold they are
compared to is specified by your input in the text box.
<br>
<b>Rarity Threshold Mode:</b> Glyphs are given a score equal to their rarity percent. The comparison threshold
can be set individually per Glyph type.
<br>
<br>
Additionally, there are two more advanced modes with some additional flexibility. You may not need these initially, but
they can come in handy later on:
<br>
<b>Specified Effect Mode:</b> Glyphs are given a score equal to their rarity and checked against the rarity threshold
you specify, but this score is modified based on your inputs for effects. The Glyph will be checked for having a minimum
number of effects and having all of the effects you choose, and its score is lowered by ${formatInt(200)} for every
missing effect. This guarantees that any Glyph that does not have the effects you want will be below the threshold. You
can forbid specific Glyph <i>types</i> by setting impossible conditions (eg. at least ${formatInt(6)} effects on a Power
Glyph will prevent Power Glyphs from being selected).
<br>
<b>Effect Score Mode:</b> The score of a Glyph is calculated from its rarity plus the score of each effect it has,
and you can set the threshold and values of each effect individually. Some possible ways this could be used:
<br>
- Giving a weaker effect a value of ${formatInt(5)} allows you to keep Glyphs without that effect as long as they are
rarer to compensate for being weaker
<br>
- Assigning a large negative score to a certain effect you do <i>not</i> want will forbid Glyphs with that effect from
being selected; this can be useful for effect testing and other more limited situations
<br>
- Setting an impossible condition (eg. a threshold score of ${formatInt(999)} and all effects worth ${formatInt(0)})
will let you forbid entire types like Specified Effect Mode as well
<br>
<br>
The Glyph Filter mode is a global setting which applies to all Glyph types at once; for example, you cannot filter
power Glyphs with "Rarity Threshold" and time Glyphs with "Specified Effect". Selecting one mode will require
you to configure every Glyph type within its settings for proper filtering. Each filter mode has its own settings
which will be kept if you switch to another mode.
<br>
<br>
Unlocking the Glyph Filter also lets you use the highest Glyph score amongst your upcoming choices as a comparable
Currency in the Automator. Additionally, you can make your Filter force an immediate Reality (once available) if
none of the upcoming choices will be kept by the filter, as long as the Reality autobuyer is on.
<br>
<br>
Glyph Presets are purchasable for ${format(GameDatabase.celestials.effarig.unlocks.setSaves.cost)} Relic
Shards. This unlocks ${formatInt(7)} slots that allow you to save your currently equipped Glyphs into sets.
You cannot overwrite a set, you must delete it first. When you load a set, each Glyph in it is found and equipped.
If any are not found, it will display a warning, but equip all the rest regardless.
When loading a set, you can be Level and/or Rarity sensitive. The best Glyph from the possible Glyphs
will always be the one equipped. Just like other groups of circular Glyphs, you can click any of them
in order to bring up a modal summarizing the whole set of Glyphs.
`,
      isUnlocked: () => EffarigUnlock.adjuster.isUnlocked,
      tags: ["glyph", "weight", "adjustment", "sacrifice", "filter", "threshold", "set", "save", "reality", "lategame",
        "endgame"],
      tab: "celestials/glyphfilter"
    }, {
      name: "The Nameless Ones, Celestial of Time",
      alias: "Nameless Ones",
      info: () => `
The Nameless Ones are the third Celestial, unlocked by completing Effarig's Eternity.
<br>
<br>
When unlocking The Nameless Ones, you immediately gain access to two new mechanics related to time. You can store
"game time" by charging your Black Hole, and you can store "real time" by intentionally halting your production.
Stored game time is also used as a currency for purchasing unlocks from The Nameless Ones.
<br>
<br>
Charging your Black Hole gives you stored game time, which it does at the expense of setting your game speed to
${formatInt(1)}. The game is in effect using your increased game speed in order to store game time itself. Its
main use is to discharge the Black Hole, which takes uses your stored game time to skip forward in time by a duration
equal to the game time stored. This is different than regular game speed multipliers in that discharging is not subject
to any modifiers to game speed when it is used, only when it is stored.
<br>
<br>
Storing real time completely stops all production, effectively pausing your game. For every real-time second that
passes, you gain stored real time (modified by some efficiency factor). You can use stored real time in order to
amplify a Reality in the Glyphs tab. When you complete the Reality, this uses all of your stored real time at once
in order to attempt to repeat that
exact Reality over and over, giving you all the rewards you would normally get from the repetitions. For example, if
you have ${formatInt(50)} minutes stored and amplify a Reality which has lasted ${formatInt(10)} minutes and would
give ${format(DC.E30)} RM and ${format(DC.E12)} Relic Shards, the amplified Reality will give you ${format(5e30)} RM,
${format(5e12)} Relic Shards, ${formatInt(5)} Glyphs (subject to your filtering settings),
and ${formatInt(5)} Perk Points.
<br>
<br>
However, if your Reality has lasted for less than ${formatInt(1)} second, the amplification factor is capped by the
amount of seconds stored. For example, if you have ${formatInt(1000)} seconds stored and amplify a Reality which has
lasted ${format(0.2, 2, 2)} seconds, you will use ${formatInt(200)} seconds to simulate ${formatInt(1000)} Realities.
<br>
<br>
You can toggle a setting to automatically store offline time as stored real time.
<br>
<br>
Their first unlock costs ${format(TimeSpan.fromMilliseconds(ENSLAVED_UNLOCKS.FREE_TICKSPEED_SOFTCAP.price).totalYears)}
years of stored game time. It increases the softcap to Tickspeed Upgrades gained from Time Dimensions
(the point at which their cost starts increasing faster)
by ${format(1e5)} Tickspeed Upgrades.
<br>
<br>
At ${format(TimeSpan.fromMilliseconds(ENSLAVED_UNLOCKS.RUN.price).totalYears)} years of stored game time, you are able
to finally unlock their Reality. The reward for completing The Nameless Ones' Reality is
${Enslaved.isCompleted
    ? "unlocking Tesseracts, which have their own How To Play entry."
    : "<span style='color: var(--color-bad);'>(complete The Nameless Ones' Reality to see reward details)</span>"}
<br>
<br>
The Nameless Ones will not directly unlock the next Celestial.
`,
      isUnlocked: () => EffarigUnlock.eternity.isUnlocked,
      tags: ["reality", "time", "blackhole", "lategame", "endgame", "testers", "celestial",
        ...credits.people.map(p => p.name)
      ],
      tab: "celestials/enslaved"
    }, {
      name: "Tesseracts",
      info: () => `
Tesseracts are a new resource you unlock for completing The Nameless Ones' Reality.
<br>
<br>
Infinity Dimensions are normally capped at ${format(InfinityDimensions.HARDCAP_PURCHASES)} total purchases,
which limits how large their multipliers can grow since eventually you cannot upgrade them any more.
Tesseracts allow you to raise this cap by spending Infinity Points.
<br>
<br>
The cost of Tesseracts increases super-exponentially, but each successive Tesseract is significantly stronger than
the last in order to make up for that. Tesseract count is never reset, meaning that once purchased, you do not need
to reach the IP cost again in order to take advantage of the raised cap in later Realities.
<br>
<br>
You can see additional information about your current Tesseract count and the cost of the next one in the Infinity
Dimensions tab. Additionally, your current Infinity Points will now also show a percentage towards the next Tesseract.
If affordable, the Infinity button itself will visually change and bring you to the Infinity Dimension tab when clicked.
`,
      isUnlocked: () => Enslaved.isCompleted,
      tags: ["reality", "lategame", "endgame", "tesseract", "id", "celestial"],
      tab: "celestials/tesseract"
    }, {
      name: "V, Celestial of Achievements",
      alias: "V",
      info: () => `
V is a special Celestial in the sense that they are not unlocked by another Celestial,
but is instead unlocked by completing Achievement ID 151 (row ${formatInt(15)}, column ${formatInt(1)},
"You really didn't need it anyway"), which requires you to get ${formatInt(800)} Antimatter Galaxies
without buying 8th Antimatter Dimensions in your current Infinity.
<br>
<br>
After the subtab is unlocked from the Achievement, you are met with another set of requirements to fully unlock V.
You must have completed ${formatInt(GameDatabase.celestials.v.mainUnlock.realities.requirement)} Realities and have
${format(GameDatabase.celestials.v.mainUnlock.realityMachines.requirement)} unspent RM.
Additionally you need to reach ${format(GameDatabase.celestials.v.mainUnlock.eternities.requirement)} Eternities,
${format(GameDatabase.celestials.v.mainUnlock.infinities.requirement)} Infinities,
${format(GameDatabase.celestials.v.mainUnlock.dilatedTime.requirement)} Dilated Time, and
${format(GameDatabase.celestials.v.mainUnlock.replicanti.requirement)} Replicanti, all in the same Reality.
<br>
<br>
When you meet all of those requirements, you will be able to access V's Reality.
${VUnlocks.vAchievementUnlock.isUnlocked
    ? `However, completing the Reality itself is only the beginning. V has six different requirements, each of which
      require you to make a certain amount of progress within V's Reality. Completing a requirement rewards you with a
      V-Achievement.
      V-Achievements are permanent and persist after exiting V's Reality, and do not all need to be done simultaneously.
      <br>
      <br>
      After completing the requirement, the V-Achievement threshold then increases and can be completed again
      if you can reach the new goal.  You can complete each category of V-Achievement up to six times.
      Completed V-Achievements do two things:
      <br>
      - Upon reaching certain totals of V-Achievements, you automatically unlock upgrades on the V tab without needing
      to spend any resources.
      <br>
      - Each V-Achievement also gives you one Space Theorem.
      <br>
      <br>
      The goal reduction unlocked by having ${formatInt(2)} V-Achievements allows you to make some V-Achievement
      requirements easier to complete by spending Perk Points, down to a limit of whatever the easiest tier requires.
      The cost of reducing a goal does not increase as it is used, and will also reduce future tiers as well.
      <br>
      <br>
      Space Theorems allow you to purchase Time Studies which are normally forbidden, such as multiple paths in the
      Pace Split after the improved IP formula, or both Time Studies within a dark/light pair near the bottom.
      Like Time Theorems, they are freely given back every time you respec your studies.
      With enough Space Theorems you will eventually be able to purchase every single Time Study at once!
      <br>
      <br>
      Reaching ${formatInt(36)} V-Achievements (and therefore completing all of V's Achievements) unlocks the next
      Celestial.`
    : "<span style='color: var(--color-bad);'>(unlock V's Reality to see further details)</span>"}
`,
      isUnlocked: () => Achievement(151).isUnlocked,
      tags: ["reality", "lategame", "endgame", "girlfriend", "challenges", "achievement", "space", "theorems",
        "study", "triad", "celestial"],
      tab: "celestials/v"
    }, {
      name: "Ra, Celestial of the Forgotten",
      alias: "Ra",
      info: () => `
Ra is the fifth Celestial, unlocked by fully completing all of V's Achievements. They use their memories in order to
bring back positive effects from previous Celestials in a stronger way. Over time, you will unlock the previous four
Celestials <i>within</i> Ra, with each Celestial offering additional upgrades related to their original themes.
<br>
<br>
Each previous Celestial within Ra gains levels by using memories, which are generated passively over time from
Memory Chunks. Memory Chunks can only be gained by entering Ra's Reality, but inside of the Reality Chunks will
be generated passively based on certain resource totals. If you are storing real time, you will not gain any
Chunks inside of Ra's Reality, but Memories will still be generated normally. Having a total of
${formatInt(Ra.remembrance.requiredLevels)} levels across all Celestials unlocks Remembrance,
which allows you to choose a particular Celestial to gain more chunks while inside of Ra's Reality.
<br>
<br>
Memories can be spent on three things - an increase to Memory Chunk gain, an increase to Memory gain, and leveling up
the Celestial. You start Ra with only Teresa unlocked and each successive Celestial is unlocked by reaching level
${formatInt(8)} with the previous Celestial. Levels are capped at ${formatInt(25)}.
<br>
<br>
Teresa unlocks the ability to charge your Infinity Upgrades, making them much stronger. They also
improve your Glyph effects once you reach certain thresholds in Glyph sacrifice value.
<br>
<br>
At level ${formatInt(2)}, Effarig unlocks
${Ra.unlocks.effarigUnlock.canBeApplied
    ? "a new mechanic called Glyph Alchemy and later on also makes Effarig Glyphs stronger while gradually removing " +
      "almost all random elements of Glyph generation. Glyph Alchemy also has its own How To Play entry."
    : "<span style='color: var(--color-bad);'>(unlock Effarig within Ra to see unlock details)</span>"}
<br>
<br>
The Nameless Ones unlocks
${Ra.unlocks.enslavedUnlock.canBeApplied
    ? "additional mechanics related to charging the Black Holes, as well as making them significantly stronger."
    : "<span style='color: var(--color-bad);'>(unlock The Nameless Ones within Ra to see unlock details)</span>"}
<br>
<br>
V unlocks
${Ra.unlocks.vUnlock.canBeApplied
    ? "Triad Studies, which are new studies near the bottom of the tree which cost Space Theorems. Each Triad Study " +
      "requires you to also have the three nearby studies as well in order to purchase them. They also unlock a " +
      "smaller set of more difficult V-Achievements to complete for additional Space Theorems."
    : "<span style='color: var(--color-bad);'>(unlock V within Ra to see unlock details)</span>"}
<br>
<br>
Ra will not directly unlock the next Celestial.`,
      isUnlocked: () => VUnlocks.raUnlock.isUnlocked,
      tags: ["reality", "memories", "razenpok", "levels", "glyphs", "lategame", "endgame",
        "effarig", "teresa", "nameless", "v", "celestial"],
      tab: "celestials/ra"
    }, {
      name: "Glyph Alchemy Resources",
      info: () => `
Glyph Alchemy is a mechanic unlocked by reaching Effarig level ${formatInt(2)} in Ra. It unlocks the ability to
use up your Glyphs by refining them into Alchemy Resources associated with their type. You can refine Glyphs by
setting your Sacrifice Type to something other than "Always Sacrifice" in the Glyphs tab, and doing the normal
procedure for a sacrifice.
Each Alchemy Resource has a unique effect, which you can view on the Alchemy tab.
<br>
<br>
In addition to all their other properties, Glyphs now have a <i>refinement value</i> which determines how much of
its associated Alchemy Resource it is worth. This value is based on the cube of the Glyph's level, scaled
so that level ${formatInt(10000)} Glyphs correspond to ${formatInt(10000)} Alchemy Resources. A single Glyph itself,
however, only gives ${formatPercents(GlyphSacrificeHandler.glyphRefinementEfficiency)} of this value when refined.
These are values for ${formatPercents(1)} rarity Glyphs; Glyphs of lower rarity still have the same cap but give
proportionally less resources. For example, a ${formatPercents(0.5)} rarity Glyph will give only half as much.
<br>
<br>
Alchemy Resources cannot be gained indefinitely; there is a per-resource cap which is based on the highest refinement
value of all the Glyphs of that type you have refined. For example, if the highest level Time Glyph you have refined
is level ${formatInt(8000)} (refinement value: ${formatInt(GlyphSacrificeHandler.levelRefinementValue(8000))}), then no
matter how many Time Glyphs you refine, you can never have more than
${formatInt(GlyphSacrificeHandler.levelRefinementValue(8000))} of the Time resource until you refine another Time Glyph
with a higher refinement value.
`,
      isUnlocked: () => Ra.unlocks.unlockGlyphAlchemy.canBeApplied,
      // Oh god I'm so sorry this is so many words
      tags: ["reality", "lategame", "endgame", "ra", "effarig", "alchemy", "power", "infinity", "time", "replication",
        "dilation", "cardinality", "eternity", "dimensionality", "inflation", "alternation", "synergism", "momentum",
        "decoherence", "force", "exponential", "uncountability", "boundless", "unpredictability", "multiversal",
        "reaction"],
      tab: "reality/alchemy"
    }, {
      name: "Glyph Alchemy Reactions",
      info: () => `
Alchemy Resources can be combined together in certain combinations in order to create new compound resources, which
are unlocked at certain Effarig levels. Resources are combined once per Reality, unaffected by real time
amplification. Reactions have a higher yield and thus happen faster when your reagent amounts are higher. The cap for
compound resources is equal to the lowest cap amongst all of its reagents. In order for a reaction to occur, the
current amount of all reagents must be greater than the current amount of the produced resource.
<br>
<br>
Reaction speed is proportional to the amount of usable reagents for the reaction, but only reagent amounts above the
product amount are eligible for being used. For example, if you have ${formatInt(10000)} of all reagents and
${formatInt(7500)} of the product, only ${formatInt(2500)} of the reagents are used in calculating the reaction speed.
If you instead had ${formatInt(0)} of the product, <i>all</i> of the reagent is available for the reaction and it will
produce ${formatX(4)} faster. Lastly, if you had ${formatInt(10000)} of the product, then none of the reagent can be
used and the reaction will not run at all.
<br>
<br>
To activate or deactivate a reaction, click the circle corresponding to the reaction's product. When the reaction can
be applied, moving lines will be shown from all reagents to the product. If a connection is a solid line, that means
that the reaction cannot proceed due to not having enough of that reagent to get more of the product due to its cap.
`,
      isUnlocked: () => Ra.unlocks.unlockGlyphAlchemy.canBeApplied,
      tags: ["reality", "lategame", "endgame", "ra", "effarig", "alchemy", "power", "infinity", "time", "replication",
        "dilation", "cardinality", "eternity", "dimensionality", "inflation", "alternation", "synergism", "momentum",
        "decoherence", "force", "exponential", "uncountability", "boundless", "unpredictability", "multiversal",
        "reaction"],
      tab: "reality/alchemy"
    }, {
      name: "Imaginary Machines",
      info: () => `
Once you are able to gain at least ${format(MachineHandler.baseRMCap)} Reality Machines in a single Reality, you
unlock the ability to gain a new resource called Imaginary Machines. Reality Machines will also become hardcapped
at ${format(MachineHandler.baseRMCap)}; you will be unable to gain any more past this limit.
<br>
<br>
Additionally you unlock the Imaginary Upgrades tab, which contains a set of upgrades similar to the Reality Upgrades -
each upgrade has a condition you must fulfill to unlock it and an Imaginary Machine cost to actually purchase it.
The first two rows of upgrades can be repeatedly bought, while the other three are one-time upgrades.
<br>
<br>
Your iM amount is affected by two things:
<br>
<b>iM Cap</b> - There is a maximum amount of iM you can ever have, which is based on the highest RM amount you would
have been able to get if there were no RM cap. This is updated on a continual basis and thus will immediately increase
if you ever surpass your previous highest uncapped RM amount.
<br>
<b>Current iM</b> - Over time your current iM will passively rise towards your iM cap, in a way that slows down
exponentially as you approach the cap. By default iM slows down at a rate where the amount you are <i>missing</i>
(ie. your cap minus your current amount) is cut in half every minute. This growth rate is unaffected by any
modifiers to game speed.
<br>
<br>
Imaginary Machine upgrades will unlock the final two Celestials.
`,
      isUnlocked: () => MachineHandler.isIMUnlocked,
      tags: ["imaginary", "machines", "reality", "lategame", "endgame"],
      tab: "reality/imag_upgrades"
    }, {
      name: "Lai'tela, Celestial of Dimensions",
      alias: "Lai'tela",
      info: () => `
Lai'tela is the sixth Celestial, unlocked by purchasing the appropriate Imaginary Upgrade for
${format(ImaginaryUpgrade(15).cost)} iM.
<br>
<br>
Lai'tela gives a new currency called Dark Matter, which provides a multiplier to Continuum's effect
based on the highest amount of Dark Matter you have ever had. Dark Matter is produced by
Dark Matter Dimensions, in a similar cascading way to all other types of dimensions in the game. Unlike other
dimensions, there are only four Dark Matter Dimensions rather than eight. You start with the first one unlocked
immediately and the higher ones are unlocked via Imaginary Upgrades. When unlocking dimensions, you are given
${formatInt(1)} of the dimension and cannot gain more without having it produced from the next tier up.
<br>
<br>
Each Dark Matter Dimension, after a certain interval of time, generates two things: Dark Matter or the next lower
Dark Matter Dimension and another resource called Dark Energy. Dark Matter and Dark Matter Dimension production
per interval is equal to the product of your Dark Matter multiplier and the number of dimensions you have, while
Dark Energy production is independent of your dimension amount. Dark Energy is used to produce Singularities, which
have their own How To Play entry.
<br>
<br>
Dark Matter Dimensions can have their intervals upgraded down to a minimum of ${formatInt(10)}ms, at which point
you cannot upgrade the interval any further. You can choose to ascend Dark Matter Dimensions which reach
that point, which initially multiplies Dark Matter gain by ${formatInt(POWER_DM_PER_ASCENSION)} and Dark Energy by
${formatInt(POWER_DE_PER_ASCENSION)}. The interval gets multiplied by ${formatInt(1200)}, but can be upgraded once
again. Reaching ${formatInt(10)}ms again allows you to ascend again if you choose to.
<br>
<br>
An Imaginary Upgrade allows you to unlock a prestige called Annihilation. Annihilation resets your Dark Matter
and Dark Matter Dimensions, but adds to a permanent multiplier to Dark Matter that applies to all Dark Matter
Dimensions. You can Annihilate multiple times; the additions to the multiplier stack additively, and there is
no need to Annihilate for a greater addition each time. You must have at least
${format(Laitela.annihilationDMRequirement)} Dark Matter in order to Annihilate.
<br>
<br>
Lai'tela has a Reality which gives a multiplier to Dark Matter Dimensions' Dark Matter power based on how well you
do in the Reality. Whenever you complete the Reality in under ${formatInt(30)} seconds, your highest available
Dimension will be permanently disabled during further attempts of the Reality. Disabling all of your dimensions by
completing the Reality in under ${formatInt(30)} seconds eight times will also give you a ${formatX(8)} multiplier
to Dark Energy gain.
<br>
<br>
Lai'tela will not directly unlock the next Celestial.
`,
      isUnlocked: () => Laitela.isUnlocked,
      tags: ["omsi", "reality", "dark", "matter", "dimensions", "lategame", "endgame", "ascend", "celestial"],
      tab: "celestials/laitela"
    }, {
      name: "Continuum",
      info: () => `
When you unlock Lai'tela, your Antimatter Dimensions and Tickspeed Upgrades switch to a new mode of production
called Continuum, which gives the same effect as previously but allows for buying partial Dimension or
Tickspeed Upgrades. These fractional purchases are given for free without spending your antimatter and will provide
an appropriate portion of their multiplier.
<br>
<br>
The purchase buttons for Antimatter Dimensions and Tickspeed Upgrades become modified to display the number of upgrades
you would be able to purchase if Continuum was inactive, and the purchase count is scaled smoothly with antimatter.
For example, having ${format(2e7)} antimatter will give you a Continuum value of ${format(5.3, 0, 1)} for tickspeed
(initial cost of ${format(1e3)} and increase of ${formatX(10)}) since you can purchase it ${formatInt(5)} times and
are roughly ${formatPercents(0.3)} of the way to the next. Tickspeed Continuum in this case will then
give a production boost equal to (upgrade multiplier)<sup>${format(5.3, 0, 1)}</sup>.
<br>
<br>
Some upgrades will multiply Continuum value directly, which gives a production boost without affecting the cost
scaling. However, these upgrades will not function if Continuum is disabled on the Autobuyers page, which may result
in a loss of production if disabled. Continuum makes your autobuyers for Antimatter Dimensions and Tickspeed obsolete,
so all the related autobuyer settings for these autobuyers are now hidden on that tab as long as Continuum is active.
`,
      // Apparently continuumUnlocked is really important in a lot of places and if we keep it unlocked
      // Things break, so we check for the iMU instead.
      isUnlocked: () => ImaginaryUpgrade(15).isBought,
      tags: ["continuum", "purchase", "reality", "lategame", "endgame"],
      tab: ""
    }, {
      name: "Singularities",
      info: () => `
Singularities are a new resource which you can obtain using features within Lai'tela.
<br>
<br>
In order to obtain Singularities, you need to reach ${format(200)} Dark Energy. When you do, you get the option to
condense all your Dark Energy into a Singularity, resetting it back to zero. Any extra Dark Energy above this amount
do not carry over, and is thus wasted. Note that only Dark Energy is reset, the status of your Dark Matter and its
dimensions stays the same when condensing Singularities.
<br>
<br>
Once you reach ${formatInt(10)} Singularities, you can freely increase or decrease the Dark Energy requirement to
condense Singularities by a factor of ${formatInt(10)} (with a minimum of ${format(200)}). This increases or decreases
the number of Singularities gained from resetting at the cap by <i>more than</i> a factor of ${formatInt(10)}, making
higher caps worth more if you are willing to wait.
<br>
<br>
The purpose of Singularities is to unlock Singularity Milestones, which act similarly to Eternity Milestones. Unlocking
these milestones simply requires you to reach the total number of Singularities specified; Singularities are not spent.
There are three types of milestones - one-time milestones, milestones repeatable a limited number of times, and
milestones which can be repeated indefinitely.
<br>
<br>
Independently of the milestone type, milestones also have an icon indicating what kind of upgrade they generally give:
<br>
<b>ᛝ</b> These milestones help mechanics specific to Lai'tela
<br>
<i class="fas fa-arrows-alt"></i> These milestones let a resource in Lai'tela affect the rest of the game
<br>
<i class="fas fa-compress-arrows-alt"></i> These milestones improve Lai'tela based on something outside of Lai'tela
`,
      isUnlocked: () => Laitela.isUnlocked,
      tags: ["reality", "lategame", "endgame", "laitela", "dark"],
      tab: ""
    }, {
      name: "Pelle, Celestial of Antimatter",
      alias: "Pelle",
      info: () => `
When you purchase the last Imaginary Upgrade and unlock Pelle, you unlock their tab, where you can find a button to
"Doom your Reality". In order to Doom your Reality, you must have completed all ${formatInt(17)} rows of Achievements
available to you at this point, and attained ${formatInt(25000)} of each Alchemy Resource.
<br>
<br>
${Pelle.isDoomed
    ? `Dooming your Reality will start a new <b>Doomed Reality</b>, resetting almost the entire game up to
      Reality, not giving you any rewards from your progress in your current Reality.
      <br>
      <br>
      When you enter the Doomed Reality, you keep all values under the General and Reality headers in the Statistics
      tab and all of your best Challenge times. Inside Doomed Realities, multiple upgrades, Time Studies, Challenge and
      Celestial rewards, Perks, and other game mechanics are disabled or grant no reward.
      You can view the "Show effects in Doomed Reality" in Pelle tab for further information.
      <br>
      <br>
      Remnants are a new currency gained on Armageddon resets. Remnant gain is based on your best ever antimatter,
      Infinity Points, and Eternity Points across all Doomed Realities. Remnants produce Reality Shards which can be
      spent on Pelle Upgrades.
      <br>
      <br>
      Pelle Upgrades can be divided into two categories. The five upgrades in the first row can be repeatedly bought,
      but eventually reach a cap. They grant boosts to different aspects of the game, making progression within Doomed
      Realities easier.
      <br>
      <br>
      The other upgrades in the bottom rows offer automation and QoL (quality of life) improvements. Everything unlocked
      from these upgrades cannot be unlocked by their usual methods in the game; for example, none of the Normal
      Challenges will unlock autobuyers if completed since they are all locked behind Pelle Upgrades instead.
      You can toggle a button above upgrade to hide bought upgrades or click the
      <i class="fas fa-compress-arrows-alt"></i>-icon to collapse and hide the entire panel.
      <br>
      <br>
      <b>Hotkey: Z</b> will try to perform an Armageddon reset.`
    : "<span style='color: var(--color-bad);'><b>You must Doom your Reality to read the rest of this entry.</b></span>"
}
`,
      isUnlocked: () => Pelle.isUnlocked,
      tags: ["reality", "antimatter", "lategame", "endgame", "final", "hevipelle", "celestial", "doom"],
      tab: "celestials/pelle"
    }, {
      name: "Pelle Strikes",
      info: () => `
Pelle Strikes are encountered on different events in the Doomed Reality. You have encountered the first Pelle Strike by
reaching Infinity for the first time within a Doomed Reality. More Strikes eventually occur by further progression.
Each Pelle Strike adds a nerf to a specific aspect of the game, which can be seen by clicking on the Strike name.
Each Pelle Strike also unlocks a Rift bar.
<br>
<br>
Rift bars can be filled by clicking them to toggle between "Idle" and "Filling", although only two Rifts can be
"Filling" at any given time. When active, Rifts consume ${formatInt(3)}% of a Rift-specific resource per second. Each
Rift offers a Rift-specific effect which are based on the total amount filled.
${PelleStrikes.eternity.hasStrike
    ? `An exception for this is Decay/Collapse/Disarray, whose effect gets capped once you have drained a total of
    ${formatPostBreak(DC.E2000)} Replicanti.`
    : ""}
In addition, each Rift offers three milestone rewards for filling them up to a certain percentage.
`,
      isUnlocked: () => PelleStrikes.infinity.hasStrike,
      tags: ["reality", "antimatter", "lategame", "endgame", "final", "pelle", "strike", "rift", "celestial"],
      tab: "celestials/pelle"
    }, {
      name: "The Galaxy Generator",
      info: () => `
When you reach ${formatInt(100)}% Recursion/Dispersion/Destruction, you unlock the <b>Galaxy Generator</b>, which can
passively generate Galaxies. Generated Galaxies are like Replicanti Galaxies and Tachyon Galaxies in that they affect
tickspeed as if they were Antimatter Galaxies, but they do not increase the cost of your next Antimatter Galaxy. You
also unlock five new upgrades. The first upgrade increases the base amount of Galaxies generated. The other four
upgrades then give a multiplier to this base amount. The first two upgrades can be bought by spending antimatter and
Generated Galaxies. Replicanti or Tachyon Galaxies cannot be spent for purchasing those upgrades.
<br>
<br>
The <b>Galaxy Generator</b> has a maximum number of Galaxies it can generate, which can only be increased by draining
Rifts once the current cap has been reached.`,
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
