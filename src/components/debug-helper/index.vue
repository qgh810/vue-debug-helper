<template>
  <div class="debug-helper-root">
    <ControlBoard>
      <LogButton slot="button1" @click.native="onClickButton1"></LogButton>
      <CustomButton slot="button2" @click.native="onClickButton2"></CustomButton>
      <CustomButton slot="button3" @click.native="onClickButton3"></CustomButton>
      <CustomButton slot="button4" @click.native="onClickButton4"></CustomButton>
    </ControlBoard>
  </div>
</template>

<script>
import ControlBoard from './components/control-board'
import LogButton from './components/log-button'
import CustomButton from './components/custom-button'
import vConsole from './utils/vconsole'

export default {
  name: 'DebugHelper',

  components: {
    ControlBoard,
    LogButton,
    CustomButton
  },

  data () {
    return {
      isShowLog: false
    }
  },

  methods: {
    onClickButton1 () {
      vConsole.show()
    },

    onClickButton2
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

<style>
#__vconsole .vc-switch {
  display: none !important;
}
</style>
