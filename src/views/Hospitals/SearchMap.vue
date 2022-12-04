<template>
  <div class="app-navbar-container">
    <ApplicationNavbar></ApplicationNavbar>
  </div>
  <div class="columns">
    <div class="column sidebar-column">
      <SideBar></SideBar>
    </div>
    <div class="column page-container">
      <div class="page-content">
        <link rel="stylesheet" href="https://unpkg.com/leaflet-geosearch@3.0.0/dist/geosearch.css" />
        <div id="main">
          <h1>Carte de recherche pour les hopitaux</h1>
        </div>
        <input class="form-control my-0 py-1" type="text" placeholder="Rerchercher" aria-label="Search"
          v-model="search" />
        <div class="map">
          <l-map v-model="zoom" v-model:zoom="zoom" zoomAnimation="true" :center="[this.latpos, this.lngpos]">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
            <l-geo-json :geojson="geojson"></l-geo-json>
            <l-marker v-for="item in markers" :key="item.id" :lat-lng="item.latlng" @l-add="$event.target.openPopup()">
              <l-popup :content="item.content"></l-popup>
            </l-marker>
          </l-map>
          <div class="ui cards">
            <div class="card ui fluid" v-for="item in filteredHospitals" :key="item.id" @click="clickHospital">
              <div class="content">
                <div class="meta">
                  <p>
                    {{ item.name }}
                    <br />
                    Numéro de téléphone: {{ item.phone_number }}
                    <br />
                    Nombre de patient: {{ item.patients_count }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LGeoJson,
  LMarker,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import ApplicationNavbar from "@/components/ApplicationNavbar";
import SideBar from "@/components/SideBar";
import translate from "@/translate"

export default {
  name: "search-map",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker,
    LPopup,
    ApplicationNavbar,
    SideBar,
  },
  data() {
    return {
      zoom: 6.4,
      iconWidth: 25,
      iconHeight: 40,
      latpos: 47,
      lngpos: 2.25,
      geojson: null,
      markers: [],
      markers_length: 0,
      hospitals: [],
      search: "",
    };
  },
  mounted() {
  },

  computed: {
    filteredHospitals() {
      return this.hospitals.filter((p) => {
        return p.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
      });
    },
  },

  async created() {
    const response = await fetch(
      "https://france-geojson.gregoiredavid.fr/repo/regions.geojson"
    );
    this.geojson = await response.json();
    this.getHospitals();
    window.setTimeout(() => {
      for (var i = 0; i < this.markers_length; i += 1) {
        if (
          this.hospitals[i].latitude == null ||
          this.hospitals[i].longitude == null
        )
          continue;
        else {
          this.markers.push({
            id: i,
            latlng: [this.hospitals[i].latitude, this.hospitals[i].longitude],
            content: this.hospitals[i].name,
          });
        }
      }
    }, 12000);
  },
  methods: {
    clickHospital(e) {
      for (var i = 0; i < this.markers_length; i += 1) {
        if (e.target.textContent == this.hospitals[i].name) {
          this.latpos = this.hospitals[i].latitude;
          this.lngpos = this.hospitals[i].longitude;
          this.zoom = 13;
        }
      }
    },
    getHospitals() {
      this.$http
        .get("/hospitals")
        .then((response) => {
          this.hospitals = response.data;
          this.markers_length = this.hospitals.length;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + translate[error.response.data.msg]
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
  },
};
</script>
<style scoped>
.map {
  height: 100%;
  width: 80%;
  margin: auto;
  margin-top: 2%;
  margin-bottom: 10%;
}
</style>