<template>
  <Loader :class="{ 'is-hidden': !this.loading }"></Loader>
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
import translate from "@/translate"
import Loader from "@/components/Loader";

export default {
  name: "register",
  components: { Loader },
  data() {
    return {
      lastname: "",
      firstname: "",
      phone: "",
      password: "",
      email: "",
      loading: false,
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
      this.loading = true
      this.$http
        .post("/auth/register", {
          email: this.email,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          phone_number: this.phone,
          country: this.country,
          role_id: 1
        })
        .then((response) => {
          this.$http.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          this.$cookies.set("token", response.data.token, -1);
          this.$store.commit("login", {
            id: response.data.user.id,
            email: response.data.user.email,
            role: response.data.user.role,
          });
          this.loading = false
          this.$router.push("/landing");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.msg.includes("is already taken")) {
            error.response.data.msg = error.response.data.msg.replace("is already taken", "est déjà utilisé")
            this.$toast.error(
              "Erreur lors de la connexion : " + error.response.data.msg
            );
          } else {
            this.$toast.error(
              "Erreur lors de la connexion : " + translate[error.response.data.msg]
            );
          }
          setTimeout(this.$toast.clear, 3000);
          this.loading = false
        });
    },
  },
};
</script>
