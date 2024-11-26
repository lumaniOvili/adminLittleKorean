"use client";

import React, { useState, useEffect } from "react";
import { fetchOrders, deleteOrder, updateOrderStatus } from "@/utils/apiService"; 

type Order = {
  _id: string;
  customerName: string;
  item: string;
  status: "Pending" | "Fulfilled";
  totalAmount: number;
};

const OrdersManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch all orders when the component mounts
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordersData = await fetchOrders(); // Fetch from API
        setOrders(ordersData); // Update state with fetched orders
      } catch (error) {
        console.error("Failed to load orders:", error);
      }
    };

    loadOrders();
  }, []);

  // Handle toggling order status (Pending <-> Fulfilled)
  const handleToggleStatus = async (orderId: string) => {
    const updatedOrder = orders.find((order) => order._id === orderId);
    if (!updatedOrder) return;

    const newStatus = updatedOrder.status === "Pending" ? "Fulfilled" : "Pending";

    // Update the status in the backend
    try {
      await updateOrderStatus(orderId, newStatus);
      // Update local state
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  // Handle deleting an order
  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrder(orderId); // Delete from API
      setOrders(orders.filter((order) => order._id !== orderId)); // Remove from local state
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  return (
    <div className="p-8 space-y-8 bg-green-50">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800">Orders Management</h1>
        <p className="text-lg text-gray-600">Manage and update customer orders efficiently</p>
      </div>
  
      {/* Orders List */}
      <div className="space-y-6">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders yet. Add new orders to manage them!</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className={`bg-white p-6 rounded-xl shadow-lg flex flex-col items-start justify-between ${
                order.status === "Fulfilled" ? "border-green-300 bg-green-100" : "border-yellow-300 bg-yellow-100"
              }`}
            >
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-green-700">{order.customerName}</h2>
                <p className="text-sm text-gray-600">Item: {order.item}</p>
                <p className="text-sm text-gray-600">Status: 
                  <span className={`font-semibold ${order.status === "Fulfilled" ? "text-green-600" : "text-yellow-600"}`}>
                    {order.status}
                  </span>
                </p>
              </div>
  
              <div className="flex gap-4">
                <button
                  onClick={() => handleToggleStatus(order._id)}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                >
                  Mark as {order.status === "Pending" ? "Fulfilled" : "Pending"}
                </button>
                <button
                  onClick={() => handleDeleteOrder(order._id)}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
  
};

export default OrdersManagement;
