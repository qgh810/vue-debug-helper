<template>
  <div
    v-if="mounted"
    class="control-board-root"
    :class="{active: isActive || isOpen, open: isOpen}"
    :style="rootStyle"
    @touchstart="onTouchStart"
    @touchend.stop="onTouchEnd"
    @touchmove="onTouchMove"
    @click="onClick"
    >
    <div class="content-box">
      <div class="open-button-box" :style="openButtonBoxStyle">
        <div
          class="open-button"
          v-for="n in 4"
          :key="n"
          :style="getSlotStyle(n)"
          @click.stop="onButtonClick">
            <slot :name="'button' + n"></slot>
          </div>
      </div>

      <transition name="default-button-fade">
        <div class="default-button" v-show="!isOpen" :style="defualtButtonStyle"></div>
      </transition>
    </div>
    </div>
</template>

<script>
import { getWindowSize, clone } from '../utils'

export default {
  name: 'ControlBoard',

  data () {
    return {
      mounted: false,
      isOpen: false,
      isActive: false,
      canTransition: true,
      draggable: false,
      windowSize: {
        width: 0,
        height: 0
      },
      lastPosition: {},
      position: {
        left: 0,
        top: 0
      }
    }
  },

  computed: {
    size () {
      return this.isOpen ? this.openSize : this.closeSize
    },

    openSize () {
      const size = this.windowSize.width * 0.6
      return {
        width: size,
        height: size
      }
    },
    closeSize () {
      const size = this.windowSize.width * 0.13
      return {
        width: size,
        height: size
      }
    },

    openPosition () {
      return {
        left: (this.windowSize.width - this.openSize.width) / 2,
        top: (this.windowSize.height - this.openSize.height) / 2
      }
    },

    rootStyle () {
      return {
        width: this.size.width + 'px',
        height: this.size.height + 'px',
        left: this.position.left + 'px',
        top: this.position.top + 'px',
        transitionDuration: (this.canTransition ? 0.4 : 0) + 's'
      }
    },

    defualtButtonStyle () {
      const size = this.closeSize.width
      return {
        width: size + 'px',
        height: size + 'px'
      }
    },

    openButtonBoxStyle () {
      const size = this.openSize.width / 3
      return {
        width: size + 'px',
        height: size + 'px'
      }
    }
  },

  mounted () {
    this.mounted = true
    this.initWindowSize()
    this.addOutClickListener()
  },

  beforeDestroy () {
    this.removeOutClickLister()
  },

  methods: {
    initWindowSize () {
      this.windowSize = getWindowSize()
      this.correctPosition(this.position)
    },

    onTouchStart (ev) {
      if (this.isOpen) return
      this.closeTransition()
      this.active()
    },

    onTouchEnd (ev) {
      if (this.isOpen) return
      this.openTransition()
      this.unActive()
      this.correctPosition(this.position)
    },

    onTouchMove (ev) {
      if (this.isOpen) return
      const touches = ev.touches || ev.changedTouches || []
      const touch = touches[0] || {}
      const {pageX, pageY} = touch
      let newLeft = pageX - this.size.width / 2
      let newTop = pageY - this.size.height / 2
      this.setPosition({left: newLeft, top: newTop})
    },

    onClick () {
      if (this.isOpen) return
      this.open()
    },

    setPosition ({left, top}) {
      this.position.left = left
      this.position.top = top
    },

    correctPosition ({left, top}) {
      if (this.isOpen) return

      const {width, height} = this.size
      const {width: windowWidth, height: containerHeight} = this.windowSize

      const MIM_LENGTH = 2
      const minLeft = MIM_LENGTH
      const minTop = MIM_LENGTH
      const maxLeft = windowWidth - MIM_LENGTH - width
      const maxTop = containerHeight - MIM_LENGTH - height

      let newLeft = left
      let newTop = top
      let hasChange = false

      if (left < windowWidth / 2) {
        newLeft = minLeft
      } else {
        newLeft = maxLeft
      }

      if (top > maxTop) {
        newTop = maxTop
      }
      if (top < minTop) {
        newTop = minTop
      }

      if (this.position.left !== newLeft || this.position.top !== newTop) {
        this.position.left = newLeft
        this.position.top = newTop
        hasChange = true
      }
      return hasChange
    },

    open () {
      this.lastPosition = clone(this.position)
      this.setPosition(this.openPosition)
      this.isOpen = true
    },

    close () {
      this.isOpen = false
      this.setPosition(this.lastPosition)
    },

    active () {
      this.isActive = true
    },

    unActive () {
      this.isActive = false
    },

    openTransition () {
      this.canTransition = true
    },

    closeTransition () {
      this.canTransition = false
    },

    addOutClickListener () {
      document.addEventListener('touchend', this.onOutClick)
    },

    removeOutClickLister () {
      document.removeEventListener('touchend', this.onOutClick)
    },

    onOutClick () {
      this.isOpen && this.close()
    },

    onButtonClick () {
      this.isOpen && this.close()
    },

    getSlotStyle (index) {
      index = index - 1
      const BTN_POSITION = [
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0]
      ]
      const size = this.isOpen ? this.openSize.width / 3 : 0
      return {
        transform: `translate(${BTN_POSITION[index][0] * size}px, ${BTN_POSITION[index][1] * size}px)`
      }
    }
  }
}
</script>

<style scoped>
.control-board-root {
  position: absolute;
  background: #ccc;
  opacity: 0.5;
  border-radius: 2.5vw;
  z-index: 1000000;
  transition: all ease 0.54;
  overflow: hidden;
}
.control-board-root.active {
  opacity: 1;
}
.control-board-root.open {
  background: #666;
}

.content-box {
  position: relative;
  width: 100%;
  height: 100%;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}

.default-button {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.default-button::after {
  content: '';
  position: absolute;
  left: 10%;
  top: 10%;
  display: block;
  width: 80%;
  height: 80%;
  box-sizing: border-box;
  background: #fff;
  border-radius: 50%;
  border: 1.2vw solid rgba(0,0,0,0.4);
}

.open-button-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all ease 0.5s;
}
.open .open-button-box {
  opacity: 1;
}

.open-button-box .open-button {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: transform ease 0.4s;
  text-align: center;
  color: #fff;
  font-size: 3vw;
  padding: 2vw;
  box-sizing: border-box;
}

</style>

<style scoped>
.default-button-fade-enter-active {
  transition: opacity 0.3s;
}
.default-button-fade-leave-active {
  transition: opacity 0s;
}
.default-button-fade-enter, .default-button-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
