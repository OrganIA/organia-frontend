<template>
  <nav class="navbar base-navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand logo-placeholder">
      <div class="navbar-item logo">
        <img src="https://cdn.discordapp.com/attachments/559512661717417986/784449164955746314/Asset_8.png" alt="logo"
          class="logo-img-align">
      </div>
    </div>
    <div id="navbarBasicExample" class="navbar-menu main-menu-navbar">
      <div class="navbar-start navbar-correction">
        <a href="https://www.agence-biomedecine.fr/" class="navbar-item button is-medium is-info is-light">
          Site de l'agence de biomédecine
        </a>
        <router-link to="/useorgania" class="navbar-item button is-medium is-info is-light">
          Utiliser la plateforme
        </router-link>

        <router-link to="/abouttheproject" class="navbar-item button is-medium is-info is-light">
          Le projet
        </router-link>
      </div>
    </div>
    <article class="message is-info presentation-message">
      <div class="message-body">
        Bienvenue sur le portail de connexion d'OrganIA : la plateforme de matching entre donneur et receveur d'organe.
        <br>
        Si vous possédez un nom d'utilisateur et un mot de passe attitré, connectez vous directement via ce portail,
        sinon,
        faites une demande d'inscription!
      </div>
    </article>
  </nav>
</template>
<script>

export default {
  name: "presentation-navbar",
}
</script>

<style scoped>
</style>