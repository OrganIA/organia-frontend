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
        <vue-cal class="class=vuecal--full-height-delete vuecal--blue-theme" locale="fr" active-view="week" today-button
          :time="true" resize-x events-on-month-view="short"
          style="height: 600px" :events="events">
        </vue-cal>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/i18n/fr.cjs.js";
import SideBar from "@/components/SideBar";
import ApplicationNavbar from "@/components/ApplicationNavbar";
import translate from "@/translate"

export default {
  name: "event-calendar",
  components: { VueCal, SideBar, ApplicationNavbar },
  data() {
    return {
      events: [],
    };
  },
  mounted() {
    this.calendarFiller();
  },
  methods: {
    calendarFiller() {
      this.$http
        .get("/calendar/",)
        .then((response) => {
          response.data.forEach((item) => {
            const start_date = new Date(item.start_date);
            const end_date = new Date(item.end_date);
            this.events.push({
              title: item.title,
              description: item.description,
              start: start_date,
              end: end_date,
              class: item.event_type,
            });
          })
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + translate[error.response.data.msg]
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
  },
};
</script>
<style>
.app-navbar-container {
  height: 14vh;
  max-width: 100%;
  margin-bottom: 20px;
}


.page-content {
  max-width: 92%;
  margin: 40px;
}

.page-container {
  margin-left: 20px;
  padding: 12px 0 0 0;
}

.vuecal--blue-theme .vuecal__menu, .vuecal--blue-theme .vuecal__cell-events-count {
  background-color: #6799c4;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  color: #000;
  border-right: 3px solid #376893;
  border-left: 3px solid #376893;
  border-top: 3px solid #376893;
}
.vuecal--blue-theme .vuecal__title-bar {
  background-color: #caddef;
  color: #000;
  border-right: 3px solid #376893;
  border-left: 3px solid #376893;
}
.vuecal__bg {
  background-color: #EFF5FB;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom: 3px solid #376893;
  border-right: 3px solid #376893;
  border-left: 3px solid #376893;
}
.vuecal--week-numbers .vuecal__weekdays-headings, .vuecal--view-with-time .vuecal__weekdays-headings {
  background-color: #EFF5FB;
  border-right: 3px solid #376893;
  border-left: 3px solid #376893;
}
.vuecal__heading .weekday-label {
  background-color: #EFF5FB;

}
.vuecal__weekdays-headings {
  background-color: #EFF5FB;
  border-right: 3px solid #376893;
  border-left: 3px solid #376893;
}
.vuecal__event.rdvDonneur {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}

.vuecal__event.rdvReceveur {
  background-color: rgba(96, 96, 233, 0.9);
  border: 1px solid rgb(65, 68, 236);
  color: #fff;
}
</style>
