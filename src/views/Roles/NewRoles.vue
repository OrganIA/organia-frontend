<template>
  <div>
    <form @submit.prevent="createRoles()" class="show-requireds">
      <h2 class="form-title title is-3">Ajouter un rôle</h2>
      <div class="form-fields">
        <div class="form-input small required">
          <label class="label">Nom du rôle</label>
          <input v-model="name" placeholder="Nom du rôle" type="text" class="cypress-name input is-info" required />
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
        <div class="form-submit is-center">
          <button type="submit" class="cypress-add button is-info mx-auto mr-6">Ajouter</button>
          <router-link to="/administrator/role" class="button is-danger ml-6">Retour</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "new-roles",
  data() {
    return {
      name: "",
      manage_users: "",
      manage_persons: "",
      manage_roles: "",
      manage_hospitals: "",
      manage_invitation: "",
    };
  },
  created() {
  },
  methods: {
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
          this.$router.push("/administrator/role");
        })
        .catch((error) => {
          console.log(error)
        });
    },
  },
};
</script>
