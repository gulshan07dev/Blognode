import { useEffect, useState } from "react";
import postService from "../appwrite/posts";
import { Loader, PostCard, Container, Message } from "../components";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    postService
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <section className="flex items-center justify-center md:py-12 pt-10 pb-10 max-md:px-4">
      {error && (
        <div className="w-full py-8 mt-4 text-center">
          <Container>
            <Message text={error.message} />
            {error.type === "user_unauthorized" && (
              <Link to="/login" className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  Please Login to view post !
                </h1>
              </Link>
            )}
          </Container>
        </div>
      )}
      {posts.length === 0 && !error ? (
        <Message text="No Post Available on Server." />
      ) : (
        <div className="grid grid-cols-1 place-items-center gap-7 max-md:gap-14 pb-10">
          {posts.map((post) => (
            <PostCard key={post.$id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
