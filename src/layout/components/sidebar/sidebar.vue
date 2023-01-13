<!-- 侧栏菜单 -->
<script setup lang="ts">
import appSetting from '@/config/setting';
import { useAppStore } from '@/stores/modules/app';
import { useUserStore } from '@/stores/modules/user';
import sidebarMenu from '@/config/sidebar-menu';
import { filterMenu } from '@/utils/sidebar-menu';
import layoutVar from '@/layout/styles/variable.module.scss';

import SidebarItem from './components/SidebarItem.vue';

const { sidebarOpen } = storeToRefs(useAppStore());
const { userRoles } = storeToRefs(useUserStore());

const finallySidebarMenu = filterMenu(sidebarMenu, userRoles.value);
const layoutCssVar = computed(() => layoutVar);
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-nav">
      <!-- <LemonIcon name="icon-Vue" size="30"></LemonIcon> -->
      <span v-show="sidebarOpen" class="sidebar-nav-title line-1">{{ appSetting.siteTitle }}</span>
    </div>
    <el-scrollbar>
      <el-menu
        :default-active="finallySidebarMenu"
        :collapse="!sidebarOpen"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="subMenu in finallySidebarMenu"
          :key="subMenu.index"
          :sub-menu="subMenu"
        />
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
      .el-menu-item {
        // 无子菜单的样式
        color: #fff;
        margin-bottom: 5px;
        &:hover {
          background-color: $menuActiveColor;
          border-radius: 5px;
        }
        &.is-active {
          background-color: $menuActiveColor !important;
          border-radius: 5px;
        }
      }
      .el-sub-menu {
        margin-bottom: 5px;
        .el-sub-menu__title {
          // 有子菜单的样式
          color: #fff;
          &:hover {
            background-color: $menuActiveColor !important;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>
