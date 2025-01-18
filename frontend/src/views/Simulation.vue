<template>
  <div class="simulation-view">
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
    zoom: 10,
    attributionControl: false,  // 禁用属性标识
    customAttribution: null  // 禁用自定义属性
  });
});
</script>

<style scoped>
.simulation-view {
  position: fixed;
  top: 40px;  /* TabBar 高度 */
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0;
  overflow: hidden;
  transition: left 0.5s ease;
}

.map-container {
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  border-radius: 0;
  overflow: hidden;
  transition: left 0.5s ease;
}

/* 隐藏所有 Mapbox 相关标识 */
:global(.mapboxgl-control-container) {
  display: none !important;
}
</style> 