<template>
    <head>
      <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
    </head>
  <h1>Calendrier des evenements</h1>
  <div class="main-container">
        <div id="calendar">
            <div id="calendar_header"><i class="icon-chevron-left"></i>
                <h1></h1><i class="icon-chevron-right"></i>         
            </div>
            <div id="calendar_weekdays"></div>
            <div id="calendar_content"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: "EventCalendar",
  data() {
    return {
      events: {},
    };
  },
  created() {
    this.getEvents();
  },
  methods: {
    getEvents() {
      this.$http
        .get("/events", {
          headers: { Authorization: `Bearer ${this.$cookies.get("token")}` },
        })
        .then((response) => {
            //! should this be the response?
            response.data.forEach((element) => {
            element.created_at = new /*Calendar au lieu de date*/Date(element.created_at).toDateString();
          });
          this.events = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getEventsByID() {
      this.$http
          .get(`/events/${this.event.id}`)
          .then((response) => {
            this.event = response.data;
          })
          .catch((error) => {
            console.log(error)
            this.$toast.error(error.message);
            setTimeout(this.$toast.clear, 3000)
          });
    },
    loadSelectedEvent(eventId) {
      this.event.id = eventId;
      this.getEventByID(eventId)
    },
  },
};
</script>

<style scoped>
</style>