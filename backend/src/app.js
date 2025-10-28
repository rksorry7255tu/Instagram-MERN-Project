import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
// const corsOptions = {
//   origin: "http://localhost:5173",
//   Credential: true,
// };
app.use(
  cors({
    origin: "http://localhost:5173",
    Credential: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes
import userRoute from "./routes/user.routes.js";
import postRoute from "./routes/post.routes.js";
import messageRoute from "./routes/message.routes.js";

app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

export default app;
