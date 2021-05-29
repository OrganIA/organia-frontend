<template>
  <div>
    <h1>WALOUUUU</h1>
    <p>{{ id }}</p>
  </div>
</template>

<script>
import http from "../http";

export default {
  name: "EditPanel",
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
          this.user = response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getUserByID();
  },
};
</script>

<style>
</style>