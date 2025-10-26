import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import isAuthentication from "../middlewares/isAuthentication.js";

const router = express.Router();

router.route("/sendmessage/:id").post(isAuthentication, sendMessage);
router.route("/getmessages/:id").get(isAuthentication, getMessage);

export default router;
