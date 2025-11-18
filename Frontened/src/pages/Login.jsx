import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure, clearError } from "../redux/authSlice";
import API from "../api/api";
import loginImg from "../login.png"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await API.post("/auth/login", { email, password });
      dispatch(loginSuccess(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || "Login failed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex w-full max-w-6xl items-center justify-between">

       <div className="w-1/2 flex justify-center">
          <img
            src={loginImg}
            alt="Login Illustration"
            className="w-[430px] h-[430px] object-contain"
          />
        </div>

        {/* RIGHT SIDE LOGIN FORM */}
        <div className="w-1/2 max-w-md">

          {/* TITLE */}
          <h1 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
            Login
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white px-8 py-10 rounded-xl shadow-md"
          >
            {/* Email */}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4 text-gray-700 focus:ring focus:ring-blue-200"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4 text-gray-700 focus:ring focus:ring-blue-200"
            />

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                <span className="text-gray-600">Remember me</span>
              </label>

              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>

            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
