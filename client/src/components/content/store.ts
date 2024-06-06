import { create } from "zustand";

interface SelectedMovieId {
  content: string;
  isAMovie: () => void;
  isATvShow: () => void;
  selectedContentId: string;
  changeSelectedContentId: (id: string) => void;
}

const useSelectedContentId = create<SelectedMovieId>((set) => ({
  content: "movie",
  isAMovie: () => set(() => ({ content: "movie" })),
  isATvShow: () => set(() => ({ content: "tv" })),
  selectedContentId: "0",
  changeSelectedContentId: (id: string) =>
    set(() => ({ selectedContentId: id })),
}));

export default useSelectedContentId;
