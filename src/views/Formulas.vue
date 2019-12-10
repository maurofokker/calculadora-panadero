<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Nombre</th>
                <th class="text-left">Acci&oacute;n</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="formula in formulas" :key="formula.id">
                <td>{{ formula.name }}</td>
                <td>
                  <v-btn icon color="gray" @click.prevent="openDialog(formula)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-dialog v-if="selected" v-model="dialog" persistent max-width="290px">
      <v-card>
        <v-card-title class="headline">Atenci&oacute;n</v-card-title>

        <v-card-text>
          Usted est&aacute; por eliminar la f&oacute;rmula
          <b>{{ selected.name }}</b
          >. Est&aacute; de acuerdo?
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="gray darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>

          <v-btn color="primary darken-1" text @click="deleteFormula">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// import axios from "axios";
import { DB } from "../../firebase/db";
export default {
  data() {
    return {
      formulas: [],
      dialog: false,
      selected: ""
    };
  },
  firestore: {
    formulas: DB.collection("formulas").orderBy("createdAt", "desc")
  },
  created() {
    // axios.get("http://localhost:3000/formulas").then(({ data }) => {
    //   console.log("FORMULAS REQUESTED", data);
    //   this.formulas = data;
    // });
  },
  methods: {
    openDialog(formula) {
      console.log("DELETE", formula.id);
      this.dialog = true;
      this.selected = formula;
    },
    deleteFormula() {
      this.dialog = false;
      // axios
      //   .delete("http://localhost:3000/formulas/" + this.selected.id)
      //   .then(response => {
      //     console.log("RESPONSE", response);
      //     this.formulas = this.formulas.filter(
      //       formula => formula.id != this.selected.id
      //     );
      //   });
      console.log("SELECTED", this.selected);
      const formulaID = this.selected.id;
      DB.collection("formulas")
        .doc(formulaID)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
  }
};
</script>

<style scoped></style>
