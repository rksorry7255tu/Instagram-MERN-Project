import express from "express";
import {
  addPost,
  getAllPost,
  getUserPost,
  likePost,
  disLikePost,
  addComment,
  getCommentsOfPosts,
  deletePost,
  bookMarkPost,
} from "../controllers/post.controller.js";
import isAuthentication from "../middlewares/isAuthentication.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router
  .route("/addpost")
  .post(upload.single("image"), isAuthentication, addPost);

router.route("/getallposts").get(isAuthentication, getAllPost);

router.route("/getuserposts").get(isAuthentication, getUserPost);

router.route("/likepost/:id").post(isAuthentication, likePost);

router.route("/dislikepost/:id").post(isAuthentication, disLikePost);

router.route("/addcomment/:id").post(isAuthentication, addComment);

router
  .route("/getcommentsofpost/:id")
  .get(isAuthentication, getCommentsOfPosts);

router.route("/deletepost/:id").delete(isAuthentication, deletePost);

router.route("/bookmarkpost/:id").post(isAuthentication, bookMarkPost);

export default router;
