<template>
  <div class="hello">
    <div class="bg"></div>
    <header class="site-header">
      <div class="tracker-panel">
        <h1>IP Address Tracker</h1> 
        <div class="tracker-control">
          <input
            placeholder="Search for any IP address or domain"
            type="text"
            class="tracker-input"
            v-model="ip"
          /><button type="button" class="tracker-btn" @click="showIpInfo"></button>
        </div>
      </div>
      <div  v-if="err" class="error-board">
        {{ this.err }}
      </div>
      <div v-if="!err && Object.keys(this.data).length" class="tracker-board">
        <div class="ip-adress">
          <small>ip address</small>
          <p>{{ this.data.ip }}</p>
        </div>
        <div class="location">
          <small>location</small>
          <p>{{ this.data.location | location }}</p>
        </div>
        <div class="timezone">
          <small>timezone</small>
          <p>{{ this.data.location | timezone }}</p>
        </div>
        <div class="isp">
          <small>isp</small>
          <p>{{ this.data.isp }}</p>
        </div>
      </div>
    </header>
    <leaflet-map  :latLng="this.latLng"></leaflet-map>
    <footer class="attribution">
      Challenge by
      <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
        >Frontend Mentor</a
      >. Coded by <a href="#">Agassi</a>.
    </footer>
  </div>
</template>

<script>
import Api from '@/lib/api';
import leafletMap from './leafletMap';

export default {
  components: { leafletMap },
  name: 'IpTracker',
  data() {
    return {
    ip: null,
    apiKey: process.env.VUE_APP_API_KEY,
    apiUrl: process.env.VUE_APP_API_URL,
    data: {},
    latLng: null,
    err: null
  }},
  methods: {
    async showIpInfo() {
      if(this.ip ) {
        try {
          const res = await Api.fetchData(this.apiKey, this.ip);
          this.err = null;
          this.data = res.data;
          this.setLatLng();
        } catch(err) {
          if(err.response || err.request) {
            this.err = err.response.data.messages;
          } else {
            this.err = 'Wrong IP!';
          }
        }
      }
    },
    setLatLng() {
      this.latLng = { 
        lat: this.data.location.lat,
        lng: this.data.location.lng,
        isp: this.data.isp 
        };
    }
  },
  filters: {
    location: function (value) {
      if (!value) return '';
      return value.region + ', ' + value.country + ' ' + value.postalCode; 
    },
    timezone: function (value) {
      
      if (!value) return '';
      return 'UTC ' + value.timezone; 
    }
  }
}
</script>
