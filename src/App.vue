<template>
  <div class="main-container">
    <SideBar />
    <div class="secondary-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar";
import http from "./http";

export default {
  name: "App",
  components: { SideBar},
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