<template>
  <div id="main">
    <h1>Evenements</h1>
    <p>
      <router-link to="/eventList/add" class="button is-info mb-6 cypress-to-add"
        >Ajouter</router-link
      >
    </p>
    <p class="search content">Rechercher par</p>
    <div class="search-block">
      <select v-model="selectFilter" class="search-filter button mb-4 ml-6 is-info is-light">
        <option value="title">Libellé</option>
        <option value="location">Lieu</option>
        <option value="startDate">Date de debut</option>
        <option value="endDate">Date de fin</option>
        <option value="description">Description</option>
      </select>
      <input @input="filter" v-model="filterText" class="search-bar input mr-6" />
      <br />
    </div>
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-info">
      <thead>
        <tr>
          <th @click="updateFilter('title')">Libellé</th>
          <th @click="updateFilter('location')">Lieu</th>
          <th @click="updateFilter('startDate')">Date de debut</th>
          <th @click="updateFilter('endDate')">Date de fin</th>
          <th @click="updateFilter('description')">Description</th>
          <th>Éditer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event">
          <td>{{ event.title }}</td>
          <td>{{ event.location }}</td>
          <td>{{ event.startDate }}</td>
          <td>{{ event.endDate }}</td>
          <td>{{ event.description }}</td>
          <td>
            <router-link :to="`/events/edit/${event.id}`">
              <i class="fas fa-edit button is-primary"></i>
            </router-link>
          </td>
          <td>
            <i class="fas fa-info cypress-event-modal" @click="openModal(event)"></i>
          </td>
        </tr>
      </tbody>
    </table>
    <event-details
      v-if="showModal == true"
      :event="currentEvent"
      @closeModal="closeModal"
      class="details"
    />
  </div>
</template>

<script>
import EventDetails from "../components/EventDetails.vue";

export default {
  components: { EventDetails },
  name: "EventPanel",
  data() {
    return {
      events: {},
      showModal: false,
      currentEvent: {},
      sortingOrder: true,
      sortingKey: "startDate",
      selectFilter: "title",
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
        .get("/listings/events", {
          headers: { Authorization: `Bearer ${this.$cookies.get("token")}` },
        })
        .then((response) => {
          response.data.forEach((element) => {
            element.event.startDate = new Date(
              element.event.startDate
            ).toDateString();
          });
          this.events = response.data;
          this.eventsBackup = this.events;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
    openModal(event) {
      if (!this.showModal) {
        this.showModal = true;
        this.currentEvent = event;
        document.getElementById("bodiv").style.display = "initial";
      }
    },
    closeModal() {
      this.showModal = false;
      this.currentEvent = {};
      document.getElementById("bodiv").style.display = "none";
    },
    updateFilter(dataName) {
      if (dataName === this.sortingKey) this.sortingOrder = !this.sortingOrder;
      this.sortingKey = dataName;
    },
    checkNull(a, b) {
      if (
        a.event[this.sortingKey] == null &&
        b.event[this.sortingKey] == null
      )
        return 0;
      if (a.event[this.sortingKey] == null) return 1;
      else if (b.event[this.sortingKey] == null) return -1;
      return 0;
    },
    sortData() {
      if (
        ["title", "location", "description"].includes(
          this.sortingKey
        )
      ) {
        this.events.sort((a, b) => {
          if (
            a.event[this.sortingKey] == null ||
            b.event[this.sortingKey] == null
          )
            return this.checkNull(a, b);
          if (this.sortingOrder)
            return a.event[this.sortingKey].localeCompare(
              b.event[this.sortingKey]
            );
          return b.event[this.sortingKey].localeCompare(
            a.event[this.sortingKey]
          );
        });
      } else if (["startDate", "endDate",].includes(this.sortingKey)) {
        this.events.sort((a, b) => {
          if (
            a.event[this.sortingKey] == null ||
            b.event[this.sortingKey] == null
          )
            return this.checkNull(a, b);
          if (this.sortingOrder)
            return Date.parse(a.event[this.sortingKey]) >
              Date.parse(b.event[this.sortingKey])
              ? -1
              : 1;
          return Date.parse(b.event[this.sortingKey]) >
            Date.parse(a.event[this.sortingKey])
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
          if (el.event[this.selectFilter] != null)
            return el.event[this.selectFilter].includes(this.filterText);
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
    selectFilter() {
    },
  },
};
</script>
