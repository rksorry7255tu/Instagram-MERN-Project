import jwt from "jsonwebtoken";
const isAuthentication = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token not found",
      });
    }
    const verifiedToken = await jwt.verify(token, process.env.SECRET_KEY);
    if (!verifiedToken) {
      return res.status(402).json({
        success: false,
        message: "token not verified",
      });
    }
    req.id = verifiedToken.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthentication;
