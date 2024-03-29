<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand logo-placeholder">
      <router-link class="navbar-item logo" to="/">
        <img src="https://cdn.discordapp.com/attachments/559512661717417986/784449164955746314/Asset_8.png" alt="logo"
             class="logo-img-align">
      </router-link>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="#acceuil">
          Acceuil
        </a>
        <a class="navbar-item" href="#organiaeip">
          Notre Projet
        </a>
        <a class="navbar-item" href="#solutionvalide">
          Description
        </a>
        <a class="navbar-item" href="#timeline">
          Timeline
        </a>
        <a class="navbar-item" href="#team">
          L'équipe
        </a>
        <a class="navbar-item" href="#contact">
          Contact
        </a>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <button @click="(e) => {
              if (this.$store.getters.getID === 0) {
                this.$router.push('/login')
              } else {
                this.$router.push('/landing')
              }
            }" to="/landing" class=" navbar-item button nav-button is-rounded back-button">
              Retour
            </button>
          </p>
        </div>
      </div>
    </div>
  </nav>

  <div class="about-container">
    <div class="container">
      <figure id="acceuil">
        <img src="@/assets/photo-vitrine/affiche.png">
      </figure>
      <br>
      <br>
      <h1 class="title" id="organiaeip">
        QUI SOMMES-NOUS ?
      </h1>
      <br>
      <br>
      <div class=" has-text-justified container is-max-desktop text-style">
        OrganIA est une solution informatique ergonomique et simple d'utilisation permettant au corps médical
        d'automatiser tout le processus administratif de l'inscription du donneur et du receveur d'organes au matching
        donneur/receveur tout en répondant aux besoins régionaux spécifiques en permettant une personnalisation des
        paramètres de priorisation des receveurs.
      </div>
      <br>
      <br>
      <div class=" has-text-justified container is-max-desktop">
        <article class="media">
          <div class="media-left">
            <div role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="--value:60"></div>
          </div>
          <div class="media-content">
            <div class="content text-circlebar">
              Aujourd'hui <strong>60%</strong> des cœurs et poumons destines a être greffes sont jetés car inutilisables
              faute de
              temps.
            </div>
          </div>
        </article>
      </div>
      <br>
      <div class=" has-text-justified container is-max-desktop">
        <article class="media">
          <div class="media-left">
            <div class="circle">
              <p>500</p>
            </div>
          </div>
          <div class="media-content">
            <div class="content text-circlebar">
              Ces délais dans le processus de distribution des organes ainsi que le délai d'établissement d'une liste
              classée de receveurs potentiels sont chaque année responsables de <strong> 500 morts</strong>.
            </div>
          </div>
        </article>
      </div>
      <div class="has-text-justified container is-max-desktop text-style">
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
      <br>
      <br>
      <div>
        <h1 class="is-size-2 has-text-centered title" id="solutionvalide">NOUS VOUS PROPOSONS
          <br>
          Une solution validée par les professionnels
        </h1>
        <br>
        <br>
        <br>
        <div class="has-text-justified container is-max-desktop text-style">
          Au cours du développement de notre application censée être une amélioration de la base de données existante
          <strong> CRISTAL, </strong>
          nous avons pu rentrer en contact avec les administrateurs de ladite plateforme : <strong> l'Agence de
          Biomédecine</strong>.
          <br>
          Nous leur avons parlé de notre projet et de notre vision du futur et notre solution les a fortement interessé.
          En effet suite à plusieurs discussions et réunions nous avons réussi à trouver une dynamique d'entente pour
          que
          nous puissions développper notre plateforme <strong> ORGANIA </strong>avec l'aide de ces professionnels.
          Chaque algorithme est soigneusement testé et validé par l'agence de biomédecine afin d'assurer
          la qualité de notre travail et pour pouvoir proposer à nos utilisateurs une application qui corresponde à
          leurs besoins.

        </div>
      </div>
      <br>
      <br>
      <div id="timeline">
        <img src="@/assets/photo-vitrine/timeline.svg" alt="">
      </div>
      <h1 class="is-size-2 has-text-centered title" id="team">L'équipe</h1>
      <br>
      <div class="columns is-mobile is-variable">
        <div class="column">
          <div class="card card-style">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-96x96">
                    <img class="is-rounded" src="@/assets/photo-vitrine/saber.jpeg" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="media media-style">
                    <div class="media-left">
                      <p class="title is-4">Okil Saber Lakhdari</p>
                      <p class="subtitle is-6">Lead projet, développeur FullStack et mobile</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card card-style">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-96x96">
                    <img class="is-rounded" src="@/assets/photo-vitrine/victor.jpg" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="media media-style">
                    <div class="media-left">
                      <p class="title is-4">Victor Hamon</p>
                      <p class="subtitle is-6">Lead FrontEnd </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card card-style">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-64x64">
                    <img class="is-rounded" src="@/assets/photo-vitrine/damien.jpg" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="media media-style">
                    <div class="media-left">
                      <p class="title is-4">Damien Savatier</p>
                      <p class="subtitle is-6">Lead BackEnd et Devops</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-mobile is-variable">
        <div class="column">
          <div class="card card-style">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-96x96">
                    <img class="is-rounded" src="@/assets/photo-vitrine/irama.jpg" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="media media-style">
                    <div class="media-left">
                      <p class="title is-4">Irama Chaouch</p>
                      <p class="subtitle is-6">Développeuse FrontEnd </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card card-style">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-128x128">
                    <img class="is-rounded" src="@/assets/photo-vitrine/felix.jpg" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="media media-style">
                    <div class="media-left">
                      <p class="title is-4">Felix Burdot</p>
                      <p class="subtitle is-6">Développeur BackEnd et Algorithme</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card card-style">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-96x96">
                    <img class="is-rounded" src="@/assets/photo-vitrine/nicolas.jpg" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="media media-style">
                    <div class="media-left">
                      <p class="title is-4">Nicolas Yapobi</p>
                      <p class="subtitle is-6">Développeur BackEnd</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-mobile is-variable">
        <div class="column">
          <div class="card card-style">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-96x96">
                    <img class="is-rounded" src="@/assets/photo-vitrine/william.jpeg" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="media media-style">
                    <div class="media-left">
                      <p class="title is-4">William Winqwist</p>
                      <p class="subtitle is-6">Développeur FullStack, Algorithme et IA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card card-style">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-128x128">
                    <img class="is-rounded" src="@/assets/photo-vitrine/david.jpg" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="media media-style">
                    <div class="media-left">
                      <p class="title is-4">David Farjon</p>
                      <p class="subtitle is-6">Développeur FrontEnd et IA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card card-style">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-96x96">
                    <img class="is-rounded" src="@/assets/photo-vitrine/guillaume.jpg" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="media media-style">
                    <div class="media-left">
                      <p class="title is-4">Guillaume Braux</p>
                      <p class="subtitle is-6">Développeur Algorithme et IA </p>
                    </div>
                  </div>
                </div>
              </div>
              <br>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div id="contact">
      <h1 class="is-size-2 has-text-centered title">Contactez-nous</h1>
    </div>
    <br>
    <div class="columns is-mobile is-variable">
      <div class="column"></div>
      <div class="column">
        <div class="card">
          <div class="card-content">
            <a class=" navbar-item logo mail-box-logo">
              <img src="https://cdn.discordapp.com/attachments/559512661717417986/784449164955746314/Asset_8.png"
                   alt="logo" class="logo-img-align">
            </a>
            <br>
            <br>
            <span class="icon-text mail-link">
              <span class="icon">
                <i class="fas fa-envelope-open-text"></i>
              </span>
              <span>Envoyez-nous un E-mail :</span>
            </span>
            <br>
            <br>
            <a class="mail-link mail-link-color"
               href="mailto:organia_2023@labeip.epitech.eu">organia_2023@labeip.epitech.eu</a>
          </div>
        </div>
      </div>
      <div class="column"></div>
    </div>
  </div>
  <br>
  <br>
</template>

<script>
export default {
  name: "about-project"
}
</script>

<style scoped>
@keyframes growProgressBar {


  0%,
  33% {
    --pgPercentage: 0;
  }

  100% {
    --pgPercentage: var(--value);
  }
}

@property --pgPercentage {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}

div[role="progressbar"] {
  --size: 12rem;
  --fg: #369;
  --bg: #def;
  --pgPercentage: var(--value);
  animation: growProgressBar 3s 1 forwards;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: radial-gradient(closest-side, white 80%, transparent 0 99.9%, white 0),
  conic-gradient(var(--fg) calc(var(--pgPercentage) * 1%), var(--bg) 0);
  font-family: Helvetica, Arial, sans-serif;
  font-size: calc(var(--size) / 5);
  color: var(--fg);
}

div[role="progressbar"]::before {
  counter-reset: percentage var(--value);
  content: counter(percentage) '%';
}

body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.navbar {
  background-color: var(--light-gray);
  height: 110px;
  padding: 10px;
}

.circle {
  border: 0.1em solid #369;
  border-radius: 100%;
  height: 12em;
  width: 12em;
  border-style: dashed;
}

.circle p {
  margin-top: 1.2em;
  font-size: 3em;
  font-family: sans-serif;
  color: #369;
  text-align: center;
}

.logo {
  height: auto;
}

.navbar-start {
  margin: auto;
  font-weight: bold;
  font-size: large;
}

.nav-button {
  background-color: #071f49;
}

.title {
  color: #369;
}

strong {
  color: #369;
}

.text-style {
  font-weight: bold;
}

.text-circlebar {
  font-weight: bold;
  margin-top: 5em;
}

.titre-about {
  background-color: var(--dark-blue);
  color: white;
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

.box-style-left {
  width: 35em;
  height: 7em;
  margin-left: 48em;
  font-weight: bold;
}

.box-style-right {
  width: 35em;
  height: 7em;
  margin-left: 4em;
  font-weight: bold;
}

.body-style-left {
  height: 7em;
}

.body-style-right {
  height: 7em;
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

li.tl-li:before {
  content: '';
  width: 30px;
  height: 30px;
  background: white;
  border: 1px solid #0f2c59;
  box-shadow: 3px 3px 0px #0f2c59;
  box-shadow: 3px 3px 0px #0f2c59;
  border-radius: 50%;
  position: absolute;
  left: auto;
  top: auto;

}

.time {
  color: #2a2839;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 0rem;
  margin-left: -8em;
}

.time-right {
  color: #2a2839;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 0rem;
  margin-left: 15em;
}

.time-right-1 {
  color: #2a2839;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 0rem;
  margin-left: 10em;
}

.time-right-2 {
  color: #2a2839;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 0rem;
  margin-left: 12em;
}

.time-right-3 {
  color: #2a2839;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 0rem;
  margin-left: 18em;
}

.time-1 {
  color: #2a2839;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 0rem;
  margin-left: -12em;
}

.time-2 {
  color: #2a2839;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 0rem;
  margin-left: -14em;
}

.time-3 {
  color: #2a2839;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 0rem;
  margin-left: -7em;
}

.titre-about {
  background-color: var(--dark-blue);
  color: white;
}

.card-style {
  width: 31em;
  height: 11em;
}

.media-style {
  text-align: center;
}

.mail-box {
  height: 13em;
}

.mail-link {
  font-weight: bold;
  font-size: 1.5rem;
}

.mail-link-color {
  color: #369;
}

.mail-box-logo {
  margin: auto;
  height: 5em;
}

a {
  color: #296fa8;
}

.back-button {
  color: white;
}
</style>