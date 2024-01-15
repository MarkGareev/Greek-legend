export const useHeaderStateStore = defineStore("headerState", {
  state: () => ({
    isColorWhite: true,
    isLogoShow: false,
    backgroundHeight: 0,
    canHeaderChange: false,
  }),
  getters: {
    getIsColorWhite: (state) => state.isColorWhite,
    getIsLogoShow: (state) => state.isLogoShow,
    getBackgroundHeight: (state) => state.backgroundHeight,
    getCanHeaderChange: (state) => state.canHeaderChange,
  },
  actions: {
    changeCanHeaderChange(can) {
      this.canHeaderChange = can;
    },
    changeLogoShow(isShow) {
      this.isLogoShow = isShow;
    },
    changeColor() {
      this.isColorWhite = !this.isColorWhite;
    },
    changeBackgroundHeight(height) {
      this.backgroundHeight = height;
      if (this.backgroundHeight >= 93) {
        this.isColorWhite = true;
        this.isLogoShow = true;
      } else {
        this.isColorWhite = false;
        this.isLogoShow = false;
      }
    },
  },
});
