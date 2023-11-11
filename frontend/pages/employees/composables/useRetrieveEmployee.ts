import { User } from '~/models/user';

export interface EmployeeResponse extends User {
  about: string;
  interests: string[];
  experience: Experience[];
}

export interface Experience {
  from: string;
  to: string | null;
  title: string;
  description: string;
}

export async function useRetrieveEmployee(id: string) {
  return useFetch<EmployeeResponse>(`/api/employees/${id}`);
}
