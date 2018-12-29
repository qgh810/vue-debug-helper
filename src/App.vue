<template>
  <div id="app">
    <DebugHelper/>
  </div>
</template>

<script>
import DebugHelper from './components/debug-helper'

export default {
  name: 'App',
  components: {
    DebugHelper
  }
}
</script>

<style>
html, body {
  height: 100%;
  overflow: hidden;
  background: #000;
}
</style>
