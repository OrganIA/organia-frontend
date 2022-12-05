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
  max-width: 96%;
  margin-top: 20px;
  margin-left: 30px;

}

.page-container {
  margin-left: 20px;
  padding: 12px 0 0 0;
}


.organia-calendar {
  height: 75vh;
  background-color: #e9f4ff;
  border-radius: 15px;
}

.vuecal__menu,
.vuecal__cell-events-count {
  background-color: #2d6594;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  color: white;
}

.vuecal__title-bar {
  color: white;
  background-color: #6799c4;
}

.vuecal__title button {
  color: white;
}

.vuecal__cell--today,
.vuecal__cell--current {
  color: white;

  background-color: rgba(240, 240, 255, 0.4);
}

.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
  background-color: rgba(235, 255, 245, 0.4);
}

.vuecal__cell--selected:before {
  border-color: rgba(66, 185, 131, 0.5);
}

/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {
  background-color: rgba(195, 255, 225, 0.5);
}

.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {
  background-color: rgba(136, 236, 191, 0.25);
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
