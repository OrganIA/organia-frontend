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
            <select v-model="nb_by_page" @change="updateNbElements"
              class="number-selector button mb-4 ml-6 is-info is-light">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
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
              <tr class="cypress-hospital-check" v-for="hospital in hospitals" :key="hospital">
                <td>{{ hospital.name }}</td>
                <td>{{ hospital.city.name }}</td>
                <td>{{ hospital.phone_number }}</td>
                <td>{{ hospital.patients_count }}</td>
                <td>
                  <div @click="openEditModal(true, hospital.id)">
                    <i class="fas fa-edit button is-primary cypress-to-hospitals-edit"></i>
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
                  <input v-model="name" type="text" class="input mb-6 cypress-hospital-name" required />
                  <div class="form-input small">
                    <label class="label">Ville</label>
                    <input v-model="city_name" type="text" class="input mb-6 cypress-hospital-city" required />
                  </div>
                  <div class="form-input small">
                    <label class="label">Code de département</label>
                    <input v-model="department_code" type="text" class="input mb-6 cypress-hospital-department" required />
                  </div>
                  <div class="form-input small">
                    <label class="label">Numéro de téléphone</label>
                    <input v-model="phone_number" type="text" class="input mb-6 cypress-hospital-phone-number" required />
                  </div>
                </div>
              </form>

            </section>
            <footer class="modal-card-foot organia-modal-footer">
              <button type="submit" class="cypress-hospital-add button modal-admin-btn modal-add-role-btn"
                v-on:click="submitForm()">Ajouter
              </button>
              <button class="button modal-admin-btn" v-on:click="openAddModal(false)">Fermer</button>
            </footer>
          </div>
        </div>
        <div class="modal"
          :class="{ 'is-invisible': (editstate !== 'clicked'), 'is-active': (editstate === 'clicked') }">
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
                    <input v-model="city.name" type="text" class="input mb-6 cypress-city" placeholder="Nom du centre"
                      required />
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
                v-on:click="submitEditForm()">Ajouter
              </button>
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
import translate from "@/translate"

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
      page: 0,
      nb_by_page: 5,
      hospitalsBackup: [],
    };
  },
  created() {
    this.getAllHospitals();
  },
  methods: {
    getAllHospitals() {
      this.$http
        .get("/hospitals/")
        .then((response) => {
          this.hospitals = response.data;
          this.openAddModal(false)
          this.hospitalsBackup = response.data
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
    updateNbElements() {
      this.page = 0;
      this.updatePage()
    },
    updatePage() {
      this.hospitals = this.hospitalsBackup.slice(this.page * this.nb_by_page, this.page * this.nb_by_page + this.nb_by_page);
    },
    nextPage() {
      if (Math.ceil(this.hospitalsBackup.length / this.nb_by_page) > (this.page + 1)) {
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
        .post("/hospitals/", {
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
    getHospital(id) {
      this.$http
        .get(`/hospitals/${id}`)
        .then((response) => {
          this.hospital = response.data;
          this.city = response.data.city;
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
      this.$http
        .post(`/hospitals/${this.hospital.id}`, {
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
          this.openEditModal(false, undefined)
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + translate[error.response.data.msg]
          );
          setTimeout(this.$toast.clear, 3000);
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

.pages {
  margin-top: 20px;
}
</style>