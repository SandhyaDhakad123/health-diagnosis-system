
import axios from "axios";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:4000/api"
).replace(/\/+$/, "");

export const predictDisease = async (healthData) => {
  try {
    const response = await axios.post(
      `${API_URL}/predict`,
      { healthData },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      (error.code === "ECONNABORTED"
        ? "Request timeout. AI service ko response dene mein time lag raha hai."
        : error.message) ||
      "Prediction failed";

    throw new Error(message);
  }
};

export const checkServiceHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/predict/health`, {
      timeout: 15000,
    });

    return response.data;
  } catch (error) {
    console.error("Health check failed:", error.message);

    return {
      backend: "error",
      model_service: "unavailable",
    };
  }
};
