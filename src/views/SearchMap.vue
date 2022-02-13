<template>
    <div id="main">
        <h1>Carte de recherche pour les hopitaux</h1>
    </div>
    <div style="height: 75vh; width: 50vw;">
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :center="[47, 2.25]"
      @move="log('move')"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-control-layers />
      <l-marker :lat-lng="[49, 2.25]" draggable @moveend="log('moveend')">
        <l-tooltip>
          France
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>
<script>
import {
  LMap,
  // LIcon,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
  // LPopup,
  // LPolyline,
  // LPolygon,
  // LRectangle,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
export default {
  components: {
    LMap,
    // LIcon,
    LTileLayer,
    LMarker,
    LControlLayers,
    LTooltip,
    // LPopup,
    // LPolyline,
    // LPolygon
    // LRectangle,
  },
  data() {
    return {
      zoom: 6.4,
      iconWidth: 25,
      iconHeight: 40,
    };
  },
  computed: {
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
  },
  methods: {
    log(a) {
      console.log(a);
    },
    changeIcon() {
      this.iconWidth += 2;
      if (this.iconWidth > this.iconHeight) {
        this.iconWidth = Math.floor(this.iconHeight / 2);
      }
    },
  },
};
</script>