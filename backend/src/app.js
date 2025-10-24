import express from "express";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//routes

app.get("/", () => {
  return res.status(200).json({
    success: true,
    message: "i am comming from backend",
  });
});

export default app;
