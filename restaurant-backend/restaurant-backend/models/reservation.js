const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  date: { type: String, required: true }, 
  time: { type: String, required: true },
  guests: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reservation", reservationSchema);  // Make sure the model name is 'Reservation'
