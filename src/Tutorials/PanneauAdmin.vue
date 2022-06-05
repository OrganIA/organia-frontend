<template>
  <div class="content align-left ml-6 pl-1">
    <div class="tutorial-text-content has-text-justified ">
      <h1 class="title is-1">L'interface de messagerie</h1>
      <br><br>
      <div class="is-size-5 has-text-justified">
        <div class="summary-box has-text-left">
          <ol>
            <li class="summary-item"><a href="#userlist">Liste des utilisateurs</a></li>
            <li class="summary-item"><a href="#modifuser">Modification d'un utilisateur</a></li>
            <li class="summary-item"><a href="#visualizeuser">Visualisation avancée</a></li>
          </ol>
        </div>
      </div>
      <br>
      <br>
      <div class="is-size-5 has-text-justified">
        Cette partie du tutoriel s'addresse aux personnes ayant les droits d'administrateurs sur la plateforme OrganIA.
        Afin de pouvoir visualiser et gérer les utilisateurs de la plateforme, ce prérequis est obligatoire, si vous
        êtes un
        administrateur mais que vous ne possédez pas les droits sur l'application, consultez <a
          v-on:click="updateValue('askRights')">Demander des droits
          supplémentaires</a>
      </div>
      <br>
      <br>
      <div class="title is-size-2 has-text-left" id="userlist">Liste des utilisateurs</div>
      <br>
      <br>
      Après avoir cliqué sur le bouton "Administrateur" (4ème en partant du haut dans la barre latérale), vous aurez
      accès à ce panneau :
      <br>
      <br>
      <div class="has-text-centered">
        <img
          src="https://media.discordapp.net/attachments/959068123187773570/962194919861129226/unknown.png?width=1370&height=701"
          alt="" class="bordered-image">
      </div>
      <br>
      <br>
      La partie entourée et marquée d'un "1" correpond à la table contenant les différents utilisateurs,
      leurs informations y sont affichées.
      <br>
      La seconde petite partie est une barre de recherche accompagnée d'un menu déroulant, permettant de filtrer
      les utilisateurs dans la base de données.
      <br><br>
      <div class="has-text-centered">
        <img src="https://media.discordapp.net/attachments/959068123187773570/962196381752258570/unknown.png" alt=""
          class="bordered-image">
      </div>
      <br><br>
      En sélectionnant différents champs, le contenu de la barre textuelle filtrera différents élements, en effet si je
      mets
      "vhamon" dans la barre de recherche en ayant sélectionné le champ "email", la liste n'affichera que les
      utilisateurs
      dont le mail contient "vhamon", si toutefois je souhaite filtrer par Prénom et que je tape "Jean" dans le champn,
      les personnes dont le prénom
      contient "Jean" seront affichées.
      <br><br>
      <div class="title is-size-2 has-text-left" id="modifuser">Modification d'un utilisateur</div>
      <br><br>
      En plus des informations des utilisateur, pour chaque entrée dans le tableau, un bouton de modification se trouve
      à côté (image du bouton ci dessous).
      <br><br>
      <div class="has-text-centered">
        <img src="https://media.discordapp.net/attachments/959068123187773570/962977020940288050/unknown.png" alt=""
          class="bordered-image">
      </div>
      <br><br>
      Lorsque vous cliquez sur ce bouton, une nouvelle page s'ouvre et vous avez accès à un nouveau formulaire
      permettant de modifier
      les informations de l'utilisateur sélectionné comme ceci :
      <br><br>
      <div class="has-text-centered">
        <img src="https://media.discordapp.net/attachments/959068123187773570/962165584940924979/unknown.png" alt=""
          class="bordered-image">
      </div>
      <br><br>
      Vous pourrez alors modifier les informations de cet utilisateur et cliquer sur enregistrer pour pousser vos
      changements sur la base de donnée.
      <br><br>
      <div class="title is-size-2 has-text-left" id="visualizeuser">Visualisation avancée</div>
      <br><br>
      Si vous pouvez modifier un utilisateur via le bouton latéral, vous pouvez également voir des informations plus
      complètes sur la plateforme en cliquand sur l'entrée elle même.
      <br>
      En effet en faisant cela vous ferez apparaître la modale suivante :
      <br><br>
      <div class="has-text-centered">
        <img
          src="https://media.discordapp.net/attachments/959068123187773570/962167017429938206/unknown.png?width=851&height=701"
          alt="" class="bordered-image">
      </div>
      <br><br>
      Vous aurez alors un bouton pour pouvoir envoyer directement un mail à la personne (le premier en haut à gauche),
      ainsi
      que les différentes informations concernant les rôles de la personnes.
      <br>
      <br>
      TODO FAIRE EN SORTE DE POUVOIR CHANGER LES ROLES EN CLIQUANT DESSUS
      <br><br>
      <br><br>
      <br><br>
      <br><br>
      <br><br>
      <br><br>
      <br><br>
      <br><br>
      <br><br>
      <br><br>
      <br><br>
    </div>
  </div>

</template>

<script>
export default {
  name: "panneau-admin",
  methods: {
    updateValue: function (activePanel) {
      this.$emit('changePanel', activePanel);
    }
  },
}
</script>

<style scoped>
</style>