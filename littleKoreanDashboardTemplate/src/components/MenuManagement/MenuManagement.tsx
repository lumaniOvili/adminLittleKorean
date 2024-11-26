"use client";

import React, { useState, useEffect } from "react";
import { fetchMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from "@/utils/apiService"; // API service methods

type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
};

export const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState<MenuItem>({
    id: 0,
    name: "",
    price: 0,
    description: "",
    category: "",
    imageUrl: "",
  });

  // Fetch existing menu items from the backend
  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const items = await fetchMenuItems(); // Fetch items from the API
        setMenuItems(items);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    loadMenuItems();
  }, []);

  // Handle input changes for the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "price") {
      // Convert price to number
      setNewItem({ ...newItem, [name]: value ? Number(value) : 0 });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  // Handle adding a new menu item
  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.category) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const addedItem = await addMenuItem(newItem); // Add item via API
      setMenuItems((prev) => [...prev, addedItem]); // Update local state
      resetForm();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Handle deleting a menu item
  const handleDeleteItem = async (id: number) => {
    try {
      await deleteMenuItem(id); // Delete item via API
      setMenuItems((prev) => prev.filter((item) => item.id !== id)); // Update local state
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Handle editing an existing menu item
  const handleEditItem = (item: MenuItem) => {
    setNewItem(item);
  };

  // Handle saving changes to an edited menu item
  const handleSaveEdit = async () => {
    if (!newItem.name || !newItem.price || !newItem.category) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const updatedItem = await updateMenuItem(newItem); // Update item via API
      setMenuItems((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      ); // Update local state
      resetForm();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  // Reset the form to empty values
  const resetForm = () => {
    setNewItem({
      id: 0,
      name: "",
      price: 0,
      description: "",
      category: "",
      imageUrl: "",
    });
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Menu Management</h1>
        <p className="text-lg text-gray-600">Add, Edit, and Remove items from the menu</p>
      </div>
  
      {/* Add/Edit Menu Item Form */}
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
        <h2 className="text-2xl font-medium text-gray-800 mb-6">{newItem.id ? "Edit" : "Add"} Menu Item</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Item Name */}
          <div>
            <label htmlFor="name" className="text-gray-600 font-medium">Item Name</label>
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleChange}
              placeholder="Enter item name"
              className="mt-2 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          {/* Price */}
          <div>
            <label htmlFor="price" className="text-gray-600 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={newItem.price || ""}
              onChange={handleChange}
              placeholder="Enter price"
              className="mt-2 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
  
          {/* Description */}
          <div className="sm:col-span-2">
            <label htmlFor="description" className="text-gray-600 font-medium">Description</label>
            <textarea
              name="description"
              value={newItem.description}
              onChange={handleChange}
              placeholder="Enter item description"
              className="mt-2 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>
  
          {/* Category */}
          <div>
            <label htmlFor="category" className="text-gray-600 font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={newItem.category}
              onChange={handleChange}
              placeholder="Enter category"
              className="mt-2 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
  
          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="text-gray-600 font-medium">Image URL (optional)</label>
            <input
              type="text"
              name="imageUrl"
              value={newItem.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="mt-2 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
  
        {/* Action Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={newItem.id ? handleSaveEdit : handleAddItem}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
          >
            {newItem.id ? "Save Changes" : "Add Item"}
          </button>
        </div>
      </div>
  
      {/* Menu Items List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-gray-800 mb-6">Menu Items</h2>
        {menuItems.length === 0 ? (
          <p className="text-gray-500">No menu items added yet. Add a new item above!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center hover:shadow-xl transition-shadow duration-200"
              >
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-xl text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">${Number(item.price).toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-sm italic text-gray-400">{item.category}</p>
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="mt-4 w-32 h-32 object-cover rounded-full border-2 border-gray-200"
                    />
                  )}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="text-indigo-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
};
