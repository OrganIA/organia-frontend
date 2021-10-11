<template>
  <div>
    <form @submit.prevent="register()">
      <h2 class="form-title">S'inscrire</h2>
      <input
        v-model="email"
        class="cypress-email"
        placeholder="email"
        type="email"
        required
      />
      <input
        v-model="password"
        placeholder="mot de passe"
        type="password"
        class="cypress-password"
        required
      />
      <button type="submit" class="cypress-register">S'inscrire</button>
      <router-link to="/login" class="cypress-to-login"
        >Se connecter</router-link
      >
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      this.$http
        .post("/users/", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$toast.success("Connexion réussie !");
          setTimeout(this.$toast.clear, 3000);
          this.login();
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
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
