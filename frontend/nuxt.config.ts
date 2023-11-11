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
  modules: ['@invictus.codes/nuxt-vuetify', '@nuxt/image', '@pinia/nuxt', 'nuxt-svgo'],
  svgo: {
    autoImportPath: false,
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
