import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/login'

const store = configureStore({
  reducer: {
    auth: loginReducer,
  },
})

export default store

export type AppDispatch = typeof store.dispatch
