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
  <div class="main">
    <div class="role-panel-btn-container">
      <div>
        <router-link to="/hospitals/add" class="button is-info is-info mb-6 cypress-to-hospitals-add add-btn">
          <i class="fa fa-solid fa-plus icon-add-btn-correction"></i>
          <span class="btn-add-text">Ajouter</span>
        </router-link>
      </div>
    </div>
    <table class="is-organia-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Ville</th>
          <th>Numéro de téléphone</th>
          <th>Nombre de patients</th>
          <th>Éditer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hospital in hospitals" :key="hospital">
          <td>{{ hospital.name }}</td>
          <td>{{ hospital.city.name }}</td>
          <td>{{ hospital.phone_number }}</td>
          <td>{{ hospital.patients_count }}</td>
          <td>
            <router-link :to="`/hospitals/edit/${hospital.id}`">
              <i class="fas fa-edit button is-primary cypress-to-hospitals-edit-1"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
      </div></div></div>
</template>

<script>
import SideBar from "@/components/SideBar";
import ApplicationNavbar from "@/components/ApplicationNavbar";

export default {
  components: { SideBar, ApplicationNavbar },
  name: "hospitals-panel",
  data() {
    return {
      hospitals: {},
    };
  },
  created() {
    this.getAllHospitals();
  },
  methods: {
    getAllHospitals() {
      this.$http
        .get("/hospitals")
        .then((response) => {
          this.hospitals = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
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

.main {
  margin-top: 30px;
}
</style>