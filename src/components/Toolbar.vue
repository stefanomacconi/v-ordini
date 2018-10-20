<template>
  <div>
    <v-toolbar color='primary' dark fixed app clipped-right>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        V-Ordini
        <v-divider light vertical></v-divider>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="auth" to="/" flat><v-icon left>description</v-icon>Ordini</v-btn>
        <!-- <v-divider light vertical></v-divider> -->
        <v-btn v-if="!auth" to="/login" flat><v-icon left>person</v-icon>Login</v-btn>
        <v-btn v-if="auth" @click="logout" flat><v-icon left>person</v-icon>Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-toolbar dark color='primary' flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title v-if="auth" class="title">
            Utente TODO
          </v-list-tile-title>
          <v-list-tile-title v-else class="title">
            V-Ordini
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense class="pt-0">
      <v-list-tile v-if="!auth" to="/login">
        <v-list-tile-action>
          <v-icon>person</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Login</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="auth" to="/">
        <v-list-tile-action>
          <v-icon>description</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Ordini</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
  }),
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
};
</script>