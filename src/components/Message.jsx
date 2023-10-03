export default function Message({ text }) {
  return (
    <div className="pt-20 px-3 flex justify-center items-center w-screen h-full">
      <div className="bg-gray-100 p-5 rounded-md text-center">
        <p className="text-gray-800 text-2xl font-lato">{text}</p>
      </div>
    </div>
  );
}
