import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Post } from "../models/post.model.js";
import uploadOnCloudinary from "../middlewares/cloudinary.js";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields required.",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "Account already created.",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashPassword,
    });
    return res.status(200).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields required",
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: true,
        message: "User not exist.",
      });
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password!",
      });
    }
    const token = await jwt.sign(
      {
        userId: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    const populatedPosts = await Promise.all(
      user?.posts?.map(async (postId) => {
        const post = await Post.findById(user._id);
        if (post?.author?._id === user?._id) {
          return post;
        }
        return null;
      })
    );

    user = {
      _id: user?._id,
      username: user?.username,
      email: user?.email,
      profilePicture: user?.profilePicture || "",
      bio: user?.bio,
      gender: user?.gender,
      followers: user?.followers,
      following: user?.following,
      posts: user?.posts,
      bookmarks: user?.bookmarks,
    };
    // await user.save();

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "User login successfully!",
        user,
      });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId)
      .populate({
        path: "posts",
        createdAt: -1,
      })
      .populate("bookmarks");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Profile not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User found successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio, gender } = req?.body;
    // console.log(req.body);

    const profilePictureLocalPath = req?.file?.path;
    console.log(profilePictureLocalPath);
    // console.log(bio);
    // console.log(gender);

    let cloudinaryResponse;
    if (profilePictureLocalPath) {
      cloudinaryResponse = await uploadOnCloudinary(profilePictureLocalPath);
    }

    let user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(402).json({
        success: false,
        message: "User not found.",
      });
    }
    if (user) user.bio = bio;
    if (user) user.gender = gender;
    if (user) user.profilePicture = cloudinaryResponse?.url;
    // console.log(cloudinaryResponse);

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Profile Updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const suggestedUsers = async (req, res) => {
  try {
    const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    );
    if (!suggestedUsers) {
      return res.status(401).json({
        success: false,
        message: "Suggested user not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "suggested user found successfully",
      suggestedUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

const followOrUnfollow = async (req, res) => {
  try {
    const followkarneWala = req.id;
    const jiskoFollowKiya = req.params.id;
    if (!followkarneWala || !jiskoFollowKiya) {
      return res.status(402).json({
        success: false,
        message: "follow karne ke liye id chahiye",
      });
    }
    if (followkarneWala === jiskoFollowKiya) {
      return res.status(401).json({
        success: false,
        message: "aap khud ko follow nahi kar sakte hai",
      });
    }
    let user = await User.findById(followkarneWala).select("-password");
    let targetUser = await User.findById(jiskoFollowKiya).select("-password");

    const isFollowing = user?.following?.includes(jiskoFollowKiya);

    if (isFollowing) {
      //unfollow ka logic
      await Promise.all([
        User.updateOne(
          { _id: followkarneWala },
          { $pull: { following: jiskoFollowKiya } }
        ),
        User.updateOne(
          { _id: jiskoFollowKiya },
          { $pull: { followers: followkarneWala } }
        ),
      ]);
      return res.status(200).json({
        success: true,
        message: "Unfollow successfull",
      });
    } else {
      //follow ka logic
      await Promise.all([
        User.updateOne(
          { _id: followkarneWala },
          { $push: { following: jiskoFollowKiya } }
        ),
        User.updateOne(
          { _id: jiskoFollowKiya },
          { $push: { followers: followkarneWala } }
        ),
      ]);
      return res.status(200).json({
        success: true,
        message: "follow successfull!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  register,
  login,
  logout,
  getProfile,
  editProfile,
  suggestedUsers,
  followOrUnfollow,
};
