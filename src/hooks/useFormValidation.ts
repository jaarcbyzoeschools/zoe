import { useForm, UseFormProps, FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodSchema } from 'zod'

interface UseFormValidationOptions<T extends FieldValues> extends Omit<UseFormProps<T>, 'resolver'> {
  schema: ZodSchema
}

export const useFormValidation = <T extends FieldValues = FieldValues>({
  schema,
  ...options
}: UseFormValidationOptions<T>) => {
  return useForm<T>({
    resolver: zodResolver(schema as any),
    mode: 'onBlur',
    ...options,
  })
}