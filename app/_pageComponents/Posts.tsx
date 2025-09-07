"use client";

import Post, { SkeletonPost } from "../_components/Post";
import { PostForm } from "../_components/PostForm";
import { toast } from "sonner";
import z from "zod";
import { postSchema } from "../_zod/schemas";
import { toBase64 } from "@/lib/utils";
import useSWRMutation from "swr/mutation";
import { HTTP_METHOD } from "next/dist/server/web/http";
import useSWRInfinite from "swr/infinite";
import { Button } from "@/components/ui/button";
import { Loader2, MoreHorizontal } from "lucide-react";

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
const infiniteFetcher = (url: string) => fetch(url).then((res) => res.json());

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

  const getKey = (pageIndex: number, previousPageData: IPost[]) => {
    if (previousPageData && !previousPageData.length) return null; // no more data
    return [`/api/posts?limit=2&skip=${pageIndex * 2}`, Object.values({ data, deletedData })];
  };

  const {
    data: resData,
    size,
    setSize,
    isValidating,
  } = useSWRInfinite<IPost[]>(getKey, infiniteFetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000 * 60,
  });
  const posts = resData ? ([] as IPost[]).concat(...resData) : [];

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

  const isReachingEnd =
    (posts && posts.length < 2) || (resData && resData[resData?.length - 1].length === 0);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <PostForm onAdd={onAdd} />
        {isValidating || isMutating || isMutatingDelete || !posts ? (
          <SkeletonPost />
        ) : (
          posts.length > 0 &&
          posts.map((post) => <Post key={post._id} post={post} onDelete={onDelete} />)
        )}
      </div>
      {!isReachingEnd && (
        <div className="flex justify-center my-10">
          <Button onClick={() => setSize(size + 1)} disabled={isValidating}>
            Load More
            {!isValidating ? <MoreHorizontal /> : <Loader2 className="animate-spin" />}
          </Button>
        </div>
      )}
    </>
  );
}
