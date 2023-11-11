<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { useForm } from 'vee-validate';
import { validationSchema } from './schema';
import { vuetifyValidator } from '../../utils/validator';
import { toTypedSchema } from '@vee-validate/yup';
import { authenticate } from './api';
import { useAuthStore } from '~/stores/auth/auth';

const { handleSubmit, defineComponentBinds, setErrors } = useForm({
  validationSchema: toTypedSchema(validationSchema),
});

const login = defineComponentBinds('login', vuetifyValidator);
const password = defineComponentBinds('password', vuetifyValidator);
const loading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    const authStore = useAuthStore();

    const result = await authenticate(values);
    authStore.setUserData(result.userData);
    navigateTo('/employees');
  } catch (error) {
    setErrors({
      login: 'Nieprawidłowe dane logowania',
      password: 'Nieprawidłowe dane logowania',
    });
  } finally {
    loading.value = false;
  }
});

const { name } = useDisplay();
const variant = computed(() => {
  if (!process.client) return null;
  switch (name.value) {
    case 'xs':
    case 'sm':
    case 'md':
      return 'flat';
    default:
      return 'elevated';
  }
});
</script>

<template>
  <v-container v-show="variant">
    <v-row align="center" justify="center">
      <v-card :variant="variant!" class="login-card ma-4 pa-4">
        <v-form @submit="onSubmit">
          <v-card-item>
            <v-row dense>
              <v-col cols="12">
                <div class="text-h5">Zaloguj się</div>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Login" v-bind="login" />
              </v-col>
              <v-col cols="12">
                <v-text-field label="Hasło" v-bind="password" type="password" />
              </v-col>
            </v-row>
          </v-card-item>

          <v-card-actions>
            <v-btn class="w-100" variant="flat" color="primary" type="submit" :loading="loading">Zaloguj</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.login-card {
  width: 100%;
  max-width: 700px;
}
</style>
