const socket = io();

export const loadMessages = (callback) => {
    socket.on("server:loadMessages", callback);
};

export const saveMessage = (email, content, admin) => {
    socket.emit("client:saveMessage", {
        email, content, admin
    });
};

export const onSavedMessage = (callback) => {
    socket.on("server:savedMessage", callback);
};

export const deleteMessage = (id, email) => {
    socket.emit("client:deleteMessage", {id, email});
};