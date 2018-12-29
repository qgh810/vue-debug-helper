<template>
  <div class="log-button-root">
    <div class="circular"></div>
    <div class="text">日志</div>
  </div>
</template>

<script>
export default {
  name: 'LogButton'
}
</script>

<style scoped>
.log-button-root {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
}
.circular {
  display: inline-block;
  width: 50%;
  height: 50%;
  background: #fff;
  border-radius: 50%;
  border: 1vw solid rgba(0,0,0,0.4);
  box-sizing: content-box;
}
.text {
  color: #fff;
  font-size: 3vw;
}
</style>
