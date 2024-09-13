import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginuser = createAsyncThunk('user/loginuser', async (user, thunkAPI) => {
  try {
    return user;
  } catch (error) {
    throw error.response.data;
  }
});

export const logoutUser = createAction('user/logoutUser');

const userslice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null
  },
  // Define both cases within a single extraReducers function
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginuser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginuser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        // Save user data to local storage
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Logout
      .addCase(logoutUser, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        // Clear user data from local storage
        localStorage.removeItem('user');
      });
  },
});

export default userslice.reducer;
