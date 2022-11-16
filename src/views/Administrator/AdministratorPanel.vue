<template>
  <div class="app-navbar-container">
    <ApplicationNavbar></ApplicationNavbar>
  </div>
  <div class="columns">
    <div class="column sidebar-column">
      <SideBar></SideBar>
    </div>
    <div class="column page-container">
      <div class="page-content">
        <div class="search-block">
          <select v-model="selectFilter" class="search-filter button mb-4 ml-6 is-info is-light">
            <option value="first_name">Prénom</option>
            <option value="last_name">Nom</option>
            <option value="email">Email</option>
            <option value="created_at">Arrivée</option>
            <option value="updated_at">Dernière modif.</option>
          </select>
          <div class="fa  fa-solid fa-angle-down  icon-dropdown-correction"></div>
          <input @input="filter" v-model="filterText" class="search-bar input mr-6" />
          <br />
        </div>
        <table class="is-organia-table">
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
            <tr v-for="user in users" :key="user" :class="{ 'is-selected': user.id === $data.user.id, 'cypress-user-row': true }">
              <td v-on:click="loadSelectedUser(user.id)"
                :class="{ 'selected-element': user.id === $data.user.id }">
                {{ user.id }}
              </td>
              <td v-on:click="loadSelectedUser(user.id)"
                :class="{ 'selected-element': user.id === $data.user.id }">
                {{ user.person ? user.person.first_name : "-" }}
              </td>
              <td v-on:click="loadSelectedUser(user.id)"
                :class="{ 'selected-element': user.id === $data.user.id }">
                {{ user.person ? user.person.last_name : "-" }}
              </td>
              <td v-on:click="loadSelectedUser(user.id)"
                :class="{ 'selected-element': user.id === $data.user.id }">
                {{ user.email }}
              </td>
              <td v-on:click="loadSelectedUser(user.id)"
                :class="{ 'selected-element': user.id === $data.user.id }">
                {{ user.created_at }}
              </td>
              <td v-on:click="loadSelectedUser(user.id)"
                :class="{ 'selected-element': user.id === $data.user.id }">
                {{ user.updated_at }}
              </td>
              <td :class="{ 'selected-element': user.id === $data.user.id }">
                <div v-on:click="loadUserToModify(user.id)" class="button is-primary">
                  <i class="fas fa-edit cypress-user-edit"></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="modal" :class="{ 'is-invisible': (state !== 'clicked'), 'is-active': (state === 'clicked') }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Informations de l'utilisateur</p>
              <button class="delete" aria-label="close" v-on:click="loadSelectedUser(this.user.id)"></button>
            </header>
            <section class="modal-card-body organia-modal-body">
              <div class="row mt-4">
                <a :href="'mailto:' + this.user.email" class="button is-info is-light mx-auto role-btn">{{
                this.user.email
                }}</a>
                <div class="button is-info is-light mx-auto role-btn">{{ this.role.name }}</div>
              </div>
              <div class="row mt-4">
                <div class="button is-light mx-auto role-btn"
                  :class="{ 'is-primary': this.role.can_manage_users, 'is-danger': !this.role.can_manage_users }">
                  Peut gérer les utilisateurs
                </div>
                <div class="button is-light mx-auto role-btn"
                  :class="{ 'is-primary': this.role.can_manage_persons, 'is-danger': !this.role.can_manage_persons }">
                  Peut gérer les patients
                </div>
              </div>
              <div class="row mt-4">
                <div class="button is-light mx-auto role-btn"
                  :class="{ 'is-primary': this.role.can_manage_roles, 'is-danger': !this.role.can_manage_roles }">
                  Peut gérer les rôles
                </div>
                <div class="button is-light mx-auto role-btn"
                  :class="{ 'is-primary': this.role.can_manage_hospitals, 'is-danger': !this.role.can_manage_hospitals }">
                  Peut gérer les hôpitaux
                </div>
              </div>
              <div class="row mt-4">
                <div class="button is-light mx-auto role-btn"
                  :class="{ 'is-primary': this.role.can_invite, 'is-danger': !this.role.can_invite }">
                  Peut créer des invitations
                </div>
              </div>
            </section>
            <footer class="modal-card-foot organia-modal-footer">
              <button class="button modal-admin-btn" v-on:click="loadSelectedUser(this.user.id)">Fermer</button>
            </footer>
          </div>
        </div>
        <div class="modal"
          :class="{ 'is-invisible': (state2 !== 'clicked'), 'is-active': (state2 === 'clicked') }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Modifier l'utilisateur</p>
              <button class="delete" aria-label="close" v-on:click="openModifyUserModal(false)"></button>
            </header>
            <section class="modal-card-body organia-modal-body">
              <div>
                <form class="form-control modal-form">
                  <div class="form-fields-modal">
                    <label class="label">Mail</label>
                    <input v-model="toModifyUser.email" type="email" class="input mb-6" required />
                    <label class="label">Rôle</label>
                    <select v-model="selected_role" class="button mb-4 ml-6 is-info is-light role-selector cypress-role-selector">
                      <option v-for="role in roles" :value="role.id" :key="role.id">
                        {{ role.name }}
                      </option>
                    </select>
                  </div>
                </form>
              </div>
            </section>
            <footer class="modal-card-foot organia-modal-footer">
              <button type="submit" class="cypress-submit button modal-admin-btn modal-add-role-btn"
                v-on:click="submitForm()">Enregistrer</button>
              <button class="button modal-admin-btn" v-on:click="openModifyUserModal(false)">Fermer</button>
            </footer>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import ApplicationNavbar from "@/components/ApplicationNavbar";

export default {
  name: "administrator-panel",
  components: { SideBar, ApplicationNavbar },

  emits: ["login"],
  data() {

    return {
      mailLink: "mailto:",
      state: "",
      state2: "",
      users: {},
      user: {},
      role: {},
      toModifyUser: {},
      modId: -1,
      roles: [],
      selected_role: null,
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
    },
    openModifyUserModal(val) {
      if (val === true) {
        this.state2 = "clicked"
        return;
      }
      this.state2 = ""


    },
    getSpecificUserByID() {
      this.$http
        .get(`/users/${this.modId}`)
        .then((response) => {
          this.toModifyUser = response.data;
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
      console.log(this.toModifyUser.email)
      this.$http
        .post(`/users/${this.modId}`, {
          email: this.toModifyUser.email,
          role_id: this.selected_role,
        })
        .then(() => {
          this.$router.push("/administrator");
          this.state2 = ""
          this.getUsers();

        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadUserToModify(userId) {
      this.modId = userId;
      console.log(userId)
      this.getRoles()
      this.getSpecificUserByID();
      this.state2 = "clicked"
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
.app-navbar-container {
  height: 14vh;
  max-width: 100%;
  margin-bottom: 20px;
}

.icon-dropdown-correction {
  position: relative;
  margin-top: 12px;
  margin-left: -45px;
  margin-right: 40px;
}


.page-container {
  margin-left: 50px;
  padding: 12px 0 0 0;
}

.role-btn {
  width: 15vw;
}


.modal-form {
  background-color: #caddef;
  width: 100%;
}

.role-selector {
  width: 40%;
  float: left;
}

.form-fields-modal {
  display: flex;
  flex-flow: wrap row;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>