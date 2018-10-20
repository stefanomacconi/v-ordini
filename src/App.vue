<template>
  <v-app>
    <toolbar></toolbar>
      <v-content>
        <v-container fluid>
         <router-view></router-view>
        </v-container>
      </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar";

export default {
  name: "App",
  components: {
    Toolbar
  }
};
</script>
