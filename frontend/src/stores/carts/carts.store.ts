import { FindAllCarts, UpdateCart } from "@/apis/product-management/carts.apis";
import { IUpdateValueCart } from "@/interfaces/common/IBaseResponse.interface";
import { ICart } from "@/interfaces/models/carts.interface";
import { create } from "zustand";

interface CartState {
    cartProduct: ICart | null;
    fetchCartProduct: () => Promise<void>;
    updateCart: (payload: IUpdateValueCart) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
    cartProduct: null,

    fetchCartProduct: async () => {
        try {
            const result = await FindAllCarts();
            set({ cartProduct: result?.metadata?.items as any });
        } catch (error) {
            console.error("Lỗi khi tải giỏ hàng:", error);
        }
    },

    updateCart: async (payload) => {
        try {
            await UpdateCart(payload);
            console.log("Cập nhật giỏ hàng thành công");
            await get().fetchCartProduct(); // Lấy lại giỏ hàng sau khi cập nhật
        } catch (error) {
            console.error("Lỗi khi cập nhật giỏ hàng:", error);
        }
    },
}));
