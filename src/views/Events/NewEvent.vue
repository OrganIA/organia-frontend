<template>
  <div>
    <form @submit.prevent="createEvent()" class="show-requireds">
      <h2 class="form-title title is-3">Ajouter un evenement</h2>
      <div class="form-fields">
        <div class="form-input small required">
          <label class="label">Date</label>
          <input v-model="date" placeholder="date" type="datetime-local" class="cypress-datetime input is-info"
            required />
        </div>
        <div class="form-input small">
          <label class="label">Description</label>
          <textarea v-model="description" placeholder="description" class="cypress-textarea" required />
          <p class="required-notice">* Obligatoire</p>
        </div>
        <div class="form-submit is-center">
          <button type="submit" class="cypress-add button is-info mx-auto mr-6">Ajouter</button>
          <router-link to="/eventlist" class="button is-danger ml-6">Retour</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "new-event",
  data() {
    return {
      date: "",
      description: "",
    };
  },
  methods: {
    createEvent() {
      this.$http
        .post("/calendar", {
          date: this.date,
          ...(this.description ? { description: this.description } : {}),
        })
        .then((response) => {
          this.event_id = response.data.id;
          this.$router.push("/eventlist")
        })
        .catch((error) => {
          console.log(error)
        });
    },
  },
};
</script>
