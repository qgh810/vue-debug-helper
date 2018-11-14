<template>
  <div class="log-root" :style="rootStyle">
    <div class="control-box">
      控制
    </div>
    <div class="log-box">
      123
    </div>
  </div>
</template>

<script>
export default {
  name: 'DebugLog',

  data () {
    return {
      logs: [],
      containerSize: {
        width: 0,
        height: 0
      }
    }
  },

  computed: {
    rootStyle () {
      return {
      }
    }
  },

  mounted () {
    this.addErrorListener()
    this.getContainerSize()
  },

  methods: {
    getContainerSize () {
      const {innerWidth, innerHeight} = window
      this.containerSize = {width: innerWidth, height: innerHeight}
    },

    addErrorListener () {
      const oldOnError = window.onerror
      window.onerror = function (errorMessage, scriptURI, lineNumber) {
        this.log({
          message: errorMessage,
          script: scriptURI,
          line: lineNumber
        });
        oldOnError && oldOnError(errorMessage, scriptURI, lineNumber)
      }
    },

    log (content) {
      if (typeof content === 'object') {
        this.logObject(content)
      } else {
        this.logString(content)
      }
    },
    logObject (obj) {
      const content = JSON.stringify(obj)
      this.logString(content)
    },

    logString (content) {
      this.logs.push(content.toString())
    }
  }
}
</script>

<style scoped>
  .log-root {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 40vh;
    background: rgba(0,0,0,0.7);
    box-sizing: border-box;
    color: #fff;
    font-size: 3vh;
  }

  .control-box {
    border-bottom: 1px solid rgba(255,255,255,0.7);
    height: 4vh;
    line-height: 4vh;
    width: 100%;
  }
</style>
