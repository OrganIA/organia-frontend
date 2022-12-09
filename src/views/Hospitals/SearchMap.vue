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
        <input class="form-control my-0 py-1" type="text" placeholder="Rerchercher un hôpital" aria-label="Search"
          v-model="search" />
        <div class="map">
          <l-map v-model="zoom" v-model:zoom="zoom" zoomAnimation="true" :center="[this.latpos, this.lngpos]"
                 :minZoom="3"
                 :maxZoom="18">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
            <l-geo-json :geojson="geojson"></l-geo-json>
            <l-marker v-for="item in markers" :key="item.id" :lat-lng="item.latlng" @l-add="$event.target.openPopup()">
              <l-popup :content="item.content"></l-popup>
            </l-marker>
          </l-map>
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
        .get("/hospitals/")
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
.page-content {
  margin: 0 0 0 0;
  width: 100%;
  height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.map {
  height: 100%;
  width: 90%;
  margin: 2% auto 10%;
  border: 3px solid #406996;
  border-radius: 5px;
}

</style>