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
    login() {
      http
        .get("/users/me")
        .then((response) => {
          this.$store.commit("login", response.data.email, response.data.name, response.data.role_id);
          this.logged_in = true;
        })
        .catch((error) => {
          console.log(error.response);
          this.$cookies.remove("token");
          this.$router.push("/login");
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