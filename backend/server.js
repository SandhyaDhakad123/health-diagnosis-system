import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import googleAuthRoutes from "./routes/google.js";
import predictRoutes from "./routes/predict.js";
import doctorsRoutes from "./routes/doctors.js";
import historyRoutes from "./routes/history.js";

dotenv.config();

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "https://health-diagnosis-system-five.vercel.app",
  "https://healthcheck-ai-ten.vercel.app",
];

const corsOptions = {
  origin(origin, callback) {
    const isAllowedPreview =
      typeof origin === "string" &&
      /^https:\/\/health-diagnosis-system-[a-z0-9-]+-sandhyas-projects-[a-z0-9-]+\.vercel\.app$/.test(origin);

    if (!origin || allowedOrigins.includes(origin) || isAllowedPreview) {
      return callback(null, true);
    }

    console.error("CORS blocked origin:", origin);
    return callback(new Error("Origin not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};


// CORS middleware must run before API routes.
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HealthCheck AI Backend is running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/auth/google", googleAuthRoutes);
app.use("/api/predict", predictRoutes);
app.use("/api/doctors", doctorsRoutes);
app.use("/api/history", historyRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err.message);

  if (err.message === "Origin not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "This frontend origin is not allowed by the backend.",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();