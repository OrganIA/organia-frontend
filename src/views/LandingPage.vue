
<template>
  <button class="button is-link is-light is-large is-responsive is-rounded is-focused">BIENVENUE SUR
    ORGANIA</button><br><br>
  <p class="title is-5 is-spaced">Raccourci</p>
  <router-link class="block button is-info is-light button-style" to="/chat">
    <i class="fas fa-envelope cypress-to-chats"></i>
    <span class="nav-text">Chats</span>
  </router-link>
  <router-link class="block button is-info is-light button-style" to="/">
    <i class="fas fa-user cypress-to-chats"></i>
    <span class="nav-text">Compte</span>
  </router-link>
  <p class="title is-5 is-spaced">Liste des prochains évènements</p><br>
  <!-- <table class="
        table
        is-bordered is-striped is-narrow is-hoverable is-fullwidth is-info
      ">-->
  <table class="table is-striped is-fullwidth is-narrow is-hoverable">
    <thead>
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Date de creation</th>
        <th>Éditer</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="calendar in events" :key="calendar">
        <td>{{ calendar.date }}</td>
        <td>{{ calendar.description }}</td>
        <td>{{ calendar.created_at }}</td>
        <td>
          <router-link :to="`/eventlist/edit/${calendar.id}`">
            <i class="fas fa-edit button is-primary"></i>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>

import moment from "moment";


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
      ],
      events: {}
    }
  },
  created() {
    this.getAllevents();
  },
  methods: {
    getAllevents() {
      this.$http
        .get("/calendar", {
          headers: { Authorization: `Bearer ${this.$cookies.get("token")}` },
        })
        .then((response) => {
          console.log(response.data);
          response.data.forEach((element) => {
            element.date = moment(String(element.date)).format(
              "DD/MM/YYYY hh:mm"
            );
            element.created_at = moment(String(element.created_at)).format(
              "DD/MM/YYYY hh:mm"
            );
          });
          this.events = response.data;
        })
    },
  },
};
</script>

<style scoped>
.button-style {
  height: 10em;
  font-weight: bold;
  font-size: 1.1em;
}

td:nth-child(even),
th:nth-child(even) {
  background-color: #D6EEEE;
}
</style>