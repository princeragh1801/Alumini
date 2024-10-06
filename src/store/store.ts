import { configureStore } from '@reduxjs/toolkit'
import usersReducer  from './userSlice'
import tokenReducer from './tokenSlice';

// RootState interface for type safety
export interface RootState {
  users: ReturnType<typeof usersReducer>;
  tokens: ReturnType<typeof tokenReducer>;
}

export const store = configureStore({
  reducer: {
    users: usersReducer,
    tokens:tokenReducer,
  },
})