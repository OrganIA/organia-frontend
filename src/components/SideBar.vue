<template>
  <nav id="navbar" class="reset-bg">
    <header>
      <h1>
        <router-link to="/">
          <img id="navbar-logo"
            src="https://cdn.discordapp.com/attachments/559512661717417986/784449164955746314/Asset_8.png" />
        </router-link>
      </h1>
    </header>
    <UserDropdown @logout="handle_logout" />
    <div id="navlinks">
      <router-link class="block button is-info" to="/receivers">
        <i class="fa fa-address-card"></i>
        <span class="nav-text cypress-to-receivers">Receveurs</span>
      </router-link>
      <router-link class="block button is-info" to="/donors">
        <i class="fa fa-address-card" aria-hidden="true"></i>
        <span class="nav-text cypress-to-donors">Donneurs</span>
      </router-link>
      <router-link class="block button is-info" to="/dialyse">
        <i class="fas fa-address-card"></i>
        <span class="nav-text">Liste des Dialysés</span>
      </router-link>
      <router-link class="block button is-info" to="/tumor">
        <i class="fas fa-address-card"></i>
        <span class="nav-text">Liste des Tumeurs</span>
      </router-link>
      <router-link class="block button is-info" to="/administrator">
        <i class="fa fa-user-shield" aria-hidden="true"></i>
        <span class="nav-text">Administrateur</span>
      </router-link>
      <router-link class="block button is-info" to="/invitations">
        <i class="fa fa-user-shield" aria-hidden="true"></i>
        <span class="nav-text">Invitations</span>
      </router-link>
      <router-link class="block button is-info" to="/administrator/role">
        <i class="fa fa-tasks cypress-to-roles" aria-hidden="true"></i>
        <span class="nav-text">Rôles</span>
      </router-link>
      <router-link class="block button is-info" to="/actions">
        <i class="fas fa-terminal cypress-to-logs"></i>
        <span class="nav-text">Historique d'actions</span>
      </router-link>
      <router-link class="block button is-info" to="/eventcalendar">
        <i class="fas fa-calendar cypress-to-calendar"></i>
        <span class="nav-text">Calendrier d'evenements</span>
      </router-link>
      <router-link class="block button is-info" to="/eventlist">
        <i class="fas fa-list cypress-to-eventlist"></i>
        <span class="nav-text">Liste d'evenements</span>
      </router-link>
      <router-link class="block button is-info" to="/chat">
        <i class="fas fa-envelope cypress-to-chats"></i>
        <span class="nav-text">Chats</span>
      </router-link>
      <router-link class="block button is-info" to="/searchmap">
        <i class="fas fa-map-marker cypress-to-maps"></i>
        <span class="nav-text">Carte</span>
      </router-link>
      <router-link class="block button is-info" to="/hospitals">
        <i class="fas fa-hospital-user cypress-to-hospitals"></i>
        <span class="nav-text">Hôpitaux</span>
      </router-link>
    </div>
  </nav>
</template>

<script>

import UserDropdown from "@/components/UserDropdown";

export default {
  components: { UserDropdown },
  name: "SideBar",
  emits: ["logout"],
  methods: {
    handle_logout() {
      this.$emit("logout");
    },
  },
};
</script>

<style scoped>

.nav-text {
    margin-left: 10px;
}

#navlinks {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 20px;
    margin-top: 50%;
    font-size: var(--font-big);
}

#navbar header {
    background-color: var(--logo-dark-blue);
    border-radius: 30px;
    color: white;
    padding: 0 0.5em;
    text-align: center;
    align-content: center;
    width: 80%;
    margin: 20px auto auto;
}

#navbar header a {
    color: inherit;
    text-decoration: none;
}

#navbar {
    display: flex;
    flex-direction: column;
    width: 300px;
}

#navbar header img {
    max-height: 180px;
    max-width: 200px;
}

.reset-bg {
    background-color: white;
}

</style>
