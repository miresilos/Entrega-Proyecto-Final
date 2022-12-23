import mongoose from "mongoose";
import { errorLogger } from "./loggers.js";

const mongoConnect = async (MONGO_URI) => {
    try {
        return await mongoose.connect(MONGO_URI);
    } catch (err) {
        errorLogger.error(err);
    };
};

export { mongoConnect };