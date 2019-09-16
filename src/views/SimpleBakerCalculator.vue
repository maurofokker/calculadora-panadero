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
              <v-btn
                class="ma-2"
                tile
                outlined
                color="primary"
                @click.prevent="addFluor"
              >
                <v-icon left>mdi-plus</v-icon> Agregar Harina
              </v-btn>
              <v-row>
                <v-col cols="4" v-for="(fluor, index) in fluors" :key="index">
                  <Fluor
                    :idx="index"
                    :type="fluor.type"
                    @changetext="theFluor"
                    @changefluortype="theFluorType"
                  />
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
                      <v-list-item-subtitle
                        v-for="(fluor, index) in fluors"
                        :key="index"
                        >{{ fluor.type }} -
                        {{
                          getFluorWeightRespectTotalFluorsWeight(fluor.percent)
                        }}
                        grs
                      </v-list-item-subtitle>
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
import Fluor from "@/components/Fluor.vue";
export default {
  components: {
    Fluor
  },
  data() {
    return {
      totalFluorWeight: 1000,
      sourdough: 20,
      fluors: [
        {
          type: "Fuerza",
          percent: 0
        }
      ],
      water: 73,
      salt: 2
    };
  },
  computed: {
    sourdoughFromTotalFluorWeight: function() {
      return (Number(this.sourdough) * this.totalFluorWeight) / 100 || 0;
    },
    waterFromTotalFluorWeight: function() {
      return (Number(this.water) * this.totalFluorWeight) / 100 || 0;
    },
    saltFromTotalFluorWeight: function() {
      return (Number(this.salt) * this.totalFluorWeight) / 100 || 0;
    },
    totalDoughWeight: function() {
      return (
        Number(this.totalFluorWeight) +
        Number(this.waterFromTotalFluorWeight) +
        Number(this.saltFromTotalFluorWeight) +
        Number(this.sourdoughFromTotalFluorWeight)
      );
    }
  },
  methods: {
    theFluor(evt, idx) {
      console.log("ARRIVED", evt, idx);
      this.fluors[idx].percent = evt;
    },
    theFluorType(evt, idx) {
      console.log("ARRIVED", evt, idx);
      this.fluors[idx].type = evt;
    },
    getFluorWeightRespectTotalFluorsWeight(percent) {
      return (Number(percent) * this.totalFluorWeight) / 100 || 0;
    },
    addFluor() {
      const newFluor = {
        type: "",
        percent: 0
      };
      this.fluors.push(newFluor);
    }
  }
};
</script>

<style lang="scss" scoped></style>
