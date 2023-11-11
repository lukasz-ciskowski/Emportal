<script setup lang="ts">
import { useAuthStore } from '~/stores/auth/auth';
import { Experience, useRetrieveEmployee } from './composables/useRetrieveEmployee';
import { useInterests } from './composables/useInterests';
import { useDisplay } from 'vuetify';
import { useFieldArray, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { FormExperience, validationSchema } from './schema';
import InterestsList from './components/InterestsList.vue';
import ExperiencesList from './components/ExperiencesList.vue';

const route = useRoute();
const { data } = await useRetrieveEmployee(route.params.id.toString() ?? '');
const { data: allInterests } = await useInterests();

const apiPath = useRuntimeConfig().public.api;
const authStore = useAuthStore();
const { smAndDown, mdAndUp } = useDisplay();
const isLoggedUser = route.params.id.toString() === authStore.userData?.id.toString();
const isUiReady = process.client;

const isEditing = ref(false);

const handleEnterEditing = () => (isEditing.value = true);
const handleCancelEditing = () => {
  resetForm();
  isEditing.value = false;
};

const { handleSubmit, defineComponentBinds, setErrors, resetForm } = useForm({
  validationSchema: toTypedSchema(validationSchema),
  initialValues: {
    about: data.value?.about ?? '',
    interests: data.value?.interests ?? [],
    experience:
      data.value?.experience.map((e) => ({
        ...e,
        from: new Date(e.from),
        to: e.to ? new Date(e.to) : null,
      })) ?? [],
  },
});

const about = defineComponentBinds('about');
const { remove: removeInterest, push: addInterest, fields: interests } = useFieldArray('interests');
const {
  push: addExperience,
  fields: experiences,
  remove: removeExperience,
  update: updateExperience,
} = useFieldArray<FormExperience>('experience');

const handleEditExperience = (idx: number, exp: FormExperience) => {
  updateExperience(idx, exp);
};

const availableInterests = computed(() => {
  const currentInterests = Array.from(interests.value).map((i) => String(i.value));
  return allInterests.value?.interests.filter((interest) => !currentInterests.includes(interest));
});
</script>

<template>
  <v-row>
    <v-col lg="4" sm="12" cols="12">
      <v-row>
        <v-col lg="12" sm="5" cols="12">
          <NuxtImg class="picture" :src="`${apiPath}${data?.profilePicture}`" />
          <v-btn
            v-show="mdAndUp && isLoggedUser && !isEditing"
            variant="outlined"
            color="primary"
            prepend-icon="mdi-pencil"
            class="w-100 mt-5"
            @click="handleEnterEditing"
            >Edytuj</v-btn
          >
        </v-col>
        <v-col lg="12" sm="7" cols="12">
          <div class="py-4 d-flex flex-column">
            <span class="text-h5 font-weight-bold">{{ data?.firstName }} {{ data?.lastName }}</span>
            <span class="text-medium-emphasis">{{ data?.position }}</span>
          </div>
          <Section title="O mnie" />
          <p class="text-justify" v-if="!isEditing">{{ about.modelValue }}</p>
          <v-textarea v-else outlined rows="8" v-bind="about" placeholder="Opisz siebie" />
        </v-col>
      </v-row>
    </v-col>
    <v-col lg="7" cols="12">
      <Section title="Doświadczenie" />
      <ExperiencesList
        :experiences="Array.from(experiences).map((e) => e.value)"
        :isEditing="isEditing"
        @add-experience="addExperience"
        @remove-experience="removeExperience"
        @edit-experience="handleEditExperience"
      />
      <Section title="Zainteresowania" class="mt-12" />
      <InterestsList
        :isEditing="isEditing"
        :selected="interests.map((i) => String(i.value))"
        :available="availableInterests"
        @add="addInterest"
        @remove="removeInterest"
      />
    </v-col>
  </v-row>
  <v-btn
    v-show="smAndDown && isUiReady && isLoggedUser && !isEditing"
    class="fab-button"
    variant="elevated"
    color="primary"
    size="x-large"
    icon="mdi-pencil"
    @click="handleEnterEditing"
  />
  <v-footer app v-show="isEditing">
    <v-container class="d-flex justify-end">
      <v-btn variant="text" size="large" class="mr-4" @click="handleCancelEditing">Anuluj</v-btn>
      <v-btn variant="flat" color="primary" size="large" class="save-button">Zapisz</v-btn>
    </v-container>
  </v-footer>
</template>

<style scoped lang="scss">
.experience-dates {
  margin-bottom: -10px;
}
.fab-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.picture {
  height: 300px;
  width: 100%;
  object-fit: cover;
}

.save-button {
  min-width: 200px;
}
</style>
./formTypes
