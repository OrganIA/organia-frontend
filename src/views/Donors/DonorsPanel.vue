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
        <div class="role-panel-btn-container">
          <div>
            <div @click="openNewModal()" class="button add-btn cypress-to-add">
              <i class="fa fa-solid fa-plus icon-add-btn-correction"></i>
              <span class="btn-add-text">Ajouter</span>
            </div>
          </div>
          <div class="search-block">
            <select v-model="selectFilter" class="search-filter button mb-4 ml-6 is-info is-light">
              <option value="first_name">Prénom</option>
              <option value="last_name">Nom</option>
              <option value="gender">Sexe</option>
              <option value="blood_type">ABO</option>
              <option value="organ">Organe</option>
            </select>
            <div class="fa fa-solid fa-angle-down icon-dropdown-correction"></div>
            <input @input="filter" v-model="filterText" class="search-bar input mr-6" />
            <br />
          </div>
        </div>
        <table class="table-scroll">
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom de famille</th>
              <th>Sexe</th>
              <th>ABO</th>
              <th>Organe</th>
              <th>Score</th>
              <th>Éditer</th>
              <th>Match</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="donor in donors" :key="donor">
              <td>{{ donor.person.first_name }}</td>
              <td>{{ donor.person.last_name }}</td>
              <td>{{ donor.person.gender }}</td>
              <td>{{ donor.person.blood_type }}</td>
              <td>{{ donor.organ }}</td>
              <td>{{ donor.score }}</td>
              <td>
                <div @click="openEditModal(donor.id)">
                  <i class="fas fa-edit button is-primary"></i>
                </div>
              </td>
              <td>
                <div @click="openMatchModal(donor.id)">
                  <i class="fa-brands fa-searchengin button is-primary"></i>
                </div>
              </td>
              <td>
                <i class="fas fa-info cypress-donor-modal" @click="openInfoModal(donor)"></i>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="modal" :class="{ 'is-invisible': (state !== 'info'), 'is-active' : (state === 'info') }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Informations du receveur</p>
              <button class="delete" aria-label="close" @click="closeModal"></button>
            </header>
            <section class="modal-card-body">
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Nom de famille</p>
                  <button class="button is-info is-light contents">{{ currentDonor.person.last_name }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Prénom</p>
                  <button class="button is-info is-light contents">{{ currentDonor.person.first_name }}</button>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Âge</p>
                  <button class="button is-info is-light contents">{{ currentDonor.person.age }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Date de naissance</p>
                  <button class="button is-info is-light contents">{{ currentDonor.person.birthday }}</button>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Genre</p>
                  <button class="button is-info is-light contents">{{ currentDonor.person.gender }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Groupe Sanguin</p>
                  <button class="button is-info is-light contents">{{ currentDonor.person.blood_type }}</button>
                </div>
              </div>
              <div v-if="currentDonor.person.description != null">
                <p class="button is-medium is-fullwidth elements">Description</p>
                <button class="button is-light contents">{{
                currentDonor.person.description
                }}
                </button>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Date de création</p>
                  <button class="button is-info is-light contents">{{ currentDonor.person.created_at }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Date de dernière édition</p>
                  <button v-if="currentDonor.person.updated_at != null" class="button is-info is-light contents">{{
                  currentDonor.person.updated_at
                  }}
                  </button>
                  <button v-else class="button is-info is-light contents">Aucune modification effectuée.</button>
                </div>
              </div>
              <div v-if="currentDonor.person.DateTransplantation != null">
                <p class="button is-medium is-fullwidth elements">Date de retransplantation</p>
                <button class="button is-light contents">{{
                currentDonor.person.DateTransplantation
                }}
                </button>
              </div>
              <div v-if="currentDonor.person.ReRegistrationDate != null">
                <p class="button is-medium is-fullwidth elements">Date d'enregistrement</p>
                <button class="button is-light contents">{{
                currentDonor.person.ReRegistrationDate
                }}
                </button>
              </div>
              <div v-if="currentDonor.person.alpha_fetoprotein != null">
                <p class="button is-medium is-fullwidth elements">Alpha Fetoprotein</p>
                <button class="button is-light contents">{{
                currentDonor.person.alpha_fetoprotein
                }}
                </button>
              </div>
              <div v-if="currentDonor.person.biggest_tumor_size != null">
                <p class="button is-medium is-fullwidth elements">La plus grande taille de tumeurs</p>
                <button class="button is-light contents">{{
                currentDonor.person.biggest_tumor_size
                }}
                </button>
              </div>
              <div v-if="currentDonor.person.end_date != null">
                <p class="button is-medium is-fullwidth elements">Date de fin</p>
                <button class="button is-light contents">{{
                currentDonor.person.end_date
                }}
                </button>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Organe</p>
                  <button class="button is-info is-light contents">{{ currentDonor.organ }}</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium is-fullwidth elements">Nombres de tumeurs</p>
                  <button class="button is-info is-light contents">{{ currentDonor.tumors_number }}</button>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <p class="button is-medium elements">Sous dialyse ?</p>
                  <button v-if="currentDonor.person.isDialyse" class="button is-info is-light contents">{{
                  Oui
                  }}
                  </button>
                  <button v-else class="button is-info is-light contents">Non</button>
                </div>
                <div class="column is-half">
                  <p class="button is-medium elements is-size-6">Retransplantation effectuée? ?</p>
                  <button v-if="currentDonor.person.isRetransplantation" class="button is-info is-light contents ">{{
                  Oui
                  }}
                  </button>
                  <button v-else class="button is-info is-light contents">Non</button>
                </div>
              </div>
              <div v-if="currentDonor.person.startDateDialyse != null">
                <p class="button column is-medium elements">Date de début de dialyse</p>
                <button class="button is-light contents">{{
                currentDonor.person.startDateDialyse
                }}
                </button>
              </div>
              <div v-if="currentDonor.person.EndDateDialyse != null">
                <p class="button column is-medium elements">Date de fin de dialyse</p>
                <button class="button is-light contents">{{
                currentDonor.person.EndDateDialyse
                }}
                </button>
              </div>
              <div v-if="currentDonor.person.notes != null">
                <p class="button column is-medium elements">Notes</p>
                <button class="button is-light contents">{{
                currentDonor.person.notes
                }}
                </button>
              </div>
              <button class="button is-link is-light" @click="openChatModal()">
                Créer une conversation
              </button>
              <button class="button is-link is-light cypress-pdf" @click="createPDF()">
                  Télécharger la version PDF
                </button>
            </section>
            <footer class="modal-card-foot">
            </footer>
          </div>
        </div>
        <div class="modal" :class="{ 'is-invisible': (state !== 'new'), 'is-active': (state === 'new') }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Ajouter un donneur</p>
              <button class="delete" aria-label="close" @click="closeModal(false)"></button>
            </header>
            <section class="modal-card-body organia-modal-body">
              <form @submit.prevent="createPerson()" class="show-requireds">
                <div class="form-fields">
                  <div class="form-input small required">
                    <label class="label">Prénom</label>
                    <input v-model="new_donor.first_name" placeholder="first_name" type="text"
                      class="cypress-first-name input is-info" required />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Nom de Famille</label>
                    <input v-model="new_donor.last_name" placeholder="last_name" type="text"
                      class="cypress-last-name input is-info" required />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Date de naissance</label>
                    <input v-model="new_donor.birthday" placeholder="birthday" type="date"
                      class="cypress-birth-date input is-info" required />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Organe</label>
                    <select v-model="new_donor.organ" id="organ-select" class="cypress-organ input is-info" required>
                      <option v-for="element in all_organs" :key="element">
                        {{ element }}
                      </option>
                    </select>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Date d'admission</label>
                    <input v-model="new_donor.start_date" placeholder="start date" type="date"
                      class="cypress-admission-date input is-info" required />
                  </div>
                  <div class="form-input small">
                    <label class="label">Nombre de tumeurs</label>
                    <input v-model="new_donor.tumors_number" placeholder="0" type="text"
                      class="cypress-tumors-number input is-info" />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Le patient est sous dialyse ?</label>
                    <select v-model="new_donor.isDialyse" name="dialyse" id="dialyse-select"
                      class="cypress-is-dialyse button is-info is-light" required>
                      <option value="true">Oui</option>
                      <option value="false">Non</option>
                    </select>
                  </div>
                  <div class="form-input small required">
                    <label class="label">A-t-il effectué une retransplantation ?</label>
                    <select v-model="new_donor.isRetransplantation" name="retransplantation" id="transplantation-select"
                      class="cypress-is-retransplantation button is-info is-light" required>
                      <option value="true">Oui</option>
                      <option value="false">Non</option>
                    </select>
                  </div>
                  <div class="form-input small">
                    <label class="label">Date de début de dialyse</label>
                    <input v-model="new_donor.startDateDialyse" placeholder="start date" type="date"
                      class="cypress-beginning-dialyse input is-info" />
                  </div>
                  <div class="form-input small">
                    <label class="label">Date de fin de dialyse</label>
                    <input v-model="new_donor.endDateDialyse" placeholder="start date" type="date"
                      class="cypress-end-dialyse input is-info" />
                  </div>
                  <div class="form-input small">
                    <label class="label">Description</label>
                    <input v-model="new_donor.description" placeholder="description" type="text"
                      class="input is-info" />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Groupe sanguin</label>
                    <select v-model="new_donor.blood_type" name="abo" id="abo-select"
                      class="cypress-blood button is-info is-light" required>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="O">O</option>
                      <option value="AB">AB</option>
                    </select>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Rhésus</label>
                    <select v-model="new_donor.rhesus" name="rhesus" id="rhesus-select"
                      class="cypress-rhesus button is-info is-light" required>
                      <option value="+">+</option>
                      <option value="-">-</option>
                    </select>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Sexe</label>
                    <select v-model="new_donor.gender" name="gender" id="gender-select"
                      class="cypress-gender button is-info is-light" required>
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                    </select>
                  </div>
                  <div class="form-input small">
                    <label class="label">Notes</label>
                    <textarea v-model="new_donor.notes" placeholder="notes" class="textarea" />
                    <p class="required-notice">* Obligatoire</p>

                  </div>
                </div>
              </form>

            </section>
            <footer class="modal-card-foot organia-modal-footer">
              <button type="submit" class="cypress-add button modal-admin-btn modal-add-role-btn"
                @click="createPerson()">Ajouter
              </button>
              <button class="button modal-admin-btn" @click="openNewModal()">Fermer</button>
            </footer>
          </div>
        </div>
        <div class="modal" :class="{ 'is-invisible': (state !== 'edit'), 'is-active': (state === 'edit') }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Éditer un donneur</p>
              <button class="delete" aria-label="close" @click="closeModal()"></button>
            </header>
            <section class="modal-card-body organia-modal-body">
              <form @submit.prevent="submitForm()" class="show-requireds">
                <div class="form-fields">
                  <div class="form-input small required">
                    <label class="label">Prénom</label>
                    <input class="input is-info" v-model="to_edit.person.first_name" placeholder="first_name"
                      type="text" required />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Nom de Famille</label>
                    <input class="input is-info" v-model="to_edit.person.last_name" placeholder="last_name" type="text"
                      required />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Date de naissance</label>
                    <input v-model="to_edit.person.birthday" placeholder="birthday" type="date" class="input is-info" />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Organe</label>
                    <select v-model="to_edit.donor.organ" id="organ-select" required class="button is-info is-light">
                      <option v-for="element in all_organs" :key="element">
                        {{ element }}
                      </option>
                    </select>
                  </div>
                  <div class="form-input small">
                    <label class="label">Date d'admission</label>
                    <input v-model="to_edit.donor.start_date" placeholder="start date" type="date" />
                  </div>
                  <div class="form-input small">
                    <label class="label">Date de fin</label>
                    <input v-model="to_edit.donor.end_date" placeholder="end date" type="date" class="input is-info" />
                  </div>
                  <div class="form-input small">
                    <label class="label">Nombre de tumeurs</label>
                    <input v-model="to_edit.donor.tumors_number" placeholder="0" type="text" class="input is-info" />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Le patient est sous dialyse ?</label>
                    <select v-model="to_edit.donor.isDialyse" name="dialyse" id="dialyse-select"
                      class="button is-info is-light" required>
                      <option value="true">Oui</option>
                      <option value="false">Non</option>

                    </select>
                  </div>
                  <div class="form-input small">
                    <label class="label">Date de début de dialyse</label>
                    <input v-model="to_edit.donor.startDateDialyse" placeholder="start date" type="date"
                      class="input is-info" />
                  </div>
                  <div class="form-input small">
                    <label class="label">Date de fin de dialyse</label>
                    <input v-model="to_edit.donor.endDateDialyse" placeholder="start date" type="date"
                      class="input is-info" />
                  </div>
                  <div class="form-input small required">
                    <label class="label">A-t-il effectué une retransplantation ?</label>
                    <select v-model="to_edit.donor.isRetransplantation" name="retransplantation"
                      id="transplantation-select" class="button is-info is-light" required>
                      <option value="true">Oui</option>
                      <option value="false">Non</option>
                    </select>
                  </div>
                  <div class="form-input small">
                    <label class="label">Description</label>
                    <input class="input is-info" v-model="to_edit.person.description" placeholder="description"
                      type="text" />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Groupe sanguin</label>
                    <select v-model="to_edit.person.abo" name="abo" id="abo-select" class="button is-info is-light"
                      required>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="O">O</option>
                      <option value="AB">AB</option>
                    </select>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Rhésus</label>
                    <select class="button is-info is-light" v-model="to_edit.person.rhesus" name="rhesus"
                      id="rhesus-select" required>
                      <option value="+">+</option>
                      <option value="-">-</option>
                    </select>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Sexe</label>
                    <select v-model="to_edit.person.gender" name="gender" id="gender-select"
                      class="button is-info is-light" required>
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                    </select>
                  </div>
                  <div class="form-input small">
                    <label class="label">Notes</label>
                    <textarea class="textarea" v-model="to_edit.donor.notes" placeholder="notes" />
                  </div>
                  <p class="required-notice">* Obligatoire</p>
                </div>
              </form>

            </section>
            <footer class="modal-card-foot organia-modal-footer">
              <button type="submit" class="cypress-add button modal-admin-btn modal-add-role-btn"
                @click="updatePerson()">Enregistrer
              </button>
              <button type="button" class="button is-danger ml-6" @click="delete_donor">
                Supprimer
              </button>
              <button class="button modal-admin-btn" @click="closeModal()">Fermer</button>
            </footer>
          </div>
        </div>
        <div class="modal" :class="{ 'is-invisible': (state !== 'chat'), 'is-active': (state === 'chat') }">
          <div class="modal-background">
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title is-3">Créer une conversation</p>
              </header>
              <section class="modal-card-body">
                <div class="container">
                  <div class="columns">
                    <div class="column">
                      <input class="input is-info" placeholder="Titre de la conversation" type="text"
                        v-model="chatName" />
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-half">
                      <div class="box">
                        <button class="button is-medium is-fullwidth elements">Liste d'utilisateurs</button>
                        <button class="button is-info is-light person-box" v-for="person in personsNotAdded"
                          :key="person">
                          <p class="username">{{`${person.last_name} ${person.first_name}`}}</p>
                          <i class="fas fa-plus-circle add-button" @click="addPerson(person)"></i>
                        </button>
                      </div>
                    </div>
                    <div class="column is-half">
                      <div class="box">
                        <button class="button is-medium is-fullwidth elements">Utilisateurs à ajouter</button>
                        <button class="button is-info is-light person-box" v-for="person in personsToAdd" :key="person">
                          <p class="username">{{`${person.last_name} ${person.first_name}`}}</p>
                          <i class="fas fa-minus-circle delete-button" @click="deletePerson(person)"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <br>
                <footer>
                  <button class="button is-success is-light btn-margin"
                    @click="saveChat(currentDonor)">Enregistrer</button>
                  <button class="button is-danger is-light btn-margin " @click="resetChat(currentDonor)">Retour</button>
                </footer>
              </section>
            </div>
          </div>
        </div>
        <div class="modal" :class="{ 'is-invisible': (state !== 'match'), 'is-active': (state === 'match') }">
          <div class="modal-background"></div>
          <div class="modal-card match-modal">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Match</p>
              <button class="delete" aria-label="close" @click="closeModal()"></button>
            </header>
            <section class="modal-card-body organia-modal-body">
              <div class="match-container">
                <table class="table-match">
                  <thead>
                  <tr>
                    <th>Prénom</th>
                    <th>Nom de famille</th>
                    <th>Date de naissance</th>
                    <th>Sexe</th>
                    <th>Score</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="donor in this.TreatData(donors)" :key="donor">
                    <td>{{ donor.person.first_name }}</td>
                    <td>{{ donor.person.last_name }}</td>
                    <td>{{ donor.person.birthday }}</td>
                    <td>{{ donor.person.gender }}</td>
                    <td>{{ donor.score }}</td>
                  </tr>
                  </tbody>
                </table>
                <div class="card donor-card">
                  <div class=" user-card">
                    <div class="content">
                      <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" height="150" width="150" alt="">
                      <div>Id du patient : {{this.to_match.donor?.id || ""}}</div>
                      <div>Nom : {{this.to_match.donor?.person?.last_name || ""}}</div>
                      <div>Prénom : {{this.to_match.donor?.person?.first_name || ""}}</div>
                    </div>
                  </div>
                </div>
              </div>


            </section>
            <footer class="modal-card-foot organia-modal-footer">
              <button class="button modal-admin-btn" @click="closeModal()">Fermer</button>
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
import jsPDF from 'jspdf';

export default {
  components: { SideBar, ApplicationNavbar },
  name: "donors-panel",
  data() {
    return {
      currentDonor: {
        person: {}
      },
      donor: {},
      donors: {},
      modal: false,
      state: '',
      sortingOrder: true,
      sortingKey: "created_at",
      selectFilter: "first_name",
      filterText: "",
      donorsBackup: [],
      to_edit: {
        donor: {},
        person: {},
        all_organs: [],
        tumors_number: 0,
      },
      to_match: {
        id: 0,
        donor: {},
        person: {},
        all_organs: [],
        tumors_number: 0,
      },
      new_donor: {
        first_name: "",
        last_name: "",
        birthday: "",
        description: "",
        supervisor_id: 0,
        person_id: undefined,
        start_date: "",
        notes: "",
        organ: "",
        blood_type: "",
        rhesus: "",
        tumors_number: "",
        isDialyse: "",
        isRetransplantation: "",
        startDateDialyse: undefined,
        endDateDialyse: undefined,
        alpha_fetoprotein: "",
        gender: "",
      },
      all_organs: [],
    };
  },
  created() {
    this.getAllOrgans()
    this.getAllDonors();
    this.getAllUsers();
    this.getMe();
    this.new_donor.tumors_number = 0;
  },
  methods: {
    getMe() {
      this.$http.get("/users/me")
        .then((response) => {
          this.me = response.data
        })
    },
    getAllUsers() {
      this.$http
        .get("/users")
        .then((response) => {
          this.personsNotAdded = response.data
        })
    },
    getAllDonors() {
      this.$http
        .get("/listings/donors")
        .then((response) => {
          response.data.forEach((element) => {
            element.person.created_at = new Date(
              element.person.created_at
            ).toDateString();
          });
          this.donors = response.data;
          this.donorsBackup = this.donors;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetChat(donor) {
      this.openInfoModal(donor)
      this.personsToAdd = []
      this.chatName = ""
      this.getAllUsers()
    },
    openInfoModal(donor) {
      console.log(donor)
      this.currentDonor = donor
      this.currentPerson = donor.person
      this.state = "info"
    },
    createPDF() {
      let pdfName = 'donor_' + this.currentDonor.person.last_name;
      const doc = new jsPDF();
      let y = 15
      doc.text("Bilan d'informations Donneur", 15, y);
      doc.text("Prénom: " + this.currentDonor.person.first_name, 20, y + 10);
      doc.text("Date de naissance: " + this.currentDonor.person.birthday, 20, y + 20);
      doc.text("Sexe: " + this.currentDonor.person.gender, 20, y + 30);
      doc.text("Organe: " + this.currentDonor.organ, 20, y + 40);
      doc.text("Type sanguin: " + this.currentDonor.person.blood_type, 20, y + 50);
      doc.text("Nombre de tumeurs: " + this.currentDonor.tumors_number, 20, y + 60);
      doc.text("Date de début de retransplantation: " + this.currentDonor.start_date, 20, y + 70);
      doc.text("Date de fin de retransplantation: " + this.currentDonor.end_date, 20, y + 80);
      doc.save(pdfName + ".pdf");
    },
    getDonorMatchByID(id) {
      this.$http
          .get(`/listings/${id}`)
          .then((response) => {
            this.to_match.donor = response.data;
            this.to_match.person = response.data.person;
            console.log("LE DONNEUR", this.to_match.person)
          })
          .catch((error) => {
            console.log("ERROR SA MERE")
            console.log(error)
          });
    },
    openChatModal() {
      this.state = "chat"
    },
    openEditModal(id) {
      console.log(id)
      this.state = "edit"
      this.getDonorByID(id)
    },
    closeModal() {
      this.state = "";
    },
    openMatchModal(id) {
      //Match by id
      console.log(id)
      this.getDonorMatchByID(id)
      this.state = "match"
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
        this.donors.sort((a, b) => {
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
        this.donors.sort((a, b) => {
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
      } else if (this.sortingKey === "organ") {
        this.donors.sort((a, b) => {
          if (a.person[this.sortingKey] == null ||
            b.person[this.sortingKey] == null)
            return this.checkNull(a, b);
          if (this.sortingOrder) return a.organ.localeCompare(b.organ);
          return b.organ.localeCompare(a.organ);
        });
      }
    },
    filter() {
      if (this.filterText === "") {
        this.donors = this.donorsBackup;
        return;
      }
      if (this.selectFilter in this.donorsBackup[0].person) {
        this.donors = this.donorsBackup.filter((el) => {
          if (el.person[this.selectFilter] != null)
            return el.person[this.selectFilter].includes(this.filterText);
        });
      } else {
        this.donors = this.donorsBackup.filter((el) => {
          if (el[this.selectFilter] != null)
            return el[this.selectFilter].includes(this.filterText);
        });
      }
    },
    openNewModal() {
      this.state = "new"
    },
    getDonorByID(id) {
      this.$http
        .get(`/listings/${id}`)
        .then((response) => {
          this.to_edit.donor = response.data;
          this.to_edit.person = response.data.person;
        })
        .catch((error) => {
          console.log(error)
        });
    },

    delete_donor() {
      this.$http
        .delete(`/listings/${this.id}`)
        .then(() => {
          this.$http
            .delete(`/persons/${this.person.id}`)
            .then(() => {
              this.$toast.success("Suppression effectué");
              this.$router.push("/donors");
            })
            .catch((error) => {
              console.log(error);

            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm() {
      this.$http
        .post(`/listings/${this.id}`, {
          notes: this.donor.notes,
          organ: this.donor.organ,
          person_id: this.id,
          ...(this.donor.start_date
            ? { start_date: this.donor.start_date }
            : {}),
          ...(this.donor.end_date
            ? { end_date: this.donor.end_date }
            : {}),
          ...(this.donor.notes ? { notes: this.donor.notes } : {}),
          ...(this.donor.tumors_number ? { rhesus: this.donor.tumors_number } : {}),
          isDialyse: this.donor.isDialyse,
          isRetransplantation: this.donor.isRetransplantation,
          ...(this.donor.startDateDialyse ? { startDateDialyse: this.donor.startDateDialyse } : {}),
          ...(this.donor.endDateDialyse ? { endDateDialyse: this.donor.endDateDialyse } : {}),
        })
        .then(() => {
          this.updatePerson();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updatePerson() {
      this.to_edit.person.isDialyse = this.donor.isDialyse
      this.$http
        .post(`/persons/${this.to_edit.person.id}`, {
          first_name: this.to_edit.person.first_name,
          last_name: this.to_edit.person.last_name,
          birthday: this.to_edit.person.birthday,
          ...(this.to_edit.person.description
            ? { description: this.to_edit.person.description }
            : {}),
          supervisor_id: this.to_edit.person.supervisor_id,
          ...(this.to_edit.person.abo ? { abo: this.to_edit.person.abo } : {}),
          ...(this.to_edit.person.rhesus ? { rhesus: this.to_edit.person.rhesus } : {}),
          ...(this.to_edit.person.gender ? { gender: this.to_edit.person.gender } : {}),
          ...(this.to_edit.person.isDialyse ? { isDialyse: this.to_edit.person.isDialyse } : {}),
          ...(this.to_edit.person.isRetransplantation ? { isRetransplantation: this.to_edit.person.isRetransplantation } : {}),
          ...(this.to_edit.person.startDateDialyse ? { startDateDialyse: this.to_edit.person.startDateDialyse } : {}),
          ...(this.to_edit.person.endDateDialyse ? { endDateDialyse: this.to_edit.person.endDateDialyse } : {}),
        })
        .then(() => {
          this.$router.push("/donors");
          this.closeModal()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createPerson() {
      this.new_donor.tumors_number = 0;
      this.$http
        .post("/persons", {
          first_name: this.new_donor.first_name,
          last_name: this.new_donor.last_name,
          birthday: this.new_donor.birthday,
          ...(this.new_donor.description ? { description: this.new_donor.description } : {}),
          supervisor_id: this.new_donor.supervisor_id,
          ...(this.new_donor.blood_type ? { abo: this.new_donor.blood_type } : {}),
          ...(this.new_donor.rhesus ? { rhesus: this.new_donor.rhesus } : {}),
          ...(this.new_donor.tumors_number ? { tumors_number: this.new_donor.tumors_number } : {}),
          ...(this.new_donor.isDialyse ? { isDialyse: this.new_donor.isDialyse } : {}),
          ...(this.new_donor.isRetransplantation ? { isRetransplantation: this.new_donor.isRetransplantation } : {}),
          ...(this.new_donor.startDateDialyse ? { startDateDialyse: this.new_donor.startDateDialyse } : {}),
          ...(this.new_donor.endDateDialyse ? { endDateDialyse: this.new_donor.endDateDialyse } : {}),
          ...(this.new_donor.gender ? { gender: this.new_donor.gender } : {}),
        })
        .then((response) => {
          this.new_donor.person_id = response.data.id;
          this.createDonor();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createDonor() {
      this.$http
        .post("/listings", {
          ...(this.new_donor.start_date ? { start_date: this.new_donor.start_date } : {}),
          ...(this.new_donor.notes ? { notes: this.new_donor.notes } : {}),
          organ: this.new_donor.organ,
          donor: true,
          person_id: this.new_donor.person_id,
          tumors_number: this.new_donor.tumors_number,
          isDialyse: this.new_donor.isDialyse,
          isRetransplantation: this.new_donor.isRetransplantation,
        })
        .then(() => {
          this.$router.push("/donors");
          this.getAllDonors()
          this.closeModal()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    TreatData(d_donors) {
      d_donors.map(elem => {
        elem.score = Math.floor(Math.random() * (25) + 75)
      })

      d_donors.sort(
          (p1, p2) => (p1.score < p2.score) ? 1 : (p1.score > p2.score) ? -1 : 0);
      d_donors = d_donors.slice(0, 5)

      return d_donors
    },
    getAllOrgans() {
      this.$http
        .get("/listings/organs")
        .then((response) => {
          this.all_organs = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
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

<style scoped>
.btn-margin {
  margin: 1.5em;
}

.username {
  margin: 1em;
  font-size: medium;
}

.add-button {
  color: green;
}

.person-box {
  margin: 0.5em;
}

.delete-button {
  color: red;
}

.table-scroll {
  overflow-x: scroll;
  display: flex;
  flex-direction: column;
  white-space: break-spaces;
  table-layout: fixed;
  max-width: 1100px;
}

th,
td {
  text-align: left;
  min-width: 160px;
}

.role-panel-btn-container {
  padding: 25px 0 25px 25px;

  width: 100%;
  position: relative;
  display: block;
  flex-direction: row;
}

.page-content {
  max-width: 96%;
  margin-left: 10px;

}

.add-btn:hover {
  background-color: #2d6594;
  outline: none;
  text-decoration: none;

}


.add-btn {
  float: right;
  width: 150px;
  height: 50px;
  margin-right: 15px;
  background-color: #6799c4;
}


.icon-dropdown-correction {
  position: relative;
  margin-top: 12px;
  margin-left: -45px;
  margin-right: 40px;
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

.match-modal {
  width: 90%;
  height: 90%;
}

.donor-card {
  width: 33%;
  height: 400px;
  padding: 15px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
}
.modal-card-body {border: none}

.match-container {
  display: flex;
  flex-direction: row;
  mso-padding-between: 10px;
}
.table-match {
  width: 800px;
}
</style>
