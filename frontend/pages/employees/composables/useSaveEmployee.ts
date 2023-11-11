import { FormValues } from '../schema';

export function useSaveEmployee() {
  const handleSave = async (employee: FormValues) => {
    try {
      await $fetch('/api/employees', {
        method: 'PUT',
        body: JSON.stringify(employee),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleSave,
  };
}
