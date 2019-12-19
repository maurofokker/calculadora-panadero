<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th id="name" class="text-left">Nombre</th>
                <th id="action" class="text-left">Acci&oacute;n</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="formula in formulas" :key="formula.id">
                <td>{{ formula.name }}</td>
                <td>
                  <v-btn
                    icon
                    color="gray"
                    :to="{ name: 'formulaID', params: { id: formula.id } }"
                  >
                    <v-icon>{{ icons.mdiEye }}</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from "axios";
import { DB } from "../../firebase/db";
import { mdiEye } from "@mdi/js";
export default {
  data() {
    return {
      formulas: [],
      dialog: false,
      selected: "",
      icons: { mdiEye }
    };
  },
  firestore: {
    formulas: DB.collection("formulas").orderBy("createdAt", "desc")
  }
};
</script>

<style scoped></style>
