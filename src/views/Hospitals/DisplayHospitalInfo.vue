<template>
  <div>
    <div style="border: 1px solid;border-radius: 30px;">
      <label class="label">Nom</label>
      <label class="label"> {{ data.name }} </label>
      <br>
      <div>
        <label class="label">Ville</label>
        <label class="label"> {{ data.city.name }} </label>
      </div>
      <br>
      <div>
        <label class="label">Code de département</label>
        <label class="label"> {{ data.city.department_code }} </label>
      </div>
    </div>
    <br>
    <router-link class="button is-danger" to="/hospitals">Retour</router-link>
  </div>
</template>

<script>
export default {
  name: "display-hospitals-info",
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
  },
  created() {
    this.getHospital();
  },
};
</script>