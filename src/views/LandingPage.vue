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
          ORGANIA
        </button>
        <br><br>
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
            <div class="card cypress-event-card">
              <header class="card-header cypress-event-header">
                <p class="card-header-title cypress-event-header-title">
                  {{ event.title }} </p>
              </header>
              <div class="card-content cypress-event-date-box">
                <div class="content cypress-event-date">
                  <p>{{ event.description }}</p>
                  <p>{{ event.start_date }}</p>
                  <p>{{ event.end_date }}</p>
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
      events: {}
    }
  },
  created() {
    this.getAllevents();
  },
  methods: {
    getAllevents() {
      this.$http
        .get("/calendar/",)
        .then((response) => {
          const date_options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          };
          response.data.forEach((event) => {
            event.start_date = (new Date(event.start_date)).toLocaleString("fr-FR", date_options);
            event.end_date = (new Date(event.end_date)).toLocaleString("fr-FR", date_options);
          })
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