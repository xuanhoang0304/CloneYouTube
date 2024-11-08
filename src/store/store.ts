import { create } from 'zustand';

export type Store = {
    categoryId: string;
    setCategoryId: (id: string) => void;
    token: string | undefined;
    setToken: (token: string | undefined) => void;
};

export const useYouTubeStore = create<Store>((set) => ({
    categoryId: "24",
    setCategoryId: (id: string) => set(() => ({ categoryId: id })),
    token: "",
    setToken: (token: string | undefined) => set(() => ({ token })),
}));
