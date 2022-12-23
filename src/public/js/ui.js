import { saveMessage, deleteMessage } from "./socket.js";

const messagesList = document.querySelector("#messages");
const email = document.querySelector("#message-email");
const admin = document.querySelector("#message-admin");
const content = document.querySelector("#message-content");

export const onHandleSubmit = (e) => {
    e.preventDefault();
    saveMessage(email.value, content.value, admin.value);

    content.value = "";
};

export const renderMessages = (messages) => {
    messagesList.innerHTML = ``;
    messages.forEach(message => appendMessage(message));
};

export const appendMessage = (message) => {
    messagesList.append(messageUI(message));
};

export const messageUI = (message) => {
    let messagePostedAt = new Date(message.createdAt).toDateString();
    let user;
    if(message.admin === true) {
        user = "System";
    } else {
        user = message.email;
    };

    const div = document.createElement("div");
    div.innerHTML = `
        <div class="container d-flex p-2">
            <span  
                class="p-2"
                style="background-color:transparent; color:#000; border-radius:30px; max-height: 40px;"
            >
                ${user}
            </span>
            <div 
                class="container d-flex justify-content-between align-items-center p-3" style="margin-left:20px; margin-bottom:20px; background-color:gray; color:white; border-radius:30px;"
            >
                <p>${message.content}</p>
                <div>
                <span>${messagePostedAt}</span>
                    <div>
                        <button class="btn-delete btn btn-danger" data-id="${message._id}">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const btnDelete = div.querySelector(".btn-delete");

    btnDelete.addEventListener("click", () => deleteMessage(btnDelete.dataset.id, email.value));

    return div;
};