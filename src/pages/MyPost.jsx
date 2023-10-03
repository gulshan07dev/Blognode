import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import postService from "../appwrite/posts";
import { Loader, PostCard, Message } from "../components";
import { Query } from "appwrite";

export default function MyPosts() {
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService
      .getPosts([Query.equal("userId", userData.$id)])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <section className="grid md:grid-cols-3 grid-cols-1 gap-7 max-md:gap-14 md:py-12 pt-10 pb-10 px-7 max-md:px-4 max-md:place-items-center">
      {posts.length === 0 ? (
        <Message text="You have not created/posted any post yet." />
      ) : (
        posts.map((post) => <PostCard post={post} key={post.$id} />)
      )}
    </section>
  );
}
