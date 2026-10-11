
import express from "express";
import axios from "axios";

const router = express.Router();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL?.trim();

function getAIServiceUrls() {
  if (!AI_SERVICE_URL) {
    throw new Error("AI_SERVICE_URL is missing in backend environment variables.");
  }

  const predictUrl = AI_SERVICE_URL.replace(/\/+$/, "");
  const healthUrl = predictUrl.replace(/\/predict$/, "") + "/health";

  return { predictUrl, healthUrl };
}

const symptomMapping = {
  "Body ache": "body_aches",
  Cough: "cough",
  Fatigue: "fatigue",
  Fever: "fever",
  Headache: "headache",
  "Shortness of breath": "shortness_of_breath",
  "Sore throat": "sore_throat",
};

router.post("/", async (req, res) => {
  try {
    const { healthData } = req.body ?? {};

    if (!healthData || typeof healthData !== "object" || Array.isArray(healthData)) {
      return res.status(400).json({
        success: false,
        message: "Please provide healthData as an object.",
      });
    }

    const symptoms = Object.entries(symptomMapping)
      .filter(([field]) => Number(healthData[field]) === 1)
      .map(([, symptom]) => symptom);

    if (symptoms.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Please select at least one symptom supported by the AI model.",
      });
    }

    const { predictUrl } = getAIServiceUrls();

    const response = await axios.post(
      predictUrl,
      { symptoms },
      {
        timeout: 60000,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({
      success: true,
      data: response.data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("AI prediction error:", error.message);

    if (error.message.includes("AI_SERVICE_URL is missing")) {
      return res.status(500).json({
        success: false,
        message: "AI_SERVICE_URL is not configured on the backend.",
      });
    }

    if (error.response) {
      return res.status(502).json({
        success: false,
        message: "The AI model service returned an error.",
        details: error.response.data,
      });
    }

    return res.status(503).json({
      success: false,
      message:
        "AI model service is unavailable or did not respond in time. Please try again.",
    });
  }
});

router.get("/health", async (req, res) => {
  try {
    const { healthUrl } = getAIServiceUrls();

    const response = await axios.get(healthUrl, {
      timeout: 30000,
    });

    return res.status(200).json({
      backend: "healthy",
      model_service: response.data,
    });
  } catch (error) {
    console.error("AI health check error:", error.message);

    return res.status(503).json({
      backend: "healthy",
      model_service: "unavailable",
    });
  }
});

export default router;
