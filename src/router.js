import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/calculadora",
      name: "calculadora",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "SimpleBakerCalculator" */ "./views/SimpleBakerCalculator.vue"
        )
    },
    {
      path: "/formulas",
      name: "formulas",
      component: () =>
        import(/* webpackChunkName: "TheFormulas" */ "./views/TheFormulas.vue")
    }
  ]
});
