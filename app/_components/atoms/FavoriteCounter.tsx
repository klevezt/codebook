import { IPost } from "@/app/_pageComponents/Posts";
import { Badge } from "@/components/ui/badge";
import React from "react";

const FavoriteCounter = ({ favorites }: { favorites: IPost[] }) => {
  return (
    <>
      {/* {isValidating && <Skeleton className="w-5 h-full" />} */}

      <Badge className="h-5 w-5 rounded-full px-1 ">{favorites.length}</Badge>
    </>
  );
};

export default FavoriteCounter;
