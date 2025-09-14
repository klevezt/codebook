import { IPost } from "../_pageComponents/Posts";

export interface State {
  favorites: IPost[];
}

export type Action =
  | { type: "ADD_FAVORITE"; item: IPost[] }
  | { type: "REMOVE_FAVORITE"; item: IPost };
