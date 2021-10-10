<template>
  <div>
    <form @submit.prevent="login()">
      <h2 class="form-title">Se connecter</h2>
      <input
        v-model="email"
        placeholder="email"
        type="email"
        class="cypress-email"
        required
      />
      <input
        v-model="password"
        placeholder="mot de passe"
        type="password"
        class="cypress-password"
        required
      />
      <button type="submit" class="cypress-login">Se connecter</button>
      <router-link to="/register" class="cypress-to-register"
        >S'inscrire</router-link
      >
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  emits: ["login"],
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$http
        .post("/auth", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.$toast.success("Connexion réussie !");
          setTimeout(this.$toast.clear, 3000);
          this.$store.commit("login", this.email, this.name);
          this.$cookies.set("token", response.data.token, -1);
          this.$http.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          this.$emit("login", true);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response.data.detail);
          this.$toast.error(
            "Erreur lors de la connexion : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
  },
};
</script>
