import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  products: [],
  product: {},
  isLoading: false,
  getAllError: {
    error: false,
    message: "",
  },
  getOneError: {
    error: false,
    message: "",
  },
};

//get all products
export const getProducts = createAsyncThunk("products/getAll", async (_, thunkAPI) => {
  try {
    return await productService.getProducts();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

//get one products
export const getProduct = createAsyncThunk("products/getOne", async (id, thunkAPI) => {
  try {
    return await productService.getProduct(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//product Slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.getAllError = {
          error: true,
          message: action.payload,
        };
      })
      .addCase(getProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.getOneError = {
          error: true,
          message: action.payload,
        };
      });
  },
});

export default productSlice.reducer;
