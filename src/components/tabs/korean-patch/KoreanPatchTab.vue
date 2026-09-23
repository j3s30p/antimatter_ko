<script>
import { openExternalLink } from "@/utility/open-external-link";

const LINKS = Object.freeze({
  maintainer: "https://github.com/j3s30p",
  issues: "https://github.com/j3s30p/antimatter_ko/issues",
  newIssue: "https://github.com/j3s30p/antimatter_ko/issues/new",
  original: "https://github.com/IvarK/AntimatterDimensionsSourceCode",
  endgameKorean: "https://github.com/gyeol0710/antimatter-dimensions-endgame-korean",
  adKorean: "https://github.com/Jihuu621/ADKorean",
  fontProject: "https://github.com/quiple/galmuri"
});

export default {
  name: "KoreanPatchTab",
  props: {
    page: {
      type: String,
      required: true,
      validator: value => ["info", "credits", "report"].includes(value)
    }
  },
  data() {
    return {
      patchVersion: "1.0.0",
      gameVersion: "Steam 11.5",
      links: LINKS
    };
  },
  computed: {
    pageTitle() {
      if (this.page === "info") return "한국어 패치 정보";
      if (this.page === "credits") return "한국어 패치 크레딧";
      return "번역 오류 제보";
    },
    pageIcon() {
      if (this.page === "info") return "fas fa-language";
      if (this.page === "credits") return "fas fa-users";
      return "fas fa-bug";
    }
  },
  methods: {
    openLink(link) {
      openExternalLink(link);
    }
  }
};
</script>

<template>
  <div class="c-korean-patch-tab">
    <div class="c-korean-patch-header">
      <div
        class="c-korean-patch-header-icon"
        :class="pageIcon"
      />
      <div class="c-korean-patch-heading">
        <div class="c-korean-patch-title">
          {{ pageTitle }}
        </div>
        <div
          v-if="page === 'info'"
          class="c-korean-patch-version"
        >
          {{ patchVersion }} · {{ gameVersion }}
        </div>
      </div>
    </div>

    <template v-if="page === 'info'">
      <div class="c-korean-patch-intro">
        이 패치는 Steam판 Antimatter Dimensions를 위한 비공식 한국어 번역 패치입니다.
        원작 제작진과 공식적으로 제휴하거나 공식 승인을 받은 배포판이 아닙니다.
      </div>

      <div class="c-korean-patch-info-layout">
        <div class="c-korean-patch-timeline">
          <div class="c-korean-patch-timeline-item">
            <div class="c-korean-patch-section-heading">
              적용 대상
            </div>
            <div class="c-korean-patch-info-main-text">
              Antimatter Dimensions {{ gameVersion }}
            </div>
          </div>

          <div class="c-korean-patch-timeline-item">
            <div class="c-korean-patch-section-heading">
              패치 구성
            </div>
            <div class="c-korean-patch-info-line">
              <span>적용 파일</span>
              <code>resources/app.asar</code>
            </div>
            <div class="c-korean-patch-info-line">
              <span>한국어 적용 내용</span>
              <strong>Steam 본편에서 플레이어에게 표시되는 모든 문구</strong>
            </div>
            <div class="c-korean-patch-info-note">
              원형을 유지해야 하는 약어와 명령 토큰 등은 번역 원칙에 따라 표기합니다.
            </div>
          </div>

          <div class="c-korean-patch-timeline-item">
            <div class="c-korean-patch-section-heading">
              저장 데이터
            </div>
            <div class="c-korean-patch-info-main-text">
              로컬 및 Steam Cloud 저장 데이터는 변경하지 않습니다.
            </div>
          </div>

          <div class="c-korean-patch-timeline-item">
            <div class="c-korean-patch-section-heading">
              번역 원칙
            </div>
            <div class="c-korean-patch-principles c-korean-patch-info-principles">
              <div class="c-korean-patch-principle">
                원문이 정식 명칭이면 한국어 정식 명칭으로, 약어이면 원문의 약어와 대소문자를 유지합니다.
              </div>
              <div class="c-korean-patch-principle">
                오토메이터 명령어, 내부 식별자, 숫자, 공식과 저장 데이터 형식은 변경하지 않습니다.
              </div>
              <div class="c-korean-patch-principle">
                같은 게임 용어는 화면과 진행 단계가 달라도 일관되게 번역합니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="page === 'credits'">
      <div class="c-korean-patch-credit-layout">
        <div class="c-korean-patch-team">
          <div class="c-korean-patch-section-heading">
            패치 제작
          </div>
          <div class="c-korean-patch-team-role">
            제작 및 관리
          </div>
          <a
            class="c-korean-patch-team-name"
            :href="links.maintainer"
            target="_blank"
            rel="noopener noreferrer"
            @click.prevent="openLink(links.maintainer)"
          >
            j3s30p
          </a>
          <div class="c-korean-patch-team-work">
            번역 · 검수 · 배포
          </div>
        </div>

        <div class="c-korean-patch-credit-divider" />

        <div class="c-korean-patch-credit-details">
          <div class="c-korean-patch-credit-section">
            <div class="c-korean-patch-section-heading">
              원작과 기여
            </div>
            <div class="c-korean-patch-credit-link-list">
              <a
                :href="links.original"
                target="_blank"
                rel="noopener noreferrer"
                @click.prevent="openLink(links.original)"
              >
                Hevipelle (IvarK)와 Antimatter Dimensions 기여자
              </a>
            </div>
          </div>

          <div class="c-korean-patch-credit-section">
            <div class="c-korean-patch-section-heading">
              번역 참고
            </div>
            <div class="c-korean-patch-credit-link-list">
              <a
                :href="links.endgameKorean"
                target="_blank"
                rel="noopener noreferrer"
                @click.prevent="openLink(links.endgameKorean)"
              >
                SameMa의 Endgame 한국어판
              </a>
              <a
                :href="links.adKorean"
                target="_blank"
                rel="noopener noreferrer"
                @click.prevent="openLink(links.adKorean)"
              >
                SeonjiSoup621의 ADKorean
              </a>
            </div>
          </div>

          <div class="c-korean-patch-credit-section">
            <div class="c-korean-patch-section-heading">
              글꼴
            </div>
            <div class="c-korean-patch-credit-link-list">
              <a
                :href="links.fontProject"
                target="_blank"
                rel="noopener noreferrer"
                @click.prevent="openLink(links.fontProject)"
              >
                Galmuri9 Regular · SIL Open Font License 1.1
              </a>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="c-korean-patch-intro">
        오역, 번역 누락, 용어 불일치와 글자 잘림을 발견하면 알려 주세요.
      </div>

      <div class="c-korean-patch-report-layout">
        <div class="c-korean-patch-report-checklist">
          <div class="c-korean-patch-section-heading">
            제보 전 확인
          </div>
          <div class="c-korean-patch-report-items">
            <div class="c-korean-patch-report-item">
              문제가 나타난 탭과 진행 단계
            </div>
            <div class="c-korean-patch-report-item">
              현재 문구와 기대하는 수정 문구
            </div>
            <div class="c-korean-patch-report-item">
              가능하면 문제 화면의 스크린샷
            </div>
            <div class="c-korean-patch-report-item">
              사용 중인 게임 및 한국어 패치 버전
            </div>
          </div>
        </div>

        <div class="c-korean-patch-credit-divider" />

        <div class="c-korean-patch-report-actions">
          <div class="c-korean-patch-section-heading">
            제보 접수
          </div>
          <div class="c-korean-patch-report-action-title">
            번역 오류를 제보해 주세요
          </div>
          <div class="c-korean-patch-report-action-description">
            필요한 정보를 적어 새 제보를 등록하거나, 이미 접수된 내용을 확인할 수 있습니다.
          </div>
          <div class="c-korean-patch-report-links">
            <a
              class="c-korean-patch-report-link c-korean-patch-report-link--primary"
              :href="links.newIssue"
              target="_blank"
              rel="noopener noreferrer"
              @click.prevent="openLink(links.newIssue)"
            >
              <i class="fas fa-arrow-up-right-from-square" />
              새 오류 제보 작성
            </a>
            <a
              class="c-korean-patch-report-link"
              :href="links.issues"
              target="_blank"
              rel="noopener noreferrer"
              @click.prevent="openLink(links.issues)"
            >
              <i class="fas fa-comment-dots" />
              기존 제보 확인
            </a>
          </div>
          <div class="c-korean-patch-report-account-note">
            깃허브 계정이 필요할 수 있습니다.
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.c-korean-patch-tab {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  clear: both;
  float: none;
  position: static;
  width: calc(100% - 4rem);
  max-width: 84rem;
  margin: 2rem auto 4rem;
  color: var(--color-text);
  font-size: 1.7rem;
  line-height: 1.6;
}

.c-korean-patch-header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  clear: both;
  float: none;
  position: static;
  width: 100%;
  margin-bottom: 2rem;
}

.c-korean-patch-header-icon {
  flex: 0 0 auto;
  color: var(--color-accent);
  font-size: 4rem;
}

.c-korean-patch-heading {
  min-width: 0;
}

.c-korean-patch-title {
  font-size: 3rem;
  font-weight: bold;
  line-height: 1.25;
}

.c-korean-patch-version {
  margin-top: 0.4rem;
  color: var(--color-accent);
  font-size: 1.6rem;
  font-weight: bold;
}

.c-korean-patch-intro {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 2rem;
}

.c-korean-patch-info-layout {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  padding: 1rem 0 2rem;
  text-align: left;
}

.c-korean-patch-timeline {
  position: relative;
  padding-left: 5rem;
}

.c-korean-patch-timeline::before {
  content: "";
  width: 0.2rem;
  position: absolute;
  top: 1rem;
  bottom: 1rem;
  left: 1.2rem;
  background: var(--color-accent);
}

.c-korean-patch-timeline-item {
  position: relative;
  padding-bottom: 3rem;
}

.c-korean-patch-timeline-item:last-child {
  padding-bottom: 0;
}

.c-korean-patch-timeline-item::before {
  content: "";
  box-sizing: border-box;
  width: 1.8rem;
  height: 1.8rem;
  position: absolute;
  top: 0.7rem;
  left: -4.7rem;
  background: var(--color-base);
  border: 0.3rem solid var(--color-accent);
}

.c-korean-patch-info-main-text {
  margin-top: 0.9rem;
  font-size: 1.9rem;
}

.c-korean-patch-info-line {
  display: grid;
  grid-template-columns: 15rem 1fr;
  gap: 1rem;
  margin-top: 1rem;
  font-size: 1.7rem;
}

.c-korean-patch-info-line span {
  color: var(--color-accent);
  font-weight: bold;
}

.c-korean-patch-info-line code {
  color: var(--color-text);
  background: transparent;
  font: inherit;
}

.c-korean-patch-info-line strong {
  font-weight: bold;
}

.c-korean-patch-info-note {
  margin-top: 0.7rem;
  padding-left: 16rem;
  color: var(--color-text);
  font-size: 1.5rem;
  opacity: 0.7;
}

.c-korean-patch-info-principles {
  margin-top: 1rem;
}

.c-korean-patch-principles {
  width: 100%;
}

.c-korean-patch-credit-layout {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(22rem, 0.8fr) 0.1rem minmax(34rem, 1.4fr);
  gap: 3rem;
  width: 100%;
  padding: 2rem 0;
  text-align: left;
}

.c-korean-patch-team {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.c-korean-patch-section-heading {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: var(--color-accent);
  font-size: 2.1rem;
  font-weight: bold;
}

.c-korean-patch-section-heading::after {
  content: "";
  width: 5rem;
  height: 0.1rem;
  background: var(--color-accent);
  opacity: 0.75;
}

.c-korean-patch-team-role {
  margin-top: 2.4rem;
  font-size: 2.4rem;
  font-weight: bold;
}

.c-korean-patch-team-name {
  display: inline-block;
  align-self: flex-start;
  margin-top: 2rem;
  color: var(--color-text);
  font-size: 5.5rem;
  font-weight: bold;
  line-height: 1;
  text-decoration: none;
}

.c-korean-patch-team-name:hover,
.c-korean-patch-credit-link-list a:hover {
  color: var(--color-accent);
}

.c-korean-patch-team-work {
  margin-top: 2rem;
  color: var(--color-text);
  font-size: 1.8rem;
  opacity: 0.65;
}

.c-korean-patch-credit-divider {
  width: 0.1rem;
  height: 100%;
  min-height: 34rem;
  background: var(--color-accent);
}

.c-korean-patch-credit-details {
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
}

.c-korean-patch-credit-link-list {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: 1rem;
}

.c-korean-patch-credit-link-list a {
  display: block;
  color: var(--color-text);
  font-size: 1.8rem;
  text-decoration: none;
  transition: color 0.15s;
}

.c-korean-patch-report-layout {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(34rem, 1.4fr) 0.1rem minmax(28rem, 1fr);
  gap: 3rem;
  width: 100%;
  padding: 2rem 0;
  text-align: left;
}

.c-korean-patch-report-items {
  margin-top: 1.5rem;
}

.c-korean-patch-report-item {
  position: relative;
  padding: 1.5rem 1rem 1.5rem 4.5rem;
  font-size: 1.8rem;
  border-bottom: 0.1rem solid rgba(127, 127, 127, 0.35);
}

.c-korean-patch-report-item::before {
  content: "";
  box-sizing: border-box;
  width: 1.8rem;
  height: 1.8rem;
  position: absolute;
  top: 50%;
  left: 1rem;
  border: 0.3rem solid var(--color-accent);
  transform: translateY(-50%);
}

.c-korean-patch-report-actions {
  display: flex;
  flex-direction: column;
}

.c-korean-patch-report-action-title {
  margin-top: 2rem;
  font-size: 2.4rem;
  font-weight: bold;
}

.c-korean-patch-report-action-description {
  margin-top: 0.6rem;
  color: var(--color-text);
  font-size: 1.5rem;
  opacity: 0.7;
}

.c-korean-patch-report-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.c-korean-patch-report-link {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem 1.5rem;
  color: var(--color-text);
  border: 0.2rem solid var(--color-accent);
  border-radius: 0.5rem;
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.15s, color 0.15s, filter 0.15s;
}

.c-korean-patch-report-link:hover,
.c-korean-patch-report-link--primary {
  color: var(--color-base);
  background: var(--color-accent);
}

.c-korean-patch-report-link--primary:hover {
  filter: brightness(1.1);
}

.c-korean-patch-report-account-note {
  margin-top: 2rem;
  padding-top: 1.5rem;
  color: var(--color-text);
  border-top: 0.1rem solid rgba(127, 127, 127, 0.35);
  font-size: 1.4rem;
  opacity: 0.65;
}

.c-korean-patch-principle {
  position: relative;
  padding-left: 1.6rem;
}

.c-korean-patch-principle::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

.c-korean-patch-principle + .c-korean-patch-principle {
  margin-top: 0.5rem;
}

@media (max-width: 60rem) {
  .c-korean-patch-tab {
    width: calc(100% - 2rem);
  }

  .c-korean-patch-header {
    align-items: flex-start;
  }

  .c-korean-patch-title {
    font-size: 2.3rem;
  }

  .c-korean-patch-credit-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .c-korean-patch-credit-divider {
    width: 100%;
    height: 0.1rem;
    min-height: 0;
  }

  .c-korean-patch-team-name {
    font-size: 4rem;
  }

  .c-korean-patch-report-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .c-korean-patch-info-line {
    grid-template-columns: 1fr;
    gap: 0.2rem;
  }

  .c-korean-patch-info-note {
    padding-left: 0;
  }
}
</style>
