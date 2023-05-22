import express from "express";
import cors from "cors";
import morgan from "morgan";
import { generalError, notFoundError } from "./middlewares/errorMiddlewares.js";
import userRouter from "./routers/user/userRouter.js";

const allowedOrigins = [
  "http://localhost:5173",
  "http://202304-w7chwe-pol-usieto-front.netlify.app",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(cors(options));

app.disable("x-powered-by");

app.use(express.json());

app.use(morgan("dev"));

app.use("/user", userRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
