import express from "express";
import { TransactionController } from "./transaction.controller";
import { Role } from "../user/user.interface";
import { createTransactionZodSchema } from "./transaction.zod.validation";
import { Transaction } from "./transaction.model";
import { queryBuilders } from "../../middlewares/queryBuilders";
import { validateRequest } from "../../middlewares/validateMiddleware";
import { checkAuth } from "../../middlewares/checkAuth";

const transactionRoute = express.Router();

transactionRoute.post(
  "/add-money",
  checkAuth(Role.USER),
  validateRequest(createTransactionZodSchema),
  TransactionController.addMoney
);

transactionRoute.post(
  "/withdraw",
  checkAuth(Role.USER),
  validateRequest(createTransactionZodSchema),
  TransactionController.withdrawMoney
);

transactionRoute.post(
  "/send-money",
  checkAuth(Role.USER),
  validateRequest(createTransactionZodSchema),
  TransactionController.sendMoney
);

transactionRoute.get(
  "/me",
  checkAuth(Role.USER, Role.AGENT),
  TransactionController.getTransactionHistory
);

transactionRoute.get(
  "/",
  checkAuth(Role.ADMIN),
    queryBuilders(Transaction),
  TransactionController.getAllTransactionHistory
);

transactionRoute.post(
  "/cash-in",
  checkAuth(Role.AGENT),
  validateRequest(createTransactionZodSchema),
  TransactionController.cashIn
);

transactionRoute.post(
  "/cash-out",
  checkAuth(Role.AGENT),
  validateRequest(createTransactionZodSchema),
  TransactionController.cashOut
);

export default transactionRoute;
