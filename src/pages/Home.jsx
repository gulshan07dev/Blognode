import { useEffect, useState } from "react";
import postService from "../appwrite/posts";
import { Loader, PostCard, Container } from "../components";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return posts ? (
    <section className="flex items-center justify-center md:py-12 pt-20 pb-10 max-md:px-4">
      {posts.length === 0 ? (
        <div className="w-full py-8 mt-4 text-center">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  Login to read posts
                </h1>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <PostCard key={post.$id} post={post} />
            ))}
          </div>
        </Container>
      )}
    </section>
  ) : (
    <Loader />
  );
}
