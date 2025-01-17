<template>
  <div class="simulation-view">
    <h2>仿真推演</h2>
    <div id="map" class="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import mapboxgl from 'mapbox-gl';
import { onMounted } from 'vue';
import 'mapbox-gl/dist/mapbox-gl.css';

// 初始化地图
onMounted(() => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWlsYW56aGFuZyIsImEiOiJjbTMycjh3b28xMXg0MmlwcHd2ZmttZWYyIn0.T42ZxSkFvc05u3vfMT6Paw';
  
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [116.4074, 39.9042],
    zoom: 10
  });
});
</script>

<style scoped>
.simulation-view {
  padding: 20px;
  transition: margin-left 0.3s ease;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

h2 {
  margin: 0 0 20px 0;
}

.map-container {
  flex: 1;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}
</style> 