<!-- 注册表单 -->
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { useI18n } from 'vue-i18n';

defineEmits(['toggle']);

const { t } = useI18n();

const registerFormRef = ref<FormInstance>();
const registerForm = reactive({
  username: '',
  password: '',
  password2: '',
  mobile: '',
  smsCode: ''
});
const registerRules = reactive<FormRules>({
  username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度 6 到 20 个字符', trigger: 'blur' }
  ]
});
function handleRegister(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
}

const registerRef = ref();
const formMarginTop = ref(null);
function computedStyle() {
  let clientHeight = document.documentElement.clientHeight;
  let loginRefHeight = registerRef.value.offsetHeight;
  formMarginTop.value = `${(clientHeight - loginRefHeight) / 2}px`;
}

const loadTime = ref(0);
function countdown(time: number) {
  loadTime.value = time;
  let timer = setInterval(() => {
    if (loadTime.value > 0) {
      loadTime.value--;
    } else {
      clearInterval(timer);
    }
  }, 1000);
}
function sendCode() {
  countdown(60);
}

onMounted(() => {
  computedStyle();
});
</script>

<template>
  <div ref="registerRef" class="register-form">
    <div class="register-form-title">{{ t('registerForm.title') }}</div>
    <el-form
      ref="registerFormRef"
      :model="registerForm"
      :rules="registerRules"
      size="large"
      label-width="100"
      label-position="left"
    >
      <el-form-item :label="t('registerForm.form.username')" prop="username">
        <el-input
          v-model.trim="registerForm.username"
          class="register-input"
          :placeholder="t('registerForm.form.userPlac')"
          type="text"
          clearable
        />
      </el-form-item>
      <el-form-item :label="t('registerForm.form.password')" prop="password">
        <el-input
          v-model="registerForm.password"
          class="register-input"
          type="password"
          :show-password="true"
          :placeholder="t('registerForm.form.passPlac')"
          clearable
        />
      </el-form-item>
      <el-form-item :label="t('registerForm.form.password2')" prop="password">
        <el-input
          v-model="registerForm.password2"
          class="register-input"
          type="password"
          :show-password="true"
          :placeholder="t('registerForm.form.passPlac2')"
          clearable
        />
      </el-form-item>
      <el-form-item :label="t('registerForm.form.mobile')" prop="password">
        <el-input
          v-model="registerForm.mobile"
          class="register-input"
          type="password"
          :show-password="true"
          :placeholder="t('registerForm.form.mobilePlac')"
          clearable
        />
      </el-form-item>
      <el-form-item :label="t('registerForm.form.smsCode')" prop="password">
        <el-input
          v-model="registerForm.smsCode"
          class="register-input"
          type="password"
          :show-password="true"
          :placeholder="t('registerForm.form.smsCodePlac')"
          clearable
        >
          <template #append class="await-send">
            <el-button :disabled="loadTime > 0" @click="sendCode">
              {{
                loadTime > 0
                  ? `${t('registerForm.form.getSmdCodeAgain')} ${loadTime}s`
                  : t('registerForm.form.getSmdCode')
              }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <div style="margin-top: 30px">
        <el-button class="register-btn" type="primary" @click="handleRegister(registerFormRef)">
          {{ t('registerForm.register') }}
        </el-button>
        <br />
        <el-button class="login-btn" type="default" @click="$emit('toggle', 'LoginForm')">
          {{ t('registerForm.login') }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.register-form {
  background-color: rgba($color: #fff, $alpha: 0.75);
  width: 95%;
  max-width: 550px;
  padding: 10px 20px 30px;
  border-radius: 5px;
  margin: v-bind('formMarginTop') auto 0;
  &-title {
    line-height: 50px;
    font-size: 24px;
    font-weight: bold;
    color: rgba(14, 18, 26, 1);
    text-align: center;
  }

  :deep(.el-input-group__append) {
    .el-button {
      padding: 0 10px;
      background-color: var(--el-color-primary);
      color: #fff;
      font-size: 13px;
      box-shadow: 0 1px 0 0 var(--el-color-primary) inset, 0 -1px 0 0 var(--el-color-primary) inset,
        -1px 0 0 0 var(--el-color-primary) inset;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .is-disabled {
      background-color: var(--el-fill-color-light);
      color: var(--el-color-info);
      border: 1px var(--el-input-border-color) solid;
      border-left: none;
      box-shadow: 0 1px 0 0 var(--el-fill-color-light) inset,
        0 -1px 0 0 var(--el-fill-color-light) inset, -1px 0 0 0 var(--el-fill-color-light) inset;
    }
  }
}

.register-btn,
.login-btn {
  width: 100%;
  height: 40px;
  font-size: 16px;
  display: block;
}
</style>
