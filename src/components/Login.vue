<template>
  <div>
    <p>Login page</p>
    <form @submit.prevent="login()">
      <input v-model="email" placeholder="email" type="email" />
      <input v-model="password" type="password" />
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import http from "../http";

export default {
  name: "Login",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      http
        .post("/auth", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.$store.commit("login", this.email, this.name)
          this.$cookies.set("token", response.data.token, -1)
          this.$router.push("/")
        }).catch((error) => {
          console.log(error)
        });
    },
  },
};
</script>
