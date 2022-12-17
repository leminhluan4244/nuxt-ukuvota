export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxt/content',
  ],
  i18n: {
    baseUrl: 'https://ukuvota.world',
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.yml',
      },
      {
        code: 'de',
        iso: 'de-DE',
        file: 'de.yml',
      },
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    vueI18n: {
      legacy: false,
      locale: 'en',
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
  },
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/styles/main.css',
  ],
  colorMode: {
    classSuffix: '',
  },
  nitro: {
    storage: {
      db: {
        driver: 'redis',
        /* redis connector options */
      },
    },
    // Development
    devStorage: {
      db: {
        driver: 'fs',
        base: './data/db',
      },
    },
  },
})
