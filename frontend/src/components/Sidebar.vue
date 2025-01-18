<template>
  <div class="ds-sidebar" :class="{ collapsed: isCollapsed }">
    <h1 class="ds-title" :class="{ 'title-collapsed': isCollapsed }">军舆纵横</h1>
    <button class="ds-collapse-btn" @click="toggleCollapse">
      <span class="ds-collapse-icon">{{ isCollapsed ? '⟩' : '⟨' }}</span>
    </button>
    <nav class="ds-nav-menu">
      <ul>
        <li v-for="item in menuItems" :key="item.id">
          <router-link :to="item.route" class="ds-nav-item">
            <img :src="item.icon" :alt="item.text" class="ds-nav-icon">
            <span class="ds-nav-text">{{ item.text }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import icon1 from '../assets/1.ico'
import icon2 from '../assets/2.ico'
import icon3 from '../assets/3.ico'
import icon4 from '../assets/4.ico'
import icon5 from '../assets/5.ico'
import icon6 from '../assets/6.ico'
import icon7 from '../assets/7.ico'
import icon8 from '../assets/8.ico'

const emit = defineEmits<{
  (e: 'collapse-change', collapsed: boolean): void
}>()

const isCollapsed = ref(false)

watch(isCollapsed, (newValue) => {
  emit('collapse-change', newValue)
})

const menuItems = ref([
  { id: 1, text: '仿真推演', icon: icon1, route: '/simulation' },
  { id: 2, text: '实时对抗', icon: icon2, route: '/real-time-combat' },
  { id: 3, text: '数字战场图谱', icon: icon3, route: '/battlefield-map' },
  { id: 4, text: '战略博弈分析', icon: icon4, route: '/strategic-analysis' },
  { id: 5, text: '战场联合情报', icon: icon5, route: '/joint-intelligence' },
  { id: 6, text: '防务智库', icon: icon6, route: '/defense-think-tank' },
  { id: 7, text: '智能参谋', icon: icon7, route: '/intelligent-staff' },
  { id: 8, text: '信息交流中心', icon: icon8, route: '/information-center' }
])

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script> 

<style scoped>
.ds-sidebar {
  width: var(--ds-sidebar-width);
  background: #1a1f2e;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  height: calc(100vh - 40px);
  position: fixed;
  left: 0;
  top: 40px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.ds-sidebar.collapsed {
  width: var(--ds-sidebar-collapsed-width);
}

.ds-collapse-btn {
  position: absolute;
  right: -16px;
  bottom: 20px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: #1a1f2e;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 1001;
  font-size: 16px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.ds-collapse-btn:hover {
  background: #2a3142;
  transform: scale(1.1);
}

.ds-collapse-icon {
  display: inline-block;
  line-height: 1;
}

.ds-nav-menu {
  flex: 1;
  overflow-y: auto;
}

.ds-nav-menu::-webkit-scrollbar {
  width: 4px;
}

.ds-nav-menu::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.ds-nav-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ds-nav-item {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  gap: 16px;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.ds-nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-left: 3px solid #4A90E2;
}

.ds-nav-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.ds-nav-item:hover .ds-nav-icon {
  opacity: 1;
  transform: scale(1.1);
}

.ds-nav-text {
  font-size: 14px;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.ds-sidebar.collapsed .ds-nav-text {
  display: none;
}

/* 添加滚动条美化 */
.ds-nav-menu {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.ds-title {
  color: #fff;
  text-align: center;
  padding: 20px 0;
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.title-collapsed {
  font-size: 0;
  padding: 0;
  height: 0;
  overflow: hidden;
  border: none;
} 
</style>
