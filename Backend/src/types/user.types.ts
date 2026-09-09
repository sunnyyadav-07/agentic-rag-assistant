export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(userPassword: string): boolean;
  refreshToken?: string | null;
}
export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}
export interface LoginBody {
  email: string;
  password: string;
}
export interface JWTPayload {
  userId: string;
  email?: string;
}
export interface DecodeJWT {
  userId: string;
  iat: number;
  exp: number;
}
