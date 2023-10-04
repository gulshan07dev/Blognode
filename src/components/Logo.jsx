import { Link } from "react-router-dom"

export default function Logo({ width = "100px", className = "md:text-3xl text-2xl dark:text-4xl" }) {
  return (
    <Link
      to="/"
      className={`py-2 px-5 rounded-full bg-none dark:bg-[#1a1a25] border-gray-300 w-[${width}] ${className}`}
    >
      <h1 className="font-lato text-gray-700 dark:text-white">
        Blog <span className="text-blue-500 dark:text-[#f189ff] font-[600] font-inter">App</span>
      </h1>
    </Link>
  );
}
