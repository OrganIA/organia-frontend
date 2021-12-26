<template>
  <div class="dropdown avatar-dropdown is-hoverable">
    <div class="dropdown-trigger ">
      <button class="button dropdown-trigger" aria-haspopup="true" aria-controls="dropdown-menu3">
        <span>Click me</span>
        <span class="icon is-small">
        <img src="https://synergy-it.gitlab.io/speekio/speekio-portal/assets/img/img_avatar.png"/>
      </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu3" role="menu">
      <div class="dropdown-content dropdown-correction">
        <a href="#" class="dropdown-item">
          Overview
        </a>
        <a href="#" class="dropdown-item">
          Modifiers
        </a>
        <a href="#" class="dropdown-item">
          Grid
        </a>
        <a href="#" class="dropdown-item">
          Form
        </a>
        <a href="#" class="dropdown-item">
          Elements
        </a>
        <a href="#" class="dropdown-item">
          Components
        </a>
        <a href="#" class="dropdown-item">
          Layout
        </a>
        <hr class="dropdown-divider">
        <button
            @click="logout"
            class="block button is-danger is-light is-outlined"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserDropdown",
  emits: ["logout"],
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$cookies.remove("token");
      this.$emit("logout");
    },
  },
}
</script>

<style scoped>

</style>