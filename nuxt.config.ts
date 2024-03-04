// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    `nuxt-vuefire`,
  ],

  vuefire: {
    auth: {
      enabled: true,
      sessionCookie: true,
    },
    config: {
      apiKey: "AIzaSyDv6T-nT09y5aEJUwSkrTWPKb5tSjhiJoA",
      authDomain: "deeznuts-ec62b.firebaseapp.com",
      projectId: "deeznuts-ec62b",
      storageBucket: "deeznuts-ec62b.appspot.com",
      messagingSenderId: "177091394853",
      appId: "1:177091394853:web:b1cd5afc260347bf80eecc",
      measurementId: "G-11ESTS8WHQ"
    },
  },
})
