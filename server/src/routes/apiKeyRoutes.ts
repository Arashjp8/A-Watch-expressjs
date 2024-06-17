import { Router } from "express";
import validateApiKey from "../middleware/validateApiKey";
import {
  getAllApiKeys,
  postDeactivatedApiKey,
  postNewApiKey,
} from "../controllers/apiKeysController";

const router = Router();

router.get("/", validateApiKey, getAllApiKeys);
// TODO: maybe here is better to validate by a userSecret?
router.post("/generate", validateApiKey, postNewApiKey);
router.post("/deactivate", validateApiKey, postDeactivatedApiKey);

export default router;
