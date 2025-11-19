import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

const app = express();

// Load environment variables
config({ path: "./config/config.env" });

// CORS configuration
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "https://mediserve-frontend-final-project.vercel.app",
      process.env.DASHBOARD_URL || "https://mediserve-dashboard-final-project.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// ⭐ Added root route to fix "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

// Error middleware (must be last)
app.use(errorMiddleware);

// DB connection
dbConnection();

export default app;
