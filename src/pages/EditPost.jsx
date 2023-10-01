import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader, PostForm } from "../components";
import postService from "../appwrite/posts";

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
    <section className="w-full min-h-screen md:py-12 px-10 pt-7 pb-10 max-md:px-4 bg-slate-50">
      <PostForm post={post} />
    </section>
  ) : (
    <Loader />
  );
}
