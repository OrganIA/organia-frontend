<template>
  <div class="dropdown  is-hoverable cypress-dropdown avatar-dropdown">
    <div class="dropdown-trigger">
      <button class="button dropdown-trigger" aria-haspopup="true" aria-controls="dropdown-menu3">
        <span class="name-display-dropdown">{{ cutMail($store.getters.getEmail) }}</span>
          <img class="avatar-display"
            src="https://synergy-it.gitlab.io/speekio/speekio-portal/assets/img/img_avatar.png" />
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu3" role="menu">
      <div class="dropdown-content dropdown-correction">
        <router-link to="#" class="dropdown-item">
          Demande au support
        </router-link>
        <router-link to="/new_invitation" class="dropdown-item">
          Demande au support
        </router-link>
        <hr class="dropdown-divider">
        <button @click="logout" class="block button is-danger is-light is-outlined cypress-logout">
          Se déconnecter
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-dropdown",
  emits: ["logout"],
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$cookies.remove("token");
      this.$emit("logout");
      this.$router.push("/home");
    },
    cutMail(mail) {
      return mail.substr(0, mail.indexOf('@'))
    }
  },
}
</script>

<style scoped>

.avatar-dropdown {
    margin-top: 50px;
    min-width: 300px;
}

.dropdown-trigger {
    width: 93%;
}

.dropdown-correction {
    width: 260px;
}

.name-display-dropdown {
    align-content: flex-start;
    font-size: 19px;
    font-weight: bold;
    margin-right: 20px;
}

.avatar-display {
    width: 100px;
    border-radius: 50%;
}

</style>