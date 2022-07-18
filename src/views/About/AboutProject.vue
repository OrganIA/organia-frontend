<template>
  <nav class="navbar base-navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand logo-placeholder">
      <div class="navbar-item logo">
        <img src="https://cdn.discordapp.com/attachments/559512661717417986/784449164955746314/Asset_8.png" alt="logo"
          class="logo-img-align">
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
            <li class="summary-item"><a href="#timeline">Timeline de la solution</a></li>
            <li class="summary-item"><a href="#team">L'équipe</a></li>
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
          L’Epitech Innovative Project de l’EPITECH (European Institute of Technology), réalisé en groupes en 4ème et
          5ème Années, a pour objectif
          principal de faire passer les étudiants de la réalisation pédagogique, à la réalisation de projet
          d’entreprise. Il a de plus vocation à faciliter l’entrée des étudiants dans le monde professionnel, car il
          doit servir à l’étudiant de carte de visite à l’extérieur de l’école, le cas échéant, lui permettre de trouver
          un stage et convaincre le recruteur, grâce à l’expérience acquise durant l’EIP.

        </div>
      </div>
      <h1 class="is-size-2 titre-about" id="organiaeip">
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
        <textarea class="textarea is-danger is-medium not-resizable"
          readonly>Aujourd'hui 60% des cœurs et poumons destines a être greffes sont  jetés car inutilisables faute de temps. Ces délais dans le processus de distribution des organes ainsi que le délai d'établissement d'une liste classée de receveurs potentiels sont chaque année responsables de 500 morts.</textarea>

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
          Au cours du développement de notre application censée être une amélioration de la base de données existante
          CRISTAL
          nous avons pu rentrer en contact avec les administrateurs de ladite plateforme : l'Agence de Biomédecine.
          <br>
          Nous leur avons parlé de notre projet et de notre vision du futur et notre solution les a fortement interessé.
          En effet suite à plusieurs discussions et réunions nous avons réussi à trouver une dynamique d'entente pour
          que
          nous puissions développper notre plateforme avec l'aide de ces professionnels.
          Chaque algorithme est soigneusement testé et validé par l'agence de biomédecine afin d'assurer
          la qualité de notre travail et pour pouvoir proposer à nos utilisateurs une application qui corresponde à
          leurs besoins.

        </div>
      </div>

      <div class="" id="timeline">
        <h1 class="is-size-2 has-text-centered titre-about">Timeline de la solution</h1>
        <div class="container-timeline">
          <div class="wrapper">
            <h1 class="timeline-title">Le travail réalisé...</h1>
            <ul class="sessions list-tl">
              <li class="list-tl tl-li">
                <div class="time">Mars 2021</div>
                <p>Choix des technologies</p>
              </li>
              <li class="list-tl tl-li">
                <div class="time">Avril 2021</div>
                <p>Mise en place d'une charte graphique simple et direct</p>
              </li>
              <li class="list-tl tl-li">
                <div class="time">Avril - Juillet 2021</div>
                <p>Documentation sur les calculs</p>
              </li>
              <li class="list-tl tl-li">
                <div class="time">Juin 2021 - Mars 2022</div>
                <p>Implémentation de systèmes de gestion des patients et de leurs données</p>
              </li>
              <li class="list-tl tl-li">
                <div class="time">Janvier 2022 - Mai 2022</div>
                <p>Implémentation de la gestion des hôpitaux</p>
              </li>
              <li class="list-tl tl-li">
                <div class="time">Janvier 2022 - Mai 2022</div>
                <p>Ajout de la messagerie instantanée</p>
              </li>
            </ul>
            <h1 class="timeline-title">...et le travail restant</h1>
            <ul class="sessions list-tl">
              <li class="list-tl tl-li">
                <div class="time">Juin 2022</div>
                <p>Implémentation du calcul du score dans l'interface</p>
              </li>
              <li class="list-tl tl-li">
                <div class="time">Juin/Juillet 2022</div>
                <p>Ajout d'un début d'XIA</p>
              </li>
              <li class="list-tl tl-li">
                <div class="time">Juin 2022 - 2023</div>
                <p>Échanges avec l'agence de Bio-médecine française pour l'ajout ou correction de fonctionnalités</p>
              </li>
              <li class="list-tl tl-li">
                <div class="time">2023</div>
                <p>Améliorations UI/UX en accord avec les retours utilisateurs</p>
              </li>
              <li class="list-tl tl-li">
                <div class="time">2023</div>
                <p>Mise à disposition de l'outil OrganIA pour les professionnels de santé</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h1 class="is-size-2 has-text-centered titre-about" id="team">L'équipe</h1>

      <div class="resized-container">

        <div class="columns is-2">
          <div class="column">
            <div class="team-box">
              <div class="team-left">
                <div class="team-image">D</div>
                <div class="team-name">David FARJON</div>
                <a class="team-button linkedin" href="https://www.linkedin.com/in/david-farjon-863b471b5/">
                  <div class="fab fa-linkedin"></div>
                  Linkedin
                </a>
                <a class="team-button github" href="https://github.com/davidfarjonepitech">
                  <div class="fab fa-github"></div>
                  Github
                </a>
                <a class="team-button instagram">
                  <div class="fab fa-instagram"></div>
                  Instagram
                </a>
                <a class="team-button twitter">
                  <div class="fab fa-twitter"></div>
                  Twitter
                </a>
              </div>
              <div class="team-middle"></div>
              <div class="team-right">
                <div class="team-text">
                  Passionné de système d'exploitation, je rêve de pouvoir un jour créer
                  mon propre système d'exploitation depuis mon plus jeune âge.<br />
                  La realité augmenté et l'inteligence artificielle m'attire aussi.<br />
                  Travaillant principalement sur le front du Organ-IA.<br />
                  Epitech 4ème année.<br />
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="team-box">
              <div class="team-left">
                <div class="team-image">W</div>
                <div class="team-name">William WINQWIST</div>
                <a class="team-button linkedin" href="https://www.linkedin.com/in/william-winqwist-a38325152/">
                  <div class="fab fa-linkedin"></div>
                  Linkedin
                </a>
                <a class="team-button github" href="https://github.com/WilliamWnq">
                  <div class="fab fa-github"></div>
                  Github
                </a>
                <a class="team-button instagram">
                  <div class="fab fa-instagram"></div>
                  Instagram
                </a>
                <a class="team-button twitter">
                  <div class="fab fa-twitter"></div>
                  Twitter
                </a>
              </div>
              <div class="team-middle"></div>
              <div class="team-right">
                <div class="team-text"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-2">
          <div class="column">
            <div class="team-box">
              <div class="team-left">
                <div class="team-image">D</div>
                <div class="team-name">Damien SAVATIER</div>
                <a class="team-button linkedin" href="https://www.linkedin.com/in/tina-otoge/">
                  <div class="fab fa-linkedin"></div>
                  Linkedin
                </a>
                <a class="team-button github" href="https://github.com/Tina-otoge">
                  <div class="fab fa-github"></div>
                  Github
                </a>
                <a class="team-button instagram">
                  <div class="fab fa-instagram"></div>
                  Instagram
                </a>
                <a class="team-button twitter">
                  <div class="fab fa-twitter"></div>
                  Twitter
                </a>
              </div>
              <div class="team-middle"></div>
              <div class="team-right">
                <div class="team-text"></div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="team-box">
              <div class="team-left">
                <div class="team-image">F</div>
                <div class="team-name">Felix BURDOT</div>
                <a class="team-button linkedin" href="https://www.linkedin.com/in/f%C3%A9lix-burdot-8b0686159/">
                  <div class="fab fa-linkedin"></div>
                  Linkedin
                </a>
                <a class="team-button github" href="https://github.com/flxui">
                  <div class="fab fa-github"></div>
                  Github
                </a>
                <a class="team-button instagram">
                  <div class="fab fa-instagram"></div>
                  Instagram
                </a>
                <a class="team-button twitter">
                  <div class="fab fa-twitter"></div>
                  Twitter
                </a>
              </div>
              <div class="team-middle"></div>
              <div class="team-right">
                <div class="team-text">
                  Je suis Félix Burdot, jeune développeur à la recherche d'un domaine dans lequel me lancer
                  professionnellement, je cherche à accumuler le plus d'expérience et de connaissances possible via mes
                  expériences professionnelles et projets personnels.

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-2">
          <div class="column">
            <div class="team-box">
              <div class="team-left">
                <div class="team-image">G</div>
                <div class="team-name">Guillaume BRAUX</div>
                <a class="team-button linkedin" href="https://www.linkedin.com/in/guillaume-braux/">
                  <div class="fab fa-linkedin"></div>
                  Linkedin
                </a>
                <a class="team-button github" href="https://github.com/GuillaumeBraux">
                  <div class="fab fa-github"></div>
                  Github
                </a>
                <a class="team-button instagram">
                  <div class="fab fa-instagram"></div>
                  Instagram
                </a>
                <a class="team-button twitter">
                  <div class="fab fa-twitter"></div>
                  Twitter
                </a>
              </div>
              <div class="team-middle"></div>
              <div class="team-right">
                <div class="team-text"></div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="team-box">
              <div class="team-left">
                <div class="team-image">N</div>
                <div class="team-name">Nicolas YAPOBI</div>
                <a class="team-button linkedin" href="https://www.linkedin.com/in/nicolasyapobi1445a158/">
                  <div class="fab fa-linkedin"></div>
                  Linkedin
                </a>
                <a class="team-button github" href="https://github.com/NicolasYapobi">
                  <div class="fab fa-github"></div>
                  Github
                </a>
                <a class="team-button instagram">
                  <div class="fab fa-instagram"></div>
                  Instagram
                </a>
                <a class="team-button twitter">
                  <div class="fab fa-twitter"></div>
                  Twitter
                </a>
              </div>
              <div class="team-middle"></div>
              <div class="team-right">
                <div class="team-text">
                  Je m'appelle YAPOBI Nicolas, développeur passionné en robotique et tout ce qui n'est pas complexe.
                  Effectuant mon année en Corée du Sud, j'ai pour but d'y vivre et de travailler au sein de Samsung
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-2">
          <div class="column">
            <div class="team-box">
              <div class="team-left">
                <div class="team-image">V</div>
                <div class="team-name">Victor HAMON</div>
                <a class="team-button linkedin" href="https://www.linkedin.com/in/victor-hamon-0478b817a/">
                  <div class="fab fa-linkedin"></div>
                  Linkedin
                </a>
                <a class="team-button github" href="https://github.com/Victor-Hamon">
                  <div class="fab fa-github"></div>
                  Github
                </a>
                <a class="team-button instagram">
                  <div class="fab fa-instagram"></div>
                  Instagram
                </a>
                <a class="team-button twitter">
                  <div class="fab fa-twitter"></div>
                  Twitter
                </a>
              </div>
              <div class="team-middle"></div>
              <div class="team-right">
                <div class="team-text">Depuis que je suis jeune je me suis intéressé à l'informatique,
                  j'adore construire différents projets via mes connaissances tout en apprenant et en perfectionnant
                  d'autres compétences que j'acquiers au cours de ces "aventures", également passionné de biologie
                  moléculaire, je souhaite m'orienter dans un travail me permettant d'améliorer la
                  compréhension du fonctionnement des protéines à l'aide de l'informatique</div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="team-box">
              <div class="team-left">
                <div class="team-image">O</div>
                <div class="team-name">Okil Saber LAKHDARI</div>

                <a class="team-button github" href="https://github.com/OkilSaber">
                  <div class="fab fa-github"></div>
                  Github
                </a>
                <a class="team-button linkedin-saber" href="https://www.linkedin.com/in/okil-saber-lakhdari-30ab02176/">
                  <div class="fab fa-linkedin"></div>
                  Linkedin
                </a>
                <a class="team-button twitter">
                  <div class="fab fa-twitter"></div>
                  Twitter
                </a>
              </div>
              <div class="team-middle"></div>
              <div class="team-right">
                <div class="team-text">
                  Je m'appelle LAKHDARI Okil Saber, jeune développeur, <br>je suis passionné par le développement mobile
                  Flutter
                  <br>
                  et aimerait en faire ma carrière. <br>Je suis un énorme fan de sport automobile, de la F1 au Gr.3,<br>
                  je porte
                  Mercedes et Porsche dans mon cœur.<br> Je suis aussi un amateur de sim-racing.

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-2">
          <div class="column">
            <div class="team-box">
              <div class="team-left">
                <div class="team-image">I</div>
                <div class="team-name">Irama Chaouch</div>
                <a class="team-button linkedin" href="https://www.linkedin.com/in/irama-chaouch-95268517a/">
                  <div class="fab fa-linkedin"></div>
                  Linkedin
                </a>
                <a class="team-button github" href="https://github.com/iramach">
                  <div class="fab fa-github"></div>
                  Github
                </a>
                <a class="team-button instagram">
                  <div class="fab fa-instagram"></div>
                  Instagram
                </a>
                <a class="team-button twitter">
                  <div class="fab fa-twitter"></div>
                  Twitter
                </a>
              </div>
              <div class="team-middle"></div>
              <div class="team-right">
                <div class="team-text"></div>
              </div>
            </div>
          </div>
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
  name: "about-project"
}
</script>

<style scoped>

.align-middle {
    vertical-align: middle;
}

.not-resizable {
    resize: none;
}

.titre-about {
    background-color: var(--dark-blue);
    color: white;
}

.linkedin-saber {
    position: absolute;
    top: 350px;
    left: 110px;
    background: #071f49;
}

.list-tl {
    list-style: none;
    padding: 0;
}

.container-timeline {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    background: linear-gradient(45deg, var(--dark-blue), var(--logo-light-blue));
    padding: 3rem 0;
}

.wrapper {
    background: #eaf6ff;
    padding: 2rem;
    border-radius: 15px;
}

.timeline-title {
    font-size: 4rem;
    font-weight: bold;
}

.sessions {
    margin-top: 2rem;
    border-radius: 12px;
    position: relative;
}

li.tl-li {
    padding-bottom: 2rem;
    border-left: 3px solid #abaaed;
    position: relative;
    padding-left: 20px;
    margin-left: 10px;
}

li.tl-li:last-child {
    padding-bottom: 0;
}

li.tl-li:before {
    content: '';
    width: 40px;
    height: 40px;
    background: white;
    border: 1px solid #4e5ed3;
    box-shadow: 3px 3px 0px #bab5f8;
    box-shadow: 3px 3px 0px #bab5f8;
    border-radius: 50%;
    position: absolute;
    left: -20px;
    top: 25px;
}

.time {
    color: #2a2839;
    font-weight: bold;
    font-size: 2.5rem;
    margin-top: 0rem;
}

.titre-about {
    background-color: var(--dark-blue);
    color: white;
}

</style>