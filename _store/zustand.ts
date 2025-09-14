import { create } from "zustand";

interface FavoriteState {
  favorites: number;
  isLoading: boolean;
  increase: (_id: string) => void;
  remove: (_id: string) => void;
  fetchFavorites: () => void;
}

export const useFavorite = create<FavoriteState>((set) => ({
  favorites: 0,
  isLoading: true,
  increase: async (_id) => {
    set((state) => ({ favorites: state.favorites + 1 }));
    await fetch("/api/favorites", {
      method: "PUT",
      body: JSON.stringify({ _id }),
    });
  },
  remove: async (_id) => {
    set((state) => ({ favorites: state.favorites - 1 }));
    await fetch("/api/favorites", {
      method: "PUT",
      body: JSON.stringify({ _id }),
    });
  },
  fetchFavorites: async () => {
    set(() => ({ isLoading: true }));
    const res = await fetch("/api/favorites");
    const data = await res.json();
    set({ isLoading: false, favorites: data.length });
  },
}));
