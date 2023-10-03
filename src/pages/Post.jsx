import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../appwrite/posts";
import { Button, Container,  Modal } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import bucketService from "../appwrite/bucket";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const [showOptionsModal, setShowOptionsModal] = useState(false);

  useEffect(() => {
    if (slug) {
      postService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    postService.deletePost(post.$id).then((status) => {
      if (status) {
        postService.deleteFile(post.featuredImage);
      }
      navigate("/");
    });
  };

  return post ? (
    <section className="min-h-screen md:py-7 py-3 md:px-10 px-3 flex justify-center">
      <div className="md:w-2/3 w-full flex flex-col items-center md:gap-7 gap-6 relative">
        <img
          src={bucketService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="rounded-xl w-2/3"
        />

        {isAuthor && (
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowOptionsModal(!showOptionsModal)}
              className="focus:outline-none rotate-90"
            >
              <span className="text-xl text-gray-700">
                &#8226;&#8226;&#8226;
              </span>
            </button>
          </div>
        )}
        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center font-lato">{post.title}</h1>
        </div>
        <div className="px-3 text-lg">
          {parse(post.content)}
        </div>

        {/* Modal for edit and delete options */}
        {showOptionsModal && isAuthor && (
          <Modal>
            <div className="p-7">
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
    </section>
  ) : null;
}
