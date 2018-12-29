<template>
  <div class="custom-button-root">
    <div class="circular"></div>
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: 'CustomButton',

  props: {
    text: {
      type: String,
      default: '自定义'
    }
  },

  methods: {
    onClick () {
      console.log('点了自定义按钮')
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.custom-button-root {
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
