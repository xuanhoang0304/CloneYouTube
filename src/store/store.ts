import { create } from 'zustand';

export type Store = {
    categoryId: string;
    setCategoryId: (id: string) => void;
    token: string |  null;
    setToken: (token: string |  null) => void;
    moveLogin: boolean;
    setMoveLogin: (isMove: boolean) => void;
};

export const useYouTubeStore = create<Store>((set) => ({
    categoryId: "24",
    setCategoryId: (id: string) => set(() => ({ categoryId: id })),
    token: "",
    setToken: (token: string  | null) => set(() => ({ token })),
    moveLogin: false,
    setMoveLogin: (isMove: boolean) => set(() => ({ moveLogin: isMove })),
}));
