import { NextFunction, Request, Response } from "express";

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (!Boolean(req.cookies.isLoggedIn)) {
    res.clearCookie("isLoggedIn");
    res.clearCookie("username");
    res.redirect("/login");
  }
  next();
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session.userId) {
    next(); // User is authenticated, continue to next middleware
  } else {
    res.redirect("/login"); // User is not authenticated, redirect to login page
  }
}
