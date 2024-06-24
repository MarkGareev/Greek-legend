<template>
  <div class="card" :class="customClass">
    <div class="card-front" @click="openPopup">
      <div class="card-front__title">
        <img class="card-front__title-img" :src="img" :alt="title" />
        <h6 class="card-front__title-h6 caption">{{ title }}</h6>
      </div>
      <div class="card-front__text greek-caption">
        {{ text }}
      </div>
      <div class="card-front__basement antique">
        Hover over the card for more information
      </div>
    </div>
    <div class="card-back desktop">
      <div class="card-back-row">
        <img class="card-back__img" :src="reversedImg" :alt="reversedImgAlt" />
        <p class="card-back__title caption" v-html="reversedTitle"></p>
      </div>

      <div class="card-back__text antique">
        {{ reversedText }}
      </div>
    </div>
    <Teleport to="body">
      <div class="card-popup mobile" v-show="popupIsOpen">
        <div class="card-popup__close" @click="closePopup">
          <svg
            class="card-popup__close-img"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L11 11M21 21L11 11M11 11L21 1L1 21" stroke="#2C2C2C" />
          </svg>
        </div>
        <div class="card-popup__icon">
          <img class="card-popup__icon-img" :src="imgBrown" :alt="title" />
          <h6 class="card-popup__icon-h6 caption">{{ title }}</h6>
        </div>
        <p class="card-popup__text greek-caption">{{ text }}</p>
        <div class="card-popup__content">
          <div class="card-popup__content-row">
            <img
              class="card-popup__content-row-img"
              :src="reversedImg"
              :alt="reversedImgAlt"
              :width="widthVw"
              :height="heightVw"
            />
            <h5
              class="card-popup__content-row-title caption"
              :style="{ 'margin-top': lastChild ? '2.933vw' : 0 }"
              v-html="reversedTitle"
            ></h5>
          </div>
          <p class="card-popup__content-text antique">{{ reversedText }}</p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
const props = defineProps({
  img: { type: String, require: true },
  imgBrown: { type: String, require: true },
  title: { type: String, require: true },
  text: { type: String, require: true },
  reversedTitle: { type: String, require: true },
  reversedImg: { type: String, require: true },
  reversedImgAlt: { type: String, require: true },
  reversedText: { type: String, require: true },
  customClass: { type: String, default: "" },
  lastChild: { type: Boolean, default: false },
  width: { type: Number, require: true },
  height: { type: Number, require: true },
});
const widthVw = ref();
const heightVw = ref();
onMounted(() => {
  widthVw.value = VwToPx(props.width);
  heightVw.value = VwToPx(props.height);
});
const popupIsOpen = ref(false);
function openPopup() {
  popupIsOpen.value = true;
}
function closePopup() {
  popupIsOpen.value = false;
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
