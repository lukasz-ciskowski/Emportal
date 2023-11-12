import { FormValues } from '../schema';

export function useSaveEmployee() {
  const handleSave = (employee: FormValues) => {
    return $fetch('/api/employees', {
      method: 'PUT',
      body: JSON.stringify(employee),
    });
  };

  return {
    handleSave,
  };
}
