"use client"; 

import React, { useState, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import { fetchOrders, fetchReservations } from "@/utils/apiService"; // Corrected import path

export const TopBar = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [pendingOrders, setPendingOrders] = useState<any[]>([]); // To hold the fetched pending orders
  const [pendingReservations, setPendingReservations] = useState<any[]>([]); // To hold the fetched pending reservations

  // Dynamically get the current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Fetch pending orders
  const fetchPendingOrders = async () => {
    try {
      const orders = await fetchOrders(); // Fetch all orders
      const pending = orders.filter((order: any) => order.status === "pending"); // Filter only pending orders
      setPendingOrders(pending);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch pending reservations
  const fetchPendingReservations = async () => {
    try {
      const reservations = await fetchReservations(); // Fetch all reservations
      const pending = reservations.filter((reservation: any) => reservation.status === "pending"); // Filter only pending reservations
      setPendingReservations(pending);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  // Function to toggle calendar dropdown and fetch data when shown
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    if (!showCalendar) {
      fetchPendingOrders(); // Fetch pending orders when calendar is shown
      fetchPendingReservations(); // Fetch pending reservations when calendar is shown
    }
  };

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        {/* Greeting Section */}
        <div>
          <span className="text-sm font-bold block">🚀 Hi littleKorean!</span> {/* Updated greeting */}
          <span className="text-xs block text-stone-500">{formattedDate}</span>
          <span className="text-xs block text-stone-500">{formattedTime}</span> {/* Show time */}
        </div>

        {/* Calendar Button */}
        <div className="relative">
          <button
            onClick={toggleCalendar}
            className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded"
          >
            <FiCalendar />
            <span>Today's Date & Pending Orders/Reservations</span>
          </button>

          {/* Calendar Dropdown */}
          {showCalendar && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-stone-200 rounded shadow-lg p-4">
              {/* Show today's date and time */}
              <h4 className="text-center text-sm font-bold mb-2">
                {formattedDate} - {formattedTime}
              </h4>

              {/* Pending Orders List */}
              <h5 className="mt-4 text-sm font-semibold">Pending Orders:</h5>
              <ul className="mt-2 space-y-2 text-xs">
                {pendingOrders.length > 0 ? (
                  pendingOrders.map((order) => (
                    <li key={order._id} className="text-stone-600">
                      Order #{order._id} - {order.customerName} (Total: ${order.totalAmount})
                    </li>
                  ))
                ) : (
                  <li className="text-stone-500">No pending orders</li>
                )}
              </ul>

              {/* Pending Reservations List */}
              <h5 className="mt-4 text-sm font-semibold">Pending Reservations:</h5>
              <ul className="mt-2 space-y-2 text-xs">
                {pendingReservations.length > 0 ? (
                  pendingReservations.map((reservation) => (
                    <li key={reservation._id} className="text-stone-600">
                      Reservation #{reservation._id} - {reservation.customerName} ({reservation.reservationTime})
                    </li>
                  ))
                ) : (
                  <li className="text-stone-500">No pending reservations</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
