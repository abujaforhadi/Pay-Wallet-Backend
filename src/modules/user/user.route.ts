import { Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./userValidation";
import { validateRequest } from "../../middlewares/validateMiddleware";

const router = Router()

router.post(
  "/register",  validateRequest(createUserZodSchema),
  UserControllers.createUser);




export const userRoutes = router;