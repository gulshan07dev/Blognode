import { Link } from "react-router-dom"

export default function Logo({ width = "100px", className = "md:text-3xl text-2xl" }) {
  return (
    <Link
      to="/"
      className={`py-2 px-5 rounded-full border-gray-300 shadow-md w-[${width}] ${className}`}
    >
      <h1 className="font-lato text-gray-700">
        Blog <span className="text-blue-500 font-[600] font-inter">App</span>
      </h1>
    </Link>
  );
}
