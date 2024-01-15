<template>
  <header
    class="header"
    :class="{
      'header-hide': !isHeaderShow,
      'header-hover': headerStateStore.getCanHeaderChange,
    }"
  >
    <button
      class="header__menu link"
      :class="{
        white: isWhite,
        black: !isWhite,
      }"
    >
      Menu
    </button>
    <Transition>
      <div class="header__logo" v-if="headerStateStore.getIsLogoShow">
        <nuxt-link to="/">
          <smallLogo
            class="header__logo-img"
            :color="isWhite ? 'white' : 'black'"
          />
        </nuxt-link>
      </div>
    </Transition>
    <span></span>
    <!-- <select name="lang" id="lang" class="header__lang link">
      <option value="Русский">Русский</option>
      <option value="English">English</option>
    </select> -->
  </header>
</template>

<script setup>
import smallLogo from "@/components/common/smallLogo.vue";
import { useHeaderStateStore } from "~/stores/headerState";

const headerStateStore = useHeaderStateStore();

const isHeaderShow = ref(true);
const isWhite = computed(() => headerStateStore.getIsColorWhite);

const lastScroll = ref(0);
const scrollPosition = () => {
  return window.pageYOffset || document.documentElement.scrollTop;
};
onMounted(() => {
  window.addEventListener("scroll", function () {
    if (scrollPosition() < lastScroll.value) {
      isHeaderShow.value = true;
    } else if (headerStateStore.getCanHeaderChange) {
      isHeaderShow.value = false;
    }
    lastScroll.value = scrollPosition();
  });
});
</script>

<style lang="scss">
@use "./AppHeader.scss";
</style>
