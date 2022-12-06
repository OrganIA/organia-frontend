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
          </select>
          <div class="fa  fa-solid fa-angle-down  icon-dropdown-correction"></div>
          <input @input="filter" v-model="filterText" class="search-bar input mr-6" />
          <select v-model="nb_by_page" @change="updateNbElements"
              class="number-selector button mb-4 ml-6 is-info is-light">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
        </div>
        <table class="is-organia-table">
          <thead>
            <tr>
              <th class="id-cell-header">Id</th>
              <th class="name-cell-header">Prénom</th>
              <th>Nom</th>
              <th class="mail-cell-header">Mail</th>
              <th>Date de création</th>
              <th>Dernière modification</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user" :class="{ 'is-selected': user.id === $data.user.id, 'cypress-user-row': true }">
              <td @click="loadSelectedUser(user.id)"
                :class="{ 'selected-element': user.id === $data.user.id }">
                {{ user.id }}
              </td>
              <td @click="loadSelectedUser(user.id)" :class="{ 'selected-element': user.id === $data.user.id }">
                {{ user.firstname }}
              </td>
              <td @click="loadSelectedUser(user.id)" :class="{ 'selected-element': user.id === $data.user.id }">
                {{ user.lastname }}
              </td>
              <td @click="loadSelectedUser(user.id)" :class="{ 'selected-element': user.id === $data.user.id }">
                {{ user.email }}
              </td>
              <td @click="loadSelectedUser(user.id)" :class="{ 'selected-element': user.id === $data.user.id }">
                {{ user.created_at }}
              </td>
              <td @click="loadSelectedUser(user.id)" :class="{ 'selected-element': user.id === $data.user.id }">
                {{ user.updated_at }}
              </td>
              <td :class="{ 'selected-element': user.id === $data.user.id }">
                <div @click="loadUserToModify(user.id)" class="button is-primary">
                  <i class="fas fa-edit cypress-user-edit"></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <nav class="pagination is-rounded is-centered pages" role="navigation" aria-label="pagination">
          <a class="pagination-previous" @click="previousPage()">Précédent</a>
          <ul class="pagination-list">
            <li><a class="pagination-link is-current" :aria-label="'Page ' + ($data.page + 1)" aria-current="page">{{
                $data.page + 1
            }}</a></li>
          </ul>
          <a class="pagination-next" @click="nextPage()">Suivant</a>
        </nav>
        <div class="modal" :class="{ 'is-invisible': (state !== 'clicked'), 'is-active': (state === 'clicked') }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Informations de l'utilisateur</p>
              <button class="delete" aria-label="close" @click="loadSelectedUser(this.user.id)"></button>
            </header>
            <section class="modal-card-body organia-modal-body">
              <div class="row mt-4">
                <a :href="'mailto:' + this.user.email" class="button is-info is-light mx-auto role-btn">{{
                    this.user.email
                }}</a>
                <div class="button is-info is-light mx-auto role-btn">{{ this.user.role.name }}</div>
              </div>
              <div class="row mt-4">
                <div class="button is-light mx-auto role-btn"
                  :class="{ 'is-primary': this.user.role.can_edit_users, 'is-danger': !this.user.role.can_edit_users }">
                  Peut gérer les utilisateurs
                </div>
                <div class="button is-light mx-auto role-btn"
                  :class="{ 'is-primary': this.user.role.can_edit_persons, 'is-danger': !this.user.role.can_edit_persons }">
                  Peut gérer les patients
                </div>
              </div>
              <div class="row mt-4">
                <div class="button is-light mx-auto role-btn"
                  :class="{ 'is-primary': this.user.role.can_edit_roles, 'is-danger': !this.user.role.can_edit_roles }">
                  Peut gérer les rôles
                </div>
                <div class="button is-light mx-auto role-btn"
                  :class="{ 'is-primary': this.user.role.can_edit_hospitals, 'is-danger': !this.user.role.can_edit_hospitals }">
                  Peut gérer les hôpitaux
                </div>
              </div>
              <div class="row mt-4">
                <div class="button is-light mx-auto role-btn"
                  :class="{ 'is-primary': this.user.role.can_edit_listings, 'is-danger': !this.user.role.can_edit_listings }">
                  Peut gérer les listings
                </div>
              </div>
            </section>
            <footer class="modal-card-foot organia-modal-footer">
              <button class="button modal-admin-btn" @click="loadSelectedUser(this.user.id)">Fermer</button>
            </footer>
          </div>
        </div>
        <div class="modal" :class="{ 'is-invisible': (state2 !== 'clicked'), 'is-active': (state2 === 'clicked') }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Modifier l'utilisateur</p>
              <button class="delete" aria-label="close" @click="openModifyUserModal(false)"></button>
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
                @click="submitForm()">Enregistrer</button>
              <button class="button modal-admin-btn" @click="openModifyUserModal(false)">Fermer</button>
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
import translate from "@/translate"

export default {
  name: "administrator-panel",
  components: { SideBar, ApplicationNavbar },

  data() {

    return {
      mailLink: "mailto:",
      state: "",
      state2: "",
      users: {},
      usersBackup: [],
      user: {
        role: {},
      },
      toModifyUser: {},
      modId: -1,
      roles: [],
      selected_role: null,
      sortingOrder: true,
      sortingKey: "created_at",
      selectFilter: "email",
      filterText: "",
      page: 0,
      nb_by_page: 5,
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    updateNbElements() {
      this.page = 0;
      this.updatePage()
    },
    updatePage() {
      this.users = this.usersBackup.slice(this.page * this.nb_by_page, this.page * this.nb_by_page + this.nb_by_page);
    },
    getUsers() {
      this.$http
        .get("/users/")
        .then((response) => {
          response.data.forEach((element) => {
            element.created_at = new Date(element.created_at).toDateString();
          });
          this.users = response.data;
          this.usersBackup = response.data
          this.updatePage()
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + translate[error.response.data.msg]
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    nextPage() {
      if (Math.ceil(this.usersBackup.length / this.nb_by_page) > (this.page + 1)) {
        this.page += 1;
        this.updatePage()
      }
    },
    previousPage() {
      if (this.page >= 1) {
        this.page -= 1;
        this.updatePage()      }
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
      this.users = this.usersBackup.filter((el) => {
        if (el[this.selectFilter] != null)
          return el[this.selectFilter].includes(this.filterText);
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
          this.$toast.error(
            "Erreur lors de la connexion : " + translate[error.response.data.msg]
          );
          setTimeout(this.$toast.clear, 3000);
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
        this.selected_role = this.toModifyUser.role
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
          this.$toast.error(
            "Erreur lors de la connexion : " + translate[error.response.data.msg]
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    getRoles() {
      this.$http
        .get("/roles/")
        .then((response) => {
          this.roles = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + translate[error.response.data.msg]
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    submitForm() {
      this.$http
        .post(`/users/${this.modId}`, {
          email: this.toModifyUser.email,
          role_id: this.selected_role.id,
        })
        .then(() => {
          this.$router.push("/administrator");
          this.state2 = ""
          this.getUsers();

        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.msg.includes("is already taken")) {
            error.response.data.msg = error.response.data.msg.replace("is already taken", "est déjà utilisé")
            this.$toast.error(
              "Erreur lors de la connexion : " + error.response.data.msg
            );
          } else {
            this.$toast.error(
              "Erreur lors de la connexion : " + translate[error.response.data.msg]
            );
          }
          setTimeout(this.$toast.clear, 3000);
        });
    },
    loadUserToModify(userId) {
      this.modId = userId;
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

.pages {
  margin-top: 20px;
}

.id-cell-header {
  width: 5%;
}

.name-cell-header {
  width: 10%;
}

.mail-cell-header {
  width: 25%;
}

.page-content {
  margin: 40px;
}
</style>