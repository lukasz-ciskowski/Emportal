<script setup lang="ts">
import { useAuthStore } from '~/stores/auth/auth';
import Logo from '~/assets/images/logo.svg';

const userStore = useAuthStore();
const { userData } = storeToRefs(userStore);
const apiPath = useRuntimeConfig().public.api;

const handleSelect = (value: { id: unknown; value: boolean; path: unknown[] }) => {
  if (value.id === 'profile') navigateTo(`/employees/${userStore.userData?.id}`);
};
</script>

<template>
  <v-app-bar color="secondary">
    <v-container class="header">
      <Logo class="logo" filled @click="navigateTo('/')" />
      <div v-if="userData" class="d-flex align-center">
        <span class="mr-2">{{ userData.firstName }}</span>
        <span class="mr-2">{{ userData.lastName }}</span>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" append-icon="mdi-chevron-down">
              <NuxtImg :src="`${apiPath}${userData.profilePicture}`" :placeholder="[35, 35, 1, 1]" class="avatar" />
            </v-btn>
          </template>
          <v-list variant="flat" @click:select="handleSelect">
            <v-list-item value="profile">
              <v-list-item-title>Profil</v-list-item-title>
            </v-list-item>
            <v-list-item value="signOut">
              <v-list-item-title>Wyloguj</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-container>
  </v-app-bar>
</template>

<style scoped lang="scss">
@import '/assets/styles/_variables.scss';
.header {
  padding: 10px 15px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  height: $header-height;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid white;
}

.logo {
  width: 110px;
  height: 44px;
  cursor: pointer;
}
</style>
