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
      <div id="navbox">
        <router-link to="/receivers">
          <i class="fa fa-address-card"></i>
          <span class="nav-text">Receveurs</span>
        </router-link>
        <router-link to="/donors">
          <i class="fa fa-address-card" aria-hidden="true"></i>
          <span class="nav-text">Donneurs</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SideBar",
  methods: {},
  data() {
    return {};
  },
};
</script>