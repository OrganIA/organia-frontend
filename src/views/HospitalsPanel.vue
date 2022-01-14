<template>
  <div id="main">
    <h1>Liste des hôpitaux</h1>
    <p>
      <router-link to="/donors/add" class="button is-info is-info mb-6 cypress-to-add"
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
        <th @click="updateFilter('first_name')">Prénom</th>
        <th @click="updateFilter('last_name')">Nom de famille</th>
        <th @click="updateFilter('birthday')">Date de naissance</th>
        <th @click="updateFilter('gender')">Sexe</th>
        <th @click="updateFilter('blood_type')">ABO</th>
        <th @click="updateFilter('organ')">Organe</th>
        <th @click="updateFilter('created_at')">Arrivée</th>
        <th>Éditer</th>
        <th>Infos</th>
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
            <i class="fas fa-edit button is-primary"></i>
          </router-link>
        </td>
        <td>
          <i class="fas fa-info cypress-donor-modal" @click="openModal(donor)"></i>
        </td>
      </tr>
      </tbody>
    </table>
    <person-details
        v-if="showModal == true"
        :person="currentDonor"
        @closeModal="closeModal"
        class="details"
    />
  </div>
</template>

<script>
export default {
  name: "HospitalsPanel"
}
</script>

<style scoped>

</style>