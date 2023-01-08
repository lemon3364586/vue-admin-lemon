<!-- 登录表单 -->
<script setup lang="ts">
import appSetting from '@/setting
import { Base64 } from '@/plugins/crypto-js';
import { ElMessageBox } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import useAdminStore from '@/stores/modules/admin';

defineEmits(['toggle']);

const { t } = useI18n();
const { adminLogin } = useAdminStore();

let redirect: string | string[];
const $router = useRouter();
watch(
  () => $router.currentRoute.value,
  () => {
    const { query } = $router.currentRoute.value;
    if (query.redirect) redirect = query.redirect;
  },
  { immediate: true }
);

const timeText = computed(() => {
  const hour = new Date().getHours();
  if (hour < 4 || hour > 19) return t('loginForm.timeText.evening');
  else if (hour < 12) return t('loginForm.timeText.morning');
  else return t('loginForm.timeText.afternoon');
});

const loginRef = ref();
const formMarginTop = ref(null);
function computedStyle() {
  let clientHeight = document.documentElement.clientHeight;
  let loginRefHeight = loginRef.value.offsetHeight;
  formMarginTop.value = `${(clientHeight - loginRefHeight) / 2}px`;
}

const remember = ref(false); // 记住密码
function rememberChange() {
  if (!window.localStorage) {
    ElMessageBox.confirm('当前浏览器不支持记住密码', '提示', {
      showCancelButton: false,
      type: 'error'
    }).then(() => {
      remember.value = !remember;
    });
  }
}
function saveLoginUser(user) {
  // 记住密码
  const rememberData = {
    username: Base64.encode(user.username),
    password: Base64.encode(user.password)
  };
  localStorage.setItem('loginUser', JSON.stringify(rememberData));
}
function getLoginUser() {
  // 浏览器有记住密码
  if (localStorage && localStorage.getItem('loginUser')) {
    let user = JSON.parse(localStorage.getItem('loginUser'));
    loginForm.username = Base64.decode(user.username);
    loginForm.password = Base64.decode(user.password);
    remember.value = true;
  }
}

const loginLoading = ref(false);
const loginFormRef = ref<FormInstance>();
const loginForm = reactive({
  username: '',
  password: ''
});
const loginRules = reactive<FormRules>({
  username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 20, message: '密码长度 5 到 20 个字符', trigger: 'blur' }
  ]
});
function handleLogin(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (!valid) return false;
    loginLoading.value = true;
    await adminLogin(loginForm);
    loginLoading.value = false;
    if (!remember.value) localStorage.removeItem('loginUser');
    else saveLoginUser(loginForm);
    $router.replace(this.redirect || '/dashboard');
  });
}

onMounted(() => {
  computedStyle();
  getLoginUser();
});
</script>

<template>
  <div ref="loginRef" class="login-form">
    <div class="switchLang"><LangSwitch></LangSwitch></div>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="100px"
      size="large"
    >
      <div class="login-form-title">Hello!</div>
      <div class="login-form-title-tips line-1">
        {{ timeText }}{{ t('loginForm.welcome') }}{{ appSetting.siteTitle }}
      </div>
      <el-form-item :label="t('loginForm.form.username')" prop="username">
        <el-input
          v-model="loginForm.username"
          :placeholder="t('loginForm.form.userPlac')"
          type="text"
          clearable
        />
      </el-form-item>
      <el-form-item :label="t('loginForm.form.password')" prop="password" class="m-b-10">
        <el-input
          v-model="loginForm.password"
          :placeholder="t('loginForm.form.passPlac')"
          type="password"
          show-password
          clearable
        />
      </el-form-item>
      <div class="handle-password p-l-5 p-r-5">
        <el-checkbox v-model="remember" @change="rememberChange">
          {{ t('loginForm.form.remenber') }}
        </el-checkbox>
        <span @click="$emit('toggle', 'ForgetForm')">{{ t('loginForm.form.forget') }}</span>
      </div>
      <div class="m-t-10">
        <el-button
          :loading="loginLoading"
          class="login-btn"
          type="primary"
          @click="handleLogin(loginFormRef)"
        >
          {{ loginLoading ? t('loginForm.form.loginLoading') : t('loginForm.form.login') }}
        </el-button>
        <br />
        <el-button class="register-btn" type="default" @click="$emit('toggle', 'RegisterForm')">
          {{ t('loginForm.form.register') }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.switchLang {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 30px;
}
.login-form {
  background-color: rgba($color: #fff, $alpha: 0.75);
  width: 95%;
  max-width: 550px;
  padding: 30px 20px;
  border-radius: 5px;
  margin: v-bind('formMarginTop') auto 0;
  &-title {
    font-size: 40px;
    font-weight: bold;
    color: rgba(14, 18, 26, 1);
    &-tips {
      margin: 10px 0 20px;
      font-size: 20px;
      color: rgba(14, 18, 26, 1);
    }
  }
}
.handle-password {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  & > span {
    color: #999;
  }
}
.login-btn,
.register-btn {
  width: 100%;
  height: 40px;
  font-size: 16px;
  display: block;
}
</style>
