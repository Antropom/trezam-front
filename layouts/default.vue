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

  head() {
    return {
      titleTemplate: `Trezam, test technique %s`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Test technique pour Trezam, application de gestion de clients',
        },
      ],
    }
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
  line-height: 1.5;
}

#app {
  box-sizing: border-box;
  width: 900px;
  padding: 0 20px;
  margin: 0 auto;
}

a {
  color: #dc8331;
  font-weight: 600;
  background-color: transparent;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

h1 {
  color: #dc8331;
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
  border: 2px solid #7c936b;
  border-radius: 10px;
  margin: 10px 0;
  cursor: pointer;
}

button:hover {
  background-color: #7c936b;
  color: #fff;
}

.error {
  color: #d9534f;
  height: 0;
  margin: -8px auto 8px;
}

.error-btn {
  border: 2px solid #d9534f;
  color: #000;
  cursor: default;
}

.error-btn:hover {
  background-color: #d9534f;
}
</style>
