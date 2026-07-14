import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/es/storage'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import { AUTH_PERSIST_KEY } from './auth/constants'
import { authReducer } from './auth/slice'
import { contactsReducer } from './contacts/slice'
import { filtersReducer } from './filters/slice'

const authPersistConfig = {
  key: AUTH_PERSIST_KEY,
  storage,
  whitelist: ['token'],
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  contacts: contactsReducer,
  filters: filtersReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
