import { Request, Response } from "express";

export default function createCookie({
  res,
  cookiename,
  cookievalue,
}: {
  res: Response;
  cookiename: string;
  cookievalue: string | [] | object | number | boolean;
}) {
  let minute = 60 * 1000 * 15;
  if (typeof cookievalue !== "string") {
    cookievalue = JSON.stringify(cookievalue);
  }
  return res.cookie(cookiename, cookievalue, {
    maxAge: minute,
    httpOnly: true,
    secure: true,
  });
}
