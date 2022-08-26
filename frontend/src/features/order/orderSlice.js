import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {errorMessage} from "../../util/error";
import orderService from "../order/orderService";

const initialState = {
  order: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createOrder = createAsyncThunk("order/create", async (newOrder, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await orderService.createOrder(newOrder, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessage(error));
  }
});

export const getOrder = createAsyncThunk("order/get", async (orderId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await orderService.getOrder(orderId, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessage(error));
  }
});

export const orderPay = createAsyncThunk("order/pay", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await orderService.orderPay(data, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessage(error));
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderReset(state) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, state => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOrder.pending, state => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(orderPay.pending, state => {
        state.isLoading = true;
      })
      .addCase(orderPay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(orderPay.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {orderReset} = orderSlice.actions;
export default orderSlice.reducer;
