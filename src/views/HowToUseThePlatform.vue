<template>
  <nav class="navbar base-navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand logo-placeholder">
      <div class="navbar-item logo">
        <img src="https://cdn.discordapp.com/attachments/559512661717417986/784449164955746314/Asset_8.png" alt="logo"
          class="logo-img-align">
      </div>
    </div>
    <div id="navbarBasicExample" class="navbar-menu main-menu-navbar">
      <div class="navbar-start navbar-correction-tutorial">
        <router-link to="/login" class="navbar-item button is-medium is-danger is-large">
          Retour
        </router-link>
      </div>
    </div>
  </nav>

  <div class="tutorial-container">
    <div class="tabs is-boxed is-large is-toggle ml-6 pl-1 tab-container">
      <ul>
        <li class="tutorial-tab" :class="{ 'is-active': isActive === 'plateforme' }"><a
            @click="isActive = 'plateforme'">La
            plateforme</a></li>
        <li class="tutorial-tab" :class="{ 'is-active': isActive === 'connexion' }"><a
            @click="isActive = 'connexion'">Se connecter</a></li>
        <li class="tutorial-tab" :class="{ 'is-active': isActive === 'receveurs' }"><a
            @click="isActive = 'receveurs'">Gestion des receveurs</a></li>
        <li class="tutorial-tab" :class="{ 'is-active': isActive === 'donneurs' }"><a
            @click="isActive = 'donneurs'">Gestion des donneurs</a></li>
        <li class="tutorial-tab" :class="{ 'is-active': isActive === 'invitations' }"><a
            @click="isActive = 'invitations'">Invitations</a></li>
        <li class="tutorial-tab" :class="{ 'is-active': isActive === 'askRights' }"><a
            @click="isActive = 'askRights'">Droits supplémentaires</a></li>
        <li class="tutorial-tab" :class="{ 'is-active': isActive === 'chats' }"><a
            @click="isActive = 'chats'">Messagerie</a></li>
        <li class="tutorial-tab" :class="{ 'is-active': isActive === 'panneau_admin' }"><a
            @click="isActive = 'panneau_admin'">Panel Administrateur</a></li>
        <li class="tutorial-tab" :class="{ 'is-active': isActive === 'logs' }"><a
            @click="isActive = 'logs'">Gérer les journaux</a></li>
        <li class="tutorial-tab" :class="{ 'is-active': isActive === 'support' }"><a
            @click="isActive = 'support'">Contacter le support</a></li>

      </ul>
    </div>
    <div class="tab-contents">
      <Plateforme @changePanel="updatePanel" :class="{ 'is-active': isActive === 'plateforme' }"></Plateforme>
      <Receveurs @changePanel="updatePanel" :class="{ 'is-active': isActive === 'receveurs' }"></Receveurs>
      <Donneurs @changePanel="updatePanel" :class="{ 'is-active': isActive === 'donneurs' }"></Donneurs>
      <Connexion @changePanel="updatePanel" :class="{ 'is-active': isActive === 'connexion' }"></Connexion>
      <Invitations @changePanel="updatePanel" :class="{ 'is-active': isActive === 'invitations' }"></Invitations>
      <DroitsSupplementaires @changePanel="updatePanel" :class="{ 'is-active': isActive === 'askRights' }">
      </DroitsSupplementaires>
      <Messagerie @changePanel="updatePanel" :class="{ 'is-active': isActive === 'chats' }"></Messagerie>
      <PanneauAdmin @changePanel="updatePanel" :class="{ 'is-active': isActive === 'panneau_admin' }">
      </PanneauAdmin>
      <GestionLogs @changePanel="updatePanel" :class="{ 'is-active': isActive === 'logs' }"></GestionLogs>
      <ContacterSupport @changePanel="updatePanel" :class="{ 'is-active': isActive === 'support' }">
      </ContacterSupport>
    </div>
  </div>

</template>

<script>
import Plateforme from "@/Tutorials/Plateforme";
import Messagerie from "@/Tutorials/Messagerie";
import Receveurs from "@/Tutorials/Receveurs";
import Donneurs from "@/Tutorials/Donneurs";
import Connexion from "@/Tutorials/Connexion";
import DroitsSupplementaires from "@/Tutorials/DroitsSupplementaires";
import Invitations from "@/Tutorials/Invitations";
import PanneauAdmin from "@/Tutorials/PanneauAdmin";
import ContacterSupport from "@/Tutorials/ContacterSupport";
import GestionLogs from "@/Tutorials/GestionLogs";

export default {
  name: "how-to-use-the-platform",
  components: {
    Plateforme, Messagerie, DroitsSupplementaires, Receveurs, Donneurs, Connexion, Invitations, PanneauAdmin,
    ContacterSupport, GestionLogs
  },

  data() {
    return {
      isActive: "plateforme",
    }
  },
  methods: {
    updatePanel(newpanel) {
      this.isActive = newpanel
    }
  }
}
</script>

<style scoped>

.tutorial-container {
    margin-top: 50px;
    padding-top: 20px;
    width: 100vw;
    background-color: white;
    display: flex;
}

.tabs ul {
    -webkit-flex-direction: column;
    flex-direction: column;
    align-content: start;
    min-width: 100%;
}

.tutorial-tab {
    width: 320px;
    margin-top: 15px;
    overflow-x: hidden;
}

.tab-container {
    min-width: 330px;
}

</style>