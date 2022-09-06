<template>
  <div class="content align-left ml-6 pl-1">
    <div class="tutorial-text-content has-text-justified ">
      <h1 class="title is-1">Gestion des Donneurs</h1>
      <br><br>
      <div class="is-size-5 has-text-justified">
        <div class="summary-box has-text-left">
          <ol>
            <li class="summary-item"><a href="#donorlist">Interface de gestion des donneurs</a></li>
            <li class="summary-item"><a href="#adddonor">Ajouter un donneur</a></li>
            <li class="summary-item"><a href="#editdonor">Modifier un donneur</a></li>
          </ol>
        </div>
      </div>
      <br><br>
      <div class="is-size-5 has-text-justified">
        <h1 class="title is-1" id="donorlist">Interface de gestion des donneurs</h1>

        La gestion des donneurs a été simplifiée au possible afin de rendre le processus de correspondance le plus
        clair possible.
        <br>
        <br>
        Pour d'accéder à la liste des donneurs il vous faudra d'abord vous connecter via le portail de connexion
        (voir la partie <a @click="updateValue('connexion')">Se connecter</a>),
        étape obligatoire avant d'accéder aux informations
        de la plateforme.
        <br>
        <br>
        Un fois rendu sur la page principale de l'application il vous suffit de cliquer sur le bouton "donneurs" se
        trouvant en seconde position de la barre latérale :
        <br>
        <br>
        <div class="has-text-centered">
          <img
            src="https://media.discordapp.net/attachments/959068123187773570/972486980195725452/unknown.png?width=182&height=551"
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
      <br>
      <div class="is-size-5">

        (Dans cet exemple la liste des donneurs est vide)
      </div>
      <br>
      <br>
      <h1 class="title is-1" id="adddonor">Ajouter un donneur</h1>
      <div class="is-size-5">

        Lorsque que vous cliquez sur le bouton d'ajout une nouvelle page devrait apparaître afin de vous laisser
        remplir certains champs d'informations tels que montré ci dessous, en cas de comportement non documenté dans
        cette aide veuillez<a @click="updateValue('support')"> contacter le support</a>
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


        <br>
        <br>
        <div class="has-text-centered">
          <img
            src="https://media.discordapp.net/attachments/959068123187773570/972371228922871808/unknown.png?width=404&height=551"
            alt="" class="bordered-image">
        </div>
        <br>
        <br>
        Une fois le donneur ajouté vous pourrez le voir dans la liste de donneurs existants comme ceci :
        <br>
        <br>
        <div class="has-text-centered">
          <img
            src="https://media.discordapp.net/attachments/959068123187773570/972436586774032384/unknown.png?width=991&height=551"
            alt="" class="bordered-image">
        </div>
        <br>
        <br>
        <h1 class="title is-1" id="editdonor">Modifier un donneur</h1>
        <br>
        <br>
        Lorsqu'un utilisateur est dans la liste, ses données ne sont pas "figées" et vous pourrez modifier les
        informations des
        donneurs déjà présents dans la liste via l'utilisation de ce bouton :
        <br>
        <br>
        <div class="has-text-centered">
          <img src="https://media.discordapp.net/attachments/959068123187773570/972436642449203230/unknown.png" alt=""
            class="bordered-image">
        </div>
        <br>
        <br>
        Une fois cliqué ce bouton vous emmennera dans la page d'édition des donneurs qui ressemble à la page d'addition,
        toutefois les informations seront préremplies en accord avec le donneur que vous voulez modifier, reprenons
        l'exemple de Jean
        Dupont Pierre, si je clique sur "Editer" je me retrouve sur cette page :
        <br><br>
        <div class="has-text-centered">
          <img
            src="https://media.discordapp.net/attachments/959068123187773570/972438629500719164/unknown.png?width=370&height=551"
            alt="" class="bordered-image">
        </div>
        <br><br>
        Je souhaite par exemple modifier son prénom qui a mal été saisi lors de l'enregistrement comme ceci :
        <br><br>
        <div class="has-text-centered">
          <img src="https://media.discordapp.net/attachments/959068123187773570/972438709284786226/unknown.png" alt=""
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
            src="https://media.discordapp.net/attachments/959068123187773570/972439124063711242/unknown.png?width=1256&height=70"
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
  name: "donneurs",
  methods: {
    updateValue: function (activePanel) {
      this.$emit('changePanel', activePanel);
    }
  },
}
</script>

<style scoped>
</style>