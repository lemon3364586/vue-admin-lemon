<!-- 侧栏菜单 -->
<script setup lang="ts">

</script>

<template>
  <div class="sidebar-container"></div>
</template>

<style lang="scss" scoped>
@import '@/layout/styles/variable.scss';

.sidebar-container {
  background-color: $menuBgColor;
  width: $sidebarWidth;
  padding-left: 10px;
  transition: width 500 ease-in;
}
</style>
