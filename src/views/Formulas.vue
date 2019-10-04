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
                  <pre>{{ formula.formula }}</pre>
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
import axios from "axios";
export default {
  data() {
    return {
      formulas: []
    };
  },
  created() {
    axios.get("http://localhost:3000/formulas").then(({ data }) => {
      console.log("FORMULAS REQUESTED", data);
      this.formulas = data;
    });
  }
};
</script>

<style scoped></style>
