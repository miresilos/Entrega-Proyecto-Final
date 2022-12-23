import {  createCart, getCartById, addProductToCart, deleteCartByID, deleteProductFromCart } from "../services/cart.services.js";

async function getCartByIdController(id) {
    return await getCartById(id);
};

async function addProductToCartController(userID, productID) {
    return await addProductToCart(userID, productID);
};

async function deleteCartByIDController(id) {
    return await deleteCartByID(id);
};

async function deleteProductFromCartController(userID, productID) {
    return await deleteProductFromCart(userID, productID);
};

async function verifyCartExistenceController(userID, products) {
    let cart = await getCartById(userID);
    if(!cart) {
        cart = await createCart(userID, products);
    };
    return cart;
};

export { getCartByIdController, addProductToCartController, deleteProductFromCartController, deleteCartByIDController, verifyCartExistenceController };