"use client";

import { useState, useEffect } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/orders/user/${email}`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchOrders();
    }
  }, [email]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <form onSubmit={handleEmailSubmit} className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-3 py-2 border rounded mr-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Fetch Orders
        </button>
      </form>
      {orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="bg-white shadow-md rounded-lg p-4">
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Product ID:</strong> {order.ProductId}
              </p>
              <p>
                <strong>Quantity:</strong> {order.Quantity}
              </p>
              <p>
                <strong>Status:</strong> {order.Status}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found for this email.</p>
      )}
    </div>
  );
}

export default Orders;
