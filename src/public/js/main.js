import { loadMessages, onSavedMessage } from "./socket.js";
import { onHandleSubmit, renderMessages, appendMessage } from "./ui.js";

onSavedMessage(appendMessage);
loadMessages(renderMessages);

const messageForm = document.querySelector("#message-form");
messageForm.addEventListener("submit", onHandleSubmit);