export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "text-lg",
  ...props
}) {
  return (
    <button
      className={`px-10 py-2 font-inter font-[500] hover:opacity-70 disabled:opacity-70 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
