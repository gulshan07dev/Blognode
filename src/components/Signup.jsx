import { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input } from "../components";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const Signup = async (data) => {
    setLoading(true);
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          toast.success("Signup Successful!");
          dispatch(login({ userData }));
          navigate("/");
        }
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
  }, [error, setError]);
  return (
    <div
      className={`w-full max-w-lg bg-[#e4e4ff77] dark:bg-[#18181b] dark:border-[#2b2b2e] backdrop-blur-sm rounded-xl md:p-10 max-md:py-10 px-4 border-[1px] shadow-sm flex flex-col gap-7`}
    >
      <div>
        <h2 className="text-center text-2xl text-gray-900 dark:text-white font-nunito-sans font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="text-center text-base mt-2 font-open-sans text-black/60 dark:text-slate-300">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit(Signup)}>
        <div className="space-y-7">
          <Input
            label="Full Name: "
            placeholder="Enter your full name"
            {...register("name", {
              required: true,
              minLength: 3,
            })}
          />
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
          <Button type="submit" disabled={loading} className="w-full py-3">
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </div>
      </form>
    </div>
  );
}
