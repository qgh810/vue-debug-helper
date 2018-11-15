<template>
  <div
    v-if="mounted"
    class="control-board-root"
    :class="{active: isActive}"
    :style="rootStyle"
    @touchstart="onTouchStart"
    @touchend.stop="onTouchEnd"
    @touchmove="onTouchMove"
    @click="onClick"
    >
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
        transitionDuration: (this.canTransition ? 0.3 : 0) + 's'
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
  }
}
</script>

<style scoped>
.control-board-root {
  position: absolute;
  background: rgba(150,150,150,0.6);
  opacity: 0.5;
  border-radius: 2.5vw;
  z-index: 1000000;
  transition: all ease 0.3s;
}
.control-board-root.active {
  opacity: 0.8;
}

</style>
