<template>
  <div>
    <form @submit.prevent="submitForm()" class="show-requireds">
      <h2 class="form-title title is-3">Éditer un evenement</h2>
      <div class="form-fields">
        <div class="form-input small required">
          <label class="label">Date de debut</label>
          <input v-model="calendar.start_date" placeholder="date de debut" type="datetime-local" class="input is-info" required />
          <label class="label">Date de fin</label>
          <input v-model="calendar.end_date" placeholder="date de fin" type="datetime-local" class="input is-info" required />
        </div>
        <div class="form-input small required">
          <label class="label">Titre</label>
          <textarea class="cypress-textarea" v-model="calendar.title" placeholder="titre" required />
          <label class="label">Description</label>
          <textarea class="cypress-textarea" v-model="calendar.description" placeholder="description" required />
        </div>
        <div class="form-input small required">
          <label class="label">Type de rdv</label>
          <select v-model="typerdv" class="cypress-select" required>
            <option value="rdvDdonneur">rdv donneur</option>
            <option value="rdvReceveur">rdv receveur</option>
          </select>
        </div>
      </div>
      <div class="form-submit is-center">
        <button type="submit" class="cypress-add button is-info mx-auto mr-6">
          Enregistrer
        </button>
        <router-link to="/eventlist" class="button is-danger ml-6">Retour</router-link>
        <button type="button" class="button is-danger ml-6" @click="delete_event">
          Supprimer
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "edit-event-panel",
  props: {
    id: String,
  },
  data() {
    return {
      calendar: {},
    };
  },
  methods: {
    geteventByID() {
      this.$http
        .get(`/calendar/${this.id}`)
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
        .post(`/calendar/${this.id}`, {
          start_date: this.calendar.start_date,
          end_date: this.calendar.end_date,
          title: this.calendar.title,
          description: this.calendar.description,
          typerdv: this.calendar.typerdv,
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
        .delete(`/calendar/${this.id}`)
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