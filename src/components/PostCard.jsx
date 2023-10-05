import bucketService from "../appwrite/bucket";
import { Link } from "react-router-dom";
import { MdFavorite, MdShare } from "react-icons/md";
import postService from "../appwrite/posts";
import { htmlToText } from "html-to-text";
import { format } from "date-fns";

export default function PostCard({ post, className }) {
  return (
    <div className={`w-[450px] max-md:w-full rounded overflow-hidden flex flex-col gap-3 justify-between shadow-sm bg-white dark:bg-[#18181b] border-[1px] border-gray-300 dark:border-[#2b2b2e] ${className}`}>
      <Link to={`/post/${post.$id}`}>
        <div className="w-full md:h-[230px] h-auto overflow-hidden">
          <img
            className="w-full md:h-full"
            src={bucketService.getFilePreview(post.featuredImage)}
            alt={post.title}
          />
        </div>
        <div className="px-6 py-4">
          <h1 className="font-bold text-xl dark:text-white mb-2">
            {post.title}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-base">
            {format(new Date(post.$createdAt), "MMMM")}{" "}
            {format(new Date(post.$createdAt), "d")}
            {", "}
            {format(new Date(post.$createdAt), "yyy")}
          </p>
          <p className="text-gray-700 dark:text-slate-200 text-base mt-4 line-clamp-2 lowercase">
            {htmlToText(post.content)}
          </p>
        </div>
      </Link>
      <div className="p-6 border-t-[1px] border-gray-100 dark:border-[#2b2b2e] flex gap-3 items-center">
        <button className="icon-button text-2xl  drop-shadow-2xl text-red-500 dark:text-red-400 cursor-pointer">
          <MdFavorite />
        </button>
        <button className="icon-button text-2xl drop-shadow-2xl text-gray-700 dark:text-white cursor-pointer">
          <MdShare />
        </button>
      </div>
    </div>
  );
}
