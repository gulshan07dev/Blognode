import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyPosts } from "../store/postSlice";
import { Loader, PostCard, Message } from "../components";

export default function MyPosts() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const { posts, error, loading } = useSelector((state) => state.post.myPosts);

  useEffect(() => {
    if (!posts.length) {
      dispatch(getMyPosts(userData.$id));
    }
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <section className="w-full md:py-12 pt-10 pb-10 px-7 max-md:px-4 ">
      {posts?.length === 0 ? (
        <div className="w-screen px-3 pt-20 flex justify-center items-center">
          {error?.message === "Network request failed" ? (
            <Message text={`${error?.message} | ${error?.status || ""}`} />
          ) : (
            <Message text="You have not created/posted any post yet." />
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-5 gap-12 max-md:place-items-center">
          {posts?.map((post) => (
            <PostCard post={post} key={post.$id} className="w-auto" />
          ))}
        </div>
      )}
    </section>
  );
}
