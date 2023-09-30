import { useState, useEffect } from "react";
import postService from "../appwrite/posts";
import { Loader, PostCard } from "../components";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  return posts ? (
    <section className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 max-md:gap-14 md:py-12 pt-20 pb-10 max-md:px-4">
      {posts.map((post) => (
        <PostCard post={post} key={post.$id} />
      ))}
    </section>
  ) : (
    <Loader />
  );
}
