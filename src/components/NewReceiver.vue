<template>
  <div>
    <form @submit.prevent="createPerson()" class="show-requireds">
      <h2 class="form-title">Ajouter un receveur</h2>
      <div class="form-fields">
        <div class="form-input small required">
          <label for="first_name">Prénom</label>
          <input
            v-model="first_name"
            placeholder="first_name"
            type="text"
            class="cypress-first-name"
            required
          />
        </div>
        <div class="form-input small required">
          <label for="first_name">Nom de Famille</label>
          <input
            v-model="last_name"
            placeholder="last_name"
            type="text"
            class="cypress-last-name"
            required
          />
        </div>
        <div class="form-input small required">
          <label for="first_name">Date de naissance</label>
          <input
            v-model="birthday"
            placeholder="birthday"
            type="date"
            class="cypress-birth-date"
            required
          />
        </div>
        <div class="form-input small required">
          <label for="first_name">Organe</label>
          <select
            v-model="organ"
            id="organ-select"
            class="cypress-organ"
            required
          >
            <option v-for="element in all_organs" :key="element">
              {{ element }}
            </option>
          </select>
        </div>
        <div class="form-input small">
          <label for="first_name">Date d'admission</label>
          <input v-model="start_date" placeholder="start date" type="date" class="cypress-admission-date"/>
        </div>
        <div class="form-input small">
          <label for="first_name">Description</label>
          <input v-model="description" placeholder="description" type="text" />
        </div>
        <div class="form-input small">
          <label for="first_name">Groupe sanguin</label>
          <select v-model="blood_type" name="abo" id="abo-select">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="O">O</option>
            <option value="AB">AB</option>
          </select>
        </div>
        <div class="form-input small">
          <label for="first_name">Rhésus</label>
          <select v-model="rhesus" name="rhesus" id="rhesus-select">
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
        </div>
        <div class="form-input small">
          <label for="first_name">Sexe</label>
          <select v-model="gender" name="gender" id="gender-select">
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>
        <div class="form-input small">
          <label for="first_name">Notes</label>
          <textarea v-model="notes" placeholder="notes" />
          <p class="required-notice">* Obligatoire</p>
          <div class="form-submit">
            <button type="submit" class="cypress-add">Ajouter</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import http from "../http";

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
      http
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
        });
    },
    createReceiver() {
      http
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
          alert(
            `ERROR:\n${error.response.data.detail[0].loc[1]}: ${error.response.data.detail[0].msg}`
          );
        });
    },
    getAllOrgans() {
      http.get("/listings/organs").then((response) => {
        this.all_organs = response.data;
      });
    },
  },
};
</script>