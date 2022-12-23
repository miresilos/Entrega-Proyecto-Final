import ProductsDAOMongo from "../DAO/ProductsDAOMongo.js";

const productsDAO = ProductsDAOMongo.createInstance();

async function getProducts() {
    return await productsDAO.listAll();
};

async function getProductById(id) {
    return await productsDAO.list(id);
};

async function getProductsByCategory(category) {
    return await productsDAO.findByCategory(category);
}

async function addProduct(title, category, description, price, thumbnail) {
    let savedProduct = await productsDAO.createProduct({ title, category, description, price, thumbnail, quantity: 1 })
    return savedProduct;
};

async function updateProduct(id, title, price, thumbnail, quantity) {
    let updatedProduct = await productsDAO.update({ id: id, title: title, price: price, thumbnail: thumbnail, quantity: quantity });
    return updatedProduct;
};

async function deleteProduct(id) {
    return await productsDAO.delete(id);
};

export { getProducts, getProductById, getProductsByCategory, addProduct, updateProduct, deleteProduct };