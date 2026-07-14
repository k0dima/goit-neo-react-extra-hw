import { createAsyncThunk } from '@reduxjs/toolkit'
import { clearAuthHeader, getCurrentUser, setAuthHeader, signIn, signOut, signUp } from '../../api/contactsApi'
import { getErrorMessage } from '../../utils/getErrorMessage'

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkApi) => {
    try {
      const response = await signUp(credentials)
      setAuthHeader(response.token)
      return response
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error))
    }
  },
)

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials, thunkApi) => {
    try {
      const response = await signIn(credentials)
      setAuthHeader(response.token)
      return response
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error))
    }
  },
)

export const logOut = createAsyncThunk('auth/logOut', async (_, thunkApi) => {
  try {
    await signOut()
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error))
  } finally {
    clearAuthHeader()
  }
})

export const refreshCurrentUser = createAsyncThunk(
  'auth/refreshCurrentUser',
  async (_, thunkApi) => {
    const token = thunkApi.getState().auth.token

    if (!token) {
      return thunkApi.rejectWithValue('Missing authentication token.')
    }

    setAuthHeader(token)

    try {
      return await getCurrentUser()
    } catch (error) {
      clearAuthHeader()
      return thunkApi.rejectWithValue(getErrorMessage(error))
    }
  },
)
