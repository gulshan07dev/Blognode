export default function Message({ text }) {
  return (
    <div className="bg-gray-100 dark:bg-[#18181b] dark:border-[1px] dark:border-[#2b2b2e] p-5 rounded-md text-center">
      <p className="text-gray-800 dark:text-white text-2xl font-lato">{text}</p>
    </div>
  );
}
