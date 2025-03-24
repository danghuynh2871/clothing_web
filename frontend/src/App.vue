<template>
  <div id="app">
    <header-component />
    <router-view />
    <footer-component />
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';

export default {
  components: {
    'header-component': Header,
    'footer-component': Footer,
  },
  created() {
    window.scrollTo(0, 0);
  },
  watch: {
    $route() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style>
/* Reset default margin and padding */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

body {
  margin: 0;
  padding: 0;
  overflow-y: scroll;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>