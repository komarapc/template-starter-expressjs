import dotenv from "dotenv";
dotenv.config();
const PORT: number = Number(process.env.PORT) || 8000;
const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS) || 10;
export { PORT, SALT_ROUNDS };
