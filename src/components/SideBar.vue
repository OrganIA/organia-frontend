<template>
  <nav id="navbar" class="reset-bg">
    <div class="sidebar-container">
      <div id="Admin" tabindex="1" class="block button sidebar-btn">
        <i class="fa fa-user-shield" aria-hidden="true"></i>
        <span class="nav-text">Administrateur</span>
        <i class="gg-chevron-down" aria-hidden="true"></i>
      </div>

      <nav class="admin-menu">
        <router-link class="block button  sidebar-btn-dropdown" to="/administrator">
          <i class="fa fa-user-shield" aria-hidden="true"></i>
          <span class="nav-text">Administrateur</span>
        </router-link>
        <router-link class="block button sidebar-btn-dropdown" to="/actions">
          <i class="fas fa-terminal cypress-to-logs"></i>
          <span class="nav-text">Historique d'actions</span>
        </router-link>
        <router-link class="block button sidebar-btn-dropdown" to="/administrator/role">
          <i class="fa fa-tasks cypress-to-roles" aria-hidden="true"></i>
          <span class="nav-text">Rôles</span>
        </router-link>
      </nav>

      <div id="patients" tabindex="1" class="block button sidebar-btn">
        <i class="fa fa-address-card" aria-hidden="true"></i>
        <span class="nav-text">Gestion des patients</span>
        <i class="gg-chevron-down" aria-hidden="true"></i>
      </div>

      <nav class="patients-menu">
        <router-link class="block button sidebar-btn-dropdown" to="/receivers">
          <i class="fa fa-address-card"></i>
          <span class="nav-text cypress-to-receivers">Receveurs</span>
        </router-link>
        <router-link class="block button sidebar-btn-dropdown" to="/donors">
          <i class="fa fa-address-card" aria-hidden="true"></i>
          <span class="nav-text cypress-to-donors">Donneurs</span>
        </router-link>
        <router-link class="block button sidebar-btn-dropdown" to="/dialyse">
          <i class="fas fa-address-card"></i>
          <span class="nav-text">Liste des Dialysés</span>
        </router-link>
        <router-link class="block button sidebar-btn-dropdown" to="/tumor">
          <i class="fas fa-address-card"></i>
          <span class="nav-text">Liste des Tumeurs</span>
        </router-link>
      </nav>

      <div id="hopitaux" tabindex="1" class="block button sidebar-btn">
        <i class="fa fa-address-card" aria-hidden="true"></i>
        <span class="nav-text">Hôpitaux</span>
        <i class="gg-chevron-down" aria-hidden="true"></i>
      </div>

      <nav class="hopitaux-menu">
        <router-link class="block button sidebar-btn-dropdown
" to="/searchmap">
          <i class="fas fa-map-marker cypress-to-maps"></i>
          <span class="nav-text">Carte</span>
        </router-link>
        <router-link class="block button sidebar-btn-dropdown
" to="/hospitals">
          <i class="fas fa-hospital-user cypress-to-hospitals"></i>
          <span class="nav-text">Hôpitaux</span>
        </router-link>
      </nav>


      <div id="events" tabindex="1" class="block button sidebar-btn">
        <i class="fas fa-calendar-alt"></i>
        <span class="nav-text">Évènements</span>
        <i class="gg-chevron-down" aria-hidden="true"></i>
      </div>

      <nav class="events-menu">
        <router-link class="block button sidebar-btn-dropdown" to="/eventcalendar">
          <i class="fas fa-calendar cypress-to-calendar"></i>
          <span class="nav-text">Calendrier d'evenements</span>
        </router-link>
        <router-link class="block button sidebar-btn-dropdown" to="/eventlist">
          <i class="fas fa-list cypress-to-eventlist"></i>
          <span class="nav-text">Liste d'evenements</span>
        </router-link>
      </nav>

      <router-link class="block button sidebar-btn" to="/invitations">
        <i class="fa fa-user-shield" aria-hidden="true"></i>
        <span class="nav-text">Invitations</span>
      </router-link>


      <router-link class="block button sidebar-btn" to="/chat">
        <i class="fas fa-envelope cypress-to-chats"></i>
        <span class="nav-text">Chats</span>
      </router-link>

    </div>
    <!--




!-->
  </nav>
</template>

<script>
export default {
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
  text-decoration: none;
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


.sidebar-btn {
  width: 100%;
  height: 75px;
  border-radius: 0;
  background-color: #EFF5FB;
  border: none;
  padding: 0;
  margin: 0;
  justify-content: flex-start;
  padding-left: 25px;
  color: #00406e;
}

.sidebar-btn-dropdown {
  width: 100%;
  height: 75px;
  border-radius: 0;
  background-color: #d7e7f5;
  border: none;
  padding: 0;
  margin: 0;
  justify-content: flex-start;
  padding-left: 60px;
  text-decoration: none;
  color: #00406e;

}
.sidebar-btn-dropdown:hover {

  background-color: #bdd7ec;


}

.sidebar-btn:hover {
  background-color: #beccda;

}

.sidebar-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  font-size: var(--font-big);
  max-width: 99%;

}

#Admin:focus ~ .admin-menu {
  height: calc(var(--btnsize) * 3px);
}

.admin-menu:hover {
  height: calc(var(--btnsize) * 3px);
}


.admin-menu {
  width: 100%;
  background-color: #EFF5FB;
  margin: 0;
  display: -ms-grid;
  display: grid;
  grid-template-rows: 1fr repeat(4, 0.5fr);
  padding: 0;
  list-style: none;
  clear: both;
  width: auto;
  text-align: center;
  height: 0px;
  overflow: hidden;
  transition: height .9s ease;
  z-index: 120;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}


#patients:focus ~ .patients-menu {
  height: calc(var(--btnsize) * 4px);
}

.patients-menu:hover {
  height: calc(var(--btnsize) * 4px);
}

.patients-menu {
  width: 100%;
  background-color: #EFF5FB;
  margin: 0;
  display: -ms-grid;
  display: grid;
  grid-template-rows: 1fr repeat(4, 0.5fr);
  padding: 0;
  list-style: none;
  clear: both;
  width: auto;
  text-align: center;
  height: 0px;
  overflow: hidden;
  transition: height .9s ease;
  z-index: 120;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}


#hopitaux:focus ~ .hopitaux-menu {
  height: calc(var(--btnsize) * 2px);
}

.hopitaux-menu:hover {
  height: calc(var(--btnsize) * 2px);
}

.hopitaux-menu {
  width: 100%;
  background-color: #EFF5FB;
  margin: 0;
  display: -ms-grid;
  display: grid;
  grid-template-rows: 1fr repeat(4, 0.5fr);
  padding: 0;
  list-style: none;
  clear: both;
  width: auto;
  text-align: center;
  height: 0px;
  overflow: hidden;
  transition: height .9s ease;
  z-index: 120;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}



#events:focus ~ .events-menu {
  height: calc(var(--btnsize) * 2px);
}

.events-menu:hover {
  height: calc(var(--btnsize) * 2px);
}

.events-menu {
  width: 100%;
  background-color: #EFF5FB;
  margin: 0;
  display: -ms-grid;
  display: grid;
  grid-template-rows: 1fr repeat(4, 0.5fr);
  padding: 0;
  list-style: none;
  clear: both;
  width: auto;
  text-align: center;
  height: 0px;
  overflow: hidden;
  transition: height .9s ease;
  z-index: 120;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.gg-chevron-down {
  box-sizing: border-box;
  position: absolute;
  display: block;
  width: 22px;
  height: 22px;
  border: 3px solid transparent;
  border-radius: 100px;
  right: 0;
  margin-right: 50px;

}

.gg-chevron-down::after {
  content: "";
  display: block;
  box-sizing: border-box;
  position: relative;
  margin-left: 20px;
  margin-top: -10px;
  width: 20px;
  height: 20px;
  border-bottom: 2px solid;
  border-right: 2px solid;
  transform: rotate(45deg);
  left: 4px;
  top: 2px;

}
.sidebar-btn:focus {
  box-shadow: none;
  outline: none;
  border: none;
}


</style>
