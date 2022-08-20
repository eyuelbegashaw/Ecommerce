import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import productService from "../products/productService";
import {errorMessage} from "../../util/error";

//Local storage values
const cartItems = JSON.parse(localStorage.getItem("cartItems"));
const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
const paymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));

//Initial state
const initialState = {
  cartItems: cartItems ? cartItems : [],
  paymentMethod: paymentMethod ? paymentMethod : "PayPal",
  shippingAddress: shippingAddress
    ? shippingAddress
    : {address: "", city: "", postalCode: "", country: ""},
  isSuccess: false,
  isError: false,
  message: "",
};

//GET - fetch product and add it cart
export const addToCartAsync = createAsyncThunk("cart/addToCartAsync", async (data, thunkAPI) => {
  try {
    const {productId, quantity} = data;
    const product = await productService.getProduct(productId);
    if (product) {
      thunkAPI.dispatch(addToCart({...product, quantity}));
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessage(error));
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const cartItem = {
        product: product._id ? product._id : product.product,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        quantity: product.quantity,
      };

      const itemExist = state.cartItems.find(value => value.product === cartItem.product);
      if (itemExist) {
        const updatedItems = state.cartItems.map(value =>
          value.product === itemExist.product ? cartItem : value
        );
        state.cartItems = updatedItems;
      } else {
        state.cartItems.push(cartItem);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(current => current.product !== productId);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingAddress(state, action) {
      state.shipping = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    savePaymentMethod(state, action) {
      state.payment = action.payload;
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
    },
  },
  extraReducers: builder => {
    builder.addCase(addToCartAsync.rejected, (state, action) => {
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const {addToCart, removeFromCart, saveShippingAddress, savePaymentMethod} =
  cartSlice.actions;
export default cartSlice.reducer;
