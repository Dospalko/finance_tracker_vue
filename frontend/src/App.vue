<template>
  <div id="app">
    <!-- Remove the img and HelloWorld component and replace them with router-view -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // No need to import HelloWorld anymore since we are using router-view
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
