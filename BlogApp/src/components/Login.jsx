import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice.js";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.js";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  let [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.logIn(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-2 sm:px-0">
      <div className="mx-auto w-full max-w-md sm:max-w-lg bg-gradient-to-br from-white via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl p-6 sm:p-10 border border-blue-200/60 dark:border-gray-700 shadow-2xl backdrop-blur-md">
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[100px] drop-shadow-lg">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-extrabold leading-tight bg-gradient-to-r from-blue-700 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3 tracking-tight drop-shadow">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-pink-600 dark:text-pink-300 hover:underline hover:text-purple-600 transition-colors"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-6">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              autoComplete="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full mt-2 text-lg py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white shadow-lg hover:from-pink-500 hover:to-blue-600">
              <span className="drop-shadow">Sign in</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
