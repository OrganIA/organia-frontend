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
      <l-marker :lat-lng="markerLatLng"></l-marker>
      <l-marker v-for="item in markers" :key="item.id" :lat-lng="item.latlng" @l-add="$event.target.openPopup()"> 
          <l-popup :content="item.content"></l-popup> 
      </l-marker> 
    </l-map>
  </div>
</template>
<script>
import {LMap, LTileLayer, LGeoJson, LMarker, LPopup} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker,
    LPopup,
  },
  data() {
    return {
      zoom: 6.4,
      iconWidth: 25,
      iconHeight: 40,
      geojson: null,
      markers: [],
      markers_length: 0,
    };
  },
  mounted () {
      
  },
  async created () {
    const response = await fetch("https://france-geojson.gregoiredavid.fr/repo/regions.geojson");
    this.geojson = await response.json();
    this.getHospitals();
    window.setTimeout( () => {        
        for (var i = 0; i < this.markers_length; i += 1) {
          this.markers.push({
            id: i,
            latlng: [this.hospitals[i].latitude, this.hospitals[i].longitude],
            content: this.hospitals[i].name
          })
        }
    }, 2000);
  },
  methods: {
    getHospitals() {
      this.$http
        .get("/hospitals")
        .then((response) => {
          this.hospitals = response.data;
          console.log(this.hospitals)
          this.markers_length = this.hospitals.length;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    }
  }
};
</script>

<style scoped>
</style>