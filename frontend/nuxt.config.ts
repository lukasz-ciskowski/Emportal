const theme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#BC8127',
    secondary: '#444444',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
};

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Emportal Portal Pracowniczy',
    },
  },
  // @ts-ignore
  modules: ['@invictus.codes/nuxt-vuetify', '@nuxt/image', '@pinia/nuxt', 'nuxt-svgo', '@vite-pwa/nuxt'],
  svgo: {
    autoImportPath: false,
  },
  pwa: {
    registerType: 'autoUpdate',
    strategies: 'injectManifest',
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      // suppressWarnings: true,
      // navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
    manifest: {
      name: 'Emportal',
      short_name: 'Emportal',
      theme_color: '#444444',
      icons: [
        {
          src: 'static/icon_512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'static/icon_144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: 'static/icon_64.png',
          sizes: '64x64',
          type: 'image/png',
        },
      ],
    },
  },
  // @ts-ignore
  buildModules: ['@nuxtjs/style-resources'],
  routeRules: {
    '/api/**': {
      proxy: { to: 'http://localhost:8080/**' },
    },
  },
  runtimeConfig: {
    public: {
      api: 'http://localhost:8080',
    },
  },
  css: ['~/assets/styles/main.scss'],
  vuetify: {
    vuetifyOptions: {
      ssr: true,
      defaults: {
        global: {
          variant: 'outlined',
        },
      },
      theme: {
        defaultTheme: 'theme',
        themes: {
          theme,
        },
      },
      icons: {
        defaultSet: 'mdi',
      },
    },

    moduleOptions: {
      treeshaking: true,
      useIconCDN: true,
      styles: true,
      autoImport: true,
      useVuetifyLabs: true,
    },
  },
});
