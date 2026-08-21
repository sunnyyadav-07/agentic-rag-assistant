import "dotenv/config";
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}
if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET is not defined in environment variables");
}
if (!process.env.JWT_ACCESS_SECRET) {
  throw new Error("JWT_ACCESS_SECRET is not defined in environment variables");
}
if (!process.env.REFRESH_TOKEN_EXPIRY) {
  throw new Error(
    "REFRESH_TOKEN_EXPIRY is not defined in environment variables",
  );
}
if (!process.env.ACCESS_TOKEN_EXPIRY) {
  throw new Error(
    "ACCESS_TOKEN_EXPIRY is not defined in environment variables",
  );
}
export const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
};
