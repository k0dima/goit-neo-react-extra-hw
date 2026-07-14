import axios from 'axios'

export const getErrorMessage = (error) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.message
  }

  return error instanceof Error ? error.message : 'Something went wrong. Please try again.'
}
