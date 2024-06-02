import { configureStore, createSlice } from '@reduxjs/toolkit'


const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null
}

const initialState = {
  user: getUserFromLocalStorage()
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const user = { token: action.payload.token }

      state.user = user

      localStorage.setItem('user', JSON.stringify(user))
    },
    loginUser: (state, action) => {
      const user = { token: action.payload.token }
      
      state.user = user

      localStorage.setItem('user', JSON.stringify(user))
    },
    logoutUser: (state) => {
      state.user = null
      
      localStorage.removeItem('user')
    }
  },
})


export const store = configureStore({
  reducer: {
    userState: userSlice.reducer,
  },
})


export const { registerUser, loginUser, logoutUser } = userSlice.actions