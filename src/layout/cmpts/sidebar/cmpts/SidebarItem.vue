<!-- 子菜单 -->
<script setup lang="ts">
import AppLink from './AppLink.vue';

defineProps({
  subMenu: {
    type: Object,
    required: true
  }
});

// 判断是否有子菜单
function hasChildren(item) {
  return item.children && item.children.length > 0;
}
</script>

<template>
  <!-- 有子菜单 -->
  <template v-if="hasChildren(subMenu)">
    <el-sub-menu :index="subMenu.path">
      <template #title>
        <!-- <LemonIcon v-if="subMenu.icon" :name="subMenu.icon" color="#fff"></LemonIcon> -->
        <span class="title line-1">{{ subMenu.title }}</span>
      </template>
      <!-- 递归调用，生成子菜单 -->
      <SidebarItem
        v-for="childItem in subMenu.children"
        :key="childItem.path"
        :sub-menu="childItem"
      ></SidebarItem>
    </el-sub-menu>
  </template>
  <!-- 无子菜单 -->
  <template v-else>
    <AppLink :path="subMenu.path">
      <el-menu-item :index="subMenu.path">
        <!-- <LemonIcon v-if="subMenu.icon" :name="subMenu.icon" color="#fff"></LemonIcon> -->
        <span class="title line-1">{{ subMenu.title }}</span>
      </el-menu-item>
    </AppLink>
  </template>
</template>

<style lang="scss" scoped>
.title {
  margin-left: 5px;
  width: 80%;
}
</style>
