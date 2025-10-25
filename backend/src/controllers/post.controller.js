import { Post } from "../models/post.model.js";
import uploadOnCloudinary from "../middlewares/cloudinary.js";
import { User } from "../models/user.model.js";
import { log } from "console";

const addPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const author = req.id;

    if (!author) {
      return res.status(402).json({
        success: true,
        message: "Author not found!",
      });
    }

    const imageLocalPath = req?.file?.path;
    // console.log(imageLocalPath);

    if (!imageLocalPath) {
      return res.status(401).json({
        success: false,
        message: "Image not found.",
      });
    }
    const imageCloudinaryResponse = await uploadOnCloudinary(imageLocalPath);
    if (!imageCloudinaryResponse) {
      return res.status(401).json({
        success: true,
        message: "image not uploaded on cloudinary",
      });
    }

    const post = await Post.create({
      caption: caption,
      image: imageCloudinaryResponse.url,
      author: author,
      likes: [],
      comments: [],
    });

    if (!post) {
      return res.status(401).json({
        success: false,
        message: "Post not created.",
      });
    }
    const user = await User.findByIdAndUpdate(
      { _id: author },
      { $push: { posts: post._id } }
    );
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post created successfully.",
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllPost = async (req, res) => {
  try {
    const allPosts = await Post.find().sort({ createdAt: -1 }).populate({
      path: "author",
      select: "username profilePicture",
    });
    // .populate({
    //   path: "comments",
    //   sort: { createdAt: -1 },
    //   populate: {
    //     path: "author",
    //     select: "username profilePicture",
    //   },
    // });

    if (!allPosts) {
      return res.status(401).json({
        success: true,
        message: "Post not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All post got successfully!",
      allPosts,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserPost = async (req, res) => {
  try {
    const userId = req.id;
    const userPosts = await Post.find({ author: userId });
    if (!userPosts) {
      return res.status(401).json({
        success: false,
        message: "User post not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Posts found successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export { addPost, getAllPost, getUserPost };
