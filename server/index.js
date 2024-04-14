import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectToDB from "./database/db.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import nablRouter from "./routes/nablRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: "https://nabldemo.netlify.app",
    methods: "GET, POST",
    credentials: true,
  })
);

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/nabl", nablRouter);

// use middleware for error handling
app.use(notFound);
app.use(errorHandler);

// connect to DB
connectToDB();

app.get("/", (req, res) => res.send("Server ready"));

// start the server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
