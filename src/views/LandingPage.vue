
<template>
  <button class="button is-link is-light is-large is-responsive is-rounded is-focused">BIENVENUE SUR
    ORGANIA</button><br><br>
  <router-link class="block button is-info is-light button-style" to="/chat">
    <i class="fas fa-envelope cypress-to-chats"></i>
    <span class="nav-text">Chats</span>
  </router-link>
  <router-link class="block button is-info is-light button-style" to="/">
    <i class="fas fa-user cypress-to-chats"></i>
    <span class="nav-text">Compte</span>
  </router-link>
</template>

<script>

export default {
  name: "landing-page",
  emits: ["login"],
  components: {
  },
  data() {
    return {
      contents: [
        { id: 1, text: "Souhaitez-vous rechercher les centres de France ?", url: '/searchmap' },
        { id: 2, text: "Essayez notre nouveau service de communication.", url: "/chat" },
        { id: 3, text: "Ne ratez aucun évènement grâce au calendrier.", url: "/eventcalendar" },
        { id: 4, text: "La liste des évènements est disponible.", url: "/eventlist" },
      ]
    }
  },
};
</script>

<style scoped>
.button-style {
  height: 10em;
  font-weight: bold;
  font-size: 1.1em;
}
</style>