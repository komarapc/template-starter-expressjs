import { stringToBoolean } from "../lib/utils";
import dotenv from "dotenv";
dotenv.config();
const PORT: number = Number(process.env.PORT) || 8000;
const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS) || 10;
const SECRET_KEY = process.env.SECRET_KEY;
const DEBUG = stringToBoolean(String(process.env.DEBUG));
export { PORT, SALT_ROUNDS, SECRET_KEY, DEBUG };
