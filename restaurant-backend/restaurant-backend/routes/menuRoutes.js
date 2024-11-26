const express = require("express"); // Import Express to create routes
const router = express.Router(); // Use the router from Express
const Menu = require("../models/menu"); // Import the Menu model (corrected)

// Route: Get all menu items
router.get("/", async (req, res) => {
  try {
    // Fetch all menu items from the database
    const menu = await Menu.find();
    res.status(200).json(menu); // Return the list of menu items from the DB
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu items from the database." });
  }
});

// Route: Add a new menu item
router.post("/", async (req, res) => {
  const { name, price, category, description, nutritionalInfo, allergens, imageUrl } = req.body;

  // Validate input data
  if (!name || !price || !category) {
    return res.status(400).json({ error: "Name, price, and category are required." });
  }

  try {
    // Create a new menu item using the Menu model
    const newItem = new Menu({
      title: name,
      price,
      description,
      nutritionalInfo,
      allergens,
      imageUrl,
    });

    // Save the new item to the database
    await newItem.save();
    res.status(201).json({ message: "Menu item added successfully!", item: newItem });
  } catch (error) {
    res.status(500).json({ error: "Error adding menu item to the database." });
  }
});

// Route: Update a menu item
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, category, description, nutritionalInfo, allergens, imageUrl } = req.body;

  try {
    // Find and update the menu item in the database
    const updatedItem = await Menu.findByIdAndUpdate(
      id,
      { title: name, price, description, nutritionalInfo, allergens, imageUrl },
      { new: true } // Return the updated item
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Menu item not found." });
    }

    res.status(200).json({ message: "Menu item updated successfully!", item: updatedItem });
  } catch (error) {
    res.status(500).json({ error: "Error updating menu item." });
  }
});

// Route: Delete a menu item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the menu item by its ID
    const deletedItem = await Menu.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Menu item not found." });
    }

    res.status(200).json({ message: "Menu item deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting menu item." });
  }
});

// Export the router
module.exports = router;
