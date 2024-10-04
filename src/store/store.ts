import { configureStore } from '@reduxjs/toolkit'
import usersReducer  from './userSlice'
import tokenReducer from './tokenSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    tokens:tokenReducer,
  },
})