<!-- 403 -->
<script setup lang="ts">
function randomNum() {
  return Math.floor(Math.random() * 9) + 1;
}
let i: number = 0;

const first = ref(0);
const loop1 = setInterval(() => {
  if (i > 30) {
    clearInterval(loop1);
    first.value = 4;
  } else {
    first.value = randomNum();
    i++;
  }
}, 50);

const second = ref(0);
const loop2 = setInterval(() => {
  if (i > 50) {
    clearInterval(loop2);
    second.value = 0;
  } else {
    second.value = randomNum();
    i++;
  }
}, 50);

const third = ref(0);
const loop3 = setInterval(() => {
  if (i > 60) {
    clearInterval(loop3);
    third.value = 3;
  } else {
    third.value = randomNum();
    i++;
  }
}, 50);

const jumpTime = ref(10);
const router = useRouter();
const jumpTimer = setInterval(() => {
  if (jumpTime.value) {
    jumpTime.value--;
  } else {
    backLast();
    clearInterval(jumpTimer);
  }
}, 1000);
function backLast() {
  router.go(-1);
}

onBeforeUnmount(() => {
  clearInterval(loop1);
  clearInterval(loop2);
  clearInterval(loop3);
  clearInterval(jumpTimer);
});
</script>

<template>
  <div class="error">
    <div class="error-num">
      <div class="first">
        <span>{{ first }}</span>
      </div>
      <div class="second">
        <span>{{ second }}</span>
      </div>
      <div class="third">
        <span>{{ third }}</span>
      </div>
    </div>
    <div class="error-text">
      <div class="error-text-tips1">抱歉!</div>
      <div class="error-text-tips2">您没有操作权限…</div>
      <div class="error-text-tips3">当前帐号没有操作权限,请联系管理员</div>
      <div @click="backLast" class="error-text-tips4">{{ jumpTime }}s 返回</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &-num {
    display: flex;
    justify-content: center;
    align-items: center;
    & > div {
      background-color: $color-primary;
      color: #fff;
      font-size: 120px;
      font-weight: bold;
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
      border-radius: 50%;
    }
    .second {
      margin: 0 -30px;
    }
  }
  &-text {
    width: 340px;
    max-width: 100%;
    margin-left: 30px;
    &-tips1 {
      margin-bottom: 10px;
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: $color-primary;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &-tips2 {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: bold;
      line-height: 24px;
      color: #222;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 1s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &-tips3 {
      margin-bottom: 20px;
      font-size: 13px;
      line-height: 21px;
      color: $color-info;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 1s;
      animation-delay: 0.4s;
      animation-fill-mode: forwards;
    }
    &-tips4 {
      width: 120px;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      background: $color-primary;
      border-radius: 100px;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 1s;
      animation-delay: 0.6s;
      animation-fill-mode: forwards;
    }
  }
}
@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(60px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@media screen and (max-width: 750px) {
  .error {
    flex-direction: column;
    &-num {
      margin-bottom: 50px;
      & > div {
        font-size: 100px;
        width: 120px;
        height: 120px;
        line-height: 120px;
        border-radius: 50%;
      }
      .second {
        margin: 0 -20px;
      }
    }
  }
}
</style>
