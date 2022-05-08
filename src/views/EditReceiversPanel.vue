<template>
  <div>
    <form @submit.prevent="submitForm()" class="show-requireds">
      <h2 class="form-title title is-3">Éditer un receveur</h2>
      <div class="form-fields">
        <div class="form-input small required">
          <label class="label">Prénom</label>
          <input
            class="input is-info"
            v-model="person.first_name"
            placeholder="first_name"
            type="text"
            required
          />
        </div>
        <div class="form-input small required">
          <label class="label">Nom de Famille</label>
          <input
            class="input is-info"
            v-model="person.last_name"
            placeholder="last_name"
            type="text"
            required
          />
        </div>
        <div class="form-input small required">
          <label class="label">Date de naissance</label>
          <input
            v-model="person.birthday"
            placeholder="birthday"
            type="date"
            class="input is-info"
          />
        </div>
        <div class="form-input small required">
          <label class="label">Organe</label>
          <select
            v-model="receiver.organ"
            id="organ-select"
            required
            class="button is-info is-light"
          >
            <option v-for="element in all_organs" :key="element">
              {{ element }}
            </option>
          </select>
        </div>
        <div class="form-input small">
          <label class="label">Date d'admission</label>
          <input
            v-model="receiver.start_date"
            placeholder="start date"
            type="date"
          />
        </div>
        <div class="form-input small">
          <label class="label">Date de fin</label>
          <input
            v-model="receiver.end_date"
            placeholder="end date"
            type="date"
            class="input is-info"
          />
        </div>
         <div class="form-input small">
          <label class="label">Nombre de tumeurs</label>
          <input
            v-model="receiver.tumors_number"
            placeholder="0"
            type="text"
            class="input is-info"
          />
        </div>
        <div class="form-input small required">
          <label class="label">Le patient est sous dialyse ?</label>
          <select v-model="receiver.isDialyse" 
            name="dialyse" 
            id="dialyse-select" 
            class="button is-info is-light"
            required
          >
            <option value="true">Oui</option>
            <option value="false">Non</option>
            
          </select>
        </div>
        <div class="form-input small">
          <label class="label">Date de début de dialyse</label>
          <input
            v-model="receiver.startDateDialyse"
            placeholder="start date"
            type="date"
            class="input is-info"
          />
        </div>
        <div class="form-input small">
          <label class="label">Date de fin de dialyse</label>
          <input
            v-model="receiver.endDateDialyse"
            placeholder="start date"
            type="date"
            class="input is-info"
          />
        </div>
        <div class="form-input small required">
          <label class="label">A-t-il effectué une retransplantation ?</label>
          <select v-model="receiver.isRetransplantation" 
            name="retransplantation" 
            id="transplantation-select" 
            class="button is-info is-light"
            required
          >
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
        </div>
        <div class="form-input small">
          <label class="label">Description</label>
          <input
            class="input is-info"
            v-model="person.description"
            placeholder="description"
            type="text"
          />
        </div>
        <div class="form-input small required">
          <label class="label">Groupe sanguin</label>
          <select
            v-model="person.abo"
            name="abo"
            id="abo-select"
            class="button is-info is-light"
            required
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="O">O</option>
            <option value="AB">AB</option>
          </select>
        </div>
        <div class="form-input small required">
          <label class="label">Rhésus</label>
          <select
            class="button is-info is-light"
            v-model="person.rhesus"
            name="rhesus"
            id="rhesus-select"
            required
          >
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
        </div>
        <div class="form-input small required">
          <label class="label">Sexe</label>
          <select
            v-model="person.gender"
            name="gender"
            id="gender-select"
            class="button is-info is-light"
            required
          >
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>
        <div class="form-input small">
          <label class="label">Notes</label>
          <textarea
            class="textarea"
            v-model="receiver.notes"
            placeholder="notes"
          />
        </div>
        <p class="required-notice">* Obligatoire</p>
      </div>
      <div class="form-submit is-center">
        <button type="submit" class="cypress-add button is-info mx-auto mr-6">
          Enregistrer
        </button>
        <router-link to="/receivers" class="button is-danger ml-6"
          >Retour</router-link
        >
        <button
          type="button"
          class="button is-danger ml-6"
          @click="delete_receiver"
        >
          Supprimer
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditReceiversPanel",
  props: {
    id: String,
  },
  data() {
    return {
      receiver: {},
      person: {},
      all_organs: [],
      tumors_number: 0,
    };
  },
  methods: {
    getReceiverByID() {
      this.$http
        .get(`/listings/${this.id}`)
        .then((response) => {
          this.receiver = response.data;
          this.person = response.data.person;
          console.log(this.receiver)
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
    submitForm() {
      this.$http
        .post(`/listings/${this.id}`, {
          notes: this.receiver.notes,
          organ: this.receiver.organ,
          person_id: this.id,
          ...(this.receiver.start_date
            ? { start_date: this.receiver.start_date }
            : {}),
          ...(this.receiver.end_date
            ? { end_date: this.receiver.end_date }
            : {}),
          ...(this.receiver.notes ? { notes: this.receiver.notes } : {}),
          ...(this.receiver.tumors_number ? { rhesus: this.receiver.tumors_number } : {}),
          isDialyse : this.receiver.isDialyse,
          isRetransplantation: this.receiver.isRetransplantation,
          ...(this.receiver.startDateDialyse ? { startDateDialyse: this.receiver.startDateDialyse } : {}),
          ...(this.receiver.endDateDialyse ? { endDateDialyse: this.receiver.endDateDialyse } : {}),
        })
        .then(() => {
          this.updatePerson();
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
    updatePerson() {
      this.person.isDialyse = this.receiver.isDialyse
      this.$http
        .post(`/persons/${this.person.id}`, {
          first_name: this.person.first_name,
          last_name: this.person.last_name,
          birthday: this.person.birthday,
          ...(this.person.description
            ? { description: this.person.description }
            : {}),
          supervisor_id: this.person.supervisor_id,
          ...(this.person.abo ? { abo: this.person.abo } : {}),
          ...(this.person.rhesus ? { rhesus: this.person.rhesus } : {}),
          ...(this.person.gender ? { gender: this.person.gender } : {}),
          ...(this.person.isDialyse ? { isDialyse: this.person.isDialyse } : {}),
          ...(this.person.isRetransplantation ? { isRetransplantation: this.person.isRetransplantation } : {}),
          ...(this.person.startDateDialyse ? { startDateDialyse: this.person.startDateDialyse } : {}),
          ...(this.person.endDateDialyse ? { endDateDialyse: this.person.endDateDialyse } : {}),
        })
        .then(() => {
          this.$router.push("/receivers");
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
    redirect() {
      window.location.replace("/receivers");
    },
    getAllOrgans() {
      this.$http
        .get("/listings/organs")
        .then((response) => {
          this.all_organs = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
    delete_receiver() {
      this.$http
        .delete(`/listings/${this.id}`)
        .then(() => {
          this.$http
            .delete(`/persons/${this.person.id}`)
            .then(() => {
              this.$toast.success("Suppression effectué");
              this.$router.push("/receivers");
            })
            .catch((error) => {
              console.log(error);
              this.$toast.error("Erreur : " + error.response.data.detail);
              setTimeout(this.$toast.clear, 3000);
            });
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
  },
  created() {
    this.getReceiverByID();
    this.getAllOrgans();
  },
};
</script>