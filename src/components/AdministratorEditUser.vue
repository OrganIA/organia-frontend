<template>
  <div>
    <router-link class="btn back-button" to="/administrator">Back</router-link>
    <form class="form-editor">
      <div>
        <input v-model="user.email" type="email" class="form-control">
      </div>
      <div class="horizontal-form-group">
        <input v-model="user.created_at" type="date" class="form-control">
        <input v-model="user.updated_at" type="date" class="form-control">

      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import http from "../http";

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
      http
          .get(`/users/${this.id}`)
          .then((response) => {
            this.user = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    submitForm() {
      http
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
    console.log(this.id)
  },
}
</script>
