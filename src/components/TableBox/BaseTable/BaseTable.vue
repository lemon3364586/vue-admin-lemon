<script setup lang="ts">
import type { TablePropsType, TableConfigType } from '../tableBox';

const props = defineProps<TablePropsType>();

// 表格非必要配置项默认配置
const defaultTableConfig = {
  refName: 'RefBaseTable',
  stripe: true,
  selection: false
} as TableConfigType as any;
// 表格非必要配置项最终应用配置
const tableApplyConfig = computed(() => {
  return { ...defaultTableConfig, ...props.tableConfig };
});
</script>

<template>
  <el-table
    :ref="defaultTableConfig.refName"
    :data="tableData"
    :height="tableApplyConfig.height"
    :max-height="tableApplyConfig.maxHeight"
    :stripe="tableApplyConfig.stripe"
    :border="tableApplyConfig.border"
    :size="tableApplyConfig.size"
    :highlight-current-row="tableApplyConfig.highlightCurrentRow"
    :style="tableApplyConfig.style"
    :cell-style="tableApplyConfig.cellStyle"
    :header-cell-style="tableApplyConfig.headerCellStyle"
    @submit.prevent
    @select="$emit('select', $event)"
    @select-all="$emit('select-all', $event)"
    @selection-change="$emit('selection-change', $event)"
    @row-click="$emit('row-click', $event)"
  >
    <slot />
  </el-table>
</template>

<style lang="scss" scoped></style>
