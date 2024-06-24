<template>
  <AppHeader />
  <main class="error">
    <h1 class="error__title h1 pre-line">
      Error 404
      {{ isDesktopStore.isDesktop ? ". " : "\n" }}
      Page not found
    </h1>
    <div class="error__table">
      <nuxt-link class="error__table-item grotesk" to="/">Main page</nuxt-link>
      <nuxt-link class="error__table-item grotesk" to="/about"
        >About company</nuxt-link
      >
      <nuxt-link class="error__table-item grotesk" to="/contacts"
        >Contacts</nuxt-link
      >
    </div>
  </main>
</template>
<script setup>
import AppFooter from "./components/layouts/AppFooter/AppFooter.vue";
import AppHeader from "./components/layouts/AppHeader/AppHeader.vue";
import Lenis from "@studio-freight/lenis";
import { useHeaderStateStore } from "@/stores/headerState";
const headerStateStore = useHeaderStateStore();
import { useIsDesktopStore } from "@/stores/isDesktop";
const isDesktopStore = useIsDesktopStore();
onMounted(() => {
  headerStateStore.changeLogoShow(true);
  headerStateStore.changeCanHeaderChange(false);
  headerStateStore.changeColorToWhite(true);
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
<style lang="scss" scoped>
@import "@/assets/styles/error.scss";
</style>
