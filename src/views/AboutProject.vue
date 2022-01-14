<template>
  <nav class="navbar base-navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand logo-placeholder">
      <div class="navbar-item logo">
        <img src="https://cdn.discordapp.com/attachments/559512661717417986/784449164955746314/Asset_8.png"
             alt="logo" class="logo-img-align">
      </div>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/login" class="navbar-item">
          Accueil
        </router-link>
      </div>
    </div>
  </nav>
  <div class="container about-container">
    <h1 class="is-size-2">
      ORGANIA : Un Epitech Innovative Project
    </h1>
    <div class=" has-text-justified container is-max-desktop">
      OrganIA est une solution informatique ergonomique et simple d'utilisation permettant au corps médical d'automatiser tout le processus administratif de l'inscription du donneur et du receveur d'organes au matching donneur/receveur tout en répondant aux besoins régionaux spécifiques en permettant une personnalisation des paramètres de priorisation des receveurs.
    </div>
    <br>
    <div class="has-text-justified container is-max-desktop">
      Aujourd'hui <strong> 60% des cœurs et poumons</strong> destines a être greffes sont <strong>jetés car inutilisables</strong>  faute de temps. Ces délais dans le processus de distribution des organes ainsi que le délai d'établissement d'une liste classée de receveurs potentiels sont chaque année responsables de <strong>500 morts</strong>.
      <br>
      <br>
      En effet aujourd'hui dans l’établissement des priorités dans la notation des receveurs d'organes de nombreuses exceptions régionales existent, ralentissant le processus notamment en cardiologie ou les délais sont extrêmement importants et où il est primordial d'avoir une paire donneur receveur aussi vite que possible.
      <br>
      <br>
      Afin de <strong>mitiger</strong>  ce problème de surmortalité et <strong> d'accélérer</strong> le processus de distribution et d'assignation des organes, nous comptons développer une solution plus ergonomique mais aussi plus efficace que son équivalent actuel. Afin d'atteindre nos buts nous comptons automatiser l'établissement des notes associées aux demandeurs d'organes. Cette automatisation se basera sur les documents et feed-back potentiel de l'agence de la biomédecine, afin de s'accorder aux réglementations et besoins régionaux particuliers. de plus nous établirons un arbre de décisions permettant, au travers de paramètres tels que le rhésus ou la localisation géographique, de suggérer le candidat idéal, remplaçant ainsi différentes couches administratives.
    </div>
    <h1 class="is-size-2" >

      L'EIP : mode d'emploi <img class="align-middle" src="https://cibul.s3.amazonaws.com/event_rendez-vous-vip_700193.jpg" alt="logo epitech" width="85px" height="150px">
    </h1>
    <div class="has-text-justified container is-max-desktop">
      L’Epitech Innovative Project de l’EPITECH (réalisé en groupes en 4ème et 5ème Années) a pour objectif principal de faire passer les étudiants de la réalisation pédagogique, à la réalisation de projet d’entreprise. Il a de plus vocation à faciliter l’entrée des étudiants dans le monde professionnel, car il doit servir à l’étudiant de carte de visite à l’extérieur de l’école, le cas échéant, lui permettre de trouver un stage et convaincre le recruteur, grâce à l’expérience acquise durant l’EIP.

    </div>
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