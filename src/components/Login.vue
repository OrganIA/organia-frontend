<template>
  <div>
    <form @submit.prevent="login()">
      <h2 class="form-title">Se connecter</h2>
      <input v-model="email" placeholder="email" type="email" class="action-email" required />
      <input
        v-model="password"
        placeholder="mot de passe"
        type="password"
        class="action-password"
        required
      />
      <button type="submit" class="action-login">Se connecter</button>
      <router-link to="/register" class="action-to-register">S'inscrire</router-link>
    </form>
  </div>
</template>

<script>
import http from "../http";

export default {
  name: "Login",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
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
        });
    },
  },
};
</script>
