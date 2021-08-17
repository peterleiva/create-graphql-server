import express from "express";
import createError from "http-errors";
import type { Request, Response } from "express";
import config from "config";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.set(
	"env",
	config.env("prod") || config.env("staging") ? "production" : "development"
);
app.use(compression());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
	res.send("Olá, mundo");
});

app.use((req, res, next) => {
	next(createError(404));
});

export default app;
