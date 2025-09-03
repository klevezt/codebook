"use client";

import { useEffect, useState } from "react";
import Post, { SkeletonPost } from "../components/Post";
import { PostForm } from "../components/PostForm";
import { toast } from "sonner";
import z from "zod";
import { postSchema } from "../zod/schemas";
import { toBase64 } from "@/lib/utils";

export interface IPost {
  _id: string;
  description: string;
  completed: boolean;
  image?: string;
  tags: string[] | [];
}
export default function PostList() {
  const [posts, setTodos] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [signal, setSignal] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [signal]);

  const onDelete = async (postId: string) => {
    setLoading(true);
    try {
      await fetch("/api/posts", {
        method: "DELETE",
        body: JSON.stringify({ _id: postId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSignal((x) => !x);
      toast.success("Post has been deleted successfully");
    }
  };

  const onAdd = async (values: z.infer<typeof postSchema>) => {
    const { description, image, tags } = values;
    setLoading(true);
    const payload: z.infer<typeof postSchema> = { description };

    if (image instanceof File) {
      payload.image = await toBase64(image);
    }

    if (tags && tags.length > 0) {
      payload.tags = tags;
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
      } else {
        console.error("Failed to add post");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setSignal((x) => !x);
      toast.success("Post has been created successfully");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      <PostForm onAdd={onAdd} />
      {loading ? (
        <SkeletonPost />
      ) : (
        posts.length > 0 &&
        posts.map((post) => <Post key={post._id} post={post} onDelete={onDelete} />)
      )}
    </div>
  );
}
