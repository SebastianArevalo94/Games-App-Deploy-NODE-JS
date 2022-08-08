import { Router } from "express";
import {
  getAll,
  createProduct,
  getOne,
  deleteProduct,
  updateProduct,
  searchProduct
} from "../controllers/productControllers.js";
import { VerifyToken } from "../middlewares/verifyToken.js";

const productRouter = Router();

productRouter.get("/getAll", VerifyToken, getAll);
productRouter.get("/getOne/:id", VerifyToken, getOne);
productRouter.get("/searchProduct/:name", VerifyToken, searchProduct);
productRouter.post("/createProduct", VerifyToken, createProduct);
productRouter.put("/updateProduct/:id", VerifyToken, updateProduct);
productRouter.delete("/deleteProduct/:id", VerifyToken, deleteProduct);

export default productRouter;
