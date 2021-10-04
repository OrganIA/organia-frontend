<template>
  <div id="main">
    <h1 style="text-align: center">Liste d'attente</h1>
    <p>
      <router-link to="/receivers/add" class="button is-info cypress-to-add mb-6">
        Ajouter
      </router-link>
    </p>
    <div class="search-block">
      <p class="search">Rechercher par</p>
      <select v-model="selectFilter" class="search-filter">
        <option value="first_name">Prénom</option>
        <option value="last_name">Nom</option>
        <option value="birthday">Date de naissance</option>
        <option value="gender">Sexe</option>
        <option value="blood_type">ABO</option>
        <option value="organ">Organe</option>
        <option value="created_at">Arrivée</option>
      </select>
      <input @input="filter" v-model="filterText" class="search-bar" />
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
    <person-details
      v-if="showModal == true"
      :person="currentReceiver"
      @closeModal="closeModal"
      class="details"
    />
  </div>
</template>

<script>
import PersonDetails from "../components/PersonDetails.vue";

export default {
  components: { PersonDetails },
  name: "ReceiversPanel",
  data() {
    return {
      receivers: {},
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
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
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
      console.log(this.selectFilter);
    },
  },
};
</script>