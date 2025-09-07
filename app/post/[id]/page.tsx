"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import useService from "@/hooks/useService";
import { CircleArrowLeft } from "lucide-react";
import Image from "next/image";
import { use } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { IPost } from "@/app/_pageComponents/Posts";

const SinglePost = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const router = useRouter();

  const { data, isError, isLoading } = useService<IPost[]>({ url: `/api/single-post/${id}` });

  if (!data || isLoading) return <div>Loading...</div>;

  const { description, image, createdAt, tags } = data[0] ?? {};

  return (
    <>
      <Button onClick={() => router.back()} variant="link" className="mb-4">
        <CircleArrowLeft />
        Back
      </Button>
      <div className="relative bg-muted-foreground/10 p-5 md:p-8 rounded-2xl flex justify-center flex-col md:flex-row gap-2 md:gap-5 ">
        <div className="flex md:hidden items-center gap-3">
          <Avatar className="ring-ring ring-2">
            <AvatarImage
              src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png"
              alt="Avatars"
            />
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <CardTitle className="flex items-center gap-1 text-sm">Klev Dev</CardTitle>
            <CardDescription>
              @klevdev • {formatDistanceToNow(createdAt, { addSuffix: true })}
            </CardDescription>
          </div>
        </div>
        <Separator orientation="horizontal" className="block md:hidden my-2" />

        {image && (
          <>
            <div className="basis-full md:basis-1/2 h-fit bg-foreground rounded-2xl">
              <AspectRatio ratio={1}>
                <Image
                  src={image}
                  alt="Banner"
                  className="rounded-md object-contain transition-all duration-3000 "
                  fill
                />
              </AspectRatio>
            </div>
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-px"
            />
          </>
        )}
        <div className="basis-full md:basis-1/2 px-0 py-2 md:p-0 text-md font-[geist-sans]">
          <div className="hidden md:flex items-center gap-3 mb-4">
            <Avatar className="ring-ring ring-2">
              <AvatarImage
                src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png"
                alt="Avatars"
              />
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <CardTitle className="flex items-center gap-1 text-sm">Klev Dev</CardTitle>
              <CardDescription>
                @klevdev • {formatDistanceToNow(createdAt, { addSuffix: true })}
              </CardDescription>
            </div>
          </div>
          <p className="whitespace-pre-line">{description}</p>
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs mt-10">
              {tags.map((tag) => (
                <Badge
                  variant="secondary"
                  className="flex justify-between items-center text-xs"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SinglePost;
