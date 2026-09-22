# Antimatter Dimensions Steam 한국어 패치

Steam판 **Antimatter Dimensions**의 비공식 한국어 번역 패치입니다.

## 바로 다운로드 및 설치

1. **[한국어 패치 1.0.0-rc.4 ZIP 다운로드](https://github.com/j3s30p/antimatter_ko/releases/download/v1.0.0-rc.4/AntimatterDimensions_KoreanPatch_1.0.0-rc.4.zip)**
2. 받은 ZIP 파일의 압축을 풉니다.
3. 게임과 백그라운드에 남은 게임 프로세스를 완전히 종료합니다.
4. Steam 라이브러리에서 **Antimatter Dimensions 우클릭 → 관리 → 로컬 파일 보기**를 누릅니다.
5. 압축을 푼 폴더의 `resources` 폴더만 게임 폴더에 끌어다 놓습니다.
6. `app.asar`를 덮어쓸지 묻는 창이 나타나면 **덮어쓰기**를 선택하고 게임을 실행합니다.

> GitHub의 초록색 `Code` 버튼에서 받는 `Source code` 파일은 설치용 패치가 아닙니다. 반드시 위의 배포 ZIP을 받으세요.

실제로 교체되는 파일은 `resources\app.asar` 하나입니다. 원한다면 압축본의 `resources\app.asar`만 복사해
게임 폴더의 `resources` 안에 직접 붙여넣어도 됩니다. 나머지 파일은 안내와 라이선스 문서이므로 게임 폴더에
복사하지 않아도 됩니다.

## 원상복구

Steam에서 게임을 우클릭한 뒤 **속성 → 설치된 파일 → 게임 파일 무결성 검사**를 실행하면 영어 원본으로
복구됩니다.

Steam 업데이트나 무결성 검사를 실행하면 한국어 패치가 제거될 수 있습니다. 이 경우 지원 게임 버전을 확인한
뒤 패치를 다시 설치하세요.

## 패치 정보

- 최신 공개 버전: 1.0.0-rc.4
- 대상 게임 버전: Steam 11.5
- 한글 글꼴: Galmuri9 Regular
- 클래식 UI와 모던 UI 지원
- 기존 저장 데이터와 호환

글꼴과 번역 데이터는 `app.asar`에 포함되어 있어 별도의 글꼴 설치가 필요하지 않습니다. 저장 데이터와
`app.asar.unpacked`는 수정하지 않습니다.

## 의도적으로 영어로 유지한 부분

- 오토메이터 명령어와 스크립트 식별자
- 플레이어가 직접 입력해야 하는 일부 확인 문구
- URL, 코드, 파일명 및 고유한 외부 서비스 이름
- 이미지 자체에 포함된 글자
- Steam 오버레이에서 제공하는 도전 과제 문구

## 번역 원칙

- 원문의 의미와 말투, 농담의 의도를 가능한 한 그대로 살립니다.
- 같은 게임 용어는 모든 진행 단계에서 일관되게 사용합니다.
- 원문이 정식 명칭이면 한국어 정식 명칭으로, 약어이면 같은 약어와 대소문자를 유지합니다.
- 숫자, 공식, 단축키, 내부 식별자, 오토메이터 명령어와 저장 데이터 형식은 변경하지 않습니다.
- 버튼과 짧은 안내문은 간결하게, 도움말과 설명문은 자연스럽고 명확하게 번역합니다.

진행 상황은 [`docs/TRANSLATION_PROGRESS.md`](docs/TRANSLATION_PROGRESS.md), 번역 범위는
[`docs/TRANSLATION_SCOPE.md`](docs/TRANSLATION_SCOPE.md), 고정 용어는 [`docs/GLOSSARY.md`](docs/GLOSSARY.md)에서
확인할 수 있습니다.

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
- 상세 출처와 라이선스는 [`ATTRIBUTION.md`](ATTRIBUTION.md)와
  [`public/licenses/Galmuri-OFL-1.1.txt`](public/licenses/Galmuri-OFL-1.1.txt)를 확인하세요.
