<template>
  <div>
    <router-link class="btn back-button" to="/administrator">Back</router-link>
    <form class="form-editor">
      <div>
        <input v-model="user.email" type="email" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
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
