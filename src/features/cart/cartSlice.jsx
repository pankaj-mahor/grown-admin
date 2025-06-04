import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../../utils";

const SHIPPING_CHARGES = 100;
const TAX = 18;
const FREESHIP_PRICE = 500;
const HALFSHIP_PRICE = 200;

// Thunk to sync local cart to server after login
// export const addItemToServer = createAsyncThunk(
// 	"cart/syncCartWithServer",
// 	async (_, { getState }) => {
// 		const { cart } = getState();
// 		const localCartItems = cart.cartItems.map((item) => ({
// 			product_id: item.cartID,
// 			quantity: item.amount,
// 		}));

// 		console.log(localCartItems);
// 		// Send local cart data to the server
// 		await axios.post("/cart/add", localCartItems);

// 		// Fetch server cart after syncing
// 		const response = await axios.get("/cart/api/get-cart");

// 		return response.data;
// 	}
// );
// Async thunks for server operations
export const syncCartWithServer = createAsyncThunk(
	"cart/syncCartWithServer",
	async (_, { getState }) => {
		const { cart } = getState();
		const localCartItems = cart.cartItems.map((item) => ({
			product_id: item.cartID,
			quantity: item.amount,
		}));

		const response = await customFetch.post("/cart/sync", localCartItems);
		return response.data;
	}
);

export const fetchServerCart = createAsyncThunk(
	"cart/fetchServerCart",
	async () => {
		const response = await customFetch("/cart/get-cart");
		return response.data;
	}
);

const defaultState = {
	cartItems: [],
	numItemsInCart: 0,
	cartTotal: 0,
	shipping: SHIPPING_CHARGES,
	tax: TAX,
	orderTotal: 0,
};

const getCartFromLocalStorage = () => {
	if (localStorage.getItem("cart")) {
		// const cartData = JSON.parse(localStorage.getItem("cart"));

		// const cartDataFilter = cartData.cartItems.map((d) => ({
		// 	product_id: d.cartID,
		// 	quantity: d.amount,
		// }));
		// addCart([...cartDataFilter]);

		// const cartResponse = getCart();
		return JSON.parse(localStorage.getItem("cart"));
		// return cartResponse;
	} else {
		// const cartResponse = getCart();

		return defaultState;
	}
};

const cartSlice = createSlice({
	name: "cart",
	initialState: defaultState,
	reducers: {
		addItem: (state, action) => {
			const { product } = action.payload;

			const item = state.cartItems.find(
				(item) => item.cartID === product.cartID
			);

			if (item) {
				item.amount += product.amount;
			} else {
				state.cartItems.push(product);
			}

			state.numItemsInCart += product.amount;
			state.cartTotal += product.price * product.amount;
			cartSlice.caseReducers.calculateTotals(state);

			//Moved to calculcate Totals
			// state.tax = (TAX / 100) * state.cartTotal;
			// state.orderTotal = state.cartTotal + state.shipping + state.tax;
			// //Save at local storage
			// localStorage.setItem("cart", JSON.stringify(state));

			toast.success("Item added to cart");

			// state.shipping = SHIPPING_CHARGES
			// state.cartItems.push({
			// 	...product,
			// });
			//  state.cartItems = [...state.cartItems, ...product]
			// state.numItemsInCart++;
			// console.log(action.payload);
		},

		removeItem: (state, action) => {
			const { cartID } = action.payload;
			const product = state.cartItems.find((item) => item.cartID === cartID);

			state.cartItems = state.cartItems.filter(
				(item) => item.cartID !== cartID
			);
			state.numItemsInCart -= product.amount;
			state.cartTotal -= product.price * product.amount;

			cartSlice.caseReducers.calculateTotals(state);

			toast.success("Item removed from cart");
		},

		clearCart: (state) => {
			localStorage.setItem("cart", JSON.stringify(defaultState));
			return defaultState;
		},

		editItem: (state, action) => {
			const { cartID, amount } = action.payload;
			const item = state.cartItems.find((item) => item.cartID === cartID);

			state.numItemsInCart += amount - item.amount;
			state.cartTotal += item.price * (amount - item.amount);
			item.amount = amount;

			cartSlice.caseReducers.calculateTotals(state);

			toast.success("Cart Updated");
		},

		//for calculation re usable
		calculateTotals: (state) => {
			state.tax = (TAX / 100) * state.cartTotal;
			state.orderTotal = state.cartTotal + state.shipping + state.tax;

			if (state.cartTotal >= FREESHIP_PRICE) {
				state.shipping = 0;
			} else if (state.cartTotal >= HALFSHIP_PRICE) {
				state.shipping = SHIPPING_CHARGES / 2;
			} else {
				state.shipping = SHIPPING_CHARGES;
			}
			//Save at local storage
			localStorage.setItem("cart", JSON.stringify(state));
		},
		// extraReducers: (builder) => {
		// 	builder.addCase(syncCartWithServer.fulfilled, (state, action) => {
		// 		state.cartItems = action.payload.cartItems;
		// 		state.numItemsInCart = action.payload.cartItems.reduce(
		// 			(total, item) => total + item.amount,
		// 			0
		// 		);
		// 		state.cartTotal = action.payload.cartItems.reduce(
		// 			(total, item) => total + item.price * item.amount,
		// 			0
		// 		);

		// 		cartSlice.caseReducers.calculateTotals(state);
		// 	});
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(syncCartWithServer.fulfilled, (state, action) => {
				// Update state with server response
				state.cartItems = action.payload.cartItems;
				state.numItemsInCart = action.payload.numItemsInCart;
				state.cartTotal = action.payload.cartTotal;
				state.shipping = action.payload.shipping;
				state.tax = action.payload.tax;
				state.orderTotal = action.payload;
				cartSlice.caseReducers.calculateTotals(state);
			})
			.addCase(fetchServerCart.fulfilled, (state, action) => {
				// Update state with fetched server cart
				state.cartItems = action.payload.cartItems;
				state.numItemsInCart = action.payload.numItemsInCart;
				state.cartTotal = action.payload.cartTotal;
				state.shipping = action.payload.shipping;
				state.tax = action.payload.tax;
				state.orderTotal = action.payload;
				cartSlice.caseReducers.calculateTotals(state);
			});
	},
});

// export const addProductToCart = (product) => async (dispatch) => {
// 	// First, update the local Redux state
// 	dispatch(cartSlice.actions.addItem({ product }));

// 	// Then, make the API call to sync the cart with the server
// 	dispatch(addItemToServer(product));
// };

// Middleware function to handle cart operations
export const handleCartOperation =
	(isLoggedIn) => (store) => (next) => (action) => {
		const result = next(action);

		if (
			isLoggedIn &&
			(action.type.startsWith("cart/addItem") ||
				action.type.startsWith("cart/removeItem") ||
				action.type.startsWith("cart/editItem"))
		) {
			// If user is logged in, sync with server after each cart operation
			store.dispatch(syncCartWithServer());
		}

		return result;
	};

// Modified action creators
export const addItemToServer =
	({ product, isLoggedIn }) =>
	async (dispatch) => {
		if (isLoggedIn) {
			// If logged in, add directly to server
			try {
				await customFetch.post("/cart/add", [
					{
						product_id: product.productId,
						quantity: product.amount,
					},
				]);
				toast.success("Product Added to Cart.");
				dispatch(fetchServerCart());
			} catch (error) {
				toast.error("Failed to add item to cart");
			}
		} else {
			// If not logged in, use local storage
			dispatch(cartSlice.actions.addItem({ product }));
		}
	};

// Function to sync local cart with server after login
export const syncLocalCartAfterLogin = () => async (dispatch, getState) => {
	const { cart } = getState();
	if (cart.cartItems.length > 0) {
		try {
			await dispatch(syncCartWithServer());
			// Clear local storage after successful sync
			localStorage.removeItem("cart");
			toast.success("Cart synchronized successfully");
		} catch (error) {
			toast.error("Failed to sync cart");
		}
	}
};

export const { addItem, removeItem, clearCart, editItem } = cartSlice.actions;

export default cartSlice.reducer;
