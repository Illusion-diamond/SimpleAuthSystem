import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/api";
import toast from "react-hot-toast";

import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

const AuthPage = ({ initialMode = "login" }) => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);

  const [mode, setMode] = useState(initialMode);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleMode = () => {
    const nextMode =
      mode === "login" ? "register" : "login";

    setMode(nextMode);

    navigate(
      nextMode === "login"
        ? "/login"
        : "/register"
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    if (
      mode === "register" &&
      !formData.name
    ) {
      return toast.error("Name is required");
    }

    try {
      setLoading(true);

      const endpoint =
        mode === "login"
          ? "/auth/login"
          : "/auth/register";

      const payload =
        mode === "login"
          ? {
              email: formData.email,
              password: formData.password,
            }
          : formData;

      const { data } = await API.post(
        endpoint,
        payload
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      setUser(data);

      toast.success(
        mode === "login"
          ? "Login Successful"
          : "Account Created"
      );

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Authentication Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 flex items-center justify-center px-4 py-10 overflow-hidden relative">
      
      {/* Background Glow */}
      <div className="absolute h-72 w-72 bg-indigo-600/20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute h-72 w-72 bg-blue-600/20 rounded-full blur-3xl bottom-10 right-10"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl px-8 py-10 shadow-2xl"
      >
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">
            {mode === "login"
              ? "Welcome Back"
              : "Create Account"}
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            {mode === "login"
              ? "Login to continue your account"
              : "Create your secure account"}
          </p>
        </div>

        {/* Name */}
        {mode === "register" && (
          <div className="mt-8">
            <label className="text-sm text-gray-300 mb-2 block">
              Full Name
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-gray-700 bg-black/40 px-4 h-14">
              <User size={18} className="text-gray-400" />

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
              />
            </div>
          </div>
        )}

        {/* Email */}
        <div className="mt-5">
          <label className="text-sm text-gray-300 mb-2 block">
            Email Address
          </label>

          <div className="flex items-center gap-3 rounded-2xl border border-gray-700 bg-black/40 px-4 h-14">
            <Mail size={18} className="text-gray-400" />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mt-5">
          <label className="text-sm text-gray-300 mb-2 block">
            Password
          </label>

          <div className="flex items-center gap-3 rounded-2xl border border-gray-700 bg-black/40 px-4 h-14">
            <Lock size={18} className="text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="text-gray-400 hover:text-white transition"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        {mode === "login" && (
          <div className="mt-4 text-right">
            <button
              type="button"
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Please wait...
            </>
          ) : (
            <>
              {mode === "login"
                ? "Login"
                : "Create Account"}
            </>
          )}
        </button>

        {/* Toggle */}
        <p className="mt-7 text-center text-sm text-gray-400">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={toggleMode}
            className="ml-2 text-indigo-400 hover:text-indigo-300 font-medium"
          >
            {mode === "login"
              ? "Register"
              : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;