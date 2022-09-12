<template>
  <nav class="navbar base-navbar" role="navigation" aria-label="main navigation">
    <div>
      <router-link to="/home" class="button is-danger return-btn is-large" v-bind:class="{ 'is-invisible': this.$route.path === '/home' || '/'}">Retour</router-link>
    </div>
    <div class="navbar-brand logo-placeholder"  v-bind:class="{ 'is-invisible-correction': this.$route.path === '/home' || '/' }">
      <div class="navbar-item logo">
        <img src="https://cdn.discordapp.com/attachments/559512661717417986/843782837072297994/Asset_9.png"
             alt="logo" class="logo-img-align">
      </div>
    </div>
    <div id="navbarBasicExample" class="navbar-menu main-menu-navbar is-active">
      <div class="navbar-start start-from-end-hor navbar-home-controllers">
        <a href="https://www.agence-biomedecine.fr/" class="navbar-item button is-medium is-info is-light navbar-home-controller">
          Site de l'agence de biomédecine
        </a>
        <router-link to="/useorgania" class="navbar-item button is-medium is-info is-light navbar-home-controller">
          Utiliser la plateforme
        </router-link>

        <router-link to="/vitrine" class="navbar-item button is-medium is-info is-light">
          Le projet
        </router-link>

        <router-link to="/login" class="navbar-item button is-medium is-info is-light navbar-home-controller">
          Connexion
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

.base-navbar {
  height: 12vh;
  width: 100%;
  background-color: #EFF5FB;
}


.logo-placeholder {
  position: relative;
  width: 10%;
  height: 70%;
  vertical-align: center;
  margin-left: 5%;
}


.logo {
  background-color:  #0e2536;
  border-radius: 20px;
  text-align: center;
  align-content: center;
  width: 17.5vw;
  height: 100%;
  vertical-align: center;
  margin-top: 10%;
}
.start-from-end-hor {
  float: right;
}
.presentation-message {
  position: absolute;
  top: 26.8vh;
  width: 17.5vw;
  margin-left: 50px;
}

.navbar-home-controllers {
  margin-right: 40%;
  align-items: center;
}

.navbar-home-controller {
  position: relative;
  border-radius: 0;
  width: 45%;
  height: 100%;
  padding-left: 10%;
  padding-right: 10%;
}

.return-btn {
  margin-top: 20%;
  margin-left: 40%;
}


.is-invisible-correction {
  margin-left: 0;
}
</style>
