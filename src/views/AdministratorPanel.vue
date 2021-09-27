<template>
  <h1>Panel Administrateur</h1>
  <div class="main-container">
    <div class="box_area">
        <router-link
          class="in_box_area"
          to="/administrator/user"
          v-bind:class="{ active: this.$route.path === '/administrator/user' }"
      >
        <h3 class="in_box">Utilisateurs</h3>
      </router-link>
      <router-link
          class="in_box_area"
          to="/administrator/role"
          v-bind:class="{ active: this.$route.path === '/administrator/role' }"
      >
        <h3 class="in_box">Rôles</h3>
      </router-link>
    </div>
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