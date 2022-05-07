<template>
  <div class="content align-left ml-6 pl-1">
    <div class="tutorial-text-content has-text-justified ">
      <h1 class="title is-1">Gestions des journaux</h1>
      <br><br>
      <div class="is-size-5 has-text-justified">
        Afin de garder une traçabilité des actions des différents utilisateurs (et potentiellement remonter au point
        où un problème a été détecté et pour pour pouvoir en identifier la cause) la plateforme OrganIA s'est doté d'un
        système de journaux contenant les actions basiques de chaque utilisateur.
        <br>
        <br>
        Vous pouvez accéder aux journaux (aussi appelé logs) via la barre de contrôle latérale de notre application en cliquant
        sur le bouton "Historique d'actions".
        Si vous ne voyez pas ce bouton où si vous n'avez tout simplement pas accès à ce panel, consultez la rubrique
        <a v-on:click="updateValue('askRights')">Demander des droits supplémentaires</a>
        <br>
        <br>
        Les journeaux se présentent comme ceci :
        <br>
        <br>
        <div class="has-text-centered">
          <img
              src="https://media.discordapp.net/attachments/959068123187773570/971713799327453224/unknown.png?width=1256&height=490"
              alt="" class="bordered-image">
        </div>
        <br>
        <br>
        Chaque action commence par la date et l'heure où l'action a été réalisée, puis l'action en elle même (create,
        edit, delete...) suivie par le domaine de ce qui a été altéré (ici un évènement de calendrier), l'id de cet élément
        afin de potentiellement pouvoir le retrouver dans la base de données et enfin l'utilisateur ayant performé
        l'action (ici un . car l'utilisateur qui visualise les journeaux est le même que celui qui a performé les actions
        de création.
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "GestionLogs",
  methods: {
    updateValue: function (activePanel) {
      this.$emit('changePanel', activePanel);
    }
  },
}
</script>

<style scoped>

</style>