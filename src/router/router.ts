import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";

export const router = Router();

const moduleRoutes = [
  {
      path:"/user",
      router: userRoutes,
  },
  {
    path:"/auth",
    router: AuthRoutes
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.router);
});
