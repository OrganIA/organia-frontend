<template>
  <div id="main">
    <main>
      <div>
        <h1 style="text-align: center">Liste d'attente</h1>
        <p>
          <router-link to="/receivers/add" class="button">Ajouter</router-link>
        </p>
      </div>

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
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="receiver in receivers" :key="receiver">
            <td>{{ receiver.first_name }}</td>
            <td>{{ receiver.last_name }}</td>
            <td>{{ receiver.birthday }}</td>
            <td>{{ receiver.gender }}</td>
            <td>{{ receiver.blood_type }}</td>
            <td>{{ receiver.organ }}</td>
            <td>{{ receiver.created_at }}</td>
            <td>
              <router-link :to="`/receivers/edit/${receiver.id}`">
                <i class="fas fa-trash-alt"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
import http from "../http";

export default {
  components: {},
  name: "ReceiversPanel",
  data() {
    return {
      receivers: {},
    };
  },
  created() {
    this.getAllReceivers();
  },
  methods: {
    getAllReceivers() {
      console.log(this.$cookies.get("token"))
      http
        .get("/persons", {
          headers: { Authorization: `Bearer ${this.$cookies.get("token")}` },
        })
        .then((response) => {
          response.data.forEach((element) => {
            element.created_at = new Date(element.created_at).toDateString();
          });
          this.receivers = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>