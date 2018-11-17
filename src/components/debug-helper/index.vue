<template>
  <div class="debug-helper-root">
    <ControlBoard>
      <div class="button" slot="button1">11</div>
      <div class="button" slot="button2">22</div>
      <div class="button" slot="button3">33</div>
      <div class="button" slot="button4">44</div>
    </ControlBoard>
  </div>
</template>

<script>
import ControlBoard from './components/control-board'

export default {
  name: 'DebugHelper',

  components: {
    ControlBoard
  }
}
</script>

<style scoped>
.debug-helper-root {
  position: fixed;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  z-index: 100000000;
}
</style>
