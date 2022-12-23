import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    products: {type: Array, required: true, max: 100},
    orderNumber: {type: Number, required: true},
    state: {type: String},
    userEmail: {type: String, required: true},
},
{
    timestamps: true
});

export const OrderModel = mongoose.model("Order", OrderSchema);