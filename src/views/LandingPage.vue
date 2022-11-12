<template>
  <div class="app-navbar-container">
    <ApplicationNavbar></ApplicationNavbar>
  </div>
  <div class="columns">
    <div class="column sidebar-column">
      <SideBar></SideBar>
    </div>
    <div class="column page-container">
      <div class="page-content">
        <button class="button is-link is-light is-large is-responsive is-rounded is-focused cypress-landing-title">BIENVENUE SUR
          ORGANIA</button><br><br>
        <p class="title is-5 is-spaced cypress-raccourci">Raccourci</p>
        <div class="columns">
          <div class="column">
            <router-link class="block button is-info is-light button-style cypress-button-chat" to="/chat">
              <i class="fas fa-envelope cypress-to-chats-landing cypress-chat-icon"></i>
              <span class="nav-text cypress-chat-text">Chats</span>
            </router-link>
          </div>
          <div class="column">
            <router-link class="block button is-info is-light button-style cypress-button-account" to="/account">
              <i class="fas fa-user cypress-to-account cypress-account-icon"></i>
              <span class="nav-text cypress-account-text">Compte</span>
            </router-link>
          </div>
        </div>
        <p class="title is-5 is-spaced cypress-event-list-title">Liste des prochains évènements</p><br>
        <div class="columns">
          <div class="column" v-for="event in events" :key="event">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  {{ event.description }} </p>
              </header>
              <div class="card-content">
                <div class="content">
                  <p>{{ event.date }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import SideBar from "@/components/SideBar";
import ApplicationNavbar from "@/components/ApplicationNavbar";
export default {
  name: "landing-page",
  components: {
    SideBar,
    ApplicationNavbar
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
          response.data.splice(5, response.data.length - 5)
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