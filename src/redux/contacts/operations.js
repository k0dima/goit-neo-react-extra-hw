import { createAsyncThunk } from '@reduxjs/toolkit'
import { createContact, getContacts, removeContact } from '../../api/contactsApi'
import { getErrorMessage } from '../../utils/getErrorMessage'

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      return await getContacts()
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error))
    }
  },
)

export const addContact = createAsyncThunk(
  'contacts/add',
  async (contact, thunkApi) => {
    const normalizedName = contact.name.trim().toLocaleLowerCase()
    const exists = thunkApi
      .getState()
      .contacts.items.some((item) => item.name.trim().toLocaleLowerCase() === normalizedName)

    if (exists) {
      return thunkApi.rejectWithValue(`${contact.name} is already in your contacts.`)
    }

    try {
      return await createContact(contact)
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error))
    }
  },
)

export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (contactId, thunkApi) => {
    try {
      await removeContact(contactId)
      return contactId
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error))
    }
  },
)
