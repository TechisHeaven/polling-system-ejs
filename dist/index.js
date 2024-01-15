"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({ port: 8080 });
const uuid4_1 = __importDefault(require("uuid4"));
const user_manager_1 = __importDefault(require("./manager/user.manager"));
wss.on("connection", (ws) => {
    const User = new user_manager_1.default();
    let id = (0, uuid4_1.default)();
    console.log("Client connected with " + id);
    ws.send(JSON.stringify({ type: "id", clientId: id }));
    // Add the new client to the array
    // Handle incoming messages from the client
    ws.on("message", (message) => {
        try {
            // Convert the binary buffer to a string
            let data = message.toString("utf-8");
            data = JSON.parse(data);
            if (!data.name)
                return;
            const name = data.name;
            const userid = id;
            User.createUser({ name: name, id: userid });
            console.log(User.getUser());
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    // Handle client disconnection
    ws.on("close", () => {
        console.log("Client disconnected ");
    });
});
