<template>
  <div class="tab-bar">
    <div class="tabs">
      <div
        v-for="tab in tabs"
        :key="tab.path"
        class="tab"
        :class="{ active: currentPath === tab.path }"
        @click="switchTab(tab)"
      >
        <span class="tab-title">{{ getTabName(tab.name) }}</span>
        <span class="close-btn" @click.stop="closeTab(tab)">×</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface Tab {
  name: string
  path: string
}

const router = useRouter()
const route = useRoute()
const tabs = ref<Tab[]>([])
const currentPath = ref(route.path)

const tabNameMap: Record<string, string> = {
  'Simulation': '仿真推演',
  'BattlefieldMap': '数字战场图谱',
  'JointIntelligence': '战场联合情报',
  'InformationCenter': '信息交流中心',
  'DefenseThinkTank': '防务智库',
  'StrategicAnalysis': '战略博弈分析',
  'RealTimeCombat': '实时对抗',
  'IntelligentStaff': '智能参谋'
}

const getTabName = (name: string): string => {
  return tabNameMap[name] || name
}

// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    currentPath.value = newPath
    addTab({
      name: route.name as string,
      path: newPath
    })
  }
)

// 添加新标签
const addTab = (tab: Tab) => {
  if (!tabs.value.some(t => t.path === tab.path)) {
    tabs.value.push(tab)
  }
}

// 切换标签
const switchTab = (tab: Tab) => {
  router.push(tab.path)
}

// 关闭标签
const closeTab = (tab: Tab) => {
  const index = tabs.value.findIndex(t => t.path === tab.path)
  if (index !== -1) {
    tabs.value.splice(index, 1)
    if (currentPath.value === tab.path) {
      // 如果关闭的是当前标签，则跳转到最后一个标签
      if (tabs.value.length > 0) {
        const lastTab = tabs.value[tabs.value.length - 1]
        router.push(lastTab.path)
      } else {
        router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.tab-bar {
  background: #1a1f2e;
  padding: 4px 8px 2px 8px;
  height: 40px;
  flex-shrink: 0;
  transition: all 0.3s ease;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: flex-start;
}

.tabs {
  display: flex;
  height: 32px;
  overflow-x: auto;
  flex: 1;
  gap: 4px;
}

.tab {
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  background: #2a2f3e;
  color: #888;
  min-width: 140px;
  max-width: 240px;
  transition: all 0.3s ease;
  border-radius: 6px;
  font-size: 13px;
}

.tab:hover {
  background: #3a3f4e;
  color: #fff;
}

.tab.active {
  background: #ffffff;
  color: #000;
  font-weight: 500;
}

.tab-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.close-btn {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-left: 8px;
  font-size: 14px;
  opacity: 0.6;
  transition: all 0.2s;
  line-height: 1;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  opacity: 1;
}

.tabs::-webkit-scrollbar {
  height: 0;
  width: 0;
  display: none;
}
</style> 