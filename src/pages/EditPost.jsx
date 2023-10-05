import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loader, Message, PostForm } from "../components";
import { getPost } from "../store/postSlice";

export default function EditPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, loading, error } = useSelector(
    (state) => state.post.uniquePost
  );
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      dispatch(getPost(slug));
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
          <Message text={error.message} />
        </div>
      ) : (
        <PostForm post={post} />
      )}
    </section>
  );
}
