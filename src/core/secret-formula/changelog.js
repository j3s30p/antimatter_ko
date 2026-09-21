export const changelog = [
  /**
   * @template
   * {
   *  @property {Array: Number} date  Date of the release of the update, stored in order of year-month-date.
   *  @property {String} name         Name of the update entry. Optional.
   *  @property {Number} id           Unique ID for each entry (generated in-game, not explicitly stated)
   *  @property {function: @return String} info  Text body of information for the entry.
   * }
   */
  {
    date: [2026, 7, 17],
    name: "iOS 버전 출시 기념",
    info: `
iOS 공식 출시를 기념합니다! 이제 주머니 속에서도 빅 크런치를 실행할 수 있습니다.
우리의 차원을 iOS까지 확장하는 데 도움을 주신 모든 기여자 여러분께 진심으로 감사드립니다!
<br>
<br>
<b>추가 사항:</b><br>
<ul>
<li>크레딧에 iOS 테스터 추가</li>
<li>iOS 버전 링크 추가</li>
<li>모든 반물질 차원 자동구매기에 최대 구매/낱개 구매 전환 버튼 추가</li>
</ul>
<br>
<b>문구 변경:</b><br>
<ul>
<li>크레딧의 Android 개발자를 모바일 개발자로 변경</li>
</ul>
<br>
`
  },
  {
    date: [2024, 8, 12],
    name: "안녕, 라",
    info: `
<b>추가 사항:</b><br>
<ul>
<li>사용한 시간 정리를 오토메이터 화폐로 추가</li>
<li>천상 글리프 외형 세트에 다섯 번째 천상체의 문양 추가</li>
</ul>
<br>
<b>소규모 UI 변경:</b><br>
<ul>
<li>무한 돌파 업그레이드의 문구 개선</li>
<li>일부 버튼에 둥근 모서리 적용</li>
<li>항상 블랙홀 애니메이션을 사용하는 옵션 추가</li>
<li>글리프 외형에서 세 번째 천상체 문양의 크기 조정</li>
<li>무한 차원 및 시간 차원 구매 버튼이 축소되는 빈도 감소</li>
<li>무한 도전 보상을 아직 완료하지 않았어도 항상 표시</li>
<li>업적 118을 해금하고 차원 희생 자동구매기가 켜져 있으면 희생 버튼 비활성화</li>
</ul>
<br>
<b>버그 수정:</b><br>
<ul>
<li>오프라인 진행 중 블랙홀 펄스가 적용되지 않던 문제 수정</li>
<li>블랙홀 역전이 비활성화된 동안에도 작동하던 문제 수정</li>
<li>블랙홀 역전이 비활성화된 동안에도 슬라이더가 보이던 문제 수정</li>
</ul>
<br>
`
  },
  {
    date: [2024, 5, 2],
    name: "Android 리얼리티 업데이트 기념",
    info: `
Android 리얼리티 업데이트 출시를 축하합니다! 이 큰 이정표를 기념하기 위해 Android 버전 플레이어의
의견과 피드백을 중심으로 여러 변경 사항을 적용했습니다.
<br>
<br>
<b><i>다시 한번 반물질 차원을 플레이해 주셔서 진심으로 감사합니다!</i></b>
<br>
<br>
<b>주요 변경 사항:</b><br>
<ul>
<li>크레딧에 새로 참여한 Android 테스터 추가</li>
<li>새 특전 추가</li>
</ul>
<br>
<b>편의성 및 정보 개선:</b><br>
<ul>
<li>처음부터 다시 시작해도 연구 프리셋이 유지되며, 동료 글리프도 떠나지 않음</li>
<li>두 번째 천상체와 특전 상점의 해금 순서 교체</li>
<li>시간 연구 131에 추가 효과 부여</li>
<li>자동구매기 입력값을 Enter 키로 적용 가능</li>
<li>업적 118의 보상이 차원 희생 자동구매기를 개선</li>
<li>글리프 프리셋 설정의 기본값을 포함/증가로 변경</li>
<li>글리프 재활용 시 리얼리티 자동구매기에 설정한 글리프 레벨을 기준으로 효과 검사</li>
<li>이매진 머신 40 업그레이드를 모방한 일곱 번째 천상체 업그레이드 추가</li>
<li>탭 설정 창에 모든 탭 표시 버튼 추가</li>
<li>조건 잠금으로 자동 영원 도전이 비활성화됐을 때 안내 표시 추가</li>
<li>글리프의 문양색과 테두리색을 서로 바꾸는 옵션 추가</li>
<li>모던 UI에 표시되는 자원을 변경하는 기능 추가</li>
<li>지수 표기법 형식을 더 유연하게 조정하는 새 설정 창 추가</li>
<li>블랙홀이 비활성화된 동안 오토메이터가 블랙홀 명령을 무시하도록 변경</li>
<li>이매진 머신 1000 업그레이드 조건을 5초 이내 영원으로 변경</li>
<li>영원 도전에서 나갈 때 연구 트리가 자동으로 재분배되도록 변경</li>
<li>혼란을 일으키던 일곱 번째 천상체의 반복 구매 가능한 타키온 입자 업그레이드 비활성화</li>
<li>위 업그레이드 삭제에 맞춰 다섯 번째 막대의 세 번째 마일스톤 재조정</li>
<li>여러 소규모 문구 변경</li>
</ul>
<br>
<b>소규모 UI 변경:</b><br>
<ul>
<li>새 차원 자동구매기 대량 구매 특전에 맞춰 특전 배치 조정</li>
<li>글리프 전시 창의 정렬 순서를 일관되게 변경</li>
<li>밝고 어두운 글리프 희귀도 색각 보정 팔레트 추가</li>
<li>여러 사소한 UI 문제 수정</li>
</ul>
<br>
<b>버그 수정:</b><br>
<ul>
<li>Synergism 링크 수정</li>
<li>시간 차원 탭의 툴팁 수정</li>
<li>오프라인 진행 버그 수정</li>
<li>팝업의 글리프 희귀도 색상 버그 수정</li>
<li>오토메이터의 일시정지 명령이 잘못 틱을 진행하던 문제 수정</li>
<li>특정 자동구매기 입력값에서 NaN이 표시되던 문제 수정</li>
<li>시작 특전이 없는 저장 파일에서 발생하던 일부 오작동 수정</li>
<li>시간 연구 192가 비활성화됐을 때 콘솔 오류를 내던 문제 수정</li>
<li>일곱 번째 천상체의 시간 팽창 창에서 영원 포인트를 얻지 못한다고 잘못 안내하던 문구 수정</li>
<li>오토메이터 연구 문자열의 !가 올바르게 해석되지 않던 문제 수정</li>
<li>원격 기계 공정 잠금이 활성화됐을 때 모든 시간 차원 최대 구매 버튼이 오작동하던 문제 수정</li>
<li>내부 형식 변경으로 프리셋의 에파리그 글리프가 뒤섞이던 문제 수정</li>
<li>글리프 프리셋에서 레벨: 증가를 선택했을 때 가장 높은 레벨의 글리프를 고르지 않던 문제 수정</li>
<li>애니메이션을 켠 채 일곱 번째 천상체의 시간 팽창에 진입하면 잔재 수가 제대로 초기화되지 않던 문제 수정</li>
<li>EC! 기능과 연구 트리 재분배를 동시에 사용할 때 영원 도전의 시간 정리 비용이 잘못 계산되던 문제 수정</li>
<li>완전 완료 시 상수 데이터가 제대로 이어지지 않던 문제와 그 영향을 받은 저장 파일의 데이터 이전 수정</li>
<li>디자인 테마에서 중복 표시되던 업적 페이지 문구 제거</li>
<li>오프라인 진행 시간이 옵션의 1e6 제한을 초과하지 않도록 수정</li>
<li>세기의 오타 수정</li>
</ul>
<br>
`
  },
  {
    date: [2023, 7, 18],
    name: "최종 공식 패치",
    info: `
‘리얼리티 업데이트’ 이후의 패치는 주로 자주 보고된 버그를 고치고 많은 요청을 받은 기능을 구현하기 위한 것이었습니다.
하지만 이번 패치를 마지막 공식 패치로 계획하고 있습니다. 이번 변경에 따른 버그나 요청을 처리하는 소규모 패치가
몇 차례 있을 수 있으며, 발견되는 대로 수정하거나 추가할 예정입니다. 그 이후에도 더 많은 내용을 추가할 수 있지만
이제는 보장할 수 없으며, 앞으로의 변경에는 별도의 변경 내역이 없을 가능성이 큽니다.
<br>
<br>
<b><i>이 시점에서 게임의 공식 버전은 사실상 완성된 것으로 간주합니다.
반물질 차원을 플레이해 주셔서 진심으로 감사합니다!</i></b>
<br>
<br>
<b>새로운 기능:</b><br>
<ul>
<li>시간 연구 가져오기 문자열에 영원 도전이 포함되고 ‘!’로 끝나면 가져오는 즉시 해당 도전에 진입</li>
<li>시간 팽창과 아마겟돈 시 글리프 재분배 단축키 추가</li>
<li>Shift를 누른 채 리얼리티 버튼을 클릭하면 설정과 관계없이 글리프 선택 창 표시</li>
<li>특전 배치 3종 추가(정사각형, 가로 격자, 시작점과의 거리)</li>
<li>일부 리얼리티 및 허수 업그레이드에 ‘업그레이드 잠금’을 설정하여 해금 조건을 실패하게 만드는
수동·자동 행동을 자동으로 방지</li>
<li>글리프 필터 설정을 텍스트로 가져오고 내보내는 기능 추가</li>
<li>예정된 선택지가 모두 필터에 거부될 경우, 가능해지는 즉시 자동 리얼리티를 실행하도록 설정 가능
(자동구매기가 켜져 있어야 함)</li>
<li>현재 및 총 공간 정리를 오토메이터 화폐로 추가</li>
<li>게임이 비활성 창이 되거나 기기가 절전 모드에 들어가 중단됐을 때 오프라인 시간 시뮬레이션 비활성화 가능</li>
<li>통계 탭에 저장 파일 생성 시각 정보 추가</li>
<li>Android 버전과 마찬가지로 주기적인 로컬 자동 백업 수행</li>
</ul>
<br>
<b>편의성 및 정보 개선:</b><br>
<ul>
<li>게임 시작 튜토리얼에서 플레이 방법을 더 강조</li>
<li>보상이 있는 업적의 왼쪽 아래에 추가 아이콘 표시</li>
<li>무한 및 영원 자동구매기의 ‘시간’ 또는 ‘최고 기록의 X배’ 모드에서 다음 명성 초기화 시점을
설정 상자의 상태 문구로 표시</li>
<li>현재 리얼리티에서 한 번이라도 해금한 영원 도전은 완료 전에 다른 도전을 해금하더라도 탭에 계속 표시</li>
<li>초기 몇 차례의 리얼리티에서 자원 따라잡기 창에 더 자세한 정보 표시</li>
<li>영원 업그레이드 2 특전의 영향을 받는 업그레이드 비용 문구를 더 정확하게 표시</li>
<li>글리프를 선택하지 않고 실수로 리얼리티를 실행할 수 없도록 변경. 선택 전에는 확인 옵션이 표시되지 않음
(희생 해금 후 선택 창을 비활성화하면 여전히 게임이 무작위로 선택)</li>
<li>최근 명성 초기화의 리얼리티 기록에서 필요할 때 허수 머신 표시</li>
<li>게임 기능을 더 정확히 설명하도록 여러 플레이 방법 항목을 갱신하거나 명확화</li>
<li>최근 명성 초기화 탭에 표시 옵션 추가</li>
<li>여러 소규모 문구 변경</li>
</ul>
<br>
<b>소규모 UI 변경:</b><br>
<ul>
<li>차원 구매 횟수 툴팁이 위가 아닌 왼쪽에 표시되도록 변경</li>
<li>모던 UI의 무한 돌파 탭 문양 변경</li>
<li>시간 연구 가져오기 창의 정보와 가져오기 이미지를 두 열로 배치해 스크롤 감소</li>
<li>시간 연구 31과 다른 업그레이드의 상호작용 명확화</li>
<li>영원 도전에 완료 횟수를 나타내는 시각적 오버레이 추가</li>
<li>보상을 받을 수 있는데 리얼리티 초기화만 하려 할 경우 더 강한 경고 표시</li>
<li>최근 장착 해제한 글리프 아이콘 추가</li>
<li>현재 테마에 맞춰 글리프 배경을 흑백으로 설정하는 ‘자동’ 배경색 모드 추가</li>
<li>글리프 희귀도별 색상 대비 개선 및 희귀도나 유형에 따른 장식 테두리 추가</li>
<li>일부 상황에서 모든 글리프를 장착 해제할 수 없는 이유를 설명하는 메시지 창 추가</li>
<li>에파리그 글리프 효과를 ‘천상 순서’로 표시</li>
<li>전체 레벨 감소 효과가 활성화되면 <i>보관함</i>의 글리프에도 감소된 레벨 표시</li>
<li>네 번째 천상체 탭에서도 저주받은 글리프 제작 가능</li>
<li>특이점 마일스톤 버튼의 빛나는 효과 비활성화 가능</li>
</ul>
<br>
<b>버그 수정:</b><br>
<ul>
<li>저장 슬롯 변경 시 무한 포인트/영원 포인트 획득률이 제대로 갱신되지 않던 문제 수정</li>
<li>시간 연구 프리셋의 이름이 중복되지 않도록 변경</li>
<li>시간 팽창 중 무한 포인트가 무한대 미만일 때 영원 버튼의 스타일이 잘못되던 문제 수정</li>
<li>시작 특전이 없을 때 글리프 균일성 기능이 제대로 작동하지 않던 문제 수정</li>
<li>일부 글리프 정보가 테마색 대신 배경색을 기준으로 표시되던 문제 수정</li>
<li>편집기 외 탭에서 오토메이터 실행 취소/다시 실행이 작동하지 않도록 변경</li>
<li>구매한 음악 글리프가 외형 초기화 시 일반 글리프로 바뀌던 문제 수정</li>
<li>글리프 프리셋 불러오기의 허용 범위를 넓혀 실패 가능성 감소</li>
<li>일부 상황에서 첫 번째 천상체의 리얼리티 머신 기록이 잘못 추적되던 문제 수정</li>
<li>글리프 필터가 가끔 희귀도를 제대로 비교하지 않던 문제 수정</li>
<li>특정 상황에서 일곱 번째 천상체의 글리프 슬롯이 제대로 나타나거나 사라지지 않던 문제 수정</li>
<li>여섯 번째 천상체 아이콘의 정렬 문제 수정(@mrkrutaman 제공)</li>
<li>이미 구매한 모든 글리프 외형의 인앱 구매 비활성화</li>
<li>절전 모드의 오프라인 시간으로 실제 시간 자원을 얻지 못하던 문제 수정</li>
<li>절전 모드 오프라인 시뮬레이션이 오프라인 시간 설정을 올바르게 사용하도록 수정</li>
<li>일부 단축키 입력에 누락된 알림 추가</li>
<li>표준 표기법이 더 큰 정수를 올바르게 표시하도록 수정</li>
<li>깨진 링크가 있는 뉴스 티커 제거</li>
<li>그 밖의 여러 소규모 버그 수정</li>
</ul>
<br>
`
  },
  {
    date: [2023, 5, 25],
    name: "배수 탭, 오토메이터 및 주요 게임 기능 수정",
    info: `
<b>배수 탭:</b><br>
<ul>
<li>복제자 속도 배수 탭 추가</li>
<li>거듭제곱 효과를 같은 값의 배수로도 표시 가능</li>
<li>일반 도전 12에서 반물질 차원 탭이 특별하게 작동</li>
<li>항목이 하나뿐이어도 ‘업적’, ‘시간 연구’ 같은 일반 범주를 열 수 있도록 변경</li>
<li>배수 탭의 게임 속도에는 팽창 시간이 주는 감소 효과가 적용되지 않도록 변경</li>
<li>개별 업그레이드를 가리키는 항목의 문구를 더 일관되게 변경</li>
<li>누락된 여러 효과를 추가하고 잘못 표시된 효과 수정</li>
</ul>
<br>

<b>오토메이터 기능:</b><br>
<ul>
<li>오른쪽 위의 오토메이터 관련 알림에 전용 색상 적용</li>
<li>페이지를 새로고침해도 상수 순서가 일정하게 유지</li>
<li>새 스크립트의 이름이 기본적으로 중복되지 않도록 강제</li>
<li>NOTIFY 명령에서 작은따옴표와 큰따옴표 혼용 지원</li>
<li>개별 상수 삭제 버튼과 모든 상수 삭제 버튼 추가</li>
<li>실행 취소/다시 실행 기능 추가</li>
<li>모든 연구 프리셋을 오토메이터 상수로 가져오기 가능</li>
<li>다음 BH1/BH2 활성화를 기다리는 WAIT 기능 추가</li>
<li>스크립트 실행을 즉시 멈추는 STOP 명령 추가</li>
<li>선택 가능한 글리프 중 가장 높은 필터 점수를 비교용 변수로 사용 가능</li>
</ul>
<br>

<b>오토메이터 버그 수정:</b><br>
<ul>
<li>블록을 텍스트로 변환할 때 오류가 있는 줄을 지나치게 삭제하지 않도록 변경</li>
<li>블록 중첩이 바뀔 때 이후 모든 블록의 내부 내용이 지워지던 문제 수정</li>
<li>오류가 있는 스크립트를 실행하려다 게임이 종료되던 문제 수정</li>
<li>오토메이터 상수와 내장 키워드가 올바르게 비교되지 않던 문제 수정</li>
<li>REALITY 명령으로 스크립트가 재시작될 때 첫 줄을 건너뛰던 문제 수정</li>
<li>오토메이터 텍스트 편집기의 구문 색상 오류 수정</li>
<li>게임 완전 완료 후 일부 자원의 초기화를 오토메이터가 막던 문제 수정</li>
</ul>
<br>

<b>게임 기능 수정:</b><br>
<ul>
<li>전멸 후 어둠 에너지가 초기화되지 않도록 변경</li>
<li>빈 보관함 슬롯이 5개 미만이면 파멸을 실행할 수 없도록 변경</li>
<li>‘한도까지 정제 후 희생’ 모드에서 관련 자원이 잠겨 있으면 희생하도록 변경</li>
<li>오프라인 상태에서 조건을 충족해도 비밀 업적 46을 정상 획득</li>
<li>실제 시간을 저장해도 자동구매기가 틱을 진행</li>
<li>글리프 탭에서 천상체 리얼리티를 나가려 할 때 창이 오작동하고 게임이 종료되던 문제 수정</li>
<li>스피드런의 인앱 구매 표시를 더 일관되게 갱신</li>
<li>증폭 때문에 리얼리티 버튼의 예상 리얼리티 머신 값이 잘못 표시되던 문제 수정</li>
<li>일부 상황에서 블랙홀이 영구 비활성 상태에 갇히던 문제 수정</li>
<li>글리프 실행 취소 시 음수 글리프 개수가 제대로 갱신되지 않던 문제 수정</li>
<li>글리프 일괄 정리 창에서 동일한 글리프를 올바르게 계산</li>
<li>글리프 일괄 정리 창이 가끔 나타나지 않던 문제 수정</li>
<li>새 글리프 난수 생성과 음수 시드 값의 부자연스러운 상호작용 수정</li>
<li>증폭된 리얼리티 후 글리프 난수 시드가 진행되지 않던 문제 수정</li>
</ul>

<br><b>기타 변경 사항:</b><br>
<ul>
<li>글리프를 대량 희생하는 일괄 정리 창을 숨기는 확인 설정 추가</li>
<li>특정 조건에서 저장 파일을 가져올 때의 UI 동작 개선</li>
<li>테레사의 영원 업그레이드 시작 업그레이드가 이전 진행에도 소급 적용</li>
<li>오프라인 틱의 최소 간격을 50ms에서 33ms로 변경</li>
<li>기기 절전 모드로 생긴 ‘오프라인’ 진행을 한 번의 큰 틱으로 적용하는 대신 오프라인 시간처럼 시뮬레이션</li>
<li>오프라인/절전 모드 최대 시간을 6시간에서 24시간으로 증가</li>
<li>테레사의 특전 상점을 가리키는 문구를 더 일관되게 통일</li>
<li>문구가 겹치지 않도록 천상체 탐색의 V 항목 위치 조정</li>
<li>AMOLED 테마에서 크레딧 스크롤에 올바른 테마 적용</li>
<li>블랙홀 해금 시 업적 142가 해금되지 않던 문제 수정</li>
<li>리얼리티 글리프 외형의 색상이 제대로 처리되지 않던 문제 수정</li>
<li>시간 팽창 밖에서 시간 팽창 나가기 창이 잘못 나타나지 않도록 수정</li>
<li>그 밖의 소규모 문구와 오타 수정</li>
</ul>
<br>
`
  },
  {
    date: [2023, 4, 7],
    name: "스피드러너와 글리프 난수 생성",
    info: `
<b>주요 변경 사항:</b><br>
<ul>
<li><b>2~21번째 리얼리티의 글리프 난수 생성을 완전히 개편했습니다.</b> 새 방식은 해당 리얼리티에서 효과가
더 고르게 나오도록 합니다. 연속된 리얼리티 5회마다 모든 글리프 유형이 정확히 4번씩 등장하며,
각각의 효과는 그 네 선택지 중 <i>최소 한 번</i> 반드시 나타납니다.
</li>
<li>위 변경의 두 가지 영향으로 2효과 글리프가 더 흔해졌고(복제와 시간 팽창은 약 30%, 나머지 셋은 약 140%),
이 버전을 처음 불러올 때 <i>현재</i> 리얼리티의 글리프 선택지가 달라질 수 있습니다.</li>
<li>스피드런 저장을 시작할 때 게임 완료 후 원래 이어지는 모든 통계가 정상적으로 유지</li>
<li>이전 스피드런 기록을 저장 파일에 보관하고 새 하위 탭에서 비교 가능</li>
<li>아직 리얼리티를 실행하지 않았다면 스피드런 중 게임 내에서 글리프 난수 시드 수정 가능</li>
<li>Android 리얼리티 업데이트 테스트에 최근 참여한 사람들을 크레딧에 추가</li>
<li>‘완전한 종결’ 업그레이드가 <i>모든</i> 글리프 유형에 적용</li>
</ul>
<br>

<b>새 편의 기능:</b><br>
<ul>
<li>최종 업적 획득 후 통계의 실제 시간 일시정지</li>
<li>특전 트리의 조작 반응성 전반 개선</li>
<li>기본 특전 트리 배치 2종 추가(Android 버전 격자와 블랙홀)</li>
<li>영원 도전 자동구매기 특전 보유 시 영원 자동구매기가 즉시가 아닌 최대 완료 횟수에서만 작동</li>
<li>각 글리프 외형을 모두 초기화하는 버튼 추가</li>
<li>상단 버튼으로 도전에서 나갈 때 확인 창 추가</li>
<li>글리프 필터 아이콘을 Shift+클릭하면 다음으로 <i>낮은</i> 기준값으로 이동</li>
<li>글리프 프리셋 슬롯 2개 추가(5개 → 7개)</li>
<li>이번 리얼리티에서 복제자 최대치와 팽창 시간에 도달할 예상 시간 추가</li>
<li>시간 팽창 버튼에 마우스를 올리면 모든 예상 시간 툴팁을 동시에 표시</li>
<li>이미 구매한 시간 팽창 연구를 클릭하면 관련 탭으로 이동</li>
<li>게임 완전 완료 후 진행도에 잠긴 모든 옵션을 영구적으로 변경 가능</li>
</ul>
<br>

<b>UI 및 배치 개선:</b><br>
<ul>
<li>스피드런 시간의 시간 단위를 세 자리로 표시하고 일부 하위 탭에서 END 형식을 숨김</li>
<li>일부 테마의 자동구매기 입력 상자 대비 개선</li>
<li>통계 탭의 리얼리티 제목에 일곱 번째 천상체 관련 통계도 표시</li>
<li>유물 파편 희귀도 보너스와 저주받은 글리프의 작동 방식 명확화</li>
<li>관련 상황에서 8차 무한 차원에 초당 % 표시 추가</li>
<li>오프라인 진행 항목에 시간 정리 추가</li>
<li>플레이 방법의 블랙홀 항목에 비용 증가 방식 추가</li>
<li>연속체 활성화 시 반물질 차원 구매 버튼을 여섯 번째 천상체 스타일로 변경</li>
<li>밝은/어두운 시간 연구의 구매 가능 및 구매 완료 상태 대비 개선</li>
<li>접힌 스피드런 위젯의 화면 점유 공간 감소</li>
<li>그 밖의 여러 소규모 문구 수정</li>
</ul>
<br>

<b>버그 수정:</b><br>
<ul>
<li>외형을 바꾼 동료 글리프의 글리프 세트 이름 오류 수정</li>
<li>‘게임 정보’의 깨진 외부 링크 수정</li>
<li>일부 상황에서 반물질 차원 자동구매기 설정을 변경할 수 없던 문제 수정</li>
<li>분수 무한/영원 횟수의 표시 오류 수정</li>
<li>최근 명성 초기화 탭에서 증폭을 올바르게 반영</li>
<li>저장 파일 전환 시 하위 탭이 바뀌던 문제 수정</li>
<li>일부 상황에서 복제자 예상치가 갱신 주기를 제대로 반영하지 않던 문제 수정</li>
<li>‘정보의 덧없음’이 리얼리티 머신 조건을 잘못 계산하던 문제 수정</li>
<li>그 밖의 여러 소규모 버그 수정</li>
</ul>
`
  },
  {
    date: [2023, 2, 22],
    name: "시각 요소와 코드 준비",
    info: `
<b>큰 변경 사항:</b><br>
<ul>
<li>클라우드 저장은 한 번에 슬롯 하나만 저장하며 주기를 5분에서 10분으로 변경.
  <b>클라우드를 사용한다면 만일을 대비해 저장 파일을 로컬에도 백업해 주세요. 철저한 테스트가 어려웠으며
  여러분의 저장 파일이 손실되는 일을 원하지 않습니다.</b></li>
<li>최상의 환경을 위해 테마를 v10으로 갱신해 주세요(새 비밀 테마 추가)</li>
<li>폰트 파일의 블롭에 색상 추가</li>
<li>최근 명성 초기화 페이지를 더 많은 정보가 담긴 정돈된 표로 변경</li>
<li>게임 처리가 너무 느릴 때 다중우주 효과로 UI가 멈추지 않도록 수정</li>
<li>게임의 오픈 소스화를 준비하기 위해 백엔드와 GitHub 저장소를 대대적으로 변경</li>
</ul>
<br>

<b>새 편의 기능:</b><br>
<ul>
<li>영원 포인트 5배 구매가 항상 시간 차원 자동구매기보다 먼저 작동</li>
<li>자동 리얼리티에 시간 및 유물 파편 모드 추가</li>
<li>게임 완전 완료를 넘어선 총 시간 추적 추가</li>
<li>잘못된 게임 동작 가능성을 줄이도록 일부 플레이어 속성의 기본값 변경</li>
<li>연구 탭에서 생성/총 시간 정리의 표시 순서를 바꾸는 옵션 추가</li>
<li>자원/시간당 명성 초기화 최적화 정보 확장</li>
<li>역전된 블랙홀의 새 애니메이션 추가</li>
</ul>
<br>

<b>UI 및 배치 개선:</b><br>
<ul>
<li>일부 브라우저에서 옵션 드롭다운이 흐리게 보이던 문제 수정</li>
<li>일부 숫자의 소수점 자릿수가 잘못되거나 표기법을 사용하지 않던 문제 수정</li>
<li>일곱 번째 천상체에서 장착할 수 없는 글리프 안내 문구 추가</li>
<li>여러 곳에서 게임 시간/실제 시간의 작동 방식을 더 명확하게 설명</li>
<li>시간 연구 21의 효과를 배수로 표시</li>
<li>리얼리티 업그레이드 버튼의 대비 향상</li>
<li>‘업적 조건 불필요’ 특전이 더 일관되게 작동하도록 변경</li>
<li>크레딧의 일부 항목 갱신</li>
<li>이번 리얼리티의 최대 팽창 시간 추가</li>
<li>일곱 번째 천상체에서 여러 요소가 시각적으로 비활성화되지 않던 문제 수정</li>
<li>그 밖의 여러 소규모 수정</li>
</ul>
<br>

<b>버그 수정:</b><br>
<ul>
</li><li>모던 UI 사이드바의 자원이 잘못 반올림되던 문제 수정
</li><li>게임 완료 후 새 게임에서 발생하던 오토메이터 오류 수정
</li><li>일부 뉴스 항목의 통계가 제대로 갱신되지 않던 문제 수정
</li><li>뉴스 반복 방지 버퍼가 작동하지 않던 문제 수정
</li><li>일부 뉴스 메시지의 진행도 잠금 조건 갱신
</li><li>비밀 업적 12와 42의 예외 상황 수정
</li><li>오프라인 진행에서 다섯 번째 천상체의 세 번째 기억 이름이 잘못 표시되던 문제 수정
</li><li>시간 팽창 상태의 플레이가 영원 포인트를 주지 않거나 기록에 남지 않던 문제 수정
</li><li>일곱 번째 천상체에서 복제자 시간이 잘못되던 문제 수정
</li><li>잠긴 자동구매기를 단축키로 변경할 수 있던 문제 수정
</li><li>일곱 번째 천상체에서 연속체 플레이 방법 항목이 사라지던 문제 수정
</ul>
`
  },
  {
    date: [2023, 1, 26],
    name: "시간 장벽 완화",
    info: `
<b>밸런스 변경:</b><br>
<ul>
<li>영원 도전 4의 무한 횟수 조건이 더 느리게 증가(단계당 5천만 → 2천5백만)</li>
<li>영원 도전 11의 모든 단계 목표를 e50만큼 감소</li>
<li>세 번째 천상체 힌트의 가시성 개선(진행도를 항상 표시하고 10배 빠르게 누적)</li>
<li>블랙홀 자동 펄스가 99%에서 항상 충전을 강제하며 충전 비율 조정 기능 제거</li>
<li>가속도가 2.5배 빠르게 증가</li>
<li>최종 특이점 마일스톤 감소(8e45 → 2.5e45)</li>
<li>스피드런 시작 시 업적 35와 76도 획득</li>
</ul>
<br>

<b>새 편의 기능:</b><br>
<ul>
<li>시간 연구 트리 가져오기 창을 닫아도 입력한 문구 유지</li>
<li>시간 연구 불러오기에 ‘재분배 후 불러오기’ 버튼/옵션 추가</li>
<li>글리프 보관함에 ‘레벨순 정렬’ 추가</li>
<li>자동 영원 도전 일시정지 시 다음 도전을 완료하지 않고 보유</li>
</ul>
<br>

<b>버그 수정:</b><br>
<ul>
<li>모던 메트로 테마에 올바른 반물질 차원 색상 적용</li>
<li>클라우드 저장 충돌 옵션 버튼이 정상 작동</li>
<li>‘10개 구매’ 배수를 항상 표시</li>
<li>무한 돌파 전 단축키 사용 시 빅 크런치 창이 나타나지 않도록 수정</li>
<li>다음 영원 도전 보상이 최대치에서도 ‘다음:’을 표시</li>
<li>최대 완료 후 영원 도전 조건이 더 이상 증가하지 않도록 수정</li>
<li>일부 상황에서 동료 글리프가 글리프로 계산되던 문제 수정(레이틸라의 엔트로피, 탐색, 업적)</li>
<li>블랙홀 관련 업적이 표시 간격/지속 시간에 반영되지 않던 문제 수정</li>
<li>다섯 번째 천상체 시간이 실제 시간 저장을 반영</li>
<li>불안정화 후 여섯 번째 천상체의 문구가 제대로 갱신</li>
</ul>
<br>

<b>소규모 변경:</b><br>
<ul>
<li>클라우드 충돌 감지 개선(영원 초반의 영원 횟수 및 시간 팽창의 최대 팽창 시간)</li>
<li>클라우드 저장 시 Google 정보를 숨기는 기능 추가</li>
<li>플레이 방법에 ‘자주 쓰는 약어’ 추가</li>
<li>최대 복제자 문구 추가</li>
<li>명성 초기화 버튼의 분당 무한 포인트/영원 포인트 숨김 기준 감소</li>
<li>완전히 완료한 영원 도전 연구에 윤곽선 추가</li>
<li>외형에 세 번째 천상체 아이콘 추가</li>
<li>클립이 더 잘 보이도록 변경</li>
<li>추가 오타 수정 및 여러 소규모 문구 개선</li>
</ul>
`
  },
  {
    date: [2023, 1, 9],
    name: "동료 글리프는 당신을 해치고 싶지 않아요",
    info: `
<b>게임 기능 변경:</b><br>
<ul>
<li>무한 돌파의 무한 포인트 자동 생성 업그레이드 상향(상한이 165ms마다 한 번에서 100ms마다 한 번으로 바뀌고,
  최고 속도 33ms 대신 50ms에서 상한 도달)</li>
<li>오프라인 틱의 최소 길이를 50ms로 제한</li>
<li>글리프 관련 조건에서 동료 글리프를 글리프로 계산하지 않도록 변경</li>
</ul>
<br>

<b>버그 수정:</b><br>
<ul>
<li>허수 머신 200/1000 업그레이드가 잠겨 있어도 허수 머신 6 업그레이드가 비활성화되던 문제 수정</li>
<li>자동 영원이 잘못된 모드일 때도 허수 머신 200 업그레이드가 적용되던 문제 수정</li>
<li>영원 업그레이드 1 특전이 구매 즉시 정상 적용</li>
<li>영원 포인트 기반 자동구매기보다 영원 업그레이드 2 특전을 항상 먼저 확인</li>
<li>다른 천상체 리얼리티에서 일곱 번째 천상체에 진입할 수 있던 문제 수정</li>
<li>일곱 번째 천상체 초반에 자동구매기를 변경할 수 없던 문제 수정</li>
<li>영원 도전 자동구매기 특전이 최대 무한 포인트 대신 현재 무한 포인트를 사용하던 문제 수정</li>
<li>다른 저장 파일을 불러올 때 ‘새 항목!’ 알림 제거</li>
<li>무한 도전 5에서 일반 도전 9 효과가 틱스피드 비용에 잘못 적용되던 문제 수정</li>
</ul>
<br>

<b>문구 변경:</b><br>
<ul>
<li>애니메이션 테마의 지연 경고 추가</li>
<li>무한 포인트 공식 관련 잘못된 문구 수정</li>
<li>업적 156이 생성된 시간 정리에만 적용됨을 명확화</li>
<li>조금 오래된 플레이 방법 항목 갱신</li>
<li>플레이 방법의 글리프 필터 및 연금술에 추가 정보 기재</li>
<li>복제 글리프 효과의 팽창 시간 배수가 매우 작은 수를 사용하지 않도록 문구 변경</li>
<li>특전 문구의 일관성 개선</li>
<li>표기법이 적용되지 않았거나 숫자 숨김 설정을 따르지 않던 곳 수정</li>
<li>여러 구두점 불일치 수정</li>
<li>갱신 속도보다 짧아도 빅 크런치 자동구매기가 항상 간격을 표시</li>
<li>영원 도전 8의 무한 차원 구매 횟수를 페이지 위쪽으로 이동</li>
<li>복제자가 적을 때 타이머에 ‘약’ 표시 추가</li>
<li>반물질 은하 버튼 문구에 특정 자원의 초기화를 막는 업적 반영</li>
<li>상한에 도달한 업그레이드/효과를 여러 곳에서 안내</li>
<li>12월 26일까지의 뉴스 티커 제안 추가 및 잘못된 뉴스 수정</li>
</ul>
`
  },
  {
    date: [2022, 12, 21],
    name: "출시 후 첫 패치",
    info: `
<b>기타 여러 변경 사항:</b><br>
<ul>
<li>일반 도전 6에서 업그레이드 구매 시 하위 차원을 실제로 소모하지 않던 문제 수정</li>
<li>물질 규모 문구(‘모든 반물질이…’)가 초당 한 번만 바뀌도록 변경</li>
<li>무한 도전 3과 리얼리티 업그레이드의 일부 문구 넘침 문제 수정</li>
<li>리얼리티 알림 문구 개선</li>
<li>틱스피드 도전 완료 전에 Alt+T 단축키가 작동하지 않던 문제 수정</li>
<li>특정 비밀 테마에서 글리프 툴팁이 나타나지 않던 문제 수정</li>
<li>도전 제목을 클릭하면 가장 안쪽 도전의 탭으로 이동</li>
<li>영원 업그레이드 1 특전이 수동뿐 아니라 모든 영원 획득 방식에 적용</li>
<li>‘거대해졌다’ 업적 관련 버그 수정</li>
<li>여러 오타 수정</li>
<li>어두운 테마의 구매 불가능한 업그레이드 스타일 변경 되돌림</li>
<li>영원 도전 11에서 무한 차원/시간 차원 배수 탭이 사라지던 문제 수정</li>
<li>비어 있거나 잘못된 오토메이터 스크립트를 실행할 때 게임이 종료되던 문제 수정</li>
<li>천상체 콘텐츠의 일부 버그 수정</li>
</ul>
`
  },
  {
    date: [2022, 12, 17],
    name: "리얼리티 업데이트",
    info: `
<b>주요 내용:</b><br>
<ul>
<li>리얼리티 명성 초기화 단계 추가.</li>
<li>글리프 추가.</li>
<li>리얼리티 업그레이드 추가.</li>
<li>특전 추가.</li>
<li>오토메이터 추가.</li>
<li>블랙홀 추가.</li>
<li>천상체 추가.</li>
<li>새 모던 UI 스타일 추가. 기존 UI는 클래식 UI로 계속 이용 가능.</li>
<li>브라우저 경고, 확인, 입력창을 대체하는 게임 내 창 추가.</li>
<li>기존보다 훨씬 자세한 플레이 방법 창 추가.</li>
<li>업적 5줄 추가.</li>
<li>배수 상세 분석 하위 탭 추가.</li>
<li>니콜라스 케이지 추가.</li>
<li>모든 플레이어에게 클라우드 저장 개방. Google 계정 필요.</li>
<li>모든 플레이어에게 상점 탭 개방.</li>
<li>전반적인 UI 스타일 재설계.</li>
<li>\uE010</li>
<li>Vue.js 프레임워크로 게임 UI를 다시 작성하여 성능, 안정성, 코드 유지보수성을 크게 개선.</li>
<li>스피드런 모드 추가.</li>
</ul>
<br>

옵션 및 접근성:
<ul>
<li>오랜만에 돌아온 플레이어가 예전 게임 기능을 기억할 수 있도록 콘텐츠 요약 창 추가.</li>
<li>키보드 단축키 추가.</li>
<li>확인 절차 추가(옵션에서 끌 수 있음).</li>
<li>영원 및 시간 팽창 애니메이션 추가(옵션에서 끌 수 있음).</li>
<li>커뮤니티 뉴스와 새 AI 뉴스 추가(커뮤니티 제안을 바탕으로 AI가 생성).</li>
<li>게임을 처음 시작할 때 일부 버튼에 튜토리얼 빛 효과와 아이콘 표시.</li>
<li>테마와 표기법을 쉽게 선택하는 드롭다운 메뉴 추가.</li>
<li>비밀 테마를 비밀스러운 개수만큼 추가하고 대소문자를 구분하지 않도록 변경.</li>
<li>해금한 비밀 테마를 드롭다운에서 영구적으로 선택 가능.</li>
<li>표기법 추가.</li>
<li>파일로 저장 데이터를 가져오고 내보내는 옵션 추가.</li>
<li>모든 무한 차원 최대 구매 버튼 추가.</li>
<li>시간 정리 상점 최소화 버튼 추가.</li>
<li>연구 트리 저장 슬롯 3개 추가(총 6개).</li>
<li>블롭 추가.</li>
<li>기존 연구 트리 슬롯 편집 기능 추가.</li>
<li>Shift+클릭 시 연구 트리 경로를 자동 선택하는 창 추가.</li>
<li>모든 무한 도전을 해금하면 무한 도전 탭에 ‘모든 무한 도전 해금’ 문구 표시.</li>
<li>영원 도전 탭에 해금한 영원 도전 수 표시.</li>
<li>저장 주기와 마지막 저장 이후 시간 표시 옵션 추가.</li>
<li>저장 파일 이름 지정 기능 추가.</li>
<li>자리 비움 진행 항목을 개별적으로 표시하거나 숨길 수 있도록 변경.</li>
<li>탭과 하위 탭 숨김 기능 추가.</li>
<li>오프라인 진행 동작 조정 옵션 추가.</li>
<li>일부 이벤트에서 탭을 자동 전환하는 옵션 추가.</li>
<li>뉴스 티커 스크롤 속도와 반복 조정 옵션 추가.</li>
<li>도전 및 업적 ID 추가(옵션에서 끌 수 있음).</li>
<li>진행 표시줄 정보 추가(영원 도전 목표, 타키온 입자 획득까지의 시간 팽창 진행도).</li>
<li>자동구매기의 동적 수량을 끄는 옵션 추가.</li>
<li>시간 팽창이나 도전처럼 현재 진행 중인 무한/영원/리얼리티 유형 표시.</li>
<li>단축키를 누른 상태에서 그 단축키의 작동을 멈추지 않고 다른 단축키도 입력 가능.</li>
<li>정보 표시를 기본적으로 보이도록 변경(옵션에서 끌 수 있음).</li>
<li>자원 정보와 오프라인 진행 모드 선택을 추가해 저장 가져오기 창 개선.</li>
<li>브라우저에 따라 숫자 입력란에 위아래 화살표 같은 입력 보조 기능 제공.</li>
<li>실수로 초기화하지 않도록 게임 초기화 시 특정 문구 입력 요구.</li>
</ul>
<br>

문구 및 배치 변경:
<ul>
<li>‘차원 이동’을 ‘차원 가속’으로 변경.</li>
<li>‘무한 달성 통계’를 ‘무한 횟수’로 변경.</li>
<li>‘무료 은하’를 ‘타키온 은하’로 변경.</li>
<li>틱스피드를 매우 작은 X/Y 틱 시간 대신 초당 X배 형식으로 표시.</li>
<li>명확성을 높이도록 여러 문구 변경.</li>
<li>자동구매기 하위 탭을 새 자동화 탭으로 이동하고 무한 차원 및 복제자 자동구매기 같은 추가 제어 기능 배치.</li>
<li>통계 하위 탭에 구역 추가.</li>
<li>하단 링크를 새 플레이 방법 및 게임 정보 창으로 이동.</li>
<li>일부 업적 이름과 이미지 변경.</li>
<li>일부 비밀 업적 이름과 조건 변경.</li>
<li>구매한 무한 업그레이드의 비용 숨김.</li>
<li>자동 빅 크런치 간격이 0.1초가 되기 전에도 ‘무한 돌파’ 버튼을 잠긴 상태로 표시.</li>
<li>무한 돌파 이후 비용 증가 업그레이드 문구 개선.</li>
<li>도전 중이 아닐 때 도전 나가기 버튼 숨김.</li>
<li>영원 도전에 현재 보상과 다음 완료 보상을 함께 표시.</li>
<li>영원 횟수가 있어도 무한 애니메이션 재생.</li>
<li>무한 포인트/영원 포인트가 e50을 넘으면 빅 크런치/영원 버튼에 색상 표시. 현재 보유량보다 적게 얻으면 빨강,
  비슷하면 흰색, 더 많이 얻으면 초록색.</li>
<li>시간 연구 33을 오른쪽으로 이동.</li>
<li>‘일반 차원’을 ‘반물질 차원’으로 변경.</li>
<li>‘도전’을 ‘일반 도전’으로 변경.</li>
<li>일부 오타 수정.</li>
</ul>
<br>

새 업그레이드 및 기술적 동작 개선:
<ul>
<li>무한 도달 전에도 반물질로 자동구매기를 해금할 수 있지만 해당 도전을 완료한 뒤에만 업그레이드 가능.</li>
<li>오프라인에서 모두 최대 구매를 사용하지 않은 최고 분당 무한 포인트의 50%를 제공하는 1e3 무한 포인트 업그레이드 추가.</li>
<li>오프라인에서 최고 분당 영원 포인트의 25%를 제공하는 새 영원 마일스톤 추가.</li>
<li>오프라인에서 무한 및 영원 횟수를 주는 마일스톤 2개 추가.</li>
<li>‘가장 빠른 무한에 따른 무한 포인트 생성’ 업그레이드가 모든 무한 포인트 배수를 반영.</li>
<li>틱스피드 계산을 동적으로 변경하여 업그레이드 구매 없이 즉시 갱신.</li>
<li>복제자가 충분하면 한 게임 틱에 여러 복제자 은하 구매 가능.</li>
<li>모든 시간 차원 최대 구매 동작 개선.</li>
<li>일반 및 무한 도전 보상을 빅 크런치 후 지급.</li>
<li>설정과 관계없이 영원 도전 목표에 도달하면 영원 자동구매기 작동.</li>
</ul>
<br>

밸런스 변경:
<ul>
<li>일반 도전 10, 11, 12가 무한 16회 후 해금</li>
<li>업적마다 반물질 차원에 추가 1.03배 배수 제공.</li>
<li>빅 크런치 자동구매기의 초기 간격을 절반으로 줄여 최대 업그레이드에 필요한 무한 포인트도 절반으로 감소하고,
  다른 자동구매기의 초기 간격도 크게 감소.</li>
<li>500 무한 포인트 업그레이드의 비용을 300 무한 포인트로 변경.</li>
<li>Nicolas Cage.</li>
<li>영원 20회 마일스톤을 영원 8회로 이동.</li>
<li>1e6000 이후 시간 차원의 비용 증가 강화.</li>
<li>시간 연구 83에 절대 상한 적용.</li>
<li>영원 도전 10의 5회 미만 완료 보상 하향(5회 완료 보상은 동일).</li>
<li>시간 팽창 해금 조건을 총 시간 정리 13000개에서 12900개로 감소.</li>
<li>시간 팽창의 타키온 입자 획득량을 도달한 최고 반물질 기준으로 계산.</li>
<li>시간 팽창 해금 연구 구매에 23번째 줄 연구 구매를 요구.</li>
<li>무한 도전 1의 조건 변경(도전을 직접 실행하는 대신 도전 제한만 적용).</li>
<li>무한 도전 2 해금 조건을 1e5000에서 1e10500으로, 무한 도전 6은 1e20000에서 1e22500으로 변경.</li>
<li>무한 도전 1 목표를 1e850에서 1e650으로 변경.</li>
<li>무한 도전 5 목표를 1e11111에서 1e16500으로 변경.</li>
<li>‘이걸 하향하는 걸 깜빡했네’ 보상 추가(1차 반물질 차원 5% 배수).</li>
<li>‘이거 안전한가?’ 보상 추가(무한 시 복제자 은하 1개 유지).</li>
<li>‘영원은 새로운 무한’ 보상 추가(영원 횟수 2배).</li>
<li>‘널 없애려면 이걸 해야 한다니’ 보상 추가(시간 연구 131과 133의 불이익 제거).</li>
<li>‘빠르다!’ 보상을 1000에서 5000으로 변경.</li>
<li>‘더 빠르다!’ 보상을 2e5에서 5e5로 변경.</li>
<li>‘영원도 그리 길지 않네’ 보상을 1e10에서 5e10으로 변경.</li>
<li>‘눈 깜짝할 사이’ 보상을 차원 배수 1e25에서 5e25로 변경.</li>
<li>‘그건 영원이 아니었어’ 보상을 2e25에서 5e25로 변경.</li>
<li>‘신들이 만족했다’ 조건을 600배에서 일반 도전 8 밖에서 600배로 변경.</li>
<li>‘무모한 도전자’ 조건을 2에서 3으로 변경.</li>
<li>‘눈 깜짝할 사이’ 조건을 200ms에서 250ms로 변경.</li>
<li>‘게임 디자인은 나의 열정(Hevipelle은 잘못이 없다)’ 조건을 10초에서 15초로 변경.</li>
<li>‘최대 과부하’ 조건을 분당 1e300 무한 포인트에서 1e300 무한 포인트로 변경.</li>
<li>‘영원은 새로운 무한’ 조건을 200ms에서 250ms로 변경.</li>
<li>‘이거 안전한가?’ 조건을 30분에서 1시간으로 변경.</li>
<li>‘마치 포식처럼’ 조건을 1e100에서 1e90으로 변경.</li>
<li>‘윤리적 소비란 없다’ 조건을 5e9에서 2e9으로 변경.</li>
<li>‘언제쯤 충분할까?’ 조건을 1e20000에서 1e18000으로 변경.</li>
<li>‘난 원래부터 이 무한이란 게 싫었어’ 조건을 1e140000에서 1e200000으로 변경.</li>
<li>‘특별한 눈송이’ 조건을 630에서 569로 변경.</li>
<li>‘이제 시간 팽창으로 생각하는군!’ 조건을 1e600 영원 포인트에서 1e260000 반물질로 변경.</li>
<li>‘널 없애려면 이걸 해야 한다니’ 조건을 1e20000에서 1e26000으로 변경.</li>
<li>업적 41을 ‘DLC 필요 없음’, ‘무한 업그레이드 16개 구매’, ‘새 무한 업그레이드 2개 해금’으로 변경.</li>
<li>‘죽음 0회’ 위치를 43에서 64로 변경.</li>
<li>‘100만은 큰 수야’ 위치를 64에서 77로 변경.</li>
<li>‘반물질 표가 뒤집혔네’ 위치를 77에서 43으로 변경.</li>
<li>업적 101과 117의 위치 교체.</li>
<li>업적 113과 124의 위치 교체.</li>
<li>무한 돌파 후 비용 증가 업그레이드의 초기 비용 감소(틱스피드 3e6 → 1e6, 차원 1e8 → 1e7).</li>
<li>일반 도전 7에서 무작위 요소 제거.</li>
</ul>
<br>

제거된 기능:
<ul>
<li>이제 무한을 고칠 수 없음.</li>
<li>자동구매기 우선순위 제거.</li>
<li>생산 그래프 하위 탭 제거.</li>
<li>미니게임 제거.</li>
<li>저장 복구기 제거.</li>
<li>일부 뉴스 제거.</li>
<li>차원 구매 시 떠오르는 문구 제거.</li>
<li>게임을 종료시키던 블롭 제거.</li>
</ul>
<br>

버그 수정:
<ul>
<li>영원 도전 8에서 무한 차원 및 복제자 자동구매기 버튼 숨김.</li>
<li>다음 차원 희생 배수에 일반 도전 8의 효과가 제대로 표시되지 않던 문제 수정.</li>
<li>무한 도전 5의 비용 증가가 두 번 적용되던 문제 수정.</li>
<li>반전 테마가 깨지던 문제 수정.</li>
<li>게임 초기화 시 비밀 업적이 해금되던 문제 수정.</li>
<li>영원 도전을 5회 완료한 뒤 잘못된 목표가 표시되던 문제 수정.</li>
<li>총 은하 수가 3개 미만이면 반물질 은하가 아닌 은하가 틱스피드에 적용되지 않던 문제 수정.</li>
<li>고정된 무한에 도달했거나 도전 중인데도 한 틱 동안 무한보다 많은 반물질을 생산할 수 있던 문제 수정.</li>
<li>표기법을 변경할 때 자동구매기의 숫자 형식이 제대로 갱신되지 않던 문제 수정.</li>
<li>영원 도전 8에서 자동구매기가 켜져 있으면 무한 차원 해금 즉시 자동 구매되던 문제 수정.</li>
<li>불러오기/가져오기 후 복제자 업그레이드 자동구매기가 꺼짐으로 잘못 표시되던 문제 수정.</li>
<li>복제자 간격 업그레이드가 최대 속도보다 낮은 값으로 업그레이드된다고 표시하던 문제 수정.</li>
<li>무한 파워가 0일 때 무한 차원 배수가 0배로 표시되던 문제 수정.</li>
<li>자동구매기로 허용 횟수보다 무한을 한 번 더 실행해 영원 도전 4를 완료할 수 있던 문제 수정.</li>
<li>차원 외 자동구매기의 간격 감소 비용이 표기법을 따르지 않던 문제 수정.</li>
<li>‘무한으로!’ 업적 보상이 작동하지 않던 문제 수정.</li>
<li>희생할 수 없는 상태에서 단축키를 눌러도 차원 희생 확인 창이 나타나던 문제 수정.</li>
<li>저장 파일을 가져올 때 저장 완료 알림이 두 번 나타나던 문제 수정.</li>
<li>타키온 입자 애니메이션 속도가 모니터 주사율의 영향을 받던 문제 수정(60Hz에서는 이전과 같은 속도).</li>
<li>‘무한의 4.3333분’ 업적 해금 알림이 ‘무한의 1분’으로 표시되던 문제 수정.</li>
<li>무한 도달 후에도 차원 희생을 할 수 있던 문제 수정.</li>
<li>첫 시간 차원 구매 직후 무료 틱스피드 업그레이드 수가 음수로 표시되던 문제 수정.</li>
<li>보유량이 비용과 정확히 같고 비용이 무한 미만일 때 차원을 구매할 수 없던 문제 수정.</li>
<li>진행 표시줄의 ‘X%’ 문구가 중앙이 아닌 왼쪽에 정렬되던 문제 수정.</li>
<li>‘눈 깜짝할 사이’ 업적 이미지가 GIF였던 문제 수정.</li>
<li>‘친구, 네가 무한을 좋아한다고 들었어’ 업적 해금 조건이 제대로 검사되지 않던 문제 수정.</li>
<li>시간 연구 11에 표시되는 배수 공식이 잘못되던 문제 수정.</li>
<li>차원 희생 및 차원 가속 자동구매기가 자동구매기 간격을 따르지 않던 문제 수정.</li>
<li>리얼리티 링크가 춤추는 사람 영상에 불과했던 문제 수정.</li>
<li>그 밖의 여러 버그 수정.</li>
`
  },
  {
    date: [2018, 6, 17],
    name: "This Update Sucks",
    info: `
<b>MAJOR STUFF:</b><br>
<ul>
<li>TIME DILATION</li>
<li>3 ROWS OF SECRET ACHIEVEMENTS</li>
<li>Added more Nicolas Cage.</li>
<li>1 new row of achievements.</li>
<li>Added 3 study tree save slots.</li>
<li>Greatly improved performance. (up to 5x in certain cases, ~3x in almost all cases)</li>
<li>Nerfed EC10 reward. ((infinities * EC10 completions * 0.000002+1) >
(infinities ^ 0.9 * EC10 completions * 0.000002+1))</li>
<li>Added even more Nicolas Cage.</li>
<li>Time study 11 has been capped at 1e2500 and now displays its current multiplier.</li>
<li>Time study 193 has been buffed, requires ~1012680 eternities to cap, rather than 1.5m, and is now capped at 1e13000
instead of ~1.81e12900/1.5m eternities. (1.02^x) > (1.03^x)</li>
<li>The second eternity upgrade has been buffed, and now soft caps at 100k, rather than 125k. The end result is very
slightly higher. ((x/300)^log4(2x)) > ((x/200)^log4(2x))</li>
<li>EC1 now requires 20k eternities per tier to unlock, down from 25k.</li>
<li>TD cost scaling has been increased after costs of 1e1300. (this is in addition to the current increase)</li>
<li>Added additional galaxy cost scaling after 800 galaxies.</li>
<li>Added a button to buy the maximum amount of eternity point multipliers at once.</li>
<li>Offline progress processes ~5x faster, and now simulates autobuyers. (please note that offline progress is still
capped at 1000 ticks, with additional ticks increasing the production of said 1000 ticks)</li>
<li>Added a new save file system that allows 3 different save files at once all with cloud save enabled, along with
a new cloud save UI.</li>
<li>Added an animation to visualize your multiplier gain when you purchase 10 of a dimension, dimension boost/shift,
or sacrifice.</li>
<li>Nicolas Cage.</li>
<li>Added an animation to big crunches. This will only trigger if you haven't eternitied, have a fastest infinity time
above 1 minute, and haven't broken infinity.</li>
<li>Added a button in the options menu to disable individual animations.</li>
<li>Added more news ticker entries</li>
</ul>
<br>
<b>Minor stuff:</b><br>
<ul>
<li>Reduced the space between the secondary eternity tab buttons.</li>
<li>The EC3 description now specifies that dimensional sacrifice is disabled.</li>
<li>Autobuyer inputs now support commas and notation on exponents.</li>
<li>When purchasing the EP or IP multipliers, autobuyer inputs will now always format the updated value above 1000.</li>
<li>The size and placement of the auto IP multiplier and auto RG toggles have been adjusted to fit with the other auto
toggles.</li>
<li>Total time played now increases at a normal rate inside EC12.</li>
<li>Fastest infinity time now updates normally inside EC12.</li>
<li>The time theorem purchasing background is now 20 pixels wider.</li>
<li>Changed the wording on time study 133 for clarity.</li>
<li>Added various missing periods to achievements.</li>
<li>Improved chart performance. (it's still pretty laggy if your settings are too high)</li>
<li>You can now purchase study 201 while you have EC11/12 bought, but you cannot purchase another path.</li>
<li>Purchasing study 131 no longer turns off your replicanti galaxy autobuyer, but instead displays it as disabled.</li>
<li>You can now purchase another split using shift while you have study 201.</li>
<li>You now purchase max galaxies manually by clicking or using the hotkey with more than 6 eternities.</li>
<li>You can now purchase single dimension boosts and galaxies by holding shift while purchasing.</li>
<li>ID8 will now display a rate of change after completing EC7 at least once.</li>
<li>Added an oxford comma to formatted time values.</li>
<li>Made the dimensional sacrifice button 40px wider to prevent the text overflowing.</li>
<li>Made the all tab eternity and infinity point displays 30px wider to prevent the text overflowing.</li>
<li>Moved the big crunch button up to prevent blocking the statistics and achievement tab buttons.</li>
<li>Moved the eternity and infinity buttons inwards to prevent the HTML layout jumping around.</li>
<li>Fixed the placement of certain footers.</li>
<li>Fixed a typo where a news ticker said "Dimesional Sacrifice" instead of "Dimensional Sacrifice"</li>
<li>Fixed a bug where TDs displayed a 2x multiplier per purchase when they actually gave a 4x multiplier.</li>
<li>Fixed a bug where study 51 wouldn't respect notation.</li>
<li>Fixed a bug where the infinity challenges tab would always show.</li>
<li>Fixed a bug where the auto RG toggle would jiggle left and right 1 pixel in certain cases.</li>
<li>Fixed a bug where the rate of change on the 7th dimension wouldn't take into account ID1 while in EC7.</li>
<li>Fixed a bug where EC12 displayed 0.1 seconds after 5 completions, but actually required 0.0 seconds.</li>
<li>Fixed a bug where tickspeed elements wouldn't hide correctly in certain cases.</li>
<li>Fixed a bug where bought eternity challenge unlock studies would show as gray in the dark theme rather than a deep
purple.</li>
<li>Fixed a bug where dimensions 5-8 would hide upon eternity even with the 30 eternity milestone.</li>
<li>Fixed a bug where popup colors weren't inverted in the inverted and inverted metro themes.</li>
<li>Fixed a bug where the eternity point amount wouldn't show when you imported a save with eternity points into a save
without them.</li>
<li>Fixed a bug where locked eternity challenges didn't have a hover effect in the dark metro theme.</li>
<li>Fixed a bug where popups weren't properly centered.</li>
<li>Fixed a bug where ID autobuyers would purchase IDs upon unlock even while disabled.</li>
<li>Fixed a bug where study tree branches drawn to row 22 were off-centered.</li>
<li>Fixed a bug where EP/min and IP/min peaks wouldn't update properly upon import.</li>
<li>Fixed a bug where infinity dimension autobuyers wouldn't hide properly upon import.</li>
<li>Fixed a bug where the IP multiplier autobuyer wouldn't hide properly upon import.</li>
<li>Fixed a bug where the option to change big crunch modes wouldn't hide properly upon import.</li>
<li>Fixed a bug where the max buy galaxy interval setting wouldn't hide properly upon import.</li>
<li>Fixed a bug where the RG autobuyer wouldn't hide properly upon import.</li>
<li>Fixed a bug where the eternity confirmation option wouldn't hide properly upon import.</li>
<li>Fixed a bug where the replicanti upgrade autobuyers wouldn't hide properly upon import.</li>
<li>Fixed a bug where your update rate wouldn't update upon import.</li>
<li>Fixed a bug where the chart line color wouldn't update properly upon import.</li>
<li>Fixed a bug where achievement images were being cut off by 4 pixels on the right and bottom sides.</li>
<li>Fixed a bug where "Yo dawg, I heard you liked infinities..." only required 1e300 times the previous infinity.</li>
<li>Fixed a bug where the auto sacrifice interval would still display as 0.10 seconds even with the
double autobuyer speed breaking infinity upgrade.</li>
<li>Fixed a bug where certain time studies were 1 pixel too far to the left or right.</li>
<li>Fixed a bug where studies 223 & 224 weren't taken into account when displaying antimatter galaxies as
distant antimatter galaxies.</li>
<li>Fixed a bug where study 227 would multiply your 4th time dimension production by 0
if you had no sacrifice bonus.</li>
<li>Fixed a bug where the game would say "You have 1 eternity points." rather than "You have 1 eternity point.".</li>
<li>Fixed a bug where popups would remain open after changing tabs.</li>
<li>Fixed a bug where you were able to select the achievement images by clicking and dragging over them.</li>
<li>Fixed a bug where studies 233 and 234 had the wrong classes assigned to them on load.</li>
</ul>
`
  },
  {
    date: [2018, 4, 1],
    name: "Fixed a Bug where there wasn't an Update",
    info: `
Huge thanks to Omsi for helping me a ton with this.<br><br>
<b>MAJOR STUFF:</b><br>
<ul>
<li>2 NEW ETERNITY CHALLENGES</li>
<li>12 NEW TIME STUDIES</li>
<li>Time study 132 has been buffed from a 30% bonus to a 40% bonus.</li>
<li>Added an achievement bonus for "Popular music": "Replicanti galaxies divide your replicanti by 1.79e308 instead of
resetting them to 1."</li>
<li>Added an achievement bonus for "IT'S OVER 9000": "Sacrifice doesn't reset your dimensions."</li>
<li>Added an achievement bonus for "Like feasting on a behind": "IP multiplier based on time spent this infinity."</li>
<li>Added an achievement bonus for "What do I have to do to get rid of you": "Time dimensions are multiplied by
the number of studies you have."</li>
<li>Added "Infinity" notation.</li>
<li>Added "Brackets" notation.</li>
<li>Added an import/export system for the time study tree.</li>
<li>Added an EP/min & peak EP/min display to the eternity button.</li>
<li>Added an eternity hotkey.</li>
<li>Added something to help you pick your theme.</li>
<li>Added a few more IAPs.</li>
<li>Reduced the cost of "Double IP gain from all sources" IAP from 50 ➜ 40</li>
</ul>
<br>
<b>Minor stuff:</b><br>
<ul>
<li>Added an option to not plot drops in production on the chart. (It will instead copy the newest data point)</li>
<li>Added displays for the current bonuses from time studies 71, 72, and 73.</li>
<li>Built up speed for 6 hours to do it in 0.5x A presses.</li>
<li>Changed study 72 to only work on the 4th infinity dimension, but doubled its power. (No effective change)</li>
<li>Alchemy 120 (Vivification) scaling decreased.</li>
<li>Fixed a bug where the buttons to purchase time studies wouldn't move in inverted themes on firefox.</li>
<li>Fixed a bug. Antman, you're good to go.</li>
<li>Fixed a bug that gave you the ability to set a custom name for your theme when using a secret theme.</li>
<li>Fixed BLJ. Shoutout to SimpleFlips.</li>
<li>Fixed a bug that caused purchasing the EP multiplier to require multiple clicks.</li>
<li>Removed the ghost from the game. Was annoying.</li>
<li>Fixed a bug that allowed you to earn "Long lasting relationship" in EC7.</li>
<li>Monkeys no longer eat humans, as intended.</li>
<li>Fixed a bug where the reward from EC7 could display -1.</li>
<li>Increased the drop rate of collector's pendant items by 20%.</li>
<li>Fixed a bug where the infinity requirement for EC4 could be less than 0.</li>
<li>Transcension gives less Ancient Souls.</li>
<li>Fixed a bug where the visual display for autobuyer bulk buy settings wouldn't update upon your first eternity.</li>
<li>Fixed the rickroll. Now it's properly not working.</li>
<li>Fixed a bug where the EP multiplier would break if its power exceeded 1.79e308.</li>
<li>Leeroy Jenkins' Battlecry now doesn't trigger Patches.</li>
<li>Fixed a bug where the confirmation for starting an infinity challenge would say you need to reach infinity.</li>
<li>Cursors now do circles around the cookie.</li>
<li>Fixed a bug where the offline progress popup would simply say "While you were away" if nothing happened.</li>
<li>Traction has been slightly increased to reduce unwanted drifts.</li>
<li>Fixed a bug that in rare cases would cause the offline progress popup to say you gained "NaNeInfinity" time shards
or infinity power.</li>
<li>Fixed a bug where the tickspeed visual display wouldn't update upon any form of reset.</li>
<li>Bugged a fix where eternity was dumb.</li>
<li>CS now makes notes go faster in mania.</li>
<li>Fixed a bug where replicanti were hidden but still unlocked if you eternitied for the 50th time
while they were locked.</li>
<li>Dirt is now more abundant.</li>
<li>Fixed a bug where the 1st dimension wasn't producing the 0th dimension.</li>
<li>Fixed a bug where The Nameless Ones were too easy.</li>
<li>Fixed a bug where in a specific case, 2 eternity challenges would appear as running at the same time.</li>
<li>Increased TukkunFCG YC rewards by 15%.</li>
<li>Added more space. SPAAAAAAACE</li>
<li>Fixed a bug where the eternity challenges tab would hide after refreshing with less than 1e2000 antimatter.</li>
<li>Fixed a bug where eternity challenges wouldn't update correctly upon import.</li>
<li>Fixed a bug where dimension display values wouldn't update in certain cases.</li>
<li>Portals are now not red.</li>
<li>Fixed a bug where the ON/OFF text on the challenge confirmation option wasn't capitalized upon load.</li>
<li>Reduced GRB's autokill threshold to 2500/2000 power/toughness.</li>
<li>Fixed a typo where the eternity confirmation option said "Eternity confimation".</li>
<li>Added bugs because Omsi wants more bugs to fix. Absolute legend, I'm telling you, the queen is legendary.</li>
<li>Fixed a typo where the reward for "That's faster!" said you started with 20000 antimatter, rather than 200000.</li>
<li>Added depression to your themes.</li>
<li>Fixed inconsistencies with the standard notation naming convention.</li>
<li>Tried to fix a bug where the game was bad but failed. The game is still bad.</li>
<li>Changed the wording on EC4 to say "X or less" rather than "less than X".
(It always worked this way, this is just a correction)</li>
<li>Made donkeys less fast, so you can actually catch them now.</li>
<li>Changed the wording on the EC2 reward to say "affects 1st Infinity Dimension" rather than
"affects Infinity Dimensions". (It always worked this way, this is just a correction)</li>
<li>Increased the base breeding speed of trimps by 10%.</li>
<li>You can now click through the footer and progress bar to access buttons that they are overlapping.
(This is for smaller screens)</li>
<li>Made periods longer.</li>
<li>Added loot boxes.</li>
<li>Removed loot boxes.</li>
<li>Added various missing periods to achievement descriptions.</li>
<li>Added a missing period to time spent in this eternity.</li>
Increased the price of creation count increases from 50 god power to 60.</li>
<li>Added a missing space to the "Autobuyers work twice as fast." upgrade.</li>
<li>Manually buying max dimension boosts no longer requires 10 eternities or more, and now only requires the bulk buy
dimension boosts breaking infinity upgrade.</li>
<li>Did a barrel roll.</li>
<li>Added more useless patch notes</li>
</ul>
`
  },
  {
    date: [2018, 2, 1],
    name: "Eternity Challenges",
    info: `
<ul>
<li>NEW TIME STUDIES</li>
<li>2 new achievement rows</li>
<li>Made certain news messages only show if you have reached certain levels of progression</li>
<li>Massively improved performance of calculating dimension costs thanks to SpectralFlame.
(Cuts cpu usage by up to 2/3 in late-game)</li>
<li>New news (get it?) ticker entries.</li>
<li>Added a production chart.</li>
<li>Added new statistics to replace the scale statistic after 1e100000 antimatter.</li>
<li>Added a new milestone for 30 eternities: "Start with all normal dimensions available for purchase".</li>
<li>Added an option to change the update rate of the game, ranging from 33ms to 200ms.
(before this, it was locked at 50ms)</li>
<li>The game now partially simulates offline progress, instead of estimating it.</li>
<li>Added 3 new eternity upgrades.</li>
<li>Added a reward to the "NEW DIMENSIONS???" achievement, "Your achievement bonus affects Infinity Dimensions."</li>
<li>Buffed time study 111. (10 ^ (log10(antimatter) / 290- 0.75)) > (10 ^ (log10(antimatter) / 285- 0.75))</li>
<li>Buffed time study 83. (1.0001^x) > (1.0004^x)</li>
<li>Nerfed eternity upgrade 1. ((x+1)^3) > (x+1)</li>
<li>Nerfed eternity upgrade 2. (x^log4(2x)) > ((x/300)^log4(2x) with harsher formula above 125,000)</li>
<li>Fixed a bunch of bugs and changed a bunch of things. (more detail below)</li>
<li>Added buy max buttons to Time Dimensions and Time Theorems.</li>
<li>Added a hotkey for replicanti galaxies. (R)</li><br>
<li>Nitty gritty:</li>
<li>Greatly improved the performance of calculating bonus tickspeed from time dimensions.</li>
<li>Replaced all references to soft resets with references to dimension boosts.</li>
<li>Made achievements update on import/hardreset.</li>
<li>Made the game take into account your infinity points gained on crunch for the purposes of
eternity point gain when you eternity.</li>
<li>The replicanti interval is now displayed after and reductions / increases.</li>
<li>Added missing periods to various achievements.</li>
<li>Made the bonus from time study 131 display next to max replicanti galaxies.</li>
<li>Added time dimensions to the info scale.</li>
<li>Changed the description of time study 31 to "Powers up bonuses that are based on your infinitied stat
(to the power of 4)" from "Powers up existing upgrades based on infinitied stat (to the power of 4)".</li>
<li>Changed the description of "MAXIMUM OVERDRIVE" to say "Big Crunch with X" instead of "Reach X".</li>
<li>Added "with reduced effect" to the description of time study 71, 72, and 73.</li>
<li>Changed the text on autobuy max dimension boosts to "Buy max dimboosts every X seconds:"
from "Max dimboost interval:". (To achieve parity with the autobuy max galaxies text)</li>
<li>Made the challenges button always show if you have more than 1 eternity.</li>
<li>Fixed centering issues with infinity and eternity upgrades.</li>
<li>Various minor changes to themes to improve consistency. (Too minute to list, even here)</li>
<li>Made the eternity autobuyer number multiply by 5 when you buy the eternity point multiplier.</li>
<li>Increased the requirement for "Is This Hell?". (5 > 6.66 seconds)</li>
<li>Reduced the starting replicanti interval upgrade cost. (1e160 > 1e140)</li>
<li>Galaxies are labeled "Distant Antimatter Galaxies" when the cost scaling starts. (At 100 galaxies)</li>
<li>Dimensions no longer produce anything after reaching challenge goal, or after reaching infinity with fixed infinity.
This is due to the c6 being abusable.</li>
<li>Made the 7 and 25 eternity milestones work much faster.</li>
<li>After unlocking bulk dimboosts, clicking dimension boost or pressing D will buy max dimension boosts.</li>
<li>Moved fake news, don't you dare to sleep, spreading cancer, and one for each dimension to rows 2, 3, 4,
and 7 respectively.</li>
<li>Added a visual display of how many galaxies/dim boosts you have next to the cost.</li>
<li>Added an explanation of hotkeys to the options page.</li>
<li>Made shift+1-8 purchase singular dimensions and shift+T purchase a singular tickspeed upgrade.</li>
<li>Reworked the display of the buy time theorem buttons.</li>
<li>The milestones page now has 2 columns.</li>
<li>Extended support for standard notation to e3e18, and letter/cancer notation (almost) infinitely.</li>
<li>Added support for standard, letter and logrithm notation in autobuyer inputs.</li>
<li>Added "in a challenge" to the description of "Zero Deaths".</li>
<li>Made most large numbers in achievements be listed in your chosen notation.</li>
<li>Nerfed "Gift From The Gods"'s achievement reward.</li>
<li>Made purchasing time theorems with EP require at least 1 time dimension.</li>
<li>First eternity now takes you to the time dimensions tab.</li>
<li>Time dimension prices now have 2 decimal places.</li>
<li>Reformatted the tick interval reduction text for very small numbers.</li>
<li>The game now keeps track of when you automatically do an infinity, and you can passively gain IP based off the
IP/min in that run if you go offline (but only if infinity isn't broken).</li>
<li>Made time study 171 apply retroactively. This was causing an issue with production being much lower than expected
when going into a long run on the same run as respeccing.</li>
<li>Fixed a bug where max all wasn't giving achievements when buying dimensions.</li>
<li>Fixed a bug where the game wouldn't show the default dimensions tab upon hard resetting.</li>
<li>Fixed a bug where time dimensions were called "X Dimension" rather than "X Time Dimension".</li>
<li>Fixed a bug where the replicanti galaxy button would show as locked if you had more than
the listed max replicanti galaxies and study 131.</li>
<li>Fixed a bug where the last ten eternities average said IP/X rather than EP/X.</li>
<li>Fixed a bug where the big crunch autobuyer said "X times since last crunch" instead of "X times last crunch".</li>
<li>Fixed a bug where the challenge records display wouldn't update upon import.</li>
<li>Fixed a bug where hotkeys wouldn't work sometimes.</li>
<li>Fixed a bug where secret theme names would display as "0" after refreshing.</li>
<li>Fixed a bug where time studies would move around when your window size was too small.</li>
<li>Fixed a bug where infinity dimensions would reset when clicking on a challenge and not entering while
challenge confirmations were on.</li>
<li>Fixed a bug where you always had the infinity challenge 1 reward.</li>
<li>Fixed a bug where eternity milestone classes weren't set correctly upon import.</li>
<li>Fixed a bug where the eternity autobuyer, sacrifice autobuyer, time dimension tab, and replicanti
wasn't hiding correctly upon import.</li>
<li>Fixed a bug where buy max dim boosts was able to buy 1 too many boosts.</li>
<li>Fixed a bug where the study tree would be off-centered if the game windows wasn't wide enough.</li>
<li>Fixed a bug where you could buy factions of dimension boosts with dimension boost bulk buy.</li>
<li>Fixed a bug where your autobuy max dimension boost interval would set itself to itself
if you eternitied while changing it.</li>
<li>Fixed a bug where secondary statistic tabs weren't hiding upon import.</li>
<li>Fixed a bug where replicanti galaxies wouldn't give a bonus if you had less than 3 galaxies.</li>
<li>Fixed a bug where the dimension boost autobuyer would ignore dimension boost costs until they costed 8th dimensions.
</li>
<li>Fixed a bug where the future shop multipliers were displayed before the x rather than after.</li>
<li>Fixed a bug where the challenge confirmation button's off and on were lowercase.</li>
<li>Fixed a bug where the static infinity point display would disappear after eternity.</li>
</ul>`
  },
  {
    date: [2017, 12, 1],
    name: "\"Eternity\" update",
    info: `
<ul>
<li>Time studies tree with free respec</li>
<li>Eternity Milestones with tons of automation</li>
<li>Eternity upgrades</li>
<li>TIME DIMENSIONS</li>
<li>REPLICANTIS</li>
<li>More themes made by Omsi</li>
<li>Disable hotkeys option</li>
<li>Current IP/min post-break</li>
<li>Infinity Challenge times</li>
<li>Past 10 eternities</li>
<li>Lowered IP multiplier cost by 1 Order of magnitude.</li>
<li>3 more rows of achievements</li>
<li>Infinity challenge reward nerfs (1st: 1.5x ➜ 1.3x; 3rd: lowered; 4th: mult^1.1 ➜ mult^1.05)</li>
<li>More news ticker entries</li>
<li>Immensely improved performance thanks to break_infinity.js made by Patashu, it replaces decimal.js</li>
<li>Added LZString for cloud saving purposes.</li>
<li>Achievement refractoring to reduce save string size made by StrangeTim.</li>
<li>Commas between exponents option for numbers higher than e100000</li>
<li>Added logarithm notation</li>
<li>Made letter and cancer notation last longer.
</ul>
`
  },
  {
    date: [2017, 10, 10],
    info: `
<ul>
<li>Complete refactoring for all upgrade UI.</li>
<li>Minor Upgrade Changes. (Capping some upgrades)</li>
<li>Kred shop- 3 paid Upgrades- More upgrades (and upgrade improvements) coming in the future.</li>
<li>8 new Achievements- Achievement Rewards have also been added.</li>
<li>Infinity Challenges- additional challenges to do going from Inf Dim 2 to current end game and beyond.</li>
<li>Main Screen UI updates- IP points are now visible everywhere.</li>
<li>Hotkeys- C for Big Crunch, M for Max All, S for Dimensional Sacrifice, D for Dimension Shift/Boost,
G for Antimatter Galaxy, Numbers 1-8 for Buy 10 (D1-8), A for Toggle Autobuyers.</li>
<li>Bug Fixes- At least 2, including a percentage buff.</li>
</ul>`
  },
  {
    date: [2017, 9, 25],
    info: `
<ul>
<li>NEW DIMENSIONS?</li>
<li>Super Secret Post-Infinity Dimensions added. Get more antimatter to find out!</li>
<li>Post-break double galaxy upgrade nerfed. It now gives 50% more.</li>
<li>Four new post-break upgrades added.</li>
<li>Scaling of the dimension cost multiplier increased.</li>
<li>Eight new achievements added.</li>
<li>Cloud saving maybe added.</li>
<li>Refunded Dimension cost increase multiplier and changed the cost.</li>
</ul>`
  },
  {
    date: [2017, 9, 19],
    name: "Breaking Infinity",
    info: `
<ul>
<li>Post infinity content added (Breaking infinity), requires big crunch speed to be maxed.</li>
<li>New upgrade tree pre-breaking, included one upgrade that be taken multiple times to
increase infinity point gains.</li>
<li>Eight late game post-breaking upgrades.</li>
<li>Eight new achievements.</li>
<li>Reworked autobuyer prices and times, full refund for all points spent on them.</li>
<li>Autobuyers now can be upgraded beyond 0.1 seconds, and they also now 'wait' after their interval has passed,
instantly buying once they are able to.</li>
<li>Automatic DimBoosts, Galaxies, and Big Crunches now have an input box.</li>
<li>Unique achievement rewards for multiple achievements.</li>
<li>Zero galaxies now gives 11% tickspeed.</li>
<li>Galaxies past two give diminishing returns, Faster than a Potato made easier to compensate.</li>
<li>Game now updates 20 times a second with increased performance, max autobuyer speed is not impacted.</li>
<li>Autobuyer settings are now saved in between sessions.</li>
<li>Monitor scaling issues mainly fixed.</li>
<li>Priority should be working properly.</li>
<li>Big crunch button is now less obtrusive.</li>
<li>Your screen no longer defaults to the dimensions tab when you reach infinity
(if you have broken infinity or if your fastest time to reach infinity is less than one minute).</li>
<li>More statistics have been added such as record challenge times and last ten infinities.</li>
<li>Times below one minute are now kept at two decimal points of precision.</li>
<li>Percentage increase per second for dimensions 1-8 are now kept to two decimal points of precision.</li>
<li>The reset button works better now.</li>
</ul>`
  },
  {
    date: [2017, 9, 7],
    name: "Challenges",
    info: `
<ul>
<li>Added 12 challenges.</li>
<li>Added 8 new achievements.</li>
<li>Added autobuyers.</li>
</ul>`
  },
  {
    // These were originally spread throughout 28/8 to 30/8.
    // But they would otherwise hold too little content on their own
    date: [2017, 8, 30],
    info: `
<ul>
<li>Added news on top of the page.</li>
<li>Added a multiplier for completing a row of achievements.</li>
<li>New letter notation option.</li>
<li>Nerfed galaxies from +3% to +2%.</li>
<li>Added 8 new achievements.</li>
<li>Added Dimensional Sacrifice, appears at 5th dimension shift/boost.</li>
<li>More notations!</li>
<li>Bar until infinity at the bottom.</li>
<li>Some UI changes.</li>
</ul>`
  },
  {
    date: [2017, 8, 24],
    name: "Infinity",
    info: `
<ul>
<li>Now when you get to 1.7e308 antimatter, you reach infinity, and you can reset again at infinity,
gaining infinity points.</li>
<li>You can use infinity points for upgrades.</li>
<li>The game also now runs 6 hours while it is closed.</li>
<li>In addition there are some graphic updates.</li>
</ul>`
  },
  // These were originally spread throughout 3/5 to 7/5.
  // But they would otherwise hold too little content on their own
  {
    date: [2017, 5, 7],
    info: `
<ul>
<li>Added this changelog, fixed money displaying problem. Added a title to the HTML.</li>
<li>The game now works offtab.</li>
<li>Fixed the bug with costs showing for example 1000 SxTg.</li>
<li>Visual update! And statistics.</li>
<li>Added export and import options.</li>
<li>Added save button although game saves every 10 seconds.</li>
<li>Slightly smaller text and added a max all button.</li>
<li>Saves should now FINALLY work properly.</li>
</ul>`
  }
];


for (let i = 0; i < changelog.length; i++) {
  changelog[i].id = i;
}
