<template>
  <AppHeader />
  <main class="error">
    <p class="error__text italic-caption">Page not found</p>
    <h1 class="error__title h1">Error 404</h1>
    <nuxt-link to="/" class="error__link link underline"
      >Go main page</nuxt-link
    >
  </main>
</template>
<script setup>
import AppFooter from "./components/layouts/AppFooter/AppFooter.vue";
import AppHeader from "./components/layouts/AppHeader/AppHeader.vue";
import Lenis from "@studio-freight/lenis";
onMounted(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });
  if (window) {
    requestAnimationFrame(raf);
  }
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
});
</script>
<style lang="scss">
@use "@/assets/styles/error.scss";
</style>
