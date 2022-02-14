<template>
    <div id="main">
        <h1>Carte de recherche pour les hopitaux</h1>
    </div>
    <div style="height: 75vh; width: 50vw;">
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      zoomAnimation=true
      :center="[47, 2.25]"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-geo-json :geojson="geojson"></l-geo-json>
    </l-map>
  </div>
</template>
<script>
import {LMap, LTileLayer, LGeoJson} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
  },
  data() {
    return {
      zoom: 6.4,
      iconWidth: 25,
      iconHeight: 40,
      geojson: null,
    };
  },
  async created () {
    const response = await fetch("https://france-geojson.gregoiredavid.fr/repo/regions.geojson");
    this.geojson = await response.json();
  },
};
</script>