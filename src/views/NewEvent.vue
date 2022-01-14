<template>
  <div>
    <form @submit.prevent="createEvent()" class="show-requireds">
      <h2 class="form-title title is-3">Ajouter un evenement</h2>
      <div class="form-fields">
        <div class="form-input small required">
          <label class="label">Libellé</label>
          <input
            v-model="title"
            placeholder="title"
            type="text"
            class="cypress-first-name input is-info"
            required
          />
        </div>
        <div class="form-input small required">
          <label class="label">Lieu</label>
          <input
            v-model="location"
            placeholder="location"
            type="text"
            class="cypress-organ input is-info"
            required
          />
        </div>
        <div class="form-input small required">
          <label class="label">Date de debut</label>
          <input
            v-model="startDate"
            placeholder="startDate"
            type="datetime-local"
            class="cypress-birth-date input is-info"
            required
          />
        </div>
        <div class="form-input small">
          <label class="label">Date de fin</label>
          <input
            v-model="endDate"
            placeholder="endDate"
            type="datetime-local"
            class="cypress-admission-date input is-info"
          />
        </div>
        <div class="form-input small">
          <label class="label">Description</label>
          <textarea v-model="description" placeholder="description" class="textarea"/>
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
  name: "NewEvent",
  data() {
    return {
      title: "",
      location: "",
      startDate: "",
      endDate: "",
      supervisor_id: 0,
      description: "",
    };
  },
  methods: {
    createEvent() {
      this.$http
        .post("/events", {
          libelle: this.libelle,
          location: this.location,
          startDate: this.startDate,
          endDate: this.endDate,
          supervisor_id: this.supervisor_id,
          ...(this.description ? { description: this.description } : {}),
        })
        .then((response) => {
          this.event_id = response.data.id;
          this.$router.push("/events")
        })
        .catch((error) => {
          this.$toast.error(
            "Erreur : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
  },
};
</script>
