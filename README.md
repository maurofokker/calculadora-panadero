# calculadora-panadero

## Project setup
```
npm install
```

### Run json-server
```
json-server db.json
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Material Designs Icons

* To use other icons different than defaults read [this](https://vuetifyjs.com/es-MX/customization/icons#install-material-design-icons-js-svg)
* [Material design icons website](https://materialdesignicons.com/) 

### Firebase cofig

* I use  [this tutorial](https://garywoodfine.com/how-to-install-firebase-with-vue-js/) and [vuefire docs](https://vuefire.vuejs.org)

* Vuefire tutorials:
  * [CRUD TODO LIST](https://medium.com/@magyarn/vuefire-crud-todo-list-app-part-2-8bd61ae0d066)
  * [Fullsatck tutorial](https://medium.com/vue-mastery/full-stack-vue-js-with-firestore-62e2fe2ec1f3)
  
* Firestore [documentation](https://firebase.google.com/docs/firestore)

* For authentication see [this tutorial](https://garywoodfine.com/vue-app-with-firebase-authentication/)

* In `.env.[mode].local` add config from firebase console. See [uing environment variables in vue](https://garywoodfine.com/using-environment-variables-in-vue-js/) post

```
VUE_APP_FIREBASE_API_KEY=
VUE_APP_FIREBASE_AUTH_DOMAIN=
VUE_APP_FIREBASE_DB_URL=
VUE_APP_FIREBASE_PROJECT_ID=
VUE_APP_FIREBASE_STORAGE_BUCKET=
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=
VUE_APP_FIREBASE_APP_ID=
VUE_APP_FIREBASE_MEASUREMENT_ID=
```