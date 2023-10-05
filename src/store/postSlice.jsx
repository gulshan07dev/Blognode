import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "../appwrite/posts";
import bucketService from "../appwrite/bucket";
import { Query } from "appwrite";
import toast from "react-hot-toast";

const initialState = {
  allPosts: {
    posts: [],
    error: null,
    loading: true,
  },
  myPosts: {
    posts: [],
    error: null,
    loading: true,
  },
};

// delete post
export const deletePost = createAsyncThunk(
  "/posts/post/delete",
  async (post) => {
    const loadingMessage = toast.loading("deleting...");
    try {
      const [postStatus, fileStatus] = await Promise.all([
        postService.deletePost(post.$id),
        bucketService.deleteFile(post.featuredImage),
      ]);

      if (postStatus && fileStatus) {
        toast.success("Post deleted", { id: loadingMessage });
      }
    } catch (error) {
      toast.error(error.message, { id: loadingMessage });
    }
  }
);

// add post
export const addPost = createAsyncThunk(
  "/posts/post/add",
  async ({ data, userId }) => {
    try {
      const file = data.image[0]
        ? await bucketService.uploadFile(data.image[0])
        : null;

      if (file) {
        const dbPost = await postService.createPost({
          ...data,
          featuredImage: file?.$id,
          userId,
        });
        if (dbPost) {
          toast.success("Post created!");
          return dbPost;
        }
      }
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }
);

// edit post
export const editPost = createAsyncThunk(
  "/posts/post/edit",
  async ({ data, post }) => {
    try {
      const file = data.image[0]
        ? await bucketService.uploadFile(data.image[0])
        : null;

      if (file) {
        await bucketService.deleteFile(post.featuredImage);
      }

      const dbPost = await postService.updatePost(post.$id, {
        ...data,
        featuredImage: file?.$id,
      });

      toast.success("Post updated!");
      return dbPost;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }
);

// get all posts
export const getAllPosts = createAsyncThunk("/posts/get", async () => {
  try {
    const res = await postService.getPosts([Query.equal("status", "active")]);
    return res;
  } catch (error) {
    throw error;
  }
});

// get my posts
export const getMyPosts = createAsyncThunk("/my-posts/get", async (userId) => {
  try { 
    const res = await postService.getPosts([Query.equal("userId", userId)]);
    return res;
  } catch (error) {
    throw error;
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetPost: (state, action) => {
      state.allPosts.posts = [];
      state.myPosts.posts = [];
    },
  },
  extraReducers: (builder) => {
    // for get All posts
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.allPosts.posts = action.payload.documents;
      state.allPosts.loading = false;
      state.allPosts.error = null;
    });

    builder.addCase(getAllPosts.rejected, (state, action) => {
      console.log(action);
      state.allPosts.error = action.error;
      state.allPosts.loading = false;
    });

    // for get my posts
    builder.addCase(getMyPosts.fulfilled, (state, action) => {
      state.myPosts.posts = action.payload.documents;
      state.myPosts.loading = false;
      state.myPosts.error = null;
    });

    builder.addCase(getMyPosts.rejected, (state, action) => {
      state.myPosts.error = action.error;
      state.myPosts.loading = false;
    });
  },
});

export default postSlice.reducer;
export const { resetPost } = postSlice.actions;
