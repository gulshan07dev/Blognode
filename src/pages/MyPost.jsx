import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import postService from "../appwrite/posts";
import { Loader, PostCard, Message, Container } from "../components";
import { Query } from "appwrite";

export default function MyPosts() {
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService
      .getPosts([Query.equal("userId", userData.$id)])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <section className="w-full md:py-12 pt-10 pb-10 px-7 max-md:px-4 ">
      {posts.length === 0 ? (
        <div className="w-screen px-3 pt-20 flex justify-center items-center">
          {error.message === "Network request failed" ? (
            <Message text={`${error.message} | ${error?.status || ""}`} />
          ) : (
            <Message text="You have not created/posted any post yet." />
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-12 max-md:place-items-center">
          {posts.map((post) => (
            <PostCard post={post} key={post.$id} className="w-[400px]" />
          ))}
        </div>
      )}
    </section>
  );
}
