<template>
  <div class="main-container">
    <SideBar v-if="logged_in" />
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
          this.$store.commit("login", response.data.email, response.data.name);
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
      this.$router.push("/login");
    }
  },
};
</script>