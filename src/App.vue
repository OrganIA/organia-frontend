<template>
  <div class="main-container">
    <SideBar />
    <TopControls />
  </div>
  <router-view />
</template>

<script>
import SideBar from "./components/SideBar";
import TopControls from "./components/TopControls";
import http from "./http";

export default {
  name: "App",
  components: { SideBar, TopControls },
  methods: {
    login() {
      http
        .get("/users/me", {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        })
        .then((response) => {
          this.$store.commit(
            "login",
            response.data.email,
            response.data.name,
          );
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  data() {
    return {};
  },
  created() {
    if (this.$cookies.get("token")) {
      this.login();
    } else {
      this.$router.push('/login')
    }
  },
};
</script>