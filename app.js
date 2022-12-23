import express from "express";
import { config } from "./src/utils/config.js";
import path from "path";
import {fileURLToPath} from 'url';
import router from "./src/routes/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import { checkUserController, listUserDeserializeController } from "./src/controllers/User.controller.js";
import passport from "passport";
import compression from "compression";
import { Strategy } from "passport-local";
import exphbs from "express-handlebars";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/*============================[Middlewares]============================*/

/*----------- Session -----------*/
const LocalStrategy = Strategy;
    
app.use(cookieParser());
app.use(
  session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000, // 10 min
    },
  })
);
app.use(compression());

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((email, password, done) => {
    checkUserController(email, password, done);
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await listUserDeserializeController(id);
  return done(null, user);
});


/*----------- Motor de Plantillas -----------*/
app.set("views", path.join(path.dirname(""), "./src/views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "index",
    layoutsDir: path.join(app.get("views"), "layouts"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')));

app.use("/api", router);
app.get("/", (req, res) => {
  res.redirect("/api");
});

export default app;