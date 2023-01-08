<!-- 登录 -->
<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app';

const appStore = useAppStore();
const isMobile = computed(() => appStore.device === 'desktop');

const componentName = ref('LoginForm');
const LoginForm = defineAsyncComponent(() => import('./components/LoginForm.vue'));
const RegisterForm = defineAsyncComponent(() => import('./components/RegisterForm.vue'));
const ForgetForm = defineAsyncComponent(() => import('./components/ForgetForm.vue'));
const componentList = { LoginForm, RegisterForm, ForgetForm };
function toggleComponent(name) {
  componentName.value = name;
}

const formWidth = computed(() => {
  let clientWidth = document.documentElement.clientWidth;
  return clientWidth > 750 ? `${clientWidth / 2}px` : '750px';
});
</script>

<template>
  <div class="login-container" :class="{ loginMobile: !isMobile }">
    <div class="form-container">
      <transition appear enter-active-class="animate__animated animate__backInLeft">
        <component @toggle="toggleComponent" :is="componentList[componentName]"></component>
        <!-- <div v-if="isLogin">
          <login-form @to-register="toRegister" v-focus></login-form>
        </div>
        <div v-else><register-form @to-login="toLogin"></register-form></div> -->
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/img/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  &.loginMobile {
    background-size: 100% 100%;
  }
}
.form-container {
  width: v-bind('formWidth');
  max-width: 100%;
  height: 100vh;
  position: absolute;
  right: 0;
}
</style>
