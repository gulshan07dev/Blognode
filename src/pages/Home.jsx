import { useEffect, useState } from "react";
import { Loader, PostCard, Container, Message } from "../components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../store/postSlice";

export default function Home() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const { posts, error, loading } = useSelector((state) => state.post.allPosts);

  useEffect(() => {
    if (!posts.length) {
      dispatch(getAllPosts());
    }
  }, [dispatch, posts]);

  return loading ? (
    <Loader />
  ) : (
    <section className="flex justify-center md:py-12 pt-10 pb-10 max-md:px-4">
      {error && (
        <div className="w-full px-3 pt-20 flex flex-col gap-5 justify-center items-center">
          <Message text={`${error.message}`} />
          {!authStatus && (
            <Link to="/login" className="p-2">
              <h1 className="text-2xl font-bold text-gray-800 hover:text-gray-500 dark:text-slate-50">
                Please Login to view post !
              </h1>
            </Link>
          )}
        </div>
      )}
      {posts?.length === 0 && !error ? (
        <Message text="No Post Available on Server." />
      ) : (
        <div className="grid grid-cols-1 place-items-center gap-7 max-md:gap-14 pb-10">
          {posts?.map((post) => (
            <PostCard key={post.$id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
