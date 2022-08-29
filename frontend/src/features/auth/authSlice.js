import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";
import {errorMessage} from "../../util/error";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  users: [],
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Register user
export const register = createAsyncThunk("auth/register", async (data, thunkAPI) => {
  try {
    return await authService.register(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessage(error));
  }
});

// Login user
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return await authService.login(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessage(error));
  }
});

//update user
export const updateUser = createAsyncThunk("auth/updateUser", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await authService.updateUser(data, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessage(error));
  }
});

//get all users
export const getAllUsers = createAsyncThunk("auth/getAllUsers", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await authService.getAllUsers(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessage(error));
  }
});

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    fullAuthReset: state => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Registered Successfully";
      })
      .addCase(register.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Updated Successfully";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.users = [];
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
      });
  },
});

export const {reset, fullAuthReset} = authSlice.actions;
export default authSlice.reducer;
