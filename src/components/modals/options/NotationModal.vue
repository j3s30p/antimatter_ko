<script>
import * as ADNotations from "@antimatter-dimensions/notations";

import ModalWrapper from "@/components/modals/ModalWrapper";
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "NotationModal",
  components: {
    ModalWrapper,
    SliderComponent
  },
  data() {
    return {
      commaDigits: 0,
      notationDigits: 0,
    };
  },
  computed: {
    sampleNums() {
      const largestExponent = "123456789012345";
      const numbers = [];
      for (let digits = 4; digits < 16; digits++) numbers.push(Decimal.pow10(largestExponent.substring(0, digits)));
      return numbers;
    },
    sliderProps() {
      return {
        min: 3,
        max: 15,
        interval: 1,
        width: "100%",
        tooltip: false
      };
    },
  },
  watch: {
    commaDigits(newValue) {
      player.options.notationDigits.comma = newValue;
      ADNotations.Settings.exponentCommas.min = 10 ** newValue;
    },
    notationDigits(newValue) {
      player.options.notationDigits.notation = newValue;
      ADNotations.Settings.exponentCommas.max = 10 ** newValue;
    },
  },
  // This puts the sliders in the right spots on initialization
  created() {
    const options = player.options.notationDigits;
    this.commaDigits = options.comma;
    this.notationDigits = options.notation;
  },
  methods: {
    update() {
      const options = player.options.notationDigits;
      this.commaDigits = options.comma;
      this.notationDigits = options.notation;
    },

    // These need a bit of extra logic to ensure that the notation threshold is always >= the comma threshold
    adjustSliderComma(value) {
      this.commaDigits = value;
      player.options.notationDigits.comma = value;
      if (value > this.notationDigits) this.adjustSliderNotation(value);
    },
    adjustSliderNotation(value) {
      this.notationDigits = value;
      player.options.notationDigits.notation = value;
      if (value < this.commaDigits) this.adjustSliderComma(value);
    }
  },
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      지수 표기 설정
    </template>
    매우 큰 숫자의 표시 방식을 조정할 수 있습니다. 작은 값은 지수를 별도 형식 없이 그대로 표시합니다.
    더 큰 값은 읽기 쉽도록 지수에 쉼표를 넣고, 가장 큰 값은 지수를 줄이기 위해 선택한 표기법을 적용합니다.
    아래에서 각 표시 방식이 시작되는 두 기준값을 조정할 수 있습니다.
    <br>
    <br>
    <div class="c-single-slider">
      <b class="o-digit-text">지수에 쉼표를 넣는 최소 자릿수: {{ formatInt(commaDigits) }}자리</b>
      <SliderComponent
        class="o-primary-btn--slider__slider o-slider"
        v-bind="sliderProps"
        :value="commaDigits"
        @input="adjustSliderComma($event)"
      />
    </div>
    <div class="c-single-slider">
      <b class="o-digit-text">지수에 표기법을 적용하는 최소 자릿수: {{ formatInt(notationDigits) }}자리</b>
      <SliderComponent
        class="o-primary-btn--slider__slider o-slider"
        v-bind="sliderProps"
        :value="notationDigits"
        @input="adjustSliderNotation($event)"
      />
    </div>
    <br>
    지수 표시 예시:
    <div class="c-sample-numbers">
      <span
        v-for="(num, id) in sampleNums"
        :key="id"
        class="o-single-number"
      >
        {{ formatPostBreak(num) }}
      </span>
    </div>
    <br>
    참고: 인터페이스는 일반적으로 과학적 표기법에서 {{ formatInt(5) }}자리와 {{ formatInt(9) }}자리 설정에
    최적화되어 있습니다. 이 값에서 크게 벗어나면 일부 문구가 어색하게 보이거나 상자를 벗어날 수 있습니다.
    또한 일부 표기법에서는 이 설정을 바꿔도 화면에 차이가 없을 수 있습니다.
  </ModalWrapper>
</template>

<style scoped>
.c-single-slider {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.o-digit-text {
  width: 40rem;
}

.o-slider {
  width: 25rem;
}

.c-sample-numbers {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 1.5rem;
}

.o-single-number {
  width: 33%;
}
</style>
