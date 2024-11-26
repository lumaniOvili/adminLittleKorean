const express = require("express"); // Import Express to create routes
const router = express.Router(); // Use the router from Express
const Reservation = require("../models/reservation"); // Import the Reservation model

// Route: Get all reservations
router.get("/", async (req, res) => {
  try {
    // Fetch all reservations from the database
    const reservation = await Reservation.find();
    res.status(200).json(reservation); // Return the list of reservations from the DB
  } catch (error) {
    res.status(500).json({ error: "Error fetching reservations from the database." });
  }
});

// Route: Add a new reservation
router.post("/", async (req, res) => {
  const { customer, date, time, guests } = req.body; // Extract data from request body

  // Validate input data
  if (!customer || !date || !time || !guests) {
    return res.status(400).json({ error: "Customer, date, time, and guests are required." });
  }

  try {
    // Create a new reservation using the Reservation model
    const newReservation = new Reservation({
      customer,
      date,
      time,
      guests,
    });

    // Save the new reservation to the database
    await newReservation.save();
    res.status(201).json({ message: "Reservation added successfully!", reservation: newReservation });
  } catch (error) {
    res.status(500).json({ error: "Error adding the reservation." });
  }
});

// Route: Update a reservation
router.put("/:id", async (req, res) => {
  const { id } = req.params; // Get ID from request params
  const { customer, date, time, guests } = req.body; // Get data from request body

  try {
    // Find and update the reservation by its ID
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { customer, date, time, guests },
      { new: true } // Return the updated reservation
    );

    if (!updatedReservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }

    res.status(200).json({ message: "Reservation updated successfully!", reservation: updatedReservation });
  } catch (error) {
    res.status(500).json({ error: "Error updating the reservation." });
  }
});

// Route: Delete a reservation
router.delete("/:id", async (req, res) => {
  const { id } = req.params; // Get ID from request params

  try {
    // Find and delete the reservation by its ID
    const deletedReservation = await Reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }

    res.status(200).json({ message: "Reservation deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the reservation." });
  }
});

// Export the router
module.exports = router;
