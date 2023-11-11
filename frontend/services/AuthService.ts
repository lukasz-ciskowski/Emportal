import { User } from '~/models/user';

interface UserResponse {
  userData: User;
}

class AuthService {
  async validateUser(): Promise<UserResponse | null> {
    const { data: user } = await useFetch<UserResponse>('/api/user', {
      credentials: 'include',
    });
    return user.value;
  }

  logout() {}
}

export const authService = new AuthService();
