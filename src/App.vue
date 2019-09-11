<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Calculadora</span>
        <span class="font-weight-light">&nbsp;Porcentaje Panadero</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <SimpleBakerCalculator />
    </v-content>
  </v-app>
</template>

<script>
import SimpleBakerCalculator from "./views/SimpleBakerCalculator";

export default {
  name: "App",
  components: {
    SimpleBakerCalculator
  },
  data: () => ({
    //
  })
};
</script>
