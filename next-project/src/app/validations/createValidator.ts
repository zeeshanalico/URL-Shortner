import { z } from 'zod';

export const createValidator = <T>(schema: z.ZodSchema<T>) => {
  return (data: T): T => {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
      console.log(validationResult);
      const errorMessage = validationResult.error.errors.map((error, index) => {
        if (index === 0) return `${error.message}`;
      });

      console.log(errorMessage);
      throw new Error(errorMessage.join(' '));
    }
    return validationResult.data;
  };
};
