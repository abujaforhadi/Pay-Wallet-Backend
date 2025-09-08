/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IUser } from "../user/user.interface";
import httpStatus from "http-status-codes";
import { User } from "../user/user.model";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import {
  createNewAccessTokenWithRefreshToken,
  createUserToken,
} from "../../utils/userTokens";
import AppError from "../../middlewares/appError";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { password, email } = payload;
  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User dose not exist");
  }

  const isPassWordMatch = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPassWordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password does not match");
  }

  const userToken = createUserToken(isUserExist);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, ...rest } = isUserExist.toObject();
  return {
    accessToken: userToken.accessToken,
    refreshToken: userToken.refreshToken,
    user: rest,
  };
};
const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );

  return {
    accessToken: newAccessToken,
  };
};
const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await User.findById(decodedToken.userId);

  const isPassWordMatch = await bcryptjs.compare(
    oldPassword,
    user!.password as string
  );

  if (!isPassWordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, " Old Password does not match");
  }

  user!.password = await bcryptjs.hash(
    newPassword,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  user!.save();
  return true;
};

export const AuthServices = {
  credentialsLogin,
  getNewAccessToken,
  resetPassword,
};
