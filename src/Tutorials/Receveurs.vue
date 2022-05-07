<template>
  <div class="content align-left ml-6 pl-1">
    <div class="tutorial-text-content has-text-justified ">
      <h1 class="title is-1">Gestion des receveurs</h1>
      <br><br>
      <div class="is-size-5 has-text-justified">
        <div class="summary-box has-text-left">
          <ol>
            <li class="summary-item"><a href="#receiverinterface">Interface de gestion des receveurs</a></li>
            <li class="summary-item"><a href="#addreceiver">Ajouter un receveur</a></li>
            <li class="summary-item"><a href="#visualizeuser">Modifier un receveur</a></li>
            <li class="summary-item"><a href="#visualizeuser">Voir les informations d'un receveur</a></li>
          </ol>
        </div>
      </div>
      <br>
      <br>
      <div class="is-size-5 has-text-justified">
        La gestion des receveurs a été simplifiée au possible afin de rendre le processus de correspondance le plus
        clair possible.
        <br>
        <br>
        Pour d'accéder à la liste des receveurs il vous faudra d'abord vous connecter via le portail de connexion
        (voir la partie <a
          v-on:click="updateValue('connexion')">Se connecter</a>), étape obligatoire avant d'accéder aux informations
        de la plateforme.
        <br>
        <br>
        Un fois rendu sur la page principale de l'application il vous suffit de cliquer sur le bouton "Receveurs" se
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
        <h2 class="title is-3" id="receiverinterface">Interface de gestion des receveurs</h2>
        <br>
        <br>
        Vous devriez avoir une interface comme celle-ci :
        <br>
        <br>
        <div class="has-text-centered">
          <img
              src="https://media.discordapp.net/attachments/885854807120810045/943019572141895780/unknown.png?width=1234&height=701"
              alt="" class="bordered-image">
        </div>
      </div>
      <br>
      (Dans cet exemple la liste des receveurs est vide)
      <br>
      <br>
      Cette page comporte 3 éléments importants qui seront détaillé dans une partie dédiée ci dessous :
      <br>
      <br>
      <div class="has-text-centered">
        <img
            src="https://media.discordapp.net/attachments/837014086133743617/943026931786465300/unknown.png"
            alt="" class="bordered-image">
      </div>
      <br>
      <br>
      <h3 class="title is-4">1 : Bouton d'ajout des receveurs</h3>
      <h3 class="title is-4">2 : Recherche d'un receveur</h3>
      <h3 class="title is-4">3 : Liste des receveurs</h3>
      <h2 class="title is-3" id="addreceiver">Ajouter un receveur</h2>
      Lorsque que vous cliquez sur le bouton d'ajout (1) une nouvelle page devrait apparaître afin de vous laisser
      remplir certains champs d'informations tels que montré ci dessous, en cas de comportement non documenté dans
      cette aide
      veuillez <a v-on:click="updateValue('support')">contacter le support</a>.
      <br>
      <br>
      <div class="has-text-centered">
        <img
            src="https://media.discordapp.net/attachments/885901939966111844/957901927906160680/unknown.png?width=411&height=467"
            alt="" class="bordered-image">
      </div>
      <br>
      <br>
      <div>
        <strong> Veuillez bien vérifier chacune des informations que vous intégrez dans la base de données, de
          mauvais
          formats ou
          des champs invalides réduiront l'efficacité de l'outil et engendrer des problèmes techniques pouvant
          mettre
          en jeu
          la vie de certains patients</strong>
      </div>
      <br>
      <br>
      Une fois toutes les informations renseignées, il suffira de cliquer sur le bouton "Ajouter" pour intégrer le
      patient
      à notre base de données :
      <br>
      <br>
      <div class="has-text-centered">
        <img
            src="https://media.discordapp.net/attachments/885901939966111844/957903933827870760/unknown.png?width=425&height=467"
            alt="" class="bordered-image">
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Receveurs",
  methods: {
    updateValue: function (activePanel) {
      this.$emit('changePanel', activePanel);
    }
  },
}
</script>

<style scoped>

</style>