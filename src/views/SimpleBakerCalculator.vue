<template>
  <v-card width="600px" class="mt-10 mx-auto">
    <v-card-title primary-title>
      <h2>Calculadora</h2>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Peso Total de Masa"
          v-model="totalDoughWeight"
          suffix="grs"
        ></v-text-field>
        <v-text-field
          label="% Masa madre al 100% hidratación"
          v-model="sourdough"
          suffix="%"
        ></v-text-field>
        <v-text-field
          label="Total in grams"
          :value="sourdoughFromTotalDoughWeight"
          outlined
          readonly
          suffix="grs"
        ></v-text-field>
        <v-divider></v-divider>
        <v-text-field
          label="Tipo Harina"
          v-model="fluors.one.type"
        ></v-text-field>
        <v-text-field
          :label="flourTypeOne"
          v-model="fluors.one.percent"
          suffix="%"
        ></v-text-field>
        <v-text-field
          label="Total in grams"
          :value="fluorOneFromTotalDoughWeight"
          outlined
          readonly
          suffix="grs"
        ></v-text-field>
        <p v-if="totalFluorPercentGreaterThan100">
          Total de harinas no debe superar el 100%
        </p>
        <v-divider></v-divider>
        <v-text-field
          label="Tipo Harina"
          v-model="fluors.two.type"
        ></v-text-field>
        <v-text-field
          :label="flourTypeTwo"
          v-model="fluors.two.percent"
          suffix="%"
        ></v-text-field>
        <v-text-field
          label="Total in grams"
          :value="fluorTwoFromTotalDoughWeight"
          outlined
          readonly
          suffix="grs"
        ></v-text-field>
        <p v-if="totalFluorPercentGreaterThan100">
          Total de harinas no debe superar el 100%
        </p>
        <v-divider></v-divider>
        <v-text-field
          label="Tipo Harina"
          v-model="fluors.three.type"
        ></v-text-field>
        <v-text-field
          :label="flourTypeThree"
          v-model="fluors.three.percent"
          suffix="%"
        ></v-text-field>
        <v-text-field
          label="Total in grams"
          :value="fluorThreeFromTotalDoughWeight"
          outlined
          readonly
          suffix="grs"
        ></v-text-field>
        <p v-if="totalFluorPercentGreaterThan100">
          Total de harinas no debe superar el 100%
        </p>
        <v-divider></v-divider>
        <v-text-field label="Agua" v-model="water" suffix="%"></v-text-field>
        <v-text-field
          label="Total in grams"
          :value="waterFromTotalDoughWeight"
          outlined
          readonly
          suffix="grs"
        ></v-text-field>
        <v-divider></v-divider>
        <v-text-field label="Sal" v-model="salt" suffix="%"></v-text-field>
        <v-text-field
          label="Total in grams"
          :value="saltFromTotalDoughWeight"
          outlined
          readonly
          suffix="grs"
        ></v-text-field>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      totalDoughWeight: "",
      sourdough: "",
      fluors: {
        one: {
          type: "",
          percent: 0,
          value: 0
        },
        two: {
          type: "",
          percent: 0,
          value: 0
        },
        three: {
          type: "",
          percent: 0,
          value: 0
        }
      },
      totalFluor: 0,
      water: 0,
      salt: 0
    };
  },
  computed: {
    flourTypeOne: function() {
      return "% Harina " + this.fluors.one.type;
    },
    flourTypeTwo: function() {
      return "% Harina " + this.fluors.two.type;
    },
    flourTypeThree: function() {
      return "% Harina " + this.fluors.three.type;
    },
    sourdoughFromTotalDoughWeight: function() {
      return (Number(this.sourdough) * this.totalDoughWeight) / 100 || 0;
    },
    fluorOneFromTotalDoughWeight: function() {
      return (
        (Number(this.fluors.one.percent) * this.totalDoughWeight) / 100 || 0
      );
    },
    fluorTwoFromTotalDoughWeight: function() {
      return (
        (Number(this.fluors.two.percent) * this.totalDoughWeight) / 100 || 0
      );
    },
    fluorThreeFromTotalDoughWeight: function() {
      return (
        (Number(this.fluors.three.percent) * this.totalDoughWeight) / 100 || 0
      );
    },
    waterFromTotalDoughWeight: function() {
      return (Number(this.water) * this.totalDoughWeight) / 100 || 0;
    },
    saltFromTotalDoughWeight: function() {
      return (Number(this.salt) * this.totalDoughWeight) / 100 || 0;
    },
    totalFluorPercentGreaterThan100: function() {
      return (
        Number(this.fluors.one.percent) +
          Number(this.fluors.two.percent) +
          Number(this.fluors.three.percent) >
        100
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
