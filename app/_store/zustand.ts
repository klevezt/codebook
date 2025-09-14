import { create } from "zustand";

interface FavoriteState {
  favorites: number;
  increase: (by: number) => void;
  remove: (by: number) => void;
  fetchFavorites: () => void;
}

export const useFavorite = create<FavoriteState>((set) => ({
  favorites: 0,
  increase: () => set((state) => ({ favorites: state.favorites + 1 })),
  remove: () => set((state) => ({ favorites: state.favorites - 1 })),
  fetchFavorites: async () => {
    const res = await fetch("/api/favorites");
    const data = await res.json();
    set({ favorites: data.length });
  },
}));
