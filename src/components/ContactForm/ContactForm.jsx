import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button, Stack, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addContact } from '../../redux/contacts/operations'

const phonePattern = /^\+?(?:(?:[0-9]+[- .]?)*\([0-9]+\)(?:[- .]?[0-9]+)*|(?:[0-9]+[- .]?)*[0-9]+)$/

export const ContactForm = () => {
  const dispatch = useDispatch()
  const { formState: { errors, isSubmitting }, handleSubmit, register, reset } = useForm({
    defaultValues: { name: '', number: '' },
  })

  const onSubmit = async (data) => {
    try {
      await dispatch(addContact(data)).unwrap()
      toast.success('Contact added.')
      reset()
    } catch (error) {
      toast.error(String(error))
    }
  }

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} spacing={2}>
      <TextField
        autoComplete="name"
        error={Boolean(errors.name)}
        fullWidth
        helperText={errors.name?.message}
        label="Name"
        {...register('name', {
          required: 'Name is required.',
          minLength: { value: 3, message: 'Name must contain at least 3 characters.' },
          maxLength: { value: 50, message: 'Name must contain no more than 50 characters.' },
          setValueAs: (value) => value.trim(),
        })}
      />
      <TextField
        autoComplete="tel"
        error={Boolean(errors.number)}
        fullWidth
        helperText={errors.number?.message ?? 'Format: +38 (099) 999-99-99'}
        inputMode="tel"
        label="Phone number"
        {...register('number', {
          required: 'Phone number is required.',
          pattern: { value: phonePattern, message: 'Enter a valid phone number.' },
          setValueAs: (value) => value.trim(),
        })}
      />
      <Button disabled={isSubmitting} type="submit" variant="contained">
        {isSubmitting ? 'Adding…' : 'Add contact'}
      </Button>
    </Stack>
  )
}
