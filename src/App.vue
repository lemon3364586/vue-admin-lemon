<script setup lang="ts">
import { useAppStore } from './stores/modules/app';
import { useElementPlusStore } from './stores/modules/element-plus';

import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import en from 'element-plus/dist/locale/en.mjs';

const { language } = storeToRefs(useAppStore());
const locale = computed(() => (language.value === 'zh' ? zhCn : en));

const { size, button, message, zIndex } = storeToRefs(useElementPlusStore());
</script>

<template>
  <el-config-provider :locale="locale" :size="size" :zIndex="zIndex" :button="button" :message="message">
    <RouterView />
  </el-config-provider>
</template>
