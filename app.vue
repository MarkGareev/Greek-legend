<template>
  <AppHeader />
  <NuxtPage />
  <AppFooter />
</template>
<script setup>
import AppFooter from "./components/layouts/AppFooter/AppFooter.vue";
import AppHeader from "./components/layouts/AppHeader/AppHeader.vue";
import Lenis from "@studio-freight/lenis";
import { useIsDesktopStore } from "@/stores/isDesktop";
const isDesktopStore = useIsDesktopStore();

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
  changeIsDesktop();
  window.addEventListener("resize", changeIsDesktop);
});
function changeIsDesktop() {
  if (window.innerWidth > 768) {
    isDesktopStore.changeIsDesktop(true);
  } else {
    isDesktopStore.changeIsDesktop(false);
  }
}
</script>
<style lang="scss"></style>
