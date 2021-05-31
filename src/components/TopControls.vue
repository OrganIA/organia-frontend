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

<style scoped>
#context-menu {
  max-height: 80px;
  width: 100%;
}

#menu-subcontainer {
  margin-top: 25px;
  margin-left: -400px;
}

#menu-subcontainer > * {
  margin: 20px;
}

#flash-messages {
  width: 100%;
}

#flash-messages li {
  color: white;
  padding: 0.5em 1em;
  border-radius: var(--rounding);
}

input,
button,
select,
.button,
.button:visited {
  padding: 0.6em 5em;
  border: 1px solid black;
  border-radius: var(--rounding);
  background-color: white;
  transition: var(--anim-time) linear;
  text-decoration: none;
  color: inherit;
}
</style>
