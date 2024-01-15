const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({ port: 8080 });
import uuid4 from "uuid4";
import UserManager from "./manager/user.manager";
import { NextFunction, Request, Response } from "express";
const indexRouter = require("../routes/index");
const pollRouter = require("../routes/poll");
const cookieParser = require("cookie-parser");

wss.on("connection", (ws: any) => {
  const User = new UserManager();
  let id = uuid4();

  // console.log("Client connected with " + id);
  ws.send(JSON.stringify({ type: "id", clientId: id }));

  // Add the new client to the array
  // Handle incoming messages from the client
  ws.on("message", (message: any) => {
    try {
      // Convert the binary buffer to a string

      let data = message.toString("utf-8");
      data = JSON.parse(data);
      if (!data.name) return;

      const name = data.name;
      const userid = id;
      const avatar = data.avatar;
      User.createUser({ name: name, id: userid, avatar });

      // console.log(User.getUser());
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  });

  // Handle client disconnection
  ws.on("close", () => {
    // console.log("Client disconnected ");
  });
});

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "stylesheets")));
app.use(express.static(path.join(__dirname, "javascripts")));

app.use("/", indexRouter);
app.use("/poll", pollRouter);

app.use(function (req: Request, res: Response, next: NextFunction) {
  Error("error");
  next();
});

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const requestListener = function (req, res) {
//   res.setHeader("Content-Type", "application/json");
//   res.writeHead(200);
//   res.end(`{"message": "This is a JSON response"}`);
// };

// const server = http.createServer(requestListener);

// fs.readFile(__dirname + "/index.html")
//   .then((contents) => {
//     indexFile = contents;
//     server.listen(port, host, () => {
//       console.log(`Server is running on http://${host}:${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error(`Could not read index.html file: ${err}`);
//     process.exit(1);
//   });

// switch (req.url) {
//         case "/books":
//             res.writeHead(200);
//             res.end(books);
//             break
//         case "/authors":
//             res.writeHead(200);
//             res.end(authors);
//             break
//         default:
//             res.writeHead(404);
//             res.end(JSON.stringify({error:"Resource not found"}));
