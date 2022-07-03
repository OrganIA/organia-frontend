
<template>
  <button class="button is-link is-light is-large is-responsive is-rounded is-focused">BIENVENUE SUR ORGANIA</button>
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
</style>