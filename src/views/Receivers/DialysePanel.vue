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
            <option value="startDateDialyse">Date de début de dialyse</option>
            <option value="endDateDialyse">Date de fin de dialyse</option>
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
            <th @click="updateFilter('startDateDialyse')">Date de début de dialyse</th>
            <th @click="updateFilter('endDateDialyse')">Date de fin de dialyse</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="receiver in receivers" :key="receiver">
            <td>{{ receiver.person.first_name }}</td>
            <td>{{ receiver.person.last_name }}</td>
            <td>{{ receiver.person.birthday }}</td>
            <td>{{ receiver.startDateDialyse }}</td>
            <td>{{ receiver.endDateDialyse }}</td>
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
  name: "dialyse-panel",
  components: {SideBar, ApplicationNavbar},
  data() {
    return {
      receivers: {},
      receivers_dialyse: [],
      showModal: false,
      currentReceiver: {},
      sortingOrder: true,
      sortingKey: "created_at",
      selectFilter: "first_name",
      filterText: "",
      receiversBackup: [],
    };
  },
  created() {
    this.getAllDialyse();
  },
  methods: {
    getAllDialyse() {
      this.$http
        .get("/listings/")
        .then((response) => {
          response.data.forEach((element) => {
            element.person.created_at = new Date(
              element.person.created_at
            ).toDateString();
          });
          this.receivers = response.data;
          this.receivers.forEach((element) => {
            if (element.isDialyse == true) {
              this.receivers_dialyse.push(element);
              if (element.startDateDialyse == null)
                element.startDateDialyse = "Aucune date informée";
            }
          });
          this.receiversBackup = this.receivers_dialyse;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModal(receiver) {
      if (!this.showModal) {
        this.showModal = true;
        this.currentReceiver = receiver;
        document.getElementById("bodiv").style.display = "initial";
      }
    },
    closeModal() {
      this.showModal = false;
      this.currentReceiver = {};
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
        this.receivers_dialyse = this.receiversBackup;
        return;
      }
      if (this.selectFilter in this.receiversBackup[0].person) {
        this.receivers_dialyse = this.receiversBackup.filter((el) => {
          if (el.person[this.selectFilter] != null)
            return el.person[this.selectFilter].includes(this.filterText);
        });
      } else {
        this.receivers_dialyse = this.receiversBackup.filter((el) => {
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

thead tr {
  width: 100% !important;
}


.icon-dropdown-correction {
  position: relative;
  margin-top: 12px;
  margin-left: -45px;
  margin-right: 40px;
}


.page-content {
  max-width: 96%;
}

</style>