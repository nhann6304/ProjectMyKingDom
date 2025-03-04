import { create } from "zustand";

interface CollapseStore {
    collapseIndex: string[]; // Lưu danh mục mở
    setCollapseIndex: (keys: string[]) => void;
}

export const useCollapseStore = create<CollapseStore>((set) => ({
    collapseIndex: [], // Mặc định không có mục nào mở
    setCollapseIndex: (keys) => set({ collapseIndex: keys }),
}));
