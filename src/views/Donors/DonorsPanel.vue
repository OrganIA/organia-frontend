<template>
  <div id="main">
    <h1>Liste d'attente donneurs</h1>
    <p>
      <router-link to="/donors/add" class="button is-info mb-6 cypress-to-add">Ajouter</router-link>
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
        <option value="tumors_number">Nombre de tumeurs</option>
        <option value="isDialyse">Dialysé ?</option>
        <option value="isRetransplantation">Retransplantation</option>
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
          <th @click="updateFilter('tumors_number')">Nombre de tumeurs</th>
          <th @click="updateFilter('isDialyse')">Dialysé</th>
          <th @click="updateFilter('isRetransplantation')">Retransplantation</th>
          <th @click="updateFilter('startDateDialyse')">Date de début de dialyse</th>
          <th @click="updateFilter('startDateDialyse')">Date de fin de dialyse</th>
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
          <td>{{ donor.tumors_number }}</td>
          <td>{{ donor.isDialyse ? "Oui" : "Non" }}</td>
          <td>{{ donor.isRetransplantation ? "Oui" : "Non" }}</td>
          <td>{{ donor.startDateDialyse }}</td>
          <td>{{ donor.endDateDialyse }}</td>
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
    <div class="modal" :class="{ 'is-invisible': (state !== 'clicked'), 'is-active': (state === 'clicked') }">
      <div class="modal-background">
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title is-3">Informations du donneur</p>
            <button class="delete" aria-label="close" @click="closeModal"></button>
          </header>
          <section class="modal-card-body">
            <div class="container">
              <div class="columns">
                <div class="column is-half">
                  <button class="button is-medium is-fullwidth elements">Nom de Famille</button>
                  <button class="button is-link is-light contents">{{ currentPerson.last_name }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Prénom</p>
                  <button class="button is-link is-light contents">{{ currentPerson.first_name }}</button>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Âge</p>
                  <button class="button is-link is-light contents">{{ currentPerson.age }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Date de naissance</p>
                  <button class="button is-link is-light contents">{{ currentPerson.birthday }}</button>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Genre</p>
                  <button class="button is-link is-light contents">{{ currentPerson.gender }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Groupe Sanguin</p>
                  <button class="button is-link is-light contents">{{ currentPerson.blood_type }}</button>
                </div>
              </div>
              <div v-if="currentPerson.description != null">
                <p class="button is-medium is-fullwidth elements">Description</p>
                <button class="button is-light contents">{{
                    currentPerson.description
                }}</button>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Date de création</p>
                  <button class="button is-link is-light contents">{{ currentPerson.created_at }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Date de dernière édition</p>
                  <button v-if="currentPerson.updated_at != null" class="button is-link is-light contents">{{
                      currentPerson.updated_at
                  }}</button>
                  <button v-else class="button is-link is-light contents">Aucune modification effectuée.</button>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Organe</p>
                  <button class="button is-link is-light contents">{{ currentDonor.organ }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Nombres de tumeurs</p>
                  <button class="button is-link is-light contents">{{ currentDonor.tumors_number }}</button>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium elements">Le patient est sous dialyse ?</p>
                  <button v-if="currentPerson.isDialyse" class="button is-link is-light contents">{{
                      Oui
                  }}</button>
                  <button v-else class="button is-link is-light contents">Non</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium elements is-size-6">A-t-il effectué une retransplantation ?</p>
                  <button v-if="currentPerson.isRetransplantation" class="button is-link is-light contents ">{{
                      Oui
                  }}</button>
                  <button v-else class="button is-link is-light contents">Non</button>
                </div>
              </div>
              <div v-if="currentPerson.startDateDialyse != null">
                <p class="button column is-medium elements">Date de début de dialyse</p>
                <button class="button is-light contents">{{
                    currentPerson.startDateDialyse
                }}</button>
              </div>
              <div v-if="currentPerson.EndDateDialyse != null">
                <p class="button column is-medium elements">Date de fin de dialyse</p>
                <button class="button is-light contents">{{
                    currentPerson.EndDateDialyse
                }}</button>
              </div>
              <div v-if="currentPerson.notes != null">
                <p class="button column is-medium elements">Notes</p>
                <button class="button is-light contents">{{
                    currentPerson.notes
                }}</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "donors-panel",
  data() {
    return {
      donors: {},
      showModal: false,
      currentDonor: {},
      currentPerson: {},
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
      this.currentDonor = donor
      this.currentPerson = donor.person
      this.state = "clicked"
    },
    closeModal() {
      this.currentDonor = false;
      this.currentPerson = {};
      this.state = ""
    },
    updateFilter(dataName) {
      if (dataName === this.sortingKey) this.sortingOrder = !this.sortingOrder;
      this.sortingKey = dataName;
    },
    checkNull(a, b) {
      if (
        a.person[this.sortingKey] == null &&
        b.person[this.sortingKey] == null
      )
        return 0;
      if (a.person[this.sortingKey] == null) return 1;
      else if (b.person[this.sortingKey] == null) return -1;
      return 0;
    },
    sortData() {
      if (
        ["first_name", "last_name", "gender", "blood_type"].includes(
          this.sortingKey
        )
      ) {
        this.donors.sort((a, b) => {
          if (
            a.person[this.sortingKey] == null ||
            b.person[this.sortingKey] == null
          )
            return this.checkNull(a, b);
          if (this.sortingOrder)
            return a.person[this.sortingKey].localeCompare(
              b.person[this.sortingKey]
            );
          return b.person[this.sortingKey].localeCompare(
            a.person[this.sortingKey]
          );
        });
      } else if (["birthday", "created_at"].includes(this.sortingKey)) {
        this.donors.sort((a, b) => {
          if (
            a.person[this.sortingKey] == null ||
            b.person[this.sortingKey] == null
          )
            return this.checkNull(a, b);
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
            a.person[this.sortingKey] == null ||
            b.person[this.sortingKey] == null
          )
            return this.checkNull(a, b);
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
    },
  },
};
</script>
