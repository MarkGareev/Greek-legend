<template>
  <AppHeader />
  <!-- <Preloader  /> -->
  <NuxtPage />
  <AppFooter v-if="!isFooterShow" />
</template>

<script setup>
import AppFooter from "./components/layouts/AppFooter/AppFooter.vue";
import AppHeader from "./components/layouts/AppHeader/AppHeader.vue";
import Preloader from "./components/layouts/Preloader/index.vue";
import Lenis from "@studio-freight/lenis";

import { useRouter } from "vue-router";
const router = useRouter();

import { noFooterPages } from "@/constants/noFooterPages.js";

const isFooterShow = computed(() => {
  return noFooterPages.includes(page.value);
});
import { whitePages } from "@/constants/whitePages.js";
const page = computed(() => {
  return router.currentRoute.value.fullPath;
});

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
useHead({
  bodyAttrs: {
    class: computed(() => {
      if (whitePages.includes(page.value)) {
        return "background-white";
      }
      return "background-beige";
    }),
  },
});
</script>
