<template>
  <v-card width="600px" class="mt-10 mx-auto">
    <v-card-title primary-title>
      <h1>Calculadora</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Peso Total de Masa"
          v-model="totalDoughWeight"
          suffix="grs"
        ></v-text-field>
        <v-divider></v-divider>
        <v-text-field
          label="% Masa madre al 100% hidratación"
          v-model="sourdough"
          suffix="%"
        ></v-text-field>
        <v-divider></v-divider>
        <v-text-field label="Tipo Harina" v-model="fluor1"></v-text-field>
        <v-text-field
          :label="flourTypeOne"
          v-model="fluor11"
          suffix="%"
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
      fluor1: "",
      fluor1Percent: ""
    };
  },
  computed: {
    flourTypeOne: function() {
      return "% Harina " + this.fluor1;
    }
  }
};
</script>

<style lang="scss" scoped></style>
