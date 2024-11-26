const express = require("express"); // Import Express to create routes
const router = express.Router(); // Use the router from Express
const Order = require("../models/order"); // Import the Order model

// Route: Get all orders
router.get("/", async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();
    res.status(200).json(orders); // Return the list of orders from the DB
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders from the database." });
  }
});

// Route: Add a new order
router.post("/", async (req, res) => {
  const { customer, items, total } = req.body; // Extract data from request body

  // Validate input data
  if (!customer || !items || !total) {
    return res.status(400).json({ error: "Customer, items, and total are required." });
  }

  try {
    // Create a new order using the Order model
    const newOrder = new Order({
      customer,
      items,
      total,
    });

    // Save the new order to the database
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: "Error placing the order." });
  }
});

// Route: Update an order
router.put("/:id", async (req, res) => {
  const { id } = req.params; // Get ID from request params
  const { customer, items, total } = req.body; // Get data from request body

  try {
    // Find and update the order by its ID
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { customer, items, total },
      { new: true } // Return the updated order
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found." });
    }

    res.status(200).json({ message: "Order updated successfully!", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: "Error updating the order." });
  }
});

// Route: Delete an order
router.delete("/:id", async (req, res) => {
  const { id } = req.params; // Get ID from request params

  try {
    // Find and delete the order by its ID
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found." });
    }

    res.status(200).json({ message: "Order deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the order." });
  }
});

// Export the router
module.exports = router;
