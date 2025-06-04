import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { handleCartOperation } from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
	reducer: {
		cartState: cartReducer,
		userState: userReducer,
	},
});
