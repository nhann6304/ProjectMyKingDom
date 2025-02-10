import { IResponseLogin } from "@/interfaces/common/IBaseResponse.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
    userCurrent: IResponseLogin;
};

type Action = {
    signin: (userData: IResponseLogin) => void;
    updateInfo: (userData: Partial<any>) => void;
    logout: () => void;
};

export const useUserCurrent = create<State & Action>()(
    persist(
        (set) => ({
            userCurrent: { token: "", user: {} as any },
            signin: (userData) => {
                set(() => ({ userCurrent: userData }));
            },
            logout: () => {
                set(() => ({ userCurrent: { token: "", user: {} as any } })); // Reset trạng thái
            },
            updateInfo: (userData) => {
                set((state) => ({
                    userCurrent: {
                        token: state.userCurrent.token,
                        user: { ...state.userCurrent.user, ...userData },
                    },
                }));
            },
        }),
        {
            name: "user-current-storage", // Tên key trong 

        }
    )
);
