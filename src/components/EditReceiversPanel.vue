<template>
  <div>
    <router-link to="/receivers">Back</router-link>
    <form class="form-fields" @submit.prevent="submitForm()">
      <input class="form-input" type="text" v-model="user.name" />
      <input class="form-input" type="email" v-model="user.email" />
      <input class="form-input" type="password" v-model="user.password" />
      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
import http from "../http";

export default {
  name: "EditReceiversPanel",
  props: {
    id: String,
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    getUserByID() {
      http
        .get(`/users/${this.id}`)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm() {
      http.post(`/users/${this.id}`, {
        headers: {
          Autorization: `Bearer ${this.$cookies.get("token")}`,
        },
        params: {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        },
      });
    },
  },
  created() {
    this.getUserByID();
  },
};
</script>