<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="3"></v-col>
      <v-col cols="6" lg="6" v-if="formula">
        <v-card>
          <v-card-title primary-title>
            <h3>{{ formula.name }}</h3>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list disabled>
              <v-list-item-group color="primary">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      Total de masa madre
                      {{ sourdoughFromTotalFluorWeight }} grs
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Agua
                      {{ sourdoughFromTotalFluorWeight / 2 }}
                      grs
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      Harina
                      {{ sourdoughFromTotalFluorWeight / 2 }}
                      grs
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      >Total de agua
                      {{ waterFromTotalFluorWeight }} grs</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      >Total de sal
                      {{ saltFromTotalFluorWeight }} grs</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      Total de Harinas
                      {{ formula.formula.totalFluorWeight || 0 }} grs
                    </v-list-item-title>
                    <v-list-item-subtitle
                      v-for="(fluor, index) in formula.formula.fluors"
                      :key="index"
                    >
                      <template v-if="fluor.type">
                        {{ fluor.type }} -
                        {{
                          getFluorWeightRespectTotalFluorsWeight(fluor.percent)
                        }}
                        grs
                      </template>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      >Total de la masa
                      {{ totalDoughWeight }} grs</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { DB } from "../../firebase/db";
export default {
  data() {
    return {
      componentLoaded: false,
      id: this.$route.params.id,
      formula: null
    };
  },
  created() {
    DB.collection("formulas")
      .doc(this.$route.params.id)
      .get()
      .then(snapshot => {
        const document = snapshot.data();
        this.formula = document;
        this.componentLoaded = true;
      });
  },
  computed: {
    sourdoughFromTotalFluorWeight: function() {
      console.log("CALLED");
      if (!this.componentLoaded) return null;
      return (
        (Number(this.formula.formula.sourdough) *
          Number(this.formula.formula.totalFluorWeight)) /
          100 || 0
      );
    },
    waterFromTotalFluorWeight: function() {
      if (!this.componentLoaded) return null;
      return (
        (Number(this.formula.formula.water) *
          Number(this.formula.formula.totalFluorWeight)) /
          100 || 0
      );
    },
    saltFromTotalFluorWeight: function() {
      if (!this.componentLoaded) return null;
      return (
        (Number(this.formula.formula.salt) *
          Number(this.formula.formula.totalFluorWeight)) /
          100 || 0
      );
    },
    totalDoughWeight: function() {
      if (!this.componentLoaded) return null;
      return (
        Number(this.formula.formula.totalFluorWeight) +
        Number(this.waterFromTotalFluorWeight) +
        Number(this.saltFromTotalFluorWeight) +
        Number(this.sourdoughFromTotalFluorWeight)
      );
    },
    totalDoughsPercentShouldBeLessThan100: function() {
      if (!this.componentLoaded) return null;
      let sum = 0;
      for (let fluor of this.formula.formula.fluors) {
        sum += Number(fluor.percent);
      }
      if (sum > 100) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    getFluorWeightRespectTotalFluorsWeight(percent) {
      return (
        (Number(percent) * Number(this.formula.formula.totalFluorWeight)) /
          100 || 0
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
