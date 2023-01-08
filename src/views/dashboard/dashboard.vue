<!-- 首页 -->
<script setup lang="ts"></script>

<template>
  <div class="container">首页</div>
  <p style="height: 100px; margin-bottom: 10px; background-color: red" v-for="item in 10">
    {{ item }}
  </p>
</template>

<style lang="scss" scoped></style>
