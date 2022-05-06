<template>
  <div>
    <form class="form-control" @submit.prevent="submitForm">
      <div class="form-fields">
        <label class="label">Nom</label>
        <input 
          v-model="data.name" 
          type="text" 
          class="input mb-6 cypress-name"
          placeholder="Nom du centre"
          required
        />
        <div class="form-input small">
          <label class="label">Ville</label>
          <input 
            v-model="data.city.name" 
            type="text" 
            class="input mb-6 cypress-city"
            placeholder="Nom du centre"
            required
          />
        </div>
        <div class="form-input small">
          <label class="label">Code de département</label>
          <input 
            v-model="data.city.department_code" 
            type="text" 
            class="input mb-6 cypress-department" 
            placeholder="Nom du centre"
            required
          />
        </div>
        <div class="form-input small">
          <label class="label">Numéro de téléphone</label>
          <input 
            v-model="data.phone_number" 
            type="text" 
            class="input mb-6 cypress-phone-number" 
            placeholder="Nom du centre"
            required
          />
        </div>
      </div>
      <button type="submit" class="button is-info cypress-add">Enregistrer</button>
      <router-link class="button is-danger ml-6" to="/hospitals">Retour</router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditHospitals",
  props: {
    id: String,
  },
  data() {
    return {
      data: {},
    };
  },
  methods: {
    getHospital() {
      this.$http
          .get(`/hospitals/${this.id}`)
          .then((response) => {
            this.data = response.data;
            console.log(this.data);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    submitForm() {
      console.log(this.data);
      this.$http
        .post(`/hospitals/${this.id}`, {
          city: {
            "name": this.data.city.name,
            "department_code": this.data.city.department_code
          },
          name: this.data.name,
          phone_number: this.data.phone_number,
        })
        .then(() => {
          this.$toast.success("Modification de l'hopital réussi !");
          setTimeout(this.$toast.clear, 3000);
          this.$router.push("/hospitals");
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
  },
  created() {
    this.getHospital();
  },
};
</script>
