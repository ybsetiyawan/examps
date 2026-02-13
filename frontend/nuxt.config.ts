export default defineNuxtConfig({
  modules: [
    [
      "vuetify-nuxt-module",
      {
        theme: {
          defaultTheme: "light",
        },
      },
    ],
  ],

  css: [
      "vuetify/styles",
      "@mdi/font/css/materialdesignicons.css"],

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  devServer: {
    port: 8090,
      host: "0.0.0.0",   
      // url: "http://10.126.101.217:8090", 
         // <-- TAMBAHKAN INI
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  
});
