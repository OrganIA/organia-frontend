<template>
  <div>
    <router-link to="/receivers">Back</router-link>
    <form @submit.prevent="submitForm()" class="show-requireds">
      <h2 class="form-title">Éditer un receveur</h2>
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
        <div class="form-input small">
          <label for="first_name">Date d'admission</label>
          <input
            v-model="receiver.start_date"
            placeholder="start date"
            type="date"
          />
        </div>
        <div class="form-input small">
          <label for="first_name">Date de fin</label>
          <input
            v-model="receiver.end_date"
            placeholder="end date"
            type="date"
          />
        </div>
        <div class="form-input small required">
          <label for="first_name">Description</label>
          <input
            v-model="person.description"
            placeholder="description"
            type="text"
            required
          />
        </div>
        <div class="form-input small required">
          <label for="first_name">Organe</label>
          <select v-model="receiver.organ" id="organ-select" required>
            <option v-for="element in all_organs" :key="element">
              {{ element }}
            </option>
          </select>
        </div>
        <div class="form-input small required">
          <label for="first_name">Groupe sanguin</label>
          <select v-model="person.abo" name="abo" id="abo-select" required>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="O">O</option>
            <option value="AB">AB</option>
          </select>
        </div>
        <div class="form-input small required">
          <label for="first_name">Rhésus</label>
          <select
            v-model="person.rhesus"
            name="rhesus"
            id="rhesus-select"
            required
          >
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
        </div>
        <div class="form-input small required">
          <label for="first_name">Sexe</label>
          <select
            v-model="person.gender"
            name="gender"
            id="gender-select"
            required
          >
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>
        <div class="form-input small">
          <label for="first_name">Notes</label>
          <textarea v-model="receiver.notes" placeholder="notes" />
        </div>
        <p class="required-notice">* Obligatoire</p>
        <div class="form-submit">
          <button type="submit">Ajouter</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import http from "../http";

export default {
  name: "EditReceiversPanel",
  props: {
    id: String,
  },
  data() {
    return {
      receiver: {},
      person: {},
      all_organs: [],
    };
  },
  methods: {
    getReceiverByID() {
      http
        .get(`/listings/${this.id}`)
        .then((response) => {
          this.receiver = response.data;
          this.person = response.data.person;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm() {
      http
        .post(`/listings/${this.id}`, {
          start_date: this.receiver.start_date,
          end_date: this.receiver.end_date,
          notes: this.receiver.notes,
          organ: this.receiver.organ,
          person_id: this.id,
        })
        .then(() => {
          this.updatePerson();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updatePerson() {
      http
        .post(`/persons/${this.id}`, {
          first_name: this.person.first_name,
          last_name: this.person.last_name,
          birthday: this.person.birthday,
          description: this.person.description,
          abo: this.person.abo,
          rhesus: this.person.rhesus,
          gender: this.person.gender,
        })
        .then(() => {
          this.$router.push("/receivers");
        });
    },
    redirect() {
      window.location.replace("/receivers");
    },
    getAllOrgans() {
      http.get("/listings/organs").then((response) => {
        this.all_organs = response.data;
      });
    },
  },
  created() {
    this.getReceiverByID();
    this.getAllOrgans();
  },
};
</script>