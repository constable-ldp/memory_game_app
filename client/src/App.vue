<template>
  <div id="app">
    <cards />
  </div>
</template>

<script>

import Cards from './components/Cards.vue';


export default {
  name: 'App',
  components: {
    'cards': Cards
  }
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
