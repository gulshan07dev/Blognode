import bucketService from "../appwrite/bucket";
import { Link } from "react-router-dom";
import { MdFavorite, MdShare } from "react-icons/md";
import postService from "../appwrite/posts";
import { htmlToText } from "html-to-text";
import { format } from "date-fns";

export default function PostCard({ post }) {
  return (
    <div className="max-w-md max-md:w-full rounded overflow-hidden shadow-lg">
      <Link to={`/post/${post.$id}`}>
        <img
          className="w-full"
          src={bucketService.getFilePreview(post.featuredImage)}
          alt={post.title}
        />
        <div className="px-6 py-4">
          <h1 className="font-bold text-xl mb-2">{post.title}</h1>
          <p className="text-gray-700 text-base">
            {format(new Date(post.$createdAt), "MMMM")}{" "}
            {format(new Date(post.$createdAt), "d")}{", "}
            {format(new Date(post.$createdAt), "yyy")}
          </p>
          <p className="text-gray-700 text-base mt-4 line-clamp-2 lowercase">
            {htmlToText(post.content)}
          </p>
        </div>
      </Link>
      <div className="p-6 border-t-[1px] border-gray-100 flex gap-3 items-center">
        <button className="icon-button text-xl  drop-shadow-2xl text-red-500 cursor-pointer">
          <MdFavorite />
        </button>
        <button className="icon-button text-xl drop-shadow-2xl text-gray-700 cursor-pointer">
          <MdShare />
        </button>
      </div>
    </div>
  );
}
