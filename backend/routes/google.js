
import express from "express";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { idToken } = req.body || {};
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const jwtSecret = process.env.JWT_SECRET;

    if (!googleClientId) {
      console.error("GOOGLE_CLIENT_ID is missing.");
      return res.status(500).json({
        message: "Google login is not configured on the server.",
      });
    }

    if (!jwtSecret) {
      console.error("JWT_SECRET is missing.");
      return res.status(500).json({
        message: "Authentication is not configured on the server.",
      });
    }

    if (typeof idToken !== "string" || !idToken) {
      return res.status(400).json({
        message: "Google ID token is required.",
      });
    }

    const client = new OAuth2Client(googleClientId);

    const ticket = await client.verifyIdToken({
      idToken,
      audience: googleClientId,
    });

    const payload = ticket.getPayload();

    if (!payload?.email || !payload.sub || payload.email_verified !== true) {
      return res.status(401).json({
        message: "Google account verification failed.",
      });
    }

    const email = payload.email.toLowerCase();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: payload.name || email.split("@")[0],
        email,
        provider: "google",
        providerId: payload.sub,
        avatar: payload.picture || "",
      });
    } else if (
      user.provider === "google" &&
      user.providerId &&
      user.providerId !== payload.sub
    ) {
      return res.status(401).json({
        message: "Google account verification failed.",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      jwtSecret,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Google login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        provider: user.provider,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error("Google login error:", error.message);

    return res.status(401).json({
      message: "Google authentication failed. Please try again.",
    });
  }
});

export default router;
