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
              <v-alert
                v-if="totalDoughsPercentShouldBeLessThan100"
                type="warning"
              >
                Porcentaje total de harinas no debe ser mayor a 100
              </v-alert>
              <v-row>
                <v-col cols="6" v-for="(fluor, index) in fluors" :key="index">
                  <v-btn icon color="gray" @click.prevent="deleteFluor(index)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <Fluor
                    :idx="index"
                    :fluors="fluorTypes"
                    :fluor="fluor"
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
              <v-spacer></v-spacer>
              <v-btn
                class="ma-2"
                tile
                outlined
                color="primary"
                @click.prevent="dialog = true"
              >
                <v-icon dark left>mdi-thumb_up</v-icon> Guardar
              </v-btn>
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
                      >
                        <template v-if="fluor.type">
                          {{ fluor.type }} -
                          {{
                            getFluorWeightRespectTotalFluorsWeight(
                              fluor.percent
                            )
                          }}
                          grs
                        </template>
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
      <v-snackbar v-model="snackbar">
        {{ snackbarText }}
        <v-btn color="info" timeout="6000" text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <ModalSaveFormula
          @closeModal="dialog = false"
          @saveFormula="saveFormula"
        />
      </v-dialog>
    </v-container>
  </v-form>
</template>

<script>
import Fluor from "@/components/Fluor.vue";
import ModalSaveFormula from "@/components/ModalSaveFormula.vue";
import fluorsData from "@/data/fluors.json";
import axios from "axios";
import uuid from "uuid";

export default {
  components: {
    Fluor,
    ModalSaveFormula
  },
  data() {
    return {
      totalFluorWeight: 1000,
      sourdough: 20,
      fluors: [],
      fluorTypes: Object.keys(fluorsData),
      water: 73,
      salt: 2,
      snackbar: false,
      snackbarText: "Tipo de harina eliminada",
      dialog: false
    };
  },
  computed: {
    sourdoughFromTotalFluorWeight: function() {
      return (
        (Number(this.sourdough) * Number(this.totalFluorWeight)) / 100 || 0
      );
    },
    waterFromTotalFluorWeight: function() {
      return (Number(this.water) * Number(this.totalFluorWeight)) / 100 || 0;
    },
    saltFromTotalFluorWeight: function() {
      return (Number(this.salt) * Number(this.totalFluorWeight)) / 100 || 0;
    },
    totalDoughWeight: function() {
      return (
        Number(this.totalFluorWeight) +
        Number(this.waterFromTotalFluorWeight) +
        Number(this.saltFromTotalFluorWeight) +
        Number(this.sourdoughFromTotalFluorWeight)
      );
    },
    totalDoughsPercentShouldBeLessThan100: function() {
      let sum = 0;
      for (let fluor of this.fluors) {
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
    theFluor(evt, idx) {
      const fluor = this.fluors[idx];
      this.$set(fluor, "percent", evt);
      this.$set(this.fluors, idx, fluor);
    },
    theFluorType(evt, idx) {
      // console.log("ARRIVED", evt, idx);
      // this.fluors[idx].type = evt;
      const fluor = this.fluors[idx];
      this.$set(fluor, "type", evt);
      this.$set(this.fluors, idx, fluor);
    },
    getFluorWeightRespectTotalFluorsWeight(percent) {
      return (Number(percent) * Number(this.totalFluorWeight)) / 100 || 0;
    },
    addFluor() {
      const newFluor = {
        type: "",
        percent: null
      };
      this.fluors.push(newFluor);
    },
    deleteFluor(idx) {
      const fluorToDelete = this.fluors[idx];
      this.fluors.splice(idx, 1);
      this.snackbarText = `Harina ${fluorToDelete.type} eliminada`;
      this.snackbar = true;
    },
    saveFormula(name) {
      const newFormula = {
        id: uuid(),
        name: name,
        formula: {
          totalFluorWeight: this.totalFluorWeight,
          sourdough: this.sourdough,
          water: this.water,
          salt: this.salt,
          fluors: this.fluors
        }
      };
      console.log(newFormula);
      axios
        .post("http://localhost:3000/formulas", newFormula)
        .then(response => {
          console.log(response);
          this.dialog = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
