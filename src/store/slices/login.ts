import { createSlice } from '@reduxjs/toolkit'
import { storage } from 'utils/storage'

const authState = {
  token: storage.get('token') || '',
}

const loginSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload
    },
    logout: (state) => {
      state.token = ''
    },
  },
})

export const { loginSuccess, logout } = loginSlice.actions

export default loginSlice.reducer
