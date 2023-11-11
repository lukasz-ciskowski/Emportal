import { defineStore } from 'pinia';
import { User } from '~/models/user';

interface Store {
  userData: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): Store => {
    return { userData: null };
  },
  actions: {
    setUserData(data: User) {
      this.userData = data;
    },
  },
});
