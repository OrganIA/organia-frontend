<template>
  <div>
    <form @submit.prevent="createPerson()" class="show-requireds">
      <h2 class="form-title title is-3">Ajouter un donneur</h2>
      <div class="form-fields">
        <div class="form-input small required">
          <label class="label">Prénom</label>
          <input
            v-model="first_name"
            placeholder="first_name"
            type="text"
            class="cypress-first-name input is-info"
            required
          />
        </div>
        <div class="form-input small required">
          <label class="label">Nom de Famille</label>
          <input
            v-model="last_name"
            placeholder="last_name"
            type="text"
            class="cypress-last-name input is-info"
            required
          />
        </div>
        <div class="form-input small required">
          <label class="label">Date de naissance</label>
          <input
            v-model="birthday"
            placeholder="birthday"
            type="date"
            class="cypress-birth-date input is-info"
            required
          />
        </div>
        <div class="form-input small required">
          <label class="label">Organe</label>
          <select
            v-model="organ"
            id="organ-select"
            class="cypress-organ input is-info"
            required
          >
            <option v-for="element in all_organs" :key="element">
              {{ element }}
            </option>
          </select>
        </div>
        <div class="form-input small">
          <label class="label">Date d'admission</label>
          <input
            v-model="start_date"
            placeholder="start date"
            type="date"
            class="cypress-admission-date input is-info"
          />
        </div>
        <div class="form-input small">
          <label class="label">Nombre de tumeurs</label>
          <input
            v-model="tumors_number"
            placeholder="0"
            type="text"
            class="input is-info"
          />
        </div>
        <div class="form-input small">
          <label class="label">Le patient est sous dialyse ?</label>
          <select v-model="isDialyse" name="dialyse" id="dialyse-select" class="button is-info is-light">
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
        </div>
        <div class="form-input small">
          <label class="label">Date de début de dialyse</label>
          <input
            v-model="startDateDialyse"
            placeholder="start date"
            type="date"
            class="input is-info"
          />
        </div>
        <div class="form-input small">
          <label class="label">Date de fin de dialyse</label>
          <input
            v-model="endDateDialyse"
            placeholder="start date"
            type="date"
            class="input is-info"
          />
        </div>
        <div class="form-input small">
          <label class="label">A-t-il effectué une retransplantation ?</label>
          <select v-model="isRetransplantation" name="retransplantation" id="transplantation-select" class="button is-info is-light">
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
        </div>
        <div class="form-input small">
          <label class="label">Description</label>
          <input v-model="description" placeholder="description" type="text" class="input is-info"/>
        </div>
        <div class="form-input small">
          <label class="label">Groupe sanguin</label>
          <select v-model="blood_type" name="abo" id="abo-select" class="button is-info is-light">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="O">O</option>
            <option value="AB">AB</option>
          </select>
        </div>
        <div class="form-input small">
          <label class="label">Rhésus</label>
          <select v-model="rhesus" name="rhesus" id="rhesus-select" class="button is-info is-light">
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
        </div>
        <div class="form-input small">
          <label class="label">Sexe</label>
          <select v-model="gender" name="gender" id="gender-select" class="button is-info is-light">
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>
        <div class="form-input small">
          <label class="label">Notes</label>
          <textarea v-model="notes" placeholder="notes" class="textarea"/>
          <p class="required-notice">* Obligatoire</p>
        </div>
        <div class="form-submit is-center">
          <button type="submit" class="cypress-add button is-info mx-auto mr-6">Ajouter</button>
          <router-link to="/donors" class="button is-danger ml-6">Retour</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewDonor",
  data() {
    return {
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
      startDateDialyse: "",
      endDateDialyse: "",
      gender: "",
      all_organs: "",
    };
  },
  created() {
    this.getAllOrgans();
  },
  methods: {
    createPerson() {
      this.$http
        .post("/persons", {
          first_name: this.first_name,
          last_name: this.last_name,
          birthday: this.birthday,
          ...(this.description ? { description: this.description } : {}),
          supervisor_id: this.supervisor_id,
          ...(this.blood_type ? { abo: this.blood_type } : {}),
          ...(this.rhesus ? { rhesus: this.rhesus } : {}),
          ...(this.tumors_number ? { tumors_number: this.tumors_number } : {}),
          ...(this.isDialyse ? { isDialyse: this.isDialyse } : {}),
          ...(this.isRetransplantation ? { isRetransplantation: this.isRetransplantation } : {}),
          ...(this.startDateDialyse ? { startDateDialyse: this.startDateDialyse } : {}),
          ...(this.endDateDialyse ? { endDateDialyse: this.endDateDialyse } : {}),
          ...(this.gender ? { gender: this.gender } : {}),
        })
        .then((response) => {
          this.person_id = response.data.id;
          this.createDonor();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createDonor() {
      this.$http
        .post("/listings", {
          ...(this.start_date ? { start_date: this.start_date } : {}),
          ...(this.notes ? { notes: this.notes } : {}),
          organ: this.organ,
          donor: true,
          person_id: this.person_id,
          tumors_number: this.tumors_number,
          isRetransplantation: this.isRetransplantation,
          isDialyse: this.isDialyse,
          startDateDialyse: this.startDateDialyse,
          endDateDialyse: this.endDateDialyse,
        })
        .then(() => {
          this.$router.push("/donors");
        })
        .catch((error) => {
          this.$toast.error(
            "Erreur : " + error.response.data.detail
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
            "Erreur : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
  },
};
</script>
