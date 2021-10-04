<template>
  <div>
    <form @submit.prevent="login()">
      <div class="content">
        <h2>Se connecter</h2>
      </div>
      <div class="field">
        <div class="control">
          <input
              v-model="email"
              placeholder="email"
              type="email"
              class="cypress-email input"
              required
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
              v-model="password"
              placeholder="mot de passe"
              type="password"
              class="cypress-password input"
              required
          />
        </div>
      </div>
        <button type="submit" class="cypress-login button is-info mr-6">Se connecter</button>
        <router-link to="/register" class="cypress-to-register  button is-link">S'inscrire</router-link>

    </form>
  </div>
</template>

<script>
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
