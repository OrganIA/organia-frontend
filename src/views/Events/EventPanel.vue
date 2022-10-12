<template>
  <div id="main">
    <h1>Evenements</h1>
    <p>
      <router-link to="/eventlist/add" class="button is-info mb-6 cypress-to-add">Ajouter</router-link>
    </p>
    <p class="search content">Rechercher par</p>
    <div class="search-block">
      <select v-model="selectFilter" class="search-filter button mb-4 ml-6 is-info is-light">
                <option value="start_date">Date de debut</option>
        <option value="end_date">Date de fin</option>
        <option value="title">Titre</option>
        <option value="description">Description</option>
        <option value="created_at">Date de creation</option>
      </select>
      <input @input="filter" v-model="filterText" class="search-bar input mr-6" />
      <br />
    </div>
    <table class="
        table
        is-bordered is-striped is-narrow is-hoverable is-fullwidth is-info
      ">
      <thead>
        <tr>
          <th @click="updateFilter('start_date')">Date de debut</th>
          <th @click="updateFilter('end_date')">Date de fin</th>
          <th @click="updateFilter('title')">Titre</th>
          <th @click="updateFilter('description')">Description</th>
          <th @click="updateFilter('created_at')">Date de creation</th>
          <th>Éditer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="calendar in events" :key="calendar">
          <td>{{ calendar.start_date }}</td>
          <td>{{ calendar.end_date }}</td>
          <td>{{ calendar.title }}</td>
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
      state: '',
      editstate: '',
      events: {},
      currentEvent: {},
      sortingOrder: true,
      sortingKey: "date",
      selectFilter: "date",
      filterText: "",
      eventsBackup: [],
      date: "",
      description: "",
      calendar: {},
      to_edit_id: 0,
    };
  },
  created() {
    this.getAllevents();
  },
  methods: {
    openModal(val) {
      if (val === true) {
        this.state = "clicked"
        return;
      }
      this.state = ""


    },
    openEditModal(val, id) {
      if (val === true) {
        this.editstate = "clicked"
        this.to_edit_id = id
        this.geteventByID()
        return;
      }
      this.editstate = ""


    },
    getAllevents() {
      this.$http
        .get("/calendar", {
          headers: { Authorization: `Bearer ${this.$cookies.get("token")}` },
        })
        .then((response) => {
          response.data.forEach((element) => {
            element.start_date = moment(String(element.start_date)).format(
              "DD/MM/YYYY hh:mm"
            );
            element.end_date = moment(String(element.end_date)).format(
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
      if (a.start_date[this.sortingKey] == null && b.start_date[this.sortingKey] == null)
        return 0;
      if (a.start_date[this.sortingKey] == null) return 1;
      else if (b.start_date[this.sortingKey] == null) return -1;
      return 0;
    },
    geteventByID() {
      this.$http
          .get(`/calendar/${this.to_edit_id}`)
          .then((response) => {
            this.calendar = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    submitEditForm() {
      this.$http
          .post(`/calendar/${this.to_edit_id}`, {
            title: this.caendar.title,
            start_date: this.calendar.start_date,
            end_date: this.calendar.end_date,
            description: this.calendar.description,
          })
          .then(() => {
            this.$router.push("/eventlist");
          })
          .catch((error) => {
            console.log(error);
          });
    },
    delete_event() {
      this.$http
          .delete(`/calendar/${this.to_edit_id}`)
          .then(() => {
            this.$toast.success("Suppression effectuée");
            this.$router.push("/eventlist");
          })
          .catch((error) => {
            console.log(error);
          });
    },
    createEvent() {
      this.$http
          .post("/calendar", {
            title: this.title
            start_date: this.start_date,
            end_date: this.end_date,
            ...(this.description ? { description: this.description } : {}),
          })
          .then((response) => {
            this.event_id = response.data.id;
            this.$router.push("/eventlist")
            this.openModal(false)
          })
          .catch((error) => {
            console.log(error)
          });
    },
    sortData() {
      if (["description"].includes(this.sortingKey)) {
        this.events.sort((a, b) => {
          if (
            a.start_date[this.sortingKey] == null ||
            b.start_date[this.sortingKey] == null
          )
            return this.checkNull(a, b);
          if (this.sortingOrder)
            return a.start_date[this.sortingKey].localeCompare(
              b.start_date[this.sortingKey]
            );
          return b.start_date[this.sortingKey].localeCompare(a.start_date[this.sortingKey]);
        });
      } else if (["start_date"].includes(this.sortingKey)) {
        this.events.sort((a, b) => {
          if (
            a.start_date[this.sortingKey] == null ||
            b.start_date[this.sortingKey] == null
          )
            return this.checkNull(a, b);
          if (this.sortingOrder)
            return Date.parse(a.start_date[this.sortingKey]) >
              Date.parse(b.start_date[this.sortingKey])
              ? -1
              : 1;
          return Date.parse(b.start_date[this.sortingKey]) >
            Date.parse(a.start_date[this.sortingKey])
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
          if (el.start_date[this.selectFilter] != null)
            return el.start_date[this.selectFilter].includes(this.filterText);
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
