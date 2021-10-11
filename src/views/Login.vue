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
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    getRole(role_id) {
      this.$http
        .get(`/roles/${role_id}`)
        .then((response) => {
          this.$toast.success("Connexion réussie !");
          setTimeout(this.$toast.clear, 3000);
          console.log("LOGIN.VUE GET ROLE");
          console.log(response.data);
          this.$store.commit("login", { email: this.email, role: response.data});
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
    login() {
      this.$http
        .post("/auth", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.$toast.success("Connexion réussie !");
          setTimeout(this.$toast.clear, 3000);
          this.$http.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          this.$cookies.set("token", response.data.token, -1);
          console.log("LOGIN.VUE RESPONSE.DATA");
          console.log(response.data);
          this.getRole(response.data.user.role_id);
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
