<template>
  <div>
    <form @submit.prevent="register()">
      <h2 class="form-title">S'inscrire</h2>
      <input v-model="name" class="cypress-name" placeholder="name" type="text" required />
      <input v-model="email" class="cypress-email" placeholder="email" type="email" required />
      <input
        v-model="password"
        placeholder="mot de passe"
        type="password"
        class="cypress-password"
        required
      />
      <button type="submit" class="cypress-register">S'inscrire</button>
      <router-link to="/login" class="cypress-to-login">Se connecter</router-link>
    </form>
  </div>
</template>

<script>
import http from "../http";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      http
        .post("/users/", {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$toast.success("Connexion réussie !");
          setTimeout(this.$toast.clear, 3000)
          this.login();
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur lors de la connexion : " + error);
          setTimeout(this.$toast.clear, 3000)
        });
    },
    login() {
      http
        .post("/auth", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.$store.commit("login", this.email, this.name);
          this.$cookies.set("token", response.data.token, -1);
          http.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          this.$emit("login", true);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur lors de la connexion : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000)
        });
    },
  },
};
</script>
