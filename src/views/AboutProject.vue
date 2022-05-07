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

  <div class="about-container">
    <div class="container">
      <div class="is-size-5 has-text-justified">
        <div class="summary-box has-text-left">
          <ol>
            <li class="summary-item"><a href="#eipmodeemploi">L'EIP : mode d'emploi</a></li>
            <li class="summary-item"><a href="#organiaeip">ORGANIA : Un Epitech Innovative Project</a></li>
            <li class="summary-item"><a href="#solutionvalide">Une solution validée par les professionnels</a></li>
          </ol>
        </div>
      </div>
      <div class="" id="eipmodeemploi">
        <h1 class="is-size-2 has-text-centered titre-about">L'EIP : mode d'emploi</h1>

         <img class="align-middle"
                                   src="https://newsroom.ionis-group.com/wp-content/uploads/2021/10/LOGO-EPITECH-BASELINE-QUADRI-2021.png"
                                   alt="logo epitech" height="100px" width="700px">
        <br>
        <br>
        <br>
        <div class="has-text-justified container is-max-desktop">
          L’Epitech Innovative Project de l’EPITECH (European Institute of Technology), réalisé en groupes en 4ème et 5ème Années, a pour objectif
          principal de faire passer les étudiants de la réalisation pédagogique, à la réalisation de projet
          d’entreprise. Il a de plus vocation à faciliter l’entrée des étudiants dans le monde professionnel, car il
          doit servir à l’étudiant de carte de visite à l’extérieur de l’école, le cas échéant, lui permettre de trouver
          un stage et convaincre le recruteur, grâce à l’expérience acquise durant l’EIP.

        </div>
      </div>
      <h1 class="is-size-2 titre-about      " id="organiaeip">
        ORGANIA : Un Epitech Innovative Project
      </h1>
      <div class=" has-text-justified container is-max-desktop">
        OrganIA est une solution informatique ergonomique et simple d'utilisation permettant au corps médical
        d'automatiser tout le processus administratif de l'inscription du donneur et du receveur d'organes au matching
        donneur/receveur tout en répondant aux besoins régionaux spécifiques en permettant une personnalisation des
        paramètres de priorisation des receveurs.
      </div>
      <br>
      <div class="has-text-justified container is-max-desktop">
        <textarea class="textarea is-danger is-medium not-resizable" readonly>Aujourd'hui 60% des cœurs et poumons destines a être greffes sont  jetés car inutilisables faute de temps. Ces délais dans le processus de distribution des organes ainsi que le délai d'établissement d'une liste classée de receveurs potentiels sont chaque année responsables de 500 morts.</textarea>

        <br>
        <br>
        En effet aujourd'hui dans l’établissement des priorités dans la notation des receveurs d'organes de nombreuses
        exceptions régionales existent, ralentissant le processus notamment en cardiologie ou les délais sont
        extrêmement importants et où il est primordial d'avoir une paire donneur receveur aussi vite que possible.
        <br>
        <br>
        Afin de <strong>mitiger</strong> ce problème de surmortalité et <strong> d'accélérer</strong> le processus de
        distribution et d'assignation des organes, nous comptons développer une solution plus ergonomique mais aussi
        plus efficace que son équivalent actuel. Afin d'atteindre nos buts nous comptons automatiser l'établissement des
        notes associées aux demandeurs d'organes. Cette automatisation se basera sur les documents et feed-back
        potentiel de l'agence de la biomédecine, afin de s'accorder aux réglementations et besoins régionaux
        particuliers. de plus nous établirons un arbre de décisions permettant, au travers de paramètres tels que le
        rhésus ou la localisation géographique, de suggérer le candidat idéal, remplaçant ainsi différentes couches
        administratives.
      </div>
      <div class="" id="solutionvalide">
        <h1 class="is-size-2 has-text-centered titre-about">Une solution validée par les professionnels</h1>
        <br>
        <br>
        <br>
        <div class="has-text-justified container is-max-desktop">
          Au cours du développement de notre application censée être une amélioration de la base de données existante CRISTAL
          nous avons pu rentrer en contact avec les administrateurs de ladite plateforme : l'Agence de Biomédecine.
          <br>
          Nous leur avons parlé de notre projet et de notre vision du futur et notre solution les a fortement interessé.
          En effet suite à plusieurs discussions et réunions nous avons réussi à trouver une dynamique d'entente pour que
          nous puissions développper notre plateforme avec l'aide de ces professionnels.
          Chaque algorithme est soigneusement testé et validé par l'agence de biomédecine afin d'assurer
          la qualité de notre travail et pour pouvoir proposer à nos utilisateurs une application qui corresponde à leurs besoins.

        </div>
        </div>


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

  </div>
  <footer class="footer large-footer"></footer>

</template>

<script>
export default {
  name: "AboutProject"
}
</script>

<style scoped>

</style>