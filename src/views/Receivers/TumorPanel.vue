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
        <div class="search-block">
          <select v-model="selectFilter" class="search-filter button mb-4 ml-6 is-info is-light">
            <option value="first_name">Prénom</option>
            <option value="last_name">Nom</option>
            <option value="birthday">Date de naissance</option>
            <option value="tumor">Sous tumeurs</option>
          </select>
          <div class="fa fa-solid fa-angle-down icon-dropdown-correction"></div>
          <input @input="filter" v-model="filterText" class="search-bar input mr-6"/>
          <br/>
        </div>
        <table>
          <thead>
          <tr>
            <th @click="updateFilter('first_name')">Prénom</th>
            <th @click="updateFilter('last_name')">Nom de famille</th>
            <th @click="updateFilter('birthday')">Date de naissance</th>
            <th @click="updateFilter('tumor')">Nombre de tumeurs</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="person in person_tumors" :key="person">
            <td>{{ person.person.first_name }}</td>
            <td>{{ person.person.last_name }}</td>
            <td>{{ person.person.birthday }}</td>
            <td>{{ person.tumors_number }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import SideBar from "@/components/SideBar";
import ApplicationNavbar from "@/components/ApplicationNavbar";

export default {
  name: "tumor-panel",
  components: {SideBar, ApplicationNavbar},
  data() {
    return {
      person: {},
      person_tumors: [],
      showModal: false,
      currentperson: {},
      sortingOrder: true,
      sortingKey: "created_at",
      selectFilter: "first_name",
      filterText: "",
      personBackup: [],
    };
  },
  created() {
    this.getAllTumors();
  },
  methods: {
    getAllTumors() {
      this.$http
          .get("/listings/")
          .then((response) => {
            response.data.forEach((element) => {
              element.person.created_at = new Date(
                  element.person.created_at
              ).toDateString();
            });
            this.person = response.data;
            this.person.forEach((element) => {
              if (element.tumors_number > 0) {
                this.person_tumors.push(element);
              }
            });
            this.personBackup = this.person_tumors;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    openModal(person) {
      if (!this.showModal) {
        this.showModal = true;
        this.currentperson = person;
        document.getElementById("bodiv").style.display = "initial";
      }
    },
    closeModal() {
      this.showModal = false;
      this.currentperson = {};
      document.getElementById("bodiv").style.display = "none";
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
        this.person.sort((a, b) => {
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
        this.person.sort((a, b) => {
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
        this.person.sort((a, b) => {
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
        this.persons_dialyse = this.personBackup;
        return;
      }
      if (this.selectFilter in this.personBackup[0].person) {
        this.persons_dialyse = this.personBackup.filter((el) => {
          if (el.person[this.selectFilter] != null)
            return el.person[this.selectFilter].includes(this.filterText);
        });
      } else {
        this.persons_dialyse = this.personBackup.filter((el) => {
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
.page-content {
  max-width: 96%;
  margin-left: 60px;

}

thead tr {
  width: 100% !important;
}


.icon-dropdown-correction {
  position: relative;
  margin-top: 12px;
  margin-left: -45px;
  margin-right: 40px;
}
</style>