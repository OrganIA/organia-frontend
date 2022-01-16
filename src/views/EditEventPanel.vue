<template>
  <div>
    <form @submit.prevent="submitForm()" class="show-requireds">
      <h2 class="form-title title is-3">Éditer un evenement</h2>
      <div class="form-fields">
        <div class="form-input small required">
          <label class="label">Date</label>
          <input
            v-model="calendar.date"
            placeholder="date"
            type="datetime-local"
            class="input is-info"
          />
        </div>
        <div class="form-input small required">
          <label class="label">Description</label>
          <textarea
            class="textarea"
            v-model="calendar.description"
            placeholder="description"
          />
        </div>
        <p class="required-notice">* Obligatoire</p>
      </div>
      <div class="form-submit is-center">
        <button type="submit" class="cypress-add button is-info mx-auto mr-6">
          Enregistrer
        </button>
        <router-link to="/eventlist" class="button is-danger ml-6"
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
  name: "EditeventPanel",
  props: {
    id: String,
  },
  data() {
    return {
      calendar: {},
      all_organs: [],
    };
  },
  methods: {
    geteventByID() {
      this.$http
        .get(`/calendar/${this.calendar.id}`)
        .then((response) => {
          this.calendar = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
    submitForm() {
      this.$http
        .post(`/calendar/${this.calendar.id}`, {
          date: this.calendar.date,
          ...(this.calendar.description ? { notes: this.calendar.description } : {}),
          event_id: this.id,
        })
        .then(() => {
          this.$router.push("/eventlist");
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
    redirect() {
      window.location.replace("/calendar");
    },
    delete_event() {
      this.$http
        .delete(`/calendar/${this.calendar.id}`)
        .then(() => {
          this.$toast.success("Suppression effectuée");
          this.$router.push("/eventlist");
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