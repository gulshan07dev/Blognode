import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader, PostForm } from "../components";
import postService from "../appwrite/posts";
import bucketService from "../appwrite/bucket";

export default function EditPost() {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      postService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <section className="flex items-center justify-center md:py-12 pt-20 pb-10 max-md:px-4">
      <PostForm post={post} />
    </section>
  ) : (
    <Loader />
  );
}
