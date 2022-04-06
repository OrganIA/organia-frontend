<template>
  <nav class="navbar base-navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand logo-placeholder">
      <div class="navbar-item logo">
        <img src="https://cdn.discordapp.com/attachments/559512661717417986/784449164955746314/Asset_8.png"
             alt="logo" class="logo-img-align">
      </div>
    </div>
    <div id="navbarBasicExample" class="navbar-menu main-menu-navbar">
      <div class="navbar-start navbar-correction-tutorial">
        <router-link to="/login" class="navbar-item button is-medium is-danger is-large">
          Retour
        </router-link>
      </div>
    </div>
  </nav>

  <div class="tutorial-container">
    <div class="tabs is-boxed is-large is-toggle ml-6 pl-1 tab-container">
      <ul>
        <li class="tutorial-tab" v-bind:class="{ 'is-active': isActive === 'plateforme' }"><a
            v-on:click="isActive = 'plateforme'">La
          plateforme</a></li>
        <li class="tutorial-tab" v-bind:class="{ 'is-active': isActive === 'connexion' }"><a
            v-on:click="isActive = 'connexion'">Se connecter</a></li>
        <li class="tutorial-tab" v-bind:class="{ 'is-active': isActive === 'receveurs' }"><a
            v-on:click="isActive = 'receveurs'">Receveurs</a></li>

        <li class="tutorial-tab" v-bind:class="{ 'is-active': isActive === 'invitations' }"><a
            v-on:click="isActive = 'invitations'">Invitations</a></li>
        <li class="tutorial-tab" v-bind:class="{ 'is-active': isActive === 'askRights' }"><a
            v-on:click="isActive = 'askRights'">Droits supplémentaires</a></li>
        <li class="tutorial-tab" v-bind:class="{ 'is-active': isActive === 'chats' }"><a
            v-on:click="isActive = 'chats'">Messagerie</a></li>
      </ul>
    </div>
    <div class="tab-contents">
      <div class="content align-left ml-6 pl-1 " v-bind:class="{ 'is-active': isActive === 'plateforme' }">
        <div class="tutorial-text-content has-text-justified ">
          <h1 class="title is-1">La plateforme</h1>
          <br><br>
          <div class="is-size-5 has-text-justified"> OrganIA est une plateforme de mise en relation automatique entre
            donneur et receveur
            d'organe, elle est une
            tentative de modernisation de la plateforme déjà existante CRISTAL.
            <br>
            <br>
            Ainsi elle conserve plusieurs fonctionnalités déjà existantes dans CRISTAL toute en ayant un aspect visuel
            se
            voulant clair et facilement utilisable par les professionnels de santé.
            <br>
            <br>
            Toutefois elle se trouve encore en phase de bêta-testing et nous manquons sûrement de certains éléments qui
            <strong> vous semblent importants.</strong>
            <br>
            <br>
            Ainsi, si vous avez quelconque recommandation / demande n'hésitez pas à nous envoyer un mail ! METTRE MAIL
            DE LA BOITE ICI

          </div>

        </div>

      </div>
      <div class="content align-left ml-6 pl-1" v-bind:class="{ 'is-active': isActive === 'receveurs' }">
        <div class="tutorial-text-content has-text-justified ">
          <h1 class="title is-1">Gestion des receveurs</h1>
          <br><br>
          <div class="is-size-5 has-text-justified">
            La gestion des receveurs a été simplifiée au possible afin de rendre le processus de correspondance le plus
            clair possible.
            <br>
            <br>
            Pour d'accéder à la liste des receveurs il vous faudra d'abord vous connecter via le portail de connexion
            (voir la partie <a
              v-on:click="isActive = 'connexion'">Se connecter</a>), étape obligatoire avant d'accéder aux informations
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
          <h2 class="title is-3">Ajouter un receveur</h2>
          Lorsque que vous cliquez sur le bouton d'ajout (1) une nouvelle page devrait apparaître afin de vous laisser
          remplir certains champs d'informations tels que montré ci dessous, en cas de comportement non documenté dans
          cette aide
          veuillez <a v-on:click="isActive = 'support'">contacter le support</a>.
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
      <div class="content align-left ml-6 pl-1" v-bind:class="{ 'is-active': isActive === 'connexion' }">
        <div class="tutorial-text-content has-text-justified ">
          <h1 class="title is-1">Connexion à la plateforme</h1>
          <br><br>
          <div class="is-size-5 has-text-justified">
            /!\ PARTIE A REFAIRE UNE FOIS QUE LE SYSTEME D'INVIT A ETE MIS EN PLACE
            <br>
            <br>
            Après avoir suivi les instructions de mis en place de votre compte OrganIA (envoyé par mail lors de
            l'invitation) il suffit de vous connecter avec vos informations sur le portail :
            <br>
            <div class="has-text-centered">
              <img src="https://media.discordapp.net/attachments/885854807120810045/942995932172156928/unknown.png"
                   alt="" class="bordered-image">

            </div>

          </div>

        </div>
      </div>
      <div class="content align-left ml-6 pl-1" v-bind:class="{ 'is-active': isActive === 'invitations' }">
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
      <div class="content align-left ml-6 pl-1" v-bind:class="{ 'is-active': isActive === 'askRights' }">
        <div class="tutorial-text-content has-text-justified ">
          <h1 class="title is-1">Demander des droits supplémentaires</h1>
          <br><br>
          <div class="is-size-5 has-text-justified">
            La demande de droits supplémentaires est un acte officiel qui doit se réaliser par l'envoi d'un mail
            codifié.
            <br>
            <br>
            En effet nous avons besoin de plusieurs informations concernant la demande et la personne la réalisant.
            <br>
            //liste des informations à décider
          </div>

        </div>
      </div>
      <div class="content align-left ml-6 pl-1" v-bind:class="{ 'is-active': isActive === 'chats' }">
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
            <img src="https://media.discordapp.net/attachments/959068123187773570/959334527254269962/unknown.png"
                 alt="" class="bordered-image">
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
          à gauche, par exemple ici nous voulons modifier la salle "Salle de tutoriel" (entourée dans la capture ci dessous).
          <div class="has-text-centered">
            <img
                src="https://media.discordapp.net/attachments/959068123187773570/959655738769293362/unknown.png"
                alt="" class="bordered-image">
          </div>
          <br>
          <br>
          La salle est alors ouverte et vous devriez voir apparaître un bouton d'option en haut à droite (entouré ci dessous).
          <br><br>
          <div class="has-text-centered">
            <img
                src="https://media.discordapp.net/attachments/959068123187773570/959659449138696212/unknown.png?width=1286&height=662"
                alt="" class="bordered-image">
          </div>
          <br><br>
          Une fois ce bouton cliqué, une interface similaire à celle affichée lors de la création d'une salle devrait apparaître comme ceci :
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
            <img
                src="https://media.discordapp.net/attachments/959068123187773570/959732270598606858/unknown.png"
                alt="" class="bordered-image">
          </div>
          <br><br>
          Votre message devrait alors s'afficher comme ceci :
          <br><br>
          <div class="has-text-centered">
            <img
                src="https://media.discordapp.net/attachments/959068123187773570/959732753455284234/unknown.png"
                alt="" class="bordered-image">
          </div>
          <br><br><br><br><br>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "HowToUseThePlatform",
  data() {
    return {
      isActive: "plateforme",
    }
  }
}
</script>

<style scoped>

</style>