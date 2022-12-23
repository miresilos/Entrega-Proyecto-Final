import { createNewMessage, getMessages, getMessage, getMessagesByUserEmail, deleteMessage, updateMessage } from "../services/messages.services.js";

async function createNewMessageController(email, content, admin) {
    return await createNewMessage(email, content, admin);
};

async function getMessagesController() {
    return await getMessages();
};

async function getMessageController(id) {
    return await getMessage(id);
};

async function getMessagesByUserEmailController(email) {
    return await getMessagesByUserEmail(email);
};

async function deleteMessageController(id) {
    return await deleteMessage(id);
};

async function updateMessageController(id, obj) {
    return await updateMessage(id, obj);
};

export { createNewMessageController, getMessagesController, getMessageController, getMessagesByUserEmailController, deleteMessageController, updateMessageController };