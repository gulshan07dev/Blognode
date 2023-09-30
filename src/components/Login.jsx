import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Logo, Button, Input } from "../components";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    console.log(data);
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin());
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return ( 
      <div
        className={`w-full max-w-lg bg-[#e4e4ff77] backdrop-blur-sm rounded-xl md:p-10 max-md:py-10 px-4 border shadow-sm flex flex-col gap-3`}
      >
        <h2 className="text-center text-2xl font-lato font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="text-center text-base font-open-sans text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
        <form 
        onSubmit={handleSubmit(login)}
          className="mt-0"
        >
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
            <Button type="submit">Sign in</Button>
          </div>
        </form>
      </div>
  );
}
