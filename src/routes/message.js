import { Router } from "express";
import { listUserByIdController } from "../controllers/User.controller.js";
import { getMessagesByUserEmailController } from "../controllers/Messsage.controller.js";
import { auth } from "../middlewares/auth.js";

const messageRouter = Router();

messageRouter.get("/", auth, async (req, res) => {
    const userData = await listUserByIdController(req.user._id);
    res.render("chat", { userData });
});

messageRouter.get("/:email",  async (req, res) => {
    const { email } = req.params;
    const messages = await getMessagesByUserEmailController(email);
    res.send(messages);
});

export default messageRouter;