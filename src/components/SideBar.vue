<template>
  <nav id="navbar" class="reset-bg">
    <div class="sidebar-container cypress-sidebar-container">
      <div id="Admin" tabindex="1" class="block button sidebar-btn cypress-admin-dropdown cypress-admin-menu">
        <i class="fa fa-user-shield cypress-admin-icon" aria-hidden="true"></i>
        <span class="nav-text cypress-admin-title">Administrateur</span>
        <i class="gg-chevron-down cypress-admin-dropdown-icon" aria-hidden="true"></i>
      </div>

      <nav class="admin-menu">
        <router-link class="block button sidebar-btn-dropdown cypress-sidebar-btn-dropdown cypress-to-users" to="/administrator">
          <i class="fa fa-user-shield cypress-admin-icon2" aria-hidden="true"></i>
          <span class="nav-text cypress-admin-texte">Administrateur</span>
        </router-link>
        <router-link class="block button sidebar-btn-dropdown" to="/administrator/role">
          <i class="fa fa-tasks cypress-to-roles" aria-hidden="true"></i>
          <span class="nav-text">Rôles</span>
        </router-link>
      </nav>

      <div id="patients" tabindex="1" class="block button sidebar-btn cypress-patients-menu cypress-patient-gestionary">
        <i class="fa fa-address-card cypress-patient-gestionary-icon" aria-hidden="true"></i>
        <span class="nav-text cypress-patient cypress-patient-gestionary-text">Gestion des patients</span>
        <i class="gg-chevron-down cypress-patient-gestionary-chevron" aria-hidden="true"></i>
      </div>

      <nav class="patients-menu">
        <router-link class="block button sidebar-btn-dropdown cypress-to-receivers cypress-patient-recievers" to="/receivers">
          <i class="fa fa-address-card cypress-patient-recievers-icon"></i>
          <span class="nav-text cypress-patient-recievers-text">Receveurs</span>
        </router-link>
        <router-link class="block button sidebar-btn-dropdown cypress-patient-donors" to="/donors">
          <i class="fa fa-address-card cypress-patient-donors-icon" aria-hidden="true"></i>
          <span class="nav-text cypress-to-donors cypress-patient-donors-text">Donneurs</span>
        </router-link>
      </nav>

      <div id="hopitaux" tabindex="1" class="block button sidebar-btn cypress-hospital">
        <i class="fa fa-address-card cypress-hospital-icon" aria-hidden="true"></i>
        <span class="nav-text cypress-hospital-text">Hôpitaux</span>
        <i class="gg-chevron-down cypress-hospital-chevron" aria-hidden="true"></i>
      </div>

      <nav class="hopitaux-menu">
        <router-link class="block button sidebar-btn-dropdown cypress-map
" to="/searchmap">
          <i class="fas fa-map-marker cypress-to-maps cypress-map-icon"></i>
          <span class="nav-text cypress-map-text">Carte</span>
        </router-link>
        <router-link class="block button sidebar-btn-dropdown cypress-hospital-dropdown
" to="/hospitals">
          <i class="fas fa-hospital-user cypress-to-hospitals cypress-hospital-dropdown-icon"></i>
          <span class="nav-text cypress-hospital-dropdown-text">Hôpitaux</span>
        </router-link>
      </nav>


      <div id="events" tabindex="1" class="block button sidebar-btn cypress-event">
        <i class="fas fa-calendar-alt cypress-event-icon"></i>
        <span class="nav-text cypress-event-text">Évènements</span>
        <i class="gg-chevron-down cypress-event-chevron" aria-hidden="true"></i>
      </div>

      <nav class="events-menu">
        <router-link class="block button sidebar-btn-dropdown cypress-event-calendar" to="/eventcalendar">
          <i class="fas fa-calendar cypress-to-calendar cypress-event-calendar-icon"></i>
          <span class="nav-text cypress-event-calendar-text">Calendrier d'evenements</span>
        </router-link>
        <router-link class="block button sidebar-btn-dropdown cypress-event-list" to="/eventlist">
          <i class="fas fa-list cypress-event-list-icon"></i>
          <span class="nav-text cypress-event-list-text">Liste d'evenements</span>
        </router-link>
      </nav>

      <router-link class="block button sidebar-btn cypress-chat" to="/chat">
        <i class="fas fa-envelope cypress-to-chats cypress-chat-icon"></i>
        <span class="nav-text cypress-chat-text">Chats</span>
      </router-link>

    </div>
  </nav>
</template>

<script>
export default {
  name: "SideBar",
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
  height: calc(var(--btnsize) * 2px);
}

.admin-menu:hover {
  height: calc(var(--btnsize) * 2px);
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
  height: calc(var(--btnsize) * 2px);
}

.patients-menu:hover {
  height: calc(var(--btnsize) * 2px);
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


#hopitaux:focus~.hopitaux-menu {
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



#events:focus~.events-menu {
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
