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
import '../css/slider.css'
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