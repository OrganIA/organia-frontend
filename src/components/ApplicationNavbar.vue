<template>
  <nav aria-label="main navigation" class="navbar app-navbar cypress-app-navbar" role="navigation">
    <div id="navbarBasicExample" class="navbar-menu main-menu-navbar is-active">
    </div>
    <UserDropdown class="cypress-user-dropdown"></UserDropdown>
  </nav>

</template>

<script>
import UserDropdown from "@/components/UserDropdown";

export default {
  components: {
    UserDropdown,
  },
  name: "ApplicationNavbar"
}
</script>

<style scoped>
.app-navbar {
  background-color: #EFF5FB;
  height: 100%;
}
</style>