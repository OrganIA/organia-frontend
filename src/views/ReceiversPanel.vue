<template>
  <div id="main">
    <h1 style="text-align: center">Liste d'attente</h1>
    <p>
      <router-link to="/receivers/add" class="button cypress-to-add">
        Ajouter
      </router-link>
    </p>
    <table class="table-list">
      <thead>
        <tr>
          <th>Prénom</th>
          <th>Nom de famille</th>
          <th>Date de naissance</th>
          <th>Sexe</th>
          <th>ABO</th>
          <th>Organe</th>
          <th>Arrivée</th>
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
              <i class="fas fa-edit"></i>
            </router-link>
          </td>
          <td>
            <i
              class="fas fa-info-circle cypress-receiver-modal"
              @click="openModal(receiver)"
            />
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
  },
};
</script>