import express from "express";
import { addPost, getAllPost } from "../controllers/post.controller.js";
import isAuthentication from "../middlewares/isAuthentication.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router
  .route("/addpost")
  .post(upload.single("image"), isAuthentication, addPost);

router.route("/getallposts").get(isAuthentication, getAllPost);

export default router;
