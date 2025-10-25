import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kkb" }));
app.use(express.static("public"));

//routes
import userRoute from "./routes/user.routes.js";
import postRoute from "./routes/post.routes.js";
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);

export default app;
