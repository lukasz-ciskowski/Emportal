<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import { Experience } from '../composables/useRetrieveEmployee';
import { toTypedSchema } from '@vee-validate/yup';
import { FormExperience, experienceValidationSchema } from '../schema';
import { useForm } from 'vee-validate';
import DateInput from '~/components/inputs/DateInput.vue';

const props = defineProps({
  experience: {
    type: Object as PropType<FormExperience>,
    required: false,
  },
});
const emit = defineEmits<{
  hide: [];
  save: [FormExperience];
}>();

const { experience } = toRefs(props);

const { handleSubmit, defineComponentBinds, setFieldValue } = useForm({
  validationSchema: toTypedSchema(experienceValidationSchema),
  initialValues: experience,
});

const modalTitle = computed(() => (experience?.value ? 'Edytuj doświadczenie' : 'Dodaj doświadczenie'));

const title = defineComponentBinds('title', vuetifyValidator);
const description = defineComponentBinds('description', vuetifyValidator);
const from = defineComponentBinds('from', vuetifyValidator);
const to = defineComponentBinds('to', vuetifyValidator);

const isStillEmployed = ref(experience?.value?.to === null);

const handleChangeEmployed = () => {
  isStillEmployed.value = !isStillEmployed.value;
  if (isStillEmployed.value) {
    setFieldValue('to', null);
  } else {
    setFieldValue('to', undefined);
  }
};

const handleSave = handleSubmit(async (values) => {
  emit('save', values);
});
const handleClose = () => {
  emit('hide');
};
</script>

<template>
  <v-dialog width="500" :model-value="true" @update:model-value="handleClose">
    <v-card :title="modalTitle" variant="flat">
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Pozycja" v-bind="title" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea label="Opis" v-bind="description" required></v-textarea>
          </v-col>
          <v-col cols="12">
            <date-input v-bind="from" label="Zatrudnienie od" />
          </v-col>
          <v-col cols="12">
            <v-switch
              label="Pracuję obecnie na tym stanowisku"
              @update:model-value="handleChangeEmployed"
              :model-value="isStillEmployed"
              color="primary"
              hide-details
            />
            <date-input v-bind="to" label="Zatrudnienie do" :disabled="to.modelValue === null" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="handleClose" color="secondary">Anuluj</v-btn>
        <v-btn @click="handleSave" color="primary">Zapisz</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
../formTypes
