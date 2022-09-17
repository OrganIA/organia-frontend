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
        <div id="main">
          <div class="event-panel-btn-container">
            <router-link to="/eventlist/add" class="button is-info is-info mb-6 cypress-to-hospitals-add add-btn">
              <i class="fa fa-solid fa-plus icon-add-btn-correction"></i>
              <span class="btn-add-text">Ajouter</span>
            </router-link>
          </div>
          <div class="search-block">
            <select v-model="selectFilter" class="search-filter button mb-4 ml-6 is-info is-light">
              <option value="date">Date</option>
              <option value="description">Description</option>
              <option value="created_at">Date de creation</option>
            </select>
            <input @input="filter" v-model="filterText" class="search-bar input mr-6" />
            <br />
          </div>
          <table>
            <thead>
              <tr>
                <th @click="updateFilter('date')">Date</th>
                <th @click="updateFilter('description')">Description</th>
                <th @click="updateFilter('created_at')">Date de creation</th>
                <th>Éditer</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="calendar in events" :key="calendar">
                <td>{{ calendar.date }}</td>
                <td>{{ calendar.description }}</td>
                <td>{{ calendar.created_at }}</td>
                <td>
                  <router-link :to="`/eventlist/edit/${calendar.id}`">
                    <i class="fas fa-edit button is-primary"></i>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import ApplicationNavbar from "@/components/ApplicationNavbar";
import SideBar from "@/components/SideBar";

export default {
  name: "event-panel",
  components: { SideBar, ApplicationNavbar },
  data() {
    return {
      events: {},
      currentEvent: {},
      sortingOrder: true,
      sortingKey: "date",
      selectFilter: "date",
      filterText: "",
      eventsBackup: [],
    };
  },
  created() {
    this.getAllevents();
  },
  methods: {
    getAllevents() {
      this.$http
        .get("/calendar", {
          headers: { Authorization: `Bearer ${this.$cookies.get("token")}` },
        })
        .then((response) => {
          response.data.forEach((element) => {
            element.date = moment(String(element.date)).format(
              "DD/MM/YYYY hh:mm"
            );
            element.created_at = moment(String(element.created_at)).format(
              "DD/MM/YYYY hh:mm"
            );
          });
          this.events = response.data;
          this.eventsBackup = this.calendar;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateFilter(dataName) {
      if (dataName === this.sortingKey) this.sortingOrder = !this.sortingOrder;
      this.sortingKey = dataName;
    },
    checkNull(a, b) {
      if (a.date[this.sortingKey] == null && b.date[this.sortingKey] == null)
        return 0;
      if (a.date[this.sortingKey] == null) return 1;
      else if (b.date[this.sortingKey] == null) return -1;
      return 0;
    },
    sortData() {
      if (["description"].includes(this.sortingKey)) {
        this.events.sort((a, b) => {
          if (
            a.date[this.sortingKey] == null ||
            b.date[this.sortingKey] == null
          )
            return this.checkNull(a, b);
          if (this.sortingOrder)
            return a.date[this.sortingKey].localeCompare(
              b.date[this.sortingKey]
            );
          return b.date[this.sortingKey].localeCompare(a.date[this.sortingKey]);
        });
      } else if (["date"].includes(this.sortingKey)) {
        this.events.sort((a, b) => {
          if (
            a.date[this.sortingKey] == null ||
            b.date[this.sortingKey] == null
          )
            return this.checkNull(a, b);
          if (this.sortingOrder)
            return Date.parse(a.date[this.sortingKey]) >
              Date.parse(b.date[this.sortingKey])
              ? -1
              : 1;
          return Date.parse(b.date[this.sortingKey]) >
            Date.parse(a.date[this.sortingKey])
            ? -1
            : 1;
        });
      }
    },
    filter() {
      if (this.filterText == "") {
        this.events = this.eventsBackup;
        return;
      }
      if (this.selectFilter in this.eventsBackup[0].event) {
        this.events = this.eventsBackup.filter((el) => {
          if (el.date[this.selectFilter] != null)
            return el.date[this.selectFilter].includes(this.filterText);
        });
      } else {
        this.events = this.eventsBackup.filter((el) => {
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
    selectFilter() { },
  },
};
</script>

<style scoped>
.add-btn {
  float: right;
  width: 10%;
  height: 50px;
  background-color: #6799c4;
  margin-right: 40px;
}


.add-btn:hover {
  background-color: #2d6594;
  outline: none;
  text-decoration: none;

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

.event-panel-btn-container {
  margin-top: 30px;

  padding: 25px 0 -25px 25px;
  width: 100%;
  position: relative;
  display: block;
  flex-direction: row;
}


.main {
  margin-top: 30px;
}
</style>
