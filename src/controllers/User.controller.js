import { listUserById, findUserByEmail, createNewUser, sendNewUserAdviceEmail, checkUser, listUserDeserialize } from "../services/user.services.js";
import UserDTO from "../DTO/UserDTO.js";

async function listUserByIdController(id) {
    const user = await listUserById(id);
    return new UserDTO(user);
};

async function listUserDeserializeController(id) {
    return await listUserDeserialize(id);
};

async function registerNewUserController(username, password, email, direction, birthDate, phoneNumber, file, res) {
    const user = await findUserByEmail(email);
    if(user) res.render("register-error");
    if(!user) {
        const newUser = await createNewUser(username, password, email, direction, birthDate, phoneNumber, file);
        await sendNewUserAdviceEmail(username, email, direction, birthDate, phoneNumber);
        res.redirect("/api/login");
        return newUser;
    };
};

async function checkUserController(email, password, done) {
    return await checkUser(email, password, done);
};

export { listUserByIdController, registerNewUserController, checkUserController, listUserDeserializeController };