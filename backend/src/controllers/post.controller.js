import { Post } from "../models/post.model.js";
import uploadOnCloudinary from "../middlewares/cloudinary.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";

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
    const userPosts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "username profilePicture",
      });
    // .populate({
    //   path: "comments",
    //   sort: {
    //     createAt: -1,
    //   },
    //   populate: {
    //     path: "author",
    //     select: "username profilePicture",
    //   },
    // });
    if (!userPosts) {
      return res.status(401).json({
        success: false,
        message: "User post not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Posts found successfully",
      userPosts,
    });
  } catch (error) {
    console.log(error);
  }
};

const likePost = async (req, res) => {
  try {
    const likeKarneWala = req.id;
    const postId = req?.params.id;

    if (!postId) {
      return res.status(401).json({
        success: true,
        message: "PostId not found",
      });
    }

    const post = await Post.findByIdAndUpdate(
      { _id: postId },
      { $push: { likes: likeKarneWala } }
    );
    if (!post) {
      return res.status(401).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "post liked successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const disLikePost = async (req, res) => {
  try {
    const likeKarneWala = req.id;
    const postId = req.params.id;

    if (!postId) {
      return res.status(401).json({
        success: false,
        message: "PostId not found",
      });
    }
    const post = await Post.findByIdAndUpdate(
      { _id: postId },
      { $pull: { likes: likeKarneWala } }
    );
    if (!post) {
      return res.status(401).json({
        success: false,
        message: "Post not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post disLiked successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const addComment = async (req, res) => {
  try {
    const commentkarneWalaKaId = req.id;
    const jisPostPeCommentHoga = req.params.id;
    const { text } = req.body;
    if (!text) {
      return res.status(401).json({
        success: true,
        message: "comment is required.",
      });
    }
    if (!commentkarneWalaKaId || !jisPostPeCommentHoga) {
      return res.status(401).json({
        success: false,
        message:
          "commentkarneWalaKaId or jisPostPeCommentHoga id jo hai wo missing hai ",
      });
    }
    let post = await Post.findById(jisPostPeCommentHoga);
    if (!post) {
      return res.status(401).json({
        success: false,
        message: "Post not found",
      });
    }

    const comment = await Comment.create({
      text: text,
      author: commentkarneWalaKaId,
      post: post?.id,
    });
    if (!comment) {
      return res.status(401).json({
        success: false,
        message: "comment not created",
      });
    }

    post = await Post.findByIdAndUpdate(
      { _id: post?._id },
      { $push: { comments: comment?._id } }
    );
    if (!post) {
      return res.status(401).json({
        success: false,
        message: "Post not updated",
      });
    }
    return res.status(200).json({
      success: true,
      message: "comment added successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const getCommentsOfPosts = async (req, res) => {
  try {
    const postId = req?.params?.id;

    // console.log(postId);

    const comments = await Comment.find({ post: postId }).populate({
      path: "author",
      select: "username profilePicture",
    });
    // console.log(comments);

    if (!comments) {
      return res.status(401).json({
        success: false,
        message: "Post not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "comments found successfully",
      comments,
    });
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req?.params?.id;
    const userId = req.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(401).json({
        success: true,
        message: "post not found",
      });
    }
    if (post?.author?.toString() !== userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised user.",
      });
    }
    await Post.findByIdAndDelete({ _id: postId });

    const comments = await Comment.deleteMany({ post: postId });

    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { posts: post?._id } }
    );
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const bookMarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.id;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: true,
        message: "user not found",
      });
    }

    const isBookMarked = user?.bookmarks?.includes(postId);

    if (isBookMarked) {
      //remove karna hai
      user = await User.findByIdAndUpdate(
        { _id: userId },
        { $pull: { bookmarks: postId } }
      );
      return res.status(200).json({
        success: true,
        message: "Post removed from bookmarked successfully",
      });
    } else {
      //add karna hai
      user = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { bookmarks: postId } }
      );
      return res.status(200).json({
        success: true,
        message: "Post bookmarked successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  addPost,
  getAllPost,
  getUserPost,
  likePost,
  disLikePost,
  addComment,
  getCommentsOfPosts,
  deletePost,
  bookMarkPost,
};
