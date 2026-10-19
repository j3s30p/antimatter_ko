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

## 1.1.1 다시 빌드하고 패키징하기

글리프 오류 수정과 버전 표시까지 포함하려면 먼저 현재 소스를 Steam 모드로 빌드한 뒤 통합 패키징 도구를 실행합니다. `NODE_ENV=development`는 기존 Steam 번들의 파일 이름과 모듈 구성을 유지하기 위한 설정입니다. 게임의 개발 기능은 `VUE_APP_DEV`가 없는 `steam-release` 모드에서 비활성화됩니다.

```powershell
npm ci --ignore-scripts --no-audit --no-fund
$env:NODE_ENV = "development"
npm run build:steam-release
node tools/build-korean-release.cjs korean-v1.0.0.asar ../AppFiles distribution/app.asar
./distribution/Build-Release.ps1 -Version 1.1.1 -AppAsarPath ./distribution/app.asar
```

통합 도구는 아래 v1.0.0 입력의 해시를 검사하고, 새 AppFiles를 반영한 다음 바이올렛을 적용합니다. ASAR 무결성 해시와 304개 native sidecar 항목을 검사하며, 결과 해시를 매니페스트에 기록합니다. 설치용 ZIP은 최종 소스의 README와 변경 내역을 함께 담습니다. 검증 이미지는 GitHub의 릴리스와 이슈에서 제공합니다.

## 바이올렛만 다시 적용하기

Node.js 18 이상이 필요하며 별도 npm 패키지는 필요하지 않습니다. 입력 파일은 **한국어 패치 v1.0.0의 `resources/app.asar`**입니다. Steam 원본이나 이미 바이올렛을 적용한 파일을 입력으로 사용하지 않습니다.

입력 SHA-256:

```text
D3DF8A16D618D7548ADDE7DA10A97050AFA8FF357D20446D855381F91018F0A4
```

저장소 루트에서 실행합니다. `korean-v1.0.0.asar`에는 위 입력 파일을 준비합니다.

```powershell
node theme-overrides/build-violet-asar.js korean-v1.0.0.asar theme-overrides/violet.css theme-overrides/assets/violet-pixel-wave.png distribution/app.asar
```

바이올렛은 한국어 패치 `1.1.0`부터 포함되어 있습니다. 바이올렛만 적용하는 위 명령은 글리프 오류 수정이나 새 버전 표시를 포함하지 않습니다. 현재 소스를 배포하려면 문서 첫 부분의 통합 빌드 명령을 사용합니다. 배포 파일은 기본 브랜치의 [`resources/app.asar`](https://github.com/j3s30p/antimatter_ko/blob/korean-localization/resources/app.asar)에 보관합니다.

1.1.1 배포용 파일 SHA-256:

```text
B31131C411057BA62A630EB4F0996FE1F9B6FECCF047373E5D55BDCB200C5D46
```

이미지 4개는 이 테마를 위해 이미지 생성 도구로 제작·선정한 작업물입니다. 원작과 기존 글꼴의 출처는 루트 `ATTRIBUTION.md`를 참고하세요.
