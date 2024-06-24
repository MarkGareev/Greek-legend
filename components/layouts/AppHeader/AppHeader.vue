<template>
  <header
    class="header"
    :class="{
      'header-hide': !isHeaderShow && !isOpen,
      'header-bg': headerStateStore.getCanHeaderChange && getIsWhiteHeader,
      'header-black':
        router.currentRoute.value.name === 'privacy-policy' && !isOpen,
    }"
  >
    <button
      ref="button"
      class="header__menu"
      :class="{
        white: isWhite,
        black: !isWhite || isOpen,
        link: isDesktopStore.getIsDesktop,
      }"
      @click="openMenu"
    >
      <p class="desktop">{{ getHeaderMenu }}</p>
      <burger :color="getLogoColor" :isBurger="!isOpen" />
    </button>
    <template v-if="isMounted">
      <Transition>
        <div
          class="header__logo"
          :style="{
            'transition-delay': isOpen ? '1s' : '0s',
          }"
          v-if="headerStateStore.getIsLogoShow || isOpen"
        >
          <nuxt-link to="/">
            <smallLogo class="header__logo-img" :color="getLogoColor" />
          </nuxt-link>
        </div>
      </Transition>
    </template>

    <div
      class="header__lang link desktop"
      :class="{
        white: isWhite,
        black: !isWhite || isOpen,
        link: isDesktopStore.getIsDesktop,
      }"
    >
      {{ temperature }}
    </div>
  </header>
  <Transition name="header" @enter="onEnter" @leave="onEnter">
    <div class="header__open" v-show="isOpen">
      <Transition @after-enter="onAfterEnter" @after-leave="onAfterEnter">
        <div class="header__open-wrapper" v-if="isOpen">
          <div class="header__open-botl">
            <img
              class="header__open-botl-img"
              :src="menuItems[0].items[activeImg].img"
              alt="botl"
            />
          </div>
          <div class="header__open-menu">
            <div
              class="header__open-menu-el"
              v-for="(menu, i) in menuItems"
              :key="i"
            >
              <h6 class="header__open-menu-el-title caption">
                {{ menu.title }}
              </h6>
              <ul class="header__open-menu-el-list">
                <li
                  v-for="(item, j) in menu.items"
                  :key="j"
                  class="header__open-menu-el-list-item"
                  @mouseenter="changeActiveImg(i === 0 ? j : null)"
                  :class="{
                    h2: menu.isBig,
                    grotesk: !menu.isBig,
                  }"
                >
                  <nuxt-link
                    class="header__open-menu-el-list-item-link"
                    v-if="!item.isDisable"
                    :to="item.link"
                  >
                    {{ item.text }}
                  </nuxt-link>
                  <span
                    class="header__open-menu-el-list-item-span"
                    v-if="item.isDisable"
                  >
                    {{ item.text }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="header__open-lang mobile link">{{ temperature }}</div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import smallLogo from "@/components/common/smallLogo.vue";
import burger from "~/components/common/burger/index.vue";

import { useHeaderStateStore } from "~/stores/headerState";
const headerStateStore = useHeaderStateStore();
import { useIsDesktopStore } from "~/stores/isDesktop";
const isDesktopStore = useIsDesktopStore();
// TODO показывать хедер если он на самом верху
const onTop = computed(() => {
  const y = window.scrollY || window.pageYOffset;
  return y <= 0;
});
const isHeaderShow = ref(true);
const isWhite = computed(() => headerStateStore.getIsColorWhite);
const isOpen = computed(() => headerStateStore.getIsOpen);
const lastScroll = ref(0);
const scrollPosition = () => {
  return window.pageYOffset || document.documentElement.scrollTop;
};
const isMounted = ref(false);

const { data } = await useAsyncData("wheather", () =>
  $fetch(
    "http://api.weatherapi.com/v1/current.json?key=cec65b7fe212465eb72162242242106&q=Heraklion&aqi=no"
  )
);
const temperature =
  (Math.round(data.value.current.temp_c) > 0 ? "+" : "") +
  Math.round(data.value.current.temp_c) +
  "°C in Heraklion";

onMounted(() => {
  window.addEventListener("scroll", function () {
    if (scrollPosition() < lastScroll.value) {
      isHeaderShow.value = true;
    } else if (headerStateStore.getCanHeaderChange) {
      isHeaderShow.value = false;
    }
    lastScroll.value = scrollPosition();
  });
  changeIsDesktop();
  window.addEventListener("resize", changeIsDesktop);
  isMounted.value = true;
});
function changeIsDesktop() {
  if (window.innerWidth > 768) {
    isDesktopStore.changeIsDesktop(true);
  } else {
    isDesktopStore.changeIsDesktop(false);
  }
}
const getLogoColor = computed(() => {
  if (isWhite.value && !isOpen.value) {
    return "white";
  }
  return "#2C2C2C";
});
import { whitePages } from "~/constants/whitePages";
const getIsWhiteHeader = computed(() => {
  return whitePages.includes(router.currentRoute.value.name);
});
// MENU //
import { useRouter } from "vue-router";
const router = useRouter();
const button = ref(null);
const isButtonDisable = ref(false);
router.afterEach(() => {
  headerStateStore.closeHeader();
});
function onEnter() {
  isButtonDisable.value = true;
}
function onAfterEnter() {
  isButtonDisable.value = false;
}
function openMenu() {
  if (isButtonDisable.value) {
    return;
  }
  if (headerStateStore.getIsOpen) {
    headerStateStore.closeHeader();
  } else {
    headerStateStore.openHeader();
  }
}

// LANGUAGE //
// const langList = reactive(["English", "Greek", "Русский"]);
// function changeLang(lang) {
//   console.log(lang);
// }

const getHeaderMenu = computed(() => {
  return isOpen.value ? "Close menu" : "Menu";
});

// MENU ITEMS //
import premiumChatzigeorgiou from "./assets/imgs/bottles/premiumChatzigeorgiou500.png";
import premiumVoutaktakis from "./assets/imgs/bottles/premiumVoutaktakis500.png";
import premiumPapadakis from "./assets/imgs/bottles/premiumPapadakis500.png";

const menuItems = [
  {
    title: "Families",
    isBig: true,
    items: [
      {
        text: "Chatzigeorgiou",
        link: "/chatzigeorgiou",
        isDisable: false,
        img: premiumChatzigeorgiou,
      },
      {
        text: "Voutaktakis",
        link: "/voutaktakis",
        isDisable: false,
        img: premiumVoutaktakis,
      },
      {
        text: "Papadakis",
        link: "/papadakis",
        isDisable: false,
        img: premiumPapadakis,
      },
    ],
  },
  {
    title: "Company",
    isBig: false,
    items: [
      { text: "About", link: "/about", isDisable: false },
      { text: "Certificates", link: "/info/premium", isDisable: false },
    ],
  },
  {
    title: "Information",
    isBig: false,
    items: [
      {
        text: "Media",
        link: "/privacy-policy",
        isDisable: true,
      },
      { text: "Greek Essence", link: "/essence" },
      {
        text: "Contacts",
        link: "/contacts",
        isDisable: false,
      },
    ],
  },
];
const activeImg = ref(0);
function changeActiveImg(index) {
  if (Number.isInteger(index)) {
    activeImg.value = index;
  }
}
</script>

<style lang="scss" scoped>
@import "./AppHeader.scss";
</style>
