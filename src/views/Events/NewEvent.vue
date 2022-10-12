<template>
  <div>
    <form @submit.prevent="createEvent()" class="show-requireds">
      <h2 class="form-title title is-3">Ajouter un evenement</h2>
      <div class="form-fields">
        <div class="form-input small required">
          <label class="label">Date de debut</label>
          <input v-model="start_date" placeholder="date de debut" type="datetime-local" class="cypress-datetime input is-info"
            required/>
          <label class="label">Date de fin</label>
          <input v-model="end_date" placeholder="date de fin" type="datetime-local" class="cypress-datetime input is-info"
            required/>
        </div>
        <div class="form-input small required">
          <label class="label">Titre</label>
          <textarea v-model="title" placeholder="titre" class="cypress-textarea" required/>
          <label class="label">Description</label>
          <textarea v-model="description" placeholder="description" class="cypress-textarea"/>
        </div>
        <div class="form-input small required">
          <label class="label">Type de rdv</label>
          <select v-model="typerdv" class="cypress-select" required>
            <option value="rdvDonneur">rdv donneur</option>
            <option value="rdvReceveur">rdv receveur</option>
          </select>
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
      start_date: "",
      end_date: "",
      title: "",
      description: "",
      typerdv: "",
    };
  },
  methods: {
    createEvent() {
      this.$http
        .post("/calendar", {
          start_date: this.start_date,
          end_date: this.end_date,
          ...(this.title ? { title: this.title } : {}),
          ...(this.description ? { description: this.description } : {}),
          ...(this.typerdv ? { typerdv: this.typerdv } : {}),
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
