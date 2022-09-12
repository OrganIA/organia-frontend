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
        <vue-cal class="vuecal--rounded-theme organia-calendar" locale="fr" active-view="month" :time="false"
                 :events="events">
        </vue-cal>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/i18n/fr.js";
import SideBar from "@/components/SideBar";
import ApplicationNavbar from "@/components/ApplicationNavbar";

export default {
  name: "event-calendar",
  components: {VueCal, SideBar, ApplicationNavbar},
  data() {
    return {
      events: [],
    };
  },
  mounted() {
    this.calendarFiller();
  },
  methods: {
    formatDate(date) {
      let d = new Date(date);
      let month = (d.getMonth() + 1).toString();
      let day = d.getDate().toString();
      let year = d.getFullYear();
      if (month.length < 2) {
        month = "0" + month;
      }
      if (day.length < 2) {
        day = "0" + day;
      }
      return [year, month, day].join("-");
    },
    calendarFiller() {
      this.$http
        .get("/calendar")
        .then((response) => {
          new Date();
          response.data.forEach((item) => {
            const date = new Date(item.date);
            this.events.push({
              title: item.description,
              start: this.formatDate(item.date),
              end: this.formatDate(item.date),
              content: `<p>${date.getHours()}:${date.getMinutes()}</p>`,
            });
          });
        })
        .catch((error) => {
          console.log(error);
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
  margin-left: 60px;

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

.vuecal__menu, .vuecal__cell-events-count {
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

.vuecal__cell--today, .vuecal__cell--current {
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
</style>
