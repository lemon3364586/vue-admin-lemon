<script setup lang="ts">
/**
 * 引入阿里 iconfont 图标
 * 此处因为只是一个demo，所以直接采取了在线引入的方式
 * 如果是实际项目开发过程中，还是下载iconfont包到本地更合适
 */
import remoteScript from '@/utils/remote-script';
import appSetting from '@/setting';
for (let link of appSetting.aliIcon) {
  remoteScript(link);
}

const props = defineProps({
  // 图标类名
  name: {
    type: String,
    requird: true
  },
  // 图标颜色
  color: String,
  // 字体大小，单位px
  size: {
    type: [Number, String],
    default: 16
  },
  // 图标透明度
  opacity: {
    type: Number,
    default: 1,
    validator(value) {
      return value >= 0 && value <= 1;
    }
  }
});
const svgStyle = computed(() => {
  return {
    width: `${props.size}px`,
    height: `${props.size}px`,
    verticalAlign: '-0.15em',
    fill: props.color,
    fillOpacity: props.opacity,
    overflow: 'hidden'
  };
});
</script>

<template>
  <div style="display: inline-block" @click="$emit('click')">
    <svg :style="svgStyle" class="svg-icon" aria-hidden="true">
      <use :xlink:href="`#${name}`"></use>
    </svg>
  </div>
</template>
