<template>
  <router-view @login="handleLogin" />
</template>

<script>

export default {
  name: "App",
  methods: {
    getRole(data) {
      this.$http
        .get(`/roles/${data.role_id}`)
        .then((response) => {
          this.$toast.success("Connexion réussie !");
          setTimeout(this.$toast.clear, 3000);
          this.logged_in = true;
          this.$store.commit("login", {
            id: data.id,
            email: data.email,
            role: response.data,
          });
          this.$emit("login", true);
  //        <div class="main-container" :class="{ 'background-white': logged_in }">
  //            <SideBar v-if="logged_in" @logout="logout" />
  //            <div
  //        class="secondary-container"
  //      :class="{
  //        'background-transparent': !logged_in,
  //            'background-white': logged_in,
  //      }"
  //    >
  //    <router-view @login="handleLogin" />
  //        </div>
  //  </div>
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
        .get("/users/me")
        .then((response) => {
          this.getRole(response.data);
        })
        .catch((error) => {
          console.log(error.response);
          this.$cookies.remove("token");
          this.$router.push("/home");
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
      this.$router.push("/home");
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
        { can_invite: false },
      ],
    };
  },
  created() {
    if (this.$cookies.get("token")) {
      this.$http.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${this.$cookies.get("token")}`;
      this.login();
    } else {
      this.$router.isReady().then(() => {
        if (this.$route.path != "/register" && this.$route.path != "/home" && this.$route.path != "/team")
          this.$router.push("/home");
      });
    }
  },
};
</script>

<style scoped>

.secondary-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 3%;
    max-width: 79%;
}

.background-transparent {
    background-color: transparent;
}

.background-white {
    background-color: white;
}
</style>