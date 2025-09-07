"use client";

import Post, { SkeletonPost } from "../_components/Post";
import { PostForm } from "../_components/PostForm";
import { toast } from "sonner";
import z from "zod";
import { postSchema } from "../_zod/schemas";
import { toBase64 } from "@/lib/utils";
import useService from "@/hooks/useService";
import useSWRMutation from "swr/mutation";
import { HTTP_METHOD } from "next/dist/server/web/http";

export interface IPost {
  _id: string;
  description: string;
  completed: boolean;
  image?: string;
  tags: string[] | [];
  createdAt: Date;
}

async function fetcher(
  url: string,
  {
    arg,
  }: {
    arg: {
      method: HTTP_METHOD;
      description?: string;
      _id?: string;
      tags?: string[];
      image?: File;
    };
  }
) {
  const { method, ...restArgs } = arg;
  return fetch(url, {
    method: method ?? "GET",
    body: JSON.stringify({ ...restArgs }),
  }).then((res) => res.json());
}

export default function PostList() {
  const {
    data,
    trigger: triggerAdd,
    isMutating,
  } = useSWRMutation("/api/posts", fetcher, { revalidate: true });

  const {
    data: deletedData,
    trigger: triggerDelete,
    isMutating: isMutatingDelete,
  } = useSWRMutation("/api/posts", fetcher, { revalidate: true });

  const {
    data: posts,
    isError,
    isValidating,
  } = useService<IPost[]>({
    url: "/api/posts",
    watchers: { data, deletedData },
    options: { dedupingInterval: 60000 * 60 },
  });

  const onDelete = async (postId: string) => {
    try {
      await triggerDelete({ _id: postId, method: "DELETE" });
    } catch (err) {
      console.error(err);
    } finally {
      toast.success("Post has been deleted successfully");
    }
  };

  const onAdd = async (values: z.infer<typeof postSchema>) => {
    const { description, image, tags = [] } = values;
    const payload: z.infer<typeof postSchema> = { description };

    if (image instanceof File) {
      payload.image = await toBase64(image);
    }

    if (tags && tags.length > 0) {
      payload.tags = tags;
    }

    try {
      await triggerAdd({ ...payload, method: "POST" });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      toast.success("Post has been created successfully");
    }
  };

  if (isError) return <p>Error</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      <PostForm onAdd={onAdd} />
      {isValidating || isMutating || isMutatingDelete || !posts ? (
        <SkeletonPost />
      ) : (
        posts.length > 0 &&
        posts
          .toSorted((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((post) => <Post key={post._id} post={post} onDelete={onDelete} />)
      )}
    </div>
  );
}
