import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {errorMessage} from "../../util/error";

import productService from "./productService";

const initialState = {
  products: [],
  product: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//GET - fetch all products
export const getProducts = createAsyncThunk("products/getAll", async (_, thunkAPI) => {
  try {
    return await productService.getProducts();
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessage(error));
  }
});

//GET  - fetch one product
export const getProduct = createAsyncThunk("products/getOne", async (id, thunkAPI) => {
  try {
    return await productService.getProduct(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessage(error));
  }
});

//product Slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;
    },
    resetProduct(state, action) {
      state.product = {};
    },
    reset(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {setProduct, reset, resetProduct} = productSlice.actions;
export default productSlice.reducer;
