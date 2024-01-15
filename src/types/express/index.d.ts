import express from "express";

declare global {
  namespace Express {
    interface Request {
      session?: any;
      isLoggedIn: boolean;
    }
  }
}
