<!-- 页面布局 -->
<script setup lang="ts">
// import sidebar from './components/sidebar/sidebar.vue';
</script>

<template>
  <div class="home">
    <!-- <sidebar /> -->
    <RouterView />
  </div>
</template>

<style lang="scss">
@import '@/layout/styles/variable.module.scss';

.home {
  background-color: $homeBgColor;
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: $zIndex;
}
</style>
