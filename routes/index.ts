import { NextFunction, Request, Response } from "express";
var express = require("express");
var router = express.Router();
import { isLoggedIn, requireAuth } from "../src/middleware/Auth";
import createCookie from "../src/helper/createCookie";
import { v4 as uuidv4 } from "uuid";
import UserManager from "../src/manager/user.manager";
//index page

const userManager = new UserManager();

router.get(
  "/",
  isLoggedIn,
  function (req: Request, res: Response, next: NextFunction) {
    const user = userManager.getUser();
    userManager.getUserByID(req.cookies.userId);
    // console.log(req.session!.isLoggedIn, req.isLoggedIn);
    res.render("index", { username: user[0].name, avatar: user[0].avatar });
  }
);
//login page
router.get("/login", function (req: Request, res: Response) {
  if (Boolean(req.cookies.isLoggedIn)) {
    res.redirect("/");
  }

  res.render("login");
});

//post request
router.post(
  "/login",
  function (req: Request, res: Response, next: NextFunction) {
    const id = uuidv4();
    const { username, avatar } = req.body;

    if (username) {
      createCookie({
        res: res,
        cookiename: "isLoggedIn",
        cookievalue: true,
      });
      createCookie({
        res: res,
        cookiename: "userId",
        cookievalue: id,
      });
      createCookie({
        res: res,
        cookiename: "username",
        cookievalue: username,
      });
      userManager.createUser({
        avatar: avatar,
        name: username,
        id: id,
      });
      // req.session!.isLoggedIn = true;
      res.redirect("/");
      // res.send(req.cookies);
    }
  }
);

//logout route
router.get(
  "/logout",
  function (req: Request, res: Response, next: NextFunction) {
    // logout logic
    const isLoggedIn = Boolean(req.cookies.isLoggedIn);
    if (isLoggedIn) {
      res.clearCookie("isLoggedIn");
      res.clearCookie("username");
      res.redirect("/login");
    }
  }
);

module.exports = router;
