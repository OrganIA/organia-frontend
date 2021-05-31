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
          this.$router.push("/");
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css");

:root {
  --blue: #498afe;
  --dark-blue: #071f49;
  --sky-blue: #97a0b8;
  --white: #fbfcff;
  --red: #ff5b5b;
  --gray: #8e8e8e;
  --green: #a4ea98;
  --yellow: #eff269;
  --light-gray: #eff2f8;

  --logo-dark-blue: #0f2c59;
  --logo-light-blue: #29abe2;

  --bg-color: var(--white);
  --fg-color: var(--dark-blue);
  --border-color: #e3e9f6;

  --font-immense: 38px;
  --font-big: 21px;
  --font-normal: 16px;
  --font-small: 12px;
  --font-regular: 400;
  --font-medium: 500;

  --rounding: 0.75em;

  --anim-time: 0.25s;

  --shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-container {
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
}
</style>