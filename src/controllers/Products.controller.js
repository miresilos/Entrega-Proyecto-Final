import { getProducts, getProductById, getProductsByCategory, addProduct, updateProduct, deleteProduct } from "../services/product.services.js";

async function getProductsController() {
    return await getProducts();
};

async function getProductByIdController(id) {
    return await getProductById(id);
};

async function getProductsByCategoryController(category) {
    return await getProductsByCategory(category);
};

async function addProductController(title, category, description, price, thumbnail) {
    return await addProduct(title, category, description, price, thumbnail);
};

async function updateProductController(id, title, price, thumbnail, quantity) {
    return await updateProduct(id, title, price, thumbnail, quantity);
};

async function deleteProductController(id) {
    return await deleteProduct(id);
};

export { getProductsController, getProductByIdController, getProductsByCategoryController, addProductController, updateProductController, deleteProductController };