# Antimatter Dimensions Steam 한국어 패치

Steam판 **Antimatter Dimensions** 비공식 한국어 패치입니다.

- 대상 게임 버전: Steam 11.5
- 패치 버전: 0.9.0-rc.2
- 한글 글꼴: Galmuri9 Regular
- 클래식 UI와 모던 UI 지원
- 기존 저장 데이터와 호환

## 다운로드

아래 파일 하나만 받으면 됩니다.

**[AntimatterDimensions_KoreanPatch_0.9.0-rc.2.zip 다운로드](./AntimatterDimensions_KoreanPatch_0.9.0-rc.2.zip)**

> GitHub의 초록색 `Code` 버튼 대신 위 링크의 ZIP을 받으세요.

## 설치 방법

1. 게임을 완전히 종료합니다.
2. Steam 라이브러리에서 **Antimatter Dimensions 우클릭 → 관리 → 로컬 파일 보기**를 누릅니다.
3. 받은 ZIP의 압축을 풉니다.
4. 압축을 푼 폴더의 내용물 전체를 게임 폴더에 복사합니다.
5. 파일을 덮어쓸지 묻는 창이 나타나면 **덮어쓰기**를 선택합니다.
6. 게임을 실행해 첫 화면이 한국어인지 확인합니다.

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
- 라이선스, 출처, 상세 설치 안내는 배포 ZIP 안에 포함되어 있습니다.

배포 파일 SHA-256:

```text
40F5A89DFD6617A787D1631E8C0DF5BCADF7DEF764F7518B1B4C3E354429A26D  resources/app.asar
```
