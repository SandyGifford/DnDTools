import express from "express";
import * as path from "path";
const app = express();

app.get(["/", "/index.html"], (req, res) => res.sendFile(path.join(__dirname, "../index.html")));
app.get("/build/*", (req, res) => res.sendFile(path.join(__dirname, "../", req.url)));

export default app;
