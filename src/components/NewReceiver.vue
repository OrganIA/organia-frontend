<template>
  <div>
    <form @submit.prevent="createPerson()">
      <input
        v-model="first_name"
        placeholder="first_name"
        type="text"
        required
      />
      <input v-model="last_name" placeholder="last_name" type="text" required />
      <input v-model="birthday" placeholder="birthday" type="date" required />
      <input
        v-model="start_date"
        placeholder="start date"
        type="date"
        required
      />
      <input
        v-model="description"
        placeholder="description"
        type="text"
        required
      />
      <input v-model="organ" placeholder="organ" type="text" required />
      <select v-model="blood_type" name="abo" id="abo-select" required>
        <option value="">--Please choose an option--</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="O">O</option>
        <option value="AB">AB</option>
      </select>
      <select v-model="rhesus" name="rhesus" id="rhesus-select" required>
        <option value="">--Please choose an option--</option>
        <option value="+">+</option>
        <option value="-">-</option>
      </select>
      <select v-model="gender" name="gender" id="gender-select" required>
        <option value="">--Please choose an option--</option>
        <option value="MALE">MALE</option>
        <option value="FEMALE">FEMALE</option>
      </select>
      <textarea v-model="notes" placeholder="notes" required />
      <input
        v-model="supervisor_id"
        placeholder="supervisor_id"
        type="number"
        required
      />
      <button type="submit">S'inscrire</button>
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
    };
  },
  created() {},
  methods: {
    createPerson() {
      http
        .post("/persons", {
          first_name: this.first_name,
          last_name: this.last_name,
          birthday: this.birthday,
          description: this.description,
          supervisor_id: this.supervisor_id,
          abo: this.blood_type,
          rhesus: this.rhesus,
          gender: this.gender,
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
      http.post("/listings", {
        start_date: this.start_date,
        notes: this.notes,
        organ: this.organ,
        donor: false,
        person_id: this.person_id,
      });
    },
  },
};
</script>

<style>
</style>