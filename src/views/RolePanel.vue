<template>
  <h1>Panel Administrateur</h1>
  <h2 class="align-left">Gestion des Rôles</h2>
  <div class="main-container">
    <table class="table-list">
      <thead>
      <tr>
        <th>Rôle</th>
        <th>Gestion des Utilisateurs</th>
        <th>Gestion des Personnes</th>
        <th>Gestion des Rôles</th>
        <th>Gestion des Hopitaux</th>
      </tr>
      </thead>
      <tbody>
      <!-- <tr v-for="role in roles" :key="role">
        <td>{{ role.name }}</td>
        <input type="checkbox">
        <input type="checkbox">
        <input type="checkbox">
        <input type="checkbox">
      </tr> -->
      <tr v-for="role in myJson" :key="role">
        <td>{{ role.name }}</td>
        <td><input type="checkbox"></td>
        <td><input type="checkbox"></td>
        <td><input type="checkbox"></td>
        <td><input type="checkbox"></td>
      </tr>
      </tbody>
    </table>
  </div>
  <input type="submit">
</template>

<script>
import json from './../test.json'
export default {
  name: "RolePanel",
  data() {
    return {
      roles: {},
      role: {},
      myJson: json,
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    getRoles() {
    //   this.$http
    //     .get(`/roles/${this.$store.getters.getRoleID}`, {
    //       headers: { Authorization: `Bearer ${this.$cookies.get("token")}` },
    //     })
    //     .then((response) => {
    //       this.roles = response.data;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    },
  },
};
</script>

<style scoped>
</style>