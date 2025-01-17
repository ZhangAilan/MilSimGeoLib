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
  'JointIntelligence': '实时对抗',
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
  background: var(--background-color);
  border-bottom: 1px solid var(--border-color);
  padding: 8px 16px;
  overflow-x: auto;
}

.tabs {
  display: flex;
  height: 44px;
  align-items: center;
  gap: 8px;
}

.tab {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 36px;
  background: #2e3751;
  border-radius: 18px;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.tab:hover {
  background: #d88080;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.tab.active {
  background: #a82323;
  box-shadow: 0 2px 8px rgba(16, 86, 156, 0.2);
}

.tab-title {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-right: 8px;
  white-space: nowrap;
}

.close-btn {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.2s ease;
  line-height: 1;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
}

.tab:hover .close-btn {
  opacity: 1;
}
</style> 