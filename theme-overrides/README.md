# 바이올렛 테마

2026-09-30에 확정한 Steam 11.5 한국어 패치용 테마입니다. 설정의 테마 목록에서 **바이올렛**을 선택합니다.

## 포함된 연출

- 보라색 버튼과 진행 게이지, 투명한 픽셀 물결 배경, 독립적으로 움직이는 반짝임
- 화면의 금을 따라 갈라지고 떨어지는 빅크런치 연출
- 시간팽창 진입·해제의 워프 전환
- 가스 흐름과 활성화 순간의 흡입·발광을 더한 블랙홀, 기존 블롭홀 옵션 지원
- 블랙홀 일시정지 버튼의 한글 줄바꿈 수정, 현실 머신 가격과 PlayFab 알림 번역

현실·셀레스티얼의 고유 색상과 영원·현실의 기존 연출은 유지합니다. 사용자 저장 데이터나 테스트 슬롯을 바꾸는 도구는 포함하지 않습니다.

## 구조

기존 게임 소스의 빌드 이후에 적용하는 ASAR 패치입니다. 이 디렉터리의 코드와 PNG가 바이올렛의 원본이며, Vue 소스만 빌드해서는 테마가 포함되지 않습니다.

| 파일 | 역할 |
| --- | --- |
| `build-violet-asar.js` | 테마 등록, 게임 이벤트 연결, ASAR 패키징 |
| `violet.css` | 버튼·게이지·레이아웃 |
| `violet-wave.js` | 물결 배경과 반짝임 |
| `violet-warp.js` | 시간팽창 진입·해제 |
| `violet-effects.js` | 빅크런치 파편과 공통 효과 |
| `violet-accretion-flow.js` | 블랙홀 가스 흐름 셰이더 |
| `violet-black-hole-real.js` | 블랙홀 상태·입자·활성화 연출 |
| `assets/` | 최종 선택한 이미지 4개 |

## 다시 패키징하기

Node.js 18 이상이 필요하며 별도 npm 패키지는 필요하지 않습니다. 입력 파일은 **한국어 패치 v1.0.0의 `resources/app.asar`**입니다. Steam 원본이나 이미 바이올렛을 적용한 파일을 입력으로 사용하지 않습니다.

입력 SHA-256:

```text
D3DF8A16D618D7548ADDE7DA10A97050AFA8FF357D20446D855381F91018F0A4
```

저장소 루트에서 실행합니다. `korean-v1.0.0.asar`에는 위 입력 파일을 준비합니다.

```powershell
node theme-overrides/build-violet-asar.js korean-v1.0.0.asar theme-overrides/violet.css theme-overrides/assets/violet-pixel-wave.png distribution/app.asar
```

바이올렛은 한국어 패치 정식 버전 `1.1.0`에 포함되어 있습니다. 현재 게임에 적용한 파일은 기본 브랜치의 [`resources/app.asar`](https://github.com/j3s30p/antimatter_ko/blob/korean-localization/resources/app.asar)에 보관합니다.

설치된 최종 파일 SHA-256:

```text
BBAB6D782C3877A473F3AA692ED84D239863F94AEE81BF784B499219642DF54A
```

이미지 4개는 이 테마를 위해 이미지 생성 도구로 제작·선정한 작업물입니다. 원작과 기존 글꼴의 출처는 루트 `ATTRIBUTION.md`를 참고하세요.
