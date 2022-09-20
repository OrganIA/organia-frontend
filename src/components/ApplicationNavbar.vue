<template>
  <nav aria-label="main navigation" class="navbar app-navbar" role="navigation">
    <div id="navbarBasicExample" class="navbar-menu main-menu-navbar is-active">
    </div>
    <UserDropdown></UserDropdown>
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