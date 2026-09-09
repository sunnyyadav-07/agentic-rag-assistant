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
if (!process.env.GEMINI_SECRET_API_KEY) {
  throw new Error(
    "GEMINI_SECRET_API_KEY is not defined in environment variables",
  );
}
if (!process.env.PINECONE_SECRET_API_KEY) {
  throw new Error(
    "PINECONE_SECRET_API_KEY is not defined in environment variables",
  );
}

export const config = {
  MONGO_URI: process.env.MONGO_URI as string,
  PORT: process.env.PORT || (5000 as number),
  NODE_ENV: process.env.NODE_ENV as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
  GEMINI_SECRET_API_KEY: process.env.GEMINI_SECRET_API_KEY as string,
  PINECONE_SECRET_API_KEY: process.env.PINECONE_SECRET_API_KEY as string,
};
