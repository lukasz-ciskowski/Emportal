import { User } from '~/models/user';

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  userData: User;
  token: string;
}

export async function authenticate(body: LoginRequest): Promise<LoginResponse> {
  const result = await $fetch<LoginResponse>('/api/login', {
    method: 'post',
    body: body,
    credentials: 'include',
  });
  return result;
}
