/**
 * @abstract
 */
export class AutobuyerState {
  constructor(id = null) {
    this._id = id;
  }

  /**
   * @abstract
   */
  get data() { throw new NotImplementedError(); }

  /**
   * @abstract
   */
  get isUnlocked() { throw new NotImplementedError(); }

  get id() { return this._id; }

  get displayName() {
    const ordinalMatch = this.name?.match(/^(\d+)(?:st|nd|rd|th)$/u);
    if (ordinalMatch) return `${ordinalMatch[1]}차`;

    const localizedNames = {
      "Dilated Time Multiplier": "팽창 시간 배율",
      "Tachyon Galaxy Threshold": "타키온 은하 요구량",
      "Tachyon Particle Multiplier": "타키온 입자 배율",
      "Time Theorem": "시간 정리",
      "Infinity Point Multiplier": "무한 포인트 배율",
      "Eternity Point Multiplier": "영원 포인트 배율",
      "Singularity": "특이점",
      "Tickspeed": "틱스피드",
      "Reality": "현실",
      "Replicanti Galaxy": "복제자 은하",
      "Annihilation": "소멸",
      "Dark Matter Dimensions": "암흑 물질 차원",
      "Dimensional Sacrifice": "차원 희생",
      "Eternity": "영원",
      "Replicanti Chance": "복제자 확률",
      "Replicanti Interval": "복제자 간격",
      "Replicanti Max Galaxies": "복제자 최대 은하",
      "Infinity": "무한",
      "Dark Matter Dimension Ascension": "암흑 물질 차원 승천",
      "Dimension Boost": "차원 가속",
    };
    const blackHoleMatch = this.name?.match(/^Black Hole (\d+) Power$/u);
    if (blackHoleMatch) return `블랙홀 ${blackHoleMatch[1]} 위력`;
    return localizedNames[this.name] ?? this.name;
  }

  get canTick() {
    const isDisabled = !player.auto.autobuyersOn || !this.constructor.isActive;
    return this.isActive && !isDisabled && (this.isUnlocked || this.isBought);
  }

  get isActive() {
    return this.data.isActive;
  }

  set isActive(value) {
    this.data.isActive = value;
  }

  get bulk() {
    return 1;
  }

  toggle() {
    this.isActive = !this.isActive;
  }

  /**
   * @abstract
   */
  tick() { throw new NotImplementedError(); }

  // eslint-disable-next-line no-empty-function
  reset() { }

  static get entryCount() { return 1; }

  /**
   * @abstract
   * @returns {string}
   */
  static get autobuyerGroupName() { throw new NotImplementedError(); }
  static get isActive() { return true; }
  /** @abstract */
  static set isActive(value) { throw new NotImplementedError(); }

  static createAccessor() {
    const entryCount = this.entryCount;
    /** @type {object[]} */
    const zeroIndexed = Array.range(1, entryCount).map(id => new this(id));
    const oneIndexed = [null, ...zeroIndexed];
    /** @param {number} id */
    const accessor = id => oneIndexed[id];
    Object.defineProperties(accessor, {
      oneIndexed: { get: () => oneIndexed },
      zeroIndexed: { get: () => zeroIndexed },
      entryCount: { get: () => entryCount },
      anyUnlocked: { get: () => zeroIndexed.some(x => x.isUnlocked) },
      allUnlocked: { get: () => zeroIndexed.every(x => x.isUnlocked) },
      allActive: { get: () => zeroIndexed.every(x => x.isActive) },
      groupName: { get: () => this.autobuyerGroupName },
      isActive: {
        get: () => this.isActive,
        set: value => { this.isActive = value; },
      },
    });
    accessor.toggle = () => this.isActive = !this.isActive;
    return accessor;
  }
}


/**
 * @abstract
 */
export class IntervaledAutobuyerState extends AutobuyerState {
  get interval() {
    return this.data.interval;
  }

  get canTick() {
    return super.canTick && this.timeSinceLastTick >= this.interval;
  }

  get timeSinceLastTick() {
    return player.records.realTimePlayed - this.data.lastTick;
  }

  tick() {
    this.data.lastTick = player.records.realTimePlayed;
  }

  /**
   * @abstract
   */
  get resetTickOn() { return undefined; }

  resetTick(prestigeEvent) {
    if (prestigeEvent >= this.resetTickOn) this.data.lastTick = 0;
  }

  // eslint-disable-next-line no-empty-function
  reset() { }
}


/**
 * @abstract
 */
export class UpgradeableAutobuyerState extends IntervaledAutobuyerState {
  /**
  * @abstract
  */
  get baseInterval() { throw new NotImplementedError(); }

  get cost() {
    return this.data.cost;
  }

  get interval() {
    const interval = this.data.interval;
    return BreakInfinityUpgrade.autobuyerSpeed.isBought ? interval / 2 : interval;
  }

  get hasMaxedInterval() {
    return this.data.interval <= 100;
  }

  upgradeInterval(free) {
    if (this.hasMaxedInterval) return;
    if (!free && !Currency.infinityPoints.purchase(this.cost)) return;
    this.data.cost *= 2;
    this.data.interval = Math.clampMin(this.data.interval * 0.6, 100);
    Achievement(52).tryUnlock();
    Achievement(53).tryUnlock();
    GameUI.update();
  }

  maxIntervalForFree() {
    while (!this.hasMaxedInterval) {
      this.upgradeInterval(true);
    }
  }

  reset() {
    if (EternityMilestone.keepAutobuyers.isReached || PelleUpgrade.keepAutobuyers.canBeApplied) return;
    this.data.interval = this.baseInterval;
    this.data.cost = 1;
  }

  static createAccessor() {
    const accessor = super.createAccessor();
    Object.defineProperty(accessor, "allMaxedInterval", {
      get: () => accessor.zeroIndexed.every(x => x.hasMaxedInterval)
    });
    Object.defineProperty(accessor, "hasInstant", {
      get: () => accessor.zeroIndexed.some(x => x.interval < player.options.updateRate)
    });
    return accessor;
  }
}
