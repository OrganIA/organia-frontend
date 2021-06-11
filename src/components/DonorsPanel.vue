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
            <td>{{ donor.first_name }}</td>
            <td>{{ donor.last_name }}</td>
            <td>{{ donor.birthday }}</td>
            <td>{{ donor.gender }}</td>
            <td>{{ donor.blood_type }}</td>
            <td>{{ donor.organ }}</td>
            <td>{{ donor.created_at }}</td>
            <td>
              <router-link :to="`/donors/edit/${donor.id}`">
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
        .get("/persons", {
          headers: { Authorization: `Bearer ${this.$cookies.get("token")}` },
        })
        .then((response) => {
          response.data.forEach((element) => {
            element.created_at = new Date(element.created_at).toDateString();
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