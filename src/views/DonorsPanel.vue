<template>
  <div id="main">
    <h1>Liste d'attente</h1>
    <p>
      <router-link to="/donors/add" class="button cypress-to-add"
        >Ajouter</router-link
      >
    </p>
    <div class="search-block">
      <p class="search">Search by</p>
      <select v-model="selectFilter" class="search-filter">
        <option value="first_name">Prénom</option>
        <option value="last_name">Nom</option>
        <option value="birthday">Date de naissance</option>
        <option value="gender">Sexe</option>
        <option value="blood_type">ABO</option>
        <option value="organ">Organe</option>
        <option value="created_at">Arrivée</option>
      </select>
      <input @input="filter" v-model="filterText" class="search-bar" />
      <br />
    </div>
    <table class="table-list">
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
              <i class="fas fa-edit"></i>
            </router-link>
          </td>
          <td>
            <i class="fas fa-info-circle cypress-donor-modal" @click="openModal(donor)"/>
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
import PersonDetails from "../components/PersonDetails.vue";

export default {
  components: { PersonDetails },
  name: "DonorsPanel",
  data() {
    return {
      donors: {},
      showModal: false,
      currentDonor: {},
      sortingOrder: true,
      sortingKey: "created_at",
      selectFilter: "first_name",
      filterText: "",
      donorsBackup: [],
    };
  },
  created() {
    this.getAllDonors();
  },
  methods: {
    getAllDonors() {
      this.$http
        .get("/listings/donors", {
          headers: { Authorization: `Bearer ${this.$cookies.get("token")}` },
        })
        .then((response) => {
          response.data.forEach((element) => {
            element.person.created_at = new Date(
              element.person.created_at
            ).toDateString();
          });
          this.donors = response.data;
          this.donorsBackup = this.donors;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
    openModal(donor) {
      if (!this.showModal) {
        this.showModal = true;
        this.currentDonor = donor;
        document.getElementById("bodiv").style.display = "initial";
      }
    },
    closeModal() {
      this.showModal = false;
      this.currentDonor = {};
      document.getElementById("bodiv").style.display = "none";
    },
    updateFilter(dataName) {
      if (dataName === this.sortingKey) this.sortingOrder = !this.sortingOrder;
      this.sortingKey = dataName;
    },
    sortData() {
      if (
        this.sortingKey == "first_name" ||
        this.sortingKey == "last_name" ||
        this.sortingKey == "gender" ||
        this.sortingKey == "blood_type"
      ) {
        this.donors.sort((a, b) => {
          if (
            a.person[this.sortingKey] == null &&
            b.person[this.sortingKey] == null
          )
            return 0;
          else if (a.person[this.sortingKey] == null) return 1;
          else if (b.person[this.sortingKey] == null) return -1;
          if (this.sortingOrder)
            return a.person[this.sortingKey].localeCompare(
              b.person[this.sortingKey]
            );
          return b.person[this.sortingKey].localeCompare(
            a.person[this.sortingKey]
          );
        });
      } else if (
        this.sortingKey === "birthday" ||
        this.sortingKey == "created_at"
      ) {
        this.donors.sort((a, b) => {
          if (
            a.person[this.sortingKey] == null &&
            b.person[this.sortingKey] == null
          )
            return 0;
          else if (a.person[this.sortingKey] == null) return 1;
          else if (b.person[this.sortingKey] == null) return -1;
          if (this.sortingOrder)
            return Date.parse(a.person[this.sortingKey]) >
              Date.parse(b.person[this.sortingKey])
              ? -1
              : 1;
          return Date.parse(b.person[this.sortingKey]) >
            Date.parse(a.person[this.sortingKey])
            ? -1
            : 1;
        });
      } else if (this.sortingKey == "organ") {
        this.donors.sort((a, b) => {
          if (
            a.person[this.sortingKey] == null &&
            b.person[this.sortingKey] == null
          )
            return 0;
          else if (a.person[this.sortingKey] == null) return 1;
          else if (b.person[this.sortingKey] == null) return -1;
          if (this.sortingOrder) return a.organ.localeCompare(b.organ);
          return b.organ.localeCompare(a.organ);
        });
      }
    },
    filter() {
      if (this.filterText == "") {
        this.donors = this.donorsBackup;
        return;
      }
      if (this.selectFilter in this.donorsBackup[0].person) {
        this.donors = this.donorsBackup.filter((el) => {
          if (el.person[this.selectFilter] != null)
            return el.person[this.selectFilter].includes(this.filterText);
        });
      } else {
        this.donors = this.donorsBackup.filter((el) => {
          if (el[this.selectFilter] != null)
            return el[this.selectFilter].includes(this.filterText);
        });
      }
    },
  },
  watch: {
    sortingKey() {
      this.sortData();
    },
    sortingOrder() {
      this.sortData();
    },
    selectFilter() {
      console.log(this.selectFilter);
    },
  },
};
</script>
