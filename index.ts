import "module-alias/register";
import express from "express";
import dotenv from "dotenv";
import { PORT } from "@/config/app";
import cors from "cors";
import mainRouter from "./router";
import bodyParser from "body-parser";
import { rateLimit } from "express-rate-limit";
const app = express();
dotenv.config();

const throttle = rateLimit({
  windowMs: 1000, // 1sec
  limit: 30, // limit each IP to requests per windowMs
  message: { statusCode: 429, statusMessage: "TOO_MANY_REQUEST" },
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(throttle);

// routes
app.use("/", mainRouter);

try {
  app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT} 🚀`);
  });
} catch (error) {
  console.log(error);
  process.exit();
}
