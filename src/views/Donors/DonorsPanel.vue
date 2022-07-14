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
        <!-- eslint-disable-next-line no-unused-vars -->
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
            <!-- <i class="fas fa-info cypress-donor-modal" @click="createPDF(index)"></i> -->
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
                  <button v-if="currentDonor.isDialyse == true" class="button is-link is-light contents">
                    <p class= "button is-link is-light contents">Oui</p>    
                  </button>
                  <button v-else class="button is-link is-light contents">Non</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium elements is-size-6">A-t-il effectué une retransplantation ?</p>
                  <button v-if="currentDonor.isRetransplantation" class="button is-link is-light contents ">{{
                      Oui
                  }}</button>
                  <button v-else class="button is-link is-light contents">Non</button>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <div v-if="currentDonor.startDateDialyse != null">
                    <p class="button column is-medium elements">Date de début de dialyse</p>
                    <button class="button is-link is-light contents">{{
                        currentDonor.startDateDialyse
                    }}</button>
                  </div>
                </div>
                <div class="column is-half">
                  <div v-if="currentDonor.EndDateDialyse != null">
                    <p class="button column is-medium elements">Date de fin de dialyse</p>
                    <button class="button is-light contents">{{
                        currentDonor.EndDateDialyse
                    }}</button>
                  </div>
                </div>
              </div>
              <div v-if="currentDonor.notes != null">
                <p class="button column is-medium elements">Notes</p>
                <button class="button is-light contents">{{
                    currentDonor.notes
                }}</button>
              </div>
              <div>
                <button class="button is-light contents" @click="createPDF()">
                  <p>Télécharger la version PDF</p>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
  <div ref="content" data-html2canvas-ignore="true" hidden>
    <div v-if="donors != undefined">
      <h1>Bilan d'informations Donneur</h1>
      <p>Prénom: {{currentPerson.first_name}} </p>
      <p>Nom de famille: {{currentPerson.last_name}}</p>
      <p>Date de naissance: {{currentPerson.birthday}}</p>
      <div v-if="currentPerson.gender == 'MALE'">
        <p>Sexe: Masculin</p>
      </div>
      <div v-else>
        <p>Sexe: Féminin</p>
      </div>
      <p>Type sanguin (ABO): {{currentPerson.blood_type}}</p>
      <div v-if="currentDonor.organ == 'HEART'">
        <p>Organe: Coeur</p>
      </div>
      <div v-else-if="currentDonor.organ == 'KIDNEY'">
        <p>Organe: Reins</p>
      </div>
      <div v-else>
        <p>Organe: Poumons</p>
      </div>
      <p>Nombre de tumeurs: {{currentDonor.tumors_number}}</p>
      <div v-if="currentDonor.isDialyse == true">
        <p>Dialysé: Oui</p>
      </div>
      <div v-else>
        <p>Dialysé: Non</p>
      </div>
      <div v-if="currentDonor.isRetransplantation == true">
        <p>Retransplantation: Oui</p>
      </div>
      <div v-else>
        <p>Retransplantation: Non</p>
      </div>
      <p>Date de début de dialyse: {{currentDonor.startDateDialyse}}</p>
      <p>Date de fin de dialyse: {{currentDonor.endDateDialyse}}</p>
      <p>Arrivée: {{currentPerson.created_at}}</p>
      </div>
  </div>
</template>

<script>
import jsPDF from 'jspdf'

export default {
  name: "donors-panel",
  data() {
    return {
      donors: {},
      showModal: false,
      index: 0,
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
    createPDF() {
      let pdfName = 'donor_' + this.currentPerson.last_name;
      const doc = new jsPDF();
      /** WITHOUT CSS */
      const contentHtml = this.$refs.content.innerHTML;
      doc.fromHTML(contentHtml, 15, 15, {
          width: 170
        });
      doc.save(pdfName + ".pdf");
    },
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
            console.log(this.currentDonor)

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
