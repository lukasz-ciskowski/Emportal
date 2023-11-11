<script setup lang="ts">
import { useDisplay } from 'vuetify';
import ExperienceItemModal from './ExperienceItemModal.vue';
import { DateTime } from 'luxon';
import { FormExperience } from '../schema';

const props = defineProps({
  isEditing: Boolean,
  experiences: {
    type: Array as PropType<FormExperience[]>,
    default: () => [],
  },
});

const emit = defineEmits<{
  addExperience: [FormExperience];
  editExperience: [number, FormExperience];
  removeExperience: [number];
}>();

const { isEditing, experiences } = toRefs(props);
const modalOpened = ref(false);
const editingExp = ref<FormExperience | null>(null);

const { smAndDown } = useDisplay();
const editingButtonSize = computed(() => {
  if (smAndDown.value) return 'large';
  return 'small';
});
const addButtonSize = computed(() => {
  if (smAndDown.value) return 'large';
  return 'default';
});

const handleHide = () => {
  modalOpened.value = false;
  editingExp.value = null;
};

const handleAddExperience = (exp: FormExperience) => {
  modalOpened.value = false;
  emit('addExperience', exp);
};

const handleRemoveExperience = (idx: number) => {
  emit('removeExperience', idx);
};

const handleEditExperience = (exp: FormExperience) => {
  editingExp.value = exp;
  modalOpened.value = true;
};

const handleSubmitEditExperience = (exp: FormExperience) => {
  if (!editingExp.value) return;
  const expIndex = experiences.value.indexOf(editingExp.value);

  modalOpened.value = false;
  editingExp.value = null;

  emit('editExperience', expIndex, exp);
};
</script>

<template>
  <div v-for="(experience, index) in experiences" class="mt-3">
    <div class="mb-5 d-flex align-end">
      <div>
        <div class="text-overline experience-dates">
          {{ DateTime.fromJSDate(experience.from).toLocaleString(DateTime.DATE_MED) }} -
          {{ experience.to ? DateTime.fromJSDate(experience.to).toLocaleString(DateTime.DATE_MED) : 'Obecnie' }}
        </div>
        <span class="text-h6">{{ experience.title }}</span>
        <p class="text-medium-emphasis">{{ experience.description }}</p>
      </div>
      <div v-show="isEditing" class="ml-auto">
        <v-btn icon color="primary" class="mr-2" :size="editingButtonSize" @click="handleEditExperience(experience)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="error" :size="editingButtonSize" @click="handleRemoveExperience(index)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
  <v-btn
    v-show="isEditing"
    color="primary"
    :size="addButtonSize"
    prependIcon="mdi-plus"
    class="mt-4"
    @click="() => (modalOpened = true)"
  >
    Dodaj
  </v-btn>
  <ExperienceItemModal
    v-if="modalOpened"
    @hide="handleHide"
    :onSave="editingExp ? handleSubmitEditExperience : handleAddExperience"
    :experience="editingExp ?? undefined"
  />
</template>
