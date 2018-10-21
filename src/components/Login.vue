<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field v-model="utente" id="utente" label="Utente" required></v-text-field>
    <v-text-field v-model="password" id="password" label="Password" type="password" required></v-text-field>
     <v-btn type='submit' color="primary">Login</v-btn>
    <v-btn color="secondary" @click.prevent="clear">Cancella</v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    utente: "",
    password: ""
  }),
  methods: {
    clear() {
      this.utente = "";
      this.password = "";
    },
    onSubmit() {
      const formData = {
        utente: this.utente,
        password: this.password
      }
      // eslint-disable-next-line
      console.log(formData)
      this.$store.dispatch('login', {
        utente: formData.utente,
        password: formData.password
      })
    }
  }
};
</script>