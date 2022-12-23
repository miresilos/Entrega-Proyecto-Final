import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

let config,
    nodemailerConfig,
    twilioConfig;

switch(NODE_ENV) {
    case "prod":
        config = {
            port: process.env.PORT,
            mongo_uri: process.env.MONGO_URI,
            session_secret: process.env.SESSION_SECRET,

        };

        nodemailerConfig = {
            adminEmail: process.env.ADMIN_EMAIL,
            transporter: createTransport({
                service: "gmail",
                auth: {
                    user: process.env.ADMIN_EMAIL,
                    pass: process.env.ADMIN_PASS,
                },
            }),
        };

        twilioConfig = {
            accountSid: process.env.ACCOUNT_SID,
            authToken: process.env.AUTH_TOKEN,
        };

        break;
    case "dev":
        config = {
            port: process.env.PORT_DEV,
            mongo_uri: process.env.MONGO_URI_DEV,
            session_secret: process.env.SESSION_SECRET_DEV,
        };

        nodemailerConfig = {
            adminEmail: process.env.ADMIN_EMAIL_DEV,
            transporter: createTransport({
                service: "gmail",
                auth: {
                    user: process.env.ADMIN_EMAIL_DEV,
                    pass: process.env.ADMIN_PASS_DEV,
                },
            }),
        };

        twilioConfig = {
            accountSid: process.env.ACCOUNT_SID_DEV,
            authToken: process.env.AUTH_TOKEN_DEV,
        };

        break;
};

export { config, nodemailerConfig, twilioConfig };