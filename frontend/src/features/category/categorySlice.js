import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {errorMessage} from "../../util/error";
import categoryService from "./categoryService";

const initialState = {
  categories: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createCategory = createAsyncThunk("category/create", async (newCategory, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await categoryService.createCategory(newCategory, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessage(error));
  }
});

export const getCategory = createAsyncThunk("category/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await categoryService.getCategories(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessage(error));
  }
});

export const updateCategory = createAsyncThunk("category/update", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await categoryService.updateCategory(data, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessage(error));
  }
});

export const deleteCategory = createAsyncThunk("category/delete", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await categoryService.deleteCategory(id, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessage(error));
  }
});

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    categoryReset(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const updatedCategories = state.categories.map(category =>
          category._id === action.payload._id ? action.payload : category
        );
        state.categories = updatedCategories;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = state.categories.filter(category => category._id !== action.payload._id);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {categoryReset} = categorySlice.actions;
export default categorySlice.reducer;
