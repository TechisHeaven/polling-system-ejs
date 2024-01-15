import { NextFunction, Request, Response } from "express";
var express = require("express");
var router = express.Router();
import { isLoggedIn, requireAuth } from "../src/middleware/Auth";
import createCookie from "../src/helper/createCookie";
import { v4 as uuidv4 } from "uuid";
import PollManager from "../src/manager/poll.manager";
//index page

const userManager = new PollManager();

router.get("/", function (req: Request, res: Response, next: NextFunction) {
  const Poll = userManager.getPoll();
  console.log(Poll);
  // userManager.getUserByID(req.cookies.userId);
  // console.log(req.session!.isLoggedIn, req.isLoggedIn);
  res.render("poll", { poll: Poll });
});

module.exports = router;
