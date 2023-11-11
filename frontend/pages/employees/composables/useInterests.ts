import { User } from '~/models/user';

export interface InterestsResponse {
  interests: string[];
}

export async function useInterests() {
  return useFetch<InterestsResponse>('/api/static/interests');
}
