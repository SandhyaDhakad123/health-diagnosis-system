
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:4000/api"
).replace(/\/+$/, "");

async function sendAuthRequest(endpoint, userData, requestName) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.message || `${requestName} failed. Please try again.`
      );
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Backend se connection nahi ho pa raha. API URL aur backend status check karo."
      );
    }

    throw error;
  }
}

export const signup = async (userData) => {
  return sendAuthRequest("/auth/signup", userData, "Signup");
};

export const login = async (userData) => {
  return sendAuthRequest("/auth/login", userData, "Login");
};
