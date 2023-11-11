<script setup lang="ts">
import { useDisplay } from 'vuetify';
import InterestsMenu from './InterestsMenu.vue';

const props = defineProps({
  isEditing: Boolean,
  selected: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  available: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

const emit = defineEmits<{
  add: [value: string];
  remove: [index: number];
}>();

const { isEditing, selected, available } = toRefs(props);
const { smAndDown } = useDisplay();
const chipSize = computed(() => {
  if (smAndDown.value) return 'large';
  return 'default';
});

const handleRemove = (value: string) => {
  const index = selected.value.indexOf(value);
  if (index > -1) {
    emit('remove', index);
  }
};
const isReady = !!process.client;
</script>

<template>
  <div class="d-flex mt-2" v-if="isReady">
    <div v-for="interest in selected" class="mr-1 mb-1">
      <v-chip
        variant="flat"
        :key="interest"
        :closable="isEditing"
        :size="chipSize"
        @click:close="handleRemove(interest)"
      >
        {{ interest }}
      </v-chip>
    </div>
    <InterestsMenu :show="isEditing" @add="(value) => emit('add', value)" :options="available" />
  </div>
</template>
