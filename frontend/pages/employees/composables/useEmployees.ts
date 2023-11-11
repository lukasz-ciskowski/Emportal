import { User } from '~/models/user';

export interface EmployeesResponse {
  employees: User[];
}

export async function useEmployees() {
  return useFetch<EmployeesResponse>('/api/employees');
}
