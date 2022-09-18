<template>
  <div class="app-navbar-container">
    <ApplicationNavbar></ApplicationNavbar>
  </div>
  <div class="columns">
    <div class="column sidebar-column">
      <SideBar></SideBar>
    </div>
    <div class="column page-container">
      <div class="page-content">
        <div class="role-panel-btn-container">
          <div>
            <router-link to="/donors/add" class="button add-btn cypress-to-add">
              <i class="fa fa-solid fa-plus icon-add-btn-correction"></i>
              <span class="btn-add-text">Ajouter</span>
            </router-link>
          </div>
        </div>
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
          <div class="fa fa-solid fa-angle-down icon-dropdown-correction"></div>
          <input @input="filter" v-model="filterText" class="search-bar input mr-6" />
          <br />
        </div>
        <table class="table-scroll">
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
        <div class="modal" :class="{ 'is-invisible': !modal, 'is-active': modal }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Informations du receveur</p>
              <button class="delete" aria-label="close" @click="closeModal"></button>
            </header>
            <section class="modal-card-body">
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Nom de famille</p>
                  <button class="button is-info is-light contents">{{ currentDonor.person.last_name }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Prénom</p>
                  <button class="button is-info is-light contents">{{ currentDonor.person.first_name }}</button>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Âge</p>
                  <button class="button is-info is-light contents">{{ currentDonor.person.age }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Date de naissance</p>
                  <button class="button is-info is-light contents">{{ currentDonor.person.birthday }}</button>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Genre</p>
                  <button class="button is-info is-light contents">{{ currentDonor.person.gender }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Groupe Sanguin</p>
                  <button class="button is-info is-light contents">{{ currentDonor.person.blood_type }}</button>
                </div>
              </div>
              <div v-if="currentDonor.person.description != null">
                <p class="button is-medium is-fullwidth elements">Description</p>
                <button class="button is-light contents">{{
                currentDonor.person.description
                }}</button>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Date de création</p>
                  <button class="button is-info is-light contents">{{ currentDonor.person.created_at }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Date de dernière édition</p>
                  <button v-if="currentDonor.person.updated_at != null" class="button is-info is-light contents">{{
                  currentDonor.person.updated_at
                  }}</button>
                  <button v-else class="button is-info is-light contents">Aucune modification effectuée.</button>
                </div>
              </div>
              <div v-if="currentDonor.person.DateTransplantation != null">
                <p class="button is-medium is-fullwidth elements">Date de retransplantation</p>
                <button class="button is-light contents">{{
                currentDonor.person.DateTransplantation
                }}</button>
              </div>
              <div v-if="currentDonor.person.ReRegistrationDate != null">
                <p class="button is-medium is-fullwidth elements">Date d'enregistrement</p>
                <button class="button is-light contents">{{
                currentDonor.person.ReRegistrationDate
                }}</button>
              </div>
              <div v-if="currentDonor.person.alpha_fetoprotein != null">
                <p class="button is-medium is-fullwidth elements">Alpha Fetoprotein</p>
                <button class="button is-light contents">{{
                currentDonor.person.alpha_fetoprotein
                }}</button>
              </div>
              <div v-if="currentDonor.person.biggest_tumor_size != null">
                <p class="button is-medium is-fullwidth elements">La plus grande taille de tumeurs</p>
                <button class="button is-light contents">{{
                currentDonor.person.biggest_tumor_size
                }}</button>
              </div>
              <div v-if="currentDonor.person.end_date != null">
                <p class="button is-medium is-fullwidth elements">Date de fin</p>
                <button class="button is-light contents">{{
                currentDonor.person.end_date
                }}</button>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Organe</p>
                  <button class="button is-info is-light contents">{{ currentDonor.organ }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Nombres de tumeurs</p>
                  <button class="button is-info is-light contents">{{ currentDonor.tumors_number }}</button>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium elements">Sous dialyse?</p>
                  <button v-if="currentDonor.person.isDialyse" class="button is-info is-light contents">{{
                  Oui
                  }}</button>
                  <button v-else class="button is-info is-light contents">Non</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium elements is-size-6">Retransplantation effectuée?</p>
                  <button v-if="currentDonor.person.isRetransplantation" class="button is-info is-light contents ">{{
                  Oui
                  }}</button>
                  <button v-else class="button is-info is-light contents">Non</button>
                </div>
              </div>
              <div v-if="currentDonor.person.startDateDialyse != null">
                <p class="button column is-medium elements">Date de début de dialyse</p>
                <button class="button is-light contents">{{
                currentDonor.person.startDateDialyse
                }}</button>
              </div>
              <div v-if="currentDonor.person.EndDateDialyse != null">
                <p class="button column is-medium elements">Date de fin de dialyse</p>
                <button class="button is-light contents">{{
                currentDonor.person.EndDateDialyse
                }}</button>
              </div>
              <div v-if="currentDonor.person.notes != null">
                <p class="button column is-medium elements">Notes</p>
                <button class="button is-light contents">{{
                currentDonor.person.notes
                }}</button>
              </div>
            </section>
            <footer class="modal-card-foot">
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// import PersonDetails from "@/components/PersonDetails.vue";
import SideBar from "@/components/SideBar";
import ApplicationNavbar from "@/components/ApplicationNavbar";

export default {
  components: { SideBar, ApplicationNavbar },
  name: "donors-panel",
  data() {
    return {
      donors: {},
      modal: false,
      currentDonor: {
        person: {}
      },
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
        });
    },
    openModal(donor) {
      if (!this.modal) {
        this.modal = true;
        this.currentDonor = donor;
      }
    },
    closeModal() {
      this.modal = false;
      this.currentDonor = {
        person: {}
      };
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

<style scoped>
.table-scroll {
  overflow-x: scroll;
  display: flex;
  flex-direction: column;
  white-space: break-spaces;
  table-layout: fixed;
  max-width: 1100px;
}

th,
td {
  text-align: left;
  min-width: 160px;
}

.role-panel-btn-container {
  padding: 25px 0 25px 25px;

  width: 100%;
  position: relative;
  display: block;
  flex-direction: row;
}

.page-content {
  max-width: 96%;
  margin-left: 10px;

}

.add-btn:hover {
  background-color: #2d6594;
  outline: none;
  text-decoration: none;

}

thead tr {
  width: 100% !important;
}

table {
  width: 100%;
}

.add-btn {
  float: right;
  width: 10%;
  height: 50px;
  background-color: #6799c4;
}


.icon-dropdown-correction {
  position: relative;
  margin-top: 12px;
  margin-left: -45px;
  margin-right: 40px;
}

.btn-add-text {
  color: white;
  margin-left: 5px;
}

.icon-add-btn-correction {
  color: white;
  margin-right: 5px;
  margin-top: -1px;
}
</style>
