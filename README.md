# Antimatter Dimensions Steam 한국어 패치

Steam판 **Antimatter Dimensions** 비공식 한국어 패치입니다.

- 대상 게임 버전: Steam 11.5
- 패치 버전: 1.0.0-rc.3
- 배포 상태: 1.0.0 정식판 후보
- 한글 글꼴: Galmuri9 Regular
- 클래식 UI와 모던 UI 지원
- 기존 저장 데이터와 호환

## 다운로드

아래 파일 하나만 받으면 됩니다.

**[AntimatterDimensions_KoreanPatch_1.0.0-rc.3.zip 다운로드](https://github.com/j3s30p/antimatter_ko/releases/download/v1.0.0-rc.3/AntimatterDimensions_KoreanPatch_1.0.0-rc.3.zip)**

> GitHub의 초록색 `Code` 버튼 대신 위 링크 또는 오른쪽의 **Releases**에서 배포 ZIP을 받으세요.

## 설치 방법

1. 게임을 완전히 종료합니다.
2. Steam 라이브러리에서 **Antimatter Dimensions 우클릭 → 관리 → 로컬 파일 보기**를 누릅니다.
3. 받은 ZIP의 압축을 풉니다.
4. 압축을 푼 폴더에서 `resources` 폴더만 게임 폴더에 끌어다 놓습니다. 다른 파일은 복사하지 않아도 됩니다.
5. `app.asar`를 덮어쓸지 묻는 창이 나타나면 **덮어쓰기**를 선택합니다.
6. 게임을 실행해 첫 화면이 한국어인지 확인합니다.

또는 압축본의 `resources\app.asar`만 복사해 게임 폴더의 `resources` 폴더에 직접 붙여넣어도 됩니다.
`README.md`, `ATTRIBUTION.md`, `licenses`, `patch-manifest.json`, `한글패치_설치방법.txt`는 안내 및 고지 파일이므로
게임 폴더에 복사하지 않아도 됩니다.

실제로 교체되는 핵심 파일은 `resources\app.asar` 하나입니다. 글꼴과 번역 데이터가 모두 이 파일에 포함되어
있으므로 별도로 글꼴을 설치할 필요가 없습니다. 저장 데이터와 `app.asar.unpacked`는 수정하지 않습니다.

## 원상복구

Steam에서 게임을 우클릭한 뒤 **속성 → 설치된 파일 → 게임 파일 무결성 검사**를 실행하면 영어 원본으로
복구됩니다.

Steam 업데이트나 무결성 검사를 실행하면 한국어 패치가 제거될 수 있습니다. 이 경우 지원 게임 버전을 확인한
뒤 패치를 다시 설치하세요.

## 참고

- 오토메이터 명령어와 내부 식별자는 스크립트 및 저장 호환성을 위해 영어를 유지합니다.
- URL, 코드, 파일명, 외부 서비스 이름과 일부 직접 입력 확인 문구는 원문을 유지합니다.
- 라이선스와 출처는 ZIP 및 이 저장소의 `ATTRIBUTION.md`와 `licenses` 폴더에서 확인할 수 있습니다.
- Galmuri9의 SIL Open Font License 1.1 고지는 `app.asar` 내부에도 포함되어 있습니다.

배포 파일 SHA-256:

```text
D7765FEB02B621E7CF6D3A00478EBE33277BDB9C945F06CA01A09E6A90C18E75  resources/app.asar
```
