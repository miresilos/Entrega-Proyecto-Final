import app from "./app.js";
import { Server as WebSocketServer } from "socket.io";
import http from "http";
import sockets from "./src/sockets.js";
import { config } from "./src/utils/config.js";
import { logger, errorLogger } from "./src/utils/loggers.js";

const server = http.createServer(app);
const httpServer = server.listen(config.port, () => {
  return logger.info(`Servidor escuchando en puerto ${config.port}`);
});
httpServer.on("error", (error) => {
  return errorLogger.error(`Error en el servidor ${error}`);
});

const io = new WebSocketServer(httpServer);

sockets(io);