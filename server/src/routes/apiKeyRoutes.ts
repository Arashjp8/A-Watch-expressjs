import { Router } from "express";
import validateApiKey from "../middleware/validateApiKey";
import {
  getAllApiKeys,
  postDeactivatedApiKey,
  postNewApiKey,
} from "../controllers/apiKeysController";

const router = Router();

router.get("/", validateApiKey, getAllApiKeys);
router.post("/generate", postNewApiKey);
router.post("/deactivate", validateApiKey, postDeactivatedApiKey);

export default router;
