
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { login, signup } from "../api/auth.js";
import { GoogleLogin } from "@react-oauth/google";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:4000/api"
).replace(/\/+$/, "");

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const mode = searchParams.get("mode");
    setIsLogin(mode !== "signup");

    if (location.state?.message) {
      setInfoMessage(location.state.message);
    }
  }, [searchParams, location.state]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const saveSessionAndRedirect = (data) => {
    if (!data?.token || !data?.user) {
      setError(data?.message || "Authentication failed. Please try again.");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.dispatchEvent(new Event("authChange"));

    navigate(location.state?.from || "/");
  };

  const handleGoogleLogin = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      setError("Google authentication did not provide a credential.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: credentialResponse.credential,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Google authentication failed.");
      }

      saveSessionAndRedirect(data);
    } catch (err) {
      console.error("Google login error:", err);
      setError(
        err instanceof TypeError
          ? "Backend se connection nahi ho pa raha. Please try again."
          : err.message || "Google login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const response = isLogin
        ? await login({
            email: formData.email,
            password: formData.password,
          })
        : await signup({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });

      saveSessionAndRedirect(response);
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message || "Unable to authenticate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#E8F7F9] to-white px-4 py-10">
      <h1 className="text-3xl font-bold text-[#167C85] flex items-center gap-2 mb-8">
        🫀 HealthCheck AI
      </h1>

      <div className="bg-white flex w-full max-w-lg rounded-xl overflow-hidden shadow-sm border">
        <button
          type="button"
          onClick={() => {
            setIsLogin(true);
            setError("");
          }}
          className={`w-1/2 py-3 font-semibold ${
            isLogin
              ? "bg-[#E8F7F9] text-[#167C85]"
              : "text-gray-600"
          }`}
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => {
            setIsLogin(false);
            setError("");
          }}
          className={`w-1/2 py-3 font-semibold ${
            !isLogin
              ? "bg-[#E8F7F9] text-[#167C85]"
              : "text-gray-600"
          }`}
        >
          Sign Up
        </button>
      </div>

      <div className="bg-white w-full max-w-lg mt-5 p-8 rounded-2xl shadow-lg border">
        {infoMessage && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-4">
            ℹ️ {infoMessage}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4"
          >
            {error}
          </div>
        )}

        {isLogin ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-gray-600 mb-6">Login to continue</p>

            <label htmlFor="login-email" className="font-semibold">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              autoComplete="email"
              required
              className="w-full mt-2 mb-4 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#40A7A9]"
            />

            <label htmlFor="login-password" className="font-semibold">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#40A7A9]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-[#40A7A9] text-white py-3 rounded-xl font-semibold hover:bg-[#2b8485] transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="flex items-center mt-6 mb-4">
              <div className="flex-grow border-b" />
              <span className="mx-3 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-b" />
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => setError("Google Login Failed")}
              />
            </div>

            <p className="text-center text-gray-600 text-xs mt-6">
              By continuing, you agree to our Terms and Privacy Policy
            </p>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-gray-600 mb-6">
              Start your health journey
            </p>

            <label htmlFor="signup-name" className="font-semibold">
              Full Name
            </label>
            <input
              id="signup-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              autoComplete="name"
              required
              className="w-full mt-2 mb-4 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#40A7A9]"
            />

            <label htmlFor="signup-email" className="font-semibold">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              autoComplete="email"
              required
              className="w-full mt-2 mb-4 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#40A7A9]"
            />

            <label htmlFor="signup-password" className="font-semibold">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password"
              autoComplete="new-password"
              required
              className="w-full mt-2 mb-4 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#40A7A9]"
            />

            <label htmlFor="confirm-password" className="font-semibold">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              autoComplete="new-password"
              required
              className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#40A7A9]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-[#40A7A9] text-white py-3 rounded-xl font-semibold hover:bg-[#2b8485] transition disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="flex items-center mt-6 mb-4">
              <div className="flex-grow border-b" />
              <span className="mx-3 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-b" />
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => setError("Google Signup Failed")}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
