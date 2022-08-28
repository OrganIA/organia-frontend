<template>
  <PresentationNavbar />
  <div class="centered-container">
    <form @submit.prevent="login()">
      <div class="content">
        <h2>Se connecter</h2>
      </div>
      <div class="field">
        <div class="control">
          <input v-model="email" placeholder="email" type="email" class="cypress-email input" required />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input v-model="password" placeholder="mot de passe" type="password" class="cypress-password input"
            required />
        </div>
      </div>
      <button type="submit" class="cypress-login button is-info mr-6">
        Confirmer
      </button>
      <router-link to="/register" class="cypress-to-register button is-link">S'inscrire</router-link>
    </form>
  </div>
</template>

<script>
import PresentationNavbar from "@/components/PresentationNavbar";
import translate from "@/translate"

export default {
  name: "login",
  emits: ["login"],
  components: { PresentationNavbar },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    getRole(data) {
      this.$http
        .get(`/roles/${data.role_id}`)
        .then((response) => {
          this.$toast.success("Connexion réussie !");
          setTimeout(this.$toast.clear, 3000);
          this.$store.commit("login", {
            id: data.id,
            email: data.email,
            role: response.data,
          });
          this.$emit("login", true);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response.data.detail);
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
          this.getRole(response.data.user);
        })
        .catch((error) => {
          console.log(error.response.data.detail);
          this.$toast.error(
            "Erreur lors de la connexion : " + translate[error.response.data.detail]
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
  },
};
</script>
