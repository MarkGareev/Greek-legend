<template>
  <swiper :pagination="true" :modules="modules" class="slider">
    <swiper-slide
      v-for="(item, index) in list"
      :key="index"
      class="slider-slide"
    >
      <h6 class="slider-slide-h6 italic-caption">{{ item.name }}</h6>
      <img class="slider-slide-img" :src="item.img" alt="botl"
    /></swiper-slide>
  </swiper>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
const modules = [Pagination];

const props = defineProps({
  list: { type: Array, required: true },
});
onMounted(() => {
  console.log(toRaw(props.list));
});
</script>
<style lang="scss">
@use "./slider.scss";
</style>
