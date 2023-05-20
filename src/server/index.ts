import express from "express";
import cors from "cors";
import morgan from "morgan";

const allowedOrigins = [
  "http://localhost:5173",
  "https://202304-w7chwe-pol-usieto-front.netlify.app/",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(cors(options));

app.disable("x-powered-by");

app.use(express.json());

app.use(morgan("dev"));

export default app;
