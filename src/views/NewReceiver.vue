<template>
  <div>
    <router-link to="/receivers">Back</router-link>
    <form @submit.prevent="createPerson()" class="show-requireds">
      <h2 class="form-title title is-3">Ajouter un receveur</h2>
      <div class="form-fields">
        <div class="form-input small required">
          <label class="label">Prénom</label>
          <input
              v-model="first_name"
              placeholder="first_name"
              type="text"
              class="cypress-first-name input is-info"
              required
          />
        </div>
        <div class="form-input small required">
          <label class="label">Nom de Famille</label>
          <input
              v-model="last_name"
              placeholder="last_name"
              type="text"
              class="cypress-last-name input is-info"
              required
          />
        </div>
        <div class="form-input small required">
          <label class="label">Date de naissance</label>
          <input
              v-model="birthday"
              placeholder="birthday"
              type="date"
              class="cypress-birth-date input is-info"
              required
          />
        </div>
        <div class="form-input small required">
          <label class="label">Organe</label>
          <select
              v-model="organ"
              id="organ-select"
              class="cypress-organ input is-info"
              required
          >
            <option v-for="element in all_organs" :key="element">
              {{ element }}
            </option>
          </select>
        </div>
        <div class="form-input small">
          <label class="label">Date d'admission</label>
          <input
              v-model="start_date"
              placeholder="start date"
              type="date"
              class="cypress-admission-date input is-info"
          />
        </div>
        <div class="form-input small">
          <label class="label">Description</label>
          <input v-model="description" placeholder="description" type="text" class="input is-info"/>
        </div>
        <div class="form-input small">
          <label class="label">Groupe sanguin</label>
          <select v-model="blood_type" name="abo" id="abo-select" class="button is-info is-light">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="O">O</option>
            <option value="AB">AB</option>
          </select>
        </div>
        <div class="form-input small">
          <label class="label">Rhésus</label>
          <select v-model="rhesus" name="rhesus" id="rhesus-select" class="button is-info is-light">
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
        </div>
        <div class="form-input small">
          <label class="label">Sexe</label>
          <select v-model="gender" name="gender" id="gender-select" class="button is-info is-light">
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>
        <div class="form-input small">
          <label class="label">Notes</label>
          <textarea v-model="notes" placeholder="notes" class="textarea"/>
          <p class="required-notice">* Obligatoire</p>

        </div>
        <div class="form-submit is-center">
          <button type="submit" class="cypress-add button is-info mx-auto mr-6">Ajouter</button>
          <router-link to="/receivers" class="button is-danger ml-6">Retour</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewReceiver",
  data() {
    return {
      first_name: "",
      last_name: "",
      birthday: "",
      description: "",
      supervisor_id: 0,
      person_id: undefined,
      start_date: "",
      notes: "",
      organ: "",
      blood_type: "",
      rhesus: "",
      gender: "",
      all_organs: "",
    };
  },
  created() {
    this.getAllOrgans();
  },
  methods: {
    createPerson() {
      this.$http
        .post("/persons", {
          first_name: this.first_name,
          last_name: this.last_name,
          birthday: this.birthday,
          ...(this.description ? { description: this.description } : {}),
          supervisor_id: this.supervisor_id,
          ...(this.blood_type ? { abo: this.blood_type } : {}),
          ...(this.rhesus ? { rhesus: this.rhesus } : {}),
          ...(this.gender ? { gender: this.gender } : {}),
        })
        .then((response) => {
          this.person_id = response.data.id;
          this.createReceiver();
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
    createReceiver() {
      this.$http
        .post("/listings", {
          ...(this.start_date ? { start_date: this.start_date } : {}),
          ...(this.notes ? { notes: this.notes } : {}),
          organ: this.organ,
          donor: false,
          person_id: this.person_id,
        })
        .then(() => {
          this.$router.push("/receivers");
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
    getAllOrgans() {
      this.$http
        .get("/listings/organs")
        .then((response) => {
          this.all_organs = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
  },
};
</script>