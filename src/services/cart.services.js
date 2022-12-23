import CartsDAOMongo from "../DAO/CartsDAOMongo.js";


const cartsDAO = CartsDAOMongo.createInstance();

async function createCart(userID, products) {
    return await cartsDAO.createCart(userID, products);
};

async function getCartById(id) {
    return await cartsDAO.findCart(id);
};

async function addProductToCart(userID, productID) {
    return await cartsDAO.addProduct(userID, productID)
};

async function deleteCartByID(id) {
    return await cartsDAO.delete(id);
};

async function deleteProductFromCart(userID, productID) {
    return await cartsDAO.deleteProduct(userID, productID);
};

export { createCart, getCartById, addProductToCart, deleteCartByID, deleteProductFromCart };