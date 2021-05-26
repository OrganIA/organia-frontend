<template>
  <div id="context-menu">
    <div id="login-menu">
      <a class="button" href="/login">Se connecter</a>
      <a class="button" href="/register">S'inscrire</a>
    </div>
    <div id="extra-buttons">
      <a class="button" href="/cpanel">Panel administrateur</a>
    </div>
    <ul id="flash-messages"></ul>
  </div>
</template>

<script>
export default {
  name: "TopControls"
}
</script>

<style scoped>
#flash-messages {
  width: 100%;
}

#flash-messages li {
  background-color: var(--dark-blue);
  color: white;
  padding: 0.5em 1em;
  border-radius: var(--rounding);
}

input,
button,
select,
.button,
.button:visited {
  padding: 0.3em 1em;
  border: 1px solid var(--sky-blue);
  border-radius: var(--rounding);
  background-color: white;
  transition: var(--anim-time) linear;
  text-decoration: none;
  color: inherit;
}

</style>
