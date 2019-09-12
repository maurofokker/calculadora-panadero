<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card class="mt-10 mx-auto">
            <v-card-title primary-title>
              <h3>Calculadora</h3>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Peso Total de Harina"
                    v-model="totalFluorWeight"
                    suffix="grs"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="% Masa madre al 100% hidratación"
                    v-model="sourdough"
                    suffix="%"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Agua"
                    v-model="water"
                    suffix="%"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Sal"
                    v-model="salt"
                    suffix="%"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Tipo Harina"
                    v-model="fluors.one.type"
                  ></v-text-field>
                  <v-text-field
                    :label="flourTypeOne"
                    v-model="fluors.one.percent"
                    suffix="%"
                  ></v-text-field>
                  <p v-if="totalFluorPercentGreaterThan100">
                    Total de harinas no debe superar el 100%
                  </p>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Tipo Harina"
                    v-model="fluors.two.type"
                  ></v-text-field>
                  <v-text-field
                    :label="flourTypeTwo"
                    v-model="fluors.two.percent"
                    suffix="%"
                  ></v-text-field>
                  <p v-if="totalFluorPercentGreaterThan100">
                    Total de harinas no debe superar el 100%
                  </p>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Tipo Harina"
                    v-model="fluors.three.type"
                  ></v-text-field>
                  <v-text-field
                    :label="flourTypeThree"
                    v-model="fluors.three.percent"
                    suffix="%"
                  ></v-text-field>
                  <p v-if="totalFluorPercentGreaterThan100">
                    Total de harinas no debe superar el 100%
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="mt-10 mx-auto">
            <v-card-title primary-title>
              <h3>Resultado</h3>
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
                      <v-list-item-subtitle
                        >Agua
                        {{ sourdoughFromTotalFluorWeight / 2 }}
                        grs</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        >Harina
                        {{ sourdoughFromTotalFluorWeight / 2 }}
                        grs</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Total de agua {{ waterFromTotalFluorWeight }} grs
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Total de sal {{ saltFromTotalFluorWeight }} grs
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        >Total de Harinas
                        {{ totalFluorWeight || 0 }} grs</v-list-item-title
                      >
                      <v-list-item-subtitle v-if="fluors.one.type"
                        >{{ fluors.one.type }} -
                        {{ fluorOneFromTotalFluorWeight }}
                        grs</v-list-item-subtitle
                      >
                      <v-list-item-subtitle v-if="fluors.two.type"
                        >{{ fluors.two.type }} -
                        {{ fluorTwoFromTotalFluorWeight }}
                        grs</v-list-item-subtitle
                      >
                      <v-list-item-subtitle v-if="fluors.three.type"
                        >{{ fluors.three.type }} -
                        {{ fluorThreeFromTotalFluorWeight }}
                        grs</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Total de la masa {{ totalDoughWeight }} grs
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      totalFluorWeight: "",
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
    sourdoughFromTotalFluorWeight: function() {
      return (Number(this.sourdough) * this.totalFluorWeight) / 100 || 0;
    },
    fluorOneFromTotalFluorWeight: function() {
      return (
        (Number(this.fluors.one.percent) * this.totalFluorWeight) / 100 || 0
      );
    },
    fluorTwoFromTotalFluorWeight: function() {
      return (
        (Number(this.fluors.two.percent) * this.totalFluorWeight) / 100 || 0
      );
    },
    fluorThreeFromTotalFluorWeight: function() {
      return (
        (Number(this.fluors.three.percent) * this.totalFluorWeight) / 100 || 0
      );
    },
    waterFromTotalFluorWeight: function() {
      return (Number(this.water) * this.totalFluorWeight) / 100 || 0;
    },
    saltFromTotalFluorWeight: function() {
      return (Number(this.salt) * this.totalFluorWeight) / 100 || 0;
    },
    totalFluorPercentGreaterThan100: function() {
      return (
        Number(this.fluors.one.percent) +
          Number(this.fluors.two.percent) +
          Number(this.fluors.three.percent) >
        100
      );
    },
    totalDoughWeight: function() {
      return (
        Number(this.totalFluorWeight) +
        Number(this.waterFromTotalFluorWeight) +
        Number(this.saltFromTotalFluorWeight) +
        Number(this.sourdoughFromTotalFluorWeight)
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
