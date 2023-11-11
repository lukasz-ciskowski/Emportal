<script setup lang="ts">
const props = defineProps({
  show: Boolean,
  options: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});
const emit = defineEmits<{
  add: [value: string];
}>();

const { options, show } = toRefs(props);
const handleSelect = (value: { id: unknown; value: boolean; path: unknown[] }) => {
  emit('add', String(value.id));
};
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-plus" class="interests-list-add-btn" v-show="show" v-bind="props" />
    </template>
    <v-list @click:select="handleSelect">
      <v-list-item v-for="item in options" :key="item" :value="item" variant="flat">
        <v-list-item-title>{{ item }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped lang="scss">
@import '/assets/styles/_mixins.scss';
.interests-list-add-btn {
  @include media(tablet, mobile) {
    height: 36px;
    width: 36px;
  }
  @include media(desktop) {
    height: 30px;
    width: 30px;
  }
}
</style>
