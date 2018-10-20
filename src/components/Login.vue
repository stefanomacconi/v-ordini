<template>
  <v-form>
    <v-text-field v-model="utente" :rules="requiredRules" label="Utente" required></v-text-field>
    <v-text-field v-model="password" :rules="requiredRules" label="Password" type="password" required></v-text-field>
     <v-btn>
      Login
    </v-btn>
    <v-btn @click.prevent="clear">Cancella</v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    utente: "",
    password: "",
    requiredRules: [v => !!v || "Name is required"]
  }),
  methods: {
    clear() {
      this.utente = "";
      this.password = "";
    }
  }
};
</script>