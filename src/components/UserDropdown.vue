<template>
  <div class="dropdown avatar-dropdown is-hoverable">
    <div class="dropdown-trigger">
      <button class="button dropdown-trigger" aria-haspopup="true" aria-controls="dropdown-menu3">
        <span class="name-display-dropdown">{{ cutMail($store.getters.getEmail) }}</span>
        <span class="avatar-container">
        <img class="avatar-display" src="https://synergy-it.gitlab.io/speekio/speekio-portal/assets/img/img_avatar.png"/>
      </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu3" role="menu">
      <div class="dropdown-content dropdown-correction">
        <router-link to="#" class="dropdown-item">
          Demande au support
        </router-link>
        <hr class="dropdown-divider">
        <button
            @click="logout"
            class="block button is-danger is-light is-outlined  "
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
    cutMail(mail) {
      return mail.substr(0, mail.indexOf('@'))
    }
  },
}
</script>

<style scoped>

</style>