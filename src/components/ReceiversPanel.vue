<template>
  <div id="main">
    <main>
      <div>
        <h1 style="text-align: center">Liste d'attente</h1>
        <p>
          <router-link to="/receivers/add" class="button cypress-to-add"
            >Ajouter</router-link
          >
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
          <tr
            v-for="receiver in receivers"
            :key="receiver"
            @click="toDetail(receiver)"
          >
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
      http
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
        });
    },
    toDetail(receiver) {
      // console.log(receiver);
      this.$router.push({
        name: "PersonDetails",
        params: { person: JSON.stringify(receiver) },
      });
    },
  },
};
</script>