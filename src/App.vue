<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Oh My</span>
        <span class="font-weight-light">&nbsp;Dough</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in links"
        :key="`${link.label}-header-link`"
        text
        rounded
        :to="link.url"
        >{{ link.label }}</v-btn
      >
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    links: [
      {
        label: "Home",
        url: "/"
      },
      {
        label: "Calculadora",
        url: "/calculadora"
      },
      {
        label: "Formulas",
        url: "/formulas"
      }
    ]
  })
};
</script>
