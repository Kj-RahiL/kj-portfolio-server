import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from "../../errors/appError";
import { TLoginUser } from "./auth.interface";
import { User } from "./auth.model";
import config from '../../config';
import { isPasswordMatched } from './auth.utils';

const loginIntoDB = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password,
  );
  if (!passwordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password doesn't match !");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    image: user.profilePhoto,
    status: user.status,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_refresh_expire_in,
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    { expiresIn: config.jwt_refresh_expire_in },
  );

  return {
    accessToken,
    refreshToken,
  };
};



const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email, iat } = decoded;

  // checking user existing
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  // checking if user is already deleted

  const isJWTIssuedBeforePasswordChanged = (
    passwordChangeAt: Date,
    iat: number,
  ): boolean => {
    const jwtIssuedTimestamp = iat * 1000;

    if (!passwordChangeAt) return false;

    const passwordTimestamp = new Date(passwordChangeAt).getTime();
    return jwtIssuedTimestamp < passwordTimestamp;
  };

  //   create token and sent client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expire_in as string,
  });
  return { accessToken };
};



export const AuthServices = {
  
  loginIntoDB,
  refreshToken,
};
