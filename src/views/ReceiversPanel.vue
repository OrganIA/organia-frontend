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
              <span class="btn-add-text cypress-add-receiver">Ajouter</span>
            </div>
          </div>
          <div class="search-block">
            <select v-model="selectFilter" class="search-filter button mb-4 ml-6 is-info is-light">
              <option value="first_name">Prénom</option>
              <option value="last_name">Nom</option>
              <option value="gender">Sexe</option>
              <option value="abo">ABO</option>
              <option value="organ">Organe</option>
            </select>
            <div class="fa fa-solid fa-angle-down icon-dropdown-correction"></div>
            <input @input="filter" v-model="filterText" class="search-bar input mr-6"/>
            <select v-model="nb_by_page" @change="updateNbElements"
                    class="number-selector button mb-4 ml-6 is-info is-light">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
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
            <th>Éditer</th>
          </tr>
          </thead>
          <tbody>
          <tr class="cypress-receiver-row" v-for="receiver in receivers" :key="receiver">
            <td>{{ receiver.person.first_name }}</td>
            <td>{{ receiver.person.last_name }}</td>
            <td>{{ this.translate(receiver.person.gender) }}</td>
            <td>{{ receiver.person.abo }}{{receiver.person.rhesus}}</td>
            <td>{{ this.translate(receiver.organ_type) }}</td>
            <td>
              <div @click="openEditModal(receiver.id)">
                <i class="fas fa-edit button is-primary cypress-edit-receiver"></i>
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
        <div class="modal new-receiver-modal"
             :class="{ 'is-invisible': (state !== 'new'), 'is-active': (state === 'new'), 'is-shifted': (state_extra === 'organ-selected')}">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Ajouter un receveur</p>
              <button class="delete" aria-label="close" @click="closeModal(false)"></button>
            </header>
            <section class="modal-card-body organia-modal-body">
              <form @submit.prevent="createDonor()" class="show-requireds">
                <div class="form-fields">
                  <div class="form-input small required">
                    <label class="label">Prénom</label>
                    <input v-model="new_receiver.first_name" placeholder="first_name" type="text"
                           class="cypress-first-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Nom de Famille</label>
                    <input v-model="new_receiver.last_name" placeholder="last_name" type="text"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Date de naissance</label>
                    <input v-model="new_receiver.birth_date" placeholder="birth_date" type="date"
                           class="cypress-birth-date-receiver input is-info" required/>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Organe</label>
                    <select v-model="new_receiver.organ_type" id="organ-select" class="cypress-organ-receiver input is-info"
                            required v-on:change="() => selectOrgan()">
                      <option :value="element" v-for="element in all_organs" :label="this.translate(element)" :key="element">
                        {{ element }}
                      </option>
                    </select>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Date d'admission</label>
                    <input v-model="new_receiver.start_date" placeholder="start date" type="date"
                           class="cypress-admission-date-receiver input is-info" required/>
                  </div>
                  <div class="form-input small">
                    <label class="label">Description</label>
                    <input v-model="new_receiver.description" placeholder="description" type="text"
                           class="input is-info cypress-description-receiver"/>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Groupe sanguin</label>
                    <select v-model="new_receiver.abo" name="abo" id="abo-select"
                            class="cypress-blood-receiver button is-info is-light" required>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="O">O</option>
                      <option value="AB">AB</option>
                    </select>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Rhésus</label>
                    <select v-model="new_receiver.rhesus" name="rhesus" id="rhesus-select"
                            class="cypress-rhesus-receiver button is-info is-light" required>
                      <option value="+">+</option>
                      <option value="-">-</option>
                    </select>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Sexe</label>
                    <select v-model="new_receiver.gender" name="gender" id="gender-select"
                            class="cypress-gender-receiver button is-info is-light" required>
                      <option value="MALE">HOMME</option>
                      <option value="FEMALE">FEMME</option>
                    </select>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Poids en kg</label>
                    <input v-model="new_receiver.weight_kg" type="number" class="input is-info"/>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Taille en cm</label>
                    <input v-model="new_receiver.height_cm" type="number" class="input is-info"/>
                  </div>
                  <div class="form-input small">
                    <label class="label">Notes</label>
                    <textarea v-model="new_receiver.notes" placeholder="notes" class="textarea cypress-note-receiver"/>
                    <p class="required-notice">* Obligatoire</p>
                  </div>
                </div>
              </form>

            </section>
            <footer class="modal-card-foot organia-modal-footer">
              <button type="submit" class="cypress-add button modal-admin-btn modal-add-role-btn"
                      @click="createDonor()">Ajouter
              </button>
              <button class="button modal-admin-btn" @click="closeModal()">Fermer</button>
            </footer>
          </div>
          <div class="modal-card modal-complement"
               :class="{ 'is-invisible': (state_extra !== 'organ-selected'), 'is-active': (state_extra === 'organ-selected') }">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Info en plus - {{ translate(this.new_receiver.organ_type) }}</p>
              <button class="delete" aria-label="close" @click="closeModal(false)"></button>
            </header>

            <section class="modal-card-body organia-modal-body">
              <form action="">
                <div class="kidney-form" :class="{ 'is-invisible': (active_form !== 'kidney')}">
                  <div class="form-input required">
                    <label class="label">Sous dialyse ?</label>
                    <select v-model="new_receiver.organ['is_under_dialysis']" class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">Est retransplanté ?</label>
                    <select v-model="new_receiver.organ['is_retransplantation']" class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">Date de début de dialyse</label>
                    <input v-model="new_receiver.organ['dialysis_start_date']" type="date"
                           class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Date de l'arf</label>
                    <input v-model="new_receiver.organ['arf_date']" type="date"
                           class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Date de transplantation</label>
                    <input v-model="new_receiver.organ['date_transplantation']" type="date"
                           class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Date de réinscription</label>
                    <input v-model="new_receiver.organ['re_registration_date']" type="date"
                           class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">A</label>
                    <input v-model="new_receiver.organ['A']" type="number" class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">B</label>
                    <input v-model="new_receiver.organ['B']" type="number" class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">DR</label>
                    <input v-model="new_receiver.organ['DR']" type="number" class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">DQ</label>
                    <input v-model="new_receiver.organ['DQ']" type="number" class="input is-info"/>
                  </div>
                </div>
                <div class="lung-form" :class="{ 'is-invisible': (active_form !== 'lung')}">
                  <div class="form-input required">
                    <label class="label">Groupe de diagnostique</label>
                    <select v-model="new_receiver.organ['diagnosis_group']" class="button is-info is-light"
                            required>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">Diagnostique</label>
                    <select v-model="new_receiver.organ['detailed_diagnosis']" class="button is-info is-light"
                            required>
                      <option value="BRONCHIECTASIS">BRONCHIECTASIS</option>
                      <option value="EISENMENGER">EISENMENGER</option>
                      <option value="BRONCHIOLITIS">BRONCHIOLITIS</option>
                      <option value="LAM">LAM</option>
                      <option value="SARCOIDOSIS">SARCOIDOSIS</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">IMC</label>
                    <input v-model="new_receiver.organ['body_mass_index']" type="number" class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Le patient a-t-il du diabète ?</label>
                    <select v-model="new_receiver.organ['diabetes']" class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">Le patient a-t-il besoin d'une aide ?</label>
                    <select v-model="new_receiver.organ['assistance_required']" class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">% de fonction pulmonaire (de 0 à 1)</label>
                    <input v-model="new_receiver.organ['pulmonary_function_percentage']" type="number"
                           class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Pression artérielle pulmonaire</label>
                    <input v-model="new_receiver.organ['pulmonary_artery_systolic']" type="number" class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Besoin en oxygène</label>
                    <input v-model="new_receiver.organ['oxygen_requirement']" type="number" class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Marche de 6minutes sur +45m ?</label>
                    <select v-model="new_receiver.organ['six_minutes_walk_distance_over_150_feet']"
                            class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">Assistance respiratoire continue ?</label>
                    <select v-model="new_receiver.organ['continuous_mech_ventilation']" class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">Pression partielle CO2 ?</label>
                    <input v-model="new_receiver.organ['carbon_dioxide_partial_pressure']" type="number"
                           class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Pression partielle CO2 augmente de 15%?</label>
                    <select v-model="new_receiver.organ['carbone_dioxide_partial_pressure_15_percent_increase']"
                            class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">Activité quotidienne requise ?</label>
                    <select v-model="new_receiver.organ['activities_of_daily_life_required']" class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">Pression pulmonaire au niveau des capillaires ?</label>
                    <input v-model="new_receiver.organ['pulmonary_capilary_wedge_pressure']" type="number"
                           class="input is-info"/>
                  </div>
                </div>
                <div class="liver-form" :class="{ 'is-invisible': (active_form !== 'liver')}">
                  <div class="form-input required">
                    <label class="label">Nombre de tumeurs</label>
                    <input v-model="new_receiver.organ['tumors_count']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Plus grosse tumeur</label>
                    <input v-model="new_receiver.organ['biggest_tumor_size']" type="text"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Alpha fétoprotéine</label>
                    <input v-model="new_receiver.organ['alpha_fetoprotein']" type="text"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Créatinine</label>
                    <input v-model="new_receiver.organ['creatinine']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                </div>
                <div class="heart-form" :class="{ 'is-invisible': (active_form !== 'heart')}">
                  <label class="label">Type d'urgence</label>
                  <select v-model="new_receiver.organ['emergency']" class="button is-info is-light"
                          required>
                    <option value="XPCA">XPCA</option>
                    <option value="XPCP1">XPCP1</option>
                    <option value="XPCP2">XPCP2</option>
                    <option value="NA">NA</option>
                  </select>
                  <div class="form-input required">
                    <label class="label">Délai GRF</label>
                    <input v-model="new_receiver.organ['delay_var_bio_GRF']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <label class="label">Maladie 1</label>
                  <select v-model="new_receiver.organ['MAL']" class="button is-info is-light"
                          required>
                    <option :value="null">Aucun</option>
                    <option value="VALVULAR">VALVULAR</option>
                    <option value="CONGENITAL">CONGENITAL</option>
                    <option value="CONGENITAL_NON_EISENMENGER">CONGENITAL_NON_EISENMENGER</option>
                  </select>
                  <label class="label">Maladie 2</label>
                  <select v-model="new_receiver.organ['MAL2']" class="button is-info is-light"
                          required>
                    <option :value="null">Aucun</option>
                    <option value="VALVULAR">VALVULAR</option>
                    <option value="CONGENITAL">CONGENITAL</option>
                    <option value="CONGENITAL_NON_EISENMENGER">CONGENITAL_NON_EISENMENGER</option>
                  </select>
                  <label class="label">Maladie 3</label>
                  <select v-model="new_receiver.organ['MAL3']" class="button is-info is-light"
                          required>
                    <option :value="null">Aucun</option>
                    <option value="VALVULAR">VALVULAR</option>
                    <option value="CONGENITAL">CONGENITAL</option>
                    <option value="CONGENITAL_NON_EISENMENGER">CONGENITAL_NON_EISENMENGER</option>
                  </select>
                  <div class="form-input required">
                    <label class="label">DA</label>
                    <input v-model="new_receiver.organ['DA']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">DAURG</label>
                    <input v-model="new_receiver.organ['DAURG']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">XPC</label>
                    <input v-model="new_receiver.organ['XPC']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">BILI</label>
                    <input v-model="new_receiver.organ['BILI']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">CREAT</label>
                    <input v-model="new_receiver.organ['CREAT']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">F_ICAR</label>
                    <input v-model="new_receiver.organ['F_ICAR']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">ICAR</label>
                    <input v-model="new_receiver.organ['ICAR']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">KXPC</label>
                    <input v-model="new_receiver.organ['KXPC']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">DIA_is_O</label>
                    <select v-model="new_receiver.organ['DIA_is_O']" class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">DBILI</label>
                    <input v-model="new_receiver.organ['DBILI']" type="date"
                           class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">DCREAT</label>
                    <input v-model="new_receiver.organ['DCREAT']" type="date"
                           class="input is-info"/>
                  </div>
                </div>
              </form>
            </section>
            <footer class="modal-card-foot organia-modal-footer">
            </footer>
          </div>
        </div>
        <div class="modal edit-receiver-modal"
             :class="{ 'is-invisible': (state !== 'edit'), 'is-active': (state === 'edit') }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Éditer un receveur</p>
              <button class="delete" aria-label="close" @click="closeModal()"></button>
            </header>
            <section class="modal-card-body organia-modal-body cypress-edit-body">
              <form @submit.prevent="EditDonor" class="show-requireds">
                <div class="form-fields">
                  <div class="form-input small required">
                    <label class="label">Prénom</label>
                    <input class="input is-info" v-model="to_edit.person.first_name" placeholder="first_name"
                           type="text" required/>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Nom de Famille</label>
                    <input class="input is-info" v-model="to_edit.person.last_name" placeholder="last_name" type="text"
                           required/>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Date de naissance</label>
                    <input v-model="to_edit.person.birth_date" placeholder="birth_date" type="date"
                           class="input is-info"/>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Organe</label>
                    <select v-model="to_edit.organ_type" id="organ-select" required class="button is-info is-light" disabled>
                      <option :value="element" v-for="element in all_organs" :label="this.translate(element)" :key="element">
                        {{ element }}
                      </option>
                    </select>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Date d'admission</label>
                    <input v-model="to_edit.start_date" class="input is-info" placeholder="start date" type="date"/>
                  </div>
                  <div class="form-input small">
                    <label class="label">Description</label>
                    <input class="input is-info" v-model="to_edit.person.description" placeholder="description"
                           type="text"/>
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
                      <option value="MALE">HOMME</option>
                      <option value="FEMALE">FEMME</option>
                    </select>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Poids en kg</label>
                    <input v-model="to_edit.weight_kg" type="number" class="input is-info"/>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Taille en cm</label>
                    <input v-model="to_edit.height_cm" type="number" class="input is-info"/>
                  </div>
                  <div class="form-input small">
                    <label class="label">Notes</label>
                    <textarea class="textarea" v-model="to_edit.notes" placeholder="notes"/>
                  </div>
                  <p class="required-notice">* Obligatoire</p>
                </div>
              </form>

            </section>
            <footer class="modal-card-foot organia-modal-footer">
              <button type="submit" class="cypress-add button modal-admin-btn modal-add-role-btn"
                      @click="EditDonor">Enregistrer
              </button>
              <button type="button" class="button modal-admin-btn modal-add-role-btn is-danger ml-6" @click="deleteDonor">
                Supprimer
              </button>
              <button class="button modal-admin-btn modal-add-role-btn large-btn-modal cypress-receiver-chat-modal" @click="openChatModal()">
                Créer une conversation
              </button>
              <button class="button modal-admin-btn modal-add-role-btn large-btn-modal cypress-pdf" @click="createPDF()">
                Télécharger la version PDF
              </button>
              <button class="button modal-admin-btn" @click="closeModal()">Fermer</button>
            </footer>
          </div>
          <div class="modal-card modal-complement"
               :class="{ 'is-invisible': (state_extra !== 'organ-selected'), 'is-active': (state_extra === 'organ-selected') }">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Info en plus - {{ this.new_receiver.organ }}</p>
              <button class="delete" aria-label="close" @click="closeModal(false)"></button>
            </header>
            <section class="modal-card-body organia-modal-body">
              <form action="">
                <div class="kidney-form" :class="{ 'is-invisible': (active_form !== 'kidney')}">
                  <div class="form-input required">
                    <label class="label">Sous dialyse ?</label>
                    <select v-model="to_edit.organ['is_under_dialysis']" class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">Est retransplanté ?</label>
                    <select v-model="to_edit.organ['is_retransplantation']" class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">Date de début de dialyse</label>
                    <input v-model="to_edit.organ['dialysis_start_date']" type="date"
                           class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Date de l'arf</label>
                    <input v-model="to_edit.organ['arf_date']" type="date"
                           class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Date de transplantation</label>
                    <input v-model="to_edit.organ['date_transplantation']" type="date"
                           class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Date de réinscription</label>
                    <input v-model="to_edit.organ['re_registration_date']" type="date"
                           class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">A</label>
                    <input v-model="to_edit.organ['A']" type="number" class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">B</label>
                    <input v-model="to_edit.organ['B']" type="number" class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">DR</label>
                    <input v-model="to_edit.organ['DR']" type="number" class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">DQ</label>
                    <input v-model="to_edit.organ['DQ']" type="number" class="input is-info"/>
                  </div>
                </div>
                <div class="lung-form" :class="{ 'is-invisible': (active_form !== 'lung')}">
                  <div class="form-input required">
                    <label class="label">Groupe de diagnostique</label>
                    <select v-model="to_edit.organ['diagnosis_group']" class="button is-info is-light"
                            required>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">Diagnostique</label>
                    <select v-model="to_edit.organ['detailed_diagnosis']" class="button is-info is-light"
                            required>
                      <option value="BRONCHIECTASIS">BRONCHIECTASIS</option>
                      <option value="EISENMENGER">EISENMENGER</option>
                      <option value="BRONCHIOLITIS">BRONCHIOLITIS</option>
                      <option value="LAM">LAM</option>
                      <option value="SARCOIDOSIS">SARCOIDOSIS</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">IMC</label>
                    <input v-model="to_edit.organ['body_mass_index']" type="number" class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Le patient a-t-il du diabète ?</label>
                    <select v-model="to_edit.organ['diabetes']" class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">Le patient a-t-il besoin d'une aide ?</label>
                    <select v-model="to_edit.organ['assistance_required']" class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">% de fonction pulmonaire (de 0 à 1)</label>
                    <input v-model="to_edit.organ['pulmonary_function_percentage']" type="number" class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Pression artérielle pulmonaire</label>
                    <input v-model="to_edit.organ['pulmonary_artery_systolic']" type="number" class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Besoin en oxygène</label>
                    <input v-model="to_edit.organ['oxygen_requirement']" type="number" class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Marche de 6minutes sur +45m ?</label>
                    <select v-model="to_edit.organ['six_minutes_walk_distance_over_150_feet']"
                            class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">Assistance respiratoire continue ?</label>
                    <select v-model="to_edit.organ['continuous_mech_ventilation']" class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">Pression partielle CO2 ?</label>
                    <input v-model="to_edit.organ['carbon_dioxide_partial_pressure']" type="number"
                           class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">Pression partielle CO2 augmente de 15%?</label>
                    <select v-model="to_edit.organ['carbone_dioxide_partial_pressure_15_percent_increase']"
                            class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">Activité quotidienne requise ?</label>
                    <select v-model="to_edit.organ['activities_of_daily_life_required']" class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">Pression pulmonaire au niveau des capillaires ?</label>
                    <input v-model="to_edit.organ['carbon_dioxide_partial_pressure']" type="number"
                           class="input is-info"/>
                  </div>
                </div>
                <div class="liver-form" :class="{ 'is-invisible': (active_form !== 'liver')}">
                  <div class="form-input required">
                    <label class="label">Nombre de tumeurs</label>
                    <input v-model="to_edit.organ['tumors_count']" type="text"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Plus grosse tumeur</label>
                    <input v-model="to_edit.organ['biggest_tumor_size']" type="text"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Alpha fétoprotéine</label>
                    <input v-model="to_edit.organ['alpha_fetoprotein']" type="text"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                </div>
                <div class="heart-form" :class="{ 'is-invisible': (active_form !== 'heart')}">
                  <label class="label">Type d'urgence</label>
                  <select v-model="to_edit.organ['emergency']" class="button is-info is-light"
                          required>
                    <option value="XPCA">XPCA</option>
                    <option value="XPCP1">XPCP1</option>
                    <option value="XPCP2">XPCP2</option>
                    <option value="NA">NA</option>
                  </select>
                  <div class="form-input required">
                    <label class="label">Délai GRF</label>
                    <input v-model="to_edit.organ['delay_var_bio_GRF']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <label class="label">Maladie 1</label>
                  <select v-model="to_edit.organ['MAL']" class="button is-info is-light"
                          required>
                    <option :value="null">Aucun</option>
                    <option value="VALVULAR">VALVULAR</option>
                    <option value="CONGENITAL">CONGENITAL</option>
                    <option value="CONGENITAL_NON_EISENMENGER">CONGENITAL_NON_EISENMENGER</option>
                  </select>
                  <label class="label">Maladie 2</label>
                  <select v-model="to_edit.organ['MAL2']" class="button is-info is-light"
                          required>
                    <option :value="null">Aucun</option>
                    <option value="VALVULAR">VALVULAR</option>
                    <option value="CONGENITAL">CONGENITAL</option>
                    <option value="CONGENITAL_NON_EISENMENGER">CONGENITAL_NON_EISENMENGER</option>
                  </select>
                  <label class="label">Maladie 3</label>
                  <select v-model="to_edit.organ['MAL3']" class="button is-info is-light"
                          required>
                    <option :value="null">Aucun</option>
                    <option value="VALVULAR">VALVULAR</option>
                    <option value="CONGENITAL">CONGENITAL</option>
                    <option value="CONGENITAL_NON_EISENMENGER">CONGENITAL_NON_EISENMENGER</option>
                  </select>
                  <div class="form-input required">
                    <label class="label">DA</label>
                    <input v-model="to_edit.organ['DA']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">DAURG</label>
                    <input v-model="to_edit.organ['DAURG']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">XPC</label>
                    <input v-model="to_edit.organ['XPC']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">BILI</label>
                    <input v-model="to_edit.organ['BILI']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">CREAT</label>
                    <input v-model="to_edit.organ['CREAT']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">F_ICAR</label>
                    <input v-model="to_edit.organ['F_ICAR']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">ICAR</label>
                    <input v-model="to_edit.organ['ICAR']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">KXPC</label>
                    <input v-model="to_edit.organ['KXPC']" type="number"
                           class="cypress-last-name-receiver input is-info" required/>
                  </div>
                  <div class="form-input required">
                    <label class="label">DIA_is_O</label>
                    <select v-model="to_edit.organ['DIA_is_O']" class="button is-info is-light"
                            required>
                      <option :value='true'>Oui</option>
                      <option :value='false'>Non</option>
                    </select>
                  </div>
                  <div class="form-input required">
                    <label class="label">DBILI</label>
                    <input v-model="to_edit.organ['DBILI']" type="date"
                           class="input is-info"/>
                  </div>
                  <div class="form-input required">
                    <label class="label">DCREAT</label>
                    <input v-model="to_edit.organ['DCREAT']" type="date"
                           class="input is-info"/>
                  </div>
                </div>

              </form>
            </section>
            <footer class="modal-card-foot organia-modal-footer">
            </footer>
          </div>

        </div>
        <div class="modal" :class="{ 'is-invisible': (state !== 'chat'), 'is-active': (state === 'chat') }">
          <div class="modal-background">
            <div class="modal-card">
              <header class="modal-card-head organia-modal-head">
                <p class="modal-card-title is-3">Créer une conversation</p>
              </header>
              <section class="modal-card-body organia-modal-body">
                <div class="container">
                  <div class="columns">
                    <div class="column">
                      <input class="input is-info cypress-chat-title" placeholder="Titre de la conversation" type="text"
                             v-model="chatName"/>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-half">
                      <div class="box">
                        <button class="button is-medium is-fullwidth elements">Liste d'utilisateurs</button>
                        <button class="button is-info is-light person-box" v-for="person in personsNotAdded"
                                :key="person">
                          <p class="username">{{ `${person.lastname} ${person.firstname}` }}</p>
                          <i class="fas fa-plus-circle add-button cypress-non-add-user" @click="addPerson(person)"></i>
                        </button>
                      </div>
                    </div>
                    <div class="column is-half">
                      <div class="box">
                        <button class="button is-medium is-fullwidth elements">Utilisateurs à ajouter</button>
                        <button class="button is-info is-light person-box" v-for="person in personsToAdd" :key="person">
                          <p class="username">{{ `${person.lastname} ${person.firstname}` }}</p>
                          <i class="fas fa-minus-circle delete-button" @click="deletePerson(person)"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <br>
                <footer>
                  <button class="button is-success is-light btn-margin cypress-save" @click="saveChat()">Enregistrer</button>
                  <button class="button is-danger is-light btn-margin " @click="resetChat(to_edit)">Retour</button>
                </footer>
              </section>
            </div>
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
import translate from "@/translate"

export default {
  components: {SideBar, ApplicationNavbar},
  name: "receivers-panel",
  data() {
    return {
      chatName: "",
      personsToAdd: [],
      personsNotAdded: [],
      receiver: {},
      receivers: {},
      modal: false,
      state: '',
      state_extra: '',
      sortingOrder: true,
      sortingKey: "created_at",
      selectFilter: "first_name",
      filterText: "",
      receiversBackup: [],
      nb_by_page: 5,
      page: 0,
      active_form: '',
      to_edit: {
        person_id: undefined,
        person: {},
        start_date: "",
        notes: "",
        organ_type: "",
        organ: {},
        weight_kg: 0,
        height_cm: 0,
      },
      new_receiver: {
        first_name: "",
        last_name: "",
        birth_date: "",
        description: "",
        person_id: undefined,
        start_date: "",
        notes: "",
        organ_type: "",
        abo: "",
        rhesus: "",
        gender: "",
        organ: {},
        weight_kg: '',
        height_cm: '',
      },
      all_organs: [],
    };
  },
  created() {
    this.getAllOrgans()
    this.getAllDonors();
    this.getAllUsers();
    this.getMe();
    this.new_receiver.tumors_count = 0;
  },
  methods: {
    updateNbElements() {
      this.page = 0;
      this.updatePage()
    },
    updatePage() {
      this.receivers = this.receiversBackup.slice(this.page * this.nb_by_page, this.page * this.nb_by_page + this.nb_by_page);
    },
    getMe() {
      this.$http.get("/users/me")
          .then((response) => {
            this.me = response.data
          })
    },
    getAllUsers() {
      this.$http
          .get("/users/")
          .then((response) => {
            this.personsNotAdded = response.data
          })
    },
    addPerson(person) {
      this.personsToAdd.push(person)
      this.personsNotAdded = this.personsNotAdded.filter((p) => p.id !== person.id)
    },
    deletePerson(person) {
      this.personsToAdd = this.personsToAdd.filter((p) => p.id !== person.id)
      this.personsNotAdded.push(person)
    },
    saveChat() {
      const users = this.personsToAdd.map((p) => p.id)
      this.$http
        .post("/chats/", {
            users_ids: users,
            name: this.chatName,
        })
        .then(() => {
            this.closeModal()
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
    getAllDonors() {
      this.$http
          .get("/listings/?type=receiver")
          .then((response) => {
            response.data.forEach((element) => {
              element.person.created_at = new Date(
                  element.person.created_at
              ).toDateString();
            });
            this.receivers = response.data;
            this.receiversBackup = this.receivers;
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
    nextPage() {
      if (Math.ceil(this.receiversBackup.length / this.nb_by_page) > (this.page + 1)) {
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
    resetChat(receiver) {
      this.openEditModal(receiver.id)
      this.personsToAdd = []
      this.chatName = ""
      this.getAllUsers()
    },
    createPDF() {
      let pdfName = 'receiver_' + this.to_edit.person.last_name;
      const doc = new jsPDF();
      let y = 15
      doc.text("Bilan d'informations Donneur", 15, y);
      doc.text("Prénom: " + this.to_edit.person.first_name, 20, y + 10);
      doc.text("Date de naissance: " + this.to_edit.person.birth_date, 20, y + 20);
      doc.text("Sexe: " + this.to_edit.person.gender, 20, y + 30);
      doc.text("Organe: " + this.translate(this.to_edit.organ_type), 20, y + 40);
      doc.text("Type sanguin: " + this.to_edit.person.abo + this.to_edit.person.rhesus, 20, y + 50);
      doc.text("DONNÉES RELATIVES À L'ORGANE : ", 20, y + 60);
      let current_y = y + 70
      for (const [key, value] of Object.entries(this.to_edit.organ)) {
        doc.text(key + " : " + value, 20, current_y);
        current_y += 7
      }
      doc.save(pdfName + ".pdf");
    },
    translate(organ) {
      return translate[organ]
    },
    openChatModal() {
      this.state = "chat"
      this.personsNotAdded = this.personsNotAdded.filter((p) => p.id !== this.me.id)
    },
    openEditModal(id) {
      this.state = "edit"
      this.getDonorByID(id).then(() => {
        this.state_extra = 'organ-selected'
        switch (this.to_edit.organ_type) {
          case 'KIDNEY':
            this.active_form = 'kidney'
            break;
          case 'HEART':
            this.active_form = 'heart'
            break;
          case 'LUNG':
            this.active_form = 'lung'
            break;
          case 'LIVER':
            this.active_form = 'liver'
            break;
        }
      })
    },
    closeModal() {
      this.state = "";
      this.state_extra = "";
      this.active_form = "";
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
      if (["first_name", "last_name", "gender", "abo"].includes(this.sortingKey)) {
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
      } else if (["birth_date", "created_at"].includes(this.sortingKey)) {
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
      } else if (this.sortingKey === "organ") {
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
      if (this.filterText === "") {
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
    openNewModal() {
      this.state = "new"
    },
    getDonorByID(id) {
      return this.$http
          .get(`/listings/${id}`)
          .then((response) => {
            this.to_edit = response.data;
          })
          .catch((error) => {
            console.log("nonon")
            console.log(error)
            this.$toast.error(
                "Erreur lors de la connexion : " + translate[error.response.data.msg]
            );
            setTimeout(this.$toast.clear, 3000);
          });
    },
    deleteDonor() {
      this.$http
          .delete(`/listings/${this.to_edit.id}`)
          .then(() => {
            this.$toast.success("Suppression listing effectuée");
            setTimeout(this.$toast.clear, 3000);
            this.closeModal()
            this.getAllDonors()
          })
          .catch((error) => {
            console.log(error);
            this.$toast.error(
                "Erreur lors de la suppression : " + translate[error.response.data.msg]
            );
            setTimeout(this.$toast.clear, 3000);
          });
    },
    EditDonor() {
      let person = {
        first_name: this.to_edit.person.first_name,
        last_name: this.to_edit.person.last_name,
        birth_date: this.to_edit.person.birth_date,
        ...(this.to_edit.person.gender ? {gender: this.to_edit.person.gender} : {}),
        ...(this.to_edit.person.description ? {description: this.to_edit.person.description} : {}),
        ...(this.to_edit.person.abo ? {abo: this.to_edit.person.abo} : {}),
        ...(this.to_edit.person.rhesus ? {rhesus: this.to_edit.person.rhesus} : {}),
      }
      console.log({
        person: person,
        ...(this.to_edit.start_date ? {start_date: this.to_edit.start_date} : {}),
        ...(this.to_edit.notes ? {notes: this.to_edit.notes} : {}),
        organ_type: this.to_edit.organ_type,
        type: "RECEIVER",
        organ: this.to_edit.organ,
        weight_kg: this.to_edit.weight_kg,
        height_cm: this.to_edit.height_cm,
      })
      this.$http
          .post(`/listings/${this.to_edit.id}`, {
            person: person,
            ...(this.to_edit.start_date ? {start_date: this.to_edit.start_date} : {}),
            ...(this.to_edit.notes ? {notes: this.to_edit.notes} : {}),
            organ_type: this.to_edit.organ_type,
            type: "RECEIVER",
            organ: this.to_edit.organ,
            weight_kg: this.to_edit.weight_kg,
            height_cm: this.to_edit.height_cm,
          })
          .then(() => {
            this.$toast.success("Modification du receveur réussie");
            setTimeout(this.$toast.clear, 3000);
            this.closeModal()
            this.getAllDonors()
          })
          .catch((error) => {
            console.log(error);
            this.$toast.error(
                "Erreur lors de la modification : " + error.response.data.msg
            );
            setTimeout(this.$toast.clear, 3000);
          });
    },
    selectOrgan() {
      this.state_extra = 'organ-selected'
      console.log(this.new_receiver.organ_type)
      switch (this.new_receiver.organ_type) {
        case 'KIDNEY':
          this.active_form = 'kidney'
          break;
        case 'HEART':
          this.active_form = 'heart'
          break;
        case 'LUNG':
          this.active_form = 'lung'
          break;
        case 'LIVER':
          this.active_form = 'liver'
          break;
      }
    },
    createDonor() {
      let person = {
        first_name: this.new_receiver.first_name,
        last_name: this.new_receiver.last_name,
        birth_date: this.new_receiver.birth_date,
        ...(this.new_receiver.gender ? {gender: this.new_receiver.gender} : {}),
        ...(this.new_receiver.description ? {description: this.new_receiver.description} : {}),
        ...(this.new_receiver.abo ? {abo: this.new_receiver.abo} : {}),
        ...(this.new_receiver.rhesus ? {rhesus: this.new_receiver.rhesus} : {}),
      }
      console.log({
        person: person,
        ...(this.new_receiver.start_date ? {start_date: this.new_receiver.start_date} : {}),
        ...(this.new_receiver.notes ? {notes: this.new_receiver.notes} : {}),
        organ_type: this.new_receiver.organ_type,
        type: "RECEIVER",
        organ: this.new_receiver.organ,
        weight_kg: this.new_receiver.weight_kg,
        height_cm: this.new_receiver.height_cm,
      })
      this.$http
          .post("/listings/", {
            person: person,
            ...(this.new_receiver.start_date ? {start_date: this.new_receiver.start_date} : {}),
            ...(this.new_receiver.notes ? {notes: this.new_receiver.notes} : {}),
            organ_type: this.new_receiver.organ_type,
            type: "RECEIVER",
            organ: this.new_receiver.organ,
            weight_kg: this.new_receiver.weight_kg,
            height_cm: this.new_receiver.height_cm,
          })
          .then(() => {
            this.$toast.success("Création du receveur réussie");
            setTimeout(this.$toast.clear, 3000);
            this.closeModal()
            this.getAllDonors()
          })
          .catch((error) => {
            console.log(error);
            this.$toast.error(
                "Erreur lors de la création : " + error.response.data.msg
            );
            setTimeout(this.$toast.clear, 3000);
          });
    },
    getAllOrgans() {
      this.$http
          .get("/listings/organs")
          .then((response) => {
            this.all_organs = response.data;
          })
          .catch((error) => {
            console.log(error);
            this.$toast.error(
                "Erreur lors de la connexion : " + translate[error.response.data.msg]
            );
            setTimeout(this.$toast.clear, 3000);
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

.modal-card-body {
  border: none
}

.pages {
  margin-top: 20px;
}

.modal-complement {
  width: 30%;
  height: 100%;
  z-index: 100;
}

.is-shifted {
  left: 0px;
}

.new-receiver-modal {
  display: flex;
  flex-direction: row;
}

.edit-receiver-modal {
  display: flex;
  flex-direction: row;
}

.large-btn-modal {
  width: 200px;
  text-wrap: normal;
}

</style>
