<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>
<style>
  h1,h2,body {
    margin: 0;
    padding: 0;
  }
  #app {
    height: auto;
    min-height: auto;
  }
  body {
    background: #f7fafc;
  }
  .container {
    padding: 0 15%;
  }
</style>