<!-- 分页 -->
<script setup lang="ts">
import type { TablePagination } from '../tableBox';

const props = defineProps<{ pagination: TablePagination }>();

const paginationDefaultConfig = {
  total: 0, // 总条目数
  currentPage: 1, // 当前页数
  pageSize: 10, // 每页显示条目个数
  pageSizes: [10, 20, 50, 100, 200, 500], // 每页显示个数选择器的选项设置
  pagerCount: 5, // 页码按钮的数量，当总页数超过该值时会折叠
  layout: 'total,sizes,prev,pager,next,jumper,slot', // 组件布局
  prevText: '', // 替代图标显示的上一页文字
  nextText: '', // 替代图标显示的下一页文字
  small: false,
  disabled: false // 是否禁用
};
const paginationApplyConfig = computed(() => {
  return { ...paginationDefaultConfig, ...props.pagination };
});
</script>

<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :disabled="paginationApplyConfig.disabled"
    background
    :total="paginationApplyConfig.total"
    :current-page.sync="paginationApplyConfig.currentPage"
    :page-size.sync="paginationApplyConfig.pageSize"
    :page-sizes="paginationApplyConfig.pageSizes"
    :pager-count="paginationApplyConfig.pagerCount"
    :layout="paginationApplyConfig.layout"
    :prev-text="paginationApplyConfig.prevText"
    :next-text="paginationApplyConfig.nextText"
    :small="paginationApplyConfig.small"
  >
    <slot />
  </el-pagination>
</template>

<style lang="scss" scoped></style>
