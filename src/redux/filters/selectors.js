import { createSelector } from '@reduxjs/toolkit'
import { selectContacts } from '../contacts/selectors'

export const selectNameFilter = (state) => state.filters.name

export const selectVisibleContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.trim().toLocaleLowerCase()
    const phoneFilter = normalizedFilter.replace(/\D/g, '')

    return contacts.filter(
      (contact) =>
        contact.name.toLocaleLowerCase().includes(normalizedFilter) ||
        (phoneFilter.length > 0 && contact.number.replace(/\D/g, '').includes(phoneFilter)),
    )
  },
)
