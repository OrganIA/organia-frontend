
<template>
  <div class="app-navbar-container">
    <ApplicationNavbar></ApplicationNavbar>
  </div>
  <div class="columns landing-content">
    <div class="column sidebar-column">
      <SideBar></SideBar>
    </div>
    <div class=" column landing-container">
      <div class="columns">
        <div class="column">
          <p class="bd-notification is-info">First column</p>
          <div class="columns is-mobile">
            <div class="column">
              <p class="bd-notification is-info">First nested column</p>
            </div>
            <div class="column">
              <p class="bd-notification is-info">Second nested column</p>
            </div>
          </div>
        </div>
        <div class="column">
          <p class="bd-notification is-danger">Second column</p>
          <div class="columns is-mobile">
            <div class="column is-half">
              <p class="bd-notification is-danger">50%</p>
            </div>
            <div class="column">
              <p class="bd-notification is-danger">Auto</p>
            </div>
            <div class="column">
              <p class="bd-notification is-danger">Auto</p>
            </div>
          </div>
        </div>
      </div></div>
    <!--div class="column is-four-fifths">
      <h1>Bienvenue sur la plateforme ORGANIA</h1>
      <carousel :autoplay="4000" :wrap-around="true" :items-to-show="1.5">
        <Slide v-for="content, index in contents" :key="content.id">
          <div class="carousel-item">
            <div class="carousel-content">
              <p>{{ content.text }}</p>
              <p>{{ index.text }}</p>
              <router-link :to="content.url" class="carousel-link">
                <span>En savoir plus</span>
              </router-link>
            </div>
          </div>
        </Slide>

        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>    </--div> !-->
  </div>

</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css';
//import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import SideBar from "@/components/SideBar";
import ApplicationNavbar from "@/components/ApplicationNavbar";

export default {
  name: "landing-page",
  emits: ["login"],
  components: {
    //Carousel,
    //Slide,
    //Pagination,
    //Navigation,
    SideBar,
    ApplicationNavbar
  },
  data() {
    return {
      contents: [
        { id: 1, text: "Souhaitez-vous rechercher les centres de France ?", url: '/searchmap' },
        { id: 2, text: "Essayez notre nouveau service de communication.", url: "/chat" },
        { id: 3, text: "Ne ratez aucun évènement grâce au calendrier.", url: "/eventcalendar" },
        { id: 4, text: "La liste des évènements est disponible.", url: "/eventlist" },
      ]
    }
  },
};
</script>

<style scoped>
.carousel-item {
  min-height: 200px;
  width: 100%;
  background-color: #0f2c59;
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-slide {
  padding: 10px;
}

.carousel-prev,
.carousel--next {
  box-sizing: content-box;
  border: 5px solid white;
}


.carousel-prev--in-active,
.carousel-next--in-active {
  display: none;
}

.carousel-content {
  display: inline;
}

.carousel-link {
  color: white;
}

.sidebar-column {
  max-width: 15.5%;
  margin: 0;
  min-width:  255px;
  padding: 12px 0 0 0;
}

.landing-container {
  max-width: 83%;
  margin: 0;
  padding: 12px 0 0 0;
}

.app-navbar-container {
  height: 14vh;
  max-width: 100%;
  margin-bottom: 20px;
}

.landing-content {
}
</style>