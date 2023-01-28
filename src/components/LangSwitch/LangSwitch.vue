<!-- 语言切换 -->
<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app';
const appStore = useAppStore();
const handleCommand = (command: string) => {
  if (command !== appStore.language) {
    appStore.toggleLanguage(command);
  }
};
</script>

<template>
  <el-dropdown @command="handleCommand">
    <LemonIcon name="icon-language" size="22"></LemonIcon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh">简体中文</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped></style>
