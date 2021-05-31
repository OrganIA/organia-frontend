<template>
  <div id="context-menu">
    <div id="menu-subcontainer">
      <router-link to="/login" class="button">Se connecter</router-link>
      <router-link to="/register" class="button">S'inscrire</router-link>
      <router-link to="/" class="button">Panel administrateur</router-link>
      <router-link to="/" class="button">Debug</router-link>
      <ul id="flash-messages"></ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopControls",
  methods: {},
};
</script>