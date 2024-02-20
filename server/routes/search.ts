import express, { Request, Response } from "express";

const router = express.Router();

router.get("/search/multi?q=query", (req: Request, res: Response) => {});

export default router;
