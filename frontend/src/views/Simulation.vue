<template>
  <div class="simulation-view">
    <div id="map" class="map-container"></div>
    <div id="minimap" class="minimap"></div>
    <div class="timeline-container">
      <div class="timeline-controls">
        <el-button-group>
          <el-button size="small">
            <el-icon><CaretRight /></el-icon>
          </el-button>
          <el-button size="small">
            <el-icon><RefreshRight /></el-icon>
          </el-button>
        </el-button-group>
        <span class="timeline-time">1980-08-25 pm 20:12:50</span>
      </div>
      <el-slider
        v-model="timelineValue"
        :min="0"
        :max="100"
        class="timeline-slider"
      />
    </div>
    <div class="container">
      <el-container class="custom-container">
        <el-header height="auto" class="control-header">
          <h3>选择事件</h3>
          <el-select
            v-model="selectedEvent"
            placeholder="请选择事件"
            class="event-select"
            :virtual-scrolling="true"
            :height="200"
          >
            <el-option
              v-for="item in eventOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-header>
        
        <!-- 按钮组 -->
        <div class="button-group">
          <el-button type="primary" class="control-button">
            态势感知
          </el-button>
          <el-button type="primary" class="control-button">
            战果统计
          </el-button>
          <el-button type="primary" class="control-button">
            增设事件
          </el-button>
        </div>

        <!-- 日志面板 -->
        <div class="log-panel">
          <div class="log-header">
            <span>日志面板</span>
          </div>
          <div class="log-content">
            <!-- 日志内容将在这里动态添加 -->
          </div>
        </div>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import mapboxgl from 'mapbox-gl';
import { onMounted, ref } from 'vue';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CaretRight, RefreshRight } from '@element-plus/icons-vue'

// 事件选择相关的数据
const selectedEvent = ref('');
const eventOptions = [
  {
    value: 'troop_gathering',
    label: '部队集结'
  },
  {
    value: 'tactical_exercise',
    label: '战术演练'
  },
  {
    value: 'logistics_supply',
    label: '后勤补给'
  },
  {
    value: 'reconnaissance',
    label: '侦察任务'
  },
  {
    value: 'defense_deployment',
    label: '防御部署'
  },
  {
    value: 'communication_setup',
    label: '通信建设'
  },
  {
    value: 'equipment_maintenance',
    label: '装备维护'
  },
  {
    value: 'medical_support',
    label: '医疗支援'
  },
  {
    value: 'air_patrol',
    label: '空中巡逻'
  },
  {
    value: 'naval_exercise',
    label: '海上演习'
  },
  {
    value: 'artillery_training',
    label: '火力训练'
  },
  {
    value: 'command_post',
    label: '指挥所设立'
  }
];

// 添加时间轴相关的响应式数据
const timelineValue = ref(0);

// 初始化地图
onMounted(() => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWlsYW56aGFuZyIsImEiOiJjbTMycjh3b28xMXg0MmlwcHd2ZmttZWYyIn0.T42ZxSkFvc05u3vfMT6Paw';
  
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [116.4074, 39.9042],
    zoom: 3,
    attributionControl: false,
    customAttribution: null
  });

  // 创建鹰眼图
  const minimap = new mapboxgl.Map({
    container: 'minimap',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: map.getCenter(),
    zoom: map.getZoom() - 4,
    attributionControl: false,
    interactive: false  // 禁用交互
  });

  // 同步主地图和鹰眼图
  map.on('move', () => {
    minimap.setCenter(map.getCenter());
  });

  map.on('zoom', () => {
    minimap.setZoom(map.getZoom() - 4);
  });

  // 添加鹰眼图边框
  map.on('load', () => {
    minimap.addSource('bbox', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[]]
        }
      }
    });

    minimap.addLayer({
      id: 'bbox',
      type: 'line',
      source: 'bbox',
      paint: {
        'line-color': '#ffffff',
        'line-width': 2
      }
    });

    // 更新鹰眼图边框
    const updateBbox = () => {
      const bounds = map.getBounds();
      const bbox = {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [bounds.getWest(), bounds.getNorth()],
            [bounds.getEast(), bounds.getNorth()],
            [bounds.getEast(), bounds.getSouth()],
            [bounds.getWest(), bounds.getSouth()],
            [bounds.getWest(), bounds.getNorth()]
          ]]
        }
      };
      minimap.getSource('bbox').setData(bbox);
    };

    map.on('move', updateBbox);
    updateBbox();
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

.minimap {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 200px;
  height: 150px;
  border: 2px solid #1a1f2e;
  border-radius: 4px;
  overflow: hidden;
  z-index: 1;
}

/* 隐藏所有 Mapbox 相关标识 */
:global(.mapboxgl-control-container) {
  display: none !important;
}

.container {
  position: fixed;
  top:60px;  /* 距离顶部留出一定空间 */
  right: 20px;  /* 与鹰眼图保持相同的右侧间距 */
  z-index: 2;
}

.custom-container {
  background-color: rgba(26, 31, 46, 0.8);
  border-radius: 6px;
  width: 350px;  /* 固定宽度 */
  height: 480px;  
  overflow: auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.control-header {
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.control-header h3 {
  color: #fff;
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: normal;
}

.event-select {
  width: 100%;
}

:deep(.el-select) {
  width: 100%;
}

:deep(.el-select .el-input__wrapper) {
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

:deep(.el-select .el-input__wrapper:hover) {
  border-color: rgba(255, 255, 255, 0.3);
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: none !important;
  border-color: var(--el-color-primary) !important;
}

:deep(.el-select .el-input__inner) {
  color: #fff;
}

:deep(.el-select .el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.5);
}

.button-group {
  padding: 15px;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.control-button {
  flex: 1;
  background-color: rgba(64, 158, 255, 0.1);
  border: 1px solid rgba(64, 158, 255, 0.2);
  color: #fff;
}

.control-button:hover {
  background-color: rgba(64, 158, 255, 0.2);
  border-color: rgba(64, 158, 255, 0.3);
}

.log-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 15px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  overflow: hidden;
}

.log-header {
  padding: 10px 15px;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.log-header span {
  color: #fff;
  font-size: 14px;
}

.log-content {
  flex: 1;
  padding: 10px;
  color: #409EFF;
  font-family: monospace;
  font-size: 13px;
  overflow-y: auto;
}

/* 自定义滚动条样式 */
.log-content::-webkit-scrollbar {
  width: 6px;
}

.log-content::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.log-content::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.1);
}

/* 时间控制条样式 */
.timeline-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  background: rgba(14, 22, 33, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 12px 20px;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
}

.timeline-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 0;
}

.timeline-time {
  color: #fff;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 2px 8px;
  min-width: 180px;
}

.timeline-slider {
  flex: 1;
  margin: 0;
}

:deep(.el-slider__runway) {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin: 0;
}

:deep(.el-slider__bar) {
  height: 4px;
  background: linear-gradient(90deg, #409EFF, #36D1DC);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(64, 158, 255, 0.3);
}

:deep(.el-slider__button-wrapper) {
  top: -7px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.el-slider__button) {
  width: 18px;
  height: 18px;
  border: 2px solid #fff;
  background: #409EFF;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s;
}

:deep(.el-slider__button:hover) {
  transform: scale(1.1);
  background: #36D1DC;
}

:deep(.el-button-group) {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 3px;
  display: flex;
  gap: 2px;
}

:deep(.el-button--small) {
  height: 28px;
  width: 28px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #fff;
}

:deep(.el-button--small:hover) {
  background: rgba(64, 158, 255, 0.2);
  color: #409EFF;
}

:deep(.el-button--small i) {
  font-size: 16px;
}

/* 隐藏 tooltip */
:deep(.el-slider__input) {
  display: none;
}
</style>