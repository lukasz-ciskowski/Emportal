<script setup lang="ts">
import './utils/yup';
</script>

<template>
  <VitePwaManifest />
  <NuxtLoadingIndicator />
  <v-app>
    <Nav />
    <v-main class="main-content">
      <v-container class="pt-18"> <NuxtPage /> </v-container>
    </v-main>
  </v-app>
</template>

<style scoped lang="scss">
@import '/assets/styles/_variables.scss';
.main-content {
  padding-top: $header-height;
}
</style>
