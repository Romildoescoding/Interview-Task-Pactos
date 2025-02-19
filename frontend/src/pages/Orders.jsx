"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { Loader, List, Grid } from "lucide-react";

function OrdersPage() {
  const { userEmail } = useUser();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/orders?email=${userEmail}`
      );
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statusColors = {
    Pending: "bg-yellow-500",
    Delivered: "bg-green-500",
    Canceled: "bg-red-500",
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Orders</h1>
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="p-2 bg-zinc-100 cursor-pointer rounded-md hover:bg-zinc-200 transition"
        >
          {isGridView ? <List size={24} /> : <Grid size={24} />}
        </button>
      </div>

      {isLoading ? (
        <Loader
          className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 animate-spin"
          size={32}
        />
      ) : (
        <div
          className={
            isGridView
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.OrderId}
                className="bg-zinc-50 p-6 rounded-lg shadow-lg flex items-center gap-6"
              >
                <img
                  src={order.Product.ImageUrl || "/placeholder.png"}
                  alt={order.ProductName}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-2">
                  <h2 className="text-xl font-semibold text-zinc-900">
                    {order.ProductName}
                  </h2>
                  <p className="text-sm font-bold text-zinc-700">
                    Order ID: {order.id}
                  </p>
                  <p className="text-sm text-zinc-600">
                    Quantity:{" "}
                    <span className="font-medium">{order.Quantity}</span>
                  </p>
                  <p className="text-sm text-zinc-600">
                    Total:{" "}
                    <span className="font-medium">
                      ${order.Quantity * order.Product.Price}
                    </span>
                  </p>
                  <p className="text-sm text-zinc-600">
                    Ordered at:{" "}
                    <span className="font-medium">
                      {new Date(order["Created At"]).toLocaleString()}
                    </span>
                  </p>
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full text-white ${
                      statusColors[order.Status] || "bg-gray-500"
                    }`}
                  >
                    {order.Status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
