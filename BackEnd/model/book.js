// model/book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    des: { type: String, required: true, trim: true },
    language: { type: String, required: true, trim: true },
    category: { type: [String], required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Book", bookSchema);
