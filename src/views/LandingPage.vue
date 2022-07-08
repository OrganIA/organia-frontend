<template>
  <div class="app-navbar-container">
    <ApplicationNavbar></ApplicationNavbar>
  </div>
  <div class="columns landing-content">
    <div class="column sidebar-column">
      <SideBar></SideBar>
    </div>
    <div class="column landing-container">
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
      </div>
    </div>
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
        {id: 1, text: "Souhaitez-vous rechercher les centres de France ?", url: '/searchmap'},
        {id: 2, text: "Essayez notre nouveau service de communication.", url: "/chat"},
        {id: 3, text: "Ne ratez aucun évènement grâce au calendrier.", url: "/eventcalendar"},
        {id: 4, text: "La liste des évènements est disponible.", url: "/eventlist"},
      ]
    }
  },
};
</script>

<style scoped>

.landing-container {
  max-width: 83%;
  margin: 0;
  padding: 12px 0 0 0;
}

.landing-content {
}
</style>