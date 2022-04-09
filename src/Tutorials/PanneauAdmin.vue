<template>
  <div class="content align-left ml-6 pl-1" >
    <div class="tutorial-text-content has-text-justified ">
      <h1 class="title is-1">L'interface de messagerie</h1>
      <br><br>
      <div class="is-size-5 has-text-justified">
        <div class="summary-box has-text-left">
          <ol>
            <li class="summary-item"><a href="#userlist">Liste des utilisateurs</a></li>
            <li class="summary-item"><a href="#userfilter">Filtrer les utilisateurs</a></li>
            <li class="summary-item"><a href="#modifuser">Modification d'un utilisateur</a></li>
            <li class="summary-item"><a href="#visualizeuser">Visualisation avancée</a></li>
          </ol>
        </div>
      </div>
      <br>
      <br>
      <div class="is-size-5 has-text-justified">
        Cette partie du tutoriel s'addresse aux personnes ayant les droits d'administrateurs sur la plateforme OrganIA.
        Afin de pouvoir visualiser et gérer les utilisateurs de la plateforme, ce prérequis est obligatoire, si vous êtes un
        administrateur mais que vous ne possédez pas les droits sur l'application, consultez  <a v-on:click="updateValue('askRights')">Demander des droits
        supplémentaires</a>
      </div>
      <br>
      <br>
      <div class="title is-size-2 has-text-left" id="userlist">Liste des utilisateurs</div>

    </div>
  </div>

</template>

<script>
export default {
  name: "PanneauAdmin",
  methods: {
    updateValue: function (activePanel) {
      this.$emit('changePanel', activePanel);
    }
  },
}
</script>

<style scoped>

</style>