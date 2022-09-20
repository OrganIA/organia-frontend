<template>
  <div class="content align-left ml-6 pl-1">
    <div class="tutorial-text-content has-text-justified ">
      <h1 class="title is-1">Gestion des Receveurs</h1>
      <br><br>
      <div class="is-size-5 has-text-justified">
        <div class="summary-box has-text-left">
          <ol>
            <li class="summary-item"><a href="#receivlist">Interface de gestion des receveurs</a></li>
            <li class="summary-item"><a href="#addreceiv">Ajouter un receveur</a></li>
            <li class="summary-item"><a href="#editreceiv">Modifier un receveur</a></li>
          </ol>
        </div>
      </div>
      <br><br>
      <div class="is-size-5 has-text-justified">
        <h1 class="title is-1" id="receivlist">Interface de gestion des receveurs</h1>

        La gestion des receveurs a également été simplifiée au possible afin de rendre le processus de correspondance le
        plus
        clair possible.
        <br>
        <br>
        Pour d'accéder à la liste des receveurs il vous faudra d'abord vous connecter via le portail de connexion
        (voir la partie <a @click="updateValue('connexion')">Se connecter</a>),
        étape obligatoire avant d'accéder aux informations
        de la plateforme.
        <br>
        <br>
        Un fois rendu sur la page principale de l'application il vous suffit de cliquer sur le bouton "receveurs" se
        trouvant en première position de la barre latérale (entouré ci-dessous en rouge) :
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
            src="https://media.discordapp.net/attachments/959068123187773570/972487174182277120/unknown.png?width=1093&height=551"
            alt="" class="bordered-image">
        </div>
      </div>
      <br>
      <div class="is-size-5">

        (Dans cet exemple la liste des receveurs est vide)
      </div>
      <br>
      <br>
      <h1 class="title is-1" id="addreceiv">Ajouter un receveur</h1>
      <div class="is-size-5">

        Lorsque que vous cliquez sur le bouton d'ajout une nouvelle page devrait apparaître afin de vous laisser
        remplir certains champs d'informations tels que montré ci dessous, en cas de comportement non documenté dans
        cette aide veuillez<a @click="updateValue('support')"> contacter le support</a>
        <br>
        <br>
      </div>

      <div class="has-text-centered">
        <img
          src="https://media.discordapp.net/attachments/959068123187773570/972487598385819680/unknown.png?width=388&height=550"
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


        <br>
        <br>
        <div class="has-text-centered">
          <img
            src="https://media.discordapp.net/attachments/959068123187773570/972488445018656788/unknown.png?width=383&height=551"
            alt="" class="bordered-image">
        </div>
        <br>
        <br>
        Une fois le receveur ajouté vous pourrez le voir dans la liste de receveurs existants comme ceci :
        <br>
        <br>
        <div class="has-text-centered">
          <img
            src="https://media.discordapp.net/attachments/959068123187773570/972488958065926184/unknown.png?width=1118&height=551"
            alt="" class="bordered-image">
        </div>
        <br>
        <br>
        <h1 class="title is-1" id="editreceiv">Modifier un receveur</h1>
        <br>
        <br>
        Lorsqu'un utilisateur est dans la liste, ses données ne sont pas "figées" et vous pourrez modifier les
        informations des
        receveurs déjà présents dans la liste via l'utilisation de ce bouton :
        <br>
        <br>
        <div class="has-text-centered">
          <img src="https://media.discordapp.net/attachments/959068123187773570/972436642449203230/unknown.png" alt=""
            class="bordered-image">
        </div>
        <br>
        <br>
        Une fois cliqué ce bouton vous emmennera dans la page d'édition des receveurs qui ressemble à la page
        d'addition,
        toutefois les informations seront préremplies en accord avec le receveur que vous voulez modifier, reprenons
        l'exemple de Jean
        Dupont, si je clique sur "Editer" je me retrouve sur cette page :
        <br><br>
        <div class="has-text-centered">
          <img
            src="https://media.discordapp.net/attachments/959068123187773570/972489175699980308/unknown.png?width=385&height=551"
            alt="" class="bordered-image">
        </div>
        <br><br>
        Je souhaite par exemple modifier son prénom qui a mal été saisi lors de l'enregistrement comme ceci :
        <br><br>
        <div class="has-text-centered">
          <img src="https://media.discordapp.net/attachments/959068123187773570/972489253705637919/unknown.png" alt=""
            class="bordered-image">
        </div>
        <br><br>
        Une fois mes informations saisies je souhaite enregistrer ces nouvelles données (je peux également les supprimer
        via
        le bouton "supprimer"), une fois enregistrée les données apparaissent correctement dans la liste :
        <br>
        <br>
        <div class="has-text-centered">
          <img
            src="https://media.discordapp.net/attachments/959068123187773570/972489548846202920/unknown.png?width=1256&height=65"
            alt="" class="bordered-image">
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "receveurs",
  methods: {
    updateValue: function (activePanel) {
      this.$emit('changePanel', activePanel);
    }
  },
}
</script>

<style scoped>
</style>