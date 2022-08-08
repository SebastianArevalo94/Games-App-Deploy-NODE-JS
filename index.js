import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import path from "path";
import "dotenv/config.js";
import "./database.js";

const app = express();
const port = process.env.PORT || 4000;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use(express.static(path.join(__dirname, "/build")))

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
