// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  css: ["~/assets/styles/index.scss", "~/assets/fonts/style.scss"],
  modules: ["@nuxtjs/i18n", "@pinia/nuxt"],
  pinia: {
    storesDirs: ["./stores/**"],
  },

  //   i18n: {
  //     locales: [
  //       {
  //         code: "en",
  //         iso: "en-US",
  //         name: "English",
  //         file: "en-US.js",
  //       },
  //       {
  //         code: "ru",
  //         iso: "ru-RU",
  //         name: "Русский",
  //         file: "ru-RU.js",
  //       },
  //     ],
  //     lazy: true,
  //     langDir: "locales",
  //     strategy: "no_prefix",
  //     defaultLocale: "ru",
  //     detectBrowserLanguage: {
  //       useCookie: true,
  //       cookieKey: "i18n_redirected",
  //       redirectOn: "root",
  //     },
  //   },
  app: {
    head: {
      title: "Greek Legend",
      htmlAttrs: {
        lang: "ru",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "",
        },
        {
          name: "keywords",
          content: "",
        },
        { name: "format-detection", content: "telephone=no" },
        {
          hid: "og:title",
          property: "og:title",
          content: "",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
