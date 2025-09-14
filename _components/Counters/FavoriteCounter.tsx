import { useFavorite } from "@/_store/zustand";
import { Badge } from "@/_components/ui/badge";
import React, { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

const FavoriteCounter = () => {
  const { favorites, isLoading, fetchFavorites } = useFavorite();
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <>
      {isLoading && <Skeleton className="w-5 h-full" />}
      {!isLoading && <Badge className="h-5 w-5 rounded-full px-1 ">{favorites}</Badge>}
    </>
  );
};

export default FavoriteCounter;
