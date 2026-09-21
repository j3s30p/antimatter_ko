<script>
import AutosaveIntervalSlider from "./AutosaveIntervalSlider";
import OpenModalHotkeysButton from "@/components/OpenModalHotkeysButton";
import OptionsButton from "@/components/OptionsButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import SaveFileName from "./SaveFileName";

import { STEAM } from "@/env";

export default {
  name: "OptionsSavingTab",
  components: {
    AutosaveIntervalSlider,
    OpenModalHotkeysButton,
    OptionsButton,
    PrimaryToggleButton,
    SaveFileName
  },
  data() {
    return {
      cloudAvailable: false,
      cloudEnabled: false,
      forceCloudOverwrite: false,
      showCloudModal: false,
      syncSaveIntervals: false,
      showTimeSinceSave: false,
      hideGoogleName: false,
      loggedIn: false,
      userName: "",
      canSpeedrun: false,
      inSpeedrun: false,
      creditsClosed: false,
      canModifySeed: false,
    };
  },
  computed: {
    modalTooltip() {
      return `클라우드 저장을 덮어쓰지 않는 편이 나을 수 있는 상황을 게임이 감지하면
        자세한 정보를 담은 창을 표시합니다.`;
    },
    overwriteTooltip() {
      if (this.showCloudModal) return "충돌 안내 창을 표시하는 동안에는 이 설정이 적용되지 않습니다.";
      return this.forceCloudOverwrite
        ? `상황과 관계없이 로컬 저장이 항상 클라우드 저장을 덮어씁니다.`
        : `저장 충돌이 있으면 로컬 저장을 클라우드에 올리지 않습니다.`;
    },
    STEAM() {
      return STEAM;
    }
  },
  watch: {
    cloudEnabled(newValue) {
      player.options.cloudEnabled = newValue;
    },
    forceCloudOverwrite(newValue) {
      player.options.forceCloudOverwrite = newValue;
    },
    showCloudModal(newValue) {
      player.options.showCloudModal = newValue;
    },
    syncSaveIntervals(newValue) {
      player.options.syncSaveIntervals = newValue;
    },
    showTimeSinceSave(newValue) {
      player.options.showTimeSinceSave = newValue;
    },
    hideGoogleName(newValue) {
      player.options.hideGoogleName = newValue;
    }
  },
  methods: {
    update() {
      const options = player.options;
      this.cloudAvailable = Cloud.isAvailable;
      this.cloudEnabled = options.cloudEnabled;
      this.forceCloudOverwrite = options.forceCloudOverwrite;
      this.showCloudModal = options.showCloudModal;
      this.syncSaveIntervals = options.syncSaveIntervals;
      this.showTimeSinceSave = options.showTimeSinceSave;
      this.hideGoogleName = options.hideGoogleName;
      this.loggedIn = Cloud.loggedIn;
      this.canSpeedrun = player.speedrun.isUnlocked;
      this.inSpeedrun = player.speedrun.isActive;
      this.canModifySeed = Speedrun.canModifySeed();
      this.creditsClosed = GameEnd.creditsEverClosed;
      if (!this.loggedIn) return;
      this.userName = Cloud.user.displayName;
    },
    importAsFile(event) {
      // This happens if the file dialog is canceled instead of a file being selected
      if (event.target.files.length === 0) return;

      const reader = new FileReader();
      reader.onload = function() {
        // File importing behavior should use the behavior on the existing and to-be-overwritten save instead of the
        // settings in the to-be-imported save. This is largely because the former is more easily edited by the player,
        // and in contrast with the import-as-string case which allows the player to choose.
        // Note: Do not move this into GameStorage.import, as this would cause the offline progress choice in the text
        // import modal (the only other place GameStorage.import is called) to always be overridden
        GameStorage.offlineEnabled = player.options.offlineProgress;
        GameStorage.offlineTicks = player.options.offlineTicks;
        GameStorage.import(reader.result);
      };
      reader.readAsText(event.target.files[0]);
    },
    openSeedModal() {
      if (this.canModifySeed) {
        Modal.modifySeed.show();
      } else {
        Modal.message.show(`이제 시드를 변경할 수 없습니다. 이번 플레이에서 글리프 난수 생성기가
          이미 한 번 이상 글리프 생성에 사용되었습니다.`);
      }
    }
  }
};
</script>

<template>
  <div class="l-options-tab">
    <div class="l-options-grid">
      <div class="l-options-grid__row">
        <OptionsButton
          class="o-primary-btn--option_font-x-large"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          onclick="GameStorage.export()"
        >
          저장 내보내기
        </OptionsButton>
        <OptionsButton
          class="o-primary-btn--option_font-x-large"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          onclick="Modal.import.show()"
        >
          저장 가져오기
        </OptionsButton>
        <OptionsButton
          class="o-primary-btn--option_font-x-large"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          onclick="Modal.hardReset.show()"
        >
          게임 초기화
        </OptionsButton>
      </div>
      <div class="l-options-grid__row">
        <OptionsButton
          class="o-primary-btn--option_font-x-large"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          onclick="GameStorage.save(false, true)"
        >
          게임 저장
        </OptionsButton>
        <OptionsButton
          class="o-primary-btn--option_font-x-large"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          onclick="Modal.loadGame.show()"
        >
          저장 선택
        </OptionsButton>
        <AutosaveIntervalSlider
          :min="10"
          :max="60"
          :interval="1"
        />
      </div>
      <div class="l-options-grid__row">
        <OptionsButton
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          onclick="GameStorage.exportAsFile()"
        >
          저장을 파일로 내보내기
        </OptionsButton>
        <OptionsButton
          class="c-file-import-button"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
        >
          <input
            class="c-file-import"
            type="file"
            accept=".txt"
            @change="importAsFile"
          >
          <label for="file">파일에서 저장 가져오기</label>
        </OptionsButton>
        <PrimaryToggleButton
          v-model="showTimeSinceSave"
          class="o-primary-btn--option l-options-grid__button"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          label="마지막 저장 이후 시간 표시:"
        />
      </div>
      <div class="l-options-grid__row">
        <OptionsButton
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          onclick="Modal.backupWindows.show()"
        >
          자동 저장 백업 메뉴 열기
        </OptionsButton>
        <SaveFileName />
      </div>
      <div class="l-options-grid__row">
        <OptionsButton
          v-if="canSpeedrun"
          class="o-primary-btn--option_font-x-large"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          onclick="Modal.enterSpeedrun.show()"
        >
          스피드런 시작
        </OptionsButton>
        <OptionsButton
          v-if="inSpeedrun"
          :class="{
            'o-pelle-disabled-pointer': creditsClosed,
            'o-primary-btn--disabled': !canModifySeed
          }"
          @click="openSeedModal()"
        >
          글리프 난수 시드 변경
        </OptionsButton>
      </div>
      <OpenModalHotkeysButton />
    </div>
    <h2
      v-if="cloudAvailable"
      class="c-cloud-options-header"
    >
      <span v-if="hideGoogleName">Google에 로그인됨 <i>(이름 숨김)</i></span>
      <span v-else-if="loggedIn">{{ userName }} 계정으로 로그인됨</span>
      <span v-else>로그인하지 않음</span>
    </h2>
    <div v-if="loggedIn">
      <span v-if="cloudEnabled">10분마다 클라우드에 자동 저장됩니다.</span>
      <span v-else>이 저장에서는 클라우드 저장이 꺼져 있습니다.</span>
    </div>
    <div
      v-if="cloudAvailable"
      class="l-options-grid"
    >
      <div
        v-if="!STEAM"
        class="l-options-grid__row"
      >
        <OptionsButton
          v-if="loggedIn"
          onclick="GameOptions.logout()"
        >
          Google 계정 연결 해제 및 클라우드 저장 끄기
        </OptionsButton>
        <OptionsButton
          v-else
          v-tooltip="'Google 계정을 Antimatter Dimensions 저장 파일에 연결합니다.'"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          onclick="GameOptions.login()"
        >
          Google 로그인으로 클라우드 저장 사용
        </OptionsButton>
        <PrimaryToggleButton
          v-if="loggedIn"
          v-model="hideGoogleName"
          v-tooltip="'개인정보 보호를 위해 UI에서 Google 계정 이름을 숨깁니다. 저장과 불러오기는 그대로 작동합니다.'"
          class="o-primary-btn--option l-options-grid__button"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          label="Google 계정 이름 숨기기:"
        />
      </div>
      <div
        v-if="loggedIn"
        class="l-options-grid__row"
      >
        <OptionsButton
          onclick="GameOptions.cloudSave()"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
        >
          클라우드 저장
        </OptionsButton>
        <OptionsButton
          onclick="GameOptions.cloudLoad()"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
        >
          클라우드 불러오기
        </OptionsButton>
        <PrimaryToggleButton
          v-model="syncSaveIntervals"
          class="o-primary-btn--option l-options-grid__button"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          label="클라우드 저장 전 로컬 저장 강제:"
        />
      </div>
      <div
        v-if="loggedIn"
        class="l-options-grid__row"
      >
        <PrimaryToggleButton
          v-model="cloudEnabled"
          class="o-primary-btn--option l-options-grid__button"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          label="클라우드 자동 저장/불러오기:"
        />
        <PrimaryToggleButton
          v-model="showCloudModal"
          v-tooltip="modalTooltip"
          class="o-primary-btn--option l-options-grid__button"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          label="저장 충돌 가능 시 안내 창 표시:"
        />
        <PrimaryToggleButton
          v-model="forceCloudOverwrite"
          v-tooltip="overwriteTooltip"
          class="o-primary-btn--option l-options-grid__button"
          :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
          label="충돌해도 클라우드 저장 강제:"
        />
      </div>
    </div>
  </div>
</template>
