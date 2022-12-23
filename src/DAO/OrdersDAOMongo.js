import MongoDbContainer from "../containers/MongoDbContainer.js";
import { OrderModel } from "../models/Order.js";
import { errorLogger } from "../utils/loggers.js";

let instance = null;

class OrdersDAOMongo extends MongoDbContainer {
    constructor(){
        super(OrderModel);
    };

    static createInstance() {
        if (!instance) {
            instance = new OrdersDAOMongo();
        };
        return instance;
    };

    async createOrder(products, userEmail) {
        try {
            let orderNumber;
            const orders = await this.listAll();
            
            if(orders.length < 1) {
                orderNumber = 1;
            } else {
                orderNumber = orders.length + 1;
            };

            const newOrder = await OrderModel.create({
                products: products,
                orderNumber,
                state: "Generated",
                userEmail
            });
            
            return newOrder;
        } catch (err) {
            errorLogger.error(err);
        };
    };
};

export default OrdersDAOMongo;