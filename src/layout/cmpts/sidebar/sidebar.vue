<!-- 侧栏菜单 -->
<script setup lang="ts">
import SidebarItem from './cmpts/SidebarItem.vue';

import appSetting from '@/setting';
import { useAppStore } from '@/stores/modules/app';
import { useRouteStore } from '@/stores/modules/route';

const { sidebarOpen } = storeToRefs(useAppStore());
const { sidebarMenu } = storeToRefs(useRouteStore());

// 从后端获取用户菜单列表

// 获取当前激活路由，设置为菜单激活项
const activeMenu = computed(() => {
  const { path } = useRoute();
  return path.substring(1);
});
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-nav">
      <!-- <LemonIcon name="icon-Vue" size="30"></LemonIcon> -->
      <span v-show="sidebarOpen" class="sidebar-nav-title line-1">{{ appSetting.siteTitle }}</span>
    </div>
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="!sidebarOpen"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem v-for="subMenu in sidebarMenu" :key="subMenu.path" :sub-menu="subMenu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
@import '@/layout/styles/variable.module.scss';

.sidebar {
  background-color: $menuBgColor;
  width: $sidebarWidth;
  transition: width 500 ease-in;
  &-nav {
    // background-color: $color-danger;
    height: $headerHeight;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #666;
    margin: 0 10px;
    &-title {
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      margin: 0 5px;
    }
  }
  .el-scrollbar {
    height: calc(100vh - $headerHeight);
    padding: 0 5px;
    :deep() .el-menu {
      background-color: $menuBgColor;
      border: none;
      height: 100%;
      width: 100%;
      .el-sub-menu {
        // 有子菜单
        margin: 5px 0;
        .el-sub-menu__title {
          color: #fff;
          &:hover {
            background-color: $menuActiveColor !important;
            border-radius: 5px;
          }
        }
      }
      // 无子菜单
      .el-menu-item {
        color: #fff;
        margin: 5px 0;
        &:hover {
          background-color: $menuActiveColor;
          border-radius: 5px;
        }
        &.is-active {
          background-color: $menuActiveColor !important;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
