import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../../components";
import bucketService from "../../appwrite/bucket";
import postService from "../../appwrite/posts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (data.content.length <= 0) {
      toast.error("content is required !");
      return;
    }
    setLoading(true);

    try {
      if (post) {
        const file = data.image[0]
          ? await bucketService.uploadFile(data.image[0])
          : null;

        if (file) {
          bucketService.deleteFile(post.featuredImage);
        }
        const dbPost = await postService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });
        if (dbPost) {
          toast.success("Post updated!");
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = data.image[0]
          ? await bucketService.uploadFile(data.image[0])
          : null;
        if (file) {
          const dbPost = await postService.createPost({
            ...data,
            featuredImage: file?.$id,
            userId: userData.$id,
          });
          if (dbPost) {
            toast.success("Post created!");
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  const slugTransform = useCallback((value) => {
    if (value.length > 35)
      return (
        value
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-")
          .slice(0, 30) + "..."
      );
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
      if (name === "image") {
        setPreviewImg(URL.createObjectURL(value.image[0]));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex md:justify-center gap-7 max-md:flex-col"
    >
      <div className="md:w-[48%] w-full px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.target.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="md:w-[35%] w-full h-fit flex flex-col gap-3 bg-white dark:bg-[#18181b] dark:border-[1px] dark:border-[#2b2b2e] shadow-md rounded-md sticky top-[100px] md:py-4 md:pb-7 py-5 md:px-5 px-3">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {!post && previewImg && (
          <div className="h-[170px] w-auto rounded-lg overflow-hidden flex justify-center">
            <img
              src={previewImg}
              alt="preview-image"
              className="h-full w-auto"
            />
          </div>
        )}

        {post && (post || previewImg) && (
          <div className="h-[170px] w-auto rounded-lg overflow-hidden flex justify-center">
            <img
              src={
                previewImg
                  ? previewImg
                  : bucketService.getFilePreview(post.featuredImage)
              }
              alt={post.title}
              className="h-full w-auto"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          disabled={loading}
          className="w-full py-3"
        >
          {post
            ? loading
              ? "Updating..."
              : "Update"
            : loading
            ? "Uploading..."
            : "Submit"}
        </Button>
      </div>
    </form>
  );
}
