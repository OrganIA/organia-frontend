<template>
  <div>
    <form class="form-control">
      <div class="form-fields">
        <label class="label">Mail</label>
        <input v-model="user.email" type="email" class="input mb-6" required/>
        <div class="form-input small">
          <label class="label">Prénom</label>
          <input type="text" class="input mb-6"/>
        </div>
        <div class="form-input small">
          <label class="label">Nom</label>
          <input type="text" class="input mb-6"/>
        </div>
      </div>
      <button type="submit" class="button is-info">Enregistrer</button>
      <router-link class="button is-danger ml-6" to="/administrator">Retour</router-link>

    </form>

  </div>
</template>

<script>

export default {
  name: "AdministratorEditUser",
  props: {
    id: String,
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    getUserByID() {
      this.$http
          .get(`/users/${this.id}`)
          .then((response) => {
            this.user = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    submitForm() {
      this.$http
          .post({})
          .then(() => {
            this.$router.push("/administrator");
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
  created() {
    this.getUserByID();
  },
};
</script>
