<template>
  <div>
    <form @submit.prevent="submitForm()" class="form-control">
      <div class="form-fields">
        <label class="label">Mail</label>
        <input v-model="user.email" type="email" class="input mb-6" required />
        <label class="label">Rôle</label>
        <select v-model="selected_role">
          <option v-for="role in roles" :value="role.id" :key="role.id">
            {{ role.name }}
          </option>
        </select>
        <button type="submit" class="button is-info">Enregistrer</button>
      </div>
      <router-link class="button is-danger ml-6" to="/administrator">Retour</router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: "administrator-edit-user",
  props: {
    id: String,
  },
  data() {
    return {
      user: {},
      roles: [],
      selected_role: null,
    };
  },
  methods: {
    getUserByID() {
      this.$http
        .get(`/users/${this.id}`)
        .then((response) => {
          this.user = response.data;
          this.selected_role = response.data.role_id;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRoles() {
      this.$http
        .get("/roles")
        .then((response) => {
          this.roles = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm() {
      this.$http
        .post(`/users/${this.id}`, {
          email: this.user.email,
          role_id: this.selected_role,
        })
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
    this.getRoles();
  },
};
</script>
