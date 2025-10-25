import express from "express";
import {
  login,
  logout,
  register,
  getProfile,
  editProfile,
  suggestedUsers,
  followOrUnfollow,
} from "../controllers/user.controller.js";
import isAuthentication from "../middlewares/isAuthentication.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/:id/profile").get(isAuthentication, getProfile);
router
  .route("/:id/editprofile")
  .post(upload.single("profilePicture"), isAuthentication, editProfile);

router.route("/suggestedusers").get(isAuthentication, suggestedUsers);
router.route("/followorunfollow/:id").post(isAuthentication, followOrUnfollow);
export default router;
