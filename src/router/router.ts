import { Router } from "express";

export const router = Router();

const moduleRoutes = [
  {
      path:"/user",
      router: <></>;
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.router);
});
