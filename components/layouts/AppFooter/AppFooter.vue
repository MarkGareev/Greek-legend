<template>
  <footer class="footer">
    <div class="footer__title">
      <h1 class="footer__title-h1">
        <img
          class="footer__title-h1-img"
          src="@/assets/imgs/bigLogo.svg"
          alt="Greek Legend"
        />
      </h1>
      <h2 class="footer__title-h2 h2">
        Olive oil production according <br v-if="isDesktopStore.getIsDesktop" />
        to ancestral recipes
      </h2>
    </div>
    <div class="footer__basement">
      <span class="footer__basement-lang"></span>
      <!-- <ul class="footer__basement-lang">
        <li
          v-for="(lang, index) in langList"
          :key="index"
          class="footer__basement-lang-item"
          :class="{
            'footer__basement-lang-item-active': lang.isActive,
          }"
          @click="changeLang(index)"
        >
          {{ lang.name }} /
        </li>
      </ul> -->
      <div class="footer__basement-info">
        <h6 class="footer__basement-info-h6 italic-caption">December 4th</h6>
        <p class="footer__basement-info-p">
          19:30 Montoya, C/ d'Àvila, 3208005 Crete, Greece
        </p>
      </div>
      <div class="footer__basement-legend">
        <h6 class="footer__basement-legend-h6 italic-caption">Legend</h6>
        <p class="footer__basement-legend-p">
          They exhibit their work in exhibitions, galleries and museums in
          Israel and around the world and won
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useIsDesktopStore } from "@/stores/isDesktop";
const isDesktopStore = useIsDesktopStore();
const lang = ref("English");
const langList = reactive([
  {
    name: "English",
    isActive: true,
  },
  {
    name: "Greek",
    isActive: false,
  },
  {
    name: "Russian",
    isActive: false,
  },
  {
    name: "Germany",
    isActive: false,
  },
  {
    name: "Poland",
    isActive: false,
  },
  {
    name: "French",
    isActive: false,
  },
]);
function changeLang(index) {
  lang.value = langList[index].name;
  // console.log(lang.value);
}
</script>

<style lang="scss">
@use "./AppFooter.scss";
</style>
