<!-- 分页 -->
<script setup lang="ts">
import type { TablePagination } from '../tableBox';

const props = defineProps<{
  /** 总条目数 */
  total: number;
  /** 当前页数 */
  currentPage: number;
  /** 每页显示条目个数 */
  pageSize?: number;
  /** 非必要配置 */
  paginationConfig?: TablePagination;
}>();

// 分页非必要配置项默认配置
const paginationDefaultConfig: TablePagination = {
  pageSizes: [10, 20, 50, 100, 200, 500], // 每页显示个数选择器的选项设置
  pagerCount: 5, // 页码按钮的数量，当总页数超过该值时会折叠
  layout: 'total,sizes,prev,pager,next,jumper,slot' // 组件布局
};
// 分页非必要配置项最终应用配置
const paginationApplyConfig = computed(() => {
  return { ...paginationDefaultConfig, ...props.paginationConfig };
});

// https://element-plus.gitee.io/zh-CN/component/pagination.html#%E4%BA%8B%E4%BB%B6
// 由于官网文档说原本的页数和条目数修改事件在以后的版本中将会被删除，所以采取 computed 监听，向父组件推送相应事件
const emit = defineEmits(['reloadData']);
const computedCurrentPage = computed({
  get: () => props.currentPage,
  set: (newCurrentPage) => emit('reloadData', 'currentPage', newCurrentPage)
});
const computedPageSize = computed({
  get: () => props.pageSize || 10,
  set: (newPageSize) => emit('reloadData', 'pageSize', newPageSize)
});
</script>

<template>
  <el-pagination
    v-model:page-size="computedPageSize"
    v-model:current-page="computedCurrentPage"
    :disabled="paginationApplyConfig.disabled"
    background
    :total="total"
    :page-sizes="paginationApplyConfig.pageSizes"
    :pager-count="paginationApplyConfig.pagerCount"
    :layout="paginationApplyConfig.layout"
    :small="paginationApplyConfig.small"
  >
    <slot />
  </el-pagination>
</template>
