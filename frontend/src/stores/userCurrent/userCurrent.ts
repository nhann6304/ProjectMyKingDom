import { IResponseLogin } from "@/interfaces/common/IBaseResponse.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
    userCurrent: IResponseLogin | null;
};

type Action = {
    signin: (userData: IResponseLogin) => void;
    updateInfo: (userData: Partial<any>) => void;
    logout: () => void;
};

export const useUserCurrent = create<State & Action>()(
    persist(
        (set) => ({
            userCurrent: null,
            signin: (userData) => {
                set(() => ({ userCurrent: userData }));
            },
            logout: () => {
                set(() => ({ userCurrent: null })); // Reset trạng thái
            },
            updateInfo: (userData) => {
                set((state) => ({
                    userCurrent: state.userCurrent
                        ? {
                            ...state.userCurrent,
                            user: { ...state.userCurrent.user, ...userData }, // Cập nhật thông tin user
                        }
                        : null,
                }));
            },
        }),
        {
            name: "user-current-storage",

        }
    )
);
