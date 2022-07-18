<template>
  <PresentationNavbar />
  <div class="centered-container">
    <form @submit.prevent="register()">
      <div class="content">
        <h2>S'inscrire</h2>
      </div>
      <div class="field">
        <div class="control">
          <input v-model="lastname" class="cypress-lastname input" placeholder="Nom de famille" type="text" required />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input v-model="firstname" class="cypress-firstname input" placeholder="Prénom" type="text" required />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <vue-tel-input class="cypress-phone-number input"
            :inputOptions="{ placeholder: 'Numéro de téléphone', required: true }" :value="phone" @input="onInput"
            required></vue-tel-input>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input v-model="email" class="cypress-email input" placeholder="email" type="email" required />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input v-model="password" placeholder="mot de passe" type="password" class="cypress-password input"
            required />
        </div>
      </div>

      <button type="submit" class="cypress-register button is-info mr-6">
        Confirmer
      </button>
      <router-link to="/login" class="cypress-to-login button is-link">Se connecter</router-link>
    </form>
  </div>
</template>

<script>
import PresentationNavbar from "@/components/PresentationNavbar";

export default {
  name: "register",
  emits: ["login"],
  components: { PresentationNavbar },
  data() {
    return {
      lastname: "",
      firstname: "",
      phone: "",
      password: "",
      email: "",
      country: ""
    };
  },
  methods: {
    onInput(phone, phoneObject) {
      if (phoneObject?.formatted) {
        this.country = phoneObject.country.iso2
        this.phone = phoneObject.nationalNumber
      }
    },
    register() {
      this.$http
        .post("/users/", {
          email: this.email,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          phone_number: this.phone,
          country: this.country,
          role_id: 1
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
          this.$router.push("/landing");
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
