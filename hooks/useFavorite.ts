import { IPost } from "@/app/_pageComponents/Posts";
import { useStateValue } from "@/app/_providers/ContextProvider";

export const useFavorite = (data?: IPost[]) => {
  const [, reducer] = useStateValue();
  if (data) reducer({ type: "ADD_FAVORITE", item: data });
};
