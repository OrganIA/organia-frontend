
<template>
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
  </carousel>
</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
  name: "landing-page",
  emits: ["login"],
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
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
</style>