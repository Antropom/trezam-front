<template>
  <div class="nav">
    <nuxt-link to="/" class="brand"> Trezam test tech </nuxt-link>
    <nav>
      <nuxt-link to="/"> Liste </nuxt-link> |
      <nuxt-link to="/client/nouveau"> Nouveau </nuxt-link>
    </nav>
  </div>
</template>

<style scoped>
.brand {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #39b982;
  text-decoration: none;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

nav > .nuxt-link-exact-active {
  color: #a88aa3;
}
</style>
