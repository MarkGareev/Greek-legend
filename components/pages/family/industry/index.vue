<template>
  <section class="section industry">
    <h2 class="title h2-smallcaps">Changing the industry</h2>

    <div class="industry-content" ref="targetAnimation">
      <div class="industry-dots">
        <div
          class="industry-dots-item"
          :class="{ 'industry-dots-item-active': index === activeDot }"
          v-for="(item, index) in list"
          :key="index"
        ></div>
      </div>
      <div class="industry-block" v-for="(item, index) in list" :key="index">
        <div
          class="industry-block-img"
          :style="{ 'background-image': `url(${item.img})` }"
        ></div>
        <div class="industry-block-title">
          <div class="industry-block-title-number grotesk">
            {{ index + 1 }}
          </div>
          <h3
            class="industry-block-title-heading"
            :class="{
              h1: isDesktopStore.getIsDesktop,
              h2: !isDesktopStore.getIsDesktop,
            }"
          >
            {{ item.title }}
          </h3>
        </div>

        <div class="industry-block-caption">
          <div class="industry-block-caption-item antique">
            {{ item.text }}
          </div>
          <div
            class="industry-block-caption-item-icon industry-block-caption-item"
            v-if="index === 0"
          >
            <img
              class="industry-block-caption-item-icon-img"
              src="@/assets/imgs/iris.webp"
              alt="IRIS"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const targetAnimation = ref();
import { useIsDesktopStore } from "@/stores/isDesktop";
const isDesktopStore = useIsDesktopStore();
const activeDot = ref(0);

onMounted(() => {
  ScrollTrigger.killAll();
  if (isDesktopStore.getIsDesktop) {
    animationIndustry();
  }
});

let tl;
function animationIndustry() {
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: targetAnimation.value,
      start: `top ${VwToPx(1.56)}px`,
      pin: true,
      scrub: true,
    },
  });
  const blocks = gsap.utils.toArray(".industry-block");
  blocks.forEach((block, index) => {
    if (index)
      tl.fromTo(
        block,
        { yPercent: -100 * (index - 1) },
        {
          yPercent: -100 * index,
          onComplete: () => {
            activeDot.value = index;
          },
          onReverseComplete: () => {
            activeDot.value = index - 1;
          },
        }
      );
  });
}

// IMPORT BACKGROUNDS INDUSTRY BLOCK //
import first from "./assets/imgs/industry/1.webp";
import second from "./assets/imgs/industry/2.webp";
import third from "./assets/imgs/industry/3.webp";
import fourth from "./assets/imgs/industry/4.webp";
import fifth from "./assets/imgs/industry/5.webp";
import sixth from "./assets/imgs/industry/6.webp";

const list = [
  {
    title: "Our work is based on the standards set out in the contracts.",
    img: first,
    text: "Harvest period: 10/2024-11/2024",
  },
  {
    title: "Optimization of olive harvesting and delivery to olive oil mills.",
    img: second,
    text: "24 hours in warm seasons and 48 hours in cold seasons for timely delivery.",
  },
  {
    title: "Assurance of high-quality and timely olive processing.",
    img: third,
    text: "Under the supervision of our specialists at the certified Greek Legend factory.",
  },
  {
    title:
      "Mixture of olive oil obtained in different seasons and manufacturers is excluded.",
    img: fourth,

    text: "Authentic Greek olive oil is unmixed for high quality.",
  },
  {
    title:
      "Each producer's olive oil is stored separately, with access for both us and the farmer.",
    img: fifth,
    text: "Secure high-tech olive oil storage facilities.",
  },
  {
    title:
      "We've created an efficient global olive oil transport system, reaching directly to store shelves.",
    img: sixth,
    text: "Transportation by authorized companies, transportation control.",
  },
];
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
