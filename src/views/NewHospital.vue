<template>
  <div>
    <form class="form-control" @submit.prevent="submitForm">
      <div class="form-fields">
        <label class="label">Nom</label>
        <input v-model="name" type="text" class="input mb-6 cypress-name" required/>
        <div class="form-input small">
          <label class="label">Ville</label>
          <input v-model="city_name" type="text" class="input mb-6 cypress-city" required/>
        </div>
        <div class="form-input small">
          <label class="label">Code de département</label>
          <input v-model="department_code" type="text" class="input mb-6 cypress-department"  required/>
        </div>
        <div class="form-input small">
          <label class="label">Numéro de téléphone</label>
          <input v-model="phone_number" type="text" class="input mb-6 cypress-phone-number" required/>
        </div>
      </div>
      <button type="submit" class="button is-info cypress-add">Enregistrer</button>
      <router-link class="button is-danger ml-6" to="/hospitals">Retour</router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewHospital",
  props: {
    id: String,
  },
  data() {
    return {
      city_name: "",
      department_code: "",
      name: "",
      phone_number: "",
    };
  },
  methods: {
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
            this.$router.push("/hospitals");
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
};
</script>
