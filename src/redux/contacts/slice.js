import { createSlice } from '@reduxjs/toolkit'
import { addContact, deleteContact, fetchContacts } from './operations'

const initialState = { items: [], isLoading: false, error: null }

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoading = false
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? 'Unable to load contacts.'
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload)
      })
  },
})

export const contactsReducer = contactsSlice.reducer
