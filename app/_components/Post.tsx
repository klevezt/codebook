import { BookOpen, EllipsisIcon, Heart, PencilLine, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import { IPost } from "../_pageComponents/Posts";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { useState } from "react";

const Post = ({ post, onDelete }: { post: IPost; onDelete: (x: string) => void }) => {
  const [isFavorite, setIsFavorite] = useState(post.favorite ?? false);
  return (
    <Card className="h-fit">
      <CardHeader className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="ring-ring ring-2">
            <AvatarImage
              src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png"
              alt="Avatars"
            />
            <AvatarFallback className="text-xs">PG</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <CardTitle className="flex items-center gap-1 text-sm">Klev Dev</CardTitle>
            <CardDescription>@klevdev</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/post/${post._id}`}>
                <Button variant="outline" size="icon" aria-label="Open post" className="border-0">
                  <BookOpen className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open post</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              className="hover:cursor-pointer"
              onClick={() => setIsFavorite((x) => !x)}
              asChild
            >
              <Heart
                className="size-5"
                fill={isFavorite ? "var(--primary)" : "white"}
                stroke={isFavorite ? "var(--primary)" : "black"}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Favorite</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Edit" className="border-0">
                <EllipsisIcon className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-34">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link className="flex flex-1 gap-2" href={`/post/edit/${post._id}`}>
                    <PencilLine />
                    <span>Edit </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={() => onDelete(post._id)}>
                  <Trash2 />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 text-sm">
        {post.image && (
          <AspectRatio ratio={16 / 9}>
            <Image
              src={post.image}
              alt="Banner"
              className="aspect-video w-full rounded-md object-cover object-tops"
              fill
            />
          </AspectRatio>
        )}
        <p className="line-clamp-5 whitespace-pre-line min-h-[60px]">{post.description}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span>Tags:</span>
            {post.tags.map((tag) => (
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
        <Link href={`/post/${post._id}`}>
          <Button size="sm">View post</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export const SkeletonPost = () => {
  return (
    <>
      <Card className="h-fit">
        <CardHeader className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <Skeleton className="h-[200px] w-full rounded-full" />
            </Avatar>
            <div className="flex flex-col gap-0.5 w-[80px] ">
              <CardTitle className="flex items-center gap-1 text-sm">
                <Skeleton className="h-[12px] w-full rounded-full" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-[12px] w-full rounded-full" />
              </CardDescription>
            </div>
          </div>
          <Skeleton className="h-[20px] w-[50px] rounded-full" />
        </CardHeader>
        <CardContent className="space-y-6 text-sm">
          <Skeleton className="h-[200px] w-full rounded-md mb-4" />
          <Skeleton className="h-[60px] w-full rounded-md" />
          <Skeleton className="h-[40px] w-full rounded-md" />
        </CardContent>
        <CardFooter className="gap-2">
          <Skeleton className="h-[30px] w-20 rounded-md" />
        </CardFooter>
      </Card>
    </>
  );
};

export default Post;
