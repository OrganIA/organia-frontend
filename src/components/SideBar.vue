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
        <router-link class="sidebar-link" to="/receivers" v-bind:class="{ active: isActive }" v-on:click="ReceiverClicked">
          <i class="fa fa-address-card"></i>
          <span class="nav-text">Receveurs</span>
        </router-link>
        <router-link class="sidebar-link" to="/donors" v-bind:class="{ active: (isActive === undefined) ? false : !isActive }" v-on:click="DonorClicked">
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
  methods: {
    ReceiverClicked() {
      this.isActive = true;
    },
    DonorClicked() {
      this.isActive = false;

    },
  },
  data() {
    return {
      isActive: undefined,
    };
  },
};
</script>