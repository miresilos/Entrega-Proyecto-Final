import { createNewMessageController, getMessagesController, getMessageController, deleteMessageController, updateMessageController } from "./controllers/Messsage.controller.js";

export default (io) => {
    io.on("connection", (socket) => {
        const emitMessages = async () => {
            const messages = await getMessagesController();

            io.emit("server:loadMessages", messages);
        };
        emitMessages();

        socket.on("client:saveMessage", async (data) => {
            const newMessage = await createNewMessageController(data.email, data.content, data.admin);
            io.emit("server:savedMessage", newMessage);
        });

        socket.on("client:deleteMessage", async (data) => {
            const message = await getMessageController(data.id);
            if(message.email == data.email) {
                await deleteMessageController(data.id);
                emitMessages();
            } else {
                console.log("Solo puedes borrar tus mensajes.")
            };
        });
    });
};