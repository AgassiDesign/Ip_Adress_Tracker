<template>
  <div id="app">
    <IpTracker />
  </div>
</template>

<script>
import IpTracker from './components/IpTracker.vue'
import './css/style.scss'

export default {
  name: 'App',
  components: {
    IpTracker
  }
}
</script>
