<template>
  <PresentationNavbar />
  <div class="centered-container">
    <form @submit.prevent="register()">
      <div class="content">
        <h2>S'inscrire</h2>
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

      <button type="submit" class="cypress-register button is-info mr-6">
        Confirmer
      </button>
      <router-link to="/login" class="cypress-to-login button is-link"
        >Se connecter</router-link
      >
    </form>
  </div>
</template>

<script>
import PresentationNavbar from "@/components/PresentationNavbar";

export default {
  name: "Register",
  emits: ["login"],
  components: { PresentationNavbar },
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
          role_id:1
        })
        .then(() => {
          this.login();
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response);
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
          this.$store.commit("login", {
            email: this.email,
            role: response.data,
          });
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
          this.$http.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          this.$cookies.set("token", response.data.token, -1);
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
