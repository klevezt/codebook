import { BadgeCheckIcon, Trash } from "lucide-react";

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

import Image from "next/image";
import { IPost } from "../pageComponents/Posts";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Post = ({ post, onDelete }: { post: IPost; onDelete: (x: string) => void }) => {
  return (
    <Card className="h-fit">
      <CardHeader className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="ring-ring ring-2">
            <AvatarImage
              src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png"
              alt="Hallie Richards"
            />
            <AvatarFallback className="text-xs">PG</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <CardTitle className="flex items-center gap-1 text-sm">
              Klev Dev
              <BadgeCheckIcon className="size-4 fill-sky-600 stroke-white dark:fill-sky-400" />
            </CardTitle>
            <CardDescription>@klevdev</CardDescription>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => onDelete(post._id)}>
            <Trash />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 text-sm">
        <AspectRatio ratio={16 / 9}>
          <Image
            src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-6.png"
            alt="Banner"
            className="aspect-video w-full rounded-md object-cover"
            fill
          />
        </AspectRatio>
        <p>Lost in the colors of the night 🌌✨ Sometimes the blur reveals more than clarity. </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">View Post</Button>
      </CardFooter>
    </Card>
  );
};

export default Post;
