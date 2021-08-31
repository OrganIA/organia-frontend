<template>
  <div>
    <router-link to="/donors">Back</router-link>
    <form @submit.prevent="submitForm()" class="show-requireds">
      <h2 class="form-title">Éditer un donneur</h2>
      <div class="form-fields">
        <div class="form-input small required">
          <label for="first_name">Prénom</label>
          <input
            v-model="person.first_name"
            placeholder="first_name"
            type="text"
            required
          />
        </div>
        <div class="form-input small required">
          <label for="first_name">Nom de Famille</label>
          <input
            v-model="person.last_name"
            placeholder="last_name"
            type="text"
            required
          />
        </div>
        <div class="form-input small required">
          <label for="first_name">Date de naissance</label>
          <input
            v-model="person.birthday"
            placeholder="birthday"
            type="date"
            required
          />
        </div>
        <div class="form-input small required">
          <label for="first_name">Organe</label>
          <select v-model="donor.organ" id="organ-select" required>
            <option v-for="element in all_organs" :key="element">
              {{ element }}
            </option>
          </select>
        </div>
        <div class="form-input small">
          <label for="first_name">Date d'admission</label>
          <input
            v-model="donor.start_date"
            placeholder="start date"
            type="date"
          />
        </div>
        <div class="form-input small">
          <label for="first_name">Date de fin</label>
          <input v-model="donor.end_date" placeholder="end date" type="date" />
        </div>
        <div class="form-input small">
          <label for="first_name">Description</label>
          <input
            v-model="person.description"
            placeholder="description"
            type="text"
          />
        </div>
        <div class="form-input small">
          <label for="first_name">Groupe sanguin</label>
          <select v-model="person.abo" name="abo" id="abo-select">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="O">O</option>
            <option value="AB">AB</option>
          </select>
        </div>
        <div class="form-input small">
          <label for="first_name">Rhésus</label>
          <select v-model="person.rhesus" name="rhesus" id="rhesus-select">
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
        </div>
        <div class="form-input small">
          <label for="first_name">Sexe</label>
          <select v-model="person.gender" name="gender" id="gender-select">
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>
        <div class="form-input small">
          <label for="first_name">Notes</label>
          <textarea v-model="donor.notes" placeholder="notes" />
        </div>
        <p class="required-notice">* Obligatoire</p>
        <div class="form-submit">
          <button type="submit">Sauvegarder</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import http from "../http";

export default {
  name: "EditdonorsPanel",
  props: {
    id: String,
  },
  data() {
    return {
      donor: {},
      person: {},
      all_organs: [],
    };
  },
  methods: {
    getdonorByID() {
      http
        .get(`/listings/${this.id}`)
        .then((response) => {
          this.donor = response.data;
          this.person = response.data.person;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
    submitForm() {
      http
        .post(`/listings/${this.id}`, {
          notes: this.donor.notes,
          organ: this.donor.organ,
          person_id: this.id,
          ...(this.donor.start_date
            ? { start_date: this.donor.start_date }
            : {}),
          ...(this.donor.end_date ? { end_date: this.donor.end_date } : {}),
          ...(this.donor.notes ? { notes: this.donor.notes } : {}),
        })
        .then(() => {
          this.updatePerson();
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
    updatePerson() {
      http
        .post(`/persons/${this.id}`, {
          first_name: this.person.first_name,
          last_name: this.person.last_name,
          birthday: this.person.birthday,
          ...(this.person.description
            ? { description: this.person.description }
            : {}),
          supervisor_id: this.person.supervisor_id,
          ...(this.person.abo ? { abo: this.person.abo } : {}),
          ...(this.person.rhesus ? { rhesus: this.person.rhesus } : {}),
          ...(this.person.gender ? { gender: this.person.gender } : {}),
        })
        .then(() => {
          this.$router.push("/donors");
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
    redirect() {
      window.location.replace("/donors");
    },
    getAllOrgans() {
      http
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
  created() {
    this.getdonorByID();
    this.getAllOrgans();
  },
};
</script>e
