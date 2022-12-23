import { Router } from "express";
import { listUserByIdController } from "../controllers/User.controller.js";
import { verifyCartExistenceController } from "../controllers/Carts.controller.js";
import { getProductsController, getProductByIdController, getProductsByCategoryController, addProductController, updateProductController, deleteProductController } from "../controllers/Products.controller.js";
import { auth } from "../middlewares/auth.js";

const productsRouter = Router();

productsRouter.get("/", auth, async (req, res) => {
    const userData = await listUserByIdController(req.user._id);
    const dataProd = await getProductsController();

    const cart = await verifyCartExistenceController(req.user._id, null);
    
    res.render("products", {
      data: userData,
      productData: dataProd,
    });
});

productsRouter.get("/:id", auth, async (req, res) => {
    const { id } = req.params;
    let product = await getProductByIdController(id);
    if (!product) {
        res.status(404).send({ error: "The searched product does not exist." });
    } else {
        res.send(product);
    };
});

productsRouter.get("/categoria/:category", auth, async (req, res) => {
    const { category } = req.params;
    let products = await getProductsByCategoryController(category);
    res.send(products);
})

productsRouter.post("/", async (req, res) => {
    const { title, category, description, price, thumbnail } = req.body;
    let savedProduct = await addProductController(title, category, description, price, thumbnail);
    res.send(savedProduct);
});

productsRouter.put("/", async (req, res) => {
    const { id, title, price, thumbnail, quantity } = req.body;
    const product = await updateProductController(id, title, price, thumbnail, quantity);
    res.send(product);
});

productsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    res.send(deleteProductController(id));
});

export default productsRouter;