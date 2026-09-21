import { DC } from "../../constants";

export const effarigUnlocks = {
  adjuster: {
    id: 0,
    description: "글리프 레벨 요인의 가중치 조절",
    cost: 1e7,
    onPurchased: () => {
      Effarig.quotes.unlockWeights.show();
      ui.view.tabs.reality.openGlyphWeights = true;
      Tab.reality.glyphs.show();
    }
  },
  glyphFilter: {
    id: 1,
    description: "글리프 필터링",
    cost: 2e8,
    onPurchased: () => {
      Effarig.quotes.unlockGlyphFilter.show();
      player.reality.showSidebarPanel = GLYPH_SIDEBAR_MODE.FILTER_SETTINGS;
    }
  },
  setSaves: {
    id: 2,
    description: "글리프 프리셋",
    cost: 3e9,
    onPurchased: () => {
      Effarig.quotes.unlockSetSaves.show();
      player.reality.showSidebarPanel = GLYPH_SIDEBAR_MODE.SAVED_SETS;
    }
  },
  run: {
    id: 3,
    description: "Effarig의 현실",
    cost: 5e11,
    onPurchased: () => {
      Effarig.quotes.unlockRun.show();
    }
  },
  infinity: {
    id: 4,
    label: "무한",
    get description() {
      return ` 무한 횟수에 따라 복제자 상한에 배율이 적용됩니다
        무한 횟수가 최대 복제자 은하를 증가시킵니다
        Effarig의 현실에서는 기본 무한 포인트 획득량이 ${format(DC.E200)}에서 상한에 도달합니다
        Effarig의 현실에서는 각 종류의 무한 포인트 배율이 ${format(DC.E50)}에서 상한에 도달합니다`;
    },
  },
  eternity: {
    id: 5,
    label: "영원",
    get description() {
      return ` 영원 횟수가 무한 횟수를 생성합니다
        Effarig의 현실에서 무한 포인트가 더 이상 어떤 방식으로도 제한되지 않습니다
        The Nameless Ones를 해금했습니다`;
    },
  },
  reality: {
    id: 6,
    label: "현실",
    get description() {
      return " Effarig 글리프를 해금했습니다(최대 하나만 장착할 수 있고 일부 효과는 서로 동시에 적용되지 않습니다)";
    },
  }
};
