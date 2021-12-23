<template>
  <h1>Panel Administrateur</h1>
  <h2 class="align-left">Gestion des Rôles</h2>
  <div class="main-container">
    <table class="table-list">
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
      <tr v-for="role in roles" :key="role">
        <td>{{ role.name }}</td>
        <td>
          <input class="center-checkbox" v-model="role.can_manage_users" true=true false=false type="checkbox">
        </td>
        <td>
          <input class="center-checkbox" v-model="role.can_manage_persons" true=true false=false type="checkbox">
        </td>
        <td>
          <input class="center-checkbox" v-model="role.can_manage_roles" true=true false=false type="checkbox">
        </td>
        <td>
          <input class="center-checkbox" v-model="role.can_manage_hospitals" true=true false=false type="checkbox">
        </td>
        <td>
          <input class="center-checkbox" v-model="role.can_invite" true=true false=false type="checkbox">
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <input @click="updateRoles()" type="submit">
</template>

<script>
export default {
  name: "RolePanel",
  data() {
    return {
      backup: {},
      roles: {},
      role: {},
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
          this.$toast.success("Reception des rôles reussie !");
          setTimeout(this.$toast.clear, 3000);
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur de la reception des rôles : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
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
          this.$toast.error(
            "Erreur de la modification du rôle : " + r.name
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    updateRoles() {
      for(let i in this.roles) {
        if (JSON.stringify(this.roles[i]) === JSON.stringify(this.backup[i])) {
          continue;
        }
        else {
          this.changeRole(this.roles[i]);
        }
        i++;
      }
    }
  },
};
</script>

<style scoped>
</style>