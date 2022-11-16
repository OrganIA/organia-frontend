<template>
  <div class="centered-container">
    <form @submit.prevent="login()" class="login-form">
      <div class="navbar-brand logo-placeholder"
           :class="{ 'is-invisible-correction': this.$route.path === '/' || '/' }">
        <div class="navbar-item logo">
          <img src="https://cdn.discordapp.com/attachments/559512661717417986/843782837072297994/Asset_9.png" alt="logo"
               class="logo-img-align">
        </div>
      </div>
      <div class="content">
        <h2>Se connecter</h2>
      </div>
      <div class="field first-field">
        <div class="control">
          <input v-model="email" placeholder="email" type="email" class="cypress-email input" required />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input v-model="password" placeholder="mot de passe" type="password" class="cypress-password input"
            required />
        </div>
        <router-link to="/passwd-reset" class="cypress-to-passwd-reset is-link passwd-reset-link">Mot de passe oublié</router-link>

      </div>


      <button type="submit" class="cypress-login button is-info confirm-btn">
        Confirmer
      </button>
      <router-link to="/register" class="cypress-to-register button is-link is-hidden">S'inscrire</router-link>
    </form>
  </div>
  <footer class="footer login-footer">
    <a href="https://www.agence-biomedecine.fr/"
       class="navbar-item button is-medium is-info is-light navbar-home-controller">
      Site de l'agence de biomédecine
    </a>
    <router-link to="/useorgania" class="navbar-item button is-medium is-info is-light navbar-home-controller">
      Utiliser la plateforme
    </router-link>

    <router-link to="/vitrine" class="navbar-item button is-medium is-info is-light navbar-home-controller">
      Le projet
    </router-link>

    <router-link to="/login" class="navbar-item button is-medium is-info is-light navbar-home-controller">
      Connexion
    </router-link>
  </footer>
</template>

<script>
import translate from "@/translate"

export default {
  name: "login",
  emits: ["login"],
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
          this.$router.push("/landing");
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

<style scoped>
.field {
  margin-top: 40px;
}

.login-form {
  margin-top: 50px;
  width: 70%;
}

.confirm-btn {
  margin-left: 76%;
}
.passwd-reset-link {
  margin-top: 20px;
  float: left;
}
.login-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0;
  background-color: #EFF5FB;
}
.navbar-home-controller {
  width: 300px;
  font-size: 0.8rem;
  margin-left: 40%;
}

.logo-placeholder {
  width: 100%;
  height: 70%;
  justify-content: center;
}


.logo {
  background-color: #0e2536;
  border-radius: 20px;
  text-align: center;
  align-content: center;
  width: 17.5vw;
  height: 100%;
  margin-bottom: 20px;
  vertical-align: center;
}
.first-field {
  margin-top: 20px;
}
</style>
