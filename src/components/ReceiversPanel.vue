<template>
  <div id="main">
    <main>
      <h1>Liste d&#39;attente</h1>
      <p>
        <a href="/receivers/add" class="button">Ajouter</a>
      </p>
      <div class="tabs-section">
        <div class="tabs">
          <a class="tab-title active" href="/receivers"> Receveurs </a>
          <a class="tab-title" href="/donors"> Donneurs </a>
        </div>
        <div class="side-container">
          <div class="side-actions">
            <input type="text" placeholder="Rechercher" />
            <a class="button filters-toggle"
              ><i class="fa fa-filter"></i> Filtrer</a
            >
          </div>
        </div>
      </div>
      <div class="filters">
        <div class="filter-input">
          <button class="checkbox">Filtre 1</button>
        </div>
        <div class="filter-input">
          <button class="checkbox active">Filtre 2</button>
        </div>
        <div class="filter-input">
          <button class="checkbox">Filtre 3</button>
        </div>
        <div class="filter-input">
          <label for="text1">Filtre texte 1</label>
          <input type="text" id="text1" />
        </div>
        <div class="filter-input">
          <label for="number1">Filtre nombre 1</label>
          <input type="number" id="number1" />
        </div>
        <div class="filter-input">
          <label for="select1">Filtre select 1</label>
          <select id="select1">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
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
            <td>{{ receiver.name }}</td>
            <td>{{ receiver.last_name }}</td>
            <td>{{ receiver.birth_date }}</td>
            <td>{{ receiver.gender }}</td>
            <td>{{ receiver.blood_type }}</td>
            <td>{{ receiver.organ }}</td>
            <td>{{ receiver.created_at }}</td>
            <td>
              <a href="/receivers/delete/1"><i class="fas fa-trash-alt"></i></a>
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
  data() {
    return {
      receivers: {},
    };
  },
  created() {
    http
      .get("/users")
      .then((response) => {
        response.data.forEach((element) => {
          element.created_at = (new Date(element.created_at)).toDateString();
        });
        this.receivers = response.data;
      })
      .catch((error) => {
        console.log(error.data);
      });
  },
};
</script>

<style>
@import '/src/styles/shared.css';

</style>