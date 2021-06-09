<template>
  <table class="table-list">
    <thead>
    <tr>
      <th>Id</th>
      <th>Nom</th>
      <th>Mail</th>
      <th>Date de création</th>
      <th>Dernière modification</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users" :key="user">
      <td>{{ user.id }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.created_at }}</td>
      <td>{{ user.updated_at }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import http from "../http";

export default {
  name: "AdministratorPanel",
  data() {
    return {
      users: {},
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      http
          .get("/users", {
            headers: { Authorization: `Bearer ${this.$cookies.get("token")}` },
          })
          .then((response) => {
            response.data.forEach((element) => {
              element.created_at = new Date(element.created_at).toDateString();
            });
            this.users = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
}
</script>

<style scoped>

</style>