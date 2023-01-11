<!-- 侧栏菜单 -->
<script setup lang="ts">
import appSetting from '@/setting';
import { useAppStore } from '@/stores/modules/app';
import { useUserStore } from '@/stores/modules/user';
import layoutVar from '@/layout/styles/variable.scss';

const { sidebarOpen } = storeToRefs(useAppStore());
const { getUserRoutes } = useUserStore();


const allActiveRoutes = computed(() => {
  return getUserRoutes;
});
</script>

<template>
  <div class="sidebar">
    <div class="siderbar-nav">
      <!-- <LemonIcon name="icon-Vue" size="30"></LemonIcon> -->
      <span v-show="sidebarOpen" class="title line-1">{{ appSetting.siteTitle }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/layout/styles/variable.scss';

.sidebar {
  background-color: $menuBgColor;
  width: $sidebarWidth;
  padding-left: 10px;
  transition: width 500 ease-in;
}
</style>
