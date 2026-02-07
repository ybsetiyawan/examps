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

  css: ["vuetify/styles", "@mdi/font/css/materialdesignicons.css"],

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  devServer: {
    port: 8090,
      host: "0.0.0.0",   
      url: "http://172.24.231.111:8090", 
         // <-- TAMBAHKAN INI
  },

  
});
