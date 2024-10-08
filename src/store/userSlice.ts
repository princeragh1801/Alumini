import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserBasic } from '../interfaces/user';
import { RootState } from './store';
import { Role } from '../interfaces/enums';

var defaultUser : UserBasic = {
  name : "Prince Raghuwanshi",
  id : '46149ee7-1623-479c-b867-08dce38e0606',
  imageUrl : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
  role : Role.Student,
  headLine : "Intern-PageUp | Knight @leetcode | 3 ⭐ @codechef | Solve 500+ Problem on GFG || MERN Stack Developer"
}
// Define the initial state type
interface UserState {
  userData: UserBasic;
  status: boolean;
}

// Define the initial state
const initialState: UserState = {
  userData: defaultUser,
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
      state.userData = defaultUser;
      state.status = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

// Add type annotation for the selector
// In userSlice.ts
export const selectUser = (state: RootState) => state.users.userData;


export default userSlice.reducer;
