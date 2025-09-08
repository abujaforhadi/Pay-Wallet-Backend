import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserServices.createUser(req.body);

  const { password, ...userData } = user.toObject();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "user created successfully",
    data: userData,
  });
});

export const UserControllers = {
  createUser
};
