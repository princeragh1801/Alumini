import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state type
interface TokenState {
  token: string | null;
}

// Define the initial state
const initialState: TokenState = {
  token : null
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;

// Add type annotation for the selector
export const selectToken = (state: { token: TokenState }) => state.token.token;

export default tokenSlice.reducer;
