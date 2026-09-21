# Antimatter Dimensions Steam 한국어 패치

Steam판 **Antimatter Dimensions**의 비공식 한국어 번역 패치입니다.

- 대상 게임 버전: Steam 11.5
- 한글 글꼴: Galmuri9 Regular
- 클래식 UI와 모던 UI 모두 지원
- 기존 저장 데이터와 호환

현재 정식 배포본을 준비하고 있습니다. 테스트 중인 파일은 GitHub Releases에 올리는 완성된 ZIP과 구성이 다를 수 있으므로, 일반 사용자는 릴리즈가 게시된 뒤 설치하는 것을 권장합니다.

## 다운로드 방법

1. 이 저장소 오른쪽의 **Releases**를 엽니다.
2. 최신 릴리즈의 **Assets**를 펼칩니다.
3. `AntimatterDimensions_KoreanPatch_버전.zip`을 내려받습니다.
4. ZIP 파일의 압축을 풉니다.

> GitHub가 자동으로 제공하는 `Source code (zip)`과 `Source code (tar.gz)`는 개발용 소스이며 설치 파일이 아닙니다.

## 설치 방법

1. 게임을 완전히 종료합니다.
2. Steam 라이브러리에서 **Antimatter Dimensions 우클릭 → 관리 → 로컬 파일 보기**를 누릅니다.
3. 열린 게임 폴더에 `Antimatter Dimensions.exe`가 있는지 확인합니다.
4. 압축을 푼 폴더의 내용물 전체를 게임 폴더에 그대로 복사합니다.
5. 파일을 덮어쓸지 묻는 창이 나타나면 **덮어쓰기**를 선택합니다.
6. 게임을 실행해 첫 화면이 한국어로 나오는지 확인합니다.

복사되는 핵심 파일은 다음과 같습니다.

```text
resources\app.asar
```

글꼴과 번역 데이터는 `app.asar` 안에 포함되어 있어 별도의 글꼴 설치가 필요하지 않습니다. 저장 데이터는 게임 설치 폴더 밖에 있으므로 이 패치가 저장 데이터를 수정하지 않습니다.

## 원상복구 방법

Steam 라이브러리에서 게임을 우클릭한 뒤 **속성 → 설치된 파일 → 게임 파일 무결성 검사**를 실행하면 원본 영어 파일로 복구됩니다.

Steam 업데이트나 무결성 검사를 실행하면 한국어 패치가 원본으로 돌아갈 수 있습니다. 이 경우 게임 버전과 패치 지원 버전이 같은지 확인한 뒤 패치를 다시 복사하세요.

## 의도적으로 영어로 유지한 부분

게임 동작이나 입력 호환성에 영향을 주는 다음 항목은 영어를 유지합니다.

- 오토메이터 명령어와 스크립트 식별자
- 플레이어가 직접 입력해야 하는 일부 확인 문구
- URL, 코드, 파일명 및 고유한 외부 서비스 이름
- 이미지 자체에 포함된 글자
- Steam 오버레이에서 제공하는 도전 과제 문구

## 번역 원칙

- Steam 본편에 실제로 존재하는 콘텐츠만 번역합니다.
- 팬 확장판 전용 시스템과 문구는 포함하지 않습니다.
- 숫자, 공식, 내부 식별자와 저장 데이터 형식은 변경하지 않습니다.
- 기존 한국어 번역을 참고하되 문맥과 UI 폭에 맞게 검수합니다.

진행 상황은 [`docs/TRANSLATION_PROGRESS.md`](docs/TRANSLATION_PROGRESS.md), 번역 범위는 [`docs/TRANSLATION_SCOPE.md`](docs/TRANSLATION_SCOPE.md), 고정 용어는 [`docs/GLOSSARY.md`](docs/GLOSSARY.md)에서 확인할 수 있습니다.

## 개발 및 빌드

개발에 참여하려면 Node.js LTS가 필요합니다.

```bash
npm ci
npm run serve
```

Steam용 빌드:

```bash
npm run build:steam-release
```

배포 ZIP 생성 절차는 `distribution/README.txt`를 참고하세요.

## 라이선스 및 출처

- 이 프로젝트는 비공식 팬 번역 패치입니다.
- 원본 게임 저작권은 원저작자에게 있습니다.
- Galmuri9 Regular는 SIL Open Font License 1.1에 따라 포함됩니다.
- 상세 출처와 라이선스는 [`ATTRIBUTION.md`](ATTRIBUTION.md)와 [`public/licenses/Galmuri-OFL-1.1.txt`](public/licenses/Galmuri-OFL-1.1.txt)를 확인하세요.
