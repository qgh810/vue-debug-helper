<template>
  <div class="debug-helper-root">
    <ControlBoard/>
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
