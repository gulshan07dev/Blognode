import postService from "../appwrite/posts";
import bucketService from "../appwrite/bucket";
import { Link } from "react-router-dom";

export default function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl py-4">
        <div className="w-full justify-center mb-4">
          <img
            src={bucketService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-500">{title}</h2>
      </div>
    </Link>
  );
}
