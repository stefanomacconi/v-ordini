<template>
  <div>
    <v-toolbar color='primary' dark fixed app clipped-right>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" :disabled="!auth"></v-toolbar-side-icon>
      <v-toolbar-title>
        V-Ordini
        <v-divider light vertical></v-divider>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="auth" to="/vistatura" flat><v-icon left>description</v-icon>Ordini</v-btn>
        <v-btn v-if="!auth" to="/login" flat><v-icon left>person</v-icon>Login</v-btn>
        <v-btn v-if="auth" @click="logout" flat><v-icon left>lock</v-icon>Logout</v-btn>
        <v-divider dark vertical></v-divider>
      </v-toolbar-items>
        <v-menu right bottom v-if="auth" origin="bottom right" transition="v-scale-transition">
          <v-btn dark icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list dense class="pt-0">
            <v-list-tile to="/documento">
              <v-list-tile-action>
                <v-icon>book</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Tipo Documento</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/conferma">
              <v-list-tile-action>
                <v-icon>done_all</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Conferma d'Ordine</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            </v-list>
        </v-menu> 
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-toolbar dark color='primary' flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Utente TODO
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense class="pt-0">
        <v-list-tile to="/vistatura">
          <v-list-tile-action>
            <v-icon>description</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Vistatura Ordini</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/documento">
          <v-list-tile-action>
            <v-icon>book</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Tipo Documento</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/conferma">
          <v-list-tile-action>
            <v-icon>done_all</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Conferma d'Ordine</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider dark></v-divider>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false
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