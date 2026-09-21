import { Effarig } from "./effarig";
import { Enslaved } from "./enslaved";
import { Laitela } from "./laitela/laitela";
import { Pelle } from "./pelle/pelle";
import { Ra } from "./ra/ra";
import { Teresa } from "./teresa";
import { V } from "./V";

export const Celestials = {
  teresa: Teresa,
  effarig: Effarig,
  enslaved: Enslaved,
  v: V,
  ra: Ra,
  laitela: Laitela,
  pelle: Pelle
};

GameDatabase.celestials.descriptions = [
  {
    name: "테레사",
    effects() {
      return `글리프의 시간 정리 생성 효과가 비활성화됩니다.
      무한 포인트와 영원 포인트 획득량이 감소합니다(x^${format(0.55, 2, 2)}).`;
    },
  },
  {
    name: "에파리그",
    effects() {
      return `시간 팽창처럼 모든 차원 배율, 게임 속도, 틱스피드가 크게 감소합니다.
      무한력은 생산량과 게임 속도 페널티를 줄이고, 시간 파편은 틱스피드 페널티를 줄입니다.
      글리프 레벨은 일시적으로 ${formatInt(Effarig.glyphLevelCap)}에서 제한되며 희귀도는 영향을 받지 않습니다.`;
    },
    description() {
      return `에파리그의 현실에서 한 단계를 처음 완료하면 해당 현실에서 나갑니다.`;
    }
  },
  {
    name: "이름 없는 자들",
    effects() {
      return `글리프 레벨이 최소 ${formatInt(5000)}까지 증가합니다.
      무한 차원, 시간 차원, 제8 반물질 차원은 각각 ${formatInt(1)}번만 구매할 수 있습니다.
      반물질 차원 배율에 항상 시간 팽창이 적용됩니다(글리프 효과는 실제 시간 팽창에서만 적용됩니다).
      시간 연구 192(복제자 상한 해제)가 잠깁니다.
      블랙홀이 비활성화됩니다.
      타키온 입자와 팽창된 시간 생산량이 크게 감소합니다.
      팽창 글리프의 시간 정리 생성 효과가 비활성화됩니다.
      일부 도전 목표가 증가합니다.
      저장한 게임 시간이 감소된 효율(지수^${format(0.55, 2, 2)})로 방출됩니다.`;
    }
  },
  {
    name: "V",
    effects() {
      const vEffect = `모든 차원 배율, 영원 포인트 및 무한 포인트 획득량, 초당 팽창된 시간 획득량에\
      제곱근이 적용됩니다.
      복제자 간격은 제곱됩니다.`;
      const vEffectAdditional = `
      지수 글리프 연금술 효과가 비활성화됩니다.`;

      return Ra.unlocks.unlockGlyphAlchemy.canBeApplied
        ? vEffect + vEffectAdditional
        : vEffect;
    }
  },
  {
    name: "라",
    effects() {
      return `차원 가속을 ${formatInt(4)}개만 보유하며 더 얻을 수 없습니다.
      틱스피드 구매 배율이 ${formatX(1.1245, 0, 3)}로 고정됩니다.`;
    },
  },
  {
    name: "라이텔라",
    effects() {
      let disabledDims;
      const highestActive = 8 - Laitela.difficultyTier;
      switch (highestActive) {
        case 0:
          disabledDims = "모든 차원";
          break;
        case 1:
          disabledDims = "제2 이상의 차원";
          break;
        case 2:
          disabledDims = "제3 이상의 차원";
          break;
        case 7:
          disabledDims = "제8 차원";
          break;
        default:
          disabledDims = `제${highestActive + 1} 이상의 차원`;
          break;
      }
      const disabledText = highestActive === 8
        ? ""
        : `${disabledDims}의 생산이 비활성화됩니다.`;

      return `무한 포인트와 영원 포인트 획득량에 시간 팽창이 적용됩니다.
      게임 속도가 ${formatInt(1)}로 감소한 뒤 ${formatInt(10)}분에 걸쳐 점차 회복됩니다.
      블랙홀의 저장, 방출, 파동, 반전이 모두 비활성화됩니다.
      ${disabledText}`;
    },
    description() {
      return `이 현실에서는 반물질이 엔트로피를 생성합니다.\
      엔트로피가 ${formatPercents(1)}에 도달하면 현실이 불안정해지고,\
      ${formatPercents(1)}에 얼마나 빨리 도달했는지에 따라 보상을 받습니다.
      ${formatInt(30)}초 안에 현실을 불안정하게 만들면 난이도가 크게 높아지는 대신,\
      훨씬 강력한 보상을 받습니다.\
      이를 ${formatInt(8)}회 달성하면 암흑 에너지 획득량도 ${formatX(8)} 증가합니다.`;
    }
  },

];
