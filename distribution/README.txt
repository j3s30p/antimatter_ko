Antimatter Dimensions Steam 한국어 패치
========================================

기본 설치 방법
1. 게임을 완전히 종료합니다.
2. Steam 라이브러리에서 게임 우클릭 → 관리 → 로컬 파일 보기를 누릅니다.
3. 압축을 푼 폴더의 내용물 전체를 게임 폴더에 그대로 복사합니다.
4. 덮어쓰기 확인 창이 나타나면 덮어쓰기를 선택합니다.
5. 게임을 실행해 첫 화면이 한국어인지 확인합니다.

핵심 복사 파일
- resources\app.asar

원상복구
- Steam에서 속성 → 설치된 파일 → 게임 파일 무결성 검사를 실행합니다.
- 개발용 Restore-Original.cmd는 설치 스크립트가 만든 백업이 있을 때만 사용할 수 있습니다.

주의
- 대상 게임 버전은 Steam 11.5입니다.
- Steam 업데이트나 파일 무결성 검사는 한국어 패치를 제거할 수 있습니다.
- app.asar.unpacked와 저장 데이터는 수정하거나 삭제하지 않습니다.
- 오토메이터 명령어와 스크립트용 식별자는 호환성을 위해 영어로 유지됩니다.

배포 ZIP 만들기
- 최종 app.asar를 distribution\app.asar에 둡니다.
- PowerShell에서 distribution\Build-Release.ps1을 실행합니다.
- distribution\release 폴더에 게임 루트에 그대로 복사할 ZIP이 생성됩니다.

라이선스 및 출처는 ZIP 안의 ATTRIBUTION.md와 licenses 폴더를 참조하세요.

