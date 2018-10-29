<template>
  <div>
    <v-toolbar color='primary' dark scroll-off-screen app clipped-right>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" :disabled="!auth"></v-toolbar-side-icon>
      <v-toolbar-title>
        V-Ordini
        <v-divider light vertical></v-divider>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="auth" :to="menuOrdini.to" flat>
          <v-icon left>{{ menuOrdini.icon }}</v-icon>
          {{ menuOrdini.title }}
        </v-btn>
        <v-btn v-if="!auth" :to="menuLogin.to" flat>
          <v-icon left>{{ menuLogin.icon }}</v-icon>
          {{ menuLogin.title }}
        </v-btn>
        <v-btn v-if="auth" @click="logout" flat>
          <v-icon left>{{ menuLogout.icon }}</v-icon>
          {{ menuLogout.title }}
        </v-btn>
        <v-divider dark vertical></v-divider>
      </v-toolbar-items>
        <v-menu right bottom origin="bottom right" transition="v-scale-transition">
          <v-btn dark icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list dense class="pt-0">
            <v-list-tile v-if="auth" v-for="menu in menus" :key="menu.title" :to="menu.to">
              <v-list-tile-action>
                <v-icon>{{ menu.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="!auth" :to="menuLogin.to">
              <v-list-tile-action>
                <v-icon>{{ menuLogin.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ menuLogin.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            </v-list>
        </v-menu> 
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" temporary app>
      <!-- <v-toolbar dark color='primary' flat> -->
      <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            {{ utente + " - Ditta: " + siglaDitta }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense class="pt-0">
        <v-list-tile :to="menuOrdini.to">
          <v-list-tile-action>
            <v-icon>{{ menuOrdini.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ menuOrdini.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="menu in menus" :key="menu.title" :to="menu.to">
          <v-list-tile-action>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider dark></v-divider>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>{{ menuLogout.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ menuLogout.title }}</v-list-tile-title>
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
    menus: [
      {title: "Conferma d'Ordine", to: "/conferma", icon: "done_all"},
      {title: "Tipo Documento", to: "/documento", icon: "book"}
    ],
    menuOrdini : {title: "Vistatura Ordini", to: "/vistatura", icon: "description"},
    menuLogin : {title: "Sign In", to: "/login", icon: "person"},
    menuLogout : {title: "Logout", icon: "lock"},
  }),
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    },
    utente () {
      return this.$store.getters.getUtente
    },
    siglaDitta () {
      return this.$store.getters.getSiglaDitta
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
};
</script>