<template>
  <div id="main">
    <main>
      <h1>Liste d'attente</h1>
      <p>
        <router-link to="/receivers/add" class="button">Ajouter</router-link>
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

<style>
a,
button {
  cursor: pointer;
}

a,
a:visited,
a:active {
  color: var(--blue);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button:hover,
.button:hover {
  text-decoration: none;
}

.fa-filter {
  font-size: 0.9em;
}

.filters {
  padding: 1em;
  margin-top: -1em;
  margin-bottom: 1em;
  background-color: white;
  /* display: flex; */
  flex-flow: wrap row;
  align-items: flex-end;

  /* visibility: hidden; */
  /* position: absolute; */
  /* top: -100px; */
  /* transition: var(--anim-time) ease; */
  /* z-index: -1; */
  display: none;
}

.filters.active {
  /* visibility: visible; */
  /* position: relative; */
  /* top: 0; */
  display: flex;
}

.filter-input {
  margin: 0.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.show-requireds .form-input.required label::after {
  content: " *";
  color: var(--red);
}

.required-notice {
  display: none;
  color: var(--red);
}

.show-requireds .required-notice {
  display: block;
}

input[type="number"] {
  min-width: 4em;
}

button.active,
.button.active,
[type="submit"] {
  background-color: var(--blue);
  color: white;
}

#current-user {
  font-size: var(--font-small);
  background-color: var(--light-gray);
  display: inline-block;
  padding: 0.5em 1.5em;
  border-radius: var(--rounding);
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 0 0 auto;
  text-decoration: none;
  color: inherit;
}

#current-user > * {
  margin: 0 0.5em;
}

#current-user .caret {
  color: var(--gray);
}

#current-user .avatar {
  width: 2em;
  height: 2em;
  object-fit: contain;
}

.tabs-section {
  border-bottom: 1px solid var(--sky-blue);
  display: flex;
  flex-flow: wrap row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1em;
}

.tab-title,
.side-actions {
  padding-bottom: 0.5em;
}

.tab-title,
.tab-title:visited {
  display: inline-block;
  margin: 0 0.5em;
  color: var(--sky-blue);
  text-decoration: none;
}

.tab-title.active {
  color: var(--dark-blue);
  border-bottom: 2px solid var(--blue);
}

table {
  /* border-collapse: collapse; */
  border-spacing: 0 0.3em;
  width: 100%;
}

table .fa {
  margin: 0 0.5em;
}

th {
  color: var(--sky-blue);
  font-size: var(--font-small);
  text-transform: capitalize;
}

td {
  background-color: white;
  padding: 1em;
  border-top: 2px solid var(--border-color);
  border-bottom: 2px solid var(--border-color);
  text-align: center;
}

tr td:first-child {
  border-left: 2px solid var(--border-color);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
tr td:last-child {
  border-right: 2px solid var(--border-color);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

#flash-messages {
  width: 100%;
}

#flash-messages li {
  background-color: var(--dark-blue);
  color: white;
  padding: 0.5em 1em;
  border-radius: var(--rounding);
}

form {
  max-width: 700px;
  margin: auto;
  padding: 2em;
  background-color: white;
  box-shadow: var(--shadow);
}

.form-fields {
  display: flex;
  flex-flow: wrap row;
  justify-content: space-between;
}

.form-input {
  display: flex;
  flex-direction: column;
  margin: 1em 0;
  width: 100%;
}

.form-input.small {
  width: calc(50% - 1em);
}

.form-input.mini {
  width: calc(33% - 1em);
}

.form-error {
  font-size: small;
  color: var(--red);
}

#donor-info {
  background-color: var(--blue);
  color: white;
  border-radius: var(--rounding);
  padding: 1em;
  display: inline-block;
}

#donor-image {
  margin-right: 1em;
}

#donor-text p {
  margin-top: 0;
}

.loading-icon {
  text-align: center;
  font-size: 64px;
}

.row {
  display: flex;
  flex-direction: row;
}

.column {
  display: flex;
  flex-direction: column;
}

.hide {
  display: none;
}
</style>