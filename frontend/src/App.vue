<template>
  <div class="container">
    <Sidebar @collapse-change="handleSidebarCollapse" />
    <div class="main-content" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <TabBar />
      <div class="view-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import TabBar from './components/TabBar.vue'

const isSidebarCollapsed = ref(false)

const handleSidebarCollapse = (collapsed: boolean) => {
  isSidebarCollapsed.value = collapsed
}
</script>

<style>
.container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: var(--ds-sidebar-width);
  transition: margin-left 0.3s ease;
  background: var(--background-color);
  display: flex;
  flex-direction: column;
}

.main-content.sidebar-collapsed {
  margin-left: var(--ds-sidebar-collapsed-width);
}

.view-container {
  flex: 1;
  padding: 20px;
  overflow: auto;
}
</style>
