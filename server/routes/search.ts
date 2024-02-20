import express, { Request, Response } from "express";

const router = express.Router();

router.get("/multi?q=query", (req: Request, res: Response) => {});

export default router;
