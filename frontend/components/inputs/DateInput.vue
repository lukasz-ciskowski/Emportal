<script lang="ts" setup>
import { VDatePicker } from 'vuetify/labs/VDatePicker';

const props = defineProps({
  label: String,
  modelValue: {
    type: Date as PropType<Date | null>,
  },
  errorMessages: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  disabled: Boolean,
});
const emit = defineEmits<{
  'update:modelValue': [Date];
}>();
const { label, disabled, errorMessages } = toRefs(props);

const { modelValue } = toRefs(props);
const menuOpened = ref(false);

const model = computed(() => [modelValue?.value?.toString()]);
const dateDisplay = computed(() => modelValue?.value?.toLocaleDateString());

const handleChange = (value: readonly any[]) => {
  emit('update:modelValue', new Date(value as any));
  menuOpened.value = false;
};
</script>

<template>
  <v-menu
    v-model="menuOpened"
    min-width="auto"
    offset-y
    transition="scale-transition"
    :close-on-content-click="false"
    :return-value.sync="modelValue"
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        :model-value="dateDisplay"
        :label="label"
        prepend-inner-icon="mdi-calendar"
        outlined
        readonly
        v-bind="props"
        :disabled="disabled"
        :error-messages="errorMessages"
      />
    </template>
    <v-date-picker
      v-model="model"
      no-title
      scrollable
      @update:model-value="handleChange"
      @click:save="menuOpened = false"
      @click:cancel="menuOpened = false"
    />
  </v-menu>
</template>
