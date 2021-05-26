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

</style>