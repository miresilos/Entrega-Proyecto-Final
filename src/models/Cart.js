import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    products: {type: Array, max: 100},
},
{
    timestamps: true
});

export const CartModel = mongoose.model("Cart", CartSchema);