<template>
  <div id="main">
    <h1>Liste des hôpitaux</h1>
    <p>
      <router-link to="/hospitals/add" class="button is-info is-info mb-6 cypress-to-hospitals-add"
      >Ajouter</router-link
      >
    </p>
    <p class="search content">Rechercher par</p>
    <div class="search-block">
      <select v-model="selectFilter" class="search-filter button mb-4 ml-6 is-info is-light">
        <option value="first_name">Prénom</option>
        <option value="last_name">Nom</option>
        <option value="birthday">Date de naissance</option>
        <option value="gender">Sexe</option>
        <option value="blood_type">ABO</option>
        <option value="organ">Organe</option>
        <option value="created_at">Arrivée</option>
      </select>
      <input @input="filter" v-model="filterText" class="search-bar input mr-6" />
      <br />
    </div>
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-info">
      <thead>
      <tr>
        <th>Nom</th>
        <th>Ville</th>
        <th>Numéro de téléphone</th>
        <th>Nombre de patients</th>
        <th>Éditer</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="hospital in hospitals" :key="hospital">
        <td>{{ hospital.name }}</td>
        <td>{{ hospital.city.name }}</td>
        <td>{{ hospital.phone_number }}</td>
        <td>{{ hospital.patients_count}}</td>
        <td>
          <router-link :to="`/hospitals/edit/${hospital.id}`">
            <i class="fas fa-edit button is-primary cypress-to-hospitals-edit-1"></i>
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "HospitalsPanel",
  data() {
    return {
      hospitals: {},
    };
  },
  created() {
    this.getAllHospitals();
  },
  methods: {
    getAllHospitals() {
      this.$http
          .get("/hospitals")
          .then((response) => {
            this.hospitals = response.data;
            console.log(this.hospitals)
          })
          .catch((error) => {
            console.log(error);
            this.$toast.error("Erreur : " + error.response.data.detail);
            setTimeout(this.$toast.clear, 3000);
          });
    }
  }
}
</script>

<style scoped>

</style>