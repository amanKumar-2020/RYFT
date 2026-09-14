import "dotenv/config";

type GetEnv = (key:string, required?:boolean)=> string;

const getEnv: GetEnv = (key, required = true) => {
  const value = process.env[key];
  if (!value && required) {
    console.error(`Error :${key} is not define in the enviroment variables`);
    process.exit(1);
  }
  return value as string;
};

const config = {
  PORT: parseInt(getEnv("PORT", false) || "3000", 10),
  NODE_ENV: getEnv("NODE_ENV", false) || "development",
  FRONTEND_URL: getEnv("FRONTEND_URL", false) || "http://localhost:5173",
  BACKEND_URL: getEnv("BACKEND_URL", false) || "http://localhost:3000",

  MONGO_URI: getEnv("DATABASE_URI"),
  JWT_SECRET_KEY: getEnv("JWT_SECRET_KEY"),
  REDIS_URL: getEnv("REDIS_URL"),
  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),
  GOOGLE_CALLBACK_URL: getEnv("GOOGLE_CALLBACK_URL"),
  imagekit: {
    publicKey: getEnv("IMAGEKIT_PUBLIC_KEY"),
    privateKey: getEnv("IMAGEKIT_PRIVATE_KEY"),
    urlEndpoint: getEnv("IMAGEKIT_URL_ENDPOINT"),
    id: getEnv("IMAGEKIT_ID"),
  },
} as const;

export default config;