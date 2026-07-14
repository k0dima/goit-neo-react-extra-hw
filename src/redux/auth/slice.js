import { createSlice } from '@reduxjs/toolkit'
import { logIn, logOut, refreshCurrentUser, register } from './operations'

const initialState = {
  user: null,
  token: null,
  isRefreshing: false,
  isLoading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isLoading = false
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isLoading = false
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(logIn.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(logOut.fulfilled, () => initialState)
      .addCase(logOut.rejected, () => initialState)
      .addCase(refreshCurrentUser.pending, (state) => {
        state.isRefreshing = true
      })
      .addCase(refreshCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isRefreshing = false
      })
      .addCase(refreshCurrentUser.rejected, () => initialState)
  },
})

export const authReducer = authSlice.reducer
