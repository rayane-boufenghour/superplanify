// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss', 
    '@nuxtjs/i18n',
    '@auth0/auth0-nuxt'
  ],
  runtimeConfig: {
    auth0: {
      domain: process.env.NUXT_AUTH0_DOMAIN,
      clientId: process.env.NUXT_AUTH0_CLIENT_ID,
      clientSecret: process.env.NUXT_AUTH0_CLIENT_SECRET,
      sessionSecret: process.env.NUXT_AUTH0_SESSION_SECRET,
      appBaseUrl: process.env.NUXT_AUTH0_APP_BASE_URL,
    },
  },
  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
      { code: 'fr', name: 'Français', language: 'fr-FR', file: 'fr.json' },
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'superplanify_i18n_redirected',
      redirectOn: 'root',
    },
  },
  app : {
    head : {
      title: 'SuperPlanify',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png'},
      ],
    },
  },
})