"use client";

import React, { useState, useEffect } from "react";
import { fetchReservations, updateReservationStatus } from "@/utils/apiService"; // Import API functions

type Reservation = {
  id: number;
  customerName: string;
  date: string;
  time: string;
  status: "Pending" | "Fulfilled";
};

const Reservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Fetch reservations from API when the component mounts
  useEffect(() => {
    const loadReservations = async () => {
      try {
        const reservationsData = await fetchReservations(); // Fetch data from API
        setReservations(reservationsData); // Set the reservations in the state
      } catch (error) {
        console.error("Failed to load reservations:", error);
      }
    };

    loadReservations();
  }, []);

  // Toggle reservation status and update in API
  const handleToggleStatus = async (id: number) => {
    const updatedReservation = reservations.find((reservation) => reservation.id === id);
    if (updatedReservation) {
      const newStatus = updatedReservation.status === "Pending" ? "Fulfilled" : "Pending";
      try {
        // Update the status in the backend via API
        const updatedData = await updateReservationStatus(id, newStatus);
        setReservations((prev) =>
          prev.map((reservation) =>
            reservation.id === id ? { ...reservation, status: updatedData.status } : reservation
          )
        );
      } catch (error) {
        console.error("Failed to update reservation status:", error);
      }
    }
  };

  return (
    <div className="p-8 space-y-8 bg-green-50">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800">Reservations Management</h1>
        <p className="text-lg text-gray-600">Easily manage customer reservations and update their status</p>
      </div>
  
      {/* Reservations List */}
      <div className="space-y-6">
        {reservations.length === 0 ? (
          <p className="text-center text-gray-500">No reservations yet. Add new ones to manage!</p>
        ) : (
          reservations.map((reservation) => (
            <div
              key={reservation.id}
              className={`bg-white p-6 rounded-xl shadow-lg flex flex-col items-start justify-between ${
                reservation.status === "Fulfilled" ? "border-green-300 bg-green-100" : "border-yellow-300 bg-yellow-100"
              }`}
            >
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-green-700">{reservation.customerName}</h2>
                <p className="text-sm text-gray-600">Date: {reservation.date}</p>
                <p className="text-sm text-gray-600">Time: {reservation.time}</p>
                <p className="text-sm text-gray-600">Status: 
                  <span className={`font-semibold ${reservation.status === "Fulfilled" ? "text-green-600" : "text-yellow-600"}`}>
                    {reservation.status}
                  </span>
                </p>
              </div>
  
              <div className="flex gap-4">
                <button
                  onClick={() => handleToggleStatus(reservation.id)}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                >
                  Mark as {reservation.status === "Pending" ? "Fulfilled" : "Pending"}
                </button>
                {reservation.status === "Fulfilled" && (
                  <p className="text-red-500 mt-2 text-sm">Removing in 5 seconds...</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}  

export default Reservations;
