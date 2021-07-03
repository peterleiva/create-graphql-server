import express from "express";
import createError from "http-errors";
import type { Request, Response } from "express";
import config from "config";
import compression from "compression";

const app = express();

app.set("x-powered-by", config.env("dev"));
app.set("env", config.env("production") ? "production" : config.env());
app.use(compression());

app.get("/", (req: Request, res: Response) => {
	res.send("Olá, mundo");
});

app.use((req, res, next) => {
	next(createError(404));
});

export default app;
