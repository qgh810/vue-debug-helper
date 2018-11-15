<template>
  <div class="debug-ball-component-root">
    <Ball @click="onBallClick"/>
    <BallControl :show="isShowControl"/>
    <!-- <Log v-show="isShowLog"/> -->
  </div>
</template>

<script>
import Ball from './ball'
import BallControl from './ball-control'
import Log from './log'
export default {
  name: 'DebugBallComponent',

  components: {
    Ball,
    Log,
    BallControl
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      isShowLog: true,
      isShowControl: false
    }
  },

  computed: {
  },

  mounted () {},

  methods: {
    onBallClick (params) {
      console.log('click', params.center)
    }
  }
}
</script>

<style scoped>
  /* .debug-ball-component-root {
    position: fixed;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    z-index: 10000000;
  } */
</style>
