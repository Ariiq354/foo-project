// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    "@nuxt/ui",
    "nuxt-security",
    "@nuxt/eslint",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@nuxtjs/cloudinary",
  ],

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseAuthToken: process.env.DATABASE_AUTH_TOKEN,
  },

  $development: {
    security: {
      removeLoggers: false,
    },
  },

  $production: {
    ignorePrefix: "_",
  },

  security: {
    headers: {
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        "img-src": ["'self'", "data:", "https://res.cloudinary.com"],
      },
    },
  },

  routeRules: {
    "/api/blog": {
      security: {
        xssValidator: false,
      },
    },
  },
});
