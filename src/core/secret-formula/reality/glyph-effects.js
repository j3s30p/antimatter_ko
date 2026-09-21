import { DC } from "../../constants";

export const GlyphCombiner = Object.freeze({
  /**
   * @param {number[]} x
   * @returns {number}
   */
  add: x => x.reduce(Number.sumReducer, 0),
  /**
   * @param {number[]} x
   * @returns {number}
   */
  multiply: x => x.reduce(Number.prodReducer, 1),
  /**
   * For exponents, the base value is 1, so when we add two exponents a and b we want to get a + b - 1,
   * so that if a and b are both close to 1 so is their sum. In general, when we add a list x of exponents,
   * we have to add 1 - x.length to the actual sum, so that if all the exponents are close to 1 the result
   * is also close to 1 rather than close to x.length.
   * @param {number[]} x
   * @returns {number}
   */
  addExponents: x => x.reduce(Number.sumReducer, 1 - x.length),
  /**
   * @param {Decimal[]} x
   * @returns {Decimal}
   */
  multiplyDecimal: x => x.reduce(Decimal.prodReducer, DC.D1)
});

export const glyphEffects = {
  timepow: {
    id: "timepow",
    bitmaskIndex: 0,
    isGenerated: true,
    glyphTypes: ["time"],
    singleDesc: "시간 차원 지수 +{value}",
    totalDesc: "시간 차원 배율 ^{value}",
    shortDesc: "TD 지수 +{value}",
    effect: (level, strength) => 1.01 + Math.pow(level, 0.32) * Math.pow(strength, 0.45) / 75,
    formatEffect: x => format(x, 3, 3),
    formatSingleEffect: x => format(x - 1, 3, 3),
    combine: GlyphCombiner.addExponents,
    enabledInDoomed: true,
  },
  timespeed: {
    id: "timespeed",
    bitmaskIndex: 1,
    isGenerated: true,
    glyphTypes: ["time"],
    singleDesc: "게임 속도에 {value} 배율 적용",
    totalDesc: "게임이 ×{value} 빠르게 진행",
    genericDesc: "게임 속도 배율",
    shortDesc: "게임 속도 ×{value}",
    effect: (level, strength) => (GlyphAlteration.isEmpowered("time")
      ? 1 + Math.pow(level, 0.35)
      : 1 + Math.pow(level, 0.3) * Math.pow(strength, 0.65) / 20),
    formatEffect: x => format(x, 3, 3),
    combine: GlyphCombiner.multiply,
    alteredColor: () => GlyphAlteration.getEmpowermentColor("time"),
    alterationType: ALTERATION_TYPE.EMPOWER,
    enabledInDoomed: true,
  },
  timeetermult: {
    id: "timeetermult",
    bitmaskIndex: 2,
    isGenerated: true,
    glyphTypes: ["time"],
    singleDesc: "영원 횟수 획득량에 {value} 배율 적용",
    totalDesc: "영원 횟수 획득량 ×{value}",
    genericDesc: "영원 횟수 획득 배율",
    shortDesc: "영원 횟수 ×{value}",
    effect: (level, strength) => Math.pow((strength + 3) * level, 0.9) *
      Math.pow(3, GlyphAlteration.sacrificeBoost("time")),
    formatEffect: x => format(x, 2, 2),
    combine: GlyphCombiner.multiply,
    alteredColor: () => GlyphAlteration.getBoostColor("time"),
    alterationType: ALTERATION_TYPE.BOOST
  },
  timeEP: {
    id: "timeEP",
    bitmaskIndex: 3,
    isGenerated: true,
    glyphTypes: ["time"],
    singleDesc: () => (GlyphAlteration.isAdded("time")
      ? "영원 포인트 획득량 \n×{value} [및 ^]{value2}"
      : "영원 포인트 획득량에 {value} 배율 적용"),
    totalDesc: () => (GlyphAlteration.isAdded("time")
      ? "영원 포인트 획득량 ×{value} 및 ^{value2}"
      : "영원 포인트 획득량 ×{value}"),
    genericDesc: () => (GlyphAlteration.isAdded("time")
      ? "영원 포인트 획득 배율 및 지수"
      : "영원 포인트 획득 배율"),
    shortDesc: () => (GlyphAlteration.isAdded("time")
      ? "EP ×{value} 및 ^{value2}"
      : "EP ×{value}"),
    effect: (level, strength) => Math.pow(level * strength, 3) * 100,
    formatEffect: x => format(x, 2, 3),
    combine: GlyphCombiner.multiply,
    conversion: x => 1 + Math.log10(x) / 1000,
    formatSecondaryEffect: x => format(x, 4, 4),
    alteredColor: () => GlyphAlteration.getAdditionColor("time"),
    alterationType: ALTERATION_TYPE.ADDITION
  },
  dilationDT: {
    id: "dilationDT",
    bitmaskIndex: 4,
    isGenerated: true,
    glyphTypes: ["dilation"],
    singleDesc: "팽창된 시간 획득량에 {value} 배율 적용",
    totalDesc: "팽창된 시간 획득량 ×{value}",
    shortDesc: "DT ×{value}",
    effect: (level, strength) => (GlyphAlteration.isEmpowered("dilation")
      ? DC.D1_005.pow(level).times(15)
      : Decimal.pow(level * strength, 1.5).times(2)),
    formatEffect: x => format(x, 2, 1),
    combine: GlyphCombiner.multiplyDecimal,
    alteredColor: () => GlyphAlteration.getEmpowermentColor("dilation"),
    alterationType: ALTERATION_TYPE.EMPOWER
  },
  dilationgalaxyThreshold: {
    id: "dilationgalaxyThreshold",
    bitmaskIndex: 5,
    isGenerated: true,
    glyphTypes: ["dilation"],
    singleDesc: "타키온 은하 요구량 배율 ×{value}",
    genericDesc: "타키온 은하 가격 배율",
    shortDesc: "타키온 은하 요구량 ×{value}",
    effect: (level, strength) => 1 - Math.pow(level, 0.17) * Math.pow(strength, 0.35) / 100 -
      GlyphAlteration.sacrificeBoost("dilation") / 50,
    formatEffect: x => format(x, 3, 3),
    alteredColor: () => GlyphAlteration.getBoostColor("dilation"),
    alterationType: ALTERATION_TYPE.BOOST,
    combine: effects => {
      const prod = effects.reduce(Number.prodReducer, 1);
      return prod < 0.4
        ? { value: 0.4 - Math.pow(0.4 - prod, 1.7), capped: true }
        : { value: prod, capped: false };
    },
    enabledInDoomed: true,
  },
  dilationTTgen: {
    // TTgen slowly generates TT, value amount is per second, displayed per hour
    id: "dilationTTgen",
    bitmaskIndex: 6,
    isGenerated: true,
    glyphTypes: ["dilation"],
    singleDesc: () => (GlyphAlteration.isAdded("dilation")
      ? "시간당 시간 정리 {value}개 생산 \n[및 시간 정리 \n생산량에] {value2} 배율 적용"
      : "시간당 시간 정리 {value}개 생산"),
    totalDesc: () => (GlyphAlteration.isAdded("dilation")
      ? "시간당 시간 정리 {value}개 생산 및 시간 정리 생산량 ×{value2}"
      : "시간당 시간 정리 {value}개 생산"),
    genericDesc: () => (GlyphAlteration.isAdded("dilation")
      ? "시간 정리 생산 및 배율"
      : "시간 정리 생산"),
    shortDesc: () => (GlyphAlteration.isAdded("dilation")
      ? "시간당 TT {value}개 및 TTgen ×{value2}"
      : "시간당 TT {value}개"),
    effect: (level, strength) => Math.pow(level * strength, 0.5) / 10000,
    /** @type {function(number): string} */
    formatEffect: x => format(3600 * x, 2, 2),
    combine: GlyphCombiner.add,
    conversion: x => Math.clampMin(Math.pow(10000 * x, 1.6), 1),
    formatSecondaryEffect: x => format(x, 2, 2),
    alteredColor: () => GlyphAlteration.getAdditionColor("dilation"),
    alterationType: ALTERATION_TYPE.ADDITION
  },
  dilationpow: {
    id: "dilationpow",
    bitmaskIndex: 7,
    isGenerated: true,
    glyphTypes: ["dilation"],
    singleDesc: "시간 팽창 중 반물질 차원 지수 +{value}",
    totalDesc: "시간 팽창 중 반물질 차원 배율 ^{value}",
    genericDesc: "시간 팽창 중 반물질 차원 ^x",
    shortDesc: "팽창 중 AD 지수 +{value}",
    effect: (level, strength) => 1.1 + Math.pow(level, 0.7) * Math.pow(strength, 0.7) / 25,
    formatEffect: x => format(x, 2, 2),
    formatSingleEffect: x => format(x - 1, 2, 2),
    combine: GlyphCombiner.addExponents,
    enabledInDoomed: true,
  },
  replicationspeed: {
    id: "replicationspeed",
    bitmaskIndex: 8,
    isGenerated: true,
    glyphTypes: ["replication"],
    singleDesc: "복제 속도에 {value} 배율 적용",
    totalDesc: "복제 속도 ×{value}",
    genericDesc: "복제 속도 배율",
    shortDesc: "복제 속도 ×{value}",
    effect: (level, strength) => (GlyphAlteration.isEmpowered("replication")
      ? DC.D1_007.pow(level).times(10)
      : Decimal.times(level, strength).times(3)),
    formatEffect: x => format(x, 2, 1),
    combine: GlyphCombiner.multiplyDecimal,
    alteredColor: () => GlyphAlteration.getEmpowermentColor("replication"),
    alterationType: ALTERATION_TYPE.EMPOWER
  },
  replicationpow: {
    id: "replicationpow",
    bitmaskIndex: 9,
    isGenerated: true,
    glyphTypes: ["replication"],
    singleDesc: "복제자 배율 지수 +{value}",
    totalDesc: "복제자 배율 ^{value}",
    shortDesc: "복제자 배율 지수 +{value}",
    effect: (level, strength) => 1.1 + Math.pow(level, 0.5) * strength / 25 +
      GlyphAlteration.sacrificeBoost("replication") * 3,
    formatEffect: x => format(x, 2, 2),
    formatSingleEffect: x => format(x - 1, 2, 2),
    combine: GlyphCombiner.addExponents,
    alteredColor: () => GlyphAlteration.getBoostColor("replication"),
    alterationType: ALTERATION_TYPE.BOOST,
    enabledInDoomed: true,
  },
  replicationdtgain: {
    id: "replicationdtgain",
    bitmaskIndex: 10,
    isGenerated: true,
    glyphTypes: ["replication"],
    singleDesc: () => (GlyphAlteration.isAdded("replication")
      ? `복제자 ${format(DC.E10000)}개마다 팽창된 시간 \n[및 복제자 속도] 배율 \n+{value}`
      : `복제자 ${format(DC.E10000)}개마다 팽창된 시간 \n획득 배율 +{value}`),
    totalDesc: () => (GlyphAlteration.isAdded("replication")
      ? `복제자 ${format(DC.E10000)}개마다 팽창된 시간 및 복제 속도 배율 +{value}`
      : `복제자 ${format(DC.E10000)}개마다 팽창된 시간 획득 배율 +{value}`),
    genericDesc: () => (GlyphAlteration.isAdded("replication")
      ? "복제자에 따른 팽창된 시간 및 복제자 배율"
      : "복제자에 따른 팽창된 시간 획득 배율"),
    shortDesc: () => (GlyphAlteration.isAdded("replication")
      ? `복제자 ${format(DC.E10000)}개마다 DT 및 복제 속도 +{value}`
      : `복제자 ${format(DC.E10000)}개마다 DT +{value}`),
    effect: (level, strength) => 0.0003 * Math.pow(level, 0.3) * Math.pow(strength, 0.65),
    formatEffect: x => format(10000 * x, 2, 2),
    formatSingleEffect: x => format(10000 * x, 2, 2),
    // It's bad to stack this one additively (N glyphs acts as a DT mult of N) or multiplicatively (the raw number is
    // less than 1), so instead we do a multiplicative stacking relative to the "base" effect of a level 1, 0% glyph.
    // We also introduce a 3x mult per glyph after the first, so that stacking level 1, 0% glyphs still has an effect.
    // This is still just a flat DT mult when stacking multiple glyphs, but at least it's bigger than 2 or 3.
    combine: effects => ({
      value: effects.length === 0 ? 0 : effects.reduce(Number.prodReducer, Math.pow(0.0001, 1 - effects.length)),
      capped: false
    }),
    conversion: x => x,
    formatSecondaryEffect: x => format(x, 2, 3),
    formatSingleSecondaryEffect: x => format(x, 5, 5),
    alteredColor: () => GlyphAlteration.getAdditionColor("replication"),
    alterationType: ALTERATION_TYPE.ADDITION,
  },
  replicationglyphlevel: {
    id: "replicationglyphlevel",
    bitmaskIndex: 11,
    isGenerated: true,
    glyphTypes: ["replication"],
    singleDesc: () => `글리프 레벨의 복제자 요소:\n ^${format(0.4, 1, 1)}
      ➜ ^(${format(0.4, 1, 1)} + {value})`,
    totalDesc: () => `글리프 레벨의 복제자 요소: ^${format(0.4, 1, 1)}
      ➜ ^(${format(0.4, 1, 1)} + {value})`,
    genericDesc: "글리프 레벨의 복제자 요소",
    shortDesc: "레벨의 복제자 지수 +{value}",
    effect: (level, strength) => Math.pow(Math.pow(level, 0.25) * Math.pow(strength, 0.4), 0.5) / 50,
    formatEffect: x => format(x, 3, 3),
    combine: effects => {
      let sum = effects.reduce(Number.sumReducer, 0);
      if (effects.length > 2) sum *= 6 / (effects.length + 4);
      return sum > 0.1
        ? { value: 0.1 + 0.2 * (sum - 0.1), capped: true }
        : { value: sum, capped: effects.length > 2 };
    },
    enabledInDoomed: true,
  },
  infinitypow: {
    id: "infinitypow",
    bitmaskIndex: 12,
    isGenerated: true,
    glyphTypes: ["infinity"],
    singleDesc: "무한 차원 지수 +{value}",
    totalDesc: "무한 차원 배율 ^{value}",
    shortDesc: "ID 지수 +{value}",
    effect: (level, strength) => 1.007 + Math.pow(level, 0.21) * Math.pow(strength, 0.4) / 75 +
      GlyphAlteration.sacrificeBoost("infinity") / 50,
    formatEffect: x => format(x, 3, 3),
    formatSingleEffect: x => format(x - 1, 3, 3),
    combine: GlyphCombiner.addExponents,
    alteredColor: () => GlyphAlteration.getBoostColor("infinity"),
    alterationType: ALTERATION_TYPE.BOOST,
    enabledInDoomed: true,
  },
  infinityrate: {
    id: "infinityrate",
    bitmaskIndex: 13,
    isGenerated: true,
    glyphTypes: ["infinity"],
    singleDesc: () => `무한력 변환 비율: \n^${formatInt(7)}
      ➜ ^(${formatInt(7)} + {value})`,
    totalDesc: () => `무한력 변환 비율: ^${formatInt(7)}
      ➜ ^(${formatInt(7)} + {value})`,
    genericDesc: "무한력 변환 비율",
    shortDesc: "무한력 변환 +{value}",
    effect: (level, strength) => Math.pow(level, 0.2) * Math.pow(strength, 0.4) * 0.04,
    formatEffect: x => format(x, 2, 2),
    combine: GlyphCombiner.add,
    enabledInDoomed: true,
  },
  infinityIP: {
    id: "infinityIP",
    bitmaskIndex: 14,
    isGenerated: true,
    glyphTypes: ["infinity"],
    singleDesc: () => (GlyphAlteration.isAdded("infinity")
      ? "무한 포인트 획득량 \n×{value} [및 ^]{value2}"
      : "무한 포인트 획득량에 {value} 배율 적용"),
    totalDesc: () => (GlyphAlteration.isAdded("infinity")
      ? "무한 포인트 획득량 ×{value} 및 ^{value2}"
      : "무한 포인트 획득량 ×{value}"),
    genericDesc: () => (GlyphAlteration.isAdded("infinity")
      ? "무한 포인트 획득 배율 및 지수"
      : "무한 포인트 획득 배율"),
    shortDesc: () => (GlyphAlteration.isAdded("infinity")
      ? "IP ×{value} 및 ^{value2}"
      : "IP ×{value}"),
    effect: (level, strength) => Math.pow(level * (strength + 1), 6) * 10000,
    formatEffect: x => format(x, 2, 3),
    combine: GlyphCombiner.multiply,
    // eslint-disable-next-line no-negated-condition
    softcap: value => ((Effarig.eternityCap !== undefined) ? Math.min(value, Effarig.eternityCap.toNumber()) : value),
    conversion: x => 1 + Math.log10(x) / 1800,
    formatSecondaryEffect: x => format(x, 4, 4),
    alteredColor: () => GlyphAlteration.getAdditionColor("infinity"),
    alterationType: ALTERATION_TYPE.ADDITION
  },
  infinityinfmult: {
    id: "infinityinfmult",
    bitmaskIndex: 15,
    isGenerated: true,
    glyphTypes: ["infinity"],
    singleDesc: "무한 횟수 획득량에 {value} 배율 적용",
    totalDesc: "무한 횟수 획득량 ×{value}",
    genericDesc: "무한 횟수 획득 배율",
    shortDesc: "무한 횟수 ×{value}",
    effect: (level, strength) => (GlyphAlteration.isEmpowered("infinity")
      ? DC.D1_02.pow(level)
      : Decimal.pow(level * strength, 1.5).times(2)),
    formatEffect: x => format(x, 2, 1),
    combine: GlyphCombiner.multiplyDecimal,
    alteredColor: () => GlyphAlteration.getEmpowermentColor("infinity"),
    alterationType: ALTERATION_TYPE.EMPOWER
  },
  powerpow: {
    id: "powerpow",
    bitmaskIndex: 16,
    isGenerated: true,
    glyphTypes: ["power"],
    singleDesc: () => (GlyphAlteration.isAdded("power")
      ? "반물질 차원 지수 +{value}\n[및 반물질 은하 가격 ×]{value2}"
      : "반물질 차원 지수 +{value}"),
    totalDesc: () => (GlyphAlteration.isAdded("power")
      ? "반물질 차원 배율 ^{value} 및 반물질 은하 가격 ×{value2}"
      : "반물질 차원 배율 ^{value}"),
    genericDesc: () => (GlyphAlteration.isAdded("power")
      ? "반물질 차원 배율 ^x 및 반물질 은하 가격 배율"
      : "반물질 차원 배율 ^x"),
    shortDesc: () => (GlyphAlteration.isAdded("power")
      ? "AD 지수 +{value} 및 AG 가격 ×{value2}"
      : "AD 지수 +{value}"),
    effect: (level, strength) => 1.015 + Math.pow(level, 0.2) * Math.pow(strength, 0.4) / 75,
    formatEffect: x => format(x, 3, 3),
    formatSingleEffect: x => format(x - 1, 3, 3),
    combine: GlyphCombiner.addExponents,
    conversion: x => 2 / (x + 1),
    formatSecondaryEffect: x => format(x, 3, 3),
    alteredColor: () => GlyphAlteration.getAdditionColor("power"),
    alterationType: ALTERATION_TYPE.ADDITION,
    enabledInDoomed: true,
  },
  powermult: {
    id: "powermult",
    bitmaskIndex: 17,
    isGenerated: true,
    glyphTypes: ["power"],
    singleDesc: "반물질 차원 배율 ×{value}",
    shortDesc: "AD ×{value}",
    effect: (level, strength) => (GlyphAlteration.isEmpowered("power")
      ? DC.D11111.pow(level * 220)
      : Decimal.pow(level * strength * 10, level * strength * 10)),
    formatEffect: x => formatPostBreak(x, 2, 0),
    combine: GlyphCombiner.multiplyDecimal,
    alteredColor: () => GlyphAlteration.getEmpowermentColor("power"),
    alterationType: ALTERATION_TYPE.EMPOWER,
    enabledInDoomed: true,
  },
  powerdimboost: {
    id: "powerdimboost",
    bitmaskIndex: 18,
    isGenerated: true,
    glyphTypes: ["power"],
    singleDesc: "차원 가속 배율 ×{value}",
    genericDesc: "차원 가속 배율",
    shortDesc: "차원 가속 배율 ×{value}",
    effect: (level, strength) => Math.pow(level * strength, 0.5) *
      Math.pow(1 + GlyphAlteration.sacrificeBoost("power"), 3),
    formatEffect: x => format(x, 2, 2),
    combine: GlyphCombiner.multiply,
    alteredColor: () => GlyphAlteration.getBoostColor("power"),
    alterationType: ALTERATION_TYPE.BOOST,
    enabledInDoomed: true,
  },
  powerbuy10: {
    id: "powerbuy10",
    bitmaskIndex: 19,
    isGenerated: true,
    glyphTypes: ["power"],
    singleDesc: () => `반물질 차원 ${formatInt(10)}개 구매 보너스를 {value}만큼 증가`,
    totalDesc: () => `"${formatInt(10)}개 구매" 배율 ×{value}`,
    genericDesc: () => `"${formatInt(10)}개 구매" 보너스 증가`,
    shortDesc: () => `AD "${formatInt(10)}개 구매" 배율 ×{value}`,
    effect: (level, strength) => 1 + level * strength / 12,
    formatEffect: x => format(x, 2, 2),
    combine: GlyphCombiner.addExponents,
    enabledInDoomed: true,
  },
  effarigrm: {
    id: "effarigrm",
    bitmaskIndex: 20,
    isGenerated: true,
    glyphTypes: ["effarig"],
    singleDesc: "리얼리티 머신 배율 ×{value}",
    genericDesc: "리얼리티 머신 배율",
    shortDesc: "RM ×{value}",
    effect: (level, strength) => (GlyphAlteration.isEmpowered("effarig")
      ? Math.pow(level, 1.5)
      : Math.pow(level, 0.6) * strength),
    formatEffect: x => format(x, 2, 2),
    combine: GlyphCombiner.multiply,
    alteredColor: () => GlyphAlteration.getEmpowermentColor("effarig"),
    alterationType: ALTERATION_TYPE.EMPOWER
  },
  effarigglyph: {
    id: "effarigglyph",
    bitmaskIndex: 21,
    isGenerated: true,
    glyphTypes: ["effarig"],
    singleDesc: "글리프 불안정 시작 레벨 +{value}",
    genericDesc: "글리프 불안정 지연",
    shortDesc: "불안정 지연 +{value}",
    effect: (level, strength) => Math.floor(10 * Math.pow(level * strength, 0.5)),
    formatEffect: x => formatInt(x),
    combine: GlyphCombiner.add,
  },
  effarigblackhole: {
    id: "effarigblackhole",
    bitmaskIndex: 22,
    isGenerated: true,
    glyphTypes: ["effarig"],
    singleDesc: "게임 속도 지수 +{value}",
    totalDesc: "게임 속도 ^{value}",
    genericDesc: "게임 속도 ^x",
    shortDesc: "게임 속도 지수 +{value}",
    effect: (level, strength) => 1 + Math.pow(level, 0.25) * Math.pow(strength, 0.4) / 75,
    formatEffect: x => format(x, 3, 3),
    formatSingleEffect: x => format(x - 1, 3, 3),
    combine: GlyphCombiner.addExponents,
  },
  effarigachievement: {
    id: "effarigachievement",
    bitmaskIndex: 23,
    isGenerated: true,
    glyphTypes: ["effarig"],
    singleDesc: "도전과제 배율 지수 +{value}",
    totalDesc: "도전과제 배율 ^{value}",
    genericDesc: "도전과제 배율 ^x",
    shortDesc: "도전과제 배율 지수 +{value}",
    effect: (level, strength) => 1 + Math.pow(level, 0.4) * Math.pow(strength, 0.6) / 60 +
      GlyphAlteration.sacrificeBoost("effarig") / 10,
    formatEffect: x => format(x, 3, 3),
    formatSingleEffect: x => format(x - 1, 3, 3),
    combine: GlyphCombiner.addExponents,
    alteredColor: () => GlyphAlteration.getBoostColor("effarig"),
    alterationType: ALTERATION_TYPE.BOOST
  },
  effarigforgotten: {
    id: "effarigforgotten",
    bitmaskIndex: 24,
    isGenerated: true,
    glyphTypes: ["effarig"],
    singleDesc: () => (GlyphAlteration.isAdded("effarig")
      ? `"${formatInt(10)}개 구매" 배율 ^{value} [및\n차원 가속 배율 ^]{value2}`
      : `차원 ${formatInt(10)}개 구매 보너스 ^{value}`),
    totalDesc: () => (GlyphAlteration.isAdded("effarig")
      ? `"${formatInt(10)}개 구매" 배율 ^{value} 및 차원 가속 배율 ^{value2}`
      : `"${formatInt(10)}개 구매" 배율 ^{value}`),
    genericDesc: () => (GlyphAlteration.isAdded("effarig")
      ? `"${formatInt(10)}개 구매" 및 차원 가속 배율 ^x`
      : `"${formatInt(10)}개 구매" 배율 ^x`),
    shortDesc: () => (GlyphAlteration.isAdded("effarig")
      ? `${formatInt(10)}개 구매 배율 ^{value}, 차원 가속 배율 ^{value2}`
      : `${formatInt(10)}개 구매 배율 ^{value}`),
    effect: (level, strength) => 1 + 2 * Math.pow(level, 0.25) * Math.pow(strength, 0.4),
    formatEffect: x => format(x, 2, 2),
    combine: GlyphCombiner.multiply,
    conversion: x => Math.pow(x, 0.4),
    formatSecondaryEffect: x => format(x, 2, 2),
    alteredColor: () => GlyphAlteration.getAdditionColor("effarig"),
    alterationType: ALTERATION_TYPE.ADDITION
  },
  effarigdimensions: {
    id: "effarigdimensions",
    bitmaskIndex: 25,
    isGenerated: true,
    glyphTypes: ["effarig"],
    singleDesc: "모든 차원 지수 +{value}",
    totalDesc: "모든 차원 배율 ^{value}",
    genericDesc: "모든 차원 배율 ^x",
    shortDesc: "모든 차원 지수 +{value}",
    effect: (level, strength) => 1 + Math.pow(level, 0.25) * Math.pow(strength, 0.4) / 500,
    formatEffect: x => format(x, 3, 3),
    formatSingleEffect: x => format(x - 1, 3, 3),
    combine: GlyphCombiner.addExponents,
  },
  effarigantimatter: {
    id: "effarigantimatter",
    bitmaskIndex: 26,
    isGenerated: true,
    glyphTypes: ["effarig"],
    singleDesc: () => `반물질 생산:\n${formatInt(10)}^x ➜ ${formatInt(10)}^(x^{value})`,
    genericDesc: "반물질 생산 지수의 지수",
    shortDesc: "AM 생산 지수 ^{value}",
    effect: (level, strength) => 1 + Math.pow(level, 0.25) * Math.pow(strength, 0.4) / 5000,
    formatEffect: x => format(x, 4, 4),
    combine: GlyphCombiner.multiply,
  },
  timeshardpow: {
    id: "timeshardpow",
    bitmaskIndex: 27,
    isGenerated: true,
    // This gets explicitly added to time glyphs elsewhere (once unlocked)
    glyphTypes: [],
    singleDesc: "시간 조각 지수 +{value}",
    totalDesc: "시간 조각 획득량 ^{value}",
    genericDesc: "시간 조각 ^x",
    shortDesc: "시간 조각 지수 +{value}",
    effect: (level, strength) => 1 + (strength / 3.5) * Math.pow(level, 0.35) / 400,
    formatEffect: x => format(x, 3, 3),
    formatSingleEffect: x => format(x - 1, 3, 3),
    combine: GlyphCombiner.addExponents,
    enabledInDoomed: true,
  },
  cursedgalaxies: {
    id: "cursedgalaxies",
    bitmaskIndex: 0,
    isGenerated: false,
    glyphTypes: ["cursed"],
    singleDesc: `모든 은하가 {value} 약해짐`,
    totalDesc: "모든 은하의 성능 -{value}",
    shortDesc: "은하 성능 -{value}",
    // Multiplies by 0.768 per glyph
    effect: level => Math.pow(level, -0.03),
    formatEffect: x => formatPercents(1 - x, 2),
    combine: GlyphCombiner.multiply,
  },
  curseddimensions: {
    id: "curseddimensions",
    bitmaskIndex: 1,
    isGenerated: false,
    glyphTypes: ["cursed"],
    singleDesc: "모든 차원 배율 ^{value}",
    shortDesc: "모든 차원 ^{value}",
    // Multiplies by 0.734 per glyph
    effect: level => Math.pow(level, -0.035),
    formatEffect: x => format(x, 3, 3),
    combine: GlyphCombiner.multiply,
  },
  cursedtickspeed: {
    id: "cursedtickspeed",
    bitmaskIndex: 2,
    isGenerated: false,
    glyphTypes: ["cursed"],
    singleDesc: "시간 차원의 틱스피드 업그레이드 요구량에 ×{value} 배율 적용",
    totalDesc: "시간 차원의 틱스피드 업그레이드 요구량이 ×{value} 증가",
    shortDesc: "TD 틱스피드 요구량 ×{value}",
    // Additive 3.82 per glyph
    effect: level => Math.clampMin(Math.log10(level), 1),
    formatEffect: x => format(x, 3, 3),
    combine: GlyphCombiner.add,
  },
  cursedEP: {
    id: "cursedEP",
    bitmaskIndex: 3,
    isGenerated: false,
    glyphTypes: ["cursed"],
    singleDesc: "영원 포인트 획득량을 {value}로 나눔",
    totalDesc: "영원 포인트 획득량 / {value}",
    shortDesc: "EP / {value}",
    // Divides e666.6 per glyph
    effect: level => Decimal.pow10(-level / 10),
    formatEffect: x => format(x.reciprocal()),
    combine: GlyphCombiner.multiplyDecimal,
  },
  realityglyphlevel: {
    id: "realityglyphlevel",
    bitmaskIndex: 4,
    isGenerated: false,
    glyphTypes: ["reality"],
    singleDesc: "장착한 기본 글리프의 유효 레벨을 {value}만큼 증가",
    totalDesc: "장착한 기본 글리프 레벨 +{value}",
    shortDesc: "기본 글리프 레벨 +{value}",
    effect: level => Math.floor(Math.sqrt(level * 90)),
    formatEffect: x => formatInt(x),
    combine: GlyphCombiner.add,
  },
  realitygalaxies: {
    id: "realitygalaxies",
    bitmaskIndex: 5,
    isGenerated: false,
    glyphTypes: ["reality"],
    singleDesc: "모든 은하가 {value} 강해짐",
    totalDesc: "모든 은하의 성능 +{value}",
    shortDesc: "은하 성능 +{value}",
    effect: level => 1 + Math.pow(level / 100000, 0.5),
    formatEffect: x => formatPercents(x - 1, 2),
    combine: GlyphCombiner.multiply,
  },
  realityrow1pow: {
    id: "realityrow1pow",
    bitmaskIndex: 6,
    isGenerated: false,
    glyphTypes: ["reality"],
    singleDesc: "현실 업그레이드 증폭기의 배율 ^{value}",
    totalDesc: "현실 업그레이드 증폭기 배율 ^{value}",
    shortDesc: "증폭기 배율 ^{value}",
    effect: level => 1 + level / 125000,
    formatEffect: x => format(x, 3, 3),
    combine: GlyphCombiner.addExponents,
  },
  realityDTglyph: {
    id: "realityDTglyph",
    bitmaskIndex: 7,
    isGenerated: false,
    glyphTypes: ["reality"],
    singleDesc: () => `글리프 레벨의 팽창된 시간 요소: \n^${format(1.3, 1, 1)}
      ➜ ^(${format(1.3, 1, 1)} + {value})`,
    totalDesc: () => `글리프 레벨의 팽창된 시간 요소: ^${format(1.3, 1, 1)}
      ➜ ^(${format(1.3, 1, 1)} + {value})`,
    genericDesc: "글리프 레벨의 팽창된 시간 요소",
    shortDesc: "레벨의 DT 지수 +{value}",
    // You can only get this effect on level 25000 reality glyphs anyway, might as well make it look nice
    effect: () => 0.1,
    formatEffect: x => format(x, 2, 2),
    combine: GlyphCombiner.add,
  },
  companiondescription: {
    id: "companiondescription",
    bitmaskIndex: 8,
    isGenerated: false,
    glyphTypes: ["companion"],
    singleDesc: "아무것도 하지 않고 그저 앉아서 귀엽게 미소 지으며, 꿈속에서 정중히 속삭이고, " +
      "당신을 가로막는 모두의 몰락을 꾀합니다. 이 세상에 하나뿐인 글리프는 절대 당신을 떠나지 않습니다.",
    totalDesc: "행복 +{value}",
    shortDesc: "당신을 해치고 싶어 하지 않음",
    effect: () => {
      if (Enslaved.isRunning) return 0;
      const cursedCount = Glyphs.active.countWhere(g => g?.type === "cursed");
      if (cursedCount > 0) return Math.pow(0.2 + 0.2 * Math.random(), cursedCount);
      return 0.4 + 0.6 * Math.random();
    },
    formatEffect: x => formatPercents(x, 2, 2),
    combine: GlyphCombiner.add,
    enabledInDoomed: true,
  },
  companionEP: {
    id: "companionEP",
    bitmaskIndex: 9,
    isGenerated: false,
    glyphTypes: ["companion"],
    singleDesc: "게임에 헌신해 주셔서 감사합니다! 첫 현실에서 영원 포인트 {value}개에 도달했습니다.",
    shortDesc: "당신을 정말, 정말 사랑함",
    totalDesc: () => ((Enslaved.isRunning || Glyphs.active.countWhere(g => g?.type === "cursed")) ? "도와줘" : "신난다!"),
    // The EP value for this is entirely encoded in rarity, but level needs to be present to
    // make sure the proper parameter is being used. The actual glyph level shouldn't do anything.
    // eslint-disable-next-line no-unused-vars
    effect: (level, strength) => Decimal.pow10(1e6 * strengthToRarity(strength)),
    formatEffect: x => formatPostBreak(x, 2),
    combine: GlyphCombiner.multiplyDecimal,
    enabledInDoomed: true,
  }
};
