<script setup lang="ts">
import type { TableColumn, TableConfigType } from '../tableBox';

const props = defineProps<{
  /** 表格数据 */
  tableData: Array<any>;
  /** 表格数据渲染配置(列数据) */
  tableHeader: Array<TableColumn>;
  /** 表格非必要配置项 */
  tableConfig?: TableConfigType;
}>();

// 表格非必要配置项默认配置
const tableDefaultConfig: TableConfigType = {
  refName: 'RefBaseTable',
  stripe: true,
  selection: false
};
// 表格非必要配置项最终应用配置
const tableApplyConfig = computed(() => {
  return { ...tableDefaultConfig, ...props.tableConfig };
});
</script>

<template>
  <el-table
    :ref="tableApplyConfig.refName"
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
