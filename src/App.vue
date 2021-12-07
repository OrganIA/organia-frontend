<template>
  <div class="main-container">
    <SideBar v-if="logged_in" @logout="logout" />
    <div class="secondary-container">
      <router-view @login="handleLogin" />
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar";
import http from "./http";

export default {
  name: "App",
  components: { SideBar },
  methods: {
    getRole(data) {
      this.$http
        .get(`/roles/${data.role_id}`)
        .then((response) => {
          this.$toast.success("Connexion réussie !");
          setTimeout(this.$toast.clear, 3000);
          this.logged_in = true;
          this.$store.commit("login", { id: data.id,email: data.email, role: response.data });
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
      http
        .get("/users/me")
        .then((response) => {
          this.getRole(response.data);
        })
        .catch((error) => {
          console.log(error.response);
          this.$cookies.remove("token");
          this.$router.push("/login");
          this.$toast.error(
            "Erreur lors de la connexion : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    handleLogin() {
      this.logged_in = true;
    },
    logout() {
      this.logged_in = false;
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
  data() {
    return {
      logged_in: false,
      role: [
        { can_manage_users: false },
        { can_manage_persons: false },
        { can_manage_roles: false },
        { can_manage_hospitals: false },
        { can_invite: false }
      ],
    };
  },
  created() {
    if (this.$cookies.get("token")) {
      http.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${this.$cookies.get("token")}`;
      this.login();
    } else {
      this.$router.isReady().then(() => {
        if (this.$route.path != "/register" && this.$route.path != "/login")
          this.$router.push("/login");
      });
    }
  },
};
</script>