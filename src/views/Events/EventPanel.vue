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
            <div @click="openModal(true)"  class="button is-info is-info mb-6 cypress-to-hospitals-add add-btn">
              <i class="fa fa-solid fa-plus icon-add-btn-correction"></i>
              <span class="btn-add-text">Ajouter</span>
            </div>
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
                  <div @click="openEditModal(true, calendar.id)">
                    <i class="fas fa-edit button is-primary"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal" :class="{ 'is-invisible': (state !== 'clicked'), 'is-active': (state === 'clicked') }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Ajouter un Évènement</p>
              <button class="delete" aria-label="close" v-on:click="openModal(false)"></button>
            </header>
            <section class="modal-card-body organia-modal-body">
              <form @submit.prevent="createEvent()" class="show-requireds">
                <h2 class="form-title title is-3">Ajouter un evenement</h2>
                <div class="form-fields">
                  <div class="form-input small required">
                    <label class="label">Date</label>
                    <input v-model="date" placeholder="date" type="datetime-local" class="cypress-datetime input is-info"
                           required />
                  </div>
                  <div class="form-input small">
                    <label class="label">Description</label>
                    <textarea v-model="description" placeholder="description" class="cypress-textarea" required />
                    <p class="required-notice">* Obligatoire</p>
                  </div>
                </div>
              </form>
            </section>
            <footer class="modal-card-foot organia-modal-footer">
              <button type="submit" class="cypress-add button modal-admin-btn modal-add-role-btn"
                      v-on:click="createEvent()">Ajouter</button>
              <button class="button modal-admin-btn" v-on:click="openModal(false)">Fermer</button>
            </footer>
          </div>
        </div>
        <div class="modal" :class="{ 'is-invisible': (editstate !== 'clicked'), 'is-active': (editstate === 'clicked') }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Éditer un Évènement</p>
              <button class="delete" aria-label="close" v-on:click="openEditModal(false, undefined)"></button>
            </header>
            <section class="modal-card-body organia-modal-body">
              <form @submit.prevent="submitEditForm()" class="show-requireds">
                <h2 class="form-title title is-3">Éditer un evenement</h2>
                <div class="form-fields">
                  <div class="form-input small required">
                    <label class="label">Date</label>
                    <input v-model="calendar.date" placeholder="date" type="datetime-local" class="input is-info" required />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Description</label>
                    <textarea class="textarea" v-model="calendar.description" placeholder="description" required />
                  </div>
                  <p class="required-notice">* Obligatoire</p>
                </div>
              </form>
            </section>
            <footer class="form-submit modal-card-foot organia-modal-footer">
              <button @click="submitEditForm" type="submit" class="cypress-add button modal-admin-btn modal-add-role-btn">Enregistrer</button>
              <button type="button" class="button is-danger ml-6" @click="delete_event">
                Supprimer
              </button>
              <button class="button modal-admin-btn" v-on:click="openEditModal(false, undefined)">Fermer</button>
            </footer>
          </div>
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
            date: this.calendar.date,
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
            date: this.date,
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
