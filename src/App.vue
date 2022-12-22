<template>
  <router-view />
</template>

<script>
import translate from "@/translate"

export default {
  name: "App",
  methods: {
    getMe() {
      this.$http.get("/users/me")
        .then((response) => {
          this.$store.commit("login", {
            id: response.data.id,
            email: response.data.email,
            role: response.data.role,
          });
          this.$router.isReady().then(() => {
            if (this.$route.path === "/" || this.$route.path === "/register") {
              this.$router.push("/landing");
            }
          });
        }).catch((error) => {
          console.log(error)
          this.$toast.error(
            "Erreur lors de la connexion : " + translate[error.response.data.msg]
          );
          setTimeout(this.$toast.clear, 3000);
          this.$cookies.remove("token")
          this.$router.push("/");
        })
    },
    logout() {
      this.$cookies.remove("token");
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
  data() {
    return {};
  },
  created() {
    if (this.$cookies.get("token")) {
      this.$http.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${this.$cookies.get("token")}`;
      this.getMe();
    } else {
      this.$router.isReady().then(() => {
        if (this.$route.path != "/register" && this.$route.path != "/" && this.$route.path != "/vitrine")
          this.$router.push("/");
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