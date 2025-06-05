import {
	BrowserRouter,
	createBrowserRouter,
	RouterProvider,
	Route,
	Routes,
} from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchServerCart } from "./features/cart/cartSlice";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./pages/DashboardLayout";
import AllUsers from "./pages/Users/AllUsers";
import AllProducts from "./pages/Products/AllProducts";
import AllOrders from "./pages/Orders/AllOrders";
import Banners from "./pages/Products/Banners";
import SignIn from "./pages/Auth/SignIn";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
		},
	},
});

function App() {
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(fetchServerCart());
	// }, []);

	return (
		<QueryClientProvider client={queryClient}>
			{/* <RouterProvider router={router} /> */}
			<BrowserRouter>
				<Routes>
					<Route path="login" element={<SignIn />}/>
					<Route path="/" element={<DashboardLayout />}>
						<Route index element={<Dashboard />} />
						<Route path="home" element={<Dashboard />} />
						<Route path="all-users" element={<AllUsers />} />
						<Route path="all-products" element={<AllProducts />} />
						<Route path="all-orders" element={<AllOrders />} />
						<Route path="banners" element={<Banners />} />
					</Route>
					{/* <Route path="/contact" element={} /> */}
				</Routes>
			</BrowserRouter>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
