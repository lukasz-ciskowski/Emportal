import { authService } from '~/services/AuthService';
import { useAuthStore } from '~/stores/auth/auth';

const EXCLUDED_ROUTES = ['/login'];

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (EXCLUDED_ROUTES.includes(to.path)) {
    return;
  }
  try {
    const userResponse = await authService.validateUser();
    if (userResponse === null) {
      return navigateTo('/login');
    } else {
      const store = useAuthStore();
      store.setUserData(userResponse.userData);
    }
  } catch (error) {
    return navigateTo('/login');
  }
});
