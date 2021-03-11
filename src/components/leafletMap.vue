<template>
  <div class="leaf-map" style="height: calc(100vh - 325px); width: 100%">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />      
      <l-marker :lat-lng="withTooltip" v-if="markerMsg">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div>
            {{ this.markerMsg }}
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng, Icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LTooltip } from "vue2-leaflet";

export default {
  name: "leafletMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  props: {
      latLng: Object, 
      default: function(){
        return {
          isp: null,
          lan: null,
          lng: null
        }
      }
  },
  data() {
    return {
      zoom: 13,
      center: latLng(47.41322, -1.219482),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
     // withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },
  mounted: function () {
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  },
  watch: { 
    latLng: function () {
      this.withTooltip = latLng(this.$props.latLng.lat, this.$props.latLng.lng);
      this.center = latLng(this.$props.latLng.lat, this.$props.latLng.lng);
      this.centerUpdate();
    },
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate() {
      this.currentCenter = this.center;
    },
  },
  computed: {
    markerMsg: function () {
      if(!this.$props.latLng) return '';
       return this.$props.latLng.isp;
    }   
  }
};
</script>