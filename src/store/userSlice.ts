import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserBasic } from '../interfaces/user';

// Define the initial state type
interface UserState {
  userData: UserBasic | null;
  status: boolean;
}

// Define the initial state
const initialState: UserState = {
  userData: null,
  status: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserBasic>) => {
      state.userData = action.payload;
      state.status = true;
    },
    clearUser: (state) => {
      state.userData = null;
      state.status = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

// Add type annotation for the selector
export const selectUser = (state: { user: UserState }) => state.user.userData;

export default userSlice.reducer;
