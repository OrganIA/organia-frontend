<template>
  <div id="context-menu">
    <div id="menu-subcontainer">
        <a class="button" href="/login">Se connecter</a>
        <a class="button" href="/register">S'inscrire</a>
        <a class="button" href="/cpanel">Panel administrateur</a>
        <ul id="flash-messages"></ul>
    </div>

  </div>
</template>

<script>
export default {
  name: "TopControls"
}
</script>

<style scoped>

#context-menu {
  background-color: var(--logo-dark-blue);
  max-height: 80px;
  width: 100%;
}

#menu-subcontainer {
  margin-top: 25px;
  margin-left: 20px;
}

#menu-subcontainer > * {
  margin: 50px;
}

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
  padding: 0.6em 5em;
  border: 1px solid black;
  border-radius: var(--rounding);
  background-color: white;
  transition: var(--anim-time) linear;
  text-decoration: none;
  color: inherit;
}

</style>
