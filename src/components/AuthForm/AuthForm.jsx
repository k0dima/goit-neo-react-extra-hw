import { useForm } from 'react-hook-form'
import { Button, Stack, TextField } from '@mui/material'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const AuthForm = ({ isLoading, mode, onSubmit }) => {
  const isRegister = mode === 'register'
  const { formState: { errors }, handleSubmit, register } = useForm({
    defaultValues: { name: '', email: '', password: '' },
  })

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} spacing={2}>
      {isRegister && (
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
      )}
      <TextField
        autoComplete="email"
        error={Boolean(errors.email)}
        fullWidth
        helperText={errors.email?.message}
        label="Email"
        type="email"
        {...register('email', {
          required: 'Email is required.',
          pattern: { value: emailPattern, message: 'Enter a valid email address.' },
          setValueAs: (value) => value.trim(),
        })}
      />
      <TextField
        autoComplete={isRegister ? 'new-password' : 'current-password'}
        error={Boolean(errors.password)}
        fullWidth
        helperText={errors.password?.message}
        label="Password"
        type="password"
        {...register('password', {
          required: 'Password is required.',
          minLength: { value: 7, message: 'Password must contain at least 7 characters.' },
        })}
      />
      <Button disabled={isLoading} type="submit" variant="contained">
        {isLoading ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}
      </Button>
    </Stack>
  )
}
