<!-- 动态组件，根据path类型，创建对应组件 -->
<script setup lang="ts">
import { isHyperlink } from '@/utils/validate';

const props = defineProps({
  path: {
    type: String,
    required: true
  }
});

const componentName = computed(() => {
  if (isHyperlink(props.path)) return 'a';
  else return 'router-link';
});

const linkProps = (to: string) => {
  if (isHyperlink(to)) return { href: to, target: '_blank', rel: 'noopener' };
  return { to };
};
</script>

<template>
  <component :is="componentName" v-bind="linkProps(path)"><slot /></component>
</template>
