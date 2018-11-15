<template>
  <div class="ball-control-root" :style="rootStyle" v-if="isOpen">
    <div class="ball-control">
      <div class="control-btn" :style="getBtnStyle(0)">home</div>
      <div class="control-btn" :style="getBtnStyle(1)">home</div>
    </div>
  </div>
</template>

<script>
const BTN_POSITION = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0]
]
export default {
  name: 'BallControl',

  props: {
    show: {
      default: false
    },
    startSize: {
      type: Object,
      default () {
        return {
          width: 0,
          height: 0
        }
      }
    },
    startCenterPosition: {
      type: Object,
      default () {
        return {
          left: 10,
          top: 20
        }
      }
    }
  },

  data () {
    return {
      isOpen: false,
      containerSize: {
        width: 0,
        height: 0
      },
      position: {
        left: 0,
        top: 0
      }
    }
  },

  computed: {
    rootStyle () {
      return {
        left: this.left + 'px',
        top: this.top + 'px'
      }
    }
  },

  watch: {
    show (show) {
      if (show) {
        this.open()
      } else {
        this.close()
      }
    }
  },

  mounted () {
    this.getContainerSize()
  },

  methods: {
    open () {
      this.position = {
        left: this.containerSize.width / 2,
        top: this.containerSize.width / 2
      }
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    },
    getContainerSize () {
      const {innerWidth, innerHeight} = window
      this.containerSize = {width: innerWidth, height: innerHeight}
    },

    getBtnStyle (index) {
      const unit = this.isOpen ? 20 : 0
      return {
        transform: `translate(${BTN_POSITION[index][0] * unit}vw, ${BTN_POSITION[index][1] * unit}vw)`
      }
    }
  }

}
</script>

<style scoped>
.ball-control-root {
  position: fixed;
  width: 100%;
  height: 0;
  transition: all ease 0.3s;
}
.ball-control {
  position: absolute;
  left: -30vw;
  top: -30vw;
  width: 60vw;
  height: 60vw;
  background: rgba(0,0,0,0.7);
  border-radius: 2.5vw;
}

.control-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -10vw;
  margin-top: -10vw;
  width: 20vw;
  height: 20vw;
  transition: all ease 0.3s;
  text-align: center;
  color: #fff;
}

</style>
