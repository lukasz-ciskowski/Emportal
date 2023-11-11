<script setup lang="ts">
import { useEmployees } from './composables/useEmployees';

const { data } = await useEmployees();
const apiPath = useRuntimeConfig().public.api;
</script>

<template>
  <v-row align="center">
    <v-col v-for="employee in data?.employees" lg="4" sm="6" cols="12">
      <v-card variant="elevated" :to="`/employees/${employee.id}`" exact>
        <v-card-item class="pa-0">
          <div class="d-flex flex-column">
            <NuxtImg class="picture" :src="`${apiPath}${employee.profilePicture}`" />
            <div class="pa-4 d-flex flex-column">
              <span class="text-h6">{{ employee.firstName }} {{ employee.lastName }}</span>
              <span class="text-medium-emphasis">{{ employee.position }}</span>
            </div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
.picture {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
</style>
