import { useFavorite } from "@/app/_store/zustand";
import { Badge } from "@/components/ui/badge";
import React, { useEffect } from "react";

const FavoriteCounter = () => {
  const { favorites, fetchFavorites } = useFavorite();
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <>
      {/* {isValidating && <Skeleton className="w-5 h-full" />} */}

      <Badge className="h-5 w-5 rounded-full px-1 ">{favorites}</Badge>
    </>
  );
};

export default FavoriteCounter;
