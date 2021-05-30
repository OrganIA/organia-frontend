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

<style scoped>
img {
  max-width: 100%;
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

#navlinks {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 20px;
  font-size: var(--font-big);
}

#navbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--light-gray);
  border-radius: var(--rounding);
  padding: 1em;
  /* width: min-content; */
  flex: 0 0 auto;
}

#navbox > * {
  border-radius: var(--rounding);
  padding: 0.5em;
  color: var(--sky-blue);
  width: 100%;
  height: 50px;
}

#navbox > a {
  display: flex;
  flex-direction: row;
  text-align: center;
}

#navbox > a > i {
  font-size: 1.5em;
  margin-right: 20px;
}

#navbox > a > * {
  margin-top: 5%;
}

#navbox > .active {
  background-color: var(--blue);
  color: white;
}
</style>