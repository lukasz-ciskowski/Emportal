<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>

<template>
  <p class="text-h5 section-title" color="primary">{{ props.title }}</p>
</template>

<style scoped lang="scss">
@import '/assets/styles/_variables.scss';
.section-title {
  color: $primary;
}
</style>
