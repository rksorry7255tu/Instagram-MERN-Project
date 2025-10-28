import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import mongoDB from "./db/db.js";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "i am comming from backend",
  });
});
const PORT = process.env.PORT || 8000;
// routers

import userRoute from "./routes/user.routes.js";
import postRoute from "./routes/post.routes.js";
import messageRoute from "./routes/message.routes.js";

app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}`);
  mongoDB();
});

// import dotenv from "dotenv";
// dotenv.config();
// import connectDB from "./db/db.js";
// import app from "./app.js";

// const PORT = process.env.PORT || 8000;
// connectDB()
//   .then(() => {
//     app.on("error", (error) => {
//       console.log(error);
//       throw error;
//     });
//     app.listen(PORT, () => {
//       console.log(`Server is running on port: ${process.env.PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
