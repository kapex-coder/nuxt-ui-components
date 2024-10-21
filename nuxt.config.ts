// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      builderPublicApiKey: '',
    }
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@builder.io/sdk-vue/nuxt"],
});
