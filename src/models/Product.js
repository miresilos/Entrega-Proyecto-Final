import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true, max: 100},
    category: {type: String, required: true}, 
    description: {type: String, required: true},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true, max: 100},
    quantity: {type: Number, required: true},
});

export const ProductModel = mongoose.model("Product", ProductSchema);