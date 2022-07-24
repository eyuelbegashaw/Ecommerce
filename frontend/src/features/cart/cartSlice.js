import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import productService from "../products/productService";

const result = localStorage.getItem("cartItems");
const cartStorage = result ? JSON.parse(result) : [];

const initialState = {
   cart: cartStorage,
   isError: false,
   message: "",
};

export const addToCartAsync = createAsyncThunk("cart/addToCartAsync", async (obj, thunkAPI) => {
   try {
      const {productId, quantity} = obj;
      const product = await productService.getProduct(productId);
      if (product) {
         thunkAPI.dispatch(addToCart({...product, quantity}));
      }
   } catch (error) {
      const message =
         (error.response && error.response.data && error.response.data.message) ||
         error.message ||
         error.toString();
      return thunkAPI.rejectWithValue(message);
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

         const itemExist = state.cart.find(value => value.product === cartItem.product);
         if (itemExist) {
            const updatedItems = state.cart.map(value =>
               value.product === itemExist.product ? cartItem : value
            );
            state.cart = updatedItems;
         } else {
            state.cart.push(cartItem);
         }

         localStorage.setItem("cartItems", JSON.stringify(state.cart));
      },
      removeFromCart(state, action) {
         const productId = action.payload;
         state.cart = state.cart.filter(current => current.product !== productId);
         localStorage.setItem("cartItems", JSON.stringify(state.cart));
      },
   },
   extraReducers: builder => {
      builder.addCase(addToCartAsync.rejected, (state, action) => {
         state.isError = true;
         state.message = action.payload;
      });
   },
});

export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;
