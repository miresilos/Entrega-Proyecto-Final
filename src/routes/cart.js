import { Router } from "express";
import { listUserByIdController } from "../controllers/User.controller.js";
import { getCartByIdController, addProductToCartController, deleteCartByIDController,deleteProductFromCartController } from "../controllers/Carts.controller.js";
import { createNewOrderController } from "../controllers/Orders.controller.js";
import { auth } from "../middlewares/auth.js";

const cartRouter = Router();

cartRouter.get("/", auth, async (req, res) => {
    const userData = await listUserByIdController(req.user._id);
    const userCart = await getCartByIdController(req.user._id);
    const productsOnCart = userCart.products;
    res.render("cart", {
      userData: userData,
      data: productsOnCart,
    });
});

cartRouter.post("/", async (req, res) => {
  const data = await req.body;
  const cart = await addProductToCartController(data.userId, data.productId);
});

cartRouter.post("/buy", async (req, res) => {
  const userID = await req.user._id;
  const userData = await listUserByIdController(userID);
  const userCart = await getCartByIdController(userID);

  createNewOrderController(userCart.products, userData.email, userData.phoneNumber);
});

cartRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const cart = await deleteCartByIDController(id);
  res.send(cart);
});

cartRouter.delete("/", async (req, res) => {
  const data = req.body;
  const deleteProductFromCart = await deleteProductFromCartController(data.userId, data.productId);
  res.send(deleteProductFromCart);
});

export default cartRouter;