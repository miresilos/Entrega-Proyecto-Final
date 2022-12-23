import MongoDbContainer from "../containers/MongoDbContainer.js";
import { CartModel } from "../models/Cart.js";
import { ProductModel } from "../models/Product.js";
import { errorLogger } from "../utils/loggers.js";

let instance = null;

class CartsDAOMongo extends MongoDbContainer {
    constructor(){
        super(CartModel);
    }

    static createInstance() {
        if (!instance) {
            instance = new CartsDAOMongo();
        }
        return instance;
    }

    async createCart(userId, product) {
        try {
            let newCart
            if(product !== null) {
                newCart = await CartModel.create({
                    userId,
                    products: [product]
                });
            } else {
                newCart = await CartModel.create({
                    userId,
                    products: [],
                });
            };
            return newCart;
        } catch (err) {
            errorLogger.error(err);
        };
    };

    async addProduct(userId, productId) {
        try {
            let cart = await CartModel.findOne({ userId });
            let product = await ProductModel.findOne({ _id: productId });

            if (cart) {
                let itemIndex = cart.products.findIndex(p => p._id == productId);
                
                if (itemIndex > -1) {
                    let productItem = cart.products[itemIndex];
                    productItem.quantity = productItem.quantity + 1;
                    cart.products[itemIndex] = productItem;
                } else {
                    cart.products.push(product);
                };
                cart = await cart.save();
            } else {
                await this.createCart(userId, product)
            };
        } catch (err) {
            errorLogger.error(err);
        };
    };

    async listProducts(id) {
        try {
            let cartProducts = await CartModel.findById(id, { "products": 1, "_id": 0 }).exec();
            return cartProducts;
        } catch (err) {
            errorLogger.error(err);
        };
    };

    async findCart(userId) {
        try {
            const cart = await CartModel.findOne({ userId });
            return cart;
        } catch (err) {
            errorLogger.error(err);
        };
    };
    
    async deleteProduct(userId, productId) {
        try {
            let cart = await CartModel.findOne({ userId });

            if (cart) {
                let itemIndex = cart.products.findIndex(p => p._id == productId);
                const arrayTemporal = cart.products;
                if (itemIndex > -1) {
                    arrayTemporal.splice(itemIndex, 1);
                    await CartModel.updateOne({ userId: userId }, { $set: { products: arrayTemporal } } );
                }
            }
        } catch (err) {
            errorLogger.error(err);
        };
    };
};

export default CartsDAOMongo;