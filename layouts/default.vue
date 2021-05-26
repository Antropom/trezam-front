<template>
  <div id="app">
    <Navbar />
    <Nuxt />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar,
  },
}
</script>

<style>
html {
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

#app {
  box-sizing: border-box;
  width: 900px;
  padding: 0 20px;
  margin: 0 auto;
}

a {
  color: #39b982;
  font-weight: 600;
  background-color: transparent;
  text-decoration: none;
}

h1 {
  color: #39b982;
  font-weight: 800;
  text-align: center;
}
</style>
