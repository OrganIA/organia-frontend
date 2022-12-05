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
            <div @click="openModal(true)" class="button is-info is-info mb-6 cypress-add-event add-btn">
              <i class="fa fa-solid fa-plus icon-add-btn-correction"></i>
              <span class="btn-add-text">Ajouter</span>
            </div>
            <div class="search-block">
              <select v-model="selectFilter" class="search-filter button mb-4 ml-6 is-info is-light">
                <option value="start_date">Date de début</option>
                <option value="end_date">Date de fin</option>
                <option value="title">Titre</option>
              </select>
              <input @input="filter" v-model="filterText" class="search-bar input mr-6" />
              <select v-model="nb_by_page" @change="updateNbElements"
                class="number-selector button mb-4 ml-6 is-info is-light">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th @click="updateFilter('start_date')">Date de début</th>
                <th @click="updateFilter('end_date')">Date de fin</th>
                <th @click="updateFilter('title')">Titre</th>
                <th>Éditer</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="calendar in events" :key="calendar">
                <td>{{ calendar.start_date }}</td>
                <td>{{ calendar.end_date }}</td>
                <td>{{ calendar.title }}</td>
                <td>
                  <div @click="openEditModal(true, calendar.id)">
                    <i class="fas fa-edit button is-primary"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <nav class="pagination is-rounded is-centered pages" role="navigation" aria-label="pagination">
            <a class="pagination-previous" @click="previousPage()">Précédent</a>
            <ul class="pagination-list">
              <li><a class="pagination-link is-current" :aria-label="'Page ' + ($data.page + 1)" aria-current="page">{{
                  $data.page + 1
              }}</a></li>
            </ul>
            <a class="pagination-next" @click="nextPage()">Suivant</a>
          </nav>
        </div>
        <div class="modal" :class="{ 'is-invisible': (state !== 'clicked'), 'is-active': (state === 'clicked') }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Ajouter un Évènement</p>
              <button class="delete" aria-label="close" @click="openModal(false)"></button>
            </header>
            <section class="modal-card-body organia-modal-body">
              <form @submit.prevent="createEvent()" class="show-requireds">
                <h2 class="form-title title is-3">Ajouter un evenement</h2>
                <div class="form-fields">
                  <div class="form-input small required">
                    <label class="label">Date de début</label>
                    <input v-model="start_date" placeholder="date" type="datetime-local"
                      class="cypress-start-date input is-info" required />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Date de fin</label>
                    <input v-model="end_date" placeholder="date" type="datetime-local"
                      class="cypress-end-date input is-info" required />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Titre</label>
                    <input v-model="title" placeholder="Titre" class="cypress-event-title" required />
                  </div>
                  <div class="form-input small">
                    <label class="label">Description</label>
                    <textarea v-model="description" placeholder="Description" class="cypress-event-description" />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Type d'évènement</label>
                    <input v-model="event_type" placeholder="Type d'évènement" class="cypress-event-type" required />
                  </div>
                  <p class="required-notice">* Obligatoire</p>
                </div>
              </form>
            </section>
            <footer class="modal-card-foot organia-modal-footer">
              <button type="submit" class="cypress-add-this-event button modal-admin-btn modal-add-role-btn"
                @click="createEvent()">Ajouter
              </button>
              <button class="button modal-admin-btn" @click="openModal(false)">Fermer</button>
            </footer>
          </div>
        </div>
        <div class="modal"
          :class="{ 'is-invisible': (editstate !== 'clicked'), 'is-active': (editstate === 'clicked') }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Éditer un Évènement</p>
              <button class="delete" aria-label="close" @click="openEditModal(false, undefined)"></button>
            </header>
            <section class="modal-card-body organia-modal-body">
              <form @submit.prevent="submitEditForm()" class="show-requireds">
                <h2 class="form-title title is-3">Éditer un evenement</h2>
                <div class="form-fields">
                  <div class="form-input small required">
                    <label class="label">Date de début</label>
                    <input v-model="calendar.start_date" placeholder="date" type="datetime-local"
                      class="input is-info cypress-edit-start-date" required />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Date de fin</label>
                    <input v-model="calendar.end_date" placeholder="date" type="datetime-local"
                      class="input is-info cypress-edit-end-date" required />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Titre</label>
                    <input class="input cypress-edit-title" v-model="calendar.title" placeholder="Titre" required />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Description</label>
                    <textarea class="textarea cypress-edit-description" v-model="calendar.description"
                      placeholder="description" />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Type d'évènement</label>
                    <textarea class="textarea cypress-edit-type" v-model="calendar.event_type"
                      placeholder="Type d'évènement" required />
                  </div>
                  <p class="required-notice">* Obligatoire</p>
                </div>
              </form>
            </section>
            <footer class="form-submit modal-card-foot organia-modal-footer">
              <button @click="submitEditForm" type="submit"
                class="cypress-add button modal-admin-btn modal-add-role-btn">Enregistrer
              </button>
              <button type="button" class="button is-danger ml-6" @click="delete_event">
                Supprimer
              </button>
              <button class="button modal-admin-btn" @click="openEditModal(false, undefined)">Fermer</button>
            </footer>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ApplicationNavbar from "@/components/ApplicationNavbar";
import SideBar from "@/components/SideBar";
import translate from "@/translate"

export default {
  name: "event-panel",
  components: { SideBar, ApplicationNavbar },
  data() {
    return {
      state: '',
      editstate: '',
      events: {},
      sortingOrder: true,
      sortingKey: "start_date",
      selectFilter: "start_date",
      filterText: "",
      eventsBackup: [],
      page: 0,
      nb_by_page: 5,
      date: "",
      description: "",
      title: "",
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
    updateNbElements() {
      this.page = 0;
      this.updatePage()
    },
    updatePage() {
      this.events = this.eventsBackup.slice(this.page * this.nb_by_page, this.page * this.nb_by_page + this.nb_by_page);
    },
    getAllevents() {
      this.$http
        .get("/calendar/",)
        .then((response) => {
          response.data.forEach((event) => {
            event.start_date = event.start_date.replace(" ", "T");
            event.end_date = event.end_date.replace(" ", "T");
            event.start_date = new Date(event.start_date);
            event.end_date = new Date(event.end_date);
          })
          this.events = response.data;
          this.eventsBackup = response.data;
          this.updatePage()
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + translate[error.response.data.msg]
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    nextPage() {
      if (Math.ceil(this.eventsBackup.length / this.nb_by_page) > (this.page + 1)) {
        this.page += 1;
        this.updatePage()
      }
    },
    previousPage() {
      if (this.page >= 1) {
        this.page -= 1;
        this.updatePage()
      }
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
          this.$toast.error(
            "Erreur lors de la connexion : " + translate[error.response.data.msg]
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    submitEditForm() {
      const data = {
        title: this.calendar.title,
        description: this.calendar.description,
        event_type: this.calendar.event_type,
        start_date: this.calendar.start_date.replace("T", " "),
        end_date: this.calendar.end_date.replace("T", " "),
      };
      this.$http
        .post(`/calendar/${this.to_edit_id}`, data)
        .then(() => {
          this.openEditModal(false, undefined)
          this.getAllevents()
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + translate[error.response.data.msg]
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    delete_event() {
      this.$http
        .delete(`/calendar/${this.to_edit_id}`)
        .then(() => {
          this.$toast.success("Suppression effectuée");
          this.openEditModal(false, undefined)
          this.getAllevents()
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + translate[error.response.data.msg]
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    createEvent() {
      if (this.start_date === "" || this.end_date === "" || this.title === "" || this.event_type === "") {
        this.$toast.error("Veuillez remplir tous les champs");
        return;
      }
      this.$http
        .post("/calendar/", {
          start_date: this.start_date,
          end_date: this.end_date,
          description: this.description,
          title: this.title,
          event_type: this.event_type,
        })
        .then((response) => {
          this.event_id = response.data.id;
          this.getAllevents()
          this.openModal(false)
        })
        .catch((error) => {
          console.log(error)
          if (error.response.data.msg.includes("is already taken")) {
            error.response.data.msg = error.response.data.msg.replace("is already taken", "est déjà utilisé")
            this.$toast.error(
              "Erreur lors de la connexion : " + error.response.data.msg
            );
          } else {
            this.$toast.error(
              "Erreur lors de la connexion : " + translate[error.response.data.msg]
            );
          }
          setTimeout(this.$toast.clear, 3000);
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
      if (this.filterText === "") {
        this.events = this.eventsBackup;
        return;
      }
      this.events = this.eventsBackup.filter((el) => {
        if (el[this.selectFilter] != null)
          return el[this.selectFilter].includes(this.filterText);
      });
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

.pages {
  margin-top: 20px;
}
</style>
