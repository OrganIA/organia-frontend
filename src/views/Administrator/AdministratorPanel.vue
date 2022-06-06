<template>
  <h1>Panel Administrateur</h1>
  <div class="main-container-admin-panel">
    <div class="search-block">
      <select v-model="selectFilter" class="search-filter button mb-4 ml-6 is-info is-light">
        <option value="first_name">Prénom</option>
        <option value="last_name">Nom</option>
        <option value="email">Email</option>
        <option value="created_at">Arrivée</option>
        <option value="updated_at">Dernière modif.</option>
      </select>
      <div class="fa fa-info-circle icon-dropdown-correction"></div>
      <input @input="filter" v-model="filterText" class="search-bar input mr-6" />
      <br />


    </div>
    <table class="table is-bordered is-striped is-narrow is-hoverable is-info">
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
        <tr v-for="user in users" :key="user" v-bind:class="{ 'is-selected': user.id === $data.user.id }">
          <td v-on:click="loadSelectedUser(user.id)" v-bind:class="{ 'selected-element': user.id === $data.user.id }">
            {{ user.id }}
          </td>
          <td v-on:click="loadSelectedUser(user.id)" v-bind:class="{ 'selected-element': user.id === $data.user.id }">
            {{ user.person ? user.person.first_name : "-" }}
          </td>
          <td v-on:click="loadSelectedUser(user.id)" v-bind:class="{ 'selected-element': user.id === $data.user.id }">
            {{ user.person ? user.person.last_name : "-" }}
          </td>
          <td v-on:click="loadSelectedUser(user.id)" v-bind:class="{ 'selected-element': user.id === $data.user.id }">
            {{ user.email }}
          </td>
          <td v-on:click="loadSelectedUser(user.id)" v-bind:class="{ 'selected-element': user.id === $data.user.id }">
            {{ user.created_at }}
          </td>
          <td v-on:click="loadSelectedUser(user.id)" v-bind:class="{ 'selected-element': user.id === $data.user.id }">
            {{ user.updated_at }}
          </td>
          <td v-bind:class="{ 'selected-element': user.id === $data.user.id }">
            <router-link :to="`/administrator/edit/user/${user.id}`" class="button is-primary">
              <i class="fas fa-edit"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="modal" v-bind:class="{ 'is-invisible': (state !== 'clicked'), 'is-active': (state === 'clicked') }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-3">Informations de l'utilisateur</p>
          <button class="delete" aria-label="close" v-on:click="loadSelectedUser(this.user.id)"></button>
        </header>
        <section class="modal-card-body">
          <div class="row mt-4">
            <a :href="'mailto:' + this.user.email" class="button is-info is-light mx-auto role-btn">{{ this.user.email
            }}</a>
            <div class="button is-info is-light mx-auto role-btn">{{ this.role.name }}</div>
          </div>
          <div class="row mt-4">
            <div class="button is-light mx-auto role-btn"
              v-bind:class="{ 'is-primary': this.role.can_manage_users, 'is-danger': !this.role.can_manage_users }">
              Peut gérer les utilisateurs
            </div>
            <div class="button is-light mx-auto role-btn"
              v-bind:class="{ 'is-primary': this.role.can_manage_persons, 'is-danger': !this.role.can_manage_persons }">
              Peut gérer les patients
            </div>
          </div>
          <div class="row mt-4">
            <div class="button is-light mx-auto role-btn"
              v-bind:class="{ 'is-primary': this.role.can_manage_roles, 'is-danger': !this.role.can_manage_roles }">
              Peut gérer les rôles
            </div>
            <div class="button is-light mx-auto role-btn"
              v-bind:class="{ 'is-primary': this.role.can_manage_hospitals, 'is-danger': !this.role.can_manage_hospitals }">
              Peut gérer les hôpitaux
            </div>
          </div>
          <div class="row mt-4">
            <div class="button is-light mx-auto role-btn"
              v-bind:class="{ 'is-primary': this.role.can_invite, 'is-danger': !this.role.can_invite }">
              Peut créer des invitations
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" v-on:click="loadSelectedUser(this.user.id)">Sauvegarder</button>
        </footer>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "administrator-panel",
  emits: ["login"],
  data() {

    return {
      mailLink: "mailto:",
      state: "",
      users: {},
      user: {},
      role: {},
      sortingOrder: true,
      sortingKey: "created_at",
      selectFilter: "email",
      filterText: "",
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
    updateFilter(dataName) {
      if (dataName === this.sortingKey) this.sortingOrder = !this.sortingOrder;
      this.sortingKey = dataName;
    },
    checkNull(a, b) {
      if (
        a.person[this.sortingKey] == null &&
        b.person[this.sortingKey] == null
      )
        return 0;
      if (a.person[this.sortingKey] == null) return 1;
      else if (b.person[this.sortingKey] == null) return -1;
      return 0;
    },
    sortData() {
      if (["first_name", "last_name"].includes(this.sortingKey)) {
        this.users.sort((a, b) => {
          if (a.person[this.sortingKey] == null ||
            b.person[this.sortingKey] == null)
            return this.checkNull(a, b);
          if (this.sortingOrder)
            return a.person[this.sortingKey].localeCompare(
              b.person[this.sortingKey]
            );
          return b.person[this.sortingKey].localeCompare(
            a.person[this.sortingKey]
          );
        });
      } else if (["updated_at", "created_at"].includes(this.sortingKey)) {
        this.users.sort((a, b) => {
          if (a.person[this.sortingKey] == null ||
            b.person[this.sortingKey] == null)
            return this.checkNull(a, b);
          if (this.sortingOrder)
            return Date.parse(a.person[this.sortingKey]) >
              Date.parse(b.person[this.sortingKey])
              ? -1
              : 1;
          return Date.parse(b.person[this.sortingKey]) >
            Date.parse(a.person[this.sortingKey])
            ? -1
            : 1;
        });
      }
    },
    filter() {
      if (this.filterText === "") {
        this.getUsers();
        return;
      }
      if (this.selectFilter in this.receiversBackup[0].person) {
        this.users = this.receiversBackup.filter((el) => {
          if (el.person[this.selectFilter] != null)
            return el.person[this.selectFilter].includes(this.filterText);
        });
      } else {
        this.users = this.receiversBackup.filter((el) => {
          if (el[this.selectFilter] != null)
            return el[this.selectFilter].includes(this.filterText);
        });
      }
    },
    getUserByID() {
      this.$http
        .get(`/users/${this.user.id}`)
        .then((response) => {
          this.user = response.data;
          this.getRoleById(this.user.role_id)
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error(error.message);
          setTimeout(this.$toast.clear, 3000)
        });

    },
    getRoleById(id) {
      this.$http
        .get(`/roles/${id}`)
        .then((response) => {
          this.role = response.data;
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error(error.message);
          setTimeout(this.$toast.clear, 3000)
        });
    },
    loadSelectedUser(userId) {
      if (this.user.id === userId) {
        this.state = ""
        this.user.id = -1
        return;
      }
      this.user.id = userId;
      this.getUserByID(userId)
      this.state = "clicked"

    },
    popUserModal(userId) {
      console.log(userId)
    }
  },
  watch: {
    sortingKey() {
      this.sortData();
    },
    sortingOrder() {
      this.sortData();
    },
    selectFilter() {
    },
  }
};
</script>

<style scoped>
</style>