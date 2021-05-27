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
  color: #103145;
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

a:hover {
  text-decoration: underline;
}

h1 {
  color: #39b982;
  font-weight: 800;
  text-align: center;
}

.flex-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  height: 50px;
  width: 130px;
  font-size: 1em;
  font-weight: 600;
  background-color: #fff;
  border: 2px solid #39b982;
  border-radius: 10px;
  margin: 10px 0;
  cursor: pointer;
}

button:hover {
  background-color: #39b982;
  color: #fff;
}

.error {
  color: #d9534f;
  height: 0;
  margin: -8px auto 8px;
}

.error-btn {
  border: 2px solid #d9534f;
  color: #103145;
  cursor: default;
}

.error-btn:hover {
  background-color: #d9534f;
}
</style>
