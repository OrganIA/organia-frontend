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
        <div class="role-panel-btn-container">
          <div v-on:click="openNewRoleModal(true)" class="create-new-role button is-primary">
            <i class="cypress-to-add fas fa-edit mr-2 pb-1"></i>
            <span>Créer un nouveau rôle</span>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Rôle</th>
              <th>Gestion des Utilisateurs</th>
              <th>Gestion des Personnes</th>
              <th>Gestion des Rôles</th>
              <th>Gestion des Hopitaux</th>
              <th>Gestion des Invitations</th>
            </tr>
          </thead>
          <tbody>
            <tr class="cypress-roles-row" v-for="role in roles" :key="role">
              <td>{{ role.name }}</td>
              <td>
                <input class="center-checkbox cypress-manage-users" v-model="role.can_manage_users" true=true false=false type="checkbox">
              </td>
              <td>
                <input class="center-checkbox cypress-manage-persons" v-model="role.can_manage_persons" true=true false=false type="checkbox">
              </td>
              <td>
                <input class="center-checkbox cypress-manage-roles" v-model="role.can_manage_roles" true=true false=false type="checkbox">
              </td>
              <td>
                <input class="center-checkbox cypress-manage-hospitals" v-model="role.can_manage_hospitals" true=true false=false
                  type="checkbox">
              </td>
              <td>
                <input class="center-checkbox cypress-manage-invite" v-model="role.can_invite" true=true false=false type="checkbox">
              </td>
            </tr>
          </tbody>
        </table>
        <div class="role-panel-btn-container">
          <button class="cypress-update button is-info save-roles" @click="updateRoles()" type="submit"> Confirmer</button>
        </div>
        <div class="modal" :class="{ 'is-invisible': (state !== 'clicked'), 'is-active': (state === 'clicked') }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head organia-modal-head">
              <p class="modal-card-title  has-text-white">Créer un nouveau rôle</p>
              <button class="delete" aria-label="close" v-on:click="openNewRoleModal(false)"></button>
            </header>
            <section class="modal-card-body organia-modal-body">
              <form @submit.prevent="createRoles()" class="show-requireds">
                <h2 class="form-title title is-3">Ajouter un rôle</h2>
                <div class="form-fields">
                  <div class="form-input small required">
                    <label class="label">Nom du rôle</label>
                    <input v-model="name" placeholder="Nom du rôle" type="text" class="cypress-name input is-info"
                      required />
                  </div>
                  <div class="form-input small required">
                    <label class="label">Droit de modifier les informations des utilisateurs</label>
                    <select v-model="manage_users" name="manage_users" id="manage_users-select" class="cypress-users
            button is-info is-light" required>
                      <option value="true">Oui</option>
                      <option value="false">Non</option>
                    </select>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Droit de modifier les informations des patients</label>
                    <select v-model="manage_persons" name="manage_persons" id="manage_persons-select" class="cypress-persons
            button is-info is-light" required>
                      <option value="true">Oui</option>
                      <option value="false">Non</option>
                    </select>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Droit de modifier les rôles</label>
                    <select v-model="manage_roles" name="manage_roles" id="manage_roles-select" class="cypress-roles
            button is-info is-light" required>
                      <option value="true">Oui</option>
                      <option value="false">Non</option>
                    </select>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Droit de modifier les informations des hôpitaux</label>
                    <select v-model="manage_hospitals" name="manage_hospitals" id="manage_hospitals-select" class="cypress-hospitals
            button is-info is-light" required>
                      <option value="true">Oui</option>
                      <option value="false">Non</option>
                    </select>
                  </div>
                  <div class="form-input small required">
                    <label class="label">Droit d'inviter d'autres utilisateurs</label>
                    <select v-model="manage_invitation" name="manage_invitation" id="manage_invitation-select" class="cypress-invitation
            button is-info is-light" required>
                      <option value="true">Oui</option>
                      <option value="false">Non</option>
                    </select>
                  </div>

                </div>
              </form>
            </section>
            <footer class="modal-card-foot organia-modal-footer">
              <button type="submit" class="cypress-add button modal-admin-btn modal-add-role-btn"
                v-on:click="createRoles()">Ajouter</button>
              <button class="button modal-admin-btn" v-on:click="openNewRoleModal(false)">Fermer</button>
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
  name: "role-panel",
  emits: ["login"],
  components: { SideBar, ApplicationNavbar },

  data() {
    return {
      backup: {},
      roles: {},
      role: {},
      state: "",
      name: "",
      manage_users: "",
      manage_persons: "",
      manage_roles: "",
      manage_hospitals: "",
      manage_invitation: "",
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    getRoles() {
      this.$http
        .get(`/roles`)
        .then((response) => {
          this.backup = response.data;
          this.roles = response.data.map(role => Object.assign({}, role));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeRole(r) {
      this.$http
        .post(`/roles/${r.id}`, {
          can_manage_users: r.can_manage_users,
          can_manage_persons: r.can_manage_persons,
          can_manage_roles: r.can_manage_roles,
          can_manage_hospitals: r.can_manage_hospitals,
          can_invite: r.can_invite,
        })
        .then(() => {
          this.$toast.success("Reception du rôle: " + r.name + " reussite !");
          setTimeout(this.$toast.clear, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateRoles() {
      for (let i in this.roles) {
        if (JSON.stringify(this.roles[i]) === JSON.stringify(this.backup[i])) {
          continue;
        } else {
          this.changeRole(this.roles[i]);
        }
        i++;
      }
    },
    createRoles() {
      this.$http
        .post("/roles", {
          name: this.name,
          can_manage_users: this.manage_users,
          can_manage_persons: this.manage_persons,
          can_manage_roles: this.manage_roles,
          can_manage_hospitals: this.manage_hospitals,
          can_invite: this.manage_invitation,
        })
        .then(() => {
          this.$toast.success("Création du rôle réussie !");
          setTimeout(this.$toast.clear, 3000);
          this.reloadRoles()
        })
        .catch((error) => {
          this.$toast.error(
            "Erreur : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    openNewRoleModal(val) {
      if (val === true) {
        this.state = "clicked"
        return;
      }
    },
    reloadRoles() {
      this.state = ""
      this.getRoles()
    }
  },
};
</script>

<style scoped>
.center-checkbox {
  transform: translate(500%, 0px);
}

.role-panel-btn-container {
  padding: 25px 0 25px 25px;

  width: 100%;
  position: relative;
  display: block;
  flex-direction: row;
}

.create-new-role {
  float: right;
  width: 200px;
  height: 50px;
  background-color: #6799c4;
  margin-bottom: 25px;
}

.create-new-role:hover {
  background-color: #2d6594;
  outline: none;
  text-decoration: none;

}

.save-roles:hover {
  background-color: #2d6594;
  outline: none;
  text-decoration: none;

}

.save-roles {
  float: right;
  width: 10%;
  height: 50px;
  background-color: #6799c4;

}

table {
  width: 100%;
}

thead tr {
  width: 100% !important;
}

tr {
  width: 100%
}


.page-content {
  max-width: 96%;
  margin-left: 10px;

}
</style>