import OrdersDAOMongo from "../DAO/OrdersDAOMongo.js";
import { errorLogger } from "../utils/loggers.js";
import { nodemailerConfig, twilioConfig } from "../utils/config.js";

const ordersDAO = OrdersDAOMongo.createInstance();

async function createNewOrder(products, userEmail) {
    return await ordersDAO.createOrder(products, userEmail);
};

async function sendNewOrderEmail(order) {
    try {
        const transporter = nodemailerConfig.transporter;
        const products = order.products;
        let productsList = "";
        let p;
        let totalPrice = 0;

        for (p in products) {
            productsList += `<li>${products[p].title} x${products[p].quantity}</li>`;
        };

        products.forEach((product) => totalPrice += (product.price * product.quantity));

        const emailContent = {
            from: "Coder Ecommerce",
            to: order.userEmail,
            subject: `Nuevo Pedido`,
            html: `
                <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
                    <div style="max-width: 700px; background-color: white; margin: 0 auto">
                        <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
                            <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
                                Coder Ecommerce
                            </p>
                            <div style="font-size: .8rem; margin: 0 30px">
                                <p>Usuario: <b>${order.userEmail}</b></p>
                                <p>Número de Orden: <b>${order.orderNumber}</b></p>
                                <p>Estado: <span>${order.state}</span></p>
                                <h3>Productos</h3>
                                <ul>
                                    ${productsList}
                                </ul>
                                <strong>Total: $${totalPrice}</strong>
                                <br>
                                <span>${order.createdAt}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        };
        const info = await transporter.sendMail(emailContent);

        return info;
    } catch (err) {
        errorLogger.error(err);
    };
};

async function sendNewOrderMessage(phoneNumber) {
    try {
        const accountSid = twilioConfig.accountSid;
        const authToken = twilioConfig.authToken;
    
        const client = await twilio(accountSid, authToken);
        
        const message = await client.messages.create({
            body: "Su pedido ha sido recibido y se encuentra en proceso de envío",
            from: "+14699604183",
            to: `+${phoneNumber}`,
        });

        return message;
    } catch (err) {
        errorLogger.error(err);
    };
};

export { createNewOrder, sendNewOrderEmail, sendNewOrderMessage };