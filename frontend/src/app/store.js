import {configureStore} from "@reduxjs/toolkit";

//Reducers
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
