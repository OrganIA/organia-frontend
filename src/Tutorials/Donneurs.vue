<template>
  <div class="content align-left ml-6 pl-1">
    <div class="tutorial-text-content has-text-justified ">
      <h1 class="title is-1">Gestion des Donneurs</h1>
      <br><br>
      <div class="is-size-5 has-text-justified">
        <div class="summary-box has-text-left">
          <ol>
            <li class="summary-item"><a href="#userlist">Interface de gestion des donneurs</a></li>
            <li class="summary-item"><a href="#modifuser">Ajouter un donneur</a></li>
            <li class="summary-item"><a href="#visualizeuser">Modifier un donneur</a></li>
            <li class="summary-item"><a href="#visualizeuser">Voir les informations d'un donneur</a></li>
          </ol>
        </div>
      </div>
      <br><br>
      <div class="is-size-5 has-text-justified">
        La gestion des donneurs a été simplifiée au possible afin de rendre le processus de correspondance le plus
        clair possible.
        <br>
        <br>
        Pour d'accéder à la liste des donneurs il vous faudra d'abord vous connecter via le portail de connexion
        (voir la partie <a v-on:click="updateValue('askRights')">Demander des droits supplémentaires</a>),
        étape obligatoire avant d'accéder aux informations
        de la plateforme.
        <br>
        <br>
        Un fois rendu sur la page principale de l'application il vous suffit de cliquer sur le bouton "donneurs" se
        trouvant en première position de la barre latérale (entouré ci-dessous en rouge)
        <br>
        <br>
        <div class="has-text-centered">
          <img
              src="https://media.discordapp.net/attachments/885854807120810045/942998806448967700/unknown.png?width=302&height=700"
              alt="" class="bordered-image">
        </div>
        <br>
        <br>
        Vous devriez avoir une interface comme celle-ci :
        <br>
        <br>
        <div class="has-text-centered">
          <img
              src="https://media.discordapp.net/attachments/959068123187773570/972369194760962079/unknown.png?width=1150&height=551"
              alt="" class="bordered-image">
        </div>
      </div>
      <br>      <div class="is-size-5">

    (Dans cet exemple la liste des donneurs est vide)
    </div>
      <br>
      <br>
      <h2 class="title is-3">Ajouter un donneur</h2>
      <div class="is-size-5">

      Lorsque que vous cliquez sur le bouton d'ajout une nouvelle page devrait apparaître afin de vous laisser
      remplir certains champs d'informations tels que montré ci dessous, en cas de comportement non documenté dans
      cette aide veuillez<a v-on:click="updateValue('suppport')"> contacter le support</a>
      <br>
      <br>
      </div>

      <div class="has-text-centered">
        <img
            src="https://media.discordapp.net/attachments/959068123187773570/972371995998158867/unknown.png?width=372&height=551"
            alt="" class="bordered-image">
      </div>
      <br>
      <br>
      <div class="is-size-5">
        <strong> Veuillez bien vérifier chacune des informations que vous intégrez dans la base de données, de
          mauvais
          formats ou
          des champs invalides réduiront l'efficacité de l'outil et engendrer des problèmes techniques pouvant
          mettre
          en jeu
          la vie de certains patients</strong>
      <br>
      <br>
      Une fois toutes les informations renseignées, il suffira de cliquer sur le bouton "Ajouter" pour intégrer le
      patient
      à notre base de données comme dans l'exemple ci dessous :
      </div>

      <br>
      <br>
      <div class="has-text-centered">
        <img
            src="https://media.discordapp.net/attachments/959068123187773570/972371228922871808/unknown.png?width=404&height=551"
            alt="" class="bordered-image">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Donneurs",
  methods: {
    updateValue: function (activePanel) {
      this.$emit('changePanel', activePanel);
    }
  },
}
</script>

<style scoped>

</style>