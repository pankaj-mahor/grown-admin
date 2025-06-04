import React, { useState } from "react";

const Dashboard = () => {
	const [stats, setStats] = useState({
		totalOrders: 1250,
		totalRevenue: 45600,
		totalUsers: 850,
		pendingOrders: 45
	});

	const [recentOrders, setRecentOrders] = useState([
		{ id: 1, customer: "John Doe", amount: 120, status: "Delivered" },
		{ id: 2, customer: "Jane Smith", amount: 85, status: "Processing" },
		{ id: 3, customer: "Mike Johnson", amount: 200, status: "Pending" }
	]);

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
			
			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<div className="bg-white p-4 rounded-lg shadow">
					<h3 className="text-gray-500 text-sm">Total Orders</h3>
					<p className="text-2xl font-bold">{stats.totalOrders}</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow">
					<h3 className="text-gray-500 text-sm">Total Amount</h3>
					<p className="text-2xl font-bold">${stats.totalRevenue}</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow">
					<h3 className="text-gray-500 text-sm">Total Users</h3>
					<p className="text-2xl font-bold">{stats.totalUsers}</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow">
					<h3 className="text-gray-500 text-sm">Pending Orders</h3>
					<p className="text-2xl font-bold">{stats.pendingOrders}</p>
				</div>
			</div>

			{/* Recent Orders Table */}
			<div className="bg-white p-4 rounded-lg shadow">
				<h2 className="text-xl font-bold mb-4">Recent Orders</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full">
						<thead>
							<tr className="bg-gray-50">
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
							</tr>
						</thead>
						<tbody>
							{recentOrders.map((order) => (
								<tr key={order.id} className="border-t">
									<td className="px-6 py-4">#{order.id}</td>
									<td className="px-6 py-4">{order.customer}</td>
									<td className="px-6 py-4">${order.amount}</td>
									<td className="px-6 py-4">
										<span className={`px-2 py-1 rounded-full text-xs ${
											order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
											order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
											'bg-yellow-100 text-yellow-800'
										}`}>
											{order.status}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
