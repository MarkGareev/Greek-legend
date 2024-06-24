<template>
  <main>
    <section class="section first" ref="firstSection">
      <div class="first__title">
        <h1 class="first__title-h1">
          <img
            class="first__title-h1-img desktop"
            src="@/assets/imgs/oneLineLogo.svg"
            alt="Greek Legend"
          />
          <img
            class="first__title-h1-img mobile"
            src="@/assets/imgs/bigLogoBlack.svg"
            alt="Greek Legend"
          />
        </h1>
        <h3 class="first__title-h3 h2">
          Olive oil the Greeks choose themselves
        </h3>
      </div>
      <div class="first__basement">
        <p class="caption">©2024. Greek Legend</p>
      </div>
      <div class="first__background">
        <img
          class="first__background-img"
          src="@/assets/imgs/background.webp"
          alt="Olive branches"
        />
        <div class="first__background-title">
          <h2 class="first__background-title-h2 h2">Real, Olive, Yours</h2>
        </div>
        <p class="first__background-basement caption">Born in Greece</p>
      </div>
    </section>
    <section class="section about">
      <div class="about__left">
        <img
          class="about__left-img"
          src="@/assets/imgs/about.webp"
          alt="olive farmer"
        />
      </div>
      <div class="about__right">
        <div class="about__block">
          <p class="about__right-text grotesk">
            We proudly introduce you to our exquisite extra virgin olive oil
            crafted by families on the island of Crete. For over a century,
            these families have honored traditions in creating.
          </p>
          <nuxt-link to="/about" class="about__right-link link underline">
            Go read about page
          </nuxt-link>
        </div>
        <p class="about__right-caption h1">Greece</p>
        <img
          class="about__right-img"
          src="@/assets/imgs/crete.svg"
          alt="Crete"
        />
        <div class="about__block">
          <h6 class="about__right-title antique">
            The production of olive oil
          </h6>
          <p class="about__right-text antique">
            Nestled in Greece, 350+ farmers devote themselves to crafting
            exceptional olive oil. Their dedication has spawned three distinct
            categories: Premium, Select, and Elixirio, each with its unique
            essence.
          </p>
        </div>
      </div>
    </section>

    <section class="section section-margin products">
      <h2 class="title h2-smallcaps">Products</h2>
      <hr />
      <div class="products__cards desktop">
        <div
          class="products__card"
          v-for="(card, index) in listProducts"
          :key="index"
        >
          <h6 class="products__card-title antique pre-line">{{ card.name }}</h6>
          <img
            class="products__card-img"
            :src="card.img"
            alt="Olive oil bottle"
          />
        </div>
      </div>
      <div class="mobile">
        <slider :list="listProducts" />
      </div>
    </section>
    <section class="section families">
      <h2 class="title h2-smallcaps">Families</h2>
      <Annotation />
      <div class="families__content-mobile">
        <div
          class="families__content-mobile-block"
          v-for="(family, index) in families"
          :key="index"
        >
          <img class="families__content-mobile-block-img" :src="family.img" />

          <div class="families__content-mobile-block-title h1 pre-line">
            {{ family.name }}
          </div>
          <div class="families__content-mobile-block-subtitle greek-caption">
            {{ family.subtitle }}
          </div>
          <div class="families__content-mobile-block-text grotesk">
            {{ family.text }}
          </div>
          <div class="families__content-mobile-block-link link underline">
            <nuxt-link :to="family.link">Go family page</nuxt-link>
          </div>
        </div>
      </div>
      <div class="families__content" ref="animation">
        <div class="families__left">
          <img
            v-for="(family, index) in families"
            :key="index"
            class="families__left-img"
            :class="{
              'last-img': index === 2,
              'second-img': index === 1,
              'first-img': index === 0,
            }"
            :style="{ 'z-index': 3 - index }"
            :src="family.img"
            alt="family"
          />
        </div>
        <div class="families__right">
          <div class="families__block">
            <p class="families__right-text grotesk">
              {{ families[activeIndex].text }}
            </p>
            <nuxt-link
              class="families__right-link link underline"
              :to="families[activeIndex].link"
              >Go family page</nuxt-link
            >
          </div>
          <div class="families__right-title">
            <h1
              class="families__right-title-h1 pre-line"
              :class="{
                h1: isDesktopStore.getIsDesktop,
                h2: !isDesktopStore.getIsDesktop,
              }"
              v-html="families[activeIndex].name"
            ></h1>
            <h2 class="families__right-title-h2 greek-caption">
              {{ families[activeIndex].subtitle }}
            </h2>
          </div>
          <div class="families__block">
            <img
              class="families__right-bottles"
              src="@/assets/imgs/bottles.svg"
              alt="bottles"
            />
            <p class="families__right-text antique">
              The headliners of 2024 are three farmers whose oil is available in
              the Premium, Select, and Elixirio lines in volumes of 750ml,
              500ml, and 250ml, depending on the harvest and acidity of the
              olive oil.
            </p>
          </div>
        </div>
      </div>
    </section>
    <div class="section video">
      <h6 class="video-text antique">How we produce olive oil</h6>
      <img
        class="video-img"
        src="@/assets/imgs/video.jpg"
        alt="How we produce olive oil"
      />
    </div>
  </main>
</template>
<script setup>
import slider from "~/components/common/slider/slider.vue";
import Annotation from "@/components/common/annotation/index.vue";

import { useRouter } from "vue-router";
const router = useRouter();

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { useHeaderStateStore } from "@/stores/headerState";
const headerStateStore = useHeaderStateStore();
import { useIsDesktopStore } from "@/stores/isDesktop";
const isDesktopStore = useIsDesktopStore();

const firstSection = ref(null);
onMounted(() => {
  headerStateStore.changeLogoShow(false);
  headerStateStore.changeCanHeaderChange(false);
  headerStateStore.changeColorToWhite(false);
  setTimeout(() => {
    animationFirst();
  }, 0);
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("scroll", refresh);
});

onUnmounted(() => {
  window.removeEventListener("scroll", refresh);
  window.removeEventListener("scroll", handleScroll);
});
function refresh() {
  if (
    window.pageYOffset > 1000 &&
    window.pageYOffset < 1200 &&
    isDesktopStore.getIsDesktop
  ) {
    ScrollTrigger.refresh();
  }
}

function changeHeaderState(self) {
  if (router.currentRoute.value.name !== "index" || self.progress === 1) {
    return;
  }
  if (self.progress > 0.15) {
    headerStateStore.changeCanHeaderChange(false);
    headerStateStore.changeColorToWhite(true);
    headerStateStore.changeLogoShow(true);
  } else {
    headerStateStore.changeCanHeaderChange(false);
    headerStateStore.changeColorToWhite(false);
    headerStateStore.changeLogoShow(false);
  }
}
function handleScroll() {
  if (window.pageYOffset > firstSection.value.offsetHeight * 2) {
    headerStateStore.changeCanHeaderChange(true);
    headerStateStore.changeColorToWhite(false);
    headerStateStore.changeLogoShow(true);
  } else if (window.pageYOffset > firstSection.value.offsetHeight) {
    headerStateStore.changeCanHeaderChange(false);
    headerStateStore.changeColorToWhite(true);

    headerStateStore.changeLogoShow(true);
  }
}
let firstTL;
function animationFirst() {
  firstTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".first",
      scrub: true,
      pin: true,
      onUpdate: changeHeaderState,
    },
  });
  if (isDesktopStore.getIsDesktop) {
    firstTL
      .fromTo(
        ".first__background-img",
        {
          width: "26.04vw",
          height: "18.22vw",
        },
        {
          width: "100%",
          height: "100%",
          duration: 2.5,
          ease: "power1.inOut",
        }
      )
      .fromTo(
        ".first__background-img",
        {
          borderRadius: VwToPx(0.94),
        },
        {
          borderRadius: 0,
        }
      );
  } else {
    firstTL
      .fromTo(
        ".first__background-img",
        {
          scaleY: 0.34,
          scaleX: 0.35,
        },
        {
          scale: 1,
          duration: 2.5,
          ease: "power1.inOut",
        }
      )
      .fromTo(
        ".first__background-img",
        {
          borderRadius: VwToPx(2.67),
        },
        {
          borderRadius: 0,
        }
      );
  }
  firstTL.fromTo(
    ".first__background-title-h2",
    {
      y: isDesktopStore.getIsDesktop ? VwToPx(2.2) : VwToPx(9.07),
    },
    {
      y: 0,
      ease: "power3.out",
      duration: 2,
    }
  );
  firstTL
    .fromTo(
      ".first__background-basement",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 2,
      }
    )
    .to(".first__background-basement", { duration: 5 });
  animationSliderFamily();
  ScrollTrigger.refresh(true);
}
let sliderTL;
function animationSliderFamily() {
  sliderTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".families__content",
      start: `top ${VwToPx(1.56)}px`,
      scrub: true,
      pin: true,
    },
  });
  sliderTL
    .to(
      ".first-img",
      {
        opacity: 0,
        duration: 1,
        onComplete: changeFamilyIndex,
        onCompleteParams: [1],
        onReverseComplete: changeFamilyIndex,
        onReverseCompleteParams: [0],
      },
      "<"
    )
    .fromTo(
      ".second-img",
      {
        x: VwToPx(4.17),
        scale: 0.91,
      },
      {
        scale: 1,
        x: 0,
        duration: 0.5,
      },
      "<1"
    )
    .fromTo(
      ".last-img",
      {
        x: VwToPx(7.29),
        scale: 0.84,
      },
      {
        scale: 0.91,
        x: VwToPx(4.17),
        duration: 0.5,
      },
      "<"
    )
    .to(
      ".second-img",
      {
        opacity: 0,
        duration: 0.5,
        onComplete: changeFamilyIndex,
        onCompleteParams: [2],
        onReverseComplete: changeFamilyIndex,
        onReverseCompleteParams: [1],
      },
      "<1"
    )
    .to(
      ".last-img",
      {
        scale: 1,
        x: 0,
        duration: 0.5,
        onReverseComplete: changeFamilyIndex,
        onReverseCompleteParams: [2],
      },
      "<1"
    );
}

const activeIndex = ref(0);
function changeFamilyIndex(index) {
  activeIndex.value = index;
}
import chatzigeorgiou from "@/assets/imgs/families/chatzigeorgiou.webp";
import voutaktakis from "@/assets/imgs/families/voutaktakis.webp";
import papadakis from "@/assets/imgs/families/papadakis.webp";
const families = [
  {
    name: "Family \nChatzigeorgiou",
    subtitle: "Χατζηγεωργίου",
    text: "Dimos enjoys spending his free time spearfishing, enjoying the gifts of the sea.",
    link: "/chatzigeorgiou",
    img: chatzigeorgiou,
  },
  {
    name: "Family \nVoutaktakis",
    subtitle: "Βουτακτάκης ",
    text: "Giannis takes pleasure in horseback. horseback riding around his property in his spare time, which helps him to unwind and reenergize.",
    link: "/voutaktakis",
    img: voutaktakis,
  },
  {
    name: "Family \nPapadakis",
    subtitle: "Παπαδάκης",
    text: "Kostis's free time is spent with his family and friends. This time with loved ones gives him the energy he needs for his demanding work.",
    link: "/papadakis",
    img: papadakis,
  },
];
// IMPORT ASSETS PRODUCTS //
import premium from "./assets/imgs/bottles/premiumVoutaktakis500.png";
import select from "./assets/imgs/bottles/selectPapadakis500.png";
import elixir from "./assets/imgs/bottles/elixirChatzigeorgiou.png";

const listProducts = [
  {
    name: "Premium \n250, 500, 750 ml",
    img: premium,
  },
  {
    name: "Select \n250, 500 ml",
    img: select,
  },
  {
    name: "Elixirio \n250 ml",
    img: elixir,
  },
];
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
