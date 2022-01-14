<template>
  <div>
    <form @submit.prevent="submitForm()" class="show-requireds">
      <h2 class="form-title title is-3">Éditer un eventement</h2>
      <div class="form-fields">
        <div class="form-input small required">
          <label class="label">Libellé</label>
          <input
            class="input is-info"
            v-model="event.title"
            placeholder="title"
            type="text"
            required
          />
        </div>
        <div class="form-input small required">
          <label class="label">Lieu</label>
          <input
            class="input is-info"
            v-model="event.location"
            placeholder="location"
            type="text"
            required
          />
        </div>
        <div class="form-input small required">
          <label class="label">Date de debut</label>
          <input
            v-model="event.startDate"
            placeholder="startDate"
            type="datetime-local"
            class="input is-info"
          />
        </div>
         <div class="form-input small required">
          <label class="label">Date de fin</label>
          <input
            v-model="event.endDate"
            placeholder="endDate"
            type="datetiem-local"
            class="input is-info"
          />
        </div>
        <div class="form-input small">
          <label class="label">Description</label>
          <textarea
            class="textarea"
            v-model="event.description"
            placeholder="description"
          />
        </div>
        <p class="required-notice">* Obligatoire</p>
      </div>
      <div class="form-submit is-center">
        <button type="submit" class="cypress-add button is-info mx-auto mr-6">
          Enregistrer
        </button>
        <router-link to="/events" class="button is-danger ml-6"
          >Retour</router-link
        >
        <button
          type="button"
          class="button is-danger ml-6"
          @click="delete_event"
        >
          Supprimer
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditeventsPanel",
  props: {
    id: String,
  },
  data() {
    return {
      event: {},
      event: {},
      all_organs: [],
    };
  },
  methods: {
    geteventByID() {
      this.$http
        .get(`/events/${this.event.id}`)
        .then((response) => {
          this.event = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
    submitForm() {
      this.$http
        .post(`/events/${this.event.id}`, {
          title: this.event.title,
          location: this.event.location,
          startDate: this.event.startDate,
          endDate: this.event.endDate,
          ...(this.event.description ? { notes: this.event.description } : {}),
          event_id: this.id,
        })
        .then(() => {
          this.$router.push("/events");
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
    redirect() {
      window.location.replace("/events");
    },
    delete_event() {
      this.$http
        .delete(`/events/${this.event.id}`)
        .then(() => {
          this.$toast.success("Suppression effectué");
          this.$router.push("/events");
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
  },
  created() {
    this.geteventByID();
  },
};
</script>