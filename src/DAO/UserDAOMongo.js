import MongoDbContainer from "../containers/MongoDbContainer.js";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";
import { errorLogger } from "../utils/loggers.js";

let instance = null;

class UsersDAOMongo extends MongoDbContainer {
    constructor() {
        super(UserModel);
    };
    
    static createInstance() {
        if (!instance) {
            instance = new UsersDAOMongo();
        }
        return instance;
    }

    async createUser(username, password, email, direction, birthDate, phoneNumber, file) {
        try {
            const newUser = new UserModel({
                username,
                password,
                email,
                direction,
                birthDate,
                phoneNumber,
                admin: false,
            });
    
            if(file) {
                newUser.setImgUrl(file);
            };
    
            await newUser.save();
        } catch (err) {
            errorLogger.error(err);
        };
    };

    async findById(id) {
        try {
            const user = await UserModel.findById(id).lean();
            return user;
        } catch (err) {
            errorLogger.error(err);
        }
    };

    async findByEmail(email) {
        try {
            const user = await UserModel.findOne({ email: email });
            return user;
        } catch (err) {
            errorLogger.error(err);
        };
    };

    async userDeserialize(id) {
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (err) {
            errorLogger.error(err);
        };
    };

    async checkIfUserExist(email, password, done) {
        try {
            UserModel.findOne({ email }, (err, user) => {
                if (err) console.log(err);
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, isMatch) => {
                  if (err) console.log(err);
                  if (isMatch) return done(null, user);
                  return done(null, false);
                });
            });
        } catch (err) {
            errorLogger.error(err);
        };
    };
};

export default UsersDAOMongo;