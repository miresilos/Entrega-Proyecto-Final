import { config } from "../utils/config.js";
import { mongoConnect } from "../utils/db.js";
import { errorLogger } from "../utils/loggers.js";

mongoConnect(config.mongo_uri);

class MongoDbContainer {
    constructor(collection) {
        this.collection = collection;
    }

    async listAll() {
        try {
            const elements = await this.collection.find().lean();
            return elements;
        } catch (err) {
            errorLogger.error(err);
        }
    }

    async list(id) {
        try {
            const element = await this.collection.findById(id);
            return element;
        } catch (err) {
            errorLogger.error(err);
        }
    }

    async delete(id) {
        try {
            const element = await this.collection.findByIdAndDelete(id);
            return element;
        } catch (err) {
            errorLogger.error(err);
        }
    }

    async update(obj) {
        try {
            const element = await this.collection.findByIdAndUpdate(obj.id, { $set: obj }, { new: true });
            return element;
        } catch (err) {
            errorLogger.error(err);
        }
    }
}

export default MongoDbContainer;