<template>
  <nav id="navbar">
    <header>
      <h1>
        <router-link to="/">
          <img
            id="navbar-logo"
            src="https://cdn.discordapp.com/attachments/559512661717417986/784449164955746314/Asset_8.png"
          />
        </router-link>
      </h1>
    </header>
    <div id="navlinks">
      <router-link class="block button is-info" to="/receivers">
        <i class="fa fa-address-card"></i>
        <span class="nav-text cypress-to-receivers">Receveurs</span>
      </router-link>
      <router-link class="block button is-info" to="/donors">
        <i class="fa fa-address-card" aria-hidden="true"></i>
        <span class="nav-text cypress-to-donors">Donneurs</span>
      </router-link>
      <router-link class="block button is-info" to="/administrator">
        <i class="fa fa-user-shield" aria-hidden="true"></i>
        <span class="nav-text">Administrateur</span>
      </router-link>
      <router-link class="block button is-info" to="/administrator/role">
        <i class="fa fa-tasks cypress-to-roles" aria-hidden="true"></i>
        <span class="nav-text">Rôles</span>
      </router-link>
      <router-link class="block button is-info" to="/actions">
        <i class="fas fa-terminal cypress-to-logs"></i>
        <span class="nav-text">Historique d'actions</span>
      </router-link>
      <button
        @click="logout"
        class="block button is-danger is-light is-outlined"
      >
        Se déconnecter
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SideBar",
  emits: ["logout"],
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$cookies.remove("token");
      this.$emit("logout");
    },
  },
  data() {
    return {};
  },
};
</script>