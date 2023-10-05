import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader, Message, PostForm } from "../components";
import postService from "../appwrite/posts";

export default function EditPost() {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      (async () => {
        try {
          const res = await postService.getPost(slug);
          setPost(res);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return loading ? (
    <Loader />
  ) : (
    <section className="w-full min-h-screen md:py-12 px-10 pt-7 pb-10 max-md:px-4 bg-slate-50 dark:bg-[#131315]">
      {error ? (
        <div className="w-full px-3 pt-20 flex justify-center">
          <Message text={error?.message} />
        </div>
      ) : (
        <PostForm post={post} />
      )}
    </section>
  );
}
