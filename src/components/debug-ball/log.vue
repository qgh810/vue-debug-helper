<template>
  <div class="log-root" :style="rootStyle">
    <div class="control-box">
      分类筛选
        统计数目
      清空，
      关闭，
      拖动
    </div>
    <div class="log-box">
      <div class="log" v-for="(log, index) in logs" :key="index" :style="getLogStyle(log)">
        {{log.content}}
      </div>
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

    // setInterval(() => {
    //   this.log(this.containerSize, {color: '#0f0'})
    // }, 1000)
  },

  methods: {
    getContainerSize () {
      const {innerWidth, innerHeight} = window
      this.containerSize = {width: innerWidth, height: innerHeight}
    },

    addErrorListener () {
      const oldOnError = window.onerror
      window.onerror = (errorMessage, scriptURI, lineNumber) => {
        this.log({
          message: errorMessage,
          script: scriptURI,
          line: lineNumber
        }, {color: 'red'})
        oldOnError && oldOnError(errorMessage, scriptURI, lineNumber)
      }
    },

    log (content, options = {}) {
      if (typeof content === 'object') {
        this.logObject(content, options)
      } else {
        this.logString(content, options)
      }
    },
    logObject (obj, options) {
      const content = JSON.stringify(obj, null, 2)
      this.logString(content, options)
    },

    logString (content, options) {
      this.logs.push({
        content,
        color: options.color,
        type: options.type || 'info'
      })
    },

    getLogStyle ({color}) {
      return {
        color: color || '#fff'
      }
    }
  }
}
</script>

<style scoped>
  .log-root {
    position: absolute;
    left: 0;
    top: 50vh;
    width: 100vw;
    height: 50vh;
    padding-top: 4vh;
    background: rgba(0,0,0,0.7);
    box-sizing: border-box;
    color: #fff;
  }

  .control-box {
    position: absolute;
    top: 0;
    left: 0;
    border-bottom: 1px solid rgba(255,255,255,0.4);
    height: 4vh;
    line-height: 4vh;
    width: 100%;
  }

  .log-box {
    height: 100%;
    width: 100%;
    overflow: auto;
    font-size: 2vh;
    line-height: 5vh;
    padding: 5vw;
    box-sizing: border-box;
  }
</style>
