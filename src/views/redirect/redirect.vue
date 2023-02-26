<!-- 重定向到指定(传入路由path)页面，变相实现刷新，由此刷新页面，执行页面钩子 -->
<script setup lang="ts">
// 获取路径及参数
const { params, query } = useRoute();
const { path } = params;
// 跳转
const $router = useRouter();
$router.replace({ path: `/${path}`, query });
</script>
