import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../appwrite/posts";
import { Button, Container, Loader, Message, Modal } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import bucketService from "../appwrite/bucket";
import toast from "react-hot-toast";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const [showOptionsModal, setShowOptionsModal] = useState(false);

  useEffect(() => {
    if (slug) {
      postService
        .getPost(slug)
        .then((post) => {
          if (post) setPost(post);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    Promise.all([
      postService.deletePost(post.$id),
      bucketService.deleteFile(post.featuredImage),
    ])
      .then(([postStatus, fileStatus]) => {
        if (postStatus && fileStatus) {
          toast.success("Post deleted");
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <section className="min-h-screen md:py-7 py-3 md:px-10 px-3 flex justify-center">
      {error ? (
        <div className="mt-20">
          <Message text={error.message} />
        </div>
      ) : (
        <div className="md:w-2/3 w-full pt-3 flex flex-col items-center md:gap-7 gap-6 relative">
          <img
            src={bucketService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl md:w-2/3 w-full dark:border-[1px] dark:border-[#2b2b2e]"
          />

          {isAuthor && (
            <div className="absolute top-6 right-3 h-12 w-12 flex justify-center items-center rounded-full bg-gray-200 shadow-sm dark:bg-[#262627]">
              <button
                onClick={() => setShowOptionsModal(!showOptionsModal)}
                className="focus:outline-none rotate-90"
              >
                <span className="text-xl text-gray-700 dark:text-white">
                  &#8226;&#8226;&#8226;
                </span>
              </button>
            </div>
          )}
          <div className="w-full mb-6">
            <h1 className="md:text-5xl text-3xl font-bold text-gray-800 dark:text-white text-center font-nunito-sans">
              {post.title}
            </h1>
          </div>
          <div className="browser-css self-start text-left post-content">
            {parse(post.content)}
          </div>

          {/* Modal for edit and delete options */}
          {showOptionsModal && isAuthor && (
            <Modal>
              <div className="p-4">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="mb-2 w-full">
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500"
                  onClick={() => {
                    setShowOptionsModal(false);
                    deletePost();
                  }}
                  className="w-full"
                >
                  Delete
                </Button>
                <button
                  onClick={() => setShowOptionsModal(false)}
                  className="mt-2 w-full text-center text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </Modal>
          )}
        </div>
      )}
    </section>
  );
}
