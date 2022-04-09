<template>
  <div class="content align-left ml-6 pl-1">
    <div class="tutorial-text-content has-text-justified ">
      <h1 class="title is-1">Créer une invitation</h1>
      <br><br>
      <div class="is-size-5 has-text-justified">
        <strong>IMPORTANT :</strong> si vous êtes un professionnel de santé postulant à l'administration d'ORGANIA
        et
        que vous ne possédez pas encore les droits d'administrateur (nécessaires pour l'envoi d'invitation
        notamment), envoyez
        nous une demande par mail (voir <a v-on:click="isActive = 'askRights'">Demander des droits
        supplémentaires</a>

      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: "Invitations"
}
</script>

<style scoped>

</style>