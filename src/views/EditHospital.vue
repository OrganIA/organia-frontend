<template>
  <div>
    <form class="form-control" @submit.prevent="submitForm">
      <div class="form-fields">
        <label class="label">Nom</label>
        <input v-model="data.name" type="text" class="input mb-6" required/>
        <div class="form-input small">
          <label class="label">Ville</label>
          <input v-model="data.city.name" type="text" class="input mb-6" required/>
        </div>
        <div class="form-input small">
          <label class="label">Code de département</label>
          <input v-model="data.city.department_code" type="text" class="input mb-6" required/>
        </div>
      </div>
      <button type="submit" class="button is-info">Enregistrer</button>
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
      console.log(this.id);
      this.$http
          .get(`/hospitals/${this.id}`)
          .then((response) => {
            this.data = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    submitForm() {
      console.log(this.data);
      this.$http
      .delete(`hospitals/${this.id}`)
      .then(() => {
        this.$http
          .post("/hospitals/", {
              city: this.data.city,
              name: this.data.name,
          })
          .then(() => {
            this.$toast.success("Modification de l'hopitale réussi !");
            setTimeout(this.$toast.clear, 3000);
            this.$router.push("/hospitals");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      })
    },
  },
  created() {
    this.getHospital();
  },
};
</script>
