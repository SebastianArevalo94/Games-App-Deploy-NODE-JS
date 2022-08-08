import { Router } from "express";
import { createUser, loginUser, GetAll, GetOne, UpdateUser, DeleteUser } from "../controllers/userControllers.js";
import { VerifyToken } from "../middlewares/verifyToken.js";
const userRouter = Router();

userRouter.post('/createUser', createUser);
userRouter.post('/loginUser', loginUser);
userRouter.get('/getAll', VerifyToken, GetAll);
userRouter.get('/getOne/:id', VerifyToken, GetOne);
userRouter.put('/updateUser/:id', VerifyToken, UpdateUser);
userRouter.delete('/deleteUser/:id', VerifyToken, DeleteUser)

export default userRouter