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
              <div @click="openAddModal(true)" class="button is-info is-info mb-6 cypress-to-hospitals-add add-btn">
                <i class="fa fa-solid fa-plus icon-add-btn-correction"></i>
                <span class="btn-add-text">Ajouter</span>
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
                  <div @click="openEditModal(true, hospital.id)">
                    <i class="fas fa-edit button is-primary cypress-to-hospitals-edit-1"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal" :class="{ 'is-invisible': (addstate !== 'clicked'), 'is-active': (addstate === 'clicked') }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Ajouter un hôpital</p>
              <button class="delete" aria-label="close" v-on:click="openAddModal(false)"></button>
            </header>
            <section class="modal-card-body organia-modal-body">
              <form class="form-control ">
                <div class="form-fields">
                  <label class="label">Nom</label>
                  <input v-model="name" type="text" class="input mb-6 cypress-name" required />
                  <div class="form-input small">
                    <label class="label">Ville</label>
                    <input v-model="city_name" type="text" class="input mb-6 cypress-city" required />
                  </div>
                  <div class="form-input small">
                    <label class="label">Code de département</label>
                    <input v-model="department_code" type="text" class="input mb-6 cypress-department" required />
                  </div>
                  <div class="form-input small">
                    <label class="label">Numéro de téléphone</label>
                    <input v-model="phone_number" type="text" class="input mb-6 cypress-phone-number" required />
                  </div>
                </div>
              </form>

            </section>
            <footer class="modal-card-foot organia-modal-footer">
              <button type="submit" class="cypress-add button modal-admin-btn modal-add-role-btn"
                      v-on:click="submitForm()">Ajouter</button>
              <button class="button modal-admin-btn" v-on:click="openAddModal(false)">Fermer</button>
            </footer>
          </div>
        </div>
        <div class="modal" :class="{ 'is-invisible': (editstate !== 'clicked'), 'is-active': (editstate === 'clicked') }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Éditer un hôpital</p>
              <button class="delete" aria-label="close" v-on:click="openEditModal(false, undefined)"></button>
            </header>
            <section class="modal-card-body organia-modal-body">
              <form class="form-control">
                <div class="form-fields">
                  <label class="label">Nom</label>
                  <input v-model="hospital.name" type="text" class="input mb-6 cypress-name" placeholder="Nom du centre"
                         required />
                  <div class="form-input small">
                    <label class="label">Ville</label>
                    <input v-model="city.name" type="text" class="input mb-6 cypress-city" placeholder="Nom du centre" required />
                  </div>
                  <div class="form-input small">
                    <label class="label">Code de département</label>
                    <input v-model="city.department_code" type="text" class="input mb-6 cypress-department"
                           placeholder="Nom du centre" required />
                  </div>
                  <div class="form-input small">
                    <label class="label">Numéro de téléphone</label>
                    <input v-model="hospital.phone_number" type="text" class="input mb-6 cypress-phone-number"
                           placeholder="Nom du centre" required />
                  </div>
                </div>
              </form>

            </section>
            <footer class="modal-card-foot organia-modal-footer">
              <button type="submit" class="cypress-add button modal-admin-btn modal-add-role-btn"
                      v-on:click="submitEditForm()">Ajouter</button>
              <button class="button modal-admin-btn" v-on:click="openEditModal(false, undefined)">Fermer</button>
            </footer>
          </div>
        </div>

      </div>
    </div>
  </div>
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
      addstate: '',
      editstate: '',
      city_name: "",
      department_code: "",
      name: "",
      phone_number: "",
      hospital: {},
      city: {},
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
          this.openAddModal(false)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openAddModal(val) {
      if (val === true) {
        this.addstate = "clicked"
        return;
      }
      this.addstate = "";
    },
    openEditModal(val, id) {
      if (val === true) {
        this.editstate = "clicked"
        this.getHospital(id)
        return;
      }
      this.editstate = "";
    },
    submitForm() {
      this.$http
          .post("/hospitals", {
            city: {
              name: this.city_name,
              department_code: this.department_code
            },
            name: this.name,
            phone_number: this.phone_number,
          })
          .then(() => {
            this.$toast.success("Creation de l'hopital réussi !");
            setTimeout(this.$toast.clear, 3000);
            this.getAllHospitals()
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getHospital(id) {
      this.$http
          .get(`/hospitals/${id}`)
          .then((response) => {
            this.hospital = response.data;
            this.city = response.data.city;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    submitEditForm() {
      console.log(this.hospital)
      console.log(this.city)
      this.$http
          .post(`/hospitals/${this.id}`, {
            city: {
              name: this.city.name,
              department_code: this.city.department_code,
            },
            name: this.hospital.name,
            phone_number: this.hospital.phone_number,
          })
          .then(() => {
            this.$toast.success("Modification de l'hopital réussi !");
            setTimeout(this.$toast.clear, 3000);
            this.getAllHospitals()
          })
          .catch((error) => {
            console.log(error);
          });
    },
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

.form-control {
  width: 100%;
}
</style>