<template>
  <div>
    <h1>Calendrier des evenements</h1>
    <vue-cal 
      class="class=vuecal--full-height-delete vuecal--blue-theme" 
      locale="fr" 
      active-view="week"
      today-button
      :time="true"
      :time-from="7 * 60"
      :time-to="23 * 60"
      hide-weekends
      resize-x
      events-on-month-view="short"
      style="height:600px"
      :events="events"
      >
    </vue-cal>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/i18n/fr.js";

export default {
  name: "event-calendar",
  components: { VueCal },
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
              title: item.title,
              description: item.description,
              start: this.formatDate(item.start_date),
              end: this.formatDate(item.end_date),
              content: `<p>${date.getHours()}:${date.getMinutes()}</p>`,
            });
          });
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(`Erreur: ${error.response.data.detail}`);
          setTimeout(this.$toast.clear, 3000);
        });
    },
  },
};
</script>
