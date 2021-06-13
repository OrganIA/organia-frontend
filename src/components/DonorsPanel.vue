<template>
  <div id="main">
    <main>
      <h1>Liste d'attente</h1>
      <p>
        <router-link to="/donors/add" class="button">Ajouter</router-link>
      </p>
      <table class="table-list">
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom de famille</th>
            <th>Date de naissance</th>
            <th>Sexe</th>
            <th>ABO</th>
            <th>Organe</th>
            <th>Arrivée</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="donor in donors" :key="donor">
            <td>{{ donor.person.first_name }}</td>
            <td>{{ donor.person.last_name }}</td>
            <td>{{ donor.person.birthday }}</td>
            <td>{{ donor.person.gender }}</td>
            <td>{{ donor.person.blood_type }}</td>
            <td>{{ donor.organ }}</td>
            <td>{{ donor.person.created_at }}</td>
            <td>
              <router-link :to="`/donors/edit/${donor.person.id}`">
                <i class="fas fa-trash-alt"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
import http from "../http";

export default {
  components: {},
  name: "DonorsPanel",
  data() {
    return {
      donors: {},
    };
  },
  created() {
    this.getAllDonors();
  },
  methods: {
    getAllDonors() {
      http
        .get("/listings/donors", {
          headers: { Authorization: `Bearer ${this.$cookies.get("token")}` },
        })
        .then((response) => {
          console.log(response.data);
          response.data.forEach((element) => {
            element.person.created_at = new Date(element.person.created_at).toDateString();
          });
          this.donors = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>