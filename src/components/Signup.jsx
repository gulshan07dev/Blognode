import { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "../components";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const Signup = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <section className="flex items-center justify-center md:py-12 pt-20 pb-10 max-md:px-4">
      <div
        className={`w-full max-w-lg bg-[#e4e4ff77] backdrop-blur-sm rounded-xl md:p-10 max-md:py-10 px-4 border shadow-sm flex flex-col gap-3`}
      >
        <h2 className="text-center text-2xl font-lato font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base font-open-sans text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(Signup);
          }}
        >
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
              type="email"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full py-3">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
