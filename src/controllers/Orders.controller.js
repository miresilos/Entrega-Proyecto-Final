import { createNewOrder, sendNewOrderEmail, sendNewOrderMessage } from "../services/order.services.js";


async function createNewOrderController(products, userEmail, phoneNumber) {
    const createOrder = await createNewOrder(products, userEmail);

    await sendNewOrderEmail(createOrder);
    await sendNewOrderMessage(phoneNumber);

    return createOrder;
};

export { createNewOrderController };