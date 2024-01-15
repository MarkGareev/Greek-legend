<template>
  <main>
    <section class="section first">
      <div class="first__title">
        <h1 class="first__title-h1">
          <img
            class="first__title-h1-img"
            src="@/assets/imgs/bigLogoBlack.svg"
            alt="Greek Legend"
          />
        </h1>
        <h2 class="first__title-h2 h2">
          Olive oil production according
          <br v-if="isDesktopStore.getIsDesktop" />
          to ancestral recipes
        </h2>
      </div>
      <div class="first__basement">
        <p class="italic-caption">©2024. Greek Legend</p>
      </div>
      <div class="first__backgound">
        <img
          class="first__backgound-img"
          src="@/assets/imgs/background.jpg"
          alt="оливки"
        />
        <div class="first__backgound-title">
          <h2 class="first__backgound-title-h2 h2">Real, Olive, Yours</h2>
          <!-- <div class="first__backgound-title-mask"></div> -->
        </div>
        <p class="first__backgound-basement italic-caption">
          Year of foundation 1989
        </p>
      </div>
    </section>
    <section class="section about">
      <div class="about__left">
        <img
          class="about__left-img"
          src="@/assets/imgs/about.jpg"
          alt="Человек перебирает оливки"
        />
      </div>
      <div class="about__right">
        <div class="about__block">
          <h6 class="about__right-title italic-caption">01</h6>
          <p class="about__right-text antique">
            We proudly introduce you to our exquisite extra virgin olive oil
            crafted by families on the island of Crete. For over a century,
            these families have honored traditions in creating this authentic
            oil, passing down recipes from generation to generation. Explore our
            selection and experience the legacy of true, time-honored flavors.
          </p>
          <nuxt-link to="/about" class="about__right-link link underline">
            Go read about page
          </nuxt-link>
        </div>

        <img
          class="about__right-img"
          src="@/assets/imgs/crete.svg"
          alt="crete"
        />
        <div class="about__block">
          <h6 class="about__right-title italic-caption">
            The production of oil
          </h6>
          <p class="about__right-text grotesk">
            Nestled in Crete, three families devote themselves to crafting
            exceptional olive oil. Their dedication has spawned three distinct
            categories: Premium, Select, and Infinity, each with its unique
            essence.
          </p>
        </div>
      </div>
    </section>

    <section class="section section-margin products">
      <h2 class="products__title h2-smallcaps">Products</h2>
      <hr class="products__hr" />
      <div class="products__cards" v-if="isDesktopStore.getIsDesktop">
        <div
          class="products__card"
          v-for="(card, index) in listProducts"
          :key="index"
        >
          <h6 class="products__card-title italic-caption">{{ card.name }}</h6>
          <img class="products__card-img" :src="card.img" alt="масло" />
        </div>
      </div>
      <div v-else><slider :list="listProducts" /></div>
    </section>
    <section class="section families">
      <h2 class="products__title h2-smallcaps">Families</h2>
      <div class="families__content">
        <div class="families__left">
          <img
            class="families__left-img last-img"
            src="@/assets/imgs/families3.jpg"
            alt="family"
          />
          <img
            class="families__left-img second-img"
            src="@/assets/imgs/families2.jpg"
            alt="family"
          />
          <img
            class="families__left-img first-img"
            src="@/assets/imgs/families.jpg"
            alt="family"
          />
        </div>
        <div class="families__right">
          <div class="families__block">
            <p class="families__right-text antique">
              {{
                isDesktopStore.getIsDesktop
                  ? families[activeIndex].text
                  : families[activeIndex].textMobile
              }}
            </p>
            <nuxt-link class="families__right-link link underline" to="/family"
              >Go family page</nuxt-link
            >
          </div>
          <div class="families__right-title">
            <h1
              class="families__right-title-h1 h1"
              :class="{
                h1: isDesktopStore.getIsDesktop,
                h2: !isDesktopStore.getIsDesktop,
              }"
              v-html="families[activeIndex].name"
            ></h1>
            <h2 class="families__right-title-h2 caption">
              {{ families[activeIndex].subtitle }}
            </h2>
          </div>
          <div class="families__block">
            <p class="grotesk">
              Premium, Select, and Infinity, each with its unique essence. 02,
              05, 07.
            </p>
          </div>
        </div>
      </div>
    </section>
    <div class="section video">
      <h6 class="video-text italic-caption">How we produce oil</h6>
      <img
        class="video-img"
        src="@/assets/imgs/video.jpg"
        alt="How we produce oil"
      />
    </div>
  </main>
</template>
<script setup>
import slider from "~/components/common/slider/slider.vue";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { useHeaderStateStore } from "@/stores/headerState";
import { useIsDesktopStore } from "@/stores/isDesktop";
const headerStateStore = useHeaderStateStore();
const isDesktopStore = useIsDesktopStore();

const activeIndex = ref(0);
const background = ref();
const backgroundHeight = ref(0);
onMounted(() => {
  animationFirst();
  animationSliderFamily();
  animatinMenu();
  background.value = document.querySelector(".first__backgound-img");
});
function changeFamilyIndex(index) {
  activeIndex.value = index;
}
const families = reactive([
  {
    name: "Family <br /> Chatzigiorgis1",
    subtitle: "χατζηγιωργησ1",
    textMobile:
      "Text1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, inventore.",
    text: "TEXT 1 We proudly introduce you to our exquisite extra virgin olive oil crafted by families on the island of Crete. For over a century, these families have honored traditions in creating this authentic oil, passing down recipes from generation to generation.",
    link: 1,
  },
  {
    name: "Family <br /> Chatzigiorgis2",
    subtitle: "χατζηγιωργησ2",
    textMobile:
      "Text2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, inventore.",
    text: "TEXT 2 We proudly introduce you to our exquisite extra virgin olive oil crafted by families on the island of Crete. For over a century, these families have honored traditions in creating this authentic oil, passing down recipes from generation to generation.",
    link: 2,
  },
  {
    name: "Family <br /> Chatzigiorgis3",
    subtitle: "χατζηγιωργησ3",
    textMobile:
      "Text3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, inventore.",
    text: "TEXT 3 We proudly introduce you to our exquisite extra virgin olive oil crafted by families on the island of Crete. For over a century, these families have honored traditions in creating this authentic oil, passing down recipes from generation to generation.",
    link: 3,
  },
]);
function VwToPx(value) {
  return (window.innerWidth * value) / 100;
}
function changeHeightBackground() {
  if (background.value) {
    backgroundHeight.value = Math.trunc(
      background.value.style.height.slice(0, -1)
    );
    headerStateStore.changeBackgroundHeight(backgroundHeight.value);
  }
}
function animationFirst() {
  const firstTL = gsap.timeline();
  firstTL.to(".first__backgound-img", {
    width: "100%",
    height: "100%",
    duration: 2.5,
    ease: "power1.inOut",
    onUpdate: changeHeightBackground,
  });
  firstTL.fromTo(
    ".first__backgound-title-h2",
    {
      y: VwToPx(!isDesktopStore.getIsDesktop ? 3.8 : 9.07),
    },
    {
      y: 0,
      ease: "power3.out",
      duration: 0.5,
    }
  );
  firstTL.fromTo(
    ".first__backgound-basement",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.5,
    }
  );
  ScrollTrigger.create({
    animation: firstTL,
    trigger: ".first",
    start: "top top",
    scrub: true,
    pin: true,
  });
}
function animationSliderFamily() {
  const sliderTL = gsap.timeline();
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

  ScrollTrigger.create({
    animation: sliderTL,
    trigger: ".families__content",
    start: `${VwToPx(isDesktopStore.getIsDesktop ? -1.56 : -4)} top`,
    scrub: true,
    pin: true,
  });
}
function animatinMenu() {
  gsap.to(".header", {
    scrollTrigger: {
      trigger: ".about",
      start: "top top",
      onEnter: () => {
        headerStateStore.changeCanHeaderChange(true);
        headerStateStore.changeColor();
        headerStateStore.changeLogoShow(true);
      },
    },
  });
  gsap.to(".header", {
    scrollTrigger: {
      trigger: ".first",
      start: "top top",
      onEnterBack: () => {
        headerStateStore.changeCanHeaderChange(false);
        headerStateStore.changeColor();
      },
    },
  });
}

// IMPORT ASSETS PRODUCTS //
import botl from "./assets/imgs/botl.png";
const listProducts = reactive([
  {
    name: "Chatzigiorgis",
    img: botl,
  },
  {
    name: "Voutaktakis",
    img: botl,
  },
  {
    name: "Chatzigiorgis",
    img: botl,
  },
]);
</script>
<style lang="scss">
@use "./index.scss";
</style>
