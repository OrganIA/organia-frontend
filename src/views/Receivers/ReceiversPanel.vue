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
            <router-link to="/receivers/add" class="button add-btn cypress-to-add">
              <i class="fa fa-solid fa-plus icon-add-btn-correction"></i>
              <span class="btn-add-text">Ajouter</span>
            </router-link>
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
            <tr v-for="receiver in receivers" :key="receiver">
              <td>{{ receiver.person.first_name }}</td>
              <td>{{ receiver.person.last_name }}</td>
              <td>{{ receiver.person.birthday }}</td>
              <td>{{ receiver.person.gender }}</td>
              <td>{{ receiver.person.blood_type }}</td>
              <td>{{ receiver.organ }}</td>
              <td>{{ receiver.tumors_number }}</td>
              <td>{{ receiver.isDialyse ? "Oui" : "Non" }}</td>
              <td>{{ receiver.isRetransplantation ? "Oui" : "Non" }}</td>
              <td>{{ receiver.startDateDialyse }}</td>
              <td>{{ receiver.endDateDialyse }}</td>
              <td>{{ receiver.person.created_at }}</td>
              <td>
                <router-link :to="`/receivers/edit/${receiver.person.id}`">
                  <i class="fas fa-edit button is-primary"></i>
                </router-link>
              </td>
              <td>
                <i class="fas fa-info cypress-receiver-modal" @click="openModal(receiver)"></i>
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
                  <button class="button is-info is-light contents">{{ currentReceiver.person.last_name }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Prénom</p>
                  <button class="button is-info is-light contents">{{ currentReceiver.person.first_name }}</button>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Âge</p>
                  <button class="button is-info is-light contents">{{ currentReceiver.person.age }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Date de naissance</p>
                  <button class="button is-info is-light contents">{{ currentReceiver.person.birthday }}</button>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Genre</p>
                  <button class="button is-info is-light contents">{{ currentReceiver.person.gender }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Groupe Sanguin</p>
                  <button class="button is-info is-light contents">{{ currentReceiver.person.blood_type }}</button>
                </div>
              </div>
              <div v-if="currentReceiver.person.description != null">
                <p class="button is-medium is-fullwidth elements">Description</p>
                <button class="button is-light contents">{{
                currentReceiver.person.description
                }}</button>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Date de création</p>
                  <button class="button is-info is-light contents">{{ currentReceiver.person.created_at }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Date de dernière édition</p>
                  <button v-if="currentReceiver.person.updated_at != null" class="button is-info is-light contents">{{
                  currentReceiver.person.updated_at
                  }}</button>
                  <button v-else class="button is-info is-light contents">Aucune modification effectuée.</button>
                </div>
              </div>
              <div v-if="currentReceiver.person.DateTransplantation != null">
                <p class="button is-medium is-fullwidth elements">Date de retransplantation</p>
                <button class="button is-light contents">{{
                currentReceiver.person.DateTransplantation
                }}</button>
              </div>
              <div v-if="currentReceiver.person.ReRegistrationDate != null">
                <p class="button is-medium is-fullwidth elements">Date d'enregistrement</p>
                <button class="button is-light contents">{{
                currentReceiver.person.ReRegistrationDate
                }}</button>
              </div>
              <div v-if="currentReceiver.person.alpha_fetoprotein != null">
                <p class="button is-medium is-fullwidth elements">Alpha Fetoprotein</p>
                <button class="button is-light contents">{{
                currentReceiver.person.alpha_fetoprotein
                }}</button>
              </div>
              <div v-if="currentReceiver.person.biggest_tumor_size != null">
                <p class="button is-medium is-fullwidth elements">La plus grande taille de tumeurs</p>
                <button class="button is-light contents">{{
                currentReceiver.person.biggest_tumor_size
                }}</button>
              </div>
              <div v-if="currentReceiver.person.end_date != null">
                <p class="button is-medium is-fullwidth elements">Date de fin</p>
                <button class="button is-light contents">{{
                currentReceiver.person.end_date
                }}</button>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Organe</p>
                  <button class="button is-info is-light contents">{{ currentReceiver.organ }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Nombres de tumeurs</p>
                  <button class="button is-info is-light contents">{{ currentReceiver.tumors_number }}</button>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium elements">Sous dialyse ?</p>
                  <button v-if="currentReceiver.person.isDialyse" class="button is-info is-light contents">{{
                  Oui
                  }}</button>
                  <button v-else class="button is-info is-light contents">Non</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium elements is-size-6">Retransplantation effectuée? ?</p>
                  <button v-if="currentReceiver.person.isRetransplantation" class="button is-info is-light contents ">{{
                  Oui
                  }}</button>
                  <button v-else class="button is-info is-light contents">Non</button>
                </div>
              </div>
              <div v-if="currentReceiver.person.startDateDialyse != null">
                <p class="button column is-medium elements">Date de début de dialyse</p>
                <button class="button is-light contents">{{
                currentReceiver.person.startDateDialyse
                }}</button>
              </div>
              <div v-if="currentReceiver.person.EndDateDialyse != null">
                <p class="button column is-medium elements">Date de fin de dialyse</p>
                <button class="button is-light contents">{{
                currentReceiver.person.EndDateDialyse
                }}</button>
              </div>
              <div v-if="currentReceiver.person.notes != null">
                <p class="button column is-medium elements">Notes</p>
                <button class="button is-light contents">{{
                currentReceiver.person.notes
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
import SideBar from "@/components/SideBar";
import ApplicationNavbar from "@/components/ApplicationNavbar";

export default {
  components: { SideBar, ApplicationNavbar },
  name: "receivers-panel",
  data() {
    return {
      currentReceiver: {
        person: {}
      },
      receivers: {},
      modal: false,
      sortingOrder: true,
      sortingKey: "created_at",
      selectFilter: "first_name",
      filterText: "",
      receiversBackup: [],
    };
  },
  created() {
    this.getAllReceivers();
  },
  methods: {
    getAllReceivers() {
      this.$http
        .get("/listings/receivers")
        .then((response) => {
          response.data.forEach((element) => {
            element.person.created_at = new Date(
              element.person.created_at
            ).toDateString();
          });
          this.receivers = response.data;
          this.receiversBackup = this.receivers;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModal(receiver) {
      console.log("OH YEAH");
      if (!this.modal) {
        this.modal = true;
        this.currentReceiver = receiver;
      }
    },
    closeModal() {
      this.modal = false;
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
      if (["first_name", "last_name", "gender", "blood_type"].includes(this.sortingKey)) {
        this.receivers.sort((a, b) => {
          if (a.person[this.sortingKey] == null ||
            b.person[this.sortingKey] == null)
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
        this.receivers.sort((a, b) => {
          if (a.person[this.sortingKey] == null ||
            b.person[this.sortingKey] == null)
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
        this.receivers.sort((a, b) => {
          if (a.person[this.sortingKey] == null ||
            b.person[this.sortingKey] == null)
            return this.checkNull(a, b);
          if (this.sortingOrder) return a.organ.localeCompare(b.organ);
          return b.organ.localeCompare(a.organ);
        });
      }
    },
    filter() {
      if (this.filterText == "") {
        this.receivers = this.receiversBackup;
        return;
      }
      if (this.selectFilter in this.receiversBackup[0].person) {
        this.receivers = this.receiversBackup.filter((el) => {
          if (el.person[this.selectFilter] != null)
            return el.person[this.selectFilter].includes(this.filterText);
        });
      } else {
        this.receivers = this.receiversBackup.filter((el) => {
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


.add-btn {
  float: right;
  width: 150px;
  height: 50px;
  margin-right: 15px;
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