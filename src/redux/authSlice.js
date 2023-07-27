import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
      userId: '',
      token: '',
    },
    reducers: {
      LOGIN: (state, action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.userId = action.payload._id;
        state.token = action.payload.token;
      },
      LOGOUT: state => {
        state.userId = '';
        state.token = '';
      },
    },
  });

  // Action creators are generated for each case reducer function
  export const { LOGIN, LOGOUT } = authSlice.actions;

  export default authSlice.reducer;
