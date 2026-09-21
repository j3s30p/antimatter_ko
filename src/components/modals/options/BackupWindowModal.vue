<script>
import BackupEntry from "@/components/modals/options/BackupEntry";
import ModalWrapper from "@/components/modals/ModalWrapper";
import PrimaryButton from "@/components/PrimaryButton";

import { AutoBackupSlots } from "@/core/storage";
import { STEAM } from "@/env";

export default {
  name: "BackupWindowModal",
  components: {
    ModalWrapper,
    BackupEntry,
    PrimaryButton
  },
  data() {
    return {
      // Used to force a key-swap whenever a save happens, to make unused slots immediately update
      nextSave: 0,
      ignoreOffline: false,
    };
  },
  computed: {
    backupSlots: () => AutoBackupSlots,
    deleteText: () => (STEAM ? "게임을 완전히 제거하는 작업" : "브라우저 쿠키를 지우는 작업"),
  },
  watch: {
    ignoreOffline(newValue) {
      player.options.loadBackupWithoutOffline = newValue;
    },
  },
  methods: {
    update() {
      this.nextSave = Object.values(GameStorage.lastBackupTimes).map(t => t && t.backupTimer).sum();
      this.ignoreOffline = player.options.loadBackupWithoutOffline;
    },
    offlineOptionClass() {
      return {
        "c-modal__confirmation-toggle__checkbox": true,
        "c-modal__confirmation-toggle__checkbox--active": this.ignoreOffline
      };
    },
    toggleOffline() {
      this.ignoreOffline = !this.ignoreOffline;
    },
    importAsFile(event) {
      // This happens if the file dialog is canceled instead of a file being selected
      if (event.target.files.length === 0) return;

      const reader = new FileReader();
      reader.onload = function() {
        GameStorage.importBackupsFromFile(reader.result);
      };
      reader.readAsText(event.target.files[0]);
    },
  }
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      자동 백업 저장
    </template>
    <div class="c-info c-modal--short">
      게임은 온라인 또는 오프라인에서 보낸 시간을 기준으로 자동 백업을 만듭니다.
      온라인 백업 타이머는 게임이 열려 있을 때만 흐르며, 오프라인 백업은 조건에 맞는 타이머가
      가장 긴 슬롯에만 저장됩니다. 또한 이곳의 백업을 불러오면 현재 저장이 마지막 슬롯에 보관됩니다.
      <div
        class="c-modal__confirmation-toggle"
        @click="toggleOffline"
      >
        <div :class="offlineOptionClass()">
          <span
            v-if="ignoreOffline"
            class="fas fa-check"
          />
        </div>
        <span class="c-modal__confirmation-toggle__text">
          오프라인 진행을 끄고 불러오기
        </span>
      </div>
      <div class="c-entry-container">
        <BackupEntry
          v-for="slot in backupSlots"
          :key="nextSave + slot.id"
          class="l-backup-entry"
          :slot-data="slot"
        />
      </div>
      백업도 게임 저장과 같은 위치에 보관되므로 {{ deleteText }}처럼 저장 자체를 삭제하는 외부 작업을 하면
      함께 사라질 수 있습니다. 아래 버튼으로 모든 백업을 한 번에 파일로 가져오거나 내보낼 수 있습니다.
      <div class="c-backup-file-ops">
        <PrimaryButton
          class="o-btn-file-ops"
          onclick="GameStorage.exportBackupsAsFile()"
        >
          파일로 내보내기
        </PrimaryButton>
        <PrimaryButton class="o-btn-file-ops">
          <input
            class="c-file-import"
            type="file"
            accept=".txt"
            @change="importAsFile"
          >
          <label for="file">파일에서 가져오기</label>
        </PrimaryButton>
      </div>
      세 저장 슬롯은 각각 별도의 백업 묶음을 가집니다.
    </div>
  </ModalWrapper>
</template>

<style scoped>
.c-info {
  width: 60rem;
  overflow-x: hidden;
  padding-right: 1rem;
}

.c-info::-webkit-scrollbar {
  width: 1rem;
}

.c-info::-webkit-scrollbar-thumb {
  border: none;
}

.s-base--metro .c-info::-webkit-scrollbar-thumb {
  border-radius: 0;
}

.c-backup-file-ops {
  margin: 0.5rem;
}

.o-btn-file-ops {
  margin: 0 0.5rem;
}

.c-entry-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.l-backup-entry {
  width: calc(50% - 0.6rem);
  height: calc(25% - 0.6rem);
}
</style>
