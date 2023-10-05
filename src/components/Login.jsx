import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input } from "../components";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setLoading(true);
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [setError, error]);
  return (
    <div
      className={`w-full max-w-lg bg-[#e4e4ff77] dark:bg-[#18181b] dark:border-[#2b2b2e] backdrop-blur-sm rounded-xl md:p-10 max-md:py-10 px-4 border-[1px] shadow-sm flex flex-col gap-7`}
    >
      <div>
        <h2 className="text-center text-2xl text-gray-900 dark:text-white font-nunito-sans font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="text-center text-base mt-2 font-open-sans text-black/60 dark:text-slate-300">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit(login)} className="mt-0">
        <div className="space-y-7">
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
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
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "processing..." : "Sign in"}
          </Button>
        </div>
      </form>
    </div>
  );
}
