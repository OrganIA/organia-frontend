<template>
  <div>
    <p>Register page</p>
    <form @submit.prevent="register()">
      <input v-model="name" placeholder="name" type="text" />
      <input v-model="email" placeholder="email" type="email" />
      <input type="password" />
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import http from "../http";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      http
        .post("/users/", {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.login()
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
