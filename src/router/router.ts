import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import transactionRoute from "../modules/transaction/transaction.routes";
import walletRoute from "../modules/wallet/wallet.routes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    router: userRoutes,
  },
  {
    path: "/auth",
    router: AuthRoutes,
  },
  {
    path: "/transaction",
    router: transactionRoute,
  },
  {
    path: "/wallet",
    router: walletRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.router);
});
