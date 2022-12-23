import MessagesDAOMongo from "../DAO/MessagesDAOMongo.js";

const messagesDAO  = MessagesDAOMongo.createInstance();

async function createNewMessage(email, content, admin) {
    return await messagesDAO.createMessage(email, content, admin);
};

async function getMessages() {
    return await messagesDAO.listAll();
};

async function getMessage(id) {
    return await messagesDAO.list(id);
};

async function getMessagesByUserEmail(email) {
    return await messagesDAO.getMessagesByUserEmail(email);
};

async function deleteMessage(id) {
    return await messagesDAO.delete(id);
};

async function updateMessage(id, obj) {
    return await messagesDAO.updateMessage(id, obj);
};

export { createNewMessage, getMessages, getMessage, getMessagesByUserEmail, deleteMessage, updateMessage };