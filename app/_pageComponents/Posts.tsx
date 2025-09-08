"use client";

import Post, { SkeletonPost } from "../_components/Post";
import { PostForm } from "../_components/PostForm";
import { toast } from "sonner";
import z from "zod";
import { postSchema } from "../_zod/schemas";
import { fetcher, getKey, toBase64 } from "@/lib/utils";
import useSWRMutation from "swr/mutation";
import useSWRInfinite from "swr/infinite";
import { Button } from "@/components/ui/button";
import { Loader2, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export interface IPost {
  _id: string;
  description: string;
  completed: boolean;
  image?: string;
  tags: string[] | [];
  createdAt: Date;
}

const infiniteFetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PostList() {
  const [loadingPost, setLoadingPost] = useState(false);

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
    data: resData,
    size,
    setSize,
    isValidating,
    isLoading,
    mutate,
  } = useSWRInfinite<IPost[]>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, { data, deletedData }),
    infiniteFetcher,
    {
      dedupingInterval: 60000 * 60,
      revalidateOnFocus: false,
    }
  );

  const posts = resData ? ([] as IPost[]).concat(...resData) : [];

  const onDelete = async (postId: string) => {
    try {
      await triggerDelete({ method: "DELETE", ...{ _id: postId } });
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
      await triggerAdd({ method: "POST", ...payload });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      toast.success("Post has been created successfully");
    }
  };

  const loadMore = async () => {
    setLoadingPost(true);

    const nextPage = await infiniteFetcher(`/api/posts?limit=2&skip=${size * 2}`);
    mutate([...(posts ?? []), nextPage], false);
    setSize((prev) => prev + 1);
    setLoadingPost(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <PostForm onAdd={onAdd} />
        {isMutating || isMutatingDelete || !posts ? (
          <SkeletonPost />
        ) : (
          posts.length > 0 &&
          posts.map((post) => <Post key={post._id} post={post} onDelete={onDelete} />)
        )}
        {loadingPost && <SkeletonPost />}
      </div>

      {!loadingPost && (
        <div className="flex justify-center my-10">
          <Button onClick={loadMore}>
            Load More
            {!loadingPost ? <MoreHorizontal /> : <Loader2 className="animate-spin" />}
          </Button>
        </div>
      )}
    </>
  );
}
