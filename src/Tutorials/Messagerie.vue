<template>
  <div class="content align-left ml-6 pl-1">
    <div class="tutorial-text-content has-text-justified ">
      <h1 class="title is-1">L'interface de messagerie</h1>
      <br><br>
      <div class="is-size-5 has-text-justified">
        <div class="summary-box has-text-left">
          <ol>
            <li class="summary-item"><a href="#interfaceglobale">Interface globale</a></li>
            <li class="summary-item"><a href="#creationsalle">Création d'une salle de discussion</a></li>
            <li class="summary-item"><a href="#modifsalle">Modification d'une salle existante</a></li>
            <li class="summary-item"><a href="#utilisationchat">Utilisation de la messagerie</a></li>
          </ol>
        </div>
      </div>
      <br>
      <br>
      <div class="title is-size-2 has-text-left" id="interfaceglobale">Interface globale</div>
      <br>
      <br>
      L'interface de chat se comporte en deux parties
      <br>
      <br>
      <div class="has-text-centered">
        <img
          src="https://media.discordapp.net/attachments/837014086133743617/959066629965242388/unknown.png?width=908&height=467"
          alt="" class="bordered-image">

      </div>
      <br>
      <br>
      La première est la liste des salles déjà existantes, elles se composent d'une photo de profil et d'un nom
      formant un bouton cliquable pour pouvoir accéder à la salle de discussion choisie.
      <br>
      <br>
      La seconde partie correspond à l'espace où seront affichées les différentes informations, que ce soit les
      messages
      dans le cas où une salle de discussion a été sélectionnée, ou les différents formulaires lors de la création /
      modification d'une salle
      <br><br>
      Ainsi l'espace s'apparente à des messageries déjà existantes et répandues comme messenger, whatsapp, skype,
      etc... et en reprend le fonctionnement global (voir <a href="#utilisationchat">Utilisation de la
        messagerie</a>)
      <br><br>

      <div class="title is-size-2 has-text-left" id="creationsalle">Création d'une salle de discussion</div>
      <br><br>
      Afin de créer une nouvelle salle de discussion, il suffit de cliquer sur le bouton "+" sur la seconde partie
      de
      l'écran (entouré en rouge ci dessous).

      <br><br>
      <div class="has-text-centered">
        <img
          src="https://media.discordapp.net/attachments/959068123187773570/959073793765158912/unknown.png?width=908&height=467"
          alt="" class="bordered-image">
      </div>
      <br><br>
      Une fois cette étape passée vous devriez avoir une nouvelle fenêtre dans la partie "2" de la messagerie, comme
      ceci :
      <br><br>
      <div class="has-text-centered">
        <img
          src="https://media.discordapp.net/attachments/959068123187773570/959335887160881162/unknown.png?width=1362&height=701"
          alt="" class="bordered-image">
      </div>
      <br><br>
      La partie entourée et marquée "1" est la liste des utilisateurs existants sur la plateforme, la zone "2" est,
      quant à elle
      la liste des personnes dejà ajoutées à la salle de discussion.
      <br>
      <br>
      Toutefois afin de simplifier l'ajout d'utilisateurs à la salle de discussion, un système de filtre par adresse
      mail à été mis en place.
      <br>
      <br>
      <div class="has-text-centered">
        <img src="https://media.discordapp.net/attachments/959068123187773570/959334527254269962/unknown.png" alt=""
          class="bordered-image">
      </div>
      <br>
      <br>
      <div id="addormodifyroom"></div>
      En effet dans la capture d'écran ci dessus, le champ pour rentrer le mail de la personne à ajouter est
      entouré, il vous suffit de cliquer sur le champ et écrire le mail de ladite personne.
      <br>
      <br>
      Fin d'ajouter un utilisateur, cliquez sur son bandeau dans la liste et il sera automatiquement ajouté, afin de
      l'enlever, répétez l'opération sur la partie "Utilisateurs ajoutés".
      <br>
      <br>
      Pour donner un nom à votre salle de discussion, cliquez sur le champ texte en bas à droite de la messagerie et
      entrez le nom désiré.
      <br>
      <br>
      <div class="has-text-centered">
        <img
          src="https://media.discordapp.net/attachments/959068123187773570/959633757705482292/unknown.png?width=1286&height=662"
          alt="" class="bordered-image">
      </div>
      <br><br>
      Une fois que tout est prêt, vous pourrez confirmer la création de la salle en cliquant le bouton "Créer une
      salle de chat"
      <br><br>
      Vous devriez avoir la salle de chat ouverte comme ci dessous :
      <br><br>
      <div class="has-text-centered">
        <img
          src="https://media.discordapp.net/attachments/885854807120810045/958995438046941254/unknown.png?width=1286&height=662"
          alt="" class="bordered-image">
      </div>
      <br>
      <br>
      <div class="title is-size-2 has-text-left" id="modifsalle">Modification d'une salle existante</div>
      <br>
      <br>
      Afin de modifier une salle de discussion, vous devez tout d'abord cliquer sur la salle dans la liste,
      à gauche, par exemple ici nous voulons modifier la salle "Salle de tutoriel" (entourée dans la capture ci
      dessous).
      <div class="has-text-centered">
        <img src="https://media.discordapp.net/attachments/959068123187773570/959655738769293362/unknown.png" alt=""
          class="bordered-image">
      </div>
      <br>
      <br>
      La salle est alors ouverte et vous devriez voir apparaître un bouton d'option en haut à droite (entouré ci
      dessous).
      <br><br>
      <div class="has-text-centered">
        <img
          src="https://media.discordapp.net/attachments/959068123187773570/959659449138696212/unknown.png?width=1286&height=662"
          alt="" class="bordered-image">
      </div>
      <br><br>
      Une fois ce bouton cliqué, une interface similaire à celle affichée lors de la création d'une salle devrait
      apparaître comme ceci :
      <br><br>
      <div class="has-text-centered">
        <img
          src="https://media.discordapp.net/attachments/885854807120810045/958995651729977354/unknown.png?width=1286&height=662"
          alt="" class="bordered-image">
      </div>
      <br><br>
      Pour modifier la salle, il suffit de suivre les mêmes insctructions présentées <a href="#addormodifyroom">ici</a>
      <br><br>
      <div class="title is-size-2 has-text-left" id="utilisationchat">Utilisation de la messagerie</div>
      <br><br>
      La messagerie d'OrganIA s'utilise comme toute messagerie classique via un envoie et une réception instantané.
      <br>
      <br>
      Afin d'envoyer votre message il suffit d'abord de l'écrire dans le champ texte prévu à cet effet et d'appuyer
      sur la touche "entrée" de votre clavier, ou de cliquer sur le bouton d'envoi à droite du champ.
      <br>
      <br>
      <div class="has-text-centered">
        <img src="https://media.discordapp.net/attachments/959068123187773570/959732270598606858/unknown.png" alt=""
          class="bordered-image">
      </div>
      <br><br>
      Votre message devrait alors s'afficher comme ceci :
      <br><br>
      <div class="has-text-centered">
        <img src="https://media.discordapp.net/attachments/959068123187773570/959732753455284234/unknown.png" alt=""
          class="bordered-image">
      </div>
      <br><br><br><br><br>
    </div>
  </div>

</template>

<script>
export default {
  name: "messagerie"
}
</script>

<style scoped>
</style>