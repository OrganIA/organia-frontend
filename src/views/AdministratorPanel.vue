<template>
  <h1>Panel Administrateur</h1>
  <div class="main-container">
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-info">
      <thead>
      <tr>
        <th>Id</th>
        <th>Prénom</th>
        <th>Nom</th>
        <th>Mail</th>
        <th>Date de création</th>
        <th>Dernière modification</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user" v-on:click="loadSelectedUser(user.id)" v-bind:class="{ 'is-selected':  user.id === $data.user.id}">
        <td v-bind:class="{ 'selected-element':  user.id === $data.user.id}">{{ user.id }}</td>
        <td v-bind:class="{ 'selected-element':  user.id === $data.user.id}">{{ user.person ? user.person.first_name : "-" }}</td>
        <td v-bind:class="{ 'selected-element':  user.id === $data.user.id}">{{ user.person ? user.person.last_name : "-" }}</td>
        <td v-bind:class="{ 'selected-element':  user.id === $data.user.id}">{{ user.email }}</td>
        <td v-bind:class="{ 'selected-element':  user.id === $data.user.id}">{{ user.created_at }}</td>
        <td v-bind:class="{ 'selected-element':  user.id === $data.user.id}">{{ user.updated_at }}</td>
        <td v-bind:class="{ 'selected-element':  user.id === $data.user.id}">
          <router-link :to="`/administrator/edit/user/${user.id}`" class="button is-primary">
            <i class="fas fa-edit"></i>
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AdministratorPanel",
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>