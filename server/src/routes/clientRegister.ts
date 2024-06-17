import express, { Request, Response } from "express";

const router = express.Router();

router.get("/client/register", (req: Request, res: Response) => {
  res.send("client register");
});
