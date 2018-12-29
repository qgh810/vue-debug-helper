<template>
  <div class="log-root" :class="{'hide-log': !show}">
    <div class="control-box top-box">
      <div class="control-button">{{selectedLogCat}}</div>
      <select v-model="selectedLogCat">
        <!-- <option v-for="cat in LOG_CATS" :value="cat.value"> {{cat.value}}</option> -->
      </select>
    </div>
    <div class="log-box">
      <div class="log" v-for="(log, index) in logs" :key="index" :style="getLogStyle(log)">
        {{log.content + ''}}
      </div>
    </div>

    <div class="control-box bottom-box">
      <button class="control-button">清空</button>
      <button class="control-button" @click="onClose">关闭</button>
    </div>
  </div>
</template>

<script>
const LOG_CATS = [
  { value: 'ALL' },
  { value: 'LOG' },
  { value: 'WARN' },
  { value: 'ERROR' }
]
export default {
  name: 'LogPanel',

  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      hide: false,
      logs: [],
      LOG_CATS,
      selectedLogCat: 'ALL'
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
    this.addConsoleLister('log')
    // this.getContainerSize()

    // setInterval(() => {
    //   this.log(this.containerSize, {color: '#0f0'})
    // }, 1000)
  },

  methods: {
    addErrorListener () {
      const oldOnError = window.onerror
      window.onerror = (errorMessage, scriptURI, lineNumber) => {
        this.log({
          message: errorMessage,
          script: scriptURI,
          line: lineNumber
        }, {type: 'error'})
        oldOnError && oldOnError(errorMessage, scriptURI, lineNumber)
      }
    },

    addConsoleLister (type) {
      try {
        if (console[type]._reseted) return
        let oldLog = console[type]
        console[type]._reseted = true
        console[type] = (...params) => {
          oldLog(...params)
          this.log(params[0], {type})
        }
      } catch (err) {}
    },

    onClose () {
      this.$emit('update:show', false)
    },

    log (content, options = {}) {
      console.info(content)
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
        type: options.type || 'log'
      })
    },

    getLogStyle ({color, background}) {
      return {
        color: color || '#555',
        background
      }
    }
  }
}
</script>

<style scoped>
  .log-root {
    position: fixed;
    left: 0;
    top: 30vh;
    width: 100vw;
    height: 70vh;
    background: #fff;
    box-sizing: border-box;
    color: #000;
    transition: top ease 0.3s;
  }
  .log-root.hide-log {
    top: 100vh;
  }

  .control-box {
    position: absolute;
    border-top: 1px solid #e0e0e1;
    border-bottom: 1px solid #e0e0e1;
    background: #efeff4;
    height: 6vh;
    line-height: 6vh;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .control-box.top-box {
    top: 0;
  }

  .control-box.top-box select {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .control-box.bottom-box {
    bottom: 0;
  }

  .control-box .control-button {
    background: transparent;
    border: 0;
    width: 100%;
    text-align: center;
    font-size: 3.5vw;
  }

  .log-box {
    height: 100%;
    width: 100%;
    overflow: auto;
    font-size: 2vh;
    line-height: 5vh;
    padding: 6vh 0;
    box-sizing: border-box;
  }

  .log-box .log {
    padding: 0 2vw;
    box-sizing: border-box;
    border-bottom: 1px solid #f0f0f0;
  }
</style>
