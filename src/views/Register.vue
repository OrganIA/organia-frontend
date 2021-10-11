<template>
  <div>
    <form @submit.prevent="register()">
      <div class="content">
        <h2>S'inscrire</h2>
      </div>
      <div class="field">
        <div class="control">
          <input
              v-model="name"
              class="cypress-name input"
              placeholder="name"
              type="text"
              required
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
              v-model="email"
              class="cypress-email input"
              placeholder="email"
              type="email"
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

      <button type="submit" class="cypress-register button is-info mr-6">S'inscrire</button>
      <router-link to="/login" class="cypress-to-login  button is-link">Se connecter</router-link
      >
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",
  emits: ["login"],
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      this.$http
        .post("/users/", {
          name: this.name,
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
    login() {
      this.$http
        .post("/auth", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.$store.commit("login", this.email, this.name);
          this.$cookies.set("token", response.data.token, -1);
          this.$http.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          this.$emit("login", true);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
  },
};
</script>
