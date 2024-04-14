import dotenv from "dotenv";
dotenv.config();
const PORT: number = Number(process.env.PORT) || 8000;

export { PORT };
