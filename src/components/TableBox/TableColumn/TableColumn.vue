<!-- 表格列 -->
<script setup lang="ts">
import type { TableColumn } from '../tableBox';

defineProps<{ columnData: TableColumn }>();
</script>

<template>
  <!-- 默认 -->
  <el-table-column
    v-if="!columnData.slot"
    :prop="columnData.prop"
    :label="columnData.label"
    :width="columnData.width"
    :min-width="columnData.minWidth"
    :show-overflow-tooltip="columnData.tooltip"
    :align="columnData.align"
    :fixed="columnData.fixed"
    :resizable="columnData.resizable"
    :formatter="columnData.formatter"
  />
  <!-- 自定义内容 -->
  <el-table-column
    v-else
    :prop="columnData.prop"
    :label="columnData.label"
    :width="columnData.width"
    :min-width="columnData.minWidth"
    :show-overflow-tooltip="columnData.tooltip"
    :align="columnData.align"
    :fixed="columnData.fixed"
    :resizable="columnData.resizable"
    :formatter="columnData.formatter"
  >
    <!-- 自定义表头插槽 -->
    <template #header="scope">
      <slot :name="`${columnData.prop}_header`" :column="scope.column">{{ columnData.label }}</slot>
    </template>
    <!-- 自定义行内容插槽 -->
    <template #default="scope">
      <slot :name="columnData.prop" :row="scope.row" :column="scope.column" :index="scope.$index" />
    </template>
  </el-table-column>
</template>

<style lang="scss" scoped></style>
