<template>
  <nav class="navbar base-navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand logo-placeholder">
      <div class="navbar-item logo">
        <img src="https://cdn.discordapp.com/attachments/559512661717417986/843782837072297994/Asset_9.png"
             alt="logo" class="logo-img-align">
      </div>
    </div>
    <div id="navbarBasicExample" class="navbar-menu main-menu-navbar  is-active">
      <div class="navbar-start start-from-end-hor navbar-home-controllers">
        <a href="https://www.agence-biomedecine.fr/" class="navbar-item button is-medium is-info is-light navbar-home-controller">
          Site de l'agence de biomédecine
        </a>
        <router-link to="/useorgania" class="navbar-item button is-medium is-info is-light navbar-home-controller">
          Utiliser la plateforme
        </router-link>

        <router-link to="/abouttheproject" class="navbar-item button is-medium is-info is-light navbar-home-controller">
          Le projet
        </router-link>
      </div>
    </div>

  </nav>
</template>
<script>

export default {
  name: "PresentationNavbar",
}
//<article className="message is-info presentation-message">
//  <div className="message-body">
//    Bienvenue sur le portail de connexion d'OrganIA : la plateforme de matching entre donneur et receveur d'organe.
//    <br>
//      Si vous possédez un nom d'utilisateur et un mot de passe attitré, connectez vous directement via ce portail,
//      sinon,
//      faites une demande d'inscription!
//  </div>
//</article>
</script>

<style scoped>

.presentation-message {
    position: absolute;
    top: 26.8vh;
    width: 17.5vw;
    margin-left: 50px;
}

</style>