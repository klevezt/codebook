/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AspectRatio } from "@/_components/ui/aspect-ratio";
import { Button } from "@/_components/ui/button";
import useService from "@/_hooks/useService";
import { CircleArrowLeft, Save, X } from "lucide-react";
import Image from "next/image";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "@/_components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import { IPost } from "@/_components/_pageComponents/Posts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { useForm } from "react-hook-form";
import { postSchema } from "@/_zod/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/_components/ui/input";
import { Textarea } from "@/_components/ui/textarea";
import { Badge } from "@/_components/ui/badge";
import { toast } from "sonner";
import { fetcher, toBase64 } from "@/lib/utils";
import useSWRMutation, { TriggerWithArgs } from "swr/mutation";
import { HTTP_METHOD } from "next/dist/server/web/http";
import { Skeleton } from "@/_components/ui/skeleton";

const SinglePost = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const router = useRouter();

  const {
    data: updatedData,
    trigger: triggerUpdate,
    isMutating: isMutatingUpdate,
  } = useSWRMutation("/api/posts", fetcher, { revalidate: true });

  const { data, isValidating } = useService<IPost[]>({
    url: `/api/single-post/${id}`,
    watchers: { updatedData },
  });

  return (
    <>
      <Button onClick={() => router.back()} variant="link" className="mb-4">
        <CircleArrowLeft />
        Back
      </Button>
      <div className="relative bg-muted-foreground/10 p-5 md:p-8 rounded-2xl flex justify-center flex-col md:flex-row gap-2 md:gap-5 ">
        {!isMutatingUpdate && !isValidating && data && (
          <SinglePostForm data={data[0]} id={id} triggerUpdate={triggerUpdate} />
        )}
        {(isMutatingUpdate || isValidating) && <SinglePostSkeleton />}
      </div>
    </>
  );
};

const SinglePostForm = ({
  data,
  id,
  triggerUpdate,
}: {
  data: IPost;
  id: string;
  triggerUpdate: TriggerWithArgs<
    any,
    any,
    "/api/posts",
    {
      method: HTTP_METHOD;
    }
  >;
}) => {
  const { description, image, tags } = data;

  const [tagValue, setTagValue] = useState("");
  const [preview, setPreview] = useState(image);
  const [formTags, setTags] = useState<string[]>(tags);
  const router = useRouter();

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      description,
      tags,
      image,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setPreview(URL.createObjectURL(e.dataTransfer.files[0]));
    }
  };

  const removeTag = (tag: string) => setTags((prev) => prev.filter((el) => el !== tag));

  const onUpdate = async (values: z.infer<typeof postSchema>) => {
    const { description, image } = values;
    const payload: z.infer<typeof postSchema> = { description, _id: id };

    if (image instanceof File) {
      payload.image = await toBase64(image);
    }

    payload.tags = formTags;

    await triggerUpdate({ method: "PUT", ...payload });

    toast.success("Post has been updated successfully");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          onUpdate({ ...values, tags: formTags });
        })}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className="w-full md:w-1/2"
        encType="multipart/form-data"
      >
        <Card>
          <CardHeader className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="ring-ring ring-2">
                <AvatarImage
                  src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png"
                  alt="Avatar"
                />
              </Avatar>
              <div className="flex flex-col gap-0.5">
                <CardTitle className="flex items-center gap-1 text-sm">Klev Dev</CardTitle>
                <CardDescription>@klevdev</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 text-sm">
            <AspectRatio ratio={16 / 9}>
              <div className="flex items-center justify-center w-full h-full">
                {!preview ? (
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-primary-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <input
                          className="hidden"
                          id="image"
                          type="file"
                          {...field}
                          value={field.value?.fileName}
                          onChange={(event) => {
                            handleFileChange(event);
                            field.onChange(event.target.files?.[0] ?? "");
                          }}
                        />
                      )}
                    />
                  </label>
                ) : (
                  <div>
                    <Button
                      size="sm"
                      className="absolute right-0 top-0 z-10 rounded-full"
                      onClick={() => setPreview("")}
                    >
                      <X />
                    </Button>
                    <Image src={preview} alt="Preview" fill objectFit="contain" />
                  </div>
                )}
              </div>
            </AspectRatio>
            <FormField
              control={form.control}
              name="description"
              defaultValue={description}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="max-h-20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <>
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Add tag and hit enter"
                    value={tagValue}
                    onChange={(e) => setTagValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setTags((prev) => [...prev, tagValue]);
                        setTagValue("");
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
              {formTags && formTags.length > 0 && (
                <div className="flex gap-2 flex-wrap items-center">
                  <span>Tags:</span>
                  {formTags.map((tag) => (
                    <Badge
                      variant="secondary"
                      className="flex justify-between items-center text-md "
                      key={tag}
                    >
                      {tag}
                      <span className="hover:cursor-pointer text-md" onClick={() => removeTag(tag)}>
                        <X size="12" />
                      </span>
                    </Badge>
                  ))}
                </div>
              )}
            </>
          </CardContent>

          <CardFooter className="gap-2">
            <Button size="sm" type="submit">
              Save <Save />
            </Button>
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              Cancel
              <CircleArrowLeft />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

// #region Skeleton

export const SinglePostSkeleton = () => {
  return (
    <Card className="w-full md:w-1/2">
      <CardHeader className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <Skeleton className="h-[200px] w-full rounded-full" />
          </Avatar>
          <div className="flex flex-col gap-0.5 w-[80px] ">
            <CardTitle className="flex items-center gap-1 text-sm">
              <Skeleton className="h-[12px] w-full rounded-md" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-[12px] w-full rounded-md" />
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 text-sm">
        <Skeleton className="h-[300px] w-full rounded-md" />
        <Skeleton className="h-[80px] w-full rounded-md" />
        <Skeleton className="h-[40px] w-full rounded-md" />
      </CardContent>

      <CardFooter className="gap-2">
        <Skeleton className="h-[30px] w-20 rounded-md" />
        <Skeleton className="h-[30px] w-20 rounded-md" />
      </CardFooter>
    </Card>
  );
};

// #endreginon Skeleton

export default SinglePost;
