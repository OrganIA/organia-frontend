<template>
  <h1>Panel Administrateur</h1>
  <h2 class="align-left">Utilisateurs</h2>
  <div class="main-container">
    <table class="table-list half-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Mail</th>
          <th>Date de création</th>
          <th>Dernière modification</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user" @click="loadSelectedUser(user.id)"
          :class="{ 'selected-line': user.id === $data.user.id, 'cypress-user-row': true }" >
          <td :class="{ 'selected-element': user.id === $data.user.id }">{{ user.id }}</td>
          <td :class="{ 'selected-element': user.id === $data.user.id }">{{ user.person ? user.person.first_name :
          "-"
          }}</td>
          <td :class="{ 'selected-element': user.id === $data.user.id }">{{ user.person ? user.person.last_name :
          "-"
          }}</td>
          <td :class="{ 'selected-element': user.id === $data.user.id }">{{ user.email }}</td>
          <td :class="{ 'selected-element': user.id === $data.user.id }">{{ user.created_at }}</td>
          <td :class="{ 'selected-element': user.id === $data.user.id }">{{ user.updated_at }}</td>
          <td :class="{ 'selected-element': user.id === $data.user.id } + ' cypress-user-edit'">
            <router-link :to="`/administrator/edit/user/${user.id}`">
              <i class="fas fa-edit"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="separator"></div>
    <div>
      <div>
        <form class="form-editor" style="width: 150%">
          <div>
            <input v-model="user.email" type="email" class="form-control">
          </div>
          <input v-model="user.created_at" type="date" class="form-control">
          <button type="submit" class="btn btn-primary">Modifier</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-panel",
  data() {
    return {
      users: {},
      user: {},
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$http
        .get("/users", {
          headers: { Authorization: `Bearer ${this.$cookies.get("token")}` },
        })
        .then((response) => {
          response.data.forEach((element) => {
            element.created_at = new Date(element.created_at).toDateString();
          });
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUserByID() {
      this.$http
        .get(`/users/${this.user.id}`)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.log(error)
        });
    },
    loadSelectedUser(userId) {
      this.user.id = userId;
      this.getUserByID(userId)
    },
  },
};
</script>

<style scoped>
.form-editor {
  display: flex;
  flex-direction: column;
}

.half-table {
  max-width: 50%;
}
</style>